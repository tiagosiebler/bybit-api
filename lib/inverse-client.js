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
exports.InverseClient = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const util_1 = require("./util");
const BaseRestClient_1 = __importDefault(require("./util/BaseRestClient"));
/**
 * REST API client for Inverse Perpetual Futures APIs (v2)
 *
 * @deprecated WARNING: V1/V2 private endpoints (Rest API & Websocket Stream) for mainnet
 * will be switched off gradually from 30 Oct 2023 UTC, so they are not promised a stability.
 * Please note that you are at your own risk of using old endpoints going forward, and please move to V5 ASAP.
 */
class InverseClient extends BaseRestClient_1.default {
    getClientType() {
        return util_1.REST_CLIENT_TYPE_ENUM.inverse;
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
    getOrderBook(params) {
        return this.get('v2/public/orderBook/L2', params);
    }
    getKline(params) {
        return this.get('v2/public/kline/list', params);
    }
    /**
     * Get latest information for symbol
     */
    getTickers(params) {
        return this.get('v2/public/tickers', params);
    }
    getTrades(params) {
        return this.get('v2/public/trading-records', params);
    }
    getSymbols() {
        return this.get('v2/public/symbols');
    }
    getMarkPriceKline(params) {
        return this.get('v2/public/mark-price-kline', params);
    }
    getIndexPriceKline(params) {
        return this.get('v2/public/index-price-kline', params);
    }
    getPremiumIndexKline(params) {
        return this.get('v2/public/premium-index-kline', params);
    }
    /**
     *
     * Market Data : Advanced
     *
     */
    getOpenInterest(params) {
        return this.get('v2/public/open-interest', params);
    }
    getLatestBigDeal(params) {
        return this.get('v2/public/big-deal', params);
    }
    getLongShortRatio(params) {
        return this.get('v2/public/account-ratio', params);
    }
    /**
     *
     * Account Data Endpoints
     *
     */
    getApiKeyInfo() {
        return this.getPrivate('v2/private/account/api-key');
    }
    /**
     *
     * Wallet Data Endpoints
     *
     */
    getWalletBalance(params) {
        return this.getPrivate('v2/private/wallet/balance', params);
    }
    getWalletFundRecords(params) {
        return this.getPrivate('v2/private/wallet/fund/records', params);
    }
    getWithdrawRecords(params) {
        return this.getPrivate('v2/private/wallet/withdraw/list', params);
    }
    getAssetExchangeRecords(params) {
        return this.getPrivate('v2/private/exchange-order/list', params);
    }
    /**
     *
     * API Data Endpoints
     *
     */
    getServerTime() {
        return this.get('v2/public/time');
    }
    getApiAnnouncements() {
        return this.get('v2/public/announcement');
    }
    /**
     *
     * Account Data Endpoints
     *
     */
    /**
     * Active orders
     */
    placeActiveOrder(orderRequest) {
        return this.postPrivate('v2/private/order/create', orderRequest);
    }
    getActiveOrderList(params) {
        return this.getPrivate('v2/private/order/list', params);
    }
    cancelActiveOrder(params) {
        return this.postPrivate('v2/private/order/cancel', params);
    }
    cancelAllActiveOrders(params) {
        return this.postPrivate('v2/private/order/cancelAll', params);
    }
    replaceActiveOrder(params) {
        return this.postPrivate('v2/private/order/replace', params);
    }
    queryActiveOrder(params) {
        return this.getPrivate('v2/private/order', params);
    }
    /**
     * Conditional orders
     */
    placeConditionalOrder(params) {
        return this.postPrivate('v2/private/stop-order/create', params);
    }
    /** get conditional order list. This may see delays, use queryConditionalOrder() for real-time queries */
    getConditionalOrder(params) {
        return this.getPrivate('v2/private/stop-order/list', params);
    }
    cancelConditionalOrder(params) {
        return this.postPrivate('v2/private/stop-order/cancel', params);
    }
    cancelAllConditionalOrders(params) {
        return this.postPrivate('v2/private/stop-order/cancelAll', params);
    }
    replaceConditionalOrder(params) {
        return this.postPrivate('v2/private/stop-order/replace', params);
    }
    queryConditionalOrder(params) {
        return this.getPrivate('v2/private/stop-order', params);
    }
    /**
     * Position
     */
    getPosition(params) {
        return this.getPrivate('v2/private/position/list', params);
    }
    changePositionMargin(params) {
        return this.postPrivate('position/change-position-margin', params);
    }
    setTradingStop(params) {
        return this.postPrivate('v2/private/position/trading-stop', params);
    }
    setUserLeverage(params) {
        return this.postPrivate('v2/private/position/leverage/save', params);
    }
    getTradeRecords(params) {
        return this.getPrivate('v2/private/execution/list', params);
    }
    getClosedPnl(params) {
        return this.getPrivate('v2/private/trade/closed-pnl/list', params);
    }
    setSlTpPositionMode(params) {
        return this.postPrivate('v2/private/tpsl/switch-mode', params);
    }
    setMarginType(params) {
        return this.postPrivate('v2/private/position/switch-isolated', params);
    }
    /**
     * Funding
     */
    getLastFundingRate(params) {
        return this.get('v2/public/funding/prev-funding-rate', params);
    }
    getMyLastFundingFee(params) {
        return this.getPrivate('v2/private/funding/prev-funding', params);
    }
    getPredictedFunding(params) {
        return this.getPrivate('v2/private/funding/predicted-funding', params);
    }
    /**
     * LCP Info
     */
    getLcpInfo(params) {
        return this.getPrivate('v2/private/account/lcp', params);
    }
}
exports.InverseClient = InverseClient;
//# sourceMappingURL=inverse-client.js.map