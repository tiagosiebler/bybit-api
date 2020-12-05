import { EventEmitter } from 'events';

import { DefaultLogger } from './logger';
import { RestClient } from './rest-client';
import { signMessage, serializeParams } from './util/requestUtils';
// import WebSocket from 'ws';
import WebSocket from 'isomorphic-ws';

const wsUrls = {
  livenet: 'wss://stream.bybit.com/realtime',
  testnet: 'wss://stream-testnet.bybit.com/realtime'
};

const READY_STATE_INITIAL = 0;
const READY_STATE_CONNECTING = 1;
const READY_STATE_CONNECTED = 2;
const READY_STATE_CLOSING = 3;
const READY_STATE_RECONNECTING = 4;

export interface WebsocketClientOptions {
  key?: string;
  secret?: string;
  livenet?: boolean;

  pongTimeout?: number;
  pingInterval?: number;
  reconnectTimeout?: number;
  restOptions?: any;
  requestOptions?: any;
  wsUrl?: string;
};

type Logger = typeof DefaultLogger;

export class WebsocketClient extends EventEmitter {
  private logger: Logger;
  private readyState: number;
  private pingInterval?: number | undefined;
  private pongTimeout?: number | undefined;
  private client: any; // XXX This used to be RestClient instead of any, but I need to learn more about mixins in TypeScript.
  private _subscriptions: Set<unknown>;
  private ws: WebSocket;
  private options: WebsocketClientOptions;

  constructor(options: WebsocketClientOptions, logger?: Logger) {
    super();

    this.logger = logger || DefaultLogger;

    this.readyState = READY_STATE_INITIAL;
    this.pingInterval = undefined;
    this.pongTimeout = undefined;

    this.options = {
      livenet: false,
      pongTimeout: 1000,
      pingInterval: 10000,
      reconnectTimeout: 500,
      ...options
    };

    this.client = new RestClient(undefined, undefined, this.options.livenet, this.options.restOptions, this.options.requestOptions);
    this._subscriptions = new Set();

    this._connect();
  }

  subscribe(topics) {
    if (!Array.isArray(topics)) topics = [topics];
    topics.forEach(topic => this._subscriptions.add(topic));

    // subscribe not necessary if not yet connected (will subscribe onOpen)
    if (this.readyState === READY_STATE_CONNECTED) this._subscribe(topics);
  }

  unsubscribe(topics) {
    if (!Array.isArray(topics)) topics = [topics];

    topics.forEach(topic => this._subscriptions.delete(topic));

    // unsubscribe not necessary if not yet connected
    if (this.readyState === READY_STATE_CONNECTED) this._unsubscribe(topics);
  }

  close() {
    this.logger.info('Closing connection', {category: 'bybit-ws'});
    this.readyState = READY_STATE_CLOSING;
    this._teardown();
    this.ws && this.ws.close();
  }

  _getWsUrl() {
    if (this.options.wsUrl) {
      return this.options.wsUrl;
    }
    return wsUrls[this.options.livenet ? 'livenet' : 'testnet'];
  }

  async _connect() {
    try {
      if (this.readyState === READY_STATE_INITIAL) this.readyState = READY_STATE_CONNECTING;

      const authParams = await this._authenticate();
      const url = this._getWsUrl() + authParams;

      const ws = new WebSocket(url);

      // ws.onopen!(this._wsOpenHandler.bind(this));
      // ws.onmessage!(this._wsMessageHandler.bind(this));
      // ws.onerror!(this._wsOnErrorHandler.bind(this));
      // ws.onclose!(this._wsCloseHandler.bind(this));

      ws.onopen = this._wsOpenHandler.bind(this);
      ws.onmessage = this._wsMessageHandler.bind(this);
      ws.onerror = this._wsOnErrorHandler.bind(this);
      ws.onclose = this._wsCloseHandler.bind(this);

      this.ws = ws;

    } catch (err) {
      this.logger.error('Connection failed: ', err);
      this._reconnect(this.options.reconnectTimeout);
    }
  }

  async _authenticate() {
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

  _reconnect(timeout) {
    this._teardown();
    if (this.readyState !== READY_STATE_CONNECTING) {
      this.readyState = READY_STATE_RECONNECTING;
    }

    setTimeout(() => {
      this.logger.info('Reconnecting to server', { category: 'bybit-ws' });

      this._connect();
    }, timeout);
  }

  _ping() {
    clearTimeout(this.pongTimeout!);
    delete this.pongTimeout;

    this.logger.silly('Sending ping', { category: 'bybit-ws' });
    this.ws.send(JSON.stringify({op: 'ping'}));

    this.pongTimeout = setTimeout(() => {
      this.logger.info('Pong timeout', { category: 'bybit-ws' });
      this._teardown();
      // this.ws.terminate();
      // TODO: does this work?
      this.ws.close();
    }, this.options.pongTimeout);
  }

  _teardown() {
    if (this.pingInterval) clearInterval(this.pingInterval);
    if (this.pongTimeout) clearTimeout(this.pongTimeout);

    this.pongTimeout = undefined;
    this.pingInterval = undefined;
  }

  _wsOpenHandler() {
    if (this.readyState === READY_STATE_CONNECTING) {
      this.logger.info('Websocket connected', { category: 'bybit-ws', livenet: this.options.livenet });
      this.emit('open');
    } else if (this.readyState === READY_STATE_RECONNECTING) {
      this.logger.info('Websocket reconnected', { category: 'bybit-ws', livenet: this.options.livenet });
      this.emit('reconnected');
    }

    this.readyState = READY_STATE_CONNECTED;

    this._subscribe([...this._subscriptions]);
    this.pingInterval = setInterval(this._ping.bind(this), this.options.pingInterval);
  }

  _wsMessageHandler(message) {
    const msg = JSON.parse(message && message.data || message);

    if ('success' in msg) {
      this._handleResponse(msg);
    } else if (msg.topic) {
      this._handleUpdate(msg);
    } else {
      this.logger.warning('Got unhandled ws message', msg);
    }
  }

  _wsOnErrorHandler(err) {
    this.logger.error('Websocket error', {category: 'bybit-ws', err});
    if (this.readyState === READY_STATE_CONNECTED) this.emit('error', err);
  }

  _wsCloseHandler() {
    this.logger.info('Websocket connection closed', {category: 'bybit-ws'});

    if (this.readyState !== READY_STATE_CLOSING) {
      this._reconnect(this.options.reconnectTimeout);
      this.emit('reconnect');
    } else {
      this.readyState = READY_STATE_INITIAL;
      this.emit('close');
    }
  }

  _handleResponse(response) {
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

  _handleUpdate(message) {
    this.emit('update', message);
  }

  _subscribe(topics) {
    const msgStr = JSON.stringify({
      op: 'subscribe',
      'args': topics
    });

    this.ws.send(msgStr);
  }

  _unsubscribe(topics) {
    const msgStr = JSON.stringify({
      op: 'unsubscribe',
      'args': topics
    });

    this.ws.send(msgStr);
  }
};
