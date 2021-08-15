import { EventEmitter } from 'events';
import WebSocket from 'isomorphic-ws';

import { InverseClient } from './inverse-client';
import { LinearClient } from './linear-client';
import { DefaultLogger } from './logger';
import { KlineInterval } from './types/shared';
import { signMessage } from './util/node-support';
import { serializeParams, isWsPong } from './util/requestUtils';

import WsStore from './util/WsStore';

const inverseEndpoints = {
  livenet: 'wss://stream.bybit.com/realtime',
  testnet: 'wss://stream-testnet.bybit.com/realtime'
};

const linearEndpoints = {
  private: {
    livenet: 'wss://stream.bybit.com/realtime_private',
    livenet2: 'wss://stream.bytick.com/realtime_private',
    testnet: 'wss://stream-testnet.bybit.com/realtime_private'
  },
  public: {
    livenet: 'wss://stream.bybit.com/realtime_public',
    livenet2: 'wss://stream.bytick.com/realtime_public',
    testnet: 'wss://stream-testnet.bybit.com/realtime_public'
  }
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
  }
}

const loggerCategory = { category: 'bybit-ws' };

const READY_STATE_INITIAL = 0;
const READY_STATE_CONNECTING = 1;
const READY_STATE_CONNECTED = 2;
const READY_STATE_CLOSING = 3;
const READY_STATE_RECONNECTING = 4;

export enum WsConnectionState {
  READY_STATE_INITIAL,
  READY_STATE_CONNECTING,
  READY_STATE_CONNECTED,
  READY_STATE_CLOSING,
  READY_STATE_RECONNECTING
};

export type APIMarket = 'inverse' | 'linear' | 'spot';

// Same as inverse futures
export type WsPublicInverseTopic = 'orderBookL2_25'
  | 'orderBookL2_200'
  | 'trade'
  | 'insurance'
  | 'instrument_info'
  | 'klineV2';

export type WsPublicUSDTPerpTopic = 'orderBookL2_25'
  | 'orderBookL2_200'
  | 'trade'
  | 'insurance'
  | 'instrument_info'
  | 'kline';

export type WsPublicSpotV1Topic = 'trade'
  | 'realtimes'
  | 'kline'
  | 'depth'
  | 'mergedDepth'
  | 'diffDepth';

export type WsPublicSpotV2Topic = 'depth'
  | 'kline'
  | 'trade'
  | 'bookTicker'
  | 'realtimes';

export type WsPublicTopics = WsPublicInverseTopic
  | WsPublicUSDTPerpTopic
  | WsPublicSpotV1Topic
  | WsPublicSpotV2Topic
  | string;

// Same as inverse futures
export type WsPrivateInverseTopic = 'position'
  | 'execution'
  | 'order'
  | 'stop_order';

export type WsPrivateUSDTPerpTopic = 'position'
  | 'execution'
  | 'order'
  | 'stop_order'
  | 'wallet';

export type WsPrivateSpotTopic = 'outboundAccountInfo'
  | 'executionReport'
  | 'ticketInfo';

export type WsPrivateTopic = WsPrivateInverseTopic
  | WsPrivateUSDTPerpTopic
  | WsPrivateSpotTopic
  | string;

export type WsTopic = WsPublicTopics | WsPrivateTopic;

export interface WSClientConfigurableOptions {
  key?: string;
  secret?: string;
  livenet?: boolean;

  // defaults to inverse.
  /**
   * @deprecated Use the property { market: 'linear' } instead
   */
  linear?: boolean;

  market?: APIMarket;

  pongTimeout?: number;
  pingInterval?: number;
  reconnectTimeout?: number;
  restOptions?: any;
  requestOptions?: any;
  wsUrl?: string;
};

export interface WebsocketClientOptions extends WSClientConfigurableOptions {
  livenet: boolean;
  /**
   * @deprecated Use the property { market: 'linear' } instead
   */
  linear?: boolean;
  market?: APIMarket;
  pongTimeout: number;
  pingInterval: number;
  reconnectTimeout: number;
};


export const wsKeyInverse = 'inverse';
export const wsKeyLinearPrivate = 'linearPrivate';
export const wsKeyLinearPublic = 'linearPublic';
export const wsKeySpotPrivate = 'spotPrivate';
export const wsKeySpotPublic = 'spotPublic';

// This is used to differentiate between each of the available websocket streams (as bybit has multiple websockets)
export type WsKey = 'inverse' | 'linearPrivate' | 'linearPublic' | 'spotPrivate' | 'spotPublic';

