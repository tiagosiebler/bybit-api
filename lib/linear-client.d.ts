import { APIResponse, APIResponseWithTime, AssetExchangeRecordsReq, CoinParam, LinearCancelConditionalOrderRequest, LinearCancelOrderRequest, LinearConditionalOrderRequest, LinearGetClosedPnlRequest, LinearGetConditionalOrderRequest, LinearGetHistoryTradeRecordsRequest, LinearGetOrderRequest, LinearGetOrdersRequest, LinearGetTradeRecordsRequest, LinearOrder, LinearQueryConditionalOrderRequest, LinearReplaceConditionalOrderRequest, LinearReplaceOrderRequest, LinearSetAddReduceMarginRequest, LinearSetAutoAddMarginRequest, LinearSetMarginSwitchRequest, LinearSetPositionModeRequest, LinearSetPositionTpSlModeRequest, LinearSetRiskLimitRequest, LinearSetTradingStopRequest, LinearSetUserLeverageRequest, NewLinearOrder, PerpPosition, PerpPositionRoot, SymbolInfo, SymbolIntervalFromLimitParam, SymbolLimitParam, SymbolParam, SymbolPeriodLimitParam, WalletBalances, WalletFundRecordsReq, WithdrawRecordsReq } from './types';
import BaseRestClient from './util/BaseRestClient';
/**
 * REST API client for linear/USD perpetual futures APIs (v2)
 *
 * @deprecated WARNING: V1/V2 private endpoints (Rest API & Websocket Stream) for mainnet
 * will be switched off gradually from 30 Oct 2023 UTC, so they are not promised a stability.
 * Please note that you are at your own risk of using old endpoints going forward, and please move to V5 ASAP.
 */
