import { APIResponseV3, APIResponseWithTime, InternalTransferRequest, UM7DayTradingHistoryRequest, UMActiveOrdersRequest, UMBatchOrder, UMBatchOrderCancel, UMBatchOrderReplace, UMBorrowHistoryRequest, UMCancelAllOrdersRequest, UMCancelOrderRequest, UMCandlesRequest, UMCategory, UMExchangeCoinsRequest, UMFundingRateHistoryRequest, UMHistoricOrder, UMHistoricOrdersRequest, UMInstrumentInfo, UMInstrumentInfoRequest, UMModifyOrderRequest, UMOpenInterestRequest, UMOptionDeliveryPriceRequest, UMOptionsSettlementHistoryRequest, UMOrderRequest, UMPaginatedResult, UMPerpSettlementHistoryRequest, UMPositionsRequest, UMPublicTradesRequest, UMSetTPSLRequest, UMTransactionLogRequest } from './types';
import BaseRestClient from './util/BaseRestClient';
/**
 * REST API client for Derivatives V3 unified margin APIs
 */
export declare class UnifiedMarginClient extends BaseRestClient {
    getClientType(): "v3";
    fetchServerTime(): Promise<number>;
    /**
     *
     * Market Data Endpoints
     *
     */
    /** Query order book info. Each side has a depth of 25 orders. */
    getOrderBook(symbol: string, category: string, limit?: number): Promise<APIResponseV3<any>>;
    /** Get candles/klines */
    getCandles(params: UMCandlesRequest): Promise<APIResponseV3<any>>;
    /** Get a symbol price/statistics ticker */
    getSymbolTicker(category: UMCategory, symbol?: string): Promise<APIResponseV3<any>>;
    /** Get trading rules per symbol/contract, incl price/amount/value/leverage filters */
    getInstrumentInfo(params: UMInstrumentInfoRequest): Promise<APIResponseV3<UMPaginatedResult<UMInstrumentInfo>>>;
    /** Query mark price kline (like getCandles() but for mark price). */
    getMarkPriceCandles(params: UMCandlesRequest): Promise<APIResponseV3<any>>;
    /** Query Index Price Kline */
    getIndexPriceCandles(params: UMCandlesRequest): Promise<APIResponseV3<any>>;
    /**
     * The funding rate is generated every 8 hours at 00:00 UTC, 08:00 UTC and 16:00 UTC.
     * For example, if a request is sent at 12:00 UTC, the funding rate generated earlier that day at 08:00 UTC will be sent.
     */
    getFundingRateHistory(params: UMFundingRateHistoryRequest): Promise<APIResponseV3<any>>;
    /** Get Risk Limit */
    getRiskLimit(category: UMCategory, symbol: string): Promise<APIResponseV3<any>>;
    /** Get option delivery price */
    getOptionDeliveryPrice(params: UMOptionDeliveryPriceRequest): Promise<APIResponseV3<any>>;
    /** Get recent trades */
    getTrades(params: UMPublicTradesRequest): Promise<APIResponseV3<any>>;
    /**
     * Gets the total amount of unsettled contracts.
     * In other words, the total number of contracts held in open positions.
     */
    getOpenInterest(params: UMOpenInterestRequest): Promise<APIResponseV3<any>>;
    /**
     *
     * Unified Margin Account Endpoints
     *
     */
    /** -> Order API */
    /** Place an order */
    submitOrder(params: UMOrderRequest): Promise<APIResponseV3<any>>;
    /** Active order parameters (such as quantity, price) and stop order parameters cannot be modified in one request at the same time. Please request modification separately. */
    modifyOrder(params: UMModifyOrderRequest): Promise<APIResponseV3<any>>;
    /** Cancel order */
    cancelOrder(params: UMCancelOrderRequest): Promise<APIResponseV3<any>>;
    /** Query Open Orders */
    getActiveOrders(params: UMActiveOrdersRequest): Promise<APIResponseV3<any>>;
    /** Query order history. As order creation/cancellation is asynchronous, the data returned from the interface may be delayed. To access order information in real-time, call getActiveOrders() */
    getHistoricOrders(params: UMHistoricOrdersRequest): Promise<APIResponseV3<UMPaginatedResult<UMHistoricOrder>>>;
    /**
     * This API provides the batch order mode under the unified margin account.
     * Max 10 per request
     */
    batchSubmitOrders(category: UMCategory, orders: UMBatchOrder[]): Promise<APIResponseV3<any>>;
    /**
     * This interface can modify the open order information in batches.
     * Currently, it is not supported to modify the conditional order information.
     * Please note that only unfilled or partial filled orders can be modified.
     * If both futures and options orders are in one request, only the orders matching the category will be operated according to the category type
     */
    batchReplaceOrders(category: UMCategory, orders: UMBatchOrderReplace[]): Promise<APIResponseV3<any>>;
    /**
     * This API provides batch cancellation under the unified margin account.
     * Order cancellation of futures and options cannot be canceled in one request at the same time.
     * If both futures and options orders are in one request, only the orders matching the category will be operated according to the category type.
     */
    batchCancelOrders(category: UMCategory, orders: UMBatchOrderCancel[]): Promise<APIResponseV3<any>>;
    /**
     * This API provides the cancellation of all open orders under the unified margin account.
     * Order cancellation of futures and options cannot be canceled in one request at the same time.
     * If both futures and options orders are in one request, only the orders matching the category will be operated according to the category type.
     */
    cancelAllOrders(params: UMCancelAllOrdersRequest): Promise<APIResponseV3<any>>;
    /** -> Positions API */
    /**
     * Query my positions real-time. Accessing personal list of positions.
     * Users can access their position holding information through this interface, such as the number of position holdings and wallet balance.
     */
    getPositions(params: UMPositionsRequest): Promise<APIResponseV3<any>>;
    /** Leverage setting. */
    setLeverage(category: UMCategory, symbol: string, buyLeverage: number, sellLeverage: number): Promise<APIResponseV3<any>>;
    /**
     * Switching the TP/SL mode to the cross margin mode or selected positions.
     * When you set the TP/SL mode on the selected positions, the quantity of take-profit or stop-loss orders can be smaller than the position size. Please use Trading-Stop endpoint.
     */
    setTPSLMode(category: UMCategory, symbol: string, tpSlMode: 1 | 0): Promise<APIResponseV3<any>>;
    /** Set risk limit */
    setRiskLimit(category: UMCategory, symbol: string, riskId: number, positionIdx: number): Promise<APIResponseV3<any>>;
    /**
     * Set position TP/SL and trailing stop.
     * Pass the following parameters, then the system will create conditional orders.
     * If the position is closed, the system will cancel these orders, and adjust the position size.
     */
    setTPSL(params: UMSetTPSLRequest): Promise<APIResponseV3<any>>;
    /**
     * Access the user's filled history, ranked by time in descending order.
     * There might be multiple filled histories for an order.
     */
    get7DayTradingHistory(params: UM7DayTradingHistoryRequest): Promise<APIResponseV3<any>>;
    /** Query the settlement history, ranked by time in descending order. */
    getOptionsSettlementHistory(params: UMOptionsSettlementHistoryRequest): Promise<APIResponseV3<any>>;
    /** Query session settlement records, only for USDC perpetual */
    getUSDCPerpetualSettlementHistory(params: UMPerpSettlementHistoryRequest): Promise<APIResponseV3<any>>;
    /** -> Account API */
    /** Query wallet balance */
    getBalances(coin?: string): Promise<APIResponseV3<any>>;
    /**
     * Upgrade to unified margin account.
     * WARNING: This is currently not reversable!
     */
    upgradeToUnifiedMargin(): Promise<APIResponseV3<any>>;
    /** Query trading history */
    getTransactionLog(params: UMTransactionLogRequest): Promise<APIResponseV3<any>>;
    /** Fund transfer between accounts (v2) */
    transferFunds(params: InternalTransferRequest): Promise<APIResponseV3<any>>;
    /** Exchange Coins */
    getCoinExchangeHistory(params?: UMExchangeCoinsRequest): Promise<APIResponseV3<any>>;
    /** Get Borrow History */
    getBorrowHistory(params?: UMBorrowHistoryRequest): Promise<APIResponseV3<any>>;
    /** Get Borrow Rate */
    getBorrowRate(currency?: string): Promise<APIResponseV3<any>>;
    /**
     *
     * API Data Endpoints
     *
     */
    getServerTime(): Promise<APIResponseWithTime>;
    getAnnouncements(): Promise<APIResponseV3<any>>;
}
