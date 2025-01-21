/* eslint-disable @typescript-eslint/no-unsafe-declaration-merging */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-explicit-any */
import WebSocket from 'isomorphic-ws';

import {
  CategoryV5,
  MessageEventLike,
  WsKey,
  WsMarket,
  WsTopic,
} from './types';
import {
  APIID,
  WSConnectedResult,
  WS_AUTH_ON_CONNECT_KEYS,
  WS_KEY_MAP,
  WsTopicRequest,
  getMaxTopicsPerSubscribeEvent,
  getNormalisedTopicRequests,
  getPromiseRefForWSAPIRequest,
  getWsKeyForTopic,
  getWsUrl,
  isPrivateWsTopic,
  isTopicSubscriptionConfirmation,
  isTopicSubscriptionSuccess,
  isWSAPIResponse,
  isWsPong,
  neverGuard,
} from './util';
import { signMessage } from './util/node-support';
import {
  BaseWebsocketClient,
  EmittableEvent,
  MidflightWsRequestEvent,
} from './util/BaseWSClient';
import {
  WSAPIRequest,
  WsAPIOperationResponseMap,
  WsAPITopicRequestParamMap,
  WsAPIWsKeyTopicMap,
  WsOperation,
  WsRequestOperationBybit,
} from './types/websockets/ws-api';

const WS_LOGGER_CATEGORY = { category: 'bybit-ws' };

/**
 * Groups topics in request into per-wsKey groups
 * @param normalisedTopicRequests
 * @param wsKey
 * @param isPrivateTopic
 * @returns
 */
function getTopicsPerWSKey(
  normalisedTopicRequests: WsTopicRequest[],
  wsKey?: WsKey,
  isPrivateTopic?: boolean,
): {
  [key in WsKey]?: WsTopicRequest<WsTopic>[];
} {
  const perWsKeyTopics: { [key in WsKey]?: WsTopicRequest<WsTopic>[] } = {};

  // Sort into per wsKey arrays, in case topics are mixed together for different wsKeys
  for (const topicRequest of normalisedTopicRequests) {
    const derivedWsKey =
      wsKey ||
      getWsKeyForTopic(
        this.options.market,
        topicRequest.topic,
        isPrivateTopic,
        topicRequest.category,
      );

    if (
      !perWsKeyTopics[derivedWsKey] ||
      !Array.isArray(perWsKeyTopics[derivedWsKey])
    ) {
      perWsKeyTopics[derivedWsKey] = [];
    }

    perWsKeyTopics[derivedWsKey]!.push(topicRequest);
  }

  return perWsKeyTopics;
}

// export class WebsocketClient extends EventEmitter {
export class WebsocketClient extends BaseWebsocketClient<
  WsKey,
  WsRequestOperationBybit<WsTopic>
