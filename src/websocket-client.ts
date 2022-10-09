import { EventEmitter } from 'events';
import WebSocket from 'isomorphic-ws';

import { InverseClient } from './inverse-client';
import { LinearClient } from './linear-client';
import { SpotClientV3 } from './spot-client-v3';
import { SpotClient } from './spot-client';

import { signMessage } from './util/node-support';
import WsStore from './util/WsStore';

import {
  APIMarket,
  KlineInterval,
  RESTClient,
  WebsocketClientOptions,
  WSClientConfigurableOptions,
  WsKey,
  WsTopic,
} from './types';

import {
  serializeParams,
  isWsPong,
  WsConnectionStateEnum,
  PUBLIC_WS_KEYS,
  WS_AUTH_ON_CONNECT_KEYS,
  WS_KEY_MAP,
  DefaultLogger,
  WS_BASE_URL_MAP,
  getWsKeyForTopic,
  neverGuard,
  getMaxTopicsPerSubscribeEvent,
} from './util';
import { USDCOptionClient } from './usdc-option-client';
import { USDCPerpetualClient } from './usdc-perpetual-client';
import { UnifiedMarginClient } from './unified-margin-client';

const loggerCategory = { category: 'bybit-ws' };

export type WsClientEvent =
  | 'open'
  | 'update'
  | 'close'
  | 'error'
  | 'reconnect'
  | 'reconnected'
  | 'response';

interface WebsocketClientEvents {
  /** Connection opened. If this connection was previously opened and reconnected, expect the reconnected event instead */
  open: (evt: { wsKey: WsKey; event: any }) => void;
  /** Reconnecting a dropped connection */
  reconnect: (evt: { wsKey: WsKey; event: any }) => void;
  /** Successfully reconnected a connection that dropped */
  reconnected: (evt: { wsKey: WsKey; event: any }) => void;
  /** Connection closed */
  close: (evt: { wsKey: WsKey; event: any }) => void;
  /** Received reply to websocket command (e.g. after subscribing to topics) */
  response: (response: any) => void;
  /** Received data for topic */
  update: (response: any) => void;
  /** Exception from ws client OR custom listeners */
  error: (response: any) => void;
}

// Type safety for on and emit handlers: https://stackoverflow.com/a/61609010/880837
export declare interface WebsocketClient {
  on<U extends keyof WebsocketClientEvents>(
    event: U,
    listener: WebsocketClientEvents[U]
  ): this;

  emit<U extends keyof WebsocketClientEvents>(
    event: U,
    ...args: Parameters<WebsocketClientEvents[U]>
  ): boolean;
}

export class WebsocketClient extends EventEmitter {
  private logger: typeof DefaultLogger;
  private restClient?: RESTClient;
  private options: WebsocketClientOptions;
  private wsStore: WsStore;

  constructor(
    options: WSClientConfigurableOptions,
    logger?: typeof DefaultLogger
  ) {
    super();

    this.logger = logger || DefaultLogger;
    this.wsStore = new WsStore(this.logger);

    this.options = {
      testnet: false,
      pongTimeout: 1000,
      pingInterval: 10000,
      reconnectTimeout: 500,
      fetchTimeOffsetBeforeAuth: false,
      ...options,
    };
    this.options.restOptions = {
      ...this.options.restOptions,
      testnet: this.options.testnet,
    };

    this.prepareRESTClient();
  }

