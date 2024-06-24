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
exports.CopyTradingClient = void 0;
const util_1 = require("./util");
const BaseRestClient_1 = __importDefault(require("./util/BaseRestClient"));
/**
 * REST API client for USDC Perpetual APIs
 */
class CopyTradingClient extends BaseRestClient_1.default {
    getClientType() {
        // Follows the same authentication mechanism as USDC APIs
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
    getSymbols() {
        return this.get('/contract/v3/public/copytrading/symbol/list');
    }
    /**
     *
     * Account Data Endpoints
     *
     */
    /** -> Order API */
    /** Create order */
    submitOrder(params) {
        return this.postPrivate('/contract/v3/private/copytrading/order/create', params);
    }
    /** Set Trading Stop */
    setTradingStop(params) {
        return this.postPrivate('/contract/v3/private/copytrading/order/trading-stop', params);
    }
    /** Query Order List */
    getActiveOrders(params) {
        return this.getPrivate('/contract/v3/private/copytrading/order/list', params);
    }
    /** Cancel order */
    cancelOrder(params) {
        return this.postPrivate('/contract/v3/private/copytrading/order/cancel', params);
    }
    /** Close Order.  This endpoint's rate_limit will decrease by 10 per request; ie, one request to this endpoint consumes 10 from the limit allowed per minute. */
    closeOrder(params) {
        return this.postPrivate('/contract/v3/private/copytrading/order/close', params);
    }
    /** -> Positions API */
    /** Position List */
    getPositions(symbol) {
        return this.getPrivate('/contract/v3/private/copytrading/position/list', {
            symbol,
        });
    }
    /** Close Position */
    closePosition(symbol, positionIdx) {
        return this.postPrivate('/contract/v3/private/copytrading/position/close', {
            symbol,
            positionIdx,
        });
    }
    /** Only integers can be set to set the leverage */
    setLeverage(symbol, buyLeverage, sellLeverage) {
        return this.postPrivate('/contract/v3/private/copytrading/position/set-leverage', { symbol, buyLeverage, sellLeverage });
    }
    /**
     *
     * Wallet Data Endpoints
     *
     */
    /** Get Wallet Balance */
    getBalances() {
        return this.getPrivate('/contract/v3/private/copytrading/wallet/balance');
    }
    /** Transfer */
    transfer(params) {
        return this.postPrivate('/contract/v3/private/copytrading/wallet/transfer', params);
    }
    /**
     *
     * API Data Endpoints
     *
     */
    getServerTime() {
        return this.get('/v2/public/time');
    }
    getAnnouncements() {
        return this.get('/v2/public/announcement');
    }
}
exports.CopyTradingClient = CopyTradingClient;
//# sourceMappingURL=copy-trading-client.js.map