export declare class LinearClient extends BaseRestClient {
    getClientType(): "linear";
    fetchServerTime(): Promise<number>;
    /**
     *
     * Market Data Endpoints
     *
     */
    getOrderBook(params: SymbolParam): Promise<APIResponseWithTime<any[]>>;
    getKline(params: SymbolIntervalFromLimitParam): Promise<APIResponseWithTime<any[]>>;
    /**
     * Get latest information for symbol
     */
    getTickers(params?: Partial<SymbolParam>): Promise<APIResponseWithTime<any[]>>;
    getTrades(params: SymbolLimitParam): Promise<APIResponseWithTime<any[]>>;
    getSymbols(): Promise<APIResponse<SymbolInfo[]>>;
    getLastFundingRate(params: SymbolParam): Promise<APIResponseWithTime<any[]>>;
    getMarkPriceKline(params: SymbolIntervalFromLimitParam): Promise<APIResponseWithTime<any[]>>;
    getIndexPriceKline(params: SymbolIntervalFromLimitParam): Promise<APIResponseWithTime<any[]>>;
    getPremiumIndexKline(params: SymbolIntervalFromLimitParam): Promise<APIResponseWithTime<any[]>>;
    /**
     *
     * Market Data : Advanced
     *
     */
    getOpenInterest(params: SymbolPeriodLimitParam): Promise<APIResponseWithTime<any[]>>;
    getLatestBigDeal(params: SymbolLimitParam): Promise<APIResponseWithTime<any[]>>;
    getLongShortRatio(params: SymbolPeriodLimitParam): Promise<APIResponseWithTime<any[]>>;
    /**
     *
     * Account Data Endpoints
     *
     */
    getApiKeyInfo(): Promise<APIResponseWithTime<any>>;
    /**
     *
     * Wallet Data Endpoints
     *
     */
    getWalletBalance(params?: Partial<CoinParam>): Promise<APIResponseWithTime<WalletBalances>>;
    getWalletFundRecords(params?: WalletFundRecordsReq): Promise<APIResponseWithTime<any>>;
    getWithdrawRecords(params?: WithdrawRecordsReq): Promise<APIResponseWithTime<any>>;
    getAssetExchangeRecords(params?: AssetExchangeRecordsReq): Promise<APIResponseWithTime<any>>;
    /**
     *
     * API Data Endpoints
     *
     */
    getServerTime(): Promise<APIResponseWithTime<{}>>;
    getApiAnnouncements(): Promise<APIResponseWithTime<any>>;
    /**
     *
     * Account Data Endpoints
     *
     */
    placeActiveOrder(params: NewLinearOrder): Promise<APIResponseWithTime<LinearOrder | null>>;
    getActiveOrderList(params: LinearGetOrdersRequest): Promise<APIResponseWithTime<any>>;
    cancelActiveOrder(params: LinearCancelOrderRequest): Promise<APIResponseWithTime<any>>;
    cancelAllActiveOrders(params: SymbolParam): Promise<APIResponseWithTime<any>>;
    replaceActiveOrder(params: LinearReplaceOrderRequest): Promise<APIResponseWithTime<any>>;
    queryActiveOrder(params: LinearGetOrderRequest): Promise<APIResponseWithTime<any>>;
    /**
     * Conditional orders
     */
    placeConditionalOrder(params: LinearConditionalOrderRequest): Promise<APIResponseWithTime<any>>;
    getConditionalOrder(params: LinearGetConditionalOrderRequest): Promise<APIResponseWithTime<any>>;
    cancelConditionalOrder(params: LinearCancelConditionalOrderRequest): Promise<APIResponseWithTime<any>>;
    cancelAllConditionalOrders(params: SymbolParam): Promise<APIResponseWithTime<any>>;
    replaceConditionalOrder(params: LinearReplaceConditionalOrderRequest): Promise<APIResponseWithTime<any>>;
    queryConditionalOrder(params: LinearQueryConditionalOrderRequest): Promise<APIResponseWithTime<any>>;
    /**
     * Position
     */
    getPosition(): Promise<APIResponseWithTime<PerpPositionRoot[]>>;
    getPosition(params: Partial<SymbolParam>): Promise<APIResponseWithTime<PerpPosition[]>>;
    setAutoAddMargin(params?: LinearSetAutoAddMarginRequest): Promise<APIResponseWithTime<any>>;
    setMarginSwitch(params?: LinearSetMarginSwitchRequest): Promise<APIResponseWithTime<any>>;
    /**
     * Switch between one-way vs hedge mode. Use `linearPositionModeEnum` for the mode parameter.
     */
    setPositionMode(params: LinearSetPositionModeRequest): Promise<APIResponseWithTime<any>>;
    /**
     * Switch TP/SL mode between full or partial. When set to Partial, TP/SL orders may have a quantity less than the position size.
     * This is set with the setTradingStop() method. Use `positionTpSlModeEnum` for the tp_sl_mode parameter.
     */
    setPositionTpSlMode(params: LinearSetPositionTpSlModeRequest): Promise<APIResponseWithTime<any>>;
    setAddReduceMargin(params?: LinearSetAddReduceMarginRequest): Promise<APIResponseWithTime<any>>;
    setUserLeverage(params: LinearSetUserLeverageRequest): Promise<APIResponseWithTime<any>>;
    setTradingStop(params: LinearSetTradingStopRequest): Promise<APIResponseWithTime<any>>;
    getTradeRecords(params: LinearGetTradeRecordsRequest): Promise<APIResponseWithTime<any>>;
    getHistoryTradeRecords(params: LinearGetHistoryTradeRecordsRequest): Promise<APIResponseWithTime<any>>;
    getClosedPnl(params: LinearGetClosedPnlRequest): Promise<APIResponseWithTime<any>>;
    /**
     * Risk Limit
     */
    getRiskLimitList(params: SymbolParam): Promise<APIResponseWithTime<any>>;
    setRiskLimit(params: LinearSetRiskLimitRequest): Promise<APIResponseWithTime<any>>;
    /**
     * Funding
     */
    getPredictedFundingFee(params: SymbolParam): Promise<APIResponseWithTime<any>>;
    getLastFundingFee(params: SymbolParam): Promise<APIResponseWithTime<any>>;
}
