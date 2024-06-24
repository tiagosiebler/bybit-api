import { OrderSide } from '../shared';
import { USDCAPICategory, USDCOrderFilter, USDCOrderType, USDCTimeInForce } from './usdc-shared';
export interface USDCOpenInterestRequest {
    symbol: string;
    period: string;
    limit?: number;
}
export interface USDCLast500TradesRequest {
    category: USDCAPICategory;
    symbol?: string;
    baseCoin?: string;
    limit?: string;
}
export interface USDCSymbolDirectionLimit {
    symbol?: string;
    direction?: string;
    limit?: string;
}
export interface USDCSymbolDirectionLimitCursor {
    symbol?: string;
    direction?: string;
    limit?: string;
    cursor?: string;
}
export interface USDCPerpOrderRequest {
    symbol: string;
    orderType: USDCOrderType;
    orderFilter: USDCOrderFilter;
    side: OrderSide;
    orderPrice?: string;
    orderQty: string;
    timeInForce?: USDCTimeInForce;
    orderLinkId?: string;
    reduceOnly?: boolean;
    closeOnTrigger?: boolean;
    takeProfit?: string;
    stopLoss?: string;
    tptriggerby?: string;
    slTriggerBy?: string;
    basePrice?: string;
    triggerPrice?: string;
    triggerBy?: string;
    mmp?: boolean;
}
export interface USDCPerpModifyOrderRequest {
    symbol: string;
    orderFilter: USDCOrderFilter;
    orderId?: string;
    orderLinkId?: string;
    orderPrice?: string;
    orderQty?: string;
    takeProfit?: string;
    stopLoss?: string;
    tptriggerby?: string;
    slTriggerBy?: string;
    triggerPrice?: string;
}
export interface USDCPerpCancelOrderRequest {
    symbol: string;
    orderFilter: USDCOrderFilter;
    orderId?: string;
    orderLinkId?: string;
}
export interface USDCPerpActiveOrdersRequest {
    category: 'PERPETUAL';
    symbol?: string;
    baseCoin?: string;
    orderId?: string;
    orderLinkId?: string;
    orderFilter?: USDCOrderFilter;
    direction?: string;
    limit?: number;
    cursor?: string;
}
export interface USDCPerpHistoricOrdersRequest {
    category: 'PERPETUAL';
    symbol?: string;
    baseCoin?: string;
    orderId?: string;
    orderLinkId?: string;
    orderStatus?: string;
    orderFilter?: USDCOrderFilter;
    direction?: string;
    limit?: number;
    cursor?: string;
}
