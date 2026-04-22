import { AccountTypeV5, CategoryV5, TransactionTypeV5 } from '../shared-v5';

export interface GetWalletBalanceParamsV5 {
  accountType: AccountTypeV5;
  coin?: string;
}

export interface GetBorrowHistoryParamsV5 {
  currency?: string;
  startTime?: number;
  endTime?: number;
  limit?: number;
  cursor?: string;
}

export interface GetFeeRateParamsV5 {
  category: CategoryV5;
  symbol?: string;
  baseCoin?: string;
}

export interface GetTransactionLogParamsV5 {
  accountType?: AccountTypeV5;
  category?: CategoryV5;
  currency?: string;
  baseCoin?: string;
  type?: TransactionTypeV5;
  /**
   * Transaction sub type, "movePosition", used to filter trans logs of Move Position only
   */
  transSubType?: string;
  startTime?: number;
  endTime?: number;
  limit?: number;
  cursor?: string;
}

export interface MMPModifyParamsV5 {
  baseCoin: string;
  window: string;
  frozenPeriod: string;
  qtyLimit: string;
  deltaLimit: string;
}

export interface RepayLiabilityParamsV5 {
  coin?: string;
}

export interface SetCollateralCoinParamsV5 {
  coin: string;
  collateralSwitch: 'ON' | 'OFF';
}

export interface GetClassicTransactionLogsParamsV5 {
  currency?: string;
  baseCoin?: string;
  type?: string;
  startTime?: number;
  endTime?: number;
  limit?: number;
  cursor?: string;
}

export interface SetLimitPriceActionParamsV5 {
  category: CategoryV5;
  modifyEnable: boolean;
}

/**
 * Set Delta Neutral Mode. POST /v5/account/set-delta-mode
 * 1: enable, 0: disable.
 */
export interface SetDeltaNeutralModeParamsV5 {
  deltaEnable: '1' | '0';
}

export interface GetAccountInstrumentsInfoParamsV5 {
  category: 'spot' | 'linear' | 'inverse';
  symbol?: string;
  /**
   * Filter by `symbolType`, e.g. `commodity`, `stock`, `forex` for linear (see Bybit Get Account Instruments Info).
   */
  symbolType?: string;
  limit?: number;
  cursor?: string;
}

/** GET /v5/account/pay-info */
export interface GetPayInfoParamsV5 {
  coin?: string;
}

/** GET /v5/account/trade-info-for-analysis */
export interface GetTradeInfoForAnalysisParamsV5 {
  symbol: string;
  startTime?: number;
  endTime?: number;
}

export interface ManualRepayParamsV5 {
  coin?: string;
  amount?: string;
  /**
   * ALL: fixed + floating (floating first); FIXED: fixed only; FLEXIBLE: floating only. Default: FLEXIBLE.
   * If neither `coin` nor `amount` is set, this must be ALL (repay all liabilities) or the request is rejected.
   */
  repaymentType?: 'ALL' | 'FIXED' | 'FLEXIBLE';
}
