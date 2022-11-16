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
