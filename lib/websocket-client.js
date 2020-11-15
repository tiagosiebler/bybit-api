"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebsocketClient = void 0;
const events_1 = require("events");
const logger_1 = require("./logger");
const rest_client_1 = require("./rest-client");
const requestUtils_1 = require("./util/requestUtils");
// import WebSocket from 'ws';
const isomorphic_ws_1 = __importDefault(require("isomorphic-ws"));
const wsUrls = {
    livenet: 'wss://stream.bybit.com/realtime',
    testnet: 'wss://stream-testnet.bybit.com/realtime'
};
const READY_STATE_INITIAL = 0;
const READY_STATE_CONNECTING = 1;
const READY_STATE_CONNECTED = 2;
const READY_STATE_CLOSING = 3;
const READY_STATE_RECONNECTING = 4;
;
class WebsocketClient extends events_1.EventEmitter {
    constructor(options, logger) {
        super();
        this.logger = logger || logger_1.DefaultLogger;
        this.readyState = READY_STATE_INITIAL;
        this.pingInterval = undefined;
        this.pongTimeout = undefined;
        this.options = Object.assign({ livenet: false, pongTimeout: 1000, pingInterval: 10000, reconnectTimeout: 500 }, options);
        this.client = new rest_client_1.RestClient(undefined, undefined, this.options.livenet, this.options.restOptions, this.options.requestOptions);
        this._subscriptions = new Set();
        this._connect();
    }
    subscribe(topics) {
        if (!Array.isArray(topics))
            topics = [topics];
        topics.forEach(topic => this._subscriptions.add(topic));
        // subscribe not necessary if not yet connected (will subscribe onOpen)
        if (this.readyState === READY_STATE_CONNECTED)
            this._subscribe(topics);
    }
    unsubscribe(topics) {
        if (!Array.isArray(topics))
            topics = [topics];
        topics.forEach(topic => this._subscriptions.delete(topic));
        // unsubscribe not necessary if not yet connected
        if (this.readyState === READY_STATE_CONNECTED)
            this._unsubscribe(topics);
    }
    close() {
        this.logger.info('Closing connection', { category: 'bybit-ws' });
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
    _connect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (this.readyState === READY_STATE_INITIAL)
                    this.readyState = READY_STATE_CONNECTING;
                const authParams = yield this._authenticate();
                const url = this._getWsUrl() + authParams;
                const ws = new isomorphic_ws_1.default(url);
                // ws.onopen!(this._wsOpenHandler.bind(this));
                // ws.onmessage!(this._wsMessageHandler.bind(this));
                // ws.onerror!(this._wsOnErrorHandler.bind(this));
                // ws.onclose!(this._wsCloseHandler.bind(this));
                ws.onopen = this._wsOpenHandler.bind(this);
                ws.onmessage = this._wsMessageHandler.bind(this);
                ws.onerror = this._wsOnErrorHandler.bind(this);
                ws.onclose = this._wsCloseHandler.bind(this);
                this.ws = ws;
            }
            catch (err) {
                this.logger.error('Connection failed: ', err);
                this._reconnect(this.options.reconnectTimeout);
            }
        });
    }
    _authenticate() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.options.key && this.options.secret) {
                this.logger.debug('Starting authenticated websocket client.', { category: 'bybit-ws' });
                const timeOffset = yield this.client.getTimeOffset();
                const params = {
                    api_key: this.options.key,
                    expires: (Date.now() + timeOffset + 5000)
                };
                params.signature = requestUtils_1.signMessage('GET/realtime' + params.expires, this.options.secret);
                return '?' + requestUtils_1.serializeParams(params);
            }
            else if (this.options.key || this.options.secret) {
                this.logger.warning('Could not authenticate websocket, either api key or private key missing.', { category: 'bybit-ws' });
            }
            else {
                this.logger.debug('Starting public only websocket client.', { category: 'bybit-ws' });
            }
            return '';
        });
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
        clearTimeout(this.pongTimeout);
        delete this.pongTimeout;
        this.logger.silly('Sending ping', { category: 'bybit-ws' });
        this.ws.send(JSON.stringify({ op: 'ping' }));
        this.pongTimeout = setTimeout(() => {
            this.logger.info('Pong timeout', { category: 'bybit-ws' });
            this._teardown();
            // this.ws.terminate();
            // TODO: does this work?
            this.ws.close();
        }, this.options.pongTimeout);
    }
    _teardown() {
        if (this.pingInterval)
            clearInterval(this.pingInterval);
        if (this.pongTimeout)
            clearTimeout(this.pongTimeout);
        this.pongTimeout = undefined;
        this.pingInterval = undefined;
    }
    _wsOpenHandler() {
        if (this.readyState === READY_STATE_CONNECTING) {
            this.logger.info('Websocket connected', { category: 'bybit-ws', livenet: this.options.livenet });
            this.emit('open');
        }
        else if (this.readyState === READY_STATE_RECONNECTING) {
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
        }
        else if (msg.topic) {
            this._handleUpdate(msg);
        }
        else {
            this.logger.warning('Got unhandled ws message', msg);
        }
    }
    _wsOnErrorHandler(err) {
        this.logger.error('Websocket error', { category: 'bybit-ws', err });
        if (this.readyState === READY_STATE_CONNECTED)
            this.emit('error', err);
    }
    _wsCloseHandler() {
        this.logger.info('Websocket connection closed', { category: 'bybit-ws' });
        if (this.readyState !== READY_STATE_CLOSING) {
            this._reconnect(this.options.reconnectTimeout);
            this.emit('reconnect');
        }
        else {
            this.readyState = READY_STATE_INITIAL;
            this.emit('close');
        }
    }
    _handleResponse(response) {
        if (response.request &&
            response.request.op === 'ping' &&
            response.ret_msg === 'pong' &&
            response.success === true) {
            this.logger.silly('pong recieved', { category: 'bybit-ws' });
            clearTimeout(this.pongTimeout);
        }
        else {
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
exports.WebsocketClient = WebsocketClient;
;
//# sourceMappingURL=websocket-client.js.map