  /**
   * Subscribe to topics & track/persist them. They will be automatically resubscribed to if the connection drops/reconnects.
   * @param wsTopics topic or list of topics
   * @param isPrivateTopic optional - the library will try to detect private topics, you can use this to mark a topic as private (if the topic isn't recognised yet)
   */
  public subscribe(wsTopics: WsTopic[] | WsTopic, isPrivateTopic?: boolean) {
    const topics = Array.isArray(wsTopics) ? wsTopics : [wsTopics];

    topics.forEach((topic) => {
      const wsKey = getWsKeyForTopic(
        this.options.market,
        topic,
        isPrivateTopic
      );

      // Persist topic for reconnects
      this.wsStore.addTopic(wsKey, topic);

      // if connected, send subscription request
      if (
        this.wsStore.isConnectionState(wsKey, WsConnectionStateEnum.CONNECTED)
      ) {
        return this.requestSubscribeTopics(wsKey, [topic]);
      }

      // start connection process if it hasn't yet begun. Topics are automatically subscribed to on-connect
      if (
        !this.wsStore.isConnectionState(
          wsKey,
          WsConnectionStateEnum.CONNECTING
        ) &&
        !this.wsStore.isConnectionState(
          wsKey,
          WsConnectionStateEnum.RECONNECTING
        )
      ) {
        return this.connect(wsKey);
      }
    });
  }

  /**
   * Unsubscribe from topics & remove them from memory. They won't be re-subscribed to if the connection reconnects.
   * @param wsTopics topic or list of topics
   * @param isPrivateTopic optional - the library will try to detect private topics, you can use this to mark a topic as private (if the topic isn't recognised yet)
   */
  public unsubscribe(wsTopics: WsTopic[] | WsTopic, isPrivateTopic?: boolean) {
    const topics = Array.isArray(wsTopics) ? wsTopics : [wsTopics];
    topics.forEach((topic) => {
      const wsKey = getWsKeyForTopic(
        this.options.market,
        topic,
        isPrivateTopic
      );

      // Remove topic from persistence for reconnects
      this.wsStore.deleteTopic(wsKey, topic);

      // unsubscribe request only necessary if active connection exists
      if (
        this.wsStore.isConnectionState(wsKey, WsConnectionStateEnum.CONNECTED)
      ) {
        this.requestUnsubscribeTopics(wsKey, [topic]);
      }
    });
  }

  /**
   * @private Only used if we fetch exchange time before attempting auth. Disabled by default.
   * I've removed this for ftx and it's working great, tempted to remove this here
   */
  private prepareRESTClient(): void {
    switch (this.options.market) {
      case 'inverse': {
        this.restClient = new InverseClient(
          this.options.restOptions,
          this.options.requestOptions
        );
        break;
      }
      case 'linear': {
        this.restClient = new LinearClient(
          this.options.restOptions,
          this.options.requestOptions
        );
        break;
      }
      case 'spot': {
        this.restClient = new SpotClient(
          this.options.restOptions,
          this.options.requestOptions
        );
        this.connectPublic();
        break;
      }
      case 'spotv3': {
        this.restClient = new SpotClientV3(
          this.options.restOptions,
          this.options.requestOptions
        );
        break;
      }
      case 'usdcOption': {
        this.restClient = new USDCOptionClient(
          this.options.restOptions,
          this.options.requestOptions
        );
        break;
      }
      case 'usdcPerp': {
        this.restClient = new USDCPerpetualClient(
          this.options.restOptions,
          this.options.requestOptions
        );
        break;
      }
      case 'unifiedOption':
      case 'unifiedPerp': {
        this.restClient = new UnifiedMarginClient(
          this.options.restOptions,
          this.options.requestOptions
        );
        break;
      }
      default: {
        throw neverGuard(
          this.options.market,
          `prepareRESTClient(): Unhandled market`
        );
      }
    }
  }

  /** Get the WsStore that tracks websockets & topics */
  public getWsStore(): WsStore {
    return this.wsStore;
  }

  public isTestnet(): boolean {
    return this.options.testnet === true;
  }

  public close(wsKey: WsKey, force?: boolean) {
    this.logger.info('Closing connection', { ...loggerCategory, wsKey });
    this.setWsState(wsKey, WsConnectionStateEnum.CLOSING);
    this.clearTimers(wsKey);

    const ws = this.getWs(wsKey);
    ws?.close();
    if (force) {
      ws?.terminate();
    }
  }

  public closeAll(force?: boolean) {
    const keys = this.wsStore.getKeys();
    keys.forEach((key) => {
      this.close(key, force);
    });
  }

