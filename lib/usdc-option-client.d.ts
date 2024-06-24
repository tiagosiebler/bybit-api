import { APIResponseV3, APIResponseWithTime, USDCOptionsActiveOrdersRealtimeRequest, USDCOptionsActiveOrdersRequest, USDCOptionsCancelAllOrdersRequest, USDCOptionsCancelOrderRequest, USDCOptionsContractInfoRequest, USDCOptionsDeliveryHistoryRequest, USDCOptionsDeliveryPriceRequest, USDCOptionsHistoricOrdersRequest, USDCOptionsHistoricalVolatilityRequest, USDCOptionsModifyMMPRequest, USDCOptionsModifyOrderRequest, USDCOptionsOrderExecutionRequest, USDCOptionsOrderRequest, USDCOptionsPositionsInfoExpiryRequest, USDCOptionsRecentTradesRequest, USDCPositionsRequest, USDCTransactionLogRequest } from './types';
import BaseRestClient from './util/BaseRestClient';
/**
 * REST API client for USDC Option APIs
 *
 * @deprecated WARNING: V1/V2 private endpoints (Rest API & Websocket Stream) for mainnet
 * will be switched off gradually from 30 Oct 2023 UTC, so they are not promised a stability.
 * Please note that you are at your own risk of using old endpoints going forward, and please move to V5 ASAP.
 */
export declare class USDCOptionClient extends BaseRestClient {
    getClientType(): "v3";
    fetchServerTime(): Promise<number>;
    /**
     *
     * Market Data Endpoints
     *
     */
    /** Query order book info. Each side has a depth of 25 orders. */
    getOrderBook(symbol: string): Promise<APIResponseV3<any>>;
    /** Fetch trading rules (such as min/max qty). Query for all if blank. */
    getContractInfo(params?: USDCOptionsContractInfoRequest): Promise<APIResponseV3<any>>;
    /** Get a symbol price/statistics ticker */
    getSymbolTicker(symbol: string): Promise<APIResponseV3<any>>;
    /** Get delivery information */
    getDeliveryPrice(params?: USDCOptionsDeliveryPriceRequest): Promise<APIResponseV3<any>>;
    /** Returned records are Taker Buy in default. */
    getLast500Trades(params: USDCOptionsRecentTradesRequest): Promise<APIResponseV3<any>>;
    /**
     * The data is in hourly.
     * If time field is not passed, it returns the recent 1 hour data by default.
     * It could be any timeframe by inputting startTime & endTime, but it must satisfy [endTime - startTime] <= 30 days.
     * It returns all data in 2 years when startTime & endTime are not passed.
     * Both startTime & endTime entered together or both are left blank
     */
    getHistoricalVolatility(params?: USDCOptionsHistoricalVolatilityRequest): Promise<APIResponseV3<any>>;
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
    submitOrder(params: USDCOptionsOrderRequest): Promise<APIResponseV3<any>>;
    /**
     * Each request supports a max. of four orders. The reduceOnly parameter should be separate and unique for each order in the request.
     */
    batchSubmitOrders(orderRequest: USDCOptionsOrderRequest[]): Promise<APIResponseV3<any>>;
    /** For Options, at least one of the three parameters — price, quantity or implied volatility — must be input. */
    modifyOrder(params: USDCOptionsModifyOrderRequest): Promise<APIResponseV3<any>>;
    /** Each request supports a max. of four orders. The reduceOnly parameter should be separate and unique for each order in the request. */
    batchModifyOrders(replaceOrderRequest: USDCOptionsModifyOrderRequest[]): Promise<APIResponseV3<any>>;
    /** Cancel order */
    cancelOrder(params: USDCOptionsCancelOrderRequest): Promise<APIResponseV3<any>>;
    /** Batch cancel orders */
    batchCancelOrders(cancelRequest: USDCOptionsCancelOrderRequest[]): Promise<APIResponseV3<any>>;
    /** This is used to cancel all active orders. The real-time response indicates whether the request is successful, depending on retCode. */
    cancelActiveOrders(params?: USDCOptionsCancelAllOrdersRequest): Promise<APIResponseV3<any>>;
    /** Query Unfilled/Partially Filled Orders(real-time), up to last 7 days of partially filled/unfilled orders */
    getActiveRealtimeOrders(params?: USDCOptionsActiveOrdersRealtimeRequest): Promise<APIResponseV3<any>>;
    /** Query Unfilled/Partially Filled Orders */
    getActiveOrders(params: USDCOptionsActiveOrdersRequest): Promise<APIResponseV3<any>>;
    /** Query order history. The endpoint only supports up to 30 days of queried records */
    getHistoricOrders(params: USDCOptionsHistoricOrdersRequest): Promise<APIResponseV3<any>>;
    /**
     * Query trade history.
     * The endpoint only supports up to 30 days of queried records.
     * An error will be returned if startTime is more than 30 days.
     */
    getOrderExecutionHistory(params: USDCOptionsOrderExecutionRequest): Promise<APIResponseV3<any>>;
    /** -> Account API */
    /** The endpoint only supports up to 30 days of queried records. An error will be returned if startTime is more than 30 days. */
    getTransactionLog(params: USDCTransactionLogRequest): Promise<APIResponseV3<any>>;
    /** Wallet info for USDC account. */
    getBalances(): Promise<APIResponseV3<any>>;
    /** Asset Info */
    getAssetInfo(baseCoin?: string): Promise<APIResponseV3<any>>;
    /**
     * If USDC derivatives account balance is greater than X, you can open PORTFOLIO_MARGIN,
     * and if it is less than Y, it will automatically close PORTFOLIO_MARGIN and change back to REGULAR_MARGIN.
     * X and Y will be adjusted according to operational requirements.
     * Rest API returns the result of checking prerequisites. You could get the real status of margin mode change by subscribing margin mode.
     */
    setMarginMode(newMarginMode: 'REGULAR_MARGIN' | 'PORTFOLIO_MARGIN'): Promise<APIResponseV3<any>>;
    /** Query margin mode for USDC account. */
    getMarginMode(): Promise<APIResponseV3<any>>;
    /** -> Positions API */
    /** Query my positions */
    getPositions(params: USDCPositionsRequest): Promise<APIResponseV3<any>>;
    /** Query Delivery History */
    getDeliveryHistory(params: USDCOptionsDeliveryHistoryRequest): Promise<APIResponseV3<any>>;
    /** Query Positions Info Upon Expiry */
    getPositionsInfoUponExpiry(params?: USDCOptionsPositionsInfoExpiryRequest): Promise<APIResponseV3<any>>;
    /** -> Market Maker Protection */
    /** modifyMMP */
    modifyMMP(params: USDCOptionsModifyMMPRequest): Promise<APIResponseV3<any>>;
    /** resetMMP */
    resetMMP(currency: string): Promise<APIResponseV3<any>>;
    /** queryMMPState */
    queryMMPState(baseCoin: string): Promise<APIResponseV3<any>>;
    /**
     *
     * API Data Endpoints
     *
     */
    getServerTime(): Promise<APIResponseWithTime>;
}
