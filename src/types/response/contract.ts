export interface PaginatedResult<TList = any> {
  nextPageCursor: string;
  list: TList[];
}

export interface ContractHistoricOrder {
  symbol: string;
  side: string;
  orderType: string;
  price: string;
  qty: string;
  reduceOnly: boolean;
  timeInForce: string;
  orderStatus: string;
  leavesQty: string;
  leavesValue: string;
  cumExecQty: string;
  cumExecValue: string;
  cumExecFee: string;
  lastPriceOnCreated: string;
  rejectReason: string;
  orderLinkId: string;
  createdTime: string;
  updatedTime: string;
  orderId: string;
  stopOrderType: string;
  takeProfit: string;
  stopLoss: string;
  tpTriggerBy: string;
  slTriggerBy: string;
  triggerPrice: string;
  closeOnTrigger: boolean;
  triggerDirection: number;
  positionIdx: number;
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
