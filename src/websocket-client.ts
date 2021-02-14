import { EventEmitter } from 'events';
import { InverseClient } from './inverse-client';
import { LinearClient } from './linear-client';
import { DefaultLogger } from './logger';
import { signMessage, serializeParams, isWsPong } from './util/requestUtils';

import WebSocket from 'isomorphic-ws';
import WsStore from './util/WsStore';

const inverseEndpoints = {
  livenet: 'wss://stream.bybit.com/realtime',
  testnet: 'wss://stream-testnet.bybit.com/realtime'
};

const linearEndpoints = {
  private: {
    livenet: 'wss://stream.bybit.com/realtime_private',
    livenet2: 'wss://stream.bytick.com/realtime_public',
    testnet: 'wss://stream-testnet.bybit.com/realtime_private'
  },
  public: {
    livenet: 'wss://stream.bybit.com/realtime_public',
    livenet2: 'wss://stream.bytick.com/realtime_private',
    testnet: 'wss://stream-testnet.bybit.com/realtime_public'
  }
};

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

export interface WSClientConfigurableOptions {
  key?: string;
  secret?: string;
  livenet?: boolean;
  linear?: boolean;
  pongTimeout?: number;
  pingInterval?: number;
  reconnectTimeout?: number;
  restOptions?: any;
  requestOptions?: any;
  wsUrl?: string;
};

export interface WebsocketClientOptions extends WSClientConfigurableOptions {
  livenet: boolean;
  linear: boolean;
  pongTimeout: number;
  pingInterval: number;
  reconnectTimeout: number;
};

export const wsKeyInverse = 'inverse';
export const wsKeyLinearPrivate = 'linearPrivate';
export const wsKeyLinearPublic = 'linearPublic';

const getLinearWsKeyForTopic = (topic: string) => {
  const privateLinearTopics = ['position', 'execution', 'order', 'stop_order', 'wallet'];
  if (privateLinearTopics.includes(topic)) {
    return wsKeyLinearPrivate;
  }

  return wsKeyLinearPublic;
}

