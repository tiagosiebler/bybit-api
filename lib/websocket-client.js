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
/* eslint-disable @typescript-eslint/no-unsafe-declaration-merging */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-explicit-any */
const events_1 = require("events");
const isomorphic_ws_1 = __importDefault(require("isomorphic-ws"));
const inverse_client_1 = require("./inverse-client");
const linear_client_1 = require("./linear-client");
const spot_client_v3_1 = require("./spot-client-v3");
const spot_client_1 = require("./spot-client");
const usdc_option_client_1 = require("./usdc-option-client");
const usdc_perpetual_client_1 = require("./usdc-perpetual-client");
const unified_margin_client_1 = require("./unified-margin-client");
const contract_client_1 = require("./contract-client");
const node_support_1 = require("./util/node-support");
const WsStore_1 = __importDefault(require("./util/WsStore"));
const util_1 = require("./util");
const rest_client_v5_1 = require("./rest-client-v5");
const loggerCategory = { category: 'bybit-ws' };
// eslint-disable-next-line no-redeclare
class WebsocketClient extends events_1.EventEmitter {
    constructor(options, logger) {
        super();
        this.pendingTopicsSubscriptions = [];
        this.logger = logger || util_1.DefaultLogger;
        this.wsStore = new WsStore_1.default(this.logger);
        this.options = Object.assign({ testnet: false, pongTimeout: 1000, pingInterval: 10000, reconnectTimeout: 500, recvWindow: 5000, fetchTimeOffsetBeforeAuth: false }, options);
        this.options.restOptions = Object.assign(Object.assign({}, this.options.restOptions), { testnet: this.options.testnet });
        this.prepareRESTClient();
        // add default error handling so this doesn't crash node (if the user didn't set a handler)
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        this.on('error', () => { });
    }
    /** Get the WsStore that tracks websockets & topics */
    getWsStore() {
        return this.wsStore;
    }
    isTestnet() {
        return this.options.testnet === true;
    }
    /**
     * Subscribe to V5 topics & track/persist them.
     * @param wsTopics - topic or list of topics
     * @param category - the API category this topic is for (e.g. "linear"). The value is only important when connecting to public topics and will be ignored for private topics.
     * @param isPrivateTopic - optional - the library will try to detect private topics, you can use this to mark a topic as private (if the topic isn't recognised yet)
     */
    subscribeV5(wsTopics, category, isPrivateTopic) {
        const topics = Array.isArray(wsTopics) ? wsTopics : [wsTopics];
        return new Promise((resolver, rejector) => {
            topics.forEach((topic) => {
                const wsKey = (0, util_1.getWsKeyForTopic)(this.options.market, topic, isPrivateTopic, category);
                // Persist topic for reconnects
                this.wsStore.addTopic(wsKey, topic);
                this.upsertPendingTopicsSubscriptions(wsKey, topic, resolver, rejector);
                // if connected, send subscription request
                if (this.wsStore.isConnectionState(wsKey, util_1.WsConnectionStateEnum.CONNECTED)) {
                    return this.requestSubscribeTopics(wsKey, [topic]);
                }
                // start connection process if it hasn't yet begun. Topics are automatically subscribed to on-connect
                if (!this.wsStore.isConnectionState(wsKey, util_1.WsConnectionStateEnum.CONNECTING) &&
                    !this.wsStore.isConnectionState(wsKey, util_1.WsConnectionStateEnum.RECONNECTING)) {
                    return this.connect(wsKey);
                }
            });
        });
    }
    /**
     * Subscribe to V1-V3 topics & track/persist them.
     *
     * Note: for public V5 topics use the `subscribeV5()` method.
     *
     * Topics will be automatically resubscribed to if the connection resets/drops/reconnects.
     * @param wsTopics - topic or list of topics
     * @param isPrivateTopic optional - the library will try to detect private topics, you can use this to mark a topic as private (if the topic isn't recognised yet)
     */
    subscribe(wsTopics, isPrivateTopic) {
        const topics = Array.isArray(wsTopics) ? wsTopics : [wsTopics];
        if (this.options.market === 'v5') {
            topics.forEach((topic) => {
                if (!(0, util_1.isPrivateWsTopic)(topic)) {
                    throw new Error('For public "v5" websocket topics, use the subscribeV5() method & provide the category parameter');
                }
            });
        }
        return new Promise((resolver, rejector) => {
            topics.forEach((topic) => {
                const wsKey = (0, util_1.getWsKeyForTopic)(this.options.market, topic, isPrivateTopic);
                // Persist topic for reconnects
                this.wsStore.addTopic(wsKey, topic);
                this.upsertPendingTopicsSubscriptions(wsKey, topic, resolver, rejector);
                // if connected, send subscription request
                if (this.wsStore.isConnectionState(wsKey, util_1.WsConnectionStateEnum.CONNECTED)) {
                    return this.requestSubscribeTopics(wsKey, [topic]);
                }
                // start connection process if it hasn't yet begun. Topics are automatically subscribed to on-connect
                if (!this.wsStore.isConnectionState(wsKey, util_1.WsConnectionStateEnum.CONNECTING) &&
                    !this.wsStore.isConnectionState(wsKey, util_1.WsConnectionStateEnum.RECONNECTING)) {
                    return this.connect(wsKey);
                }
            });
        });
    }
    upsertPendingTopicsSubscriptions(wsKey, topic, resolver, rejector) {
        const existingWsKeyPendingSubscriptions = this.pendingTopicsSubscriptions.find((s) => s.wsKey === wsKey);
        if (!existingWsKeyPendingSubscriptions) {
            this.pendingTopicsSubscriptions.push({
                wsKey,
                resolver,
                rejector,
                failedTopicsSubscriptions: new Set(),
                pendingTopicsSubscriptions: new Set([topic]),
            });
            return;
        }
        existingWsKeyPendingSubscriptions.pendingTopicsSubscriptions.add(topic);
    }
    /**
     * Unsubscribe from V5 topics & remove them from memory. They won't be re-subscribed to if the connection reconnects.
     * @param wsTopics - topic or list of topics
     * @param category - the API category this topic is for (e.g. "linear"). The value is only important when connecting to public topics and will be ignored for private topics.
     * @param isPrivateTopic - optional - the library will try to detect private topics, you can use this to mark a topic as private (if the topic isn't recognised yet)
     */
    unsubscribeV5(wsTopics, category, isPrivateTopic) {
        const topics = Array.isArray(wsTopics) ? wsTopics : [wsTopics];
        topics.forEach((topic) => {
            const wsKey = (0, util_1.getWsKeyForTopic)(this.options.market, topic, isPrivateTopic, category);
            // Remove topic from persistence for reconnects
            this.wsStore.deleteTopic(wsKey, topic);
            this.removeTopicPendingSubscription(wsKey, topic);
            // unsubscribe request only necessary if active connection exists
            if (this.wsStore.isConnectionState(wsKey, util_1.WsConnectionStateEnum.CONNECTED)) {
                this.requestUnsubscribeTopics(wsKey, [topic]);
            }
        });
    }
    removeTopicPendingSubscription(wsKey, topic) {
        const existingWsKeyPendingSubscriptions = this.pendingTopicsSubscriptions.find((s) => s.wsKey === wsKey);
        if (existingWsKeyPendingSubscriptions) {
            existingWsKeyPendingSubscriptions.pendingTopicsSubscriptions.delete(topic);
            if (!existingWsKeyPendingSubscriptions.pendingTopicsSubscriptions.size) {
                this.pendingTopicsSubscriptions =
                    this.pendingTopicsSubscriptions.filter((s) => s.wsKey !== wsKey);
            }
        }
    }
    clearTopicsPendingSubscriptions(wsKey) {
        this.pendingTopicsSubscriptions = this.pendingTopicsSubscriptions.filter((s) => s.wsKey !== wsKey);
    }
    /**
     * Unsubscribe from V1-V3 topics & remove them from memory. They won't be re-subscribed to if the connection reconnects.
     *
     * Note: For public V5 topics, use `unsubscribeV5()` instead!
     *
     * @param wsTopics topic or list of topics
     * @param isPrivateTopic optional - the library will try to detect private topics, you can use this to mark a topic as private (if the topic isn't recognised yet)
     */
    unsubscribe(wsTopics, isPrivateTopic) {
        const topics = Array.isArray(wsTopics) ? wsTopics : [wsTopics];
        if (this.options.market === 'v5') {
            topics.forEach((topic) => {
                if (!(0, util_1.isPrivateWsTopic)(topic)) {
                    throw new Error('For public "v5" websocket topics, use the unsubscribeV5() method & provide the category parameter');
                }
            });
        }
        topics.forEach((topic) => {
            const wsKey = (0, util_1.getWsKeyForTopic)(this.options.market, topic, isPrivateTopic);
            // Remove topic from persistence for reconnects
            this.wsStore.deleteTopic(wsKey, topic);
            this.removeTopicPendingSubscription(wsKey, topic);
            // unsubscribe request only necessary if active connection exists
            if (this.wsStore.isConnectionState(wsKey, util_1.WsConnectionStateEnum.CONNECTED)) {
                this.requestUnsubscribeTopics(wsKey, [topic]);
            }
        });
    }
    /**
     * @private Only used if we fetch exchange time before attempting auth. Disabled by default.
     * I've removed this for ftx and it's working great, tempted to remove this here
     */
    prepareRESTClient() {
        switch (this.options.market) {
            case 'inverse': {
                this.restClient = new inverse_client_1.InverseClient(this.options.restOptions, this.options.requestOptions);
                break;
            }
            case 'linear': {
                this.restClient = new linear_client_1.LinearClient(this.options.restOptions, this.options.requestOptions);
                break;
            }
            case 'spot': {
                this.restClient = new spot_client_1.SpotClient(this.options.restOptions, this.options.requestOptions);
                this.connectPublic();
                break;
            }
            case 'spotv3': {
                this.restClient = new spot_client_v3_1.SpotClientV3(this.options.restOptions, this.options.requestOptions);
                break;
            }
            case 'usdcOption': {
                this.restClient = new usdc_option_client_1.USDCOptionClient(this.options.restOptions, this.options.requestOptions);
                break;
            }
            case 'usdcPerp': {
                this.restClient = new usdc_perpetual_client_1.USDCPerpetualClient(this.options.restOptions, this.options.requestOptions);
                break;
            }
            case 'unifiedOption':
            case 'unifiedPerp': {
                this.restClient = new unified_margin_client_1.UnifiedMarginClient(this.options.restOptions, this.options.requestOptions);
                break;
            }
            case 'contractInverse':
            case 'contractUSDT': {
                this.restClient = new contract_client_1.ContractClient(this.options.restOptions, this.options.requestOptions);
                break;
            }
            case 'v5': {
                this.restClient = new rest_client_v5_1.RestClientV5(this.options.restOptions, this.options.requestOptions);
                break;
            }
            default: {
                throw (0, util_1.neverGuard)(this.options.market, 'prepareRESTClient(): Unhandled market');
            }
        }
    }
    close(wsKey, force) {
        this.logger.info('Closing connection', Object.assign(Object.assign({}, loggerCategory), { wsKey }));
        this.setWsState(wsKey, util_1.WsConnectionStateEnum.CLOSING);
        this.clearTimers(wsKey);
        const ws = this.getWs(wsKey);
        ws === null || ws === void 0 ? void 0 : ws.close();
        if (force) {
            (0, util_1.safeTerminateWs)(ws);
        }
    }
    closeAll(force) {
        const keys = this.wsStore.getKeys();
        this.logger.info(`Closing all ws connections: ${keys}`);
        keys.forEach((key) => {
            this.close(key, force);
        });
    }
    /**
     * Request connection of all dependent (public & private) websockets, instead of waiting for automatic connection by library
     */
    connectAll() {
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
                throw (0, util_1.neverGuard)(this.options.market, 'connectAll(): Unhandled market');
            }
        }
    }
    connectPublic() {
        switch (this.options.market) {
            case 'inverse': {
                return [this.connect(util_1.WS_KEY_MAP.inverse)];
            }
            case 'linear': {
                return [this.connect(util_1.WS_KEY_MAP.linearPublic)];
            }
            case 'spot': {
                return [this.connect(util_1.WS_KEY_MAP.spotPublic)];
            }
            case 'spotv3': {
                return [this.connect(util_1.WS_KEY_MAP.spotV3Public)];
            }
            case 'usdcOption': {
                return [this.connect(util_1.WS_KEY_MAP.usdcOptionPublic)];
            }
            case 'usdcPerp': {
                return [this.connect(util_1.WS_KEY_MAP.usdcPerpPublic)];
            }
            case 'unifiedOption': {
                return [this.connect(util_1.WS_KEY_MAP.unifiedOptionPublic)];
            }
            case 'unifiedPerp': {
                return [
                    this.connect(util_1.WS_KEY_MAP.unifiedPerpUSDTPublic),
                    this.connect(util_1.WS_KEY_MAP.unifiedPerpUSDCPublic),
                ];
            }
            case 'contractUSDT':
                return [this.connect(util_1.WS_KEY_MAP.contractUSDTPublic)];
            case 'contractInverse':
                return [this.connect(util_1.WS_KEY_MAP.contractInversePublic)];
            case 'v5': {
                return [
                    this.connect(util_1.WS_KEY_MAP.v5SpotPublic),
                    this.connect(util_1.WS_KEY_MAP.v5LinearPublic),
                    this.connect(util_1.WS_KEY_MAP.v5InversePublic),
                    this.connect(util_1.WS_KEY_MAP.v5OptionPublic),
                ];
            }
            default: {
                throw (0, util_1.neverGuard)(this.options.market, 'connectPublic(): Unhandled market');
            }
        }
    }
    connectPrivate() {
        switch (this.options.market) {
            case 'inverse': {
                return this.connect(util_1.WS_KEY_MAP.inverse);
            }
            case 'linear': {
                return this.connect(util_1.WS_KEY_MAP.linearPrivate);
            }
            case 'spot': {
                return this.connect(util_1.WS_KEY_MAP.spotPrivate);
            }
            case 'spotv3': {
                return this.connect(util_1.WS_KEY_MAP.spotV3Private);
            }
            case 'usdcOption': {
                return this.connect(util_1.WS_KEY_MAP.usdcOptionPrivate);
            }
            case 'usdcPerp': {
                return this.connect(util_1.WS_KEY_MAP.usdcPerpPrivate);
            }
            case 'unifiedPerp':
            case 'unifiedOption': {
                return this.connect(util_1.WS_KEY_MAP.unifiedPrivate);
            }
            case 'contractUSDT':
                return this.connect(util_1.WS_KEY_MAP.contractUSDTPrivate);
            case 'contractInverse':
                return this.connect(util_1.WS_KEY_MAP.contractInversePrivate);
            case 'v5': {
                return this.connect(util_1.WS_KEY_MAP.v5Private);
            }
            default: {
                throw (0, util_1.neverGuard)(this.options.market, 'connectPrivate(): Unhandled market');
            }
        }
    }
    connect(wsKey) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (this.wsStore.isWsOpen(wsKey)) {
                    this.logger.error('Refused to connect to ws with existing active connection', Object.assign(Object.assign({}, loggerCategory), { wsKey }));
                    return this.wsStore.getWs(wsKey);
                }
                if (this.wsStore.isConnectionState(wsKey, util_1.WsConnectionStateEnum.CONNECTING)) {
                    this.logger.error('Refused to connect to ws, connection attempt already active', Object.assign(Object.assign({}, loggerCategory), { wsKey }));
                    return;
                }
                if (!this.wsStore.getConnectionState(wsKey) ||
                    this.wsStore.isConnectionState(wsKey, util_1.WsConnectionStateEnum.INITIAL)) {
                    this.setWsState(wsKey, util_1.WsConnectionStateEnum.CONNECTING);
                }
                const authParams = yield this.getAuthParams(wsKey);
                const url = (0, util_1.getWsUrl)(wsKey, this.options, this.logger);
                const ws = this.connectToWsUrl(url + authParams, wsKey);
                return this.wsStore.setWs(wsKey, ws);
            }
            catch (err) {
                this.parseWsError('Connection failed', err, wsKey);
                this.reconnectWithDelay(wsKey, this.options.reconnectTimeout);
            }
        });
    }
    parseWsError(context, error, wsKey) {
        if (!error.message) {
            this.logger.error(`${context} due to unexpected error: `, error);
            this.emit('error', error);
            return;
        }
        switch (error.message) {
            case 'Unexpected server response: 401':
                this.logger.error(`${context} due to 401 authorization failure.`, Object.assign(Object.assign({}, loggerCategory), { wsKey }));
                break;
            default:
                if (this.wsStore.getConnectionState(wsKey) !==
                    util_1.WsConnectionStateEnum.CLOSING) {
                    this.logger.error(`${context} due to unexpected response error: "${(error === null || error === void 0 ? void 0 : error.msg) || (error === null || error === void 0 ? void 0 : error.message) || error}"`, Object.assign(Object.assign({}, loggerCategory), { wsKey, error }));
                    this.executeReconnectableClose(wsKey, 'unhandled onWsError');
                }
                else {
                    this.logger.info(`${wsKey} socket forcefully closed. Will not reconnect.`);
                }
                break;
        }
        this.emit('error', error);
    }
    /**
     * Return params required to make authorized request
     */
    getAuthParams(wsKey) {
        return __awaiter(this, void 0, void 0, function* () {
            if (util_1.PUBLIC_WS_KEYS.includes(wsKey)) {
                this.logger.debug('Starting public only websocket client.', Object.assign(Object.assign({}, loggerCategory), { wsKey }));
                return '';
            }
            try {
                const { signature, expiresAt } = yield this.getWsAuthSignature(wsKey);
                const authParams = {
                    api_key: this.options.key,
                    expires: expiresAt,
                    signature,
                };
                return '?' + (0, util_1.serializeParams)(authParams);
            }
            catch (e) {
                this.logger.error(e, Object.assign(Object.assign({}, loggerCategory), { wsKey }));
                return '';
            }
        });
    }
    sendAuthRequest(wsKey) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { signature, expiresAt } = yield this.getWsAuthSignature(wsKey);
                const request = {
                    op: 'auth',
                    args: [this.options.key, expiresAt, signature],
                    req_id: `${wsKey}-auth`,
                };
                return this.tryWsSend(wsKey, JSON.stringify(request));
            }
            catch (e) {
                this.logger.error(e, Object.assign(Object.assign({}, loggerCategory), { wsKey }));
            }
        });
    }
    getWsAuthSignature(wsKey) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const { key, secret } = this.options;
            if (!key || !secret) {
                this.logger.warning('Cannot authenticate websocket, either api or private keys missing.', Object.assign(Object.assign({}, loggerCategory), { wsKey }));
                throw new Error('Cannot auth - missing api or secret in config');
            }
            this.logger.debug("Getting auth'd request params", Object.assign(Object.assign({}, loggerCategory), { wsKey }));
            const timeOffset = this.options.fetchTimeOffsetBeforeAuth
                ? (yield ((_a = this.restClient) === null || _a === void 0 ? void 0 : _a.fetchTimeOffset())) || 0
                : 0;
            const recvWindow = this.options.recvWindow || 5000;
            const signatureExpiresAt = Date.now() + timeOffset + recvWindow;
            const signature = yield (0, node_support_1.signMessage)('GET/realtime' + signatureExpiresAt, secret);
            return {
                expiresAt: signatureExpiresAt,
                signature,
            };
        });
    }
    reconnectWithDelay(wsKey, connectionDelayMs) {
        var _a;
        this.clearTimers(wsKey);
        if (this.wsStore.getConnectionState(wsKey) !==
            util_1.WsConnectionStateEnum.CONNECTING) {
            this.setWsState(wsKey, util_1.WsConnectionStateEnum.RECONNECTING);
        }
        if ((_a = this.wsStore.get(wsKey)) === null || _a === void 0 ? void 0 : _a.activeReconnectTimer) {
            this.clearReconnectTimer(wsKey);
        }
        this.wsStore.get(wsKey, true).activeReconnectTimer = setTimeout(() => {
            this.logger.info('Reconnecting to websocket', Object.assign(Object.assign({}, loggerCategory), { wsKey }));
            this.clearReconnectTimer(wsKey);
            this.connect(wsKey);
        }, connectionDelayMs);
    }
    ping(wsKey) {
        if (this.wsStore.get(wsKey, true).activePongTimer) {
            return;
        }
        this.clearPongTimer(wsKey);
        this.logger.silly('Sending ping', Object.assign(Object.assign({}, loggerCategory), { wsKey }));
        this.tryWsSend(wsKey, JSON.stringify({ op: 'ping' }));
        this.wsStore.get(wsKey, true).activePongTimer = setTimeout(() => this.executeReconnectableClose(wsKey, 'Pong timeout'), this.options.pongTimeout);
    }
    /**
     * Closes a connection, if it's even open. If open, this will trigger a reconnect asynchronously.
     * If closed, trigger a reconnect immediately
     */
    executeReconnectableClose(wsKey, reason) {
        this.logger.info(`${reason} - closing socket to reconnect`, Object.assign(Object.assign({}, loggerCategory), { wsKey,
            reason }));
        const wasOpen = this.wsStore.isWsOpen(wsKey);
        this.clearPingTimer(wsKey);
        this.clearPongTimer(wsKey);
        const ws = this.getWs(wsKey);
        if (ws) {
            ws.close();
            (0, util_1.safeTerminateWs)(ws);
        }
        if (!wasOpen) {
            this.logger.info(`${reason} - socket already closed - trigger immediate reconnect`, Object.assign(Object.assign({}, loggerCategory), { wsKey,
                reason }));
            this.reconnectWithDelay(wsKey, this.options.reconnectTimeout);
        }
    }
    clearTimers(wsKey) {
        this.clearPingTimer(wsKey);
        this.clearPongTimer(wsKey);
        this.clearReconnectTimer(wsKey);
    }
    // Send a ping at intervals
    clearPingTimer(wsKey) {
        const wsState = this.wsStore.get(wsKey);
        if (wsState === null || wsState === void 0 ? void 0 : wsState.activePingTimer) {
            clearInterval(wsState.activePingTimer);
            wsState.activePingTimer = undefined;
        }
    }
    // Expect a pong within a time limit
    clearPongTimer(wsKey) {
        const wsState = this.wsStore.get(wsKey);
        if (wsState === null || wsState === void 0 ? void 0 : wsState.activePongTimer) {
            clearTimeout(wsState.activePongTimer);
            wsState.activePongTimer = undefined;
        }
    }
    clearReconnectTimer(wsKey) {
        const wsState = this.wsStore.get(wsKey);
        if (wsState === null || wsState === void 0 ? void 0 : wsState.activeReconnectTimer) {
            clearTimeout(wsState.activeReconnectTimer);
            wsState.activeReconnectTimer = undefined;
        }
    }
    /**
     * @private Use the `subscribe(topics)` method to subscribe to topics. Send WS message to subscribe to topics.
     */
    requestSubscribeTopics(wsKey, topics) {
        if (!topics.length) {
            return;
        }
        const maxTopicsPerEvent = (0, util_1.getMaxTopicsPerSubscribeEvent)(this.options.market, wsKey);
        if (maxTopicsPerEvent && topics.length > maxTopicsPerEvent) {
            this.logger.silly(`Subscribing to topics in batches of ${maxTopicsPerEvent}`);
            for (let i = 0; i < topics.length; i += maxTopicsPerEvent) {
                const batch = topics.slice(i, i + maxTopicsPerEvent);
                this.logger.silly(`Subscribing to batch of ${batch.length}`);
                this.requestSubscribeTopics(wsKey, batch);
            }
            this.logger.silly(`Finished batch subscribing to ${topics.length} topics`);
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
    requestUnsubscribeTopics(wsKey, topics) {
        if (!topics.length) {
            return;
        }
        const maxTopicsPerEvent = (0, util_1.getMaxTopicsPerSubscribeEvent)(this.options.market, wsKey);
        if (maxTopicsPerEvent && topics.length > maxTopicsPerEvent) {
            this.logger.silly(`Unsubscribing to topics in batches of ${maxTopicsPerEvent}`);
            for (let i = 0; i < topics.length; i += maxTopicsPerEvent) {
                const batch = topics.slice(i, i + maxTopicsPerEvent);
                this.logger.silly(`Unsubscribing to batch of ${batch.length}`);
                this.requestUnsubscribeTopics(wsKey, batch);
            }
            this.logger.silly(`Finished batch unsubscribing to ${topics.length} topics`);
            return;
        }
        const wsMessage = JSON.stringify({
            op: 'unsubscribe',
            args: topics,
        });
        this.tryWsSend(wsKey, wsMessage);
    }
    tryWsSend(wsKey, wsMessage) {
        try {
            this.logger.silly('Sending upstream ws message: ', Object.assign(Object.assign({}, loggerCategory), { wsMessage,
                wsKey }));
            if (!wsKey) {
                throw new Error('Cannot send message due to no known websocket for this wsKey');
            }
            const ws = this.getWs(wsKey);
            if (!ws) {
                throw new Error(`${wsKey} socket not connected yet, call "connect(${wsKey}) first then try again when the "open" event arrives`);
            }
            ws.send(wsMessage);
        }
        catch (e) {
            this.logger.error('Failed to send WS message', Object.assign(Object.assign({}, loggerCategory), { wsMessage,
                wsKey, exception: e }));
        }
    }
    connectToWsUrl(url, wsKey) {
        var _a;
        this.logger.silly(`Opening WS connection to URL: ${url}`, Object.assign(Object.assign({}, loggerCategory), { wsKey }));
        const agent = (_a = this.options.requestOptions) === null || _a === void 0 ? void 0 : _a.agent;
        const ws = new isomorphic_ws_1.default(url, undefined, agent ? { agent } : undefined);
        ws.onopen = (event) => this.onWsOpen(event, wsKey);
        ws.onmessage = (event) => this.onWsMessage(event, wsKey);
        ws.onerror = (event) => this.parseWsError('Websocket onWsError', event, wsKey);
        ws.onclose = (event) => this.onWsClose(event, wsKey);
        return ws;
    }
    onWsOpen(event, wsKey) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.wsStore.isConnectionState(wsKey, util_1.WsConnectionStateEnum.CONNECTING)) {
                this.logger.info('Websocket connected', Object.assign(Object.assign({}, loggerCategory), { wsKey, testnet: this.isTestnet(), market: this.options.market }));
                this.emit('open', { wsKey, event });
            }
            else if (this.wsStore.isConnectionState(wsKey, util_1.WsConnectionStateEnum.RECONNECTING)) {
                this.logger.info('Websocket reconnected', Object.assign(Object.assign({}, loggerCategory), { wsKey }));
                this.emit('reconnected', { wsKey, event });
            }
            this.setWsState(wsKey, util_1.WsConnectionStateEnum.CONNECTED);
            // Some websockets require an auth packet to be sent after opening the connection
            if (util_1.WS_AUTH_ON_CONNECT_KEYS.includes(wsKey)) {
                this.logger.info('Sending auth request...');
                yield this.sendAuthRequest(wsKey);
            }
            // TODO: persistence not working yet for spot v1 topics
            if (wsKey !== util_1.WS_KEY_MAP.spotPublic && wsKey !== util_1.WS_KEY_MAP.spotPrivate) {
                const topics = [...this.wsStore.getTopics(wsKey)];
                this.logger.info('Subscribing to topics', Object.assign(Object.assign({}, loggerCategory), { wsKey,
                    topics }));
                this.requestSubscribeTopics(wsKey, topics);
            }
            this.wsStore.get(wsKey, true).activePingTimer = setInterval(() => this.ping(wsKey), this.options.pingInterval);
        });
    }
    onWsMessage(event, wsKey) {
        try {
            // any message can clear the pong timer - wouldn't get a message if the ws dropped
            this.clearPongTimer(wsKey);
            const msg = JSON.parse((event && event.data) || event);
            // this.logger.silly('Received event', {
            //   ...loggerCategory,
            //   wsKey,
            //   msg: JSON.stringify(msg),
            // });
            if ((0, util_1.isTopicSubscriptionConfirmation)(msg)) {
                this.updatePendingTopicSubscriptionStatus(wsKey, msg);
            }
            // TODO: cleanme
            if (msg['success'] || (msg === null || msg === void 0 ? void 0 : msg.pong) || (0, util_1.isWsPong)(msg)) {
                if ((0, util_1.isWsPong)(msg)) {
                    this.logger.silly('Received pong', Object.assign(Object.assign({}, loggerCategory), { wsKey }));
                }
                else {
                    this.emit('response', Object.assign(Object.assign({}, msg), { wsKey }));
                }
                return;
            }
            if (msg['finalFragment']) {
                return this.emit('response', Object.assign(Object.assign({}, msg), { wsKey }));
            }
            if (msg === null || msg === void 0 ? void 0 : msg.topic) {
                return this.emit('update', Object.assign(Object.assign({}, msg), { wsKey }));
            }
            if (
            // spot v1
            (msg === null || msg === void 0 ? void 0 : msg.code) ||
                // spot v3
                (msg === null || msg === void 0 ? void 0 : msg.type) === 'error' ||
                // usdc options
                (msg === null || msg === void 0 ? void 0 : msg.success) === false) {
                return this.emit('error', Object.assign(Object.assign({}, msg), { wsKey }));
            }
            this.logger.warning('Unhandled/unrecognised ws event message', Object.assign(Object.assign({}, loggerCategory), { message: msg, event,
                wsKey }));
        }
        catch (e) {
            this.logger.error('Failed to parse ws event message', Object.assign(Object.assign({}, loggerCategory), { error: e, event,
                wsKey }));
        }
    }
    updatePendingTopicSubscriptionStatus(wsKey, msg) {
        const requestsIds = msg.req_id;
        const pendingTopicsSubscriptions = this.pendingTopicsSubscriptions.find((s) => s.wsKey === wsKey);
        if (!pendingTopicsSubscriptions)
            return;
        const splitRequestsIds = requestsIds.split(',');
        if (!(0, util_1.isTopicSubscriptionSuccess)(msg)) {
            splitRequestsIds.forEach((req_id) => pendingTopicsSubscriptions.failedTopicsSubscriptions.add(req_id));
        }
        splitRequestsIds.forEach((req_id) => {
            this.removeTopicPendingSubscription(wsKey, req_id);
            if (!pendingTopicsSubscriptions.pendingTopicsSubscriptions.size &&
                !pendingTopicsSubscriptions.failedTopicsSubscriptions.size) {
                // all topics have been subscribed successfully, so we can resolve the subscription request
                pendingTopicsSubscriptions.resolver();
                this.clearTopicsPendingSubscriptions(wsKey);
            }
            if (!pendingTopicsSubscriptions.pendingTopicsSubscriptions.size &&
                pendingTopicsSubscriptions.failedTopicsSubscriptions.size) {
                // not all topics have been subscribed successfully, so we reject the subscription request
                // and let the caller handle the situation by providing the list of failed subscriptions requests
                const failedSubscriptionsMessage = `(${[
                    ...pendingTopicsSubscriptions.failedTopicsSubscriptions,
                ].toString()}) failed to subscribe`;
                pendingTopicsSubscriptions.rejector(failedSubscriptionsMessage);
                this.clearTopicsPendingSubscriptions(wsKey);
            }
        });
    }
    onWsClose(event, wsKey) {
        this.logger.info('Websocket connection closed', Object.assign(Object.assign({}, loggerCategory), { wsKey }));
        if (this.wsStore.getConnectionState(wsKey) !== util_1.WsConnectionStateEnum.CLOSING) {
            this.reconnectWithDelay(wsKey, this.options.reconnectTimeout);
            this.emit('reconnect', { wsKey, event });
        }
        else {
            this.setWsState(wsKey, util_1.WsConnectionStateEnum.INITIAL);
            this.emit('close', { wsKey, event });
        }
    }
    getWs(wsKey) {
        return this.wsStore.getWs(wsKey);
    }
    setWsState(wsKey, state) {
        this.wsStore.setConnectionState(wsKey, state);
    }
    wrongMarketError(market) {
        return new Error(`This WS client was instanced for the ${this.options.market} market. Make another WebsocketClient instance with "market: '${market}'" to listen to ${market} topics`);
    }
    /** @deprecated use "market: 'spotv3" client */
    subscribePublicSpotTrades(symbol, binary) {
        if (this.options.market !== 'spot') {
            throw this.wrongMarketError('spot');
        }
        return this.tryWsSend(util_1.WS_KEY_MAP.spotPublic, JSON.stringify({
            topic: 'trade',
            event: 'sub',
            symbol,
            params: {
                binary: !!binary,
            },
        }));
    }
    /** @deprecated use "market: 'spotv3" client */
    subscribePublicSpotTradingPair(symbol, binary) {
        if (this.options.market !== 'spot') {
            throw this.wrongMarketError('spot');
        }
        return this.tryWsSend(util_1.WS_KEY_MAP.spotPublic, JSON.stringify({
            symbol,
            topic: 'realtimes',
            event: 'sub',
            params: {
                binary: !!binary,
            },
        }));
    }
    /** @deprecated use "market: 'spotv3" client */
    subscribePublicSpotV1Kline(symbol, candleSize, binary) {
        if (this.options.market !== 'spot') {
            throw this.wrongMarketError('spot');
        }
        return this.tryWsSend(util_1.WS_KEY_MAP.spotPublic, JSON.stringify({
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
    /** @deprecated use "market: 'spotv3" client */
    subscribePublicSpotOrderbook(symbol, depth, dumpScale, binary) {
        if (this.options.market !== 'spot') {
            throw this.wrongMarketError('spot');
        }
        let topic;
        switch (depth) {
            case 'full': {
                topic = 'depth';
                break;
            }
            case 'merge': {
                topic = 'mergedDepth';
                if (!dumpScale) {
                    throw new Error('Dumpscale must be provided for merged orderbooks');
                }
                break;
            }
            case 'delta': {
                topic = 'diffDepth';
                break;
            }
        }
        const msg = {
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
        return this.tryWsSend(util_1.WS_KEY_MAP.spotPublic, JSON.stringify(msg));
    }
}
exports.WebsocketClient = WebsocketClient;
//# sourceMappingURL=websocket-client.js.map