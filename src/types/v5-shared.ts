export type CategoryV5 = 'spot' | 'linear' | 'inverse' | 'option';

export type OrderFilterV5 = 'Order' | 'tpslOrder';
export type OrderSideV5 = 'Buy' | 'Sell';
export type OrderTimeInForceV5 = 'GTC' | 'IOC' | 'FOK' | 'PostOnly';
export type OrderTriggerByV5 = 'LastPrice' | 'IndexPrice' | 'MarkPrice';
export type OrderTypeV5 = 'Market' | 'Limit';
export type PositionIdx = 0 | 1 | 2;

export interface CategoryCursorListV5<T extends unknown[]> {
  category: CategoryV5;
  list: T;
  nextPageCursor?: string;
}

/**
 * Next page cursor does not exist for spot!
 */
export interface CursorListV5<T extends unknown[]> {
  nextPageCursor: string;
  list: T;
}

export interface CategoryListV5<
  T extends unknown[],
  TCategory extends CategoryV5
> {
  category: TCategory;
  list: T;
}

export interface CategorySymbolListV5<
  T extends unknown[],
  TCategory extends CategoryV5
> {
  category: TCategory;
  symbol: string;
  list: T;
}
