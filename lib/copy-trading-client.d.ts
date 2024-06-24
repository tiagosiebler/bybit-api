import { APIResponseV3, APIResponseWithTime, CopyTradingCancelOrderRequest, CopyTradingCloseOrderRequest, CopyTradingOrderListRequest, CopyTradingOrderRequest, CopyTradingTradingStopRequest, CopyTradingTransferRequest } from './types';
import BaseRestClient from './util/BaseRestClient';
/**
 * REST API client for USDC Perpetual APIs
 */
export declare class CopyTradingClient extends BaseRestClient {
    getClientType(): "v3";
    fetchServerTime(): Promise<number>;
    /**
     *
     * Market Data Endpoints
     *
     */
    getSymbols(): Promise<APIResponseV3<any>>;
    /**
     *
     * Account Data Endpoints
     *
     */
    /** -> Order API */
    /** Create order */
    submitOrder(params: CopyTradingOrderRequest): Promise<APIResponseV3<any>>;
    /** Set Trading Stop */
    setTradingStop(params: CopyTradingTradingStopRequest): Promise<APIResponseV3<any>>;
    /** Query Order List */
    getActiveOrders(params?: CopyTradingOrderListRequest): Promise<APIResponseV3<any>>;
    /** Cancel order */
    cancelOrder(params: CopyTradingCancelOrderRequest): Promise<APIResponseV3<any>>;
    /** Close Order.  This endpoint's rate_limit will decrease by 10 per request; ie, one request to this endpoint consumes 10 from the limit allowed per minute. */
    closeOrder(params: CopyTradingCloseOrderRequest): Promise<APIResponseV3<any>>;
    /** -> Positions API */
    /** Position List */
    getPositions(symbol?: string): Promise<APIResponseV3<any>>;
    /** Close Position */
    closePosition(symbol: string, positionIdx: string): Promise<APIResponseV3<any>>;
    /** Only integers can be set to set the leverage */
    setLeverage(symbol: string, buyLeverage: string, sellLeverage: string): Promise<APIResponseV3<any>>;
    /**
     *
     * Wallet Data Endpoints
     *
     */
    /** Get Wallet Balance */
    getBalances(): Promise<APIResponseV3<any>>;
    /** Transfer */
    transfer(params: CopyTradingTransferRequest): Promise<APIResponseV3<any>>;
    /**
     *
     * API Data Endpoints
     *
     */
    getServerTime(): Promise<APIResponseWithTime>;
    getAnnouncements(): Promise<APIResponseWithTime<any[]>>;
}
