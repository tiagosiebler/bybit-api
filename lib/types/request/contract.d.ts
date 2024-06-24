import { OrderSide } from '../shared';
import { UMOrderType } from './unified-margin';
import { USDCOrderFilter, USDCTimeInForce } from './usdc-shared';
export interface ContractOrderRequest {
    symbol: string;
    side: OrderSide;
    orderType: UMOrderType;
    qty: string;
    timeInForce: USDCTimeInForce;
    price?: string;
    triggerDirection?: '1' | '2';
    triggerPrice?: string;
    triggerBy?: string;
    positionIdx?: '0' | '1' | '2';
    orderLinkId?: string;
    takeProfit?: string;
    stopLoss?: string;
    tpTriggerBy?: string;
    slTriggerBy?: string;
    reduceOnly?: boolean;
    closeOnTrigger?: boolean;
    tpslMode?: 'Partial' | 'Full';
    tpOrderType?: UMOrderType;
    slOrderType?: UMOrderType;
}
export interface ContractHistoricOrdersRequest {
    orderId?: string;
    orderLinkId?: string;
    symbol: string;
    orderStatus?: string;
    orderFilter?: USDCOrderFilter;
    limit?: number;
    cursor?: string;
}
export interface ContractCancelOrderRequest {
    symbol: string;
    orderId?: string;
    orderLinkId?: string;
}
export interface ContractModifyOrderRequest {
    symbol: string;
    orderId?: string;
    orderLinkId?: string;
    price?: string;
    qty?: string;
    triggerPrice?: string;
    takeProfit?: string;
    stopLoss?: string;
    tpTriggerBy?: string;
    slTriggerBy?: string;
    triggerBy?: string;
    tpLimitPrice?: string;
    slLimitPrice?: string;
}
export interface ContractActiveOrdersRequest {
    symbol?: string;
    orderId?: string;
    orderLinkId?: string;
    settleCoin?: string;
    orderFilter?: USDCOrderFilter;
    limit?: number;
}
export interface ContractPositionsRequest {
    symbol?: string;
    settleCoin?: string;
    dataFilter?: string;
}
export interface ContractSetAutoAddMarginRequest {
    symbol: string;
    side: 'Buy' | 'Sell';
    autoAddMargin: 1 | 0;
    positionIdx?: 0 | 1 | 2;
}
export interface ContractSetMarginSwitchRequest {
    symbol: string;
    tradeMode: 0 | 1;
    buyLeverage: string;
    sellLeverage: string;
}
export interface ContractSetPositionModeRequest {
    symbol?: string;
    coin?: string;
    mode: 0 | 3;
}
export interface ContractSetTPSLRequest {
    symbol: string;
    takeProfit?: string;
    stopLoss?: string;
    tpslMode?: 'Full' | 'Partial';
    tpSize?: string;
    slSize?: string;
    tpTriggerBy?: string;
    slTriggerBy?: string;
    trailingStop?: string;
    activePrice?: string;
    tpLimitPrice?: string;
    slLimitPrice?: string;
    tpOrderType?: UMOrderType;
    slOrderType?: UMOrderType;
    /** 0-one-way, 1-buy side, 2-sell side */
    positionIdx?: 0 | 1 | 2;
}
export interface ContractUserExecutionHistoryRequest {
    symbol: string;
    orderId?: string;
    startTime?: number;
    endTime?: number;
    execType?: 'Trade' | 'AdlTrade' | 'Funding' | 'BustTrade';
    limit?: number;
    cursor?: string;
}
export interface ContractClosedPNLRequest {
    symbol: string;
    startTime?: number;
    endTime?: number;
    limit?: number;
    cursor?: string;
}
export interface ContractWalletFundRecordRequest {
    startTime?: string;
    endTime?: string;
    coin?: string;
    walletFundType?: string;
    limit?: string;
    cursor?: string;
}
