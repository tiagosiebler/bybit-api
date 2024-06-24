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
exports.LinearClient = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const requestUtils_1 = require("./util/requestUtils");
const BaseRestClient_1 = __importDefault(require("./util/BaseRestClient"));
/**
 * REST API client for linear/USD perpetual futures APIs (v2)
 *
 * @deprecated WARNING: V1/V2 private endpoints (Rest API & Websocket Stream) for mainnet
 * will be switched off gradually from 30 Oct 2023 UTC, so they are not promised a stability.
 * Please note that you are at your own risk of using old endpoints going forward, and please move to V5 ASAP.
 */
class LinearClient extends BaseRestClient_1.default {
    getClientType() {
        return requestUtils_1.REST_CLIENT_TYPE_ENUM.linear;
    }
    fetchServerTime() {
        return __awaiter(this, void 0, void 0, function* () {
            const timeRes = yield this.getServerTime();
            return Number(timeRes.time_now);
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
        return this.get('public/linear/kline', params);
    }
    /**
     * Get latest information for symbol
     */
    getTickers(params) {
        return this.get('v2/public/tickers', params);
    }
    getTrades(params) {
        return this.get('public/linear/recent-trading-records', params);
    }
    getSymbols() {
        return this.get('v2/public/symbols');
    }
    getLastFundingRate(params) {
        return this.get('public/linear/funding/prev-funding-rate', params);
    }
    getMarkPriceKline(params) {
        return this.get('public/linear/mark-price-kline', params);
    }
    getIndexPriceKline(params) {
        return this.get('public/linear/index-price-kline', params);
    }
    getPremiumIndexKline(params) {
        return this.get('public/linear/premium-index-kline', params);
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
    placeActiveOrder(params) {
        return this.postPrivate('private/linear/order/create', params);
    }
    getActiveOrderList(params) {
        return this.getPrivate('private/linear/order/list', params);
    }
    cancelActiveOrder(params) {
        return this.postPrivate('private/linear/order/cancel', params);
    }
    cancelAllActiveOrders(params) {
        return this.postPrivate('private/linear/order/cancel-all', params);
    }
    replaceActiveOrder(params) {
        return this.postPrivate('private/linear/order/replace', params);
    }
    queryActiveOrder(params) {
        return this.getPrivate('private/linear/order/search', params);
    }
    /**
     * Conditional orders
     */
    placeConditionalOrder(params) {
        return this.postPrivate('private/linear/stop-order/create', params);
    }
    getConditionalOrder(params) {
        return this.getPrivate('private/linear/stop-order/list', params);
    }
    cancelConditionalOrder(params) {
        return this.postPrivate('private/linear/stop-order/cancel', params);
    }
    cancelAllConditionalOrders(params) {
        return this.postPrivate('private/linear/stop-order/cancel-all', params);
    }
    replaceConditionalOrder(params) {
        return this.postPrivate('private/linear/stop-order/replace', params);
    }
    queryConditionalOrder(params) {
        return this.getPrivate('private/linear/stop-order/search', params);
    }
    getPosition(params) {
        return this.getPrivate('private/linear/position/list', params);
    }
    setAutoAddMargin(params) {
        return this.postPrivate('private/linear/position/set-auto-add-margin', params);
    }
    setMarginSwitch(params) {
        return this.postPrivate('private/linear/position/switch-isolated', params);
    }
    /**
     * Switch between one-way vs hedge mode. Use `linearPositionModeEnum` for the mode parameter.
     */
    setPositionMode(params) {
        return this.postPrivate('private/linear/position/switch-mode', params);
    }
    /**
     * Switch TP/SL mode between full or partial. When set to Partial, TP/SL orders may have a quantity less than the position size.
     * This is set with the setTradingStop() method. Use `positionTpSlModeEnum` for the tp_sl_mode parameter.
     */
    setPositionTpSlMode(params) {
        return this.postPrivate('private/linear/tpsl/switch-mode', params);
    }
    setAddReduceMargin(params) {
        return this.postPrivate('private/linear/position/add-margin', params);
    }
    setUserLeverage(params) {
        return this.postPrivate('private/linear/position/set-leverage', params);
    }
    setTradingStop(params) {
        return this.postPrivate('private/linear/position/trading-stop', params);
    }
    getTradeRecords(params) {
        return this.getPrivate('private/linear/trade/execution/list', params);
    }
    getHistoryTradeRecords(params) {
        return this.getPrivate('/private/linear/trade/execution/history-list', params);
    }
    getClosedPnl(params) {
        return this.getPrivate('private/linear/trade/closed-pnl/list', params);
    }
    /**
     * Risk Limit
     */
    getRiskLimitList(params) {
        return this.getPrivate('public/linear/risk-limit', params);
    }
    setRiskLimit(params) {
        return this.postPrivate('private/linear/position/set-risk', params);
    }
    /**
     * Funding
     */
    getPredictedFundingFee(params) {
        return this.getPrivate('private/linear/funding/predicted-funding', params);
    }
    getLastFundingFee(params) {
        return this.getPrivate('private/linear/funding/prev-funding', params);
    }
}
exports.LinearClient = LinearClient;
//# sourceMappingURL=linear-client.js.map