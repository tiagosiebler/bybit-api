export interface GetSpreadInstrumentsInfoParamsV5 {
  symbol?: string;
  baseCoin?: string;
  limit?: number;
  cursor?: string;
}

export interface SubmitSpreadOrderParamsV5 {
  symbol: string;
  side: 'Buy' | 'Sell';
  orderType: 'Limit' | 'Market';
  qty: string;
  price: string;
  orderLinkId: string;
  timeInForce: 'IOC' | 'FOK' | 'GTC' | 'PostOnly';
}

export interface AmendSpreadOrderParamsV5 {
  symbol: string;
  orderId?: string;
  orderLinkId?: string;
  qty?: string;
  price?: string;
}

export interface GetSpreadOpenOrdersParamsV5 {
  symbol?: string;
  baseCoin?: string;
  orderId?: string;
  orderLinkId?: string;
  limit?: number;
  cursor?: string;
}
export interface GetSpreadOrderHistoryParamsV5 {
  symbol?: string;
  baseCoin?: string;
  orderId?: string;
  orderLinkId?: string;
  startTime?: number;
  endTime?: number;
  limit?: number;
  cursor?: string;
}

export interface GetSpreadTradeHistoryParamsV5 {
  symbol?: string;
  orderId?: string;
  orderLinkId?: string;
  startTime?: number;
  endTime?: number;
  limit?: number;
  cursor?: string;
}