  /**
   * Request connection of all dependent (public & private) websockets, instead of waiting for automatic connection by library
   */
  public connectAll(): Promise<WebSocket | undefined>[] {
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
      case 'unifiedOption': {
        return [...this.connectPublic(), this.connectPrivate()];
      }
      default: {
        throw neverGuard(this.options.market, `connectAll(): Unhandled market`);
      }
    }
  }

  public connectPublic(): Promise<WebSocket | undefined>[] {
    switch (this.options.market) {
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
      default: {
        throw neverGuard(
          this.options.market,
          `connectPublic(): Unhandled market`
        );
      }
    }
  }

  public connectPrivate(): Promise<WebSocket | undefined> {
    switch (this.options.market) {
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
      default: {
        throw neverGuard(
          this.options.market,
          `connectPrivate(): Unhandled market`
        );
      }
    }
  }

  private async connect(wsKey: WsKey): Promise<WebSocket | undefined> {
    try {
      if (this.wsStore.isWsOpen(wsKey)) {
        this.logger.error(
          'Refused to connect to ws with existing active connection',
          { ...loggerCategory, wsKey }
        );
        return this.wsStore.getWs(wsKey);
      }

      if (
        this.wsStore.isConnectionState(wsKey, WsConnectionStateEnum.CONNECTING)
      ) {
        this.logger.error(
          'Refused to connect to ws, connection attempt already active',
          { ...loggerCategory, wsKey }
        );
        return;
      }

      if (
        !this.wsStore.getConnectionState(wsKey) ||
        this.wsStore.isConnectionState(wsKey, WsConnectionStateEnum.INITIAL)
      ) {
        this.setWsState(wsKey, WsConnectionStateEnum.CONNECTING);
      }

      const authParams = await this.getAuthParams(wsKey);
      const url = this.getWsUrl(wsKey) + authParams;
      const ws = this.connectToWsUrl(url, wsKey);

      return this.wsStore.setWs(wsKey, ws);
    } catch (err) {
      this.parseWsError('Connection failed', err, wsKey);
      this.reconnectWithDelay(wsKey, this.options.reconnectTimeout!);
    }
  }

  private parseWsError(context: string, error: any, wsKey: WsKey) {
    if (!error.message) {
      this.logger.error(`${context} due to unexpected error: `, error);
      this.emit('error', error);
      return;
    }

    switch (error.message) {
      case 'Unexpected server response: 401':
        this.logger.error(`${context} due to 401 authorization failure.`, {
          ...loggerCategory,
          wsKey,
        });
        break;

      default:
        this.logger.error(
          `${context} due to unexpected response error: "${
            error?.msg || error?.message || error
          }"`,
          { ...loggerCategory, wsKey, error }
        );
        break;
    }
    this.emit('error', error);
  }

  /**
   * Return params required to make authorized request
   */
  private async getAuthParams(wsKey: WsKey): Promise<string> {
    if (PUBLIC_WS_KEYS.includes(wsKey)) {
      this.logger.debug('Starting public only websocket client.', {
        ...loggerCategory,
        wsKey,
      });
      return '';
    }

    try {
      const { signature, expiresAt } = await this.getWsAuthSignature(wsKey);

      const authParams = {
        api_key: this.options.key,
        expires: expiresAt,
        signature,
      };

      return '?' + serializeParams(authParams);
    } catch (e) {
      this.logger.error(e, { ...loggerCategory, wsKey });
      return '';
    }
  }

  private async sendAuthRequest(wsKey: WsKey): Promise<void> {
    try {
      const { signature, expiresAt } = await this.getWsAuthSignature(wsKey);

      const request = {
        op: 'auth',
        args: [this.options.key, expiresAt, signature],
        req_id: `${wsKey}-auth`,
      };

      return this.tryWsSend(wsKey, JSON.stringify(request));
    } catch (e) {
      this.logger.error(e, { ...loggerCategory, wsKey });
    }
  }

  private async getWsAuthSignature(
    wsKey: WsKey
  ): Promise<{ expiresAt: number; signature: string }> {
    const { key, secret } = this.options;

    if (!key || !secret) {
      this.logger.warning(
        'Cannot authenticate websocket, either api or private keys missing.',
        { ...loggerCategory, wsKey }
      );
      throw new Error(`Cannot auth - missing api or secret in config`);
    }

    this.logger.debug("Getting auth'd request params", {
      ...loggerCategory,
      wsKey,
    });

    const timeOffset = this.options.fetchTimeOffsetBeforeAuth
      ? (await this.restClient?.fetchTimeOffset()) || 0
      : 0;

    const signatureExpiresAt = Date.now() + timeOffset + 5000;

    const signature = await signMessage(
      'GET/realtime' + signatureExpiresAt,
      secret
    );

    return {
      expiresAt: signatureExpiresAt,
      signature,
    };
  }

  private reconnectWithDelay(wsKey: WsKey, connectionDelayMs: number) {
    this.clearTimers(wsKey);
    if (
      this.wsStore.getConnectionState(wsKey) !==
      WsConnectionStateEnum.CONNECTING
    ) {
      this.setWsState(wsKey, WsConnectionStateEnum.RECONNECTING);
    }

    this.wsStore.get(wsKey, true).activeReconnectTimer = setTimeout(() => {
      this.logger.info('Reconnecting to websocket', {
        ...loggerCategory,
        wsKey,
      });
      this.connect(wsKey);
    }, connectionDelayMs);
  }

  private ping(wsKey: WsKey) {
    if (this.wsStore.get(wsKey, true).activePongTimer) {
      return;
    }

    this.clearPongTimer(wsKey);

    this.logger.silly('Sending ping', { ...loggerCategory, wsKey });
    this.tryWsSend(wsKey, JSON.stringify({ op: 'ping' }));

    this.wsStore.get(wsKey, true).activePongTimer = setTimeout(() => {
      this.logger.info('Pong timeout - closing socket to reconnect', {
        ...loggerCategory,
        wsKey,
      });
      this.getWs(wsKey)?.terminate();
      delete this.wsStore.get(wsKey, true).activePongTimer;
    }, this.options.pongTimeout);
  }

  private clearTimers(wsKey: WsKey) {
    this.clearPingTimer(wsKey);
    this.clearPongTimer(wsKey);
    const wsState = this.wsStore.get(wsKey);
    if (wsState?.activeReconnectTimer) {
      clearTimeout(wsState.activeReconnectTimer);
    }
  }

  // Send a ping at intervals
  private clearPingTimer(wsKey: WsKey) {
    const wsState = this.wsStore.get(wsKey);
    if (wsState?.activePingTimer) {
      clearInterval(wsState.activePingTimer);
      wsState.activePingTimer = undefined;
    }
  }

  // Expect a pong within a time limit
  private clearPongTimer(wsKey: WsKey) {
    const wsState = this.wsStore.get(wsKey);
    if (wsState?.activePongTimer) {
      clearTimeout(wsState.activePongTimer);
      wsState.activePongTimer = undefined;
    }
  }

  /**
   * @private Use the `subscribe(topics)` method to subscribe to topics. Send WS message to subscribe to topics.
   */
  private requestSubscribeTopics(wsKey: WsKey, topics: string[]) {
    if (!topics.length) {
      return;
    }

    const maxTopicsPerEvent = getMaxTopicsPerSubscribeEvent(
      this.options.market
    );
    if (maxTopicsPerEvent && topics.length > maxTopicsPerEvent) {
      this.logger.silly(
        `Subscribing to topics in batches of ${maxTopicsPerEvent}`
      );
      for (var i = 0; i < topics.length; i += maxTopicsPerEvent) {
        const batch = topics.slice(i, i + maxTopicsPerEvent);
        this.logger.silly(`Subscribing to batch of ${batch.length}`);
        this.requestSubscribeTopics(wsKey, batch);
      }
      this.logger.silly(
        `Finished batch subscribing to ${topics.length} topics`
      );
      return;
    }

    const wsMessage = JSON.stringify({
      req_id: topics.join(','),
      op: 'subscribe',
      args: topics,
    });

    this.tryWsSend(wsKey, wsMessage);
  }

  /**
   * @private Use the `unsubscribe(topics)` method to unsubscribe from topics. Send WS message to unsubscribe from topics.
   */
  private requestUnsubscribeTopics(wsKey: WsKey, topics: string[]) {
    if (!topics.length) {
      return;
    }

    const maxTopicsPerEvent = getMaxTopicsPerSubscribeEvent(
      this.options.market
    );
    if (maxTopicsPerEvent && topics.length > maxTopicsPerEvent) {
      this.logger.silly(
        `Unsubscribing to topics in batches of ${maxTopicsPerEvent}`
      );
      for (var i = 0; i < topics.length; i += maxTopicsPerEvent) {
        const batch = topics.slice(i, i + maxTopicsPerEvent);
        this.logger.silly(`Unsubscribing to batch of ${batch.length}`);
        this.requestUnsubscribeTopics(wsKey, batch);
      }
      this.logger.silly(
        `Finished batch unsubscribing to ${topics.length} topics`
      );
      return;
    }

    const wsMessage = JSON.stringify({
      op: 'unsubscribe',
      args: topics,
    });

    this.tryWsSend(wsKey, wsMessage);
  }

  public tryWsSend(wsKey: WsKey, wsMessage: string) {
    try {
      this.logger.silly(`Sending upstream ws message: `, {
        ...loggerCategory,
        wsMessage,
        wsKey,
      });
      if (!wsKey) {
        throw new Error(
          'Cannot send message due to no known websocket for this wsKey'
        );
      }
      const ws = this.getWs(wsKey);
      if (!ws) {
        throw new Error(
          `${wsKey} socket not connected yet, call "connect(${wsKey}) first then try again when the "open" event arrives`
        );
      }
      ws.send(wsMessage);
    } catch (e) {
      this.logger.error(`Failed to send WS message`, {
        ...loggerCategory,
        wsMessage,
        wsKey,
        exception: e,
      });
    }
  }

  private connectToWsUrl(url: string, wsKey: WsKey): WebSocket {
    this.logger.silly(`Opening WS connection to URL: ${url}`, {
      ...loggerCategory,
      wsKey,
    });

    const agent = this.options.requestOptions?.agent;
    const ws = new WebSocket(url, undefined, agent ? { agent } : undefined);
    ws.onopen = (event) => this.onWsOpen(event, wsKey);
    ws.onmessage = (event) => this.onWsMessage(event, wsKey);
    ws.onerror = (event) => this.onWsError(event, wsKey);
    ws.onclose = (event) => this.onWsClose(event, wsKey);

    return ws;
  }

  private async onWsOpen(event, wsKey: WsKey) {
    if (
      this.wsStore.isConnectionState(wsKey, WsConnectionStateEnum.CONNECTING)
    ) {
      this.logger.info('Websocket connected', {
        ...loggerCategory,
        wsKey,
        testnet: this.isTestnet(),
        market: this.options.market,
      });
      this.emit('open', { wsKey, event });
    } else if (
      this.wsStore.isConnectionState(wsKey, WsConnectionStateEnum.RECONNECTING)
    ) {
      this.logger.info('Websocket reconnected', { ...loggerCategory, wsKey });
      this.emit('reconnected', { wsKey, event });
    }

    this.setWsState(wsKey, WsConnectionStateEnum.CONNECTED);

    // Some websockets require an auth packet to be sent after opening the connection
    if (WS_AUTH_ON_CONNECT_KEYS.includes(wsKey)) {
      this.logger.info(`Sending auth request...`);
      await this.sendAuthRequest(wsKey);
    }

    // TODO: persistence not working yet for spot v1 topics
    if (wsKey !== WS_KEY_MAP.spotPublic && wsKey !== WS_KEY_MAP.spotPrivate) {
      this.requestSubscribeTopics(wsKey, [...this.wsStore.getTopics(wsKey)]);
    }

    this.wsStore.get(wsKey, true)!.activePingTimer = setInterval(
      () => this.ping(wsKey),
      this.options.pingInterval
    );
  }

  private onWsMessage(event, wsKey: WsKey) {
    try {
      // any message can clear the pong timer - wouldn't get a message if the ws dropped
      this.clearPongTimer(wsKey);

      const msg = JSON.parse((event && event.data) || event);
      // this.logger.silly('Received event', {
      //   ...loggerCategory,
      //   wsKey,
      //   msg: JSON.stringify(msg),
      // });

      // TODO: cleanme
      if (msg['success'] || msg?.pong || isWsPong(msg)) {
        if (isWsPong(msg)) {
          this.logger.silly('Received pong', { ...loggerCategory, wsKey });
        } else {
          this.emit('response', { ...msg, wsKey });
        }
        return;
      }

      if (msg['finalFragment']) {
        return this.emit('response', { ...msg, wsKey });
      }
      if (msg?.topic) {
        return this.emit('update', { ...msg, wsKey });
      }

      if (
        // spot v1
        msg?.code ||
        // spot v3
        msg?.type === 'error' ||
        // usdc options
        msg?.success === false
      ) {
        return this.emit('error', { ...msg, wsKey });
      }

      this.logger.warning('Unhandled/unrecognised ws event message', {
        ...loggerCategory,
        message: msg,
        event,
        wsKey,
      });
    } catch (e) {
      this.logger.error('Failed to parse ws event message', {
        ...loggerCategory,
        error: e,
        event,
        wsKey,
      });
    }
  }

  private onWsError(error: any, wsKey: WsKey) {
    this.parseWsError('Websocket error', error, wsKey);
  }

  private onWsClose(event, wsKey: WsKey) {
    this.logger.info('Websocket connection closed', {
      ...loggerCategory,
      wsKey,
    });

    if (
      this.wsStore.getConnectionState(wsKey) !== WsConnectionStateEnum.CLOSING
    ) {
      this.reconnectWithDelay(wsKey, this.options.reconnectTimeout!);
      this.emit('reconnect', { wsKey, event });
    } else {
      this.setWsState(wsKey, WsConnectionStateEnum.INITIAL);
      this.emit('close', { wsKey, event });
    }
  }

  private getWs(wsKey: WsKey) {
    return this.wsStore.getWs(wsKey);
  }

  private setWsState(wsKey: WsKey, state: WsConnectionStateEnum) {
    this.wsStore.setConnectionState(wsKey, state);
  }

  private getWsUrl(wsKey: WsKey): string {
    if (this.options.wsUrl) {
      return this.options.wsUrl;
    }

    const networkKey = this.isTestnet() ? 'testnet' : 'livenet';

    switch (wsKey) {
      case WS_KEY_MAP.linearPublic: {
        return WS_BASE_URL_MAP.linear.public[networkKey];
      }
      case WS_KEY_MAP.linearPrivate: {
        return WS_BASE_URL_MAP.linear.private[networkKey];
      }
      case WS_KEY_MAP.spotPublic: {
        return WS_BASE_URL_MAP.spot.public[networkKey];
      }
      case WS_KEY_MAP.spotPrivate: {
        return WS_BASE_URL_MAP.spot.private[networkKey];
      }
      case WS_KEY_MAP.spotV3Public: {
        return WS_BASE_URL_MAP.spotv3.public[networkKey];
      }
      case WS_KEY_MAP.spotV3Private: {
        return WS_BASE_URL_MAP.spotv3.private[networkKey];
      }
      case WS_KEY_MAP.inverse: {
        // private and public are on the same WS connection
        return WS_BASE_URL_MAP.inverse.public[networkKey];
      }
      case WS_KEY_MAP.usdcOptionPublic: {
        return WS_BASE_URL_MAP.usdcOption.public[networkKey];
      }
      case WS_KEY_MAP.usdcOptionPrivate: {
        return WS_BASE_URL_MAP.usdcOption.private[networkKey];
      }
      case WS_KEY_MAP.usdcPerpPublic: {
        return WS_BASE_URL_MAP.usdcPerp.public[networkKey];
      }
      case WS_KEY_MAP.usdcPerpPrivate: {
        return WS_BASE_URL_MAP.usdcPerp.private[networkKey];
      }
      case WS_KEY_MAP.unifiedOptionPublic: {
        return WS_BASE_URL_MAP.unifiedOption.public[networkKey];
      }
      case WS_KEY_MAP.unifiedPerpUSDTPublic: {
        return WS_BASE_URL_MAP.unifiedPerpUSDT.public[networkKey];
      }
      case WS_KEY_MAP.unifiedPerpUSDCPublic: {
        return WS_BASE_URL_MAP.unifiedPerpUSDC.public[networkKey];
      }
      case WS_KEY_MAP.unifiedPrivate: {
        return WS_BASE_URL_MAP.unifiedPerp.private[networkKey];
      }
      default: {
        this.logger.error('getWsUrl(): Unhandled wsKey: ', {
          ...loggerCategory,
          wsKey,
        });
        throw neverGuard(wsKey, `getWsUrl(): Unhandled wsKey`);
      }
    }
  }

  private wrongMarketError(market: APIMarket) {
    return new Error(
      `This WS client was instanced for the ${this.options.market} market. Make another WebsocketClient instance with "market: '${market}' to listen to spot topics`
    );
  }

  /** @deprecated use "market: 'spotv3" client */
  public subscribePublicSpotTrades(symbol: string, binary?: boolean) {
    if (this.options.market !== 'spot') {
      throw this.wrongMarketError('spot');
    }

    return this.tryWsSend(
      WS_KEY_MAP.spotPublic,
      JSON.stringify({
        topic: 'trade',
        event: 'sub',
        symbol,
        params: {
          binary: !!binary,
        },
      })
    );
  }

  /** @deprecated use "market: 'spotv3" client */
  public subscribePublicSpotTradingPair(symbol: string, binary?: boolean) {
    if (this.options.market !== 'spot') {
      throw this.wrongMarketError('spot');
    }

    return this.tryWsSend(
      WS_KEY_MAP.spotPublic,
      JSON.stringify({
        symbol,
        topic: 'realtimes',
        event: 'sub',
        params: {
          binary: !!binary,
        },
      })
    );
  }

  /** @deprecated use "market: 'spotv3" client */
  public subscribePublicSpotV1Kline(
    symbol: string,
    candleSize: KlineInterval,
    binary?: boolean
  ) {
    if (this.options.market !== 'spot') {
      throw this.wrongMarketError('spot');
    }

    return this.tryWsSend(
      WS_KEY_MAP.spotPublic,
      JSON.stringify({
        symbol,
        topic: 'kline_' + candleSize,
        event: 'sub',
        params: {
          binary: !!binary,
        },
      })
    );
  }

  //ws.send('{"symbol":"BTCUSDT","topic":"depth","event":"sub","params":{"binary":false}}');
  //ws.send('{"symbol":"BTCUSDT","topic":"mergedDepth","event":"sub","params":{"binary":false,"dumpScale":1}}');
  //ws.send('{"symbol":"BTCUSDT","topic":"diffDepth","event":"sub","params":{"binary":false}}');

  /** @deprecated use "market: 'spotv3" client */
  public subscribePublicSpotOrderbook(
    symbol: string,
    depth: 'full' | 'merge' | 'delta',
    dumpScale?: number,
    binary?: boolean
  ) {
    if (this.options.market !== 'spot') {
      throw this.wrongMarketError('spot');
    }

    let topic: string;
    switch (depth) {
      case 'full': {
        topic = 'depth';
        break;
      }
      case 'merge': {
        topic = 'mergedDepth';
        if (!dumpScale) {
          throw new Error(`Dumpscale must be provided for merged orderbooks`);
        }
        break;
      }
      case 'delta': {
        topic = 'diffDepth';
        break;
      }
    }

    const msg: any = {
      symbol,
      topic,
      event: 'sub',
      params: {
        binary: !!binary,
      },
    };
    if (dumpScale) {
      msg.params.dumpScale = dumpScale;
    }
    return this.tryWsSend(WS_KEY_MAP.spotPublic, JSON.stringify(msg));
  }
}
