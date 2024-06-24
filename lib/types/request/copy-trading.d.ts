import { OrderSide } from '../shared';
import { USDCOrderType } from './usdc-shared';
export interface CopyTradingOrderRequest {
    side: OrderSide;
    symbol: string;
    orderType: USDCOrderType;
    price: string;
    qty: string;
    takeProfit?: string;
    stopLoss?: string;
    tpTriggerBy?: string;
    slTriggerBy?: string;
    orderLinkId?: string;
}
export interface CopyTradingTradingStopRequest {
    symbol: string;
    parentOrderId: string;
    takeProfit?: string;
    stopLoss?: string;
    tpTriggerBy?: string;
    slTriggerBy?: string;
    parentOrderLinkId?: string;
}
export interface CopyTradingOrderListRequest {
    symbol?: string;
    orderId?: string;
    orderLinkId?: string;
    copyTradeOrderType?: string;
}
export interface CopyTradingCancelOrderRequest {
    symbol: string;
    orderId?: string;
    orderLinkId?: string;
}
export interface CopyTradingCloseOrderRequest {
    symbol: string;
    orderLinkId?: string;
    parentOrderId?: string;
    parentOrderLinkId?: string;
}
export interface CopyTradingTransferRequest {
    transferId: string;
    coin: string;
    amount: string;
    fromAccountType: string;
    toAccountType: string;
}
