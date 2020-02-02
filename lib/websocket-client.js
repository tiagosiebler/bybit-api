const {EventEmitter} = require('events');

const WebSocket = require('ws');

const defaultLogger = require('./logger.js');
const RestClient = require('./rest-client.js');
const {signMessage} = require('./utility.js');

const wsUrls = {
  livenet: 'wss://stream.bybit.com/realtime',
  testnet: 'wss://stream-testnet.bybit.com/realtime'
};

const READY_STATE_INITIAL = 0;
const READY_STATE_CONNECTING = 1;
const READY_STATE_CONNECTED = 2;
const READY_STATE_CLOSING = 3;
const READY_STATE_RECONNECTING = 4;

module.exports = class WebsocketClient extends EventEmitter {
  constructor(options, logger) {
    super();

    this.logger = logger || defaultLogger;

    this.readyState = READY_STATE_INITIAL;
    this.pingInterval = null;
    this.pongTimeout =  null;

    this.options = {
      livenet: false,
      pongTimeout: 1000,
      pingInterval: 10000,
      reconnectTimeout: 500,
      ...options
    }

    this.client = new RestClient(null, null, this.options.livenet);
    this._subscriptions = new Set();

    this._connect();
  }

  subscribe(topics) {
    if(!Array.isArray(topics)) topics = [topics];
    topics.forEach(topic => this._subscriptions.add(topic));

    // subscribe not necessary if not yet connected (will subscribe onOpen)
    if(this.readyState === READY_STATE_CONNECTED) this._subscribe(topics);
  }

  unsubscribe(topics) {
    if(!Array.isArray(topics)) topics = [topics];

    topics.forEach(topic => this._subscriptions.delete(topic));

    // unsubscribe not necessary if not yet connected
    if(this.readyState === READY_STATE_CONNECTED) this._unsubscribe(topics);
  }

  close() {
    this.logger.info('Closing connection', {category: 'bybit-ws'});
    this.readyState = READY_STATE_CLOSING;
    this._teardown();
    this.ws.close();
  }

  async _connect() {
    try {
      if(this.readyState === READY_STATE_INITIAL) this.readyState = READY_STATE_CONNECTING;

      const authParams = await this._authenticate();
      const url = wsUrls[this.options.livenet ? 'livenet' : 'testnet'] + authParams;

      this.ws = new WebSocket(url);

      this.ws.on('open', this._wsOpenHandler.bind(this));
      this.ws.on('message', this._wsMessageHandler.bind(this));
      this.ws.on('error', this._wsOnErrorHandler.bind(this));
      this.ws.on('close', this._wsCloseHandler.bind(this));
    } catch(err) {
      this.logger.error('Connection failed', err);
      this._reconnect(this.options.reconnectTimeout);
    }
  }

  async _authenticate() {
    if(this.options.key && this.options.secret) {
      this.logger.debug('Starting authenticated websocket client.', {category: 'bybit-ws'});

      const timeOffset = await this.client.getTimeOffset();

      const params = {
        api_key: this.options.key,
        expires: (Date.now() + timeOffset + 5000)
      };

      params.signature = signMessage('GET/realtime' + params.expires, this.options.secret);

      return '?' + Object.keys(params)
        .sort()
        .map(key => `${key}=${params[key]}`)
        .join('&');
    } else if(this.options.key || this.options.secret) {
      this.logger.warning('Could not authenticate websocket, either api key or private key missing.', {category: 'bybit-ws'});
    } else {
      this.logger.debug('Starting public only websocket client.', {category: 'bybit-ws'});
    }

    return  '';
  }

  _reconnect(timeout) {
    this._teardown();
    if(this.readyState !== READY_STATE_CONNECTING) this.readyState = READY_STATE_RECONNECTING;

    setTimeout(() => {
      this.logger.info('Reconnecting to server', {category: 'bybit-ws'});

      this._connect();
    }, timeout);
  }

  _ping() {
    clearTimeout(this.pongTimeout);
    this.pongTimeout = null;

    this.logger.silly('Sending ping', {category: 'bybit-ws'});
    this.ws.send(JSON.stringify({op: 'ping'}));

    this.pongTimeout = setTimeout(() => {
      this.logger.info('Pong timeout', {category: 'bybit-ws'});
      this._teardown();
      this.ws.terminate();
    }, this.options.pongTimeout);
  }

  _teardown() {
    if(this.pingInterval) clearInterval(this.pingInterval);
    if(this.pongTimeout) clearTimeout(this.pongTimeout);

    this.pongTimeout = null;
    this.pingInterval = null;
  }

  _wsOpenHandler() {
    if(this.readyState === READY_STATE_CONNECTING) {
      this.logger.info('Websocket connected', {category: 'bybit-ws', livenet: this.options.livenet});
      this.emit('open');
    } else if(this.readyState === READY_STATE_RECONNECTING) {
      this.logger.info('Websocket reconnected', {category: 'bybit-ws', livenet: this.options.livenet});
      this.emit('reconnected');
    }

    this.readyState = READY_STATE_CONNECTED;

    this._subscribe([...this._subscriptions]);
    this.pingInterval = setInterval(this._ping.bind(this), this.options.pingInterval);
  }

  _wsMessageHandler(message) {
    let msg = JSON.parse(message);

    if('success' in msg) {
      this._handleResponse(msg);
    } else if(msg.topic) {
      this._handleUpdate(msg);
    } else {
      this.logger.warning('Got unhandled ws message', msg);
    }
  }

  _wsOnErrorHandler(err) {
    this.logger.error('Websocket error', {category: 'bybit-ws', err});
    if(this.readyState === READY_STATE_CONNECTED) this.emit('error', err);
  }

  _wsCloseHandler() {
    this.logger.info('Websocket connection closed', {category: 'bybit-ws'});

    if(this.readyState !== READY_STATE_CLOSING) {
      this._reconnect(this.options.reconnectTimeout);
      this.emit('reconnect');
    } else {
      this.readyState = READY_STATE_INITIAL;
      this.emit('close');
    }
  }

  _handleResponse(response) {
    if(response.request && response.request.op === 'ping' && response.ret_msg === 'pong') {
      if(response.success === true) {
        this.logger.silly('pong recieved', {category: 'bybit-ws'});
        clearTimeout(this.pongTimeout);
      }
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
}