export declare interface WebsocketClient {
  on(event: 'open' | 'reconnected', listener: ({ wsKey: string, event: any }) => void): this;
  on(event: 'response' | 'update' | 'error', listener: (response: any) => void): this;
  on(event: 'reconnect' | 'close', listener: () => void): this;
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
      linear: false,
      pongTimeout: 1000,
      pingInterval: 10000,
      reconnectTimeout: 500,
      ...options
    };

    if (this.isLinear()) {
      this.restClient = new LinearClient(undefined, undefined, this.isLivenet(), this.options.restOptions, this.options.requestOptions);
    } else {
      this.restClient = new InverseClient(undefined, undefined, this.isLivenet(), this.options.restOptions, this.options.requestOptions);
    }
  }

  public isLivenet(): boolean {
    return this.options.livenet === true;
  }

  public isLinear(): boolean {
    return this.options.linear === true;
  }

  public isInverse(): boolean {
    return !this.isLinear();
  }

  /**
   * Add topic/topics to WS subscription list
   */
  public subscribe(wsTopics: string[] | string) {
    const topics = Array.isArray(wsTopics) ? wsTopics : [wsTopics];
    topics.forEach(topic => this.wsStore.addTopic(
      this.getWsKeyForTopic(topic),
      topic
    ));

    // attempt to send subscription topic per websocket
    this.wsStore.getKeys().forEach(wsKey => {
      // if connected, send subscription request
      if (this.wsStore.isConnectionState(wsKey, READY_STATE_CONNECTED)) {
        return this.requestSubscribeTopics(wsKey, [...this.wsStore.getTopics(wsKey)]);
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
  public unsubscribe(wsTopics: string[] | string) {
    const topics = Array.isArray(wsTopics) ? wsTopics : [wsTopics];
    topics.forEach(topic => this.wsStore.deleteTopic(
      this.getWsKeyForTopic(topic),
      topic
    ));

    this.wsStore.getKeys().forEach(wsKey => {
      // unsubscribe request only necessary if active connection exists
      if (this.wsStore.isConnectionState(wsKey, READY_STATE_CONNECTED)) {
        this.requestUnsubscribeTopics(wsKey, [...this.wsStore.getTopics(wsKey)])
      }
    });
  }

  public close(wsKey: string) {
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
  }

  private async connect(wsKey: string): Promise<WebSocket | undefined> {
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

  private parseWsError(context: string, error, wsKey: string) {
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
  private async getAuthParams(wsKey: string): Promise<string> {
    const { key, secret } = this.options;

    if (key && secret && wsKey !== wsKeyLinearPublic) {
      this.logger.debug('Getting auth\'d request params', { ...loggerCategory, wsKey });

      const timeOffset = await this.restClient.getTimeOffset();

      const params: any = {
        api_key: this.options.key,
        expires: (Date.now() + timeOffset + 5000)
      };

      params.signature = signMessage('GET/realtime' + params.expires, secret);
      return '?' + serializeParams(params);

    } else if (!key || !secret) {
      this.logger.warning('Connot authenticate websocket, either api or private keys missing.', { ...loggerCategory, wsKey });
    } else {
      this.logger.debug('Starting public only websocket client.', { ...loggerCategory, wsKey });
    }

    return '';
  }

  private reconnectWithDelay(wsKey: string, connectionDelayMs: number) {
    this.clearTimers(wsKey);
    if (this.wsStore.getConnectionState(wsKey) !== READY_STATE_CONNECTING) {
      this.setWsState(wsKey, READY_STATE_RECONNECTING);
    }

    setTimeout(() => {
      this.logger.info('Reconnecting to websocket', { ...loggerCategory, wsKey });
      this.connect(wsKey);
    }, connectionDelayMs);
  }

  private ping(wsKey: string) {
    this.clearPongTimer(wsKey);

    this.logger.silly('Sending ping', { ...loggerCategory, wsKey });
    this.tryWsSend(wsKey, JSON.stringify({ op: 'ping' }));

    this.wsStore.get(wsKey, true)!.activePongTimer = setTimeout(() => {
      this.logger.info('Pong timeout - closing socket to reconnect', { ...loggerCategory, wsKey });
      this.getWs(wsKey)?.close();
    }, this.options.pongTimeout);
  }

  private clearTimers(wsKey: string) {
    this.clearPingTimer(wsKey);
    this.clearPongTimer(wsKey);
  }

  // Send a ping at intervals
  private clearPingTimer(wsKey: string) {
    const wsState = this.wsStore.get(wsKey);
    if (wsState?.activePingTimer) {
      clearInterval(wsState.activePingTimer);
      wsState.activePingTimer = undefined;
    }
  }

  // Expect a pong within a time limit
  private clearPongTimer(wsKey: string) {
    const wsState = this.wsStore.get(wsKey);
    if (wsState?.activePongTimer) {
      clearTimeout(wsState.activePongTimer);
      wsState.activePongTimer = undefined;
    }
  }

  /**
   * Send WS message to subscribe to topics.
   */
  private requestSubscribeTopics(wsKey: string, topics: string[]) {
    const wsMessage = JSON.stringify({
      op: 'subscribe',
      args: topics
    });

    this.tryWsSend(wsKey, wsMessage);
  }

  /**
   * Send WS message to unsubscribe from topics.
   */
  private requestUnsubscribeTopics(wsKey: string, topics: string[]) {
    const wsMessage = JSON.stringify({
      op: 'unsubscribe',
      args: topics
    });

    this.tryWsSend(wsKey, wsMessage);
  }

  private tryWsSend(wsKey: string, wsMessage: string) {
    try {
      this.logger.silly(`Sending upstream ws message: `, { ...loggerCategory, wsMessage, wsKey });
      if (!wsKey) {
        throw new Error('Cannot send message due to no known websocket for this wsKey');
      }
      this.getWs(wsKey)?.send(wsMessage);
    } catch (e) {
      this.logger.error(`Failed to send WS message`, { ...loggerCategory, wsMessage, wsKey, exception: e });
    }
  }

  private connectToWsUrl(url: string, wsKey: string): WebSocket {
    this.logger.silly(`Opening WS connection to URL: ${url}`, { ...loggerCategory, wsKey })

    const ws = new WebSocket(url);
    ws.onopen = event => this.onWsOpen(event, wsKey);
    ws.onmessage = event => this.onWsMessage(event, wsKey);
    ws.onerror = event => this.onWsError(event, wsKey);
    ws.onclose = event => this.onWsClose(event, wsKey);

    return ws;
  }

  private onWsOpen(event, wsKey: string) {
    if (this.wsStore.isConnectionState(wsKey, READY_STATE_CONNECTING)) {
      this.logger.info('Websocket connected', { ...loggerCategory, wsKey, livenet: this.isLivenet(), linear: this.isLinear() });
      this.emit('open', { wsKey, event });
    } else if (this.wsStore.isConnectionState(wsKey, READY_STATE_RECONNECTING)) {
      this.logger.info('Websocket reconnected', { ...loggerCategory, wsKey });
      this.emit('reconnected', { wsKey, event });
    }

    this.setWsState(wsKey, READY_STATE_CONNECTED);

    this.requestSubscribeTopics(wsKey, [...this.wsStore.getTopics(wsKey)]);

    this.wsStore.get(wsKey, true)!.activePingTimer = setInterval(
      () => this.ping(wsKey),
      this.options.pingInterval
    );
  }

  private onWsMessage(event, wsKey: string) {
    const msg = JSON.parse(event && event.data || event);

    if ('success' in msg) {
      this.onWsMessageResponse(msg, wsKey);
    } else if (msg.topic) {
      this.onWsMessageUpdate(msg);
    } else {
      this.logger.warning('Got unhandled ws message', { ...loggerCategory, message: msg, event, wsKey});
    }
  }

  private onWsError(err, wsKey: string) {
    this.parseWsError('Websocket error', err, wsKey);
    if (this.wsStore.isConnectionState(wsKey, READY_STATE_CONNECTED)) {
      this.emit('error', err);
    }
  }

  private onWsClose(event, wsKey: string) {
    this.logger.info('Websocket connection closed', { ...loggerCategory, wsKey});

    if (this.wsStore.getConnectionState(wsKey) !== READY_STATE_CLOSING) {
      this.reconnectWithDelay(wsKey, this.options.reconnectTimeout!);
      this.emit('reconnect');
    } else {
      this.setWsState(wsKey, READY_STATE_INITIAL);
      this.emit('close');
    }
  }

  private onWsMessageResponse(response: any, wsKey: string) {
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

  private setWsState(wsKey: string, state: WsConnectionState) {
    this.wsStore.setConnectionState(wsKey, state);
  }

  private getWsUrl(wsKey: string): string {
    if (this.options.wsUrl) {
      return this.options.wsUrl;
    }

    const networkKey = this.options.livenet ? 'livenet' : 'testnet';
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
    return inverseEndpoints[networkKey];
  }

  private getWsKeyForTopic(topic: string) {
    return this.isInverse() ? wsKeyInverse : getLinearWsKeyForTopic(topic);
  }
};
