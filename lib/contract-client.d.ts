import { APIResponseV3, APIResponseWithTime, ContractActiveOrdersRequest, ContractCancelOrderRequest, ContractClosedPNLRequest, ContractHistoricOrder, ContractHistoricOrdersRequest, ContractListResult, ContractModifyOrderRequest, ContractOrderRequest, ContractPositionsRequest, ContractSetAutoAddMarginRequest, ContractSetMarginSwitchRequest, ContractSetPositionModeRequest, ContractSetTPSLRequest, ContractSymbolTicker, ContractUserExecutionHistoryRequest, ContractWalletFundRecordRequest, PaginatedResult, UMCandlesRequest, UMCategory, UMFundingRateHistoryRequest, UMInstrumentInfoRequest, UMOpenInterestRequest, UMOptionDeliveryPriceRequest, UMPublicTradesRequest } from './types';
import BaseRestClient from './util/BaseRestClient';
/**
 * REST API client for Derivatives V3 Contract APIs
 */
export declare class ContractClient extends BaseRestClient {
    getClientType(): "v3";
    fetchServerTime(): Promise<number>;
    /**
     *
     * Market Data Endpoints : these seem exactly the same as the unified margin market data endpoints
     *
     */
    /** Query order book info. Each side has a depth of 25 orders. */
    getOrderBook(symbol: string, category?: string, limit?: number): Promise<APIResponseV3<any>>;
    /** Get candles/klines */
    getCandles(params: UMCandlesRequest): Promise<APIResponseV3<any>>;
    /** Get a symbol price/statistics ticker */
    getSymbolTicker(category: UMCategory | '', symbol?: string): Promise<APIResponseV3<ContractListResult<ContractSymbolTicker>>>;
    /** Get trading rules per symbol/contract, incl price/amount/value/leverage filters */
    getInstrumentInfo(params: UMInstrumentInfoRequest): Promise<APIResponseV3<any>>;
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
    /** Get public trading history */
    getTrades(params: UMPublicTradesRequest): Promise<APIResponseV3<any>>;
    /**
     * Gets the total amount of unsettled contracts.
     * In other words, the total number of contracts held in open positions.
     */
    getOpenInterest(params: UMOpenInterestRequest): Promise<APIResponseV3<any>>;
    /**
     *
     * Contract Account Endpoints
     *
     */
    /** -> Order API */
    /** Place an order */
    submitOrder(params: ContractOrderRequest): Promise<APIResponseV3<any>>;
    /**
     * Query order history.
     *
     * As order creation/cancellation is asynchronous, the data returned from the interface may be delayed.
     * To access order information in real-time, call getActiveOrders().
     */
    getHistoricOrders(params: ContractHistoricOrdersRequest): Promise<APIResponseV3<PaginatedResult<ContractHistoricOrder>>>;
    /** Cancel order */
    cancelOrder(params: ContractCancelOrderRequest): Promise<APIResponseV3<any>>;
    /** Cancel all orders */
    cancelAllOrders(symbol: string): Promise<APIResponseV3<any>>;
    /**
     * Replace order
     *
     * Active order parameters (such as quantity, price) and stop order parameters
     * cannot be modified in one request at the same time.
     *
     * Please request modification separately.
     */
    modifyOrder(params: ContractModifyOrderRequest): Promise<APIResponseV3<any>>;
    /** Query Open Order(s) (real-time) */
    getActiveOrders(params: ContractActiveOrdersRequest): Promise<APIResponseV3<any>>;
    /** -> Positions API */
    /**
     * Query my positions real-time. Accessing personal list of positions.
     * Either symbol or settleCoin is required.
     * Users can access their position holding information through this interface, such as the number of position holdings and wallet balance.
     */
    getPositions(params?: ContractPositionsRequest): Promise<APIResponseV3<any>>;
    /** Set auto add margin, or Auto-Margin Replenishment. */
    setAutoAddMargin(params: ContractSetAutoAddMarginRequest): Promise<APIResponseV3<any>>;
    /** Switch cross margin mode/isolated margin mode */
    setMarginSwitch(params: ContractSetMarginSwitchRequest): Promise<APIResponseV3<any>>;
    /** Supports switching between One-Way Mode and Hedge Mode at the coin level. */
    setPositionMode(params: ContractSetPositionModeRequest): Promise<APIResponseV3<any>>;
    /**
     * Switch mode between Full or Partial
     */
    setTPSLMode(symbol: string, tpSlMode: 'Full' | 'Partial'): Promise<APIResponseV3<any>>;
    /** Leverage setting. */
    setLeverage(symbol: string, buyLeverage: string, sellLeverage: string): Promise<APIResponseV3<any>>;
    /**
     * Set take profit, stop loss, and trailing stop for your open position.
     * If using partial mode, TP/SL/TS orders will not close your entire position.
     */
    setTPSL(params: ContractSetTPSLRequest): Promise<APIResponseV3<any>>;
    /** Set risk limit */
    setRiskLimit(symbol: string, riskId: number, 
    /** 0-one-way, 1-buy side, 2-sell side */
    positionIdx: 0 | 1 | 2): Promise<APIResponseV3<any>>;
    /**
     * Get user's trading records.
     * The results are ordered in descending order (the first item is the latest). Returns records up to 2 years old.
     */
    getUserExecutionHistory(params: ContractUserExecutionHistoryRequest): Promise<APIResponseV3<any>>;
    /**
     * Get user's closed profit and loss records.
     * The results are ordered in descending order (the first item is the latest).
     */
    getClosedProfitAndLoss(params: ContractClosedPNLRequest): Promise<APIResponseV3<any>>;
    /** Get the information of open interest limit. */
    getOpenInterestLimitInfo(symbol: string): Promise<APIResponseV3<any>>;
    /** -> Account API */
    /** Query wallet balance */
    getBalances(coin?: string): Promise<APIResponseV3<any>>;
    /** Get user trading fee rate */
    getTradingFeeRate(symbol?: string): Promise<APIResponseV3<any>>;
    /**
     * Get wallet fund records.
     * This endpoint also shows exchanges from the Asset Exchange,
     * where the types for the exchange are ExchangeOrderWithdraw and ExchangeOrderDeposit.
     *
     * This endpoint returns incomplete information for transfers involving the derivatives wallet.
     * Use the account asset API for creating and querying internal transfers.
     */
    getWalletFundRecords(params?: ContractWalletFundRecordRequest): Promise<APIResponseV3<any>>;
    /**
     *
     * API Data Endpoints
     *
     */
    getServerTime(): Promise<APIResponseWithTime>;
}
