import { EventEmitter } from 'events';
import { InverseClient } from './inverse-client';
import { LinearClient } from './linear-client';
import { DefaultLogger } from './logger';
import { signMessage, serializeParams } from './util/requestUtils';

import WebSocket from 'isomorphic-ws';

const inverseEndpoints = {
  livenet: 'wss://stream.bybit.com/realtime',
  testnet: 'wss://stream-testnet.bybit.com/realtime'
};

const linearEndpoints = {
  livenet: 'wss://stream.bybit.com/realtime_public',
  testnet: 'wss://stream-testnet.bybit.com/realtime_public'
};

const READY_STATE_INITIAL = 0;
const READY_STATE_CONNECTING = 1;
const READY_STATE_CONNECTED = 2;
const READY_STATE_CLOSING = 3;
const READY_STATE_RECONNECTING = 4;

enum WsConnectionState {
  READY_STATE_INITIAL,
  READY_STATE_CONNECTING,
  READY_STATE_CONNECTED,
  READY_STATE_CLOSING,
  READY_STATE_RECONNECTING
};

export interface WebsocketClientConfigurableOptions {
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

export interface WebsocketClientOptions extends WebsocketClientConfigurableOptions {
  livenet: boolean;
  linear: boolean;
  pongTimeout: number;
  pingInterval: number;
  reconnectTimeout: number;
};

type Logger = typeof DefaultLogger;

export class WebsocketClient extends EventEmitter {
  private logger: Logger;
  private readyState: WsConnectionState;
  private pingInterval?: number | undefined;
  private pongTimeout?: number | undefined;
  private client: InverseClient | LinearClient;
  private subcribedTopics: Set<string>;
  private ws: WebSocket;
  private options: WebsocketClientOptions;

  constructor(options: WebsocketClientConfigurableOptions, logger?: Logger) {
    super();

    this.logger = logger || DefaultLogger;
    this.readyState = READY_STATE_INITIAL;
    this.pingInterval = undefined;
    this.pongTimeout = undefined;

    this.options = {
      livenet: false,
      linear: false,
      pongTimeout: 1000,
      pingInterval: 10000,
      reconnectTimeout: 500,
      ...options
    };


    if (this.options.linear === true) {
      this.client = new LinearClient(undefined, undefined, this.isLivenet(), this.options.restOptions, this.options.requestOptions);
    }else{
      this.client = new InverseClient(undefined, undefined, this.isLivenet(), this.options.restOptions, this.options.requestOptions);
    }

    this.subcribedTopics = new Set();
    this.connect();
  }

  isLivenet(): boolean {
    return this.options.livenet === true;
  }

  /**
   * Add topic/topics to WS subscription list
   */
  public subscribe(wsTopics: string[] | string) {
    const topics = Array.isArray(wsTopics) ? wsTopics : [wsTopics];
    topics.forEach(topic => this.subcribedTopics.add(topic));

    // subscribe not necessary if not yet connected (will automatically subscribe onOpen)
    if (this.readyState === READY_STATE_CONNECTED) {
      this.requestSubscribeTopics(topics);
    }
  }

  /**
   * Remove topic/topics from WS subscription list
   */
  public unsubscribe(wsTopics: string[] | string) {
    const topics = Array.isArray(wsTopics) ? wsTopics : [wsTopics];
    topics.forEach(topic => this.subcribedTopics.delete(topic));

    // unsubscribe not necessary if not yet connected
    if (this.readyState === READY_STATE_CONNECTED) {
      this.requestUnsubscribeTopics(topics);
    }
  }

  close() {
    this.logger.info('Closing connection', {category: 'bybit-ws'});
    this.readyState = READY_STATE_CLOSING;
    this.teardown();
    this.ws && this.ws.close();
  }

  private getWsUrl() {
    if (this.options.wsUrl) {
      return this.options.wsUrl;
    }
    if (this.options.linear){
        return linearEndpoints[this.options.livenet ? 'livenet' : 'testnet'];
    }
    return inverseEndpoints[this.options.livenet ? 'livenet' : 'testnet'];
  }

  private async connect() {
    try {
      if (this.readyState === READY_STATE_INITIAL) {
        this.readyState = READY_STATE_CONNECTING;
      }

      const authParams = await this.getAuthParams();
      const url = this.getWsUrl() + authParams;
      const ws = new WebSocket(url);

      ws.onopen = this.onWsOpen.bind(this);
      ws.onmessage = this.onWsMessage.bind(this);
      ws.onerror = this.onWsError.bind(this);
      ws.onclose = this.onWsClose.bind(this);

      this.ws = ws;

    } catch (err) {
      this.logger.error('Connection failed: ', err);
      this.reconnectWithDelay(this.options.reconnectTimeout!);
    }
  }

