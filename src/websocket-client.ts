import { EventEmitter } from 'events';
import WebSocket from 'isomorphic-ws';

import { InverseClient } from './inverse-client';
import { LinearClient } from './linear-client';
import { SpotClientV3 } from './spot-client-v3';
import { SpotClient } from './spot-client';

import { DefaultLogger } from './util/logger';
import {
  APIMarket,
  KlineInterval,
  RESTClient,
  WebsocketClientOptions,
  WSClientConfigurableOptions,
  WsKey,
  WsTopic,
} from './types';

import { signMessage } from './util/node-support';

import WsStore from './util/WsStore';
import {
  serializeParams,
  isWsPong,
  getLinearWsKeyForTopic,
  getSpotWsKeyForTopic,
  wsKeyInverse,
  wsKeyLinearPrivate,
  wsKeyLinearPublic,
  wsKeySpotPrivate,
  wsKeySpotPublic,
  WsConnectionStateEnum,
} from './util';

const inverseEndpoints = {
  livenet: 'wss://stream.bybit.com/realtime',
  testnet: 'wss://stream-testnet.bybit.com/realtime',
};

const linearEndpoints = {
  private: {
    livenet: 'wss://stream.bybit.com/realtime_private',
    livenet2: 'wss://stream.bytick.com/realtime_private',
    testnet: 'wss://stream-testnet.bybit.com/realtime_private',
  },
  public: {
    livenet: 'wss://stream.bybit.com/realtime_public',
    livenet2: 'wss://stream.bytick.com/realtime_public',
    testnet: 'wss://stream-testnet.bybit.com/realtime_public',
  },
};

const spotEndpoints = {
  private: {
    livenet: 'wss://stream.bybit.com/spot/ws',
    testnet: 'wss://stream-testnet.bybit.com/spot/ws',
  },
  public: {
    livenet: 'wss://stream.bybit.com/spot/quote/ws/v1',
    livenet2: 'wss://stream.bybit.com/spot/quote/ws/v2',
    testnet: 'wss://stream-testnet.bybit.com/spot/quote/ws/v1',
    testnet2: 'wss://stream-testnet.bybit.com/spot/quote/ws/v2',
  },
};

const loggerCategory = { category: 'bybit-ws' };

export declare interface WebsocketClient {
  on(
    event: 'open' | 'reconnected',
    listener: ({ wsKey: WsKey, event: any }) => void
  ): this;
  on(
    event: 'response' | 'update' | 'error',
    listener: (response: any) => void
  ): this;
  on(event: 'reconnect' | 'close', listener: ({ wsKey: WsKey }) => void): this;
}

