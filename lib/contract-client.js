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
exports.ContractClient = void 0;
const util_1 = require("./util");
const BaseRestClient_1 = __importDefault(require("./util/BaseRestClient"));
/**
 * REST API client for Derivatives V3 Contract APIs
 */
class ContractClient extends BaseRestClient_1.default {
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
     * Market Data Endpoints : these seem exactly the same as the unified margin market data endpoints
     *
     */
    /** Query order book info. Each side has a depth of 25 orders. */
    getOrderBook(symbol, category, limit) {
        return this.get('/derivatives/v3/public/order-book/L2', {
            category,
            symbol,
            limit,
        });
    }
    /** Get candles/klines */
    getCandles(params) {
        return this.get('/derivatives/v3/public/kline', params);
    }
    /** Get a symbol price/statistics ticker */
    getSymbolTicker(category, symbol) {
        return this.get('/derivatives/v3/public/tickers', { category, symbol });
    }
    /** Get trading rules per symbol/contract, incl price/amount/value/leverage filters */
    getInstrumentInfo(params) {
        return this.get('/derivatives/v3/public/instruments-info', params);
    }
    /** Query mark price kline (like getCandles() but for mark price). */
    getMarkPriceCandles(params) {
        return this.get('/derivatives/v3/public/mark-price-kline', params);
    }
    /** Query Index Price Kline */
    getIndexPriceCandles(params) {
        return this.get('/derivatives/v3/public/index-price-kline', params);
    }
    /**
     * The funding rate is generated every 8 hours at 00:00 UTC, 08:00 UTC and 16:00 UTC.
     * For example, if a request is sent at 12:00 UTC, the funding rate generated earlier that day at 08:00 UTC will be sent.
     */
    getFundingRateHistory(params) {
        return this.get('/derivatives/v3/public/funding/history-funding-rate', params);
    }
    /** Get Risk Limit */
    getRiskLimit(category, symbol) {
        return this.get('/derivatives/v3/public/risk-limit/list', {
            category,
            symbol,
        });
    }
    /** Get option delivery price */
    getOptionDeliveryPrice(params) {
        return this.get('/derivatives/v3/public/delivery-price', params);
    }
    /** Get public trading history */
    getTrades(params) {
        return this.get('/derivatives/v3/public/recent-trade', params);
    }
    /**
     * Gets the total amount of unsettled contracts.
     * In other words, the total number of contracts held in open positions.
     */
    getOpenInterest(params) {
        return this.get('/derivatives/v3/public/open-interest', params);
    }
    /**
     *
     * Contract Account Endpoints
     *
     */
    /** -> Order API */
    /** Place an order */
    submitOrder(params) {
        return this.postPrivate('/contract/v3/private/order/create', params);
    }
    /**
     * Query order history.
     *
     * As order creation/cancellation is asynchronous, the data returned from the interface may be delayed.
     * To access order information in real-time, call getActiveOrders().
     */
    getHistoricOrders(params) {
        return this.getPrivate('/contract/v3/private/order/list', params);
    }
    /** Cancel order */
    cancelOrder(params) {
        return this.postPrivate('/contract/v3/private/order/cancel', params);
    }
    /** Cancel all orders */
    cancelAllOrders(symbol) {
        return this.postPrivate('/contract/v3/private/order/cancel-all', {
            symbol,
        });
    }
    /**
     * Replace order
     *
     * Active order parameters (such as quantity, price) and stop order parameters
     * cannot be modified in one request at the same time.
     *
     * Please request modification separately.
     */
    modifyOrder(params) {
        return this.postPrivate('/contract/v3/private/order/replace', params);
    }
    /** Query Open Order(s) (real-time) */
    getActiveOrders(params) {
        return this.getPrivate('/contract/v3/private/order/unfilled-orders', params);
    }
    /** -> Positions API */
    /**
     * Query my positions real-time. Accessing personal list of positions.
     * Either symbol or settleCoin is required.
     * Users can access their position holding information through this interface, such as the number of position holdings and wallet balance.
     */
    getPositions(params) {
        return this.getPrivate('/contract/v3/private/position/list', params);
    }
    /** Set auto add margin, or Auto-Margin Replenishment. */
    setAutoAddMargin(params) {
        return this.postPrivate('/contract/v3/private/position/set-auto-add-margin', params);
    }
    /** Switch cross margin mode/isolated margin mode */
    setMarginSwitch(params) {
        return this.postPrivate('/contract/v3/private/position/switch-isolated', params);
    }
    /** Supports switching between One-Way Mode and Hedge Mode at the coin level. */
    setPositionMode(params) {
        return this.postPrivate('/contract/v3/private/position/switch-mode', params);
    }
    /**
     * Switch mode between Full or Partial
     */
    setTPSLMode(symbol, tpSlMode) {
        return this.postPrivate('/contract/v3/private/position/switch-tpsl-mode', {
            symbol,
            tpSlMode,
        });
    }
    /** Leverage setting. */
    setLeverage(symbol, buyLeverage, sellLeverage) {
        return this.postPrivate('/contract/v3/private/position/set-leverage', {
            symbol,
            buyLeverage,
            sellLeverage,
        });
    }
    /**
     * Set take profit, stop loss, and trailing stop for your open position.
     * If using partial mode, TP/SL/TS orders will not close your entire position.
     */
    setTPSL(params) {
        return this.postPrivate('/contract/v3/private/position/trading-stop', params);
    }
    /** Set risk limit */
    setRiskLimit(symbol, riskId, 
    /** 0-one-way, 1-buy side, 2-sell side */
    positionIdx) {
        return this.postPrivate('/contract/v3/private/position/set-risk-limit', {
            symbol,
            riskId,
            positionIdx,
        });
    }
    /**
     * Get user's trading records.
     * The results are ordered in descending order (the first item is the latest). Returns records up to 2 years old.
     */
    getUserExecutionHistory(params) {
        return this.getPrivate('/contract/v3/private/execution/list', params);
    }
    /**
     * Get user's closed profit and loss records.
     * The results are ordered in descending order (the first item is the latest).
     */
    getClosedProfitAndLoss(params) {
        return this.getPrivate('/contract/v3/private/position/closed-pnl', params);
    }
    /** Get the information of open interest limit. */
    getOpenInterestLimitInfo(symbol) {
        return this.getPrivate('/contract/v3/private/position/limit-info', {
            symbol,
        });
    }
    /** -> Account API */
    /** Query wallet balance */
    getBalances(coin) {
        return this.getPrivate('/contract/v3/private/account/wallet/balance', {
            coin,
        });
    }
    /** Get user trading fee rate */
    getTradingFeeRate(symbol) {
        return this.getPrivate('/contract/v3/private/account/fee-rate', {
            symbol,
        });
    }
    /**
     * Get wallet fund records.
     * This endpoint also shows exchanges from the Asset Exchange,
     * where the types for the exchange are ExchangeOrderWithdraw and ExchangeOrderDeposit.
     *
     * This endpoint returns incomplete information for transfers involving the derivatives wallet.
     * Use the account asset API for creating and querying internal transfers.
     */
    getWalletFundRecords(params) {
        return this.getPrivate('/contract/v3/private/account/wallet/fund-records', params);
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
exports.ContractClient = ContractClient;
//# sourceMappingURL=contract-client.js.map