const getLinearWsKeyForTopic = (topic: string): WsKey => {
  const privateLinearTopics = ['position', 'execution', 'order', 'stop_order', 'wallet'];
  if (privateLinearTopics.includes(topic)) {
    return wsKeyLinearPrivate;
  }

  return wsKeyLinearPublic;
}
const getSpotWsKeyForTopic = (topic: string): WsKey => {
  const privateLinearTopics = ['position', 'execution', 'order', 'stop_order', 'outboundAccountInfo', 'executionReport', 'ticketInfo'];

  if (privateLinearTopics.includes(topic)) {
    return wsKeySpotPrivate;
  }

  return wsKeySpotPublic;
}

export declare interface WebsocketClient {
  on(event: 'open' | 'reconnected', listener: ({ wsKey: WsKey, event: any }) => void): this;
  on(event: 'response' | 'update' | 'error', listener: (response: any) => void): this;
  on(event: 'reconnect' | 'close', listener: ({ wsKey: WsKey }) => void): this;
}

function resolveMarket(options: WSClientConfigurableOptions): APIMarket {
  if (options.linear) {
    return 'linear';
  }
  return 'inverse';
}

export class WebsocketClient extends EventEmitter {
  private logger: typeof DefaultLogger;
  private restClient: InverseClient | LinearClient;
  private options: WebsocketClientOptions;
  private wsStore: WsStore;

