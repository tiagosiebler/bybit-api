import { APIResponseV3, APIResponseWithTime, KlineInterval, NewSpotOrderV3, SpotBalances, SpotCancelOrderBatchRequest, SpotCrossMarginBorrowingInfoRequest, SpotCrossMarginRepaymentHistoryRequest, SpotLeveragedTokenPRHistoryRequest, SpotMyTradesRequest, SpotOrderQueryById } from './types';
import BaseRestClient from './util/BaseRestClient';
/**
 * REST API client for newer Spot V3 APIs.
 */
export declare class SpotClientV3 extends BaseRestClient {
    getClientType(): "v3";
    fetchServerTime(): Promise<number>;
    /**
     *
     * Market Data Endpoints
     *
     */
    /** Get all symbols */
    getSymbols(): Promise<APIResponseV3<any>>;
    /** Get orderbook for symbol */
    getOrderBook(symbol: string, limit?: number): Promise<APIResponseV3<any>>;
    /** Get merged orderbook for symbol */
    getMergedOrderBook(symbol: string, scale?: number, limit?: number): Promise<APIResponseV3<any>>;
    /** Get public trading records (raw trades) */
    getTrades(symbol: string, limit?: number): Promise<APIResponseV3<any>>;
    /** Get candles/klines */
    getCandles(symbol: string, interval: KlineInterval, limit?: number, startTime?: number, endTime?: number): Promise<APIResponseV3<any>>;
    /** Get latest information for symbol (24hr ticker) */
    get24hrTicker(symbol?: string): Promise<APIResponseV3<any>>;
    /** Get last traded price */
    getLastTradedPrice(symbol?: string): Promise<APIResponseV3<any>>;
    /** Get best bid/ask price */
    getBestBidAskPrice(symbol?: string): Promise<APIResponseV3<any>>;
    /**
     *
     * Account Data Endpoints
     *
     */
    /** -> Order API */
    /** Create order */
    submitOrder(params: NewSpotOrderV3): Promise<APIResponseV3<any>>;
    /** Get active order state */
    getOrder(params: SpotOrderQueryById): Promise<APIResponseV3<any>>;
    /** Cancel order */
    cancelOrder(params: SpotOrderQueryById): Promise<APIResponseV3<any>>;
    /** Batch cancel orders */
    cancelOrderBatch(params: SpotCancelOrderBatchRequest): Promise<APIResponseV3<any>>;
    /** Batch cancel up to 100 orders by ID */
    cancelOrderBatchIDs(orderIds: string[]): Promise<APIResponseV3<any>>;
    /** Get open orders */
    getOpenOrders(symbol?: string, orderId?: string, limit?: number, orderCategory?: 0 | 1): Promise<APIResponseV3<any>>;
    /** Get order history */
    getPastOrders(symbol?: string, orderId?: string, limit?: number, orderCategory?: 0 | 1): Promise<APIResponseV3<any>>;
    /**
     * Get your trade history.
     * If startTime is not specified, you can only query for records in the last 7 days.
     * If you want to query for records older than 7 days, startTime is required.
     */
    getMyTrades(params?: SpotMyTradesRequest): Promise<APIResponseV3<any>>;
    /**
     *
     * Wallet Data Endpoints
     *
     */
    /** Get Wallet Balance */
    getBalances(): Promise<APIResponseV3<SpotBalances>>;
    /**
     *
     * API Data Endpoints
     *
     */
    getServerTime(): Promise<APIResponseWithTime>;
    /**
     *
     * Leveraged Token Endpoints
     *
     */
    /** Get all asset infos */
    getLeveragedTokenAssetInfos(ltCode?: string): Promise<APIResponseV3<any>>;
    /** Get leveraged token market info */
    getLeveragedTokenMarketInfo(ltCode: string): Promise<APIResponseV3<any>>;
    /** Purchase leveraged token */
    purchaseLeveragedToken(ltCode: string, ltAmount: string, serialNo?: string): Promise<APIResponseV3<any>>;
    /** Redeem leveraged token */
    redeemLeveragedToken(ltCode: string, ltAmount: string, serialNo?: string): Promise<APIResponseV3<any>>;
    /** Get leveraged token purchase/redemption history */
    getLeveragedTokenPRHistory(params?: SpotLeveragedTokenPRHistoryRequest): Promise<APIResponseV3<any>>;
    /**
     *
     * Cross Margin Trading Endpoints
     *
     */
    /** Borrow margin loan */
    borrowCrossMarginLoan(coin: string, qty: string): Promise<APIResponseV3<any>>;
    /** Repay margin loan */
    repayCrossMarginLoan(coin: string, qty: string): Promise<APIResponseV3<any>>;
    /** Query borrowing info */
    getCrossMarginBorrowingInfo(params?: SpotCrossMarginBorrowingInfoRequest): Promise<APIResponseV3<any>>;
    /** Query account info */
    getCrossMarginAccountInfo(): Promise<APIResponseV3<any>>;
    /** Query interest & quota */
    getCrossMarginInterestQuota(coin: string): Promise<APIResponseV3<any>>;
    /** Query repayment history */
    getCrossMarginRepaymentHistory(params?: SpotCrossMarginRepaymentHistoryRequest): Promise<APIResponseV3<any>>;
}