export class WebsocketClient extends EventEmitter {
  private logger: typeof DefaultLogger;
  /** Purely used */
  private restClient: RESTClient;
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
      livenet: false,
      pongTimeout: 1000,
      pingInterval: 10000,
      reconnectTimeout: 500,
      fetchTimeOffsetBeforeAuth: false,
      ...options,
    };

    if (this.isV3()) {
      this.restClient = new SpotClientV3(
        undefined,
        undefined,
        this.isLivenet(),
        this.options.restOptions,
        this.options.requestOptions
      );
    } else if (this.isLinear()) {
      this.restClient = new LinearClient(
        undefined,
        undefined,
        this.isLivenet(),
        this.options.restOptions,
        this.options.requestOptions
      );
    } else if (this.isSpot()) {
      this.restClient = new SpotClient(
        undefined,
        undefined,
        this.isLivenet(),
        this.options.restOptions,
        this.options.requestOptions
      );
      this.connectPublic();
    } else {
      this.restClient = new InverseClient(
        undefined,
        undefined,
        this.isLivenet(),
        this.options.restOptions,
        this.options.requestOptions
      );
    }
  }

  public isLivenet(): boolean {
    return this.options.livenet === true;
  }

  public isLinear(): boolean {
    return this.options.market === 'linear';
  }

  public isSpot(): boolean {
    return this.options.market === 'spot';
  }

  public isInverse(): boolean {
    return this.options.market === 'inverse';
  }

  /** USDC, spot v3, unified margin, account asset */
  public isV3(): boolean {
    return this.options.market === 'v3';
  }

  /**
   * Add topic/topics to WS subscription list
   */
  public subscribe(wsTopics: WsTopic[] | WsTopic) {
    const topics = Array.isArray(wsTopics) ? wsTopics : [wsTopics];
    topics.forEach((topic) =>
      this.wsStore.addTopic(this.getWsKeyForTopic(topic), topic)
    );

    // attempt to send subscription topic per websocket
    this.wsStore.getKeys().forEach((wsKey: WsKey) => {
      // if connected, send subscription request
      if (
        this.wsStore.isConnectionState(wsKey, WsConnectionStateEnum.CONNECTED)
      ) {
        return this.requestSubscribeTopics(wsKey, topics);
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
   * Remove topic/topics from WS subscription list
   */
  public unsubscribe(wsTopics: WsTopic[] | WsTopic) {
    const topics = Array.isArray(wsTopics) ? wsTopics : [wsTopics];
    topics.forEach((topic) =>
      this.wsStore.deleteTopic(this.getWsKeyForTopic(topic), topic)
    );

    this.wsStore.getKeys().forEach((wsKey: WsKey) => {
      // unsubscribe request only necessary if active connection exists
      if (
        this.wsStore.isConnectionState(wsKey, WsConnectionStateEnum.CONNECTED)
      ) {
        this.requestUnsubscribeTopics(wsKey, topics);
      }
    });
  }

  public close(wsKey: WsKey) {
    this.logger.info('Closing connection', { ...loggerCategory, wsKey });
    this.setWsState(wsKey, WsConnectionStateEnum.CLOSING);
    this.clearTimers(wsKey);

    this.getWs(wsKey)?.close();
  }

  /**
   * Request connection of all dependent (public & private) websockets, instead of waiting for automatic connection by library
   */
  public connectAll(): Promise<WebSocket | undefined>[] | undefined {
    if (this.isInverse()) {
      return [this.connect(wsKeyInverse)];
    }

    if (this.isLinear()) {
      return [
        this.connect(wsKeyLinearPublic),
        this.connect(wsKeyLinearPrivate),
      ];
    }

    if (this.isSpot()) {
      return [this.connect(wsKeySpotPublic), this.connect(wsKeySpotPrivate)];
    }
  }

  public connectPublic(): Promise<WebSocket | undefined> | undefined {
    if (this.isInverse()) {
      return this.connect(wsKeyInverse);
    }

    if (this.isLinear()) {
      return this.connect(wsKeyLinearPublic);
    }

    if (this.isSpot()) {
      return this.connect(wsKeySpotPublic);
    }
  }

  public connectPrivate(): Promise<WebSocket | undefined> | undefined {
    if (this.isInverse()) {
      return this.connect(wsKeyInverse);
    }

    if (this.isLinear()) {
      return this.connect(wsKeyLinearPrivate);
    }

    if (this.isSpot()) {
      return this.connect(wsKeySpotPrivate);
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
          `{context} due to unexpected response error: ${error.msg}`,
          { ...loggerCategory, wsKey }
        );
        break;
    }
  }

  /**
   * Return params required to make authorized request
   */
  private async getAuthParams(wsKey: WsKey): Promise<string> {
    const { key, secret } = this.options;

    if (
      key &&
      secret &&
      wsKey !== wsKeyLinearPublic &&
      wsKey !== wsKeySpotPublic
    ) {
      this.logger.debug("Getting auth'd request params", {
        ...loggerCategory,
        wsKey,
      });

      const timeOffset = this.options.fetchTimeOffsetBeforeAuth
        ? await this.restClient.fetchTimeOffset()
        : 0;

      const signatureExpires = Date.now() + timeOffset + 5000;

      const signature = await signMessage(
        'GET/realtime' + signatureExpires,
        secret
      );

      const authParams = {
        api_key: this.options.key,
        expires: signatureExpires,
        signature,
      };

      return '?' + serializeParams(authParams);
    } else if (!key || !secret) {
      this.logger.warning(
        'Cannot authenticate websocket, either api or private keys missing.',
        { ...loggerCategory, wsKey }
      );
    } else {
      this.logger.debug('Starting public only websocket client.', {
        ...loggerCategory,
        wsKey,
      });
    }

    return '';
  }

  private reconnectWithDelay(wsKey: WsKey, connectionDelayMs: number) {
    this.clearTimers(wsKey);
    if (
      this.wsStore.getConnectionState(wsKey) !==
      WsConnectionStateEnum.CONNECTING
    ) {
      this.setWsState(wsKey, WsConnectionStateEnum.RECONNECTING);
    }

    setTimeout(() => {
      this.logger.info('Reconnecting to websocket', {
        ...loggerCategory,
        wsKey,
      });
      this.connect(wsKey);
    }, connectionDelayMs);
  }

  private ping(wsKey: WsKey) {
    this.clearPongTimer(wsKey);

    this.logger.silly('Sending ping', { ...loggerCategory, wsKey });
    this.tryWsSend(wsKey, JSON.stringify({ op: 'ping' }));

    this.wsStore.get(wsKey, true)!.activePongTimer = setTimeout(() => {
      this.logger.info('Pong timeout - closing socket to reconnect', {
        ...loggerCategory,
        wsKey,
      });
      this.getWs(wsKey)?.close();
    }, this.options.pongTimeout);
  }

  private clearTimers(wsKey: WsKey) {
    this.clearPingTimer(wsKey);
    this.clearPongTimer(wsKey);
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
   * Send WS message to subscribe to topics.
   */
  private requestSubscribeTopics(wsKey: WsKey, topics: string[]) {
    if (!topics.length) {
      return;
    }
    const wsMessage = JSON.stringify({
      op: 'subscribe',
      args: topics,
    });

    this.tryWsSend(wsKey, wsMessage);
  }

  /**
   * Send WS message to unsubscribe from topics.
   */
  private requestUnsubscribeTopics(wsKey: WsKey, topics: string[]) {
    if (!topics.length) {
      return;
    }
    const wsMessage = JSON.stringify({
      op: 'unsubscribe',
      args: topics,
    });

    this.tryWsSend(wsKey, wsMessage);
  }

  private tryWsSend(wsKey: WsKey, wsMessage: string) {
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

  private onWsOpen(event, wsKey: WsKey) {
    if (
      this.wsStore.isConnectionState(wsKey, WsConnectionStateEnum.CONNECTING)
    ) {
      this.logger.info('Websocket connected', {
        ...loggerCategory,
        wsKey,
        livenet: this.isLivenet(),
        linear: this.isLinear(),
        spot: this.isSpot(),
      });
      this.emit('open', { wsKey, event });
    } else if (
      this.wsStore.isConnectionState(wsKey, WsConnectionStateEnum.RECONNECTING)
    ) {
      this.logger.info('Websocket reconnected', { ...loggerCategory, wsKey });
      this.emit('reconnected', { wsKey, event });
    }

    this.setWsState(wsKey, WsConnectionStateEnum.CONNECTED);

    // TODO: persistence not working yet for spot topics
    if (wsKey !== 'spotPublic' && wsKey !== 'spotPrivate') {
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
      if (msg['success'] || msg?.pong) {
        return this.onWsMessageResponse(msg, wsKey);
      }

      if (msg.topic) {
        return this.emit('update', msg);
      }

      this.logger.warning('Got unhandled ws message', {
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
    if (
      this.wsStore.isConnectionState(wsKey, WsConnectionStateEnum.CONNECTED)
    ) {
      this.emit('error', error);
    }
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
      this.emit('reconnect', { wsKey });
    } else {
      this.setWsState(wsKey, WsConnectionStateEnum.INITIAL);
      this.emit('close', { wsKey });
    }
  }

  private onWsMessageResponse(response: any, wsKey: WsKey) {
    if (isWsPong(response)) {
      this.logger.silly('Received pong', { ...loggerCategory, wsKey });
    } else {
      this.emit('response', response);
    }
  }

  private getWs(wsKey: string) {
    return this.wsStore.getWs(wsKey);
  }

  private setWsState(wsKey: WsKey, state: WsConnectionStateEnum) {
    this.wsStore.setConnectionState(wsKey, state);
  }

  private getWsUrl(wsKey: WsKey): string {
    if (this.options.wsUrl) {
      return this.options.wsUrl;
    }

    const networkKey = this.isLivenet() ? 'livenet' : 'testnet';
    // TODO: repetitive
    if (this.isLinear() || wsKey.startsWith('linear')) {
      if (wsKey === wsKeyLinearPublic) {
        return linearEndpoints.public[networkKey];
      }

      if (wsKey === wsKeyLinearPrivate) {
        return linearEndpoints.private[networkKey];
      }

      this.logger.error('Unhandled linear wsKey: ', {
        ...loggerCategory,
        wsKey,
      });
      return linearEndpoints[networkKey];
    }

    if (this.isSpot() || wsKey.startsWith('spot')) {
      if (wsKey === wsKeySpotPublic) {
        return spotEndpoints.public[networkKey];
      }

      if (wsKey === wsKeySpotPrivate) {
        return spotEndpoints.private[networkKey];
      }

      this.logger.error('Unhandled spot wsKey: ', { ...loggerCategory, wsKey });
      return spotEndpoints[networkKey];
    }

    // fallback to inverse
    return inverseEndpoints[networkKey];
  }

  private getWsKeyForTopic(topic: string) {
    if (this.isInverse()) {
      return wsKeyInverse;
    }
    if (this.isLinear()) {
      return getLinearWsKeyForTopic(topic);
    }
    return getSpotWsKeyForTopic(topic);
  }

  private wrongMarketError(market: APIMarket) {
    return new Error(
      `This WS client was instanced for the ${this.options.market} market. Make another WebsocketClient instance with "market: '${market}' to listen to spot topics`
    );
  }

  // TODO: persistance for subbed topics. Look at ftx-api implementation.
  public subscribePublicSpotTrades(symbol: string, binary?: boolean) {
    if (!this.isSpot()) {
      throw this.wrongMarketError('spot');
    }

    return this.tryWsSend(
      wsKeySpotPublic,
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

  public subscribePublicSpotTradingPair(symbol: string, binary?: boolean) {
    if (!this.isSpot()) {
      throw this.wrongMarketError('spot');
    }

    return this.tryWsSend(
      wsKeySpotPublic,
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

  public subscribePublicSpotV1Kline(
    symbol: string,
    candleSize: KlineInterval,
    binary?: boolean
  ) {
    if (!this.isSpot()) {
      throw this.wrongMarketError('spot');
    }

    return this.tryWsSend(
      wsKeySpotPublic,
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
  public subscribePublicSpotOrderbook(
    symbol: string,
    depth: 'full' | 'merge' | 'delta',
    dumpScale?: number,
    binary?: boolean
  ) {
    if (!this.isSpot()) {
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
    return this.tryWsSend(wsKeySpotPublic, JSON.stringify(msg));
  }
}
