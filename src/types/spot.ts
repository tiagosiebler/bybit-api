export type OrderSide = 'Buy' | 'Sell';
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
