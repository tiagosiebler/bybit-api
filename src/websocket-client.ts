import WebSocket from 'isomorphic-ws';

import {
  CategoryV5,
  MessageEventLike,
  WsKey,
  WsMarket,
  WsTopic,
} from './types';
import {
  Exact,
  WSAPIOperation,
  WsAPIOperationResponseMap,
  WSAPIRequest,
  WsAPITopicRequestParamMap,
  WsAPIWsKeyTopicMap,
  WsOperation,
  WsRequestOperationBybit,
} from './types/websockets/ws-api';
import {
  APIID,
  getMaxTopicsPerSubscribeEvent,
  getNormalisedTopicRequests,
  getPromiseRefForWSAPIRequest,
  getTopicsPerWSKey,
  getWsKeyForTopic,
  getWsUrl,
  isPrivateWsTopic,
  isTopicSubscriptionConfirmation,
  isTopicSubscriptionSuccess,
  isWSAPIResponse,
  isWsPong,
  neverGuard,
  WS_AUTH_ON_CONNECT_KEYS,
  WS_KEY_MAP,
  WS_LOGGER_CATEGORY,
  WSConnectedResult,
  WsTopicRequest,
} from './util';
import {
  BaseWebsocketClient,
  EmittableEvent,
  MidflightWsRequestEvent,
} from './util/BaseWSClient';
import { SignAlgorithm, signMessage } from './util/webCryptoAPI';

export class WebsocketClient extends BaseWebsocketClient<
  WsKey,
  WsRequestOperationBybit<WsTopic>