> {
  /**
   * Request connection of all dependent (public & private) websockets, instead of waiting for automatic connection by library
   */
  public connectAll(): Promise<WSConnectedResult | undefined>[] {
    switch (this.options.market) {
      case 'inverse': {
        // only one for inverse
        return [...this.connectPublic()];
      }
      // these all have separate public & private ws endpoints
      case 'linear':
      case 'spot':
      case 'spotv3':
      case 'usdcOption':
      case 'usdcPerp':
      case 'unifiedPerp':
      case 'unifiedOption':
      case 'contractUSDT':
      case 'contractInverse': {
        return [...this.connectPublic(), this.connectPrivate()];
      }
      case 'v5': {
        return [this.connectPrivate()];
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
      case 'inverse': {
        return [this.connect(WS_KEY_MAP.inverse)];
      }
      case 'linear': {
        return [this.connect(WS_KEY_MAP.linearPublic)];
      }
      case 'spot': {
        return [this.connect(WS_KEY_MAP.spotPublic)];
      }
      case 'spotv3': {
        return [this.connect(WS_KEY_MAP.spotV3Public)];
      }
      case 'usdcOption': {
        return [this.connect(WS_KEY_MAP.usdcOptionPublic)];
      }
      case 'usdcPerp': {
        return [this.connect(WS_KEY_MAP.usdcPerpPublic)];
      }
      case 'unifiedOption': {
        return [this.connect(WS_KEY_MAP.unifiedOptionPublic)];
      }
      case 'unifiedPerp': {
        return [
          this.connect(WS_KEY_MAP.unifiedPerpUSDTPublic),
          this.connect(WS_KEY_MAP.unifiedPerpUSDCPublic),
        ];
      }
      case 'contractUSDT':
        return [this.connect(WS_KEY_MAP.contractUSDTPublic)];
      case 'contractInverse':
        return [this.connect(WS_KEY_MAP.contractInversePublic)];
    }
  }

  public connectPrivate(): Promise<WebSocket | undefined> {
    switch (this.options.market) {
      case 'v5':
      default: {
        return this.connect(WS_KEY_MAP.v5Private);
      }
      case 'inverse': {
        return this.connect(WS_KEY_MAP.inverse);
      }
      case 'linear': {
        return this.connect(WS_KEY_MAP.linearPrivate);
      }
      case 'spot': {
        return this.connect(WS_KEY_MAP.spotPrivate);
      }
      case 'spotv3': {
        return this.connect(WS_KEY_MAP.spotV3Private);
      }
      case 'usdcOption': {
        return this.connect(WS_KEY_MAP.usdcOptionPrivate);
      }
      case 'usdcPerp': {
        return this.connect(WS_KEY_MAP.usdcPerpPrivate);
      }
      case 'unifiedPerp':
      case 'unifiedOption': {
        return this.connect(WS_KEY_MAP.unifiedPrivate);
      }
      case 'contractUSDT':
        return this.connect(WS_KEY_MAP.contractUSDTPrivate);
      case 'contractInverse':
        return this.connect(WS_KEY_MAP.contractInversePrivate);
    }
  }

  /**
   *
   * Subscribe to V5 topics & track/persist them.
   * @param wsTopics - topic or list of topics
   * @param category - the API category this topic is for (e.g. "linear"). The value is only important when connecting to public topics and will be ignored for private topics.
   * @param isPrivateTopic - optional - the library will try to detect private topics, you can use this to mark a topic as private (if the topic isn't recognised yet)
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
   * Unsubscribe from V5 topics & remove them from memory. They won't be re-subscribed to if the connection reconnects.
   * @param wsTopics - topic or list of topics
   * @param category - the API category this topic is for (e.g. "linear"). The value is only important when connecting to public topics and will be ignored for private topics.
   * @param isPrivateTopic - optional - the library will try to detect private topics, you can use this to mark a topic as private (if the topic isn't recognised yet)
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
   * Request subscription to one or more topics. Pass topics as either an array of strings, or array of objects (if the topic has parameters).
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

    const perWsKeyTopics = getTopicsPerWSKey(normalisedTopicRequests, wsKey);

    // Batch sub topics per ws key
    for (const wsKey in perWsKeyTopics) {
      const wsKeyTopicRequests = perWsKeyTopics[wsKey];
      if (wsKeyTopicRequests?.length) {
        this.subscribeTopicsForWsKey(wsKeyTopicRequests, wsKey as WsKey);
      }
    }
  }

  /**
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

    const perWsKeyTopics = getTopicsPerWSKey(normalisedTopicRequests, wsKey);

    // Batch sub topics per ws key
    for (const wsKey in perWsKeyTopics) {
      const wsKeyTopicRequests = perWsKeyTopics[wsKey];
      if (wsKeyTopicRequests?.length) {
        this.unsubscribeTopicsForWsKey(wsKeyTopicRequests, wsKey as WsKey);
      }
    }
  }

  /*******
   *
   *
   *
   *
   * OLD WS CLIENT BELOW
   *
   *
   *
   *
   *
   *
   */

  /**
   * Subscribe to V1-V3 topics & track/persist them.
   *
   * @deprecated The V1-V3 websockets are very old and may not work properly anymore. Support for them will be removed soon. Use subcribeV5/unsubscribeV5 or subscribe/unsubscribe instead.
   *
   * Note: for public V5 topics use the `subscribeV5()` method.
   *
   * Topics will be automatically resubscribed to if the connection resets/drops/reconnects.
   * @param wsTopics - topic or list of topics
   * @param isPrivateTopic optional - the library will try to detect private topics, you can use this to mark a topic as private (if the topic isn't recognised yet)
   */
  public subscribeV3(
    wsTopics: WsTopic[] | WsTopic,
    isPrivateTopic?: boolean,
  ): Promise<unknown>[] {
    const topics = Array.isArray(wsTopics) ? wsTopics : [wsTopics];
    if (this.options.market === 'v5') {
      topics.forEach((topic) => {
        if (!isPrivateWsTopic(topic)) {
          throw new Error(
            'For public "v5" websocket topics, use the subscribeV5() method & provide the category parameter',
          );
        }
      });
    }

    const promises: Promise<unknown>[] = [];

    topics.forEach((topic) => {
      const wsKey = getWsKeyForTopic(
        this.options.market,
        topic,
        isPrivateTopic,
      );

      const wsRequest: WsTopicRequest<WsTopic> = {
        topic: topic,
      };

      // Persist topic for reconnects
      const requestPromise = this.subscribeTopicsForWsKey([wsRequest], wsKey);

      promises.push(requestPromise);
    });

    // Return promise to resolve midflight WS request (only works if already connected before request)
    return promises;
  }

  /**
   * Unsubscribe from V1-V3 topics & remove them from memory. They won't be re-subscribed to if the connection reconnects.
   *
   * @deprecated The V1-V3 websockets are very old and may not work properly anymore. Support for them will be removed soon. Use subcribeV5/unsubscribeV5 or subscribe/unsubscribe instead.
   *
   * Note: For public V5 topics, use `unsubscribeV5()` instead!
   *
   * @param wsTopics topic or list of topics
   * @param isPrivateTopic optional - the library will try to detect private topics, you can use this to mark a topic as private (if the topic isn't recognised yet)
   */
  public unsubscribeV3(
    wsTopics: WsTopic[] | WsTopic,
    isPrivateTopic?: boolean,
  ) {
    const topics = Array.isArray(wsTopics) ? wsTopics : [wsTopics];
    if (this.options.market === 'v5') {
      topics.forEach((topic) => {
        if (!isPrivateWsTopic(topic)) {
          throw new Error(
            'For public "v5" websocket topics, use the unsubscribeV5() method & provide the category parameter',
          );
        }
      });
    }

    topics.forEach((topic) => {
      const wsKey = getWsKeyForTopic(
        this.options.market,
        topic,
        isPrivateTopic,
      );

      const wsRequest: WsTopicRequest<WsTopic> = {
        topic: topic,
      };

      // Persist topic for reconnects
      this.unsubscribeTopicsForWsKey([wsRequest], wsKey);
    });
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
    const authParams = await this.getWsAuthURLSuffix(wsKey);
    if (!authParams) {
      return wsBaseURL;
    }

    return wsBaseURL + '?' + authParams;
  }

  /**
   * Return params required to make authorized request
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  private async getWsAuthURLSuffix(wsKey: WsKey): Promise<string> {
    return '';
  }

  protected async getWsAuthRequestEvent(wsKey: WsKey): Promise<any> {
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

    const signature = await signMessage(
      'GET/realtime' + signatureExpiresAt,
      secret,
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
        const wsEvent: WsRequestOperationBybit<WsTopic> = {
          req_id: this.getNewRequestId(),
          op: operation,
          args: requests.map((r) => r.topic),
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
    return [
      WS_KEY_MAP.linearPrivate,
      WS_KEY_MAP.spotPrivate,
      WS_KEY_MAP.spotV3Private,
      WS_KEY_MAP.usdcOptionPrivate,
      WS_KEY_MAP.usdcPerpPrivate,
      WS_KEY_MAP.unifiedPrivate,
      WS_KEY_MAP.contractUSDTPrivate,
      WS_KEY_MAP.contractInversePrivate,
      WS_KEY_MAP.v5Private,
    ];
  }

  protected isAuthOnConnectWsKey(wsKey: WsKey): boolean {
    return WS_AUTH_ON_CONNECT_KEYS.includes(wsKey);
  }

  /**
   * Determines if a topic is for a private channel, using a hardcoded list of strings
   */
  protected isPrivateTopicRequest(
    request: WsTopicRequest<string>,
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    wsKey: WsKey,
  ): boolean {
    const topicName = request?.topic?.toLowerCase();
    if (!topicName) {
      return false;
    }

    return isPrivateWsTopic(topicName);
  }

  protected isWsPing(msg: any): boolean {
    if (!msg) {
      return false;
    }

    if (typeof msg?.data === 'string') {
      if (msg.data.includes('op": "ping')) {
        return true;
      }

      // console.log('isWsPing?', {
      //   data: msg.data,
      // });
      return false;
    }

    return false;
  }

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

      // console.log('isWsPong?', {
      //   data: msg.data,
      // });
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
    // const isWSAPIResponseEvent = wsKey === WS_KEY_MAP.v5PrivateTrade;

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
          // isWSAPIResponse: isWSAPIResponseEvent,
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
            // isWSAPIResponse: isWSAPIResponseEvent,
          });
          return results;
        }

        // These are r  equest/reply pattern events (e.g. after subscribing to topics or authenticating)
        if (EVENTS_RESPONSES.includes(eventOperation)) {
          results.push({
            eventType: 'response',
            event: parsed,
            // isWSAPIResponse: isWSAPIResponseEvent,
          });
          return results;
        }

        // Request/reply pattern for authentication success
        if (EVENTS_AUTHENTICATED.includes(eventOperation)) {
          results.push({
            eventType: 'authenticated',
            event: parsed,
            // isWSAPIResponse: isWSAPIResponseEvent,
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

  /**
   *
   *
   *
   * WS API Methods - similar to the REST API, but via WebSockets
   *
   *
   *
   */

  /**
   * Send a Websocket API event on a connection. Returns a promise that resolves on reply.
   *
   * Returned promise is rejected if an exception is detected in the reply OR the connection disconnects for any reason (even if automatic reconnect will happen).
   *
   * After a fresh connection, you should always send a login request first.
   *
   * If you authenticated once and you're reconnected later (e.g. connection temporarily lost), the SDK will by default automatically:
   * - Detect you were authenticated to the WS API before
   * - Try to re-authenticate (up to 5 times, in case something (bad timestamp) goes wrong)
   * - If it succeeds, it will emit the 'authenticated' event.
   * - If it fails and gives up, it will emit an 'exception' event (type: 'wsapi.auth', reason: detailed text).
   *
   * You can turn off the automatic re-auth WS API logic using `reauthWSAPIOnReconnect: false` in the WSClient config.
   *
   * @param wsKey - The connection this event is for (e.g. "spotV4" | "perpFuturesUSDTV4" | "perpFuturesBTCV4" | "deliveryFuturesUSDTV4" | "deliveryFuturesBTCV4" | "optionsV4")
   * @param channel - The channel this event is for (e.g. "spot.login" to authenticate)
   * @param params - Any request parameters for the payload (contents of req_param in the docs). Signature generation is automatic, only send parameters such as order ID as per the docs.
   * @returns Promise - tries to resolve with async WS API response. Rejects if disconnected or exception is seen in async WS API response
   */

  // This overload allows the caller to omit the 3rd param, if it isn't required (e.g. for the login call)
  async sendWSAPIRequest<
    TWSKey extends keyof WsAPIWsKeyTopicMap = keyof WsAPIWsKeyTopicMap,
    TWSOperation extends
      WsAPIWsKeyTopicMap[TWSKey] = WsAPIWsKeyTopicMap[TWSKey],
    TWSParams extends
      WsAPITopicRequestParamMap[TWSOperation] = WsAPITopicRequestParamMap[TWSOperation],
  >(
    wsKey: TWSKey,
    operation: TWSOperation,
    ...params: TWSParams extends undefined ? [] : [TWSParams]
  ): Promise<WsAPIOperationResponseMap[TWSOperation]>;

  async sendWSAPIRequest<
    TWSKey extends keyof WsAPIWsKeyTopicMap = keyof WsAPIWsKeyTopicMap,
    TWSOperation extends
      WsAPIWsKeyTopicMap[TWSKey] = WsAPIWsKeyTopicMap[TWSKey],
    TWSParams extends
      WsAPITopicRequestParamMap[TWSOperation] = WsAPITopicRequestParamMap[TWSOperation],
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

    const requestEvent: WSAPIRequest<TWSParams> = {
      reqId: this.getNewRequestId(),
      header: {
        'X-BAPI-RECV-WINDOW': `${this.options.recvWindow}`,
        'X-BAPI-TIMESTAMP': `${Date.now()}`,
        Referer: APIID,
      },
      op: operation,
      args: [params],
    };

    // Sign, if needed
    const signedEvent = await this.signWSAPIRequest(requestEvent);

    // Store deferred promise, resolved within the "resolveEmittableEvents" method while parsing incoming events
    const promiseRef = getPromiseRefForWSAPIRequest(requestEvent);

    const deferredPromise =
      this.getWsStore().createDeferredPromise<TWSAPIResponse>(
        wsKey,
        promiseRef,
        false,
      );

    this.logger.trace(
      `sendWSAPIRequest(): sending raw request: ${JSON.stringify(signedEvent, null, 2)}`,
    );

    // Send event
    this.tryWsSend(wsKey, JSON.stringify(signedEvent));

    this.logger.trace(`sendWSAPIRequest(): sent ${operation} event`);

    // Return deferred promise, so caller can await this call
    return deferredPromise.promise!;
  }
}
