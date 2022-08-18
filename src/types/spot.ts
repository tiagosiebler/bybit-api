import { numberInString, OrderSide } from './shared';

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

export interface SpotOrderQueryById {
  orderId?: string;
  orderLinkId?: string;
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
