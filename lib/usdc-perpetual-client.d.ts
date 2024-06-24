import { APIResponseV3, APIResponseWithTime, SymbolLimitParam, SymbolPeriodLimitParam, USDCKlineRequest, USDCLast500TradesRequest, USDCOpenInterestRequest, USDCOrderFilter, USDCPerpActiveOrdersRequest, USDCPerpCancelOrderRequest, USDCPerpHistoricOrdersRequest, USDCPerpModifyOrderRequest, USDCPerpOrderRequest, USDCPositionsRequest, USDCSymbolDirectionLimit, USDCSymbolDirectionLimitCursor, USDCTransactionLogRequest } from './types';
import BaseRestClient from './util/BaseRestClient';
/**
 * REST API client for USDC Perpetual APIs
 *
 * @deprecated WARNING: V1/V2 private endpoints (Rest API & Websocket Stream) for mainnet
 * will be switched off gradually from 30 Oct 2023 UTC, so they are not promised a stability.
 * Please note that you are at your own risk of using old endpoints going forward, and please move to V5 ASAP.
 */
export declare class USDCPerpetualClient extends BaseRestClient {
    getClientType(): "v3";
    fetchServerTime(): Promise<number>;
    /**
     *
     * Market Data Endpoints
     *
     */
    getOrderBook(symbol: string): Promise<APIResponseV3<any>>;
    /** Fetch trading rules (such as min/max qty). Query for all if blank. */
    getContractInfo(params?: USDCSymbolDirectionLimit): Promise<APIResponseV3<any>>;
    /** Get a symbol price/statistics ticker */
    getSymbolTicker(symbol: string): Promise<APIResponseV3<any>>;
    getCandles(params: USDCKlineRequest): Promise<APIResponseV3<any>>;
    getMarkPrice(params: USDCKlineRequest): Promise<APIResponseV3<any>>;
    getIndexPrice(params: USDCKlineRequest): Promise<APIResponseV3<any>>;
    getIndexPremium(params: USDCKlineRequest): Promise<APIResponseV3<any>>;
    getOpenInterest(params: USDCOpenInterestRequest): Promise<APIResponseV3<any>>;
    getLargeOrders(params: SymbolLimitParam<string>): Promise<APIResponseV3<any>>;
    getLongShortRatio(params: SymbolPeriodLimitParam<string>): Promise<APIResponseV3<any>>;
    getLast500Trades(params: USDCLast500TradesRequest): Promise<APIResponseV3<any>>;
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
    submitOrder(params: USDCPerpOrderRequest): Promise<APIResponseV3<any>>;
    /** Active order parameters (such as quantity, price) and stop order parameters cannot be modified in one request at the same time. Please request modification separately. */
    modifyOrder(params: USDCPerpModifyOrderRequest): Promise<APIResponseV3<any>>;
    /** Cancel order */
    cancelOrder(params: USDCPerpCancelOrderRequest): Promise<APIResponseV3<any>>;
    /** Cancel all active orders. The real-time response indicates whether the request is successful, depending on retCode. */
    cancelActiveOrders(symbol: string, orderFilter: USDCOrderFilter): Promise<APIResponseV3<any>>;
    /** Query Unfilled/Partially Filled Orders */
    getActiveOrders(params: USDCPerpActiveOrdersRequest): Promise<APIResponseV3<any>>;
    /** Query order history. The endpoint only supports up to 30 days of queried records */
    getHistoricOrders(params: USDCPerpHistoricOrdersRequest): Promise<APIResponseV3<any>>;
    /** Query trade history. The endpoint only supports up to 30 days of queried records. An error will be returned if startTime is more than 30 days. */
    getOrderExecutionHistory(params: USDCPerpActiveOrdersRequest): Promise<APIResponseV3<any>>;
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
    /** Only for REGULAR_MARGIN */
    setLeverage(symbol: string, leverage: string): Promise<APIResponseV3<any>>;
    /** Query Settlement History */
    getSettlementHistory(params?: USDCSymbolDirectionLimitCursor): Promise<APIResponseV3<any>>;
    /** -> Risk Limit API */
    /** Query risk limit */
    getRiskLimit(symbol: string): Promise<APIResponseV3<any>>;
    /** Set risk limit */
    setRiskLimit(symbol: string, riskId: number): Promise<APIResponseV3<any>>;
    /** -> Funding API */
    /** Funding settlement occurs every 8 hours at 00:00 UTC, 08:00 UTC and 16:00 UTC. The current interval's fund fee settlement is based on the previous interval's fund rate. For example, at 16:00, the settlement is based on the fund rate generated at 8:00. The fund rate generated at 16:00 will be used at 0:00 the next day. */
    getLastFundingRate(symbol: string): Promise<APIResponseV3<any>>;
    /** Get predicted funding rate and my predicted funding fee */
    getPredictedFundingRate(symbol: string): Promise<APIResponseV3<any>>;
    /**
     *
     * API Data Endpoints
     *
     */
    getServerTime(): Promise<APIResponseWithTime>;
}
