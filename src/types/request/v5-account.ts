import { AccountTypeV5, CategoryV5, TransactionTypeV5 } from '../v5-shared';

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
