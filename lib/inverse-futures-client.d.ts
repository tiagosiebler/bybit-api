import { APIResponseWithTime, AssetExchangeRecordsReq, CoinParam, SymbolInfo, SymbolIntervalFromLimitParam, SymbolLimitParam, SymbolParam, SymbolPeriodLimitParam, WalletFundRecordsReq, WithdrawRecordsReq } from './types/shared';
import BaseRestClient from './util/BaseRestClient';
/**
 * REST API client for Inverse Futures APIs (e.g. quarterly futures) (v2)
 *
 * @deprecated WARNING: V1/V2 private endpoints (Rest API & Websocket Stream) for mainnet
 * will be switched off gradually from 30 Oct 2023 UTC, so they are not promised a stability.
 * Please note that you are at your own risk of using old endpoints going forward, and please move to V5 ASAP.
 */
export declare class InverseFuturesClient extends BaseRestClient {
    getClientType(): "inverseFutures";
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
    /**
     * Public trading records
     */
    getTrades(params: SymbolLimitParam): Promise<APIResponseWithTime<any[]>>;
    getSymbols(): Promise<APIResponseWithTime<SymbolInfo[]>>;
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
    getWalletBalance(params?: Partial<CoinParam>): Promise<APIResponseWithTime<any>>;
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
    /**
     * Active orders
     */
    placeActiveOrder(orderRequest: {
        side: string;
        symbol: string;
        order_type: string;
        qty: number;
        price?: number;
        time_in_force: string;
        take_profit?: number;
        stop_loss?: number;
        reduce_only?: boolean;
        close_on_trigger?: boolean;
        order_link_id?: string;
    }): Promise<APIResponseWithTime<any>>;
    getActiveOrderList(params: {
        symbol: string;
        order_status?: string;
        direction?: string;
        limit?: number;
        cursor?: string;
    }): Promise<APIResponseWithTime<any>>;
    cancelActiveOrder(params: {
        symbol: string;
        order_id?: string;
        order_link_id?: string;
    }): Promise<APIResponseWithTime<any>>;
    cancelAllActiveOrders(params: SymbolParam): Promise<APIResponseWithTime<any>>;
    replaceActiveOrder(params: {
        order_id?: string;
        order_link_id?: string;
        symbol: string;
        p_r_qty?: string;
        p_r_price?: string;
    }): Promise<APIResponseWithTime<any>>;
    queryActiveOrder(params: {
        order_id?: string;
        order_link_id?: string;
        symbol: string;
    }): Promise<APIResponseWithTime<any>>;
    /**
     * Conditional orders
     */
    placeConditionalOrder(params: {
        side: string;
        symbol: string;
        order_type: string;
        qty: string;
        price?: string;
        base_price: string;
        stop_px: string;
        time_in_force: string;
        trigger_by?: string;
        close_on_trigger?: boolean;
        order_link_id?: string;
    }): Promise<APIResponseWithTime<any>>;
    getConditionalOrder(params: {
        symbol: string;
        stop_order_status?: string;
        direction?: string;
        limit?: number;
        cursor?: string;
    }): Promise<APIResponseWithTime<any>>;
    cancelConditionalOrder(params: {
        symbol: string;
        stop_order_id?: string;
        order_link_id?: string;
    }): Promise<APIResponseWithTime<any>>;
    cancelAllConditionalOrders(params: SymbolParam): Promise<APIResponseWithTime<any>>;
    replaceConditionalOrder(params: {
        stop_order_id?: string;
        order_link_id?: string;
        symbol: string;
        p_r_qty?: number;
        p_r_price?: string;
        p_r_trigger_price?: string;
    }): Promise<APIResponseWithTime<any>>;
    queryConditionalOrder(params: {
        symbol: string;
        stop_order_id?: string;
        order_link_id?: string;
    }): Promise<APIResponseWithTime<any>>;
    /**
     * Position
     */
    /**
     * Get position list
     */
    getPosition(params?: Partial<SymbolParam>): Promise<APIResponseWithTime<any>>;
    changePositionMargin(params: {
        symbol: string;
        margin: string;
    }): Promise<APIResponseWithTime<any>>;
    setTradingStop(params: {
        symbol: string;
        take_profit?: number;
        stop_loss?: number;
        trailing_stop?: number;
        tp_trigger_by?: string;
        sl_trigger_by?: string;
        new_trailing_active?: number;
    }): Promise<APIResponseWithTime<any>>;
    setUserLeverage(params: {
        symbol: string;
        buy_leverage: number;
        sell_leverage: number;
    }): Promise<APIResponseWithTime<any>>;
    /**
     * Position mode switch
     */
    setPositionMode(params: {
        symbol: string;
        mode: number;
    }): Promise<APIResponseWithTime<any>>;
    /**
     * Cross/Isolated margin switch. Must set leverage value when switching.
     */
    setMarginType(params: {
        symbol: string;
        is_isolated: boolean;
        buy_leverage: number;
        sell_leverage: number;
    }): Promise<APIResponseWithTime<any>>;
    getTradeRecords(params: {
        order_id?: string;
        symbol: string;
        start_time?: number;
        page?: number;
        limit?: number;
        order?: string;
    }): Promise<APIResponseWithTime<any>>;
    getClosedPnl(params: {
        symbol: string;
        start_time?: number;
        end_time?: number;
        exec_type?: string;
        page?: number;
        limit?: number;
    }): Promise<APIResponseWithTime<any>>;
    /**
     * Funding
     */
    getLastFundingRate(params: SymbolParam): Promise<APIResponseWithTime<any>>;
    getMyLastFundingFee(params: SymbolParam): Promise<APIResponseWithTime<any>>;
    getPredictedFunding(params: SymbolParam): Promise<APIResponseWithTime<any>>;
    /**
     * LCP Info
     */
    getLcpInfo(params: SymbolParam): Promise<APIResponseWithTime<any>>;
}