  /**
   * Return params required to make authorized request
   */
  private async getAuthParams(): Promise<string> {
    if (this.options.key && this.options.secret) {
      this.logger.debug('Starting authenticated websocket client.', {category: 'bybit-ws'});

      const timeOffset = await this.client.getTimeOffset();

      const params: any = {
        api_key: this.options.key,
        expires: (Date.now() + timeOffset + 5000)
      };

      params.signature = signMessage('GET/realtime' + params.expires, this.options.secret);
      return '?' + serializeParams(params);

    } else if (this.options.key || this.options.secret) {
      this.logger.warning('Could not authenticate websocket, either api key or private key missing.', { category: 'bybit-ws' });
    } else {
      this.logger.debug('Starting public only websocket client.', { category: 'bybit-ws' });
    }

    return  '';
  }

  private reconnectWithDelay(connectionDelay: number) {
    this.teardown();
    if (this.readyState !== READY_STATE_CONNECTING) {
      this.readyState = READY_STATE_RECONNECTING;
    }

    setTimeout(() => {
      this.logger.info('Reconnecting to server', { category: 'bybit-ws' });

      this.connect();
    }, connectionDelay);
  }

  private ping() {
    clearTimeout(this.pongTimeout!);
    delete this.pongTimeout;

    this.logger.silly('Sending ping', { category: 'bybit-ws' });
    this.ws.send(JSON.stringify({op: 'ping'}));


    this.pongTimeout = <any>setTimeout(() => {
      this.logger.info('Pong timeout', { category: 'bybit-ws' });
      this.teardown();
      // this.ws.terminate();
      // TODO: does this work?
      this.ws.close();
    }, this.options.pongTimeout);
  }

  private teardown() {
    if (this.pingInterval) clearInterval(this.pingInterval);
    if (this.pongTimeout) clearTimeout(this.pongTimeout);

    this.pongTimeout = undefined;
    this.pingInterval = undefined;
  }

  /**
   * Send WS message to subscribe to topics.
   */
  private requestSubscribeTopics(topics: string[]) {
    const msgStr = JSON.stringify({
      op: 'subscribe',
      'args': topics
    });

    this.ws.send(msgStr);
  }

  /**
   * Send WS message to unsubscribe from topics.
   */
  private requestUnsubscribeTopics(topics: string[]) {
    const msgStr = JSON.stringify({
      op: 'unsubscribe',
      'args': topics
    });

    this.ws.send(msgStr);
  }

  private onWsOpen() {
    if (this.readyState === READY_STATE_CONNECTING) {
      this.logger.info('Websocket connected', { category: 'bybit-ws', livenet: this.options.livenet, linear: this.options.linear });
      this.emit('open');
    } else if (this.readyState === READY_STATE_RECONNECTING) {
      this.logger.info('Websocket reconnected', { category: 'bybit-ws', livenet: this.options.livenet });
      this.emit('reconnected');
    }

    this.readyState = READY_STATE_CONNECTED;

    this.requestSubscribeTopics([...this.subcribedTopics]);
    this.pingInterval = <any>setInterval(this.ping.bind(this), this.options.pingInterval);
  }

  private onWsMessage(message) {
    const msg = JSON.parse(message && message.data || message);

    if ('success' in msg) {
      this.onWsMessageResponse(msg);
    } else if (msg.topic) {
      this.onWsMessageUpdate(msg);
    } else {
      this.logger.warning('Got unhandled ws message', msg);
    }
  }

  private onWsError(err) {
    this.logger.error('Websocket error', {category: 'bybit-ws', err});
    if (this.readyState === READY_STATE_CONNECTED) {
      this.emit('error', err);
    }
  }

  private onWsClose() {
    this.logger.info('Websocket connection closed', {category: 'bybit-ws'});

    if (this.readyState !== READY_STATE_CLOSING) {
      this.reconnectWithDelay(this.options.reconnectTimeout!);
      this.emit('reconnect');
    } else {
      this.readyState = READY_STATE_INITIAL;
      this.emit('close');
    }
  }

  private onWsMessageResponse(response) {
    if (
      response.request &&
      response.request.op === 'ping' &&
      response.ret_msg === 'pong' &&
      response.success === true
    ) {
        this.logger.silly('pong recieved', {category: 'bybit-ws'});
        clearTimeout(this.pongTimeout);
    } else {
      this.emit('response', response);
    }
  }

  private onWsMessageUpdate(message) {
    this.emit('update', message);
  }
};
