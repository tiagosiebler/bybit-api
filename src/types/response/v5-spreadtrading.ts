export interface SpreadInstrumentInfoV5 {
  symbol: string;
  contractType: 'FundingRateArb' | 'CarryTrade' | 'FutureSpread' | 'PerpBasis';
  status: 'Trading' | 'Settling';
  baseCoin: string;
  quoteCoin: string;
  settleCoin: string;
  tickSize: string;
  minPrice: string;
  maxPrice: string;
  lotSize: string;
  minSize: string;
  maxSize: string;
  launchTime: string;
  deliveryTime: string;
  legs: {
    symbol: string;
    contractType: 'LinearPerpetual' | 'LinearFutures' | 'Spot';
  }[];
}

export interface SpreadOrderbookResponseV5 {
  s: string; // Symbol
  b: [string, string][]; // Bids array [price, size]
  a: [string, string][]; // Asks array [price, size]
  u: number; // Update ID
  ts: number; // Timestamp
  seq: number; // Sequence
  cts: number; // Cross timestamp
}

export interface SpreadTickerV5 {
  symbol: string; // Spread combination symbol name
  bidPrice: string; // Bid 1 price
  bidSize: string; // Bid 1 size
  askPrice: string; // Ask 1 price
  askSize: string; // Ask 1 size
  lastPrice: string; // Last trade price
  highPrice24h: string; // The highest price in the last 24 hours
  lowPrice24h: string; // The lowest price in the last 24 hours
  prevPrice24h: string; // Price 24 hours ago
  volume24h: string; // Volume for 24h
}

export interface SpreadRecentTradeV5 {
  execId: string; // Execution ID
  symbol: string; // Spread combination symbol name
  price: string; // Trade price
  size: string; // Trade size
  side: 'Buy' | 'Sell'; // Side of taker
  time: string; // Trade time (ms)
}

export interface SpreadOpenOrderV5 {
  symbol: string;
  baseCoin: string;
  orderType: 'Market' | 'Limit';
  orderLinkId: string;
  side: 'Buy' | 'Sell';
  timeInForce: 'GTC' | 'FOK' | 'IOC' | 'PostOnly';
  orderId: string;
  leavesQty: string;
  orderStatus: 'New' | 'PartiallyFilled';
  cumExecQty: string;
  price: string;
  qty: string;
  createdTime: string;
  updatedTime: string;
}

export interface SpreadOrderHistoryV5 {
  symbol: string;
  orderType: 'Market' | 'Limit';
  orderLinkId: string;
  orderId: string;
  contractType: 'FundingRateArb' | 'CarryTrade' | 'FutureSpread' | 'PerpBasis';
  orderStatus: 'Rejected' | 'Cancelled' | 'Filled';
  price: string;
  orderQty: string;
  timeInForce: 'GTC' | 'FOK' | 'IOC' | 'PostOnly';
  baseCoin: string;
  createdAt: string;
  updatedAt: string;
  side: 'Buy' | 'Sell';
  leavesQty: string;
  settleCoin: string;
  cumExecQty: string;
  qty: string;
  leg1Symbol: string;
  leg1ProdType: 'Futures' | 'Spot';
  leg1OrderId: string;
  leg1Side: string;
  leg2ProdType: 'Futures' | 'Spot';
  leg2OrderId: string;
  leg2Symbol: string;
  leg2Side: string;
  cxlRejReason: string;
}

export interface SpreadTradeLegV5 {
  symbol: string;
  side: 'Buy' | 'Sell';
  execPrice: string;
  execTime: string;
  execValue: string;
  execType: string;
  category: 'linear' | 'spot';
  execQty: string;
  execFee: string;
  execId: string;
}

export interface SpreadTradeV5 {
  symbol: string;
  orderLinkId: string;
  side: 'Buy' | 'Sell';
  orderId: string;
  execPrice: string;
  execTime: string;
  execType: 'Trade';
  execQty: string;
  execId: string;
  legs: SpreadTradeLegV5[];
  extraFees: string;
}
