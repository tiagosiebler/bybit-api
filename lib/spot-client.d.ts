import { APIResponse, KlineInterval, NewSpotOrder, OrderSide, OrderTypeSpot, SpotBalances, SpotLastPrice, SpotOrderQueryById, SpotSymbolInfo } from './types';
import BaseRestClient from './util/BaseRestClient';
/**
 * REST API client for Spot APIs (v1)
 *
 * @deprecated WARNING: V1/V2 private endpoints (Rest API & Websocket Stream) for mainnet
 * will be switched off gradually from 30 Oct 2023 UTC, so they are not promised a stability.
 * Please note that you are at your own risk of using old endpoints going forward, and please move to V5 ASAP.
 */
export declare class SpotClient extends BaseRestClient {
    getClientType(): "spot";
    fetchServerTime(): Promise<number>;
    getServerTime(): Promise<number>;
    /**
     *
     * Market Data Endpoints
     *
     **/
    getSymbols(): Promise<APIResponse<SpotSymbolInfo[]>>;
    getOrderBook(symbol: string, limit?: number): Promise<APIResponse<any>>;
    getMergedOrderBook(symbol: string, scale?: number, limit?: number): Promise<APIResponse<any>>;
    getTrades(symbol: string, limit?: number): Promise<APIResponse<any[]>>;
    getCandles(symbol: string, interval: KlineInterval, limit?: number, startTime?: number, endTime?: number): Promise<APIResponse<any[]>>;
    get24hrTicker(symbol?: string): Promise<APIResponse<any>>;
    getLastTradedPrice(): Promise<APIResponse<SpotLastPrice[]>>;
    getLastTradedPrice(symbol: string): Promise<APIResponse<SpotLastPrice>>;
    getBestBidAskPrice(symbol?: string): Promise<APIResponse<any>>;
    /**
     * Account Data Endpoints
     */
    submitOrder(params: NewSpotOrder): Promise<APIResponse<any>>;
    getOrder(params: SpotOrderQueryById): Promise<APIResponse<any>>;
    cancelOrder(params: SpotOrderQueryById): Promise<APIResponse<any>>;
    cancelOrderBatch(params: {
        symbol: string;
        side?: OrderSide;
        orderTypes: OrderTypeSpot[];
    }): Promise<APIResponse<any>>;
    getOpenOrders(symbol?: string, orderId?: string, limit?: number): Promise<APIResponse<any>>;
    getPastOrders(symbol?: string, orderId?: string, limit?: number): Promise<APIResponse<any>>;
    getMyTrades(symbol?: string, limit?: number, fromId?: number, toId?: number): Promise<APIResponse<any>>;
    /**
     * Wallet Data Endpoints
     */
    getBalances(): Promise<APIResponse<SpotBalances>>;
}
