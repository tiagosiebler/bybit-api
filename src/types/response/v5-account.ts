import { AccountTypeV5, CategoryV5, TransactionTypeV5 } from '../v5-shared';

export interface WalletBalanceV5Coin {
  coin: string;
  equity: string;
  usdValue: string;
  walletBalance: string;
  borrowAmount: string;
  availableToBorrow: string;
  availableToWithdraw: string;
  accruedInterest: string;
  totalOrderIM: string;
  totalPositionIM: string;
  totalPositionMM: string;
  unrealisedPnl: string;
  cumRealisedPnl: string;
}

export interface WalletBalanceV5 {
  accountType: AccountTypeV5;
  accountIMRate: string;
  accountMMRate: string;
  totalEquity: string;
  totalWalletBalance: string;
  totalMarginBalance: string;
  totalAvailableBalance: string;
  totalPerpUPL: string;
  totalInitialMargin: string;
  totalMaintenanceMargin: string;
  coin: WalletBalanceV5Coin[];
}

export type UnifiedUpdateStatusV5 = 'FAIL' | 'PROCESS' | 'SUCCESS';

export interface UnifiedAccountUpgradeResultV5 {
  unifiedUpdateStatus: UnifiedUpdateStatusV5;
  unifiedUpdateMsg: {
    msg: string[] | null;
  };
}

export interface BorrowHistoryRecordV5 {
  currency: string;
  createdTime: number;
  borrowCost: string;
  hourlyBorrowRate: string;
  InterestBearingBorrowSize: string;
  costExemption: string;
}

export interface CollateralInfoV5 {
  currency: string;
  hourlyBorrowRate: string;
  maxBorrowingAmount: string;
  freeBorrowingAmount: string;
  borrowAmount: string;
  availableToBorrow: string;
  borrowable: boolean;
  marginCollateral: boolean;
  collateralRatio: string;
}

export interface CoinGreeksV5 {
  baseCoin: string;
  totalDelta: string;
  totalGamma: string;
  totalVega: string;
  totalTheta: string;
}

export interface FeeRateV5 {
  symbol: string;
  takerFeeRate: string;
  makerFeeRate: string;
}

export interface AccountInfoV5 {
  unifiedMarginStatus: number;
  marginMode: 'REGULAR_MARGIN' | 'PORTFOLIO_MARGIN';
  updatedTime: string;
}

export interface TransactionLogV5 {
  symbol: string;
  category: CategoryV5;
  side: string;
  transactionTime: string;
  type: TransactionTypeV5;
  qty: string;
  size: string;
  currency: string;
  tradePrice: string;
  funding: string;
  fee: string;
  cashFlow: string;
  change: string;
  cashBalance: string;
  feeRate: string;
  tradeId: string;
  orderId: string;
  orderLinkId: string;
}

export interface MMPStateV5 {
  baseCoin: string;
  mmpEnabled: boolean;
  window: string;
  frozenPeriod: string;
  qtyLimit: string;
  deltaLimit: string;
  mmpFrozenUntil: string;
  mmpFrozen: boolean;
}
