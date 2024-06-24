import { OrderSide } from '../shared';
import { USDCAPICategory, USDCOrderType, USDCTimeInForce } from './usdc-shared';
export interface USDCOptionsContractInfoRequest {
    symbol?: string;
    status?: 'WAITING_ONLINE' | 'ONLINE' | 'DELIVERING' | 'OFFLINE';
    baseCoin?: string;
    direction?: string;
    limit?: string;
    cursor?: string;
}
export interface USDCOptionsDeliveryPriceRequest {
    symbol?: string;
    baseCoin?: string;
    direction?: string;
    limit?: string;
    cursor?: string;
}
export interface USDCOptionsRecentTradesRequest {
    category: USDCAPICategory;
    symbol?: string;
    baseCoin?: string;
    optionType?: 'Call' | 'Put';
    limit?: string;
}
export interface USDCOptionsHistoricalVolatilityRequest {
    baseCoin?: string;
    period?: string;
    startTime?: string;
    endTime?: string;
}
export interface USDCOptionsOrderRequest {
    symbol: string;
    orderType: USDCOrderType;
    side: OrderSide;
    orderPrice?: string;
    orderQty: string;
    iv?: string;
    timeInForce?: USDCTimeInForce;
    orderLinkId?: string;
    reduceOnly?: boolean;
}
export interface USDCOptionsModifyOrderRequest {
    symbol: string;
    orderId?: string;
    orderLinkId?: string;
    orderPrice?: string;
    orderQty?: string;
    iv?: string;
}
export interface USDCOptionsCancelOrderRequest {
    symbol: string;
    orderId?: string;
    orderLinkId?: string;
}
export interface USDCOptionsCancelAllOrdersRequest {
    symbol?: string;
    baseCoin?: string;
}
export interface USDCOptionsActiveOrdersRealtimeRequest {
    orderId?: string;
    orderLinkId?: string;
    symbol?: string;
    baseCoin?: string;
    direction?: string;
    limit?: number;
    cursor?: string;
}
export interface USDCOptionsActiveOrdersRequest {
    category: 'OPTION';
    symbol?: string;
    baseCoin?: string;
    orderId?: string;
    orderLinkId?: string;
    direction?: string;
    limit?: number;
    cursor?: string;
}
export interface USDCOptionsHistoricOrdersRequest {
    category: 'OPTION';
    symbol?: string;
    baseCoin?: string;
    orderId?: string;
    orderLinkId?: string;
    orderStatus?: string;
    direction?: string;
    limit?: number;
    cursor?: string;
}
export interface USDCOptionsOrderExecutionRequest {
    category: 'OPTION';
    symbol?: string;
    baseCoin?: string;
    orderId?: string;
    orderLinkId?: string;
    startTime?: string;
    direction?: string;
    limit?: number;
    cursor?: string;
}
export interface USDCOptionsDeliveryHistoryRequest {
    symbol: string;
    expDate?: string;
    direction?: string;
    limit?: string;
    cursor?: string;
}
export interface USDCOptionsPositionsInfoExpiryRequest {
    expDate?: string;
    direction?: string;
    limit?: string;
    cursor?: string;
}
export interface USDCOptionsModifyMMPRequest {
    currency: string;
    windowMs: number;
    frozenPeriodMs: number;
    qtyLimit: string;
    deltaLimit: string;
}
