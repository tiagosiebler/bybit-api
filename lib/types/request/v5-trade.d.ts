import { CategoryV5, OrderFilterV5, OrderSMPTypeV5, OrderSideV5, OrderStatusV5, OrderTimeInForceV5, OrderTriggerByV5, OrderTypeV5, PositionIdx } from '../v5-shared';
export interface OrderParamsV5 {
    category: CategoryV5;
    symbol: string;
    isLeverage?: 0 | 1;
    side: OrderSideV5;
    orderType: OrderTypeV5;
    qty: string;
    marketUnit?: 'baseCoin' | 'quoteCoin';
    price?: string;
    triggerDirection?: 1 | 2;
    orderFilter?: OrderFilterV5;
    triggerPrice?: string;
    triggerBy?: OrderTriggerByV5;
    orderIv?: string;
    timeInForce?: OrderTimeInForceV5;
    positionIdx?: PositionIdx;
    orderLinkId?: string;
    takeProfit?: string;
    stopLoss?: string;
    tpTriggerBy?: OrderTriggerByV5;
    slTriggerBy?: OrderTriggerByV5;
    reduceOnly?: boolean;
    closeOnTrigger?: boolean;
    smpType?: OrderSMPTypeV5;
    mmp?: boolean;
    tpslMode?: 'Full' | 'Partial';
    tpLimitPrice?: string;
    slLimitPrice?: string;
    tpOrderType?: OrderTypeV5;
    slOrderType?: OrderTypeV5;
}
export interface AmendOrderParamsV5 {
    category: CategoryV5;
    symbol: string;
    orderId?: string;
    orderLinkId?: string;
    orderIv?: string;
    triggerPrice?: string;
    qty?: string;
    price?: string;
    takeProfit?: string;
    stopLoss?: string;
    tpTriggerBy?: OrderTriggerByV5;
    slTriggerBy?: OrderTriggerByV5;
    triggerBy?: OrderTriggerByV5;
    tpLimitPrice?: string;
    slLimitPrice?: string;
}
export interface CancelOrderParamsV5 {
    category: CategoryV5;
    symbol: string;
    orderId?: string;
    orderLinkId?: string;
    orderFilter?: OrderFilterV5;
}
export interface GetAccountOrdersParamsV5 {
    category: CategoryV5;
    symbol?: string;
    baseCoin?: string;
    settleCoin?: string;
    orderId?: string;
    orderLinkId?: string;
    openOnly?: 0 | 1 | 2;
    orderFilter?: OrderFilterV5;
    orderStatus?: OrderStatusV5;
    limit?: number;
    cursor?: string;
}
export interface GetAccountHistoricOrdersParamsV5 {
    category: CategoryV5;
    symbol?: string;
    baseCoin?: string;
    orderId?: string;
    orderLinkId?: string;
    orderFilter?: OrderFilterV5;
    orderStatus?: OrderStatusV5;
    startTime?: number;
    endTime?: number;
    limit?: number;
    cursor?: string;
}
export interface CancelAllOrdersParamsV5 {
    category: CategoryV5;
    symbol?: string;
    baseCoin?: string;
    settleCoin?: string;
    orderFilter?: OrderFilterV5;
}
export interface BatchOrderParamsV5 {
    symbol: string;
    side: OrderSideV5;
    orderType: OrderTypeV5;
    qty: string;
    price?: string;
    triggerDirection?: 1 | 2;
    triggerBy?: OrderTriggerByV5;
    orderIv?: string;
    timeInForce?: OrderTimeInForceV5;
    positionIdx?: PositionIdx;
    orderLinkId?: string;
    takeProfit?: string;
    stopLoss?: string;
    tpTriggerBy?: OrderTriggerByV5;
    slTriggerBy?: OrderTriggerByV5;
    reduceOnly?: boolean;
    closeOnTrigger?: boolean;
    smpType?: OrderSMPTypeV5;
    mmp?: boolean;
    tpslMode?: 'Full' | 'Partial';
    tpLimitPrice?: string;
    slLimitPrice?: string;
    tpOrderType?: OrderTypeV5;
    slOrderType?: OrderTypeV5;
}
export interface BatchAmendOrderParamsV5 {
    symbol: string;
    orderId?: string;
    orderLinkId?: string;
    orderIv?: string;
    triggerPrice?: string;
    qty?: string;
    price?: string;
    tpslMode?: 'Full' | 'Partial';
    takeProfit?: string;
    stopLoss?: string;
    tpTriggerBy?: OrderTriggerByV5;
    slTriggerBy?: OrderTriggerByV5;
    triggerBy?: OrderTriggerByV5;
    tpLimitPrice?: string;
    slLimitPrice?: string;
}
export interface BatchCancelOrderParamsV5 {
    symbol: string;
    orderId?: string;
    orderLinkId?: string;
}
