import { KlineIntervalV3, OrderSide } from '../shared';
import { USDCOrderFilter, USDCTimeInForce } from './usdc-shared';
export type UMCategory = 'linear' | 'inverse' | 'option';
export type UMOrderType = 'Limit' | 'Market';
export type UMDirection = 'prev' | 'next';
export interface UMCandlesRequest {
    category: UMCategory;
    symbol: string;
    interval: KlineIntervalV3;
    start: number;
    end: number;
    limit?: number;
}
export interface UMInstrumentInfoRequest {
    category: UMCategory;
    symbol?: string;
    baseCoin?: string;
    limit?: string;
    cursor?: string;
}
export interface UMFundingRateHistoryRequest {
    category: UMCategory;
    symbol: string;
    startTime?: number;
    endTime?: number;
    limit?: number;
}
export interface UMOptionDeliveryPriceRequest {
    category: UMCategory;
    symbol?: string;
    baseCoin?: string;
    direction?: UMDirection;
    limit?: string;
    cursor?: string;
}
export interface UMPublicTradesRequest {
    category: UMCategory;
    symbol: string;
    baseCoin?: string;
    optionType?: 'Call' | 'Put';
    limit?: string;
}
export interface UMOpenInterestRequest {
    category: UMCategory;
    symbol: string;
    interval: '5min' | '15min' | '30min' | '1h' | '4h' | '1d';
    startTime?: number;
    endTime?: number;
    limit?: number;
}
export interface UMOrderRequest {
    category: UMCategory;
    symbol: string;
    side: OrderSide;
    positionIdx?: '0' | '1' | '2';
    orderType: UMOrderType;
    qty: string;
    price?: string;
    basePrice?: string;
    triggerPrice?: string;
    triggerBy?: string;
    iv?: string;
    timeInForce: USDCTimeInForce;
    orderLinkId?: string;
    takeProfit?: number;
    stopLoss?: number;
    tpTriggerBy?: string;
    slTriggerBy?: string;
    reduceOnly?: boolean;
    closeOnTrigger?: boolean;
    mmp?: boolean;
}
export interface UMModifyOrderRequest {
    category: UMCategory;
    symbol: string;
    orderId?: string;
    orderLinkId?: string;
    iv?: string;
    triggerPrice?: string;
    qty?: string;
    price?: string;
    takeProfit?: number;
    stopLoss?: number;
    tpTriggerBy?: string;
    slTriggerBy?: string;
    triggerBy?: string;
}
export interface UMCancelOrderRequest {
    category: UMCategory;
    symbol: string;
    orderId?: string;
    orderLinkId?: string;
    orderFilter?: USDCOrderFilter;
}
export interface UMActiveOrdersRequest {
    category: UMCategory;
    symbol?: string;
    baseCoin?: string;
    orderId?: string;
    orderLinkId?: string;
    orderFilter?: USDCOrderFilter;
    direction?: UMDirection;
    limit?: number;
    cursor?: string;
}
export interface UMHistoricOrdersRequest {
    category: UMCategory;
    symbol?: string;
    baseCoin?: string;
    orderId?: string;
    orderLinkId?: string;
    orderStatus?: string;
    orderFilter?: USDCOrderFilter;
    direction?: UMDirection;
    limit?: number;
    cursor?: string;
}
export interface UMBatchOrder {
    symbol: string;
    side: OrderSide;
    positionIdx?: '0';
    orderType: UMOrderType;
    qty: string;
    price?: string;
    iv?: string;
    timeInForce: USDCTimeInForce;
    orderLinkId?: string;
    reduceOnly?: boolean;
    closeOnTrigger?: boolean;
    mmp?: boolean;
}
export interface UMBatchOrderReplace {
    symbol: string;
    orderId?: string;
    orderLinkId?: string;
    iv?: string;
    qty?: string;
    price?: string;
}
export interface UMBatchOrderCancel {
    symbol: string;
    orderId?: string;
    orderLinkId?: string;
}
export interface UMCancelAllOrdersRequest {
    category: UMCategory;
    baseCoin?: string;
    settleCoin?: string;
    symbol?: string;
    orderFilter?: USDCOrderFilter;
}
export interface UMPositionsRequest {
    category: UMCategory;
    symbol?: string;
    baseCoin?: string;
    direction?: UMDirection;
    limit?: number;
    cursor?: string;
}
export interface UMSetTPSLRequest {
    category: UMCategory;
    symbol: string;
    takeProfit?: string;
    stopLoss?: string;
    trailingStop?: string;
    tpTriggerBy?: string;
    slTriggerBy?: string;
    activePrice?: string;
    slSize?: string;
    tpSize?: string;
    positionIdx?: '0';
}
export interface UM7DayTradingHistoryRequest {
    category: UMCategory;
    symbol: string;
    baseCoin?: string;
    orderId?: string;
    orderLinkId?: string;
    startTime?: number;
    endTime?: number;
    direction?: UMDirection;
    limit?: number;
    cursor?: string;
    execType?: string;
}
export interface UMOptionsSettlementHistoryRequest {
    category: UMCategory;
    symbol?: string;
    expDate?: string;
    direction?: UMDirection;
    limit?: number;
    cursor?: string;
}
export interface UMPerpSettlementHistoryRequest {
    category: UMCategory;
    symbol?: string;
    direction?: UMDirection;
    limit?: number;
    cursor?: string;
}
export interface UMTransactionLogRequest {
    category: UMCategory;
    currency: string;
    baseCoin?: string;
    type?: string;
    startTime?: number;
    endTime?: number;
    direction?: UMDirection;
    limit?: number;
    cursor?: string;
}
export interface UMExchangeCoinsRequest {
    fromCoin?: string;
    toCoin?: string;
}
export interface UMBorrowHistoryRequest {
    currency: string;
    startTime?: number;
    endTime?: number;
    direction?: UMDirection;
    limit?: number;
    cursor?: string;
}
