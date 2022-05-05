export type KlineInterval =
  | '1m'
  | '3m'
  | '5m'
  | '15m'
  | '30m'
  | '1h'
  | '2h'
  | '4h'
  | '6h'
  | '12h'
  | '1d'
  | '1w'
  | '1M';

export type numberInString = string;

export interface APIResponse<T> {
  ret_code: number;
  ret_msg: 'OK' | string;
  ext_code: string;
  ext_info: string;
  result: T;
}

export interface APIResponseWithTime<T> extends APIResponse<T> {
  /** UTC timestamp */
  time_now: string;
}

/**
 * Request Parameter Types
 */
export interface SymbolParam {
  symbol: string;
}

export interface SymbolLimitParam {
  symbol: string;
  limit?: number;
}

export interface SymbolPeriodLimitParam {
  symbol: string;
  period: string;
  limit?: number;
}

export interface SymbolFromLimitParam {
  symbol: string;
  from?: number;
  limit?: number;
}

export interface SymbolIntervalFromLimitParam {
  symbol: string;
  interval: string;
  from: number;
  limit?: number;
}

export interface CoinParam {
  coin: string;
}

export interface WalletFundRecordsReq {
  start_date?: string;
  end_date?: string;
  currency?: string;
  coin?: string;
  wallet_fund_type?: string;
  page?: number;
  limit?: number;
}

export interface WithdrawRecordsReq {
  start_date?: string;
  end_date?: string;
  coin?: string;
  status?: string;
  page?: number;
  limit?: number;
}

export interface AssetExchangeRecordsReq {
  limit?: number;
  from?: number;
  direction?: string;
}

/**
 * Response types
 */

export interface LeverageFilter {
  min_leverage: numberInString;
  max_leveage: numberInString;
  leverage_step: numberInString;
}
export interface PriceFilter {
  min_price: numberInString;
  max_price: numberInString;
  tick_size: numberInString;
}

export interface LotSizeFilter {
  max_trading_qty: number;
  min_trading_qty: number;
  qty_step: number;
}

export interface SymbolInfo {
  name: string;
  alias: string;
  status: 'Trading' | string;
  base_currency: string;
  quote_currency: string;
  price_scale: number;
  taker_fee: numberInString;
  maker_fee: numberInString;
  leverage_filter: LeverageFilter;
  price_filter: PriceFilter;
  lot_size_filter: LotSizeFilter;
}
