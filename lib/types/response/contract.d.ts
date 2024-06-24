export interface PaginatedResult<TList = any> {
    nextPageCursor: string;
    list: TList[];
}
export interface ContractListResult<TList = any> {
    category: string;
    list: TList[];
}
export interface ContractHistoricOrder {
    symbol: string;
    orderId: string;
    orderLinkId: string;
    side: string;
    orderType: string;
    price: string;
    iv: string;
    qty: string;
    timeInForce: string;
    orderStatus: string;
    positionIdx: number;
    lastPriceOnCreated: string;
    createdTime: string;
    updatedTime: string;
    cancelType: string;
    rejectReason: string;
    stopOrderType: string;
    triggerDirection: number;
    triggerBy: string;
    triggerPrice: string;
    cumExecValue: string;
    cumExecFee: string;
    cumExecQty: string;
    leavesValue: string;
    leavesQty: string;
    takeProfit: string;
    stopLoss: string;
    tpslMode: string;
    tpLimitPrice: string;
    slLimitPrice: string;
    tpTriggerBy: string;
    slTriggerBy: string;
    reduceOnly: boolean;
    closeOnTrigger: boolean;
    blockTradeId: string;
    smpType: string;
    smpGroup: number;
    smpOrderId: string;
}
export interface ContractSymbolTicker {
    symbol: string;
    bidPrice: string;
    askPrice: string;
    lastPrice: string;
    lastTickDirection: string;
    prevPrice24h: string;
    price24hPcnt: string;
    highPrice24h: string;
    lowPrice24h: string;
    prevPrice1h: string;
    markPrice: string;
    indexPrice: string;
    openInterest: string;
    turnover24h: string;
    volume24h: string;
    fundingRate: string;
    nextFundingTime: string;
    predictedDeliveryPrice: string;
    basisRate: string;
    deliveryFeeRate: string;
    deliveryTime: string;
}
