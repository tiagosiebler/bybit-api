export interface UMPaginatedResult<List = any> {
    nextPageCursor: string;
    category: string;
    list: List[];
}
export interface UMLeverageFilter {
    minLeverage: string;
    maxLeverage: string;
    leverageStep: string;
}
export interface UMPriceFilter {
    minPrice: string;
    maxPrice: string;
    tickSize: string;
}
export interface UMLotSizeFilter {
    maxTradingQty: string;
    minTradingQty: string;
    qtyStep: string;
}
export interface UMInstrumentInfo {
    symbol: string;
    contractType: string;
    status: string;
    baseCoin: string;
    quoteCoin: string;
    launchTime: string;
    deliveryTime: string;
    deliveryFeeRate: string;
    priceScale: string;
    leverageFilter: UMLeverageFilter;
    priceFilter: UMPriceFilter;
    lotSizeFilter: UMLotSizeFilter;
}
export interface UMHistoricOrder {
    symbol: string;
    orderType: string;
    orderLinkId: string;
    orderId: string;
    stopOrderType: string;
    orderStatus: string;
    takeProfit: string;
    cumExecValue: string;
    blockTradeId: string;
    rejectReason: string;
    price: string;
    createdTime: number;
    tpTriggerBy: string;
    timeInForce: string;
    basePrice: string;
    leavesValue: string;
    updatedTime: number;
    side: string;
    triggerPrice: string;
    cumExecFee: string;
    slTriggerBy: string;
    leavesQty: string;
    closeOnTrigger: boolean;
    cumExecQty: string;
    reduceOnly: boolean;
    qty: string;
    stopLoss: string;
    triggerBy: string;
    orderIM: string;
}
