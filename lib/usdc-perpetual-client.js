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
exports.USDCPerpetualClient = void 0;
const util_1 = require("./util");
const BaseRestClient_1 = __importDefault(require("./util/BaseRestClient"));
/**
 * REST API client for USDC Perpetual APIs
 *
 * @deprecated WARNING: V1/V2 private endpoints (Rest API & Websocket Stream) for mainnet
 * will be switched off gradually from 30 Oct 2023 UTC, so they are not promised a stability.
 * Please note that you are at your own risk of using old endpoints going forward, and please move to V5 ASAP.
 */
class USDCPerpetualClient extends BaseRestClient_1.default {
    getClientType() {
        // Follows the same authentication mechanism as other v3 APIs (e.g. USDC)
        return util_1.REST_CLIENT_TYPE_ENUM.v3;
    }
    fetchServerTime() {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.getServerTime();
            return Number(res.time_now);
        });
    }
    /**
     *
     * Market Data Endpoints
     *
     */
    getOrderBook(symbol) {
        return this.get('/perpetual/usdc/openapi/public/v1/order-book', { symbol });
    }
    /** Fetch trading rules (such as min/max qty). Query for all if blank. */
    getContractInfo(params) {
        return this.get('/perpetual/usdc/openapi/public/v1/symbols', params);
    }
    /** Get a symbol price/statistics ticker */
    getSymbolTicker(symbol) {
        return this.get('/perpetual/usdc/openapi/public/v1/tick', { symbol });
    }
    getCandles(params) {
        return this.get('/perpetual/usdc/openapi/public/v1/kline/list', params);
    }
    getMarkPrice(params) {
        return this.get('/perpetual/usdc/openapi/public/v1/mark-price-kline', params);
    }
    getIndexPrice(params) {
        return this.get('/perpetual/usdc/openapi/public/v1/index-price-kline', params);
    }
    getIndexPremium(params) {
        return this.get('/perpetual/usdc/openapi/public/v1/premium-index-kline', params);
    }
    getOpenInterest(params) {
        return this.get('/perpetual/usdc/openapi/public/v1/open-interest', params);
    }
    getLargeOrders(params) {
        return this.get('/perpetual/usdc/openapi/public/v1/big-deal', params);
    }
    getLongShortRatio(params) {
        return this.get('/perpetual/usdc/openapi/public/v1/account-ratio', params);
    }
    getLast500Trades(params) {
        return this.get('/option/usdc/openapi/public/v1/query-trade-latest', params);
    }
    /**
     *
     * Account Data Endpoints
     *
     */
    /** -> Order API */
    /**
     * Place an order using the USDC Derivatives Account.
     * The request status can be queried in real-time.
     * The response parameters must be queried through a query or a WebSocket response.
     */
    submitOrder(params) {
        return this.postPrivate('/perpetual/usdc/openapi/private/v1/place-order', params);
    }
    /** Active order parameters (such as quantity, price) and stop order parameters cannot be modified in one request at the same time. Please request modification separately. */
    modifyOrder(params) {
        return this.postPrivate('/perpetual/usdc/openapi/private/v1/replace-order', params);
    }
    /** Cancel order */
    cancelOrder(params) {
        return this.postPrivate('/perpetual/usdc/openapi/private/v1/cancel-order', params);
    }
    /** Cancel all active orders. The real-time response indicates whether the request is successful, depending on retCode. */
    cancelActiveOrders(symbol, orderFilter) {
        return this.postPrivate('/perpetual/usdc/openapi/private/v1/cancel-all', {
            symbol,
            orderFilter,
        });
    }
    /** Query Unfilled/Partially Filled Orders */
    getActiveOrders(params) {
        return this.postPrivate('/option/usdc/openapi/private/v1/query-active-orders', params);
    }
    /** Query order history. The endpoint only supports up to 30 days of queried records */
    getHistoricOrders(params) {
        return this.postPrivate('/option/usdc/openapi/private/v1/query-order-history', params);
    }
    /** Query trade history. The endpoint only supports up to 30 days of queried records. An error will be returned if startTime is more than 30 days. */
    getOrderExecutionHistory(params) {
        return this.postPrivate('/option/usdc/openapi/private/v1/execution-list', params);
    }
    /** -> Account API */
    /** The endpoint only supports up to 30 days of queried records. An error will be returned if startTime is more than 30 days. */
    getTransactionLog(params) {
        return this.postPrivate('/option/usdc/openapi/private/v1/query-transaction-log', params);
    }
    /** Wallet info for USDC account. */
    getBalances() {
        return this.postPrivate('/option/usdc/openapi/private/v1/query-wallet-balance');
    }
    /** Asset Info */
    getAssetInfo(baseCoin) {
        return this.postPrivate('/option/usdc/openapi/private/v1/query-asset-info', { baseCoin });
    }
    /**
     * If USDC derivatives account balance is greater than X, you can open PORTFOLIO_MARGIN,
     * and if it is less than Y, it will automatically close PORTFOLIO_MARGIN and change back to REGULAR_MARGIN.
     * X and Y will be adjusted according to operational requirements.
     * Rest API returns the result of checking prerequisites. You could get the real status of margin mode change by subscribing margin mode.
     */
    setMarginMode(newMarginMode) {
        return this.postPrivate('/option/usdc/private/asset/account/setMarginMode', { setMarginMode: newMarginMode });
    }
    /** Query margin mode for USDC account. */
    getMarginMode() {
        return this.postPrivate('/option/usdc/openapi/private/v1/query-margin-info');
    }
    /** -> Positions API */
    /** Query my positions */
    getPositions(params) {
        return this.postPrivate('/option/usdc/openapi/private/v1/query-position', params);
    }
    /** Only for REGULAR_MARGIN */
    setLeverage(symbol, leverage) {
        return this.postPrivate('/perpetual/usdc/openapi/private/v1/position/leverage/save', { symbol, leverage });
    }
    /** Query Settlement History */
    getSettlementHistory(params) {
        return this.postPrivate('/option/usdc/openapi/private/v1/session-settlement', params);
    }
    /** -> Risk Limit API */
    /** Query risk limit */
    getRiskLimit(symbol) {
        return this.getPrivate('/perpetual/usdc/openapi/public/v1/risk-limit/list', {
            symbol,
        });
    }
    /** Set risk limit */
    setRiskLimit(symbol, riskId) {
        return this.postPrivate('/perpetual/usdc/openapi/private/v1/position/set-risk-limit', { symbol, riskId });
    }
    /** -> Funding API */
    /** Funding settlement occurs every 8 hours at 00:00 UTC, 08:00 UTC and 16:00 UTC. The current interval's fund fee settlement is based on the previous interval's fund rate. For example, at 16:00, the settlement is based on the fund rate generated at 8:00. The fund rate generated at 16:00 will be used at 0:00 the next day. */
    getLastFundingRate(symbol) {
        return this.get('/perpetual/usdc/openapi/public/v1/prev-funding-rate', {
            symbol,
        });
    }
    /** Get predicted funding rate and my predicted funding fee */
    getPredictedFundingRate(symbol) {
        return this.postPrivate('/perpetual/usdc/openapi/private/v1/predicted-funding', { symbol });
    }
    /**
     *
     * API Data Endpoints
     *
     */
    getServerTime() {
        return this.get('/v2/public/time');
    }
}
exports.USDCPerpetualClient = USDCPerpetualClient;
//# sourceMappingURL=usdc-perpetual-client.js.map