> {
  /**
   * Request connection of all dependent (public & private) websockets, instead of waiting
   * for automatic connection by SDK.
   */
  public connectAll(): Promise<WSConnectedResult | undefined>[] {
    switch (this.options.market) {
      case 'v5': {
        return [...this.connectPublic(), this.connectPrivate()];
      }
      default: {
        throw neverGuard(this.options.market, 'connectAll(): Unhandled market');
      }
    }
  }

  /**
   * Ensures the WS API connection is active and ready.
   *
   * You do not need to call this, but if you call this before making any WS API requests,
   * it can accelerate the first request (by preparing the connection in advance).
   */
  public connectWSAPI(): Promise<unknown> {
    /** This call automatically ensures the connection is active AND authenticated before resolving */
    return this.assertIsAuthenticated(WS_KEY_MAP.v5PrivateTrade);
  }

  public connectPublic(): Promise<WSConnectedResult | undefined>[] {
    switch (this.options.market) {
      case 'v5':
      default: {
        return [
          this.connect(WS_KEY_MAP.v5SpotPublic),
          this.connect(WS_KEY_MAP.v5LinearPublic),
          this.connect(WS_KEY_MAP.v5InversePublic),
          this.connect(WS_KEY_MAP.v5OptionPublic),
        ];
      }
    }
  }

  public connectPrivate(): Promise<WebSocket | undefined> {
    switch (this.options.market) {
      case 'v5':
      default: {
        return this.connect(WS_KEY_MAP.v5Private);
      }
    }
  }

  /**
   * Subscribe to V5 topics & track/persist them.
   * @param wsTopics - topic or list of topics
   * @param category - the API category this topic is for (e.g. "linear").
   * The value is only important when connecting to public topics and will be ignored for private topics.
   * @param isPrivateTopic - optional - the library will try to detect private topics, you can use this
   * to mark a topic as private (if the topic isn't recognised yet)
   */
  public subscribeV5(
    wsTopics: WsTopic[] | WsTopic,
    category: CategoryV5,
    isPrivateTopic?: boolean,
  ): Promise<unknown>[] {
    const topicRequests = Array.isArray(wsTopics) ? wsTopics : [wsTopics];

    const perWsKeyTopics: { [key in WsKey]?: WsTopicRequest<WsTopic>[] } = {};

    // Sort into per-WsKey batches, in case there is a mix of topics here
    for (const topic of topicRequests) {
      const derivedWsKey = getWsKeyForTopic(
        this.options.market,
        topic,
        isPrivateTopic,
        category,
      );

      const wsRequest: WsTopicRequest<WsTopic> = {
        topic: topic,
        category: category,
      };

      if (
        !perWsKeyTopics[derivedWsKey] ||
        !Array.isArray(perWsKeyTopics[derivedWsKey])
      ) {
        perWsKeyTopics[derivedWsKey] = [];
      }

      perWsKeyTopics[derivedWsKey]!.push(wsRequest);
    }

    const promises: Promise<unknown>[] = [];

    // Batch sub topics per ws key
    for (const wsKey in perWsKeyTopics) {
      const wsKeyTopicRequests = perWsKeyTopics[wsKey as WsKey];
      if (wsKeyTopicRequests?.length) {
        const requestPromise = this.subscribeTopicsForWsKey(
          wsKeyTopicRequests,
          wsKey as WsKey,
        );

        if (Array.isArray(requestPromise)) {
          promises.push(...requestPromise);
        } else {
          promises.push(requestPromise);
        }
      }
    }

    // Return promise to resolve midflight WS request (only works if already connected before request)
    return promises;
  }

  /**
   * Unsubscribe from V5 topics & remove them from memory. They won't be re-subscribed to if the
   * connection reconnects.
   *
   * @param wsTopics - topic or list of topics
   * @param category - the API category this topic is for (e.g. "linear"). The value is only
   * important when connecting to public topics and will be ignored for private topics.
   * @param isPrivateTopic - optional - the library will try to detect private topics, you can
   * use this to mark a topic as private (if the topic isn't recognised yet)
   */
  public unsubscribeV5(
    wsTopics: WsTopic[] | WsTopic,
    category: CategoryV5,
    isPrivateTopic?: boolean,
  ): Promise<unknown>[] {
    const topicRequests = Array.isArray(wsTopics) ? wsTopics : [wsTopics];

    const perWsKeyTopics: { [key in WsKey]?: WsTopicRequest<WsTopic>[] } = {};

    // Sort into per-WsKey batches, in case there is a mix of topics here
    for (const topic of topicRequests) {
      const derivedWsKey = getWsKeyForTopic(
        this.options.market,
        topic,
        isPrivateTopic,
        category,
      );

      const wsRequest: WsTopicRequest<WsTopic> = {
        topic: topic,
        category: category,
      };

      if (
        !perWsKeyTopics[derivedWsKey] ||
        !Array.isArray(perWsKeyTopics[derivedWsKey])
      ) {
        perWsKeyTopics[derivedWsKey] = [];
      }

      perWsKeyTopics[derivedWsKey]!.push(wsRequest);
    }

    const promises: Promise<unknown>[] = [];

    // Batch sub topics per ws key
    for (const wsKey in perWsKeyTopics) {
      const wsKeyTopicRequests = perWsKeyTopics[wsKey as WsKey];
      if (wsKeyTopicRequests?.length) {
        const requestPromise = this.unsubscribeTopicsForWsKey(
          wsKeyTopicRequests,
          wsKey as WsKey,
        );

        if (Array.isArray(requestPromise)) {
          promises.push(...requestPromise);
        } else {
          promises.push(requestPromise);
        }
      }
    }

    // Return promise to resolve midflight WS request (only works if already connected before request)
    return promises;
  }

  /**
   * Note: subscribeV5() might be simpler to use. The end result is the same.
   *
   * Request subscription to one or more topics. Pass topics as either an array of strings,
   * or array of objects (if the topic has parameters).
   *
   * Objects should be formatted as {topic: string, params: object, category: CategoryV5}.
   *
   * - Subscriptions are automatically routed to the correct websocket connection.
   * - Authentication/connection is automatic.
   * - Resubscribe after network issues is automatic.
   *
   * Call `unsubscribe(topics)` to remove topics
   */
  public subscribe(
    requests:
      | (WsTopicRequest<WsTopic> | WsTopic)
      | (WsTopicRequest<WsTopic> | WsTopic)[],
    wsKey?: WsKey,
  ) {
    const topicRequests = Array.isArray(requests) ? requests : [requests];
    const normalisedTopicRequests = getNormalisedTopicRequests(topicRequests);

    const perWsKeyTopics = getTopicsPerWSKey(
      this.options.market,
      normalisedTopicRequests,
      wsKey,
    );

    // Batch sub topics per ws key
    for (const wsKey in perWsKeyTopics) {
      const wsKeyTopicRequests = perWsKeyTopics[wsKey];
      if (wsKeyTopicRequests?.length) {
        this.subscribeTopicsForWsKey(wsKeyTopicRequests, wsKey as WsKey);
      }
    }
  }

  /**
   * Note: unsubscribe() might be simpler to use. The end result is the same.
   * Unsubscribe from one or more topics. Similar to subscribe() but in reverse.
   *
   * - Requests are automatically routed to the correct websocket connection.
   * - These topics will be removed from the topic cache, so they won't be subscribed to again.
   */
  public unsubscribe(
    requests:
      | (WsTopicRequest<WsTopic> | WsTopic)
      | (WsTopicRequest<WsTopic> | WsTopic)[],
    wsKey?: WsKey,
  ) {
    const topicRequests = Array.isArray(requests) ? requests : [requests];
    const normalisedTopicRequests = getNormalisedTopicRequests(topicRequests);

    const perWsKeyTopics = getTopicsPerWSKey(
      this.options.market,
      normalisedTopicRequests,
      wsKey,
    );

    // Batch sub topics per ws key
    for (const wsKey in perWsKeyTopics) {
      const wsKeyTopicRequests = perWsKeyTopics[wsKey];
      if (wsKeyTopicRequests?.length) {
        this.unsubscribeTopicsForWsKey(wsKeyTopicRequests, wsKey as WsKey);
      }
    }
  }

  /**
   *
   *
   *
   * WS API Methods - similar to the REST API, but via WebSockets
   * https://bybit-exchange.github.io/docs/v5/websocket/trade/guideline
   *
   *
   *
   */

  /**
   * Send a Websocket API command/request on a connection. Returns a promise that resolves on reply.
   *
   * WS API Documentation for list of operations and parameters:
   * https://bybit-exchange.github.io/docs/v5/websocket/trade/guideline
   *
   * Returned promise is rejected if:
   * - an exception is detected in the reply, OR
   * - the connection disconnects for any reason (even if automatic reconnect will happen).
   *
   * Authentication is automatic. If you didn't request authentication yourself, there might
   * be a small delay after your first request, while the SDK automatically authenticates.
   *
   * @param wsKey - The connection this event is for. Currently only "v5PrivateTrade" is supported
   * for Bybit, since that is the dedicated WS API connection.
   * @param operation - The command being sent, e.g. "order.create" to submit a new order.
   * @param params - Any request parameters for the command. E.g. `OrderParamsV5` to submit a new
   * order. Only send parameters for the request body. Everything else is automatically handled.
   * @returns Promise - tries to resolve with async WS API response. Rejects if disconnected or exception is seen in async WS API response
   */

  // This overload allows the caller to omit the 3rd param, if it isn't required
  sendWSAPIRequest<
    TWSKey extends keyof WsAPIWsKeyTopicMap,
    TWSOperation extends WsAPIWsKeyTopicMap[TWSKey],
    TWSParams extends Exact<WsAPITopicRequestParamMap[TWSOperation]>,
  >(
    wsKey: TWSKey,
    operation: TWSOperation,
    ...params: TWSParams extends undefined ? [] : [TWSParams]
  ): Promise<WsAPIOperationResponseMap[TWSOperation]>;

  // These overloads give stricter types than mapped generics, since generic constraints
  // do not trigger excess property checks
  // Without these overloads, TypeScript won't complain if you include an
  // unexpected property with your request (if it doesn't clash with an existing property)
  sendWSAPIRequest<TWSOperation extends WSAPIOperation = 'order.create'>(
    wsKey: typeof WS_KEY_MAP.v5PrivateTrade,
    operation: TWSOperation,
    params: WsAPITopicRequestParamMap[TWSOperation],
  ): Promise<WsAPIOperationResponseMap[TWSOperation]>;

  sendWSAPIRequest<TWSOperation extends WSAPIOperation = 'order.amend'>(
    wsKey: typeof WS_KEY_MAP.v5PrivateTrade,
    operation: TWSOperation,
    params: WsAPITopicRequestParamMap[TWSOperation],
  ): Promise<WsAPIOperationResponseMap[TWSOperation]>;

  sendWSAPIRequest<TWSOperation extends WSAPIOperation = 'order.cancel'>(
    wsKey: typeof WS_KEY_MAP.v5PrivateTrade,
    operation: TWSOperation,
    params: WsAPITopicRequestParamMap[TWSOperation],
  ): Promise<WsAPIOperationResponseMap[TWSOperation]>;

  async sendWSAPIRequest<
    TWSKey extends keyof WsAPIWsKeyTopicMap,
    TWSOperation extends WsAPIWsKeyTopicMap[TWSKey],
    TWSParams extends Exact<WsAPITopicRequestParamMap[TWSOperation]>,
    TWSAPIResponse extends
      WsAPIOperationResponseMap[TWSOperation] = WsAPIOperationResponseMap[TWSOperation],
  >(
    wsKey: WsKey = WS_KEY_MAP.v5PrivateTrade,
    operation: TWSOperation,
    params: TWSParams,
  ): Promise<WsAPIOperationResponseMap[TWSOperation]> {
    this.logger.trace(`sendWSAPIRequest(): assert "${wsKey}" is connected`);
    await this.assertIsConnected(wsKey);
    this.logger.trace('sendWSAPIRequest()->assertIsConnected() ok');

    await this.assertIsAuthenticated(wsKey);
    this.logger.trace('sendWSAPIRequest()->assertIsAuthenticated() ok');

    const timestampMs = Date.now() + (this.getTimeOffsetMs() || 0);

    const requestEvent: WSAPIRequest<TWSParams> = {
      reqId: this.getNewRequestId(),
      header: {
        'X-BAPI-RECV-WINDOW': `${this.options.recvWindow}`,
        'X-BAPI-TIMESTAMP': `${timestampMs}`,
        Referer: APIID,
      },
      op: operation,
      args: [params],
    };

    // Sign, if needed
    const signedEvent = await this.signWSAPIRequest(requestEvent);

    // Store deferred promise, resolved within the "resolveEmittableEvents" method while parsing incoming events
    const promiseRef = getPromiseRefForWSAPIRequest(requestEvent);

    const deferredPromise = this.getWsStore().createDeferredPromise<
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      TWSAPIResponse & { request: any }
    >(wsKey, promiseRef, false);

    // Enrich returned promise with request context for easier debugging
    deferredPromise.promise
      ?.then((res) => {
        if (!Array.isArray(res)) {
          res.request = {
            wsKey,
            ...signedEvent,
          };
        }

        return res;
      })
      .catch((e) => {
        if (typeof e === 'string') {
          this.logger.error('Unexpected string thrown without Error object:', {
            e,
            wsKey,
            signedEvent,
          });
          return e;
        }
        e.request = {
          wsKey,
          operation,
          params: params,
        };
        // throw e;
        return e;
      });

    this.logger.trace(
      `sendWSAPIRequest(): sending raw request: ${JSON.stringify(signedEvent, null, 2)}`,
    );

    // Send event
    const throwExceptions = false;
    this.tryWsSend(wsKey, JSON.stringify(signedEvent), throwExceptions);

    this.logger.trace(
      `sendWSAPIRequest(): sent "${operation}" event with promiseRef(${promiseRef})`,
    );

    // Return deferred promise, so caller can await this call
    return deferredPromise.promise!;
  }

  /**
   *
   *
   * Internal methods - not intended for public use
   *
   *
   */

  /**
   * @returns The WS URL to connect to for this WS key
   */
  protected async getWsUrl(wsKey: WsKey): Promise<string> {
    const wsBaseURL = getWsUrl(wsKey, this.options, this.logger);

    // If auth is needed for this wsKey URL, this returns a suffix
    const authParams = await this.getWsAuthURLSuffix();
    if (!authParams) {
      return wsBaseURL;
    }

    return wsBaseURL + '?' + authParams;
  }

  /**
   * Return params required to make authorized request
   */
  private async getWsAuthURLSuffix(): Promise<string> {
    return '';
  }

  private async signMessage(
    paramsStr: string,
    secret: string,
    method: 'hex' | 'base64',
    algorithm: SignAlgorithm,
  ): Promise<string> {
    if (typeof this.options.customSignMessageFn === 'function') {
      return this.options.customSignMessageFn(paramsStr, secret);
    }
    return await signMessage(paramsStr, secret, method, algorithm);
  }

  protected async getWsAuthRequestEvent(
    wsKey: WsKey,
  ): Promise<WsRequestOperationBybit<string>> {
    try {
      const { signature, expiresAt } = await this.getWsAuthSignature(wsKey);

      const request: WsRequestOperationBybit<string> = {
        op: 'auth',
        args: [this.options.key!, expiresAt, signature],
        req_id: `${wsKey}-auth`,
      };

      return request;
    } catch (e) {
      this.logger.error(e, { ...WS_LOGGER_CATEGORY, wsKey });
      throw e;
    }
  }

  private async getWsAuthSignature(
    wsKey: WsKey,
  ): Promise<{ expiresAt: number; signature: string }> {
    const { key, secret } = this.options;

    if (!key || !secret) {
      this.logger.error(
        'Cannot authenticate websocket, either api or private keys missing.',
        { ...WS_LOGGER_CATEGORY, wsKey },
      );
      throw new Error('Cannot auth - missing api or secret in config');
    }

    this.logger.trace("Getting auth'd request params", {
      ...WS_LOGGER_CATEGORY,
      wsKey,
    });

    const recvWindow = this.options.recvWindow || 5000;

    const signatureExpiresAt = Date.now() + this.getTimeOffsetMs() + recvWindow;

    const signature = await this.signMessage(
      'GET/realtime' + signatureExpiresAt,
      secret,
      'hex',
      'SHA-256',
    );

    return {
      expiresAt: signatureExpiresAt,
      signature,
    };
  }

  private async signWSAPIRequest<TRequestParams = object>(
    requestEvent: WSAPIRequest<TRequestParams>,
  ): Promise<WSAPIRequest<TRequestParams>> {
    // Not needed for Bybit. Auth happens only on connection open, automatically.
    return requestEvent;
  }

  protected sendPingEvent(wsKey: WsKey) {
    this.tryWsSend(wsKey, JSON.stringify({ op: 'ping' }));
  }

  protected sendPongEvent(wsKey: WsKey) {
    this.tryWsSend(wsKey, JSON.stringify({ op: 'pong' }));
  }

  /** Force subscription requests to be sent in smaller batches, if a number is returned */
  protected getMaxTopicsPerSubscribeEvent(wsKey: WsKey): number | null {
    return getMaxTopicsPerSubscribeEvent(this.options.market, wsKey);
  }

  /**
   * @returns one or more correctly structured request events for performing a operations over WS. This can vary per exchange spec.
   */
  protected async getWsRequestEvents(
    market: WsMarket,
    operation: WsOperation,
    requests: WsTopicRequest<string>[],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
    wsKey: WsKey,
  ): Promise<MidflightWsRequestEvent<WsRequestOperationBybit<WsTopic>>[]> {
    const wsRequestEvents: MidflightWsRequestEvent<
      WsRequestOperationBybit<WsTopic>
    >[] = [];
    const wsRequestBuildingErrors: unknown[] = [];

    switch (market) {
      case 'all': {
        const topics = requests.map((r) => r.topic);

        // Previously used to track topics in a request. Keeping this for subscribe/unsubscribe requests, no need for incremental values
        const req_id =
          ['subscribe', 'unsubscribe'].includes(operation) && topics.length
            ? topics.join(',')
            : this.getNewRequestId();

        const wsEvent: WsRequestOperationBybit<WsTopic> = {
          req_id: req_id,
          op: operation,
          args: topics,
        };

        const midflightWsEvent: MidflightWsRequestEvent<
          WsRequestOperationBybit<WsTopic>
        > = {
          requestKey: wsEvent.req_id,
          requestEvent: wsEvent,
        };

        wsRequestEvents.push({
          ...midflightWsEvent,
        });
        break;
      }
      default: {
        throw neverGuard(market, `Unhandled market "${market}"`);
      }
    }

    if (wsRequestBuildingErrors.length) {
      const label =
        wsRequestBuildingErrors.length === requests.length ? 'all' : 'some';

      this.logger.error(
        `Failed to build/send ${wsRequestBuildingErrors.length} event(s) for ${label} WS requests due to exceptions`,
        {
          ...WS_LOGGER_CATEGORY,
          wsRequestBuildingErrors,
          wsRequestBuildingErrorsStringified: JSON.stringify(
            wsRequestBuildingErrors,
            null,
            2,
          ),
        },
      );
    }

    return wsRequestEvents;
  }

  protected getPrivateWSKeys(): WsKey[] {
    return WS_AUTH_ON_CONNECT_KEYS;
  }

  protected isAuthOnConnectWsKey(wsKey: WsKey): boolean {
    return WS_AUTH_ON_CONNECT_KEYS.includes(wsKey);
  }

  /**
   * Determines if a topic is for a private channel, using a hardcoded list of strings
   */
  protected isPrivateTopicRequest(request: WsTopicRequest<string>): boolean {
    const topicName = request?.topic?.toLowerCase();
    if (!topicName) {
      return false;
    }

    return isPrivateWsTopic(topicName);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected isWsPing(msg: any): boolean {
    if (!msg) {
      return false;
    }

    if (typeof msg?.data === 'string') {
      if (msg.data.includes('op": "ping')) {
        return true;
      }

      return false;
    }

    return false;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected isWsPong(msg: any): boolean {
    if (!msg) {
      return false;
    }

    if (typeof msg?.data === 'string') {
      // public ws connections
      if (msg.data.includes('ret_msg":"pong')) {
        return true;
      }

      // private ws connections
      if (msg.data.includes('op":"pong')) {
        return true;
      }

      return false;
    }

    if (msg.event?.ret_msg === 'pong') {
      return true;
    }

    return msg?.pong || isWsPong(msg);
  }

  /**
   * Abstraction called to sort ws events into emittable event types (response to a request, data update, etc)
   */
  protected resolveEmittableEvents(
    wsKey: WsKey,
    event: MessageEventLike,
  ): EmittableEvent[] {
    const results: EmittableEvent[] = [];

    try {
      const parsed = JSON.parse(event.data);
      // this.logger.trace('resolveEmittableEvents', {
      //   ...WS_LOGGER_CATEGORY,
      //   wsKey,
      //   parsed: JSON.stringify(parsed),
      // });

      // Only applies to the V5 WS topics
      if (isTopicSubscriptionConfirmation(parsed) && parsed.req_id) {
        const isTopicSubscriptionSuccessEvent =
          isTopicSubscriptionSuccess(parsed);

        this.updatePendingTopicSubscriptionStatus(
          wsKey,
          parsed.req_id,
          parsed,
          isTopicSubscriptionSuccessEvent,
        );
      }

      const EVENTS_AUTHENTICATED = ['auth'];
      const EVENTS_RESPONSES = [
        'subscribe',
        'unsubscribe',
        'COMMAND_RESP',
        'ping',
        'pong',
      ];

      const eventTopic = parsed?.topic;
      const eventOperation = parsed?.op;

      // WS API response
      if (isWSAPIResponse(parsed)) {
        const retCode = parsed.retCode;
        const reqId = parsed.reqId;

        const isError = retCode !== 0;

        const promiseRef = [parsed.op, reqId].join('_');

        if (!reqId) {
          this.logger.error(
            // eslint-disable-next-line max-len
            'WS API response is missing reqId - promisified workflow could get stuck. If this happens, please get in touch with steps to reproduce. Trace:',
            {
              wsKey,
              promiseRef,
              parsedEvent: parsed,
            },
          );
        }

        // WS API Exception
        if (isError) {
          try {
            this.getWsStore().rejectDeferredPromise(
              wsKey,
              promiseRef,
              {
                wsKey,
                ...parsed,
              },
              true,
            );
          } catch (e) {
            this.logger.error('Exception trying to reject WSAPI promise', {
              wsKey,
              promiseRef,
              parsedEvent: parsed,
              error: e,
            });
          }

          results.push({
            eventType: 'exception',
            event: parsed,
            isWSAPIResponse: true,
          });
          return results;
        }

        // WS API Success
        try {
          this.getWsStore().resolveDeferredPromise(
            wsKey,
            promiseRef,
            {
              wsKey,
              ...parsed,
            },
            true,
          );
        } catch (e) {
          this.logger.error('Exception trying to resolve WSAPI promise', {
            wsKey,
            promiseRef,
            parsedEvent: parsed,
            error: e,
          });
        }

        results.push({
          eventType: 'response',
          event: parsed,
          isWSAPIResponse: true,
        });

        return results;
      }

      // Messages for a subscribed topic all include the "topic" property
      if (typeof eventTopic === 'string') {
        results.push({
          eventType: 'update',
          event: parsed,
        });
        return results;
      }

      // Messages that are a "reply" to a request/command (e.g. subscribe to these topics) typically include the "op" property
      if (typeof eventOperation === 'string') {
        // Failed request
        if (parsed.success === false) {
          results.push({
            eventType: 'exception',
            event: parsed,
          });
          return results;
        }

        // These are r  equest/reply pattern events (e.g. after subscribing to topics or authenticating)
        if (EVENTS_RESPONSES.includes(eventOperation)) {
          results.push({
            eventType: 'response',
            event: parsed,
          });
          return results;
        }

        // Request/reply pattern for authentication success
        if (EVENTS_AUTHENTICATED.includes(eventOperation)) {
          results.push({
            eventType: 'authenticated',
            event: parsed,
          });
          return results;
        }

        this.logger.error(
          `!! Unhandled string operation type "${eventOperation}". Defaulting to "update" channel...`,
          parsed,
        );
      } else {
        this.logger.error(
          `!! Unhandled non-string event type "${eventOperation}". Defaulting to "update" channel...`,
          parsed,
        );
      }

      // In case of catastrophic failure, fallback to noisy emit update
      results.push({
        eventType: 'update',
        event: parsed,
      });
    } catch (e) {
      results.push({
        event: {
          message: 'Failed to parse event data due to exception',
          exception: e,
          eventData: event.data,
        },
        eventType: 'exception',
      });

      this.logger.error('Failed to parse event data due to exception: ', {
        exception: e,
        eventData: event.data,
      });
    }

    return results;
  }
}
