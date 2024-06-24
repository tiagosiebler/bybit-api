import { OrderSide, numberInString } from '../shared';
export type OrderTypeSpot = 'LIMIT' | 'MARKET' | 'LIMIT_MAKER';
export type OrderTimeInForce = 'GTC' | 'FOK' | 'IOC';
export interface NewSpotOrder {
    symbol: string;
    qty: number;
    side: OrderSide;
    type: OrderTypeSpot;
    timeInForce?: OrderTimeInForce;
    price?: number;
    orderLinkId?: string;
}
export interface NewSpotOrderV3 {
    symbol: string;
    orderQty: string;
    side: OrderSide;
    orderType: OrderTypeSpot;
    timeInForce?: OrderTimeInForce;
    orderPrice?: string;
    orderLinkId?: string;
    orderCategory?: 0 | 1;
    triggerPrice?: string;
}
export interface SpotCancelOrderBatchRequest {
    symbol: string;
    side?: OrderSide;
    orderTypes: OrderTypeSpot[];
    orderCategory?: 0 | 1;
}
export interface SpotOrderQueryById {
    orderId?: string;
    orderLinkId?: string;
    orderCategory?: 0 | 1;
}
export interface SpotSymbolInfo {
    name: string;
    alias: string;
    baseCurrency: string;
    quoteCurrency: string;
    basePrecision: numberInString;
    quotePrecision: numberInString;
    minTradeQuantity: numberInString;
    minTradeAmount: numberInString;
    minPricePrecision: numberInString;
    maxTradeQuantity: numberInString;
    maxTradeAmount: numberInString;
    category: numberInString;
}
export interface SpotMyTradesRequest {
    symbol?: string;
    orderId?: string;
    limit?: string;
    startTime?: number;
    endTime?: number;
    fromTradeId?: string;
    toTradeId?: string;
}
export interface SpotLeveragedTokenPRHistoryRequest {
    ltCode?: string;
    orderId?: string;
    startTime?: number;
    endTime?: number;
    limit?: number;
    orderType?: 1 | 2;
    serialNo?: string;
}
export interface SpotCrossMarginBorrowingInfoRequest {
    startTime?: number;
    endTime?: number;
    coin?: string;
    status?: 0 | 1 | 2;
    limit?: number;
}
export interface SpotCrossMarginRepaymentHistoryRequest {
    startTime?: number;
    endTime?: number;
    coin?: string;
    limit?: number;
}