  constructor(options: WSClientConfigurableOptions, logger?: typeof DefaultLogger) {
    super();

    this.logger = logger || DefaultLogger;
    this.wsStore = new WsStore(this.logger);

    this.options = {
      livenet: false,
      pongTimeout: 1000,
      pingInterval: 10000,
      reconnectTimeout: 500,
      ...options
    };

    if (!this.options.market) {
      this.options.market = resolveMarket(this.options);
    }

    if (this.isLinear()) {
      this.restClient = new LinearClient(undefined, undefined, this.isLivenet(), this.options.restOptions, this.options.requestOptions);
    } else if (this.isSpot()) {
      // TODO: spot client
      this.restClient = new LinearClient(undefined, undefined, this.isLivenet(), this.options.restOptions, this.options.requestOptions);
      this.connectPublic();
    } else {
      this.restClient = new InverseClient(undefined, undefined, this.isLivenet(), this.options.restOptions, this.options.requestOptions);
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
    return !this.isLinear() && !this.isSpot();
  }

  /**
   * Add topic/topics to WS subscription list
   */
  public subscribe(wsTopics: WsTopic[] | WsTopic) {
    const topics = Array.isArray(wsTopics) ? wsTopics : [wsTopics];
    topics.forEach(topic => this.wsStore.addTopic(
      this.getWsKeyForTopic(topic),
      topic
    ));

    // attempt to send subscription topic per websocket
    this.wsStore.getKeys().forEach((wsKey: WsKey) => {
      // if connected, send subscription request
      if (this.wsStore.isConnectionState(wsKey, READY_STATE_CONNECTED)) {
        return this.requestSubscribeTopics(wsKey, topics);
      }

      // start connection process if it hasn't yet begun. Topics are automatically subscribed to on-connect
      if (
        !this.wsStore.isConnectionState(wsKey, READY_STATE_CONNECTING) &&
        !this.wsStore.isConnectionState(wsKey, READY_STATE_RECONNECTING)
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
    topics.forEach(topic => this.wsStore.deleteTopic(
      this.getWsKeyForTopic(topic),
      topic
    ));

    this.wsStore.getKeys().forEach((wsKey: WsKey) => {
      // unsubscribe request only necessary if active connection exists
      if (this.wsStore.isConnectionState(wsKey, READY_STATE_CONNECTED)) {
        this.requestUnsubscribeTopics(wsKey, topics);
      }
    });
  }

  public close(wsKey: WsKey) {
    this.logger.info('Closing connection', { ...loggerCategory, wsKey });
    this.setWsState(wsKey, READY_STATE_CLOSING);
    this.clearTimers(wsKey);

    this.getWs(wsKey)?.close();
  }

  /**
   * Request connection of all dependent websockets, instead of waiting for automatic connection by library
   */
  public connectAll(): Promise<WebSocket | undefined>[] | undefined {
    if (this.isInverse()) {
      return [this.connect(wsKeyInverse)];
    }

    if (this.isLinear()) {
      return [this.connect(wsKeyLinearPublic), this.connect(wsKeyLinearPrivate)];
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
        this.logger.error('Refused to connect to ws with existing active connection', { ...loggerCategory, wsKey })
        return this.wsStore.getWs(wsKey);
      }

      if (this.wsStore.isConnectionState(wsKey, READY_STATE_CONNECTING)) {
        this.logger.error('Refused to connect to ws, connection attempt already active', { ...loggerCategory, wsKey })
        return;
      }

      if (
        !this.wsStore.getConnectionState(wsKey) ||
        this.wsStore.isConnectionState(wsKey, READY_STATE_INITIAL)
      ) {
        this.setWsState(wsKey, READY_STATE_CONNECTING);
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
        this.logger.error(`${context} due to 401 authorization failure.`, { ...loggerCategory, wsKey });
        break;

      default:
        this.logger.error(`{context} due to unexpected response error: ${error.msg}`, { ...loggerCategory, wsKey });
        break;
    }
  }

  /**
   * Return params required to make authorized request
   */
  private async getAuthParams(wsKey: WsKey): Promise<string> {
    const { key, secret } = this.options;

    if (key && secret && wsKey !== wsKeyLinearPublic && wsKey !== wsKeySpotPublic) {
      this.logger.debug('Getting auth\'d request params', { ...loggerCategory, wsKey });

      const timeOffset = await this.restClient.getTimeOffset();

      const params: any = {
        api_key: this.options.key,
        expires: (Date.now() + timeOffset + 5000)
      };

      params.signature = await signMessage('GET/realtime' + params.expires, secret);
      return '?' + serializeParams(params);

    } else if (!key || !secret) {
      this.logger.warning('Connot authenticate websocket, either api or private keys missing.', { ...loggerCategory, wsKey });
    } else {
      this.logger.debug('Starting public only websocket client.', { ...loggerCategory, wsKey });
    }

    return '';
  }

  private reconnectWithDelay(wsKey: WsKey, connectionDelayMs: number) {
    this.clearTimers(wsKey);
    if (this.wsStore.getConnectionState(wsKey) !== READY_STATE_CONNECTING) {
      this.setWsState(wsKey, READY_STATE_RECONNECTING);
    }

    setTimeout(() => {
      this.logger.info('Reconnecting to websocket', { ...loggerCategory, wsKey });
      this.connect(wsKey);
    }, connectionDelayMs);
  }

  private ping(wsKey: WsKey) {
    this.clearPongTimer(wsKey);

    this.logger.silly('Sending ping', { ...loggerCategory, wsKey });
    this.tryWsSend(wsKey, JSON.stringify({ op: 'ping' }));

    this.wsStore.get(wsKey, true)!.activePongTimer = setTimeout(() => {
      this.logger.info('Pong timeout - closing socket to reconnect', { ...loggerCategory, wsKey });
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
      args: topics
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
      args: topics
    });

    this.tryWsSend(wsKey, wsMessage);
  }

  private tryWsSend(wsKey: WsKey, wsMessage: string) {
    try {
      this.logger.silly(`Sending upstream ws message: `, { ...loggerCategory, wsMessage, wsKey });
      if (!wsKey) {
        throw new Error('Cannot send message due to no known websocket for this wsKey');
      }
      const ws = this.getWs(wsKey);
      if (!ws) {
        throw new Error(`${wsKey} socket not connected yet, call "connect(${wsKey}) first then try again when the "open" event arrives`);
      }
      ws.send(wsMessage);
    } catch (e) {
      this.logger.error(`Failed to send WS message`, { ...loggerCategory, wsMessage, wsKey, exception: e });
    }
  }

  private connectToWsUrl(url: string, wsKey: WsKey): WebSocket {
    this.logger.silly(`Opening WS connection to URL: ${url}`, { ...loggerCategory, wsKey })

    const ws = new WebSocket(url);
    ws.onopen = event => this.onWsOpen(event, wsKey);
    ws.onmessage = event => this.onWsMessage(event, wsKey);
    ws.onerror = event => this.onWsError(event, wsKey);
    ws.onclose = event => this.onWsClose(event, wsKey);

    return ws;
  }

  private onWsOpen(event, wsKey: WsKey) {
    if (this.wsStore.isConnectionState(wsKey, READY_STATE_CONNECTING)) {
      this.logger.info('Websocket connected', { ...loggerCategory, wsKey, livenet: this.isLivenet(), linear: this.isLinear(), spot: this.isSpot() });
      this.emit('open', { wsKey, event });
    } else if (this.wsStore.isConnectionState(wsKey, READY_STATE_RECONNECTING)) {
      this.logger.info('Websocket reconnected', { ...loggerCategory, wsKey });
      this.emit('reconnected', { wsKey, event });
    }

    this.setWsState(wsKey, READY_STATE_CONNECTED);

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
      const msg = JSON.parse(event && event.data || event);
      if ('success' in msg || msg?.pong) {
        this.onWsMessageResponse(msg, wsKey);
      } else if (msg.topic) {
        this.onWsMessageUpdate(msg);
      } else {
        this.logger.warning('Got unhandled ws message', { ...loggerCategory, message: msg, event, wsKey});
      }
    } catch (e) {
      this.logger.error('Failed to parse ws event message', { ...loggerCategory, error: e, event, wsKey})
    }
  }

  private onWsError(error: any, wsKey: WsKey) {
    this.parseWsError('Websocket error', error, wsKey);
    if (this.wsStore.isConnectionState(wsKey, READY_STATE_CONNECTED)) {
      this.emit('error', error);
    }
  }

  private onWsClose(event, wsKey: WsKey) {
    this.logger.info('Websocket connection closed', { ...loggerCategory, wsKey});

    if (this.wsStore.getConnectionState(wsKey) !== READY_STATE_CLOSING) {
      this.reconnectWithDelay(wsKey, this.options.reconnectTimeout!);
      this.emit('reconnect', { wsKey });
    } else {
      this.setWsState(wsKey, READY_STATE_INITIAL);
      this.emit('close', { wsKey });
    }
  }

  private onWsMessageResponse(response: any, wsKey: WsKey) {
    if (isWsPong(response)) {
      this.logger.silly('Received pong', { ...loggerCategory, wsKey });
      this.clearPongTimer(wsKey);
    } else {
      this.emit('response', response);
    }
  }

  private onWsMessageUpdate(message: any) {
    this.emit('update', message);
  }

  private getWs(wsKey: string) {
    return this.wsStore.getWs(wsKey);
  }

  private setWsState(wsKey: WsKey, state: WsConnectionState) {
    this.wsStore.setConnectionState(wsKey, state);
  }

  private getWsUrl(wsKey: WsKey): string {
    if (this.options.wsUrl) {
      return this.options.wsUrl;
    }

    const networkKey = this.isLivenet() ? 'livenet' : 'testnet';
    // TODO: reptitive
    if (this.isLinear() || wsKey.startsWith('linear')){
      if (wsKey === wsKeyLinearPublic) {
        return linearEndpoints.public[networkKey];
      }

      if (wsKey === wsKeyLinearPrivate) {
        return linearEndpoints.private[networkKey];
      }

      this.logger.error('Unhandled linear wsKey: ', { ...loggerCategory, wsKey });
      return linearEndpoints[networkKey];
    }

    if (this.isSpot() || wsKey.startsWith('spot')){
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
      return getLinearWsKeyForTopic(topic)
    }
    return getSpotWsKeyForTopic(topic);
  }

  private wrongMarketError(market: APIMarket) {
    return new Error(`This WS client was instanced for the ${this.options.market} market. Make another WebsocketClient instance with "market: '${market}' to listen to spot topics`);
  }

  // TODO: persistance for subbed topics. Look at ftx-api implementation.
  public subscribePublicSpotTrades(symbol: string, binary?: boolean) {
    if (!this.isSpot()) {
      throw this.wrongMarketError('spot');
    }

    return this.tryWsSend(wsKeySpotPublic, JSON.stringify({
      topic: 'trade',
      event: 'sub',
      symbol,
      params: {
        binary: !!binary,
      }
    }));
  }

  public subscribePublicSpotTradingPair(symbol: string, binary?: boolean) {
    if (!this.isSpot()) {
      throw this.wrongMarketError('spot');
    }

    return this.tryWsSend(wsKeySpotPublic, JSON.stringify({
      symbol,
      topic: 'realtimes',
      event: 'sub',
      params: {
        binary: !!binary,
      },
    }));
  }

  public subscribePublicSpotV1Kline(symbol: string, candleSize: KlineInterval, binary?: boolean) {
    if (!this.isSpot()) {
      throw this.wrongMarketError('spot');
    }

    return this.tryWsSend(wsKeySpotPublic, JSON.stringify({
      symbol,
      topic: 'kline_' + candleSize,
      event: 'sub',
      params: {
        binary: !!binary,
      },
    }));
  }

  //ws.send('{"symbol":"BTCUSDT","topic":"depth","event":"sub","params":{"binary":false}}');
  //ws.send('{"symbol":"BTCUSDT","topic":"mergedDepth","event":"sub","params":{"binary":false,"dumpScale":1}}');
  //ws.send('{"symbol":"BTCUSDT","topic":"diffDepth","event":"sub","params":{"binary":false}}');
  public subscribePublicSpotOrderbook(symbol: string, depth: 'full' | 'merge' | 'delta', dumpScale?: number, binary?: boolean) {
    if (!this.isSpot()) {
      throw this.wrongMarketError('spot');
    }

    let topic: string;
    switch (depth) {
      case 'full': {
        topic = 'depth';
        break;
      };
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



};
