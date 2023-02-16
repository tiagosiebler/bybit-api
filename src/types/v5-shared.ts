export type CategoryV5 = 'spot' | 'linear' | 'inverse' | 'option';

export type OrderFilterV5 = 'Order' | 'tpslOrder';
export type OrderSideV5 = 'Buy' | 'Sell';
export type OrderTypeV5 = 'Market' | 'Limit';
export type OrderTimeInForceV5 = 'GTC' | 'IOC' | 'FOK' | 'PostOnly';
export type OrderTriggerByV5 = 'LastPrice' | 'IndexPrice' | 'MarkPrice';
export type PositionIdx = 0 | 1 | 2;
/**
 * Trade mode. 0: cross-margin, 1: isolated margin
 */
export type TradeModeV5 = 0 | 1;
export type TPSLModeV5 = 'Full' | 'Partial';
export type AccountMarginModeV5 = 'REGULAR_MARGIN' | 'PORTFOLIO_MARGIN';

export type AccountTypeV5 =
  | 'CONTRACT'
  | 'SPOT'
  | 'INVESTMENT'
  | 'OPTION'
  | 'UNIFIED'
  | 'FUND';

export type TransactionTypeV5 =
  | 'TRANSFER_IN'
  | 'TRANSFER_OUT'
  | 'TRADE'
  | 'SETTLEMENT'
  | 'DELIVERY'
  | 'LIQUIDATION'
  | 'BONUS'
  | 'FEE_REFUND'
  | 'INTEREST'
  | 'CURRENCY_BUY'
  | 'CURRENCY_SELL';

export type PermissionTypeV5 =
  | 'ContractTrade'
  | 'Spot'
  | 'Wallet'
  | 'Options'
  | 'Derivatives'
  | 'Exchange'
  | 'NFT';

export interface PermissionsV5 {
  ContractTrade?: string[];
  Spot?: string[];
  Wallet?: string[];
  Options?: string[];
  Derivatives?: string[];
  Exchange?: string[];
  NFT?: string[];
}

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
