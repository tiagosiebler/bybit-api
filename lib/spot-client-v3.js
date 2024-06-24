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
exports.SpotClientV3 = void 0;
const util_1 = require("./util");
const BaseRestClient_1 = __importDefault(require("./util/BaseRestClient"));
/**
 * REST API client for newer Spot V3 APIs.
 */
class SpotClientV3 extends BaseRestClient_1.default {
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
    /** Get all symbols */
    getSymbols() {
        return this.get('/spot/v3/public/symbols');
    }
    /** Get orderbook for symbol */
    getOrderBook(symbol, limit) {
        return this.get('/spot/v3/public/quote/depth', { symbol, limit });
    }
    /** Get merged orderbook for symbol */
    getMergedOrderBook(symbol, scale, limit) {
        return this.get('/spot/v3/public/quote/depth/merged', {
            symbol,
            scale,
            limit,
        });
    }
    /** Get public trading records (raw trades) */
    getTrades(symbol, limit) {
        return this.get('/spot/v3/public/quote/trades', { symbol, limit });
    }
    /** Get candles/klines */
    getCandles(symbol, interval, limit, startTime, endTime) {
        return this.get('/spot/v3/public/quote/kline', {
            symbol,
            interval,
            limit,
            startTime,
            endTime,
        });
    }
    /** Get latest information for symbol (24hr ticker) */
    get24hrTicker(symbol) {
        return this.get('/spot/v3/public/quote/ticker/24hr', { symbol });
    }
    /** Get last traded price */
    getLastTradedPrice(symbol) {
        return this.get('/spot/v3/public/quote/ticker/price', { symbol });
    }
    /** Get best bid/ask price */
    getBestBidAskPrice(symbol) {
        return this.get('/spot/v3/public/quote/ticker/bookTicker', { symbol });
    }
    /**
     *
     * Account Data Endpoints
     *
     */
    /** -> Order API */
    /** Create order */
    submitOrder(params) {
        return this.postPrivate('/spot/v3/private/order', params);
    }
    /** Get active order state */
    getOrder(params) {
        return this.getPrivate('/spot/v3/private/order', params);
    }
    /** Cancel order */
    cancelOrder(params) {
        return this.postPrivate('/spot/v3/private/cancel-order', params);
    }
    /** Batch cancel orders */
    cancelOrderBatch(params) {
        const orderTypes = params.orderTypes
            ? params.orderTypes.join(',')
            : undefined;
        return this.postPrivate('/spot/v3/private/cancel-orders', Object.assign(Object.assign({}, params), { orderTypes }));
    }
    /** Batch cancel up to 100 orders by ID */
    cancelOrderBatchIDs(orderIds) {
        const orderIdsCsv = orderIds.join(',');
        return this.postPrivate('/spot/v3/private/cancel-orders-by-ids', {
            orderIds: orderIdsCsv,
        });
    }
    /** Get open orders */
    getOpenOrders(symbol, orderId, limit, orderCategory) {
        return this.getPrivate('/spot/v3/private/open-orders', {
            symbol,
            orderId,
            limit,
            orderCategory,
        });
    }
    /** Get order history */
    getPastOrders(symbol, orderId, limit, orderCategory) {
        return this.getPrivate('/spot/v3/private/history-orders', {
            symbol,
            orderId,
            limit,
            orderCategory,
        });
    }
    /**
     * Get your trade history.
     * If startTime is not specified, you can only query for records in the last 7 days.
     * If you want to query for records older than 7 days, startTime is required.
     */
    getMyTrades(params) {
        return this.getPrivate('/spot/v3/private/my-trades', params);
    }
    /**
     *
     * Wallet Data Endpoints
     *
     */
    /** Get Wallet Balance */
    getBalances() {
        return this.getPrivate('/spot/v3/private/account');
    }
    /**
     *
     * API Data Endpoints
     *
     */
    getServerTime() {
        return this.get('/v2/public/time');
    }
    /**
     *
     * Leveraged Token Endpoints
     *
     */
    /** Get all asset infos */
    getLeveragedTokenAssetInfos(ltCode) {
        return this.get('/spot/v3/public/infos', { ltCode });
    }
    /** Get leveraged token market info */
    getLeveragedTokenMarketInfo(ltCode) {
        return this.getPrivate('/spot/v3/private/reference', { ltCode });
    }
    /** Purchase leveraged token */
    purchaseLeveragedToken(ltCode, ltAmount, serialNo) {
        return this.postPrivate('/spot/v3/private/purchase', {
            ltCode,
            ltAmount,
            serialNo,
        });
    }
    /** Redeem leveraged token */
    redeemLeveragedToken(ltCode, ltAmount, serialNo) {
        return this.postPrivate('/spot/v3/private/redeem', {
            ltCode,
            ltAmount,
            serialNo,
        });
    }
    /** Get leveraged token purchase/redemption history */
    getLeveragedTokenPRHistory(params) {
        return this.getPrivate('/spot/v3/private/record', params);
    }
    /**
     *
     * Cross Margin Trading Endpoints
     *
     */
    /** Borrow margin loan */
    borrowCrossMarginLoan(coin, qty) {
        return this.postPrivate('/spot/v3/private/cross-margin-loan', {
            coin,
            qty,
        });
    }
    /** Repay margin loan */
    repayCrossMarginLoan(coin, qty) {
        return this.postPrivate('/spot/v3/private/cross-margin-repay', {
            coin,
            qty,
        });
    }
    /** Query borrowing info */
    getCrossMarginBorrowingInfo(params) {
        return this.getPrivate('/spot/v3/private/cross-margin-orders', params);
    }
    /** Query account info */
    getCrossMarginAccountInfo() {
        return this.getPrivate('/spot/v3/private/cross-margin-account');
    }
    /** Query interest & quota */
    getCrossMarginInterestQuota(coin) {
        return this.getPrivate('/spot/v3/private/cross-margin-loan-info', { coin });
    }
    /** Query repayment history */
    getCrossMarginRepaymentHistory(params) {
        return this.getPrivate('/spot/v3/private/cross-margin-repay-history', params);
    }
}
exports.SpotClientV3 = SpotClientV3;
//# sourceMappingURL=spot-client-v3.js.map