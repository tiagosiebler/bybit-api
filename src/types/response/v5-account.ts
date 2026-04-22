import {
  AccountMarginModeV5,
  AccountTypeV5,
  CategoryV5,
  TransactionTypeV5,
  UnifiedUpdateStatusV5,
} from '../shared-v5';

export interface WalletBalanceV5Coin {
  coin: string;
  equity: string;
  usdValue: string;
  walletBalance: string;
  free: string; // spot only
  locked: string; // spot only
  borrowAmount: string;
  availableToBorrow: string; // deprecated field
  availableToWithdraw: string;
  accruedInterest: string;
  totalOrderIM: string;
  totalPositionIM: string;
  totalPositionMM: string;
  unrealisedPnl: string;
  cumRealisedPnl: string;
  bonus: string;
  marginCollateral: boolean;
  collateralSwitch: boolean;
  spotBorrow: string;
}

export interface WalletBalanceV5 {
  accountType: AccountTypeV5;
  accountLTV: string;
  accountIMRate: string;
  accountMMRate: string;
  accountIMRateByMp: string;
  accountMMRateByMp: string;
  totalInitialMarginByMp: string;
  totalMaintenanceMarginByMp: string;
  totalEquity: string;
  totalWalletBalance: string;
  totalMarginBalance: string;
  totalAvailableBalance: string;
  totalPerpUPL: string;
  totalInitialMargin: string;
  totalMaintenanceMargin: string;
  coin: WalletBalanceV5Coin[];
}

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
  borrowAmount: string;
  unrealisedLoss: string;
  freeBorrowedAmount: string;
}

export interface CollateralInfoV5 {
  currency: string;
  hourlyBorrowRate: string;
  maxBorrowingAmount: string;
  freeBorrowAmount: string;
  freeBorrowingLimit: string;
  borrowAmount: string;
  availableToBorrow: string;
  borrowable: boolean;
  borrowUsageRate: string;
  marginCollateral: boolean;
  collateralSwitch: boolean;
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
  baseCoin: string;
  takerFeeRate: string;
  makerFeeRate: string;
}

export interface AccountInfoV5 {
  unifiedMarginStatus: number;
  marginMode: AccountMarginModeV5;
  isMasterTrader: boolean;
  spotHedgingStatus: string;
  updatedTime: string;
}

/**
 * Get Trade Behaviour Config / `getLimitPriceAction()` — `/v5/account/user-setting-config`
 */
export interface UserSettingConfigV5 {
  lpaSpot: boolean;
  lpaPerp: boolean;
  /** Spot MNT fee deduction enabled. */
  smsef?: boolean;
  /** Futures MNT fee deduction enabled. */
  fmsef?: boolean;
  /** Delta Neutral mode; may be absent on older API responses. */
  deltaEnable?: boolean;
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
  bonusChange: string;
  tradeId: string;
  orderId: string;
  orderLinkId: string;
  extraFees: string;
  transSubType: string;
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

export interface RepayLiabilityResultV5 {
  coin: string;
  repaymentQty: string;
}

export interface DCPInfoV5 {
  product: 'SPOT' | 'DERIVATIVES' | 'OPTIONS';
  dcpStatus: 'ON';
  timeWindow: string;
}

export interface ManualRepayResultV5 {
  resultStatus: 'P' | 'SU' | 'FA';
}

/** GET /v5/account/option-asset-info — response `result` wraps a nested `result` array. */
export interface OptionAssetInfoRowV5 {
  coin: string;
  totalDelta: string;
  totalRPL: string;
  totalUPL: string;
  assetIM: string;
  assetMM: string;
  sendTime: number;
}

export interface OptionAssetInfoNestedResultV5 {
  result: OptionAssetInfoRowV5[];
}

/** GET /v5/account/pay-info */
export interface PayInfoCollateralItemV5 {
  coin: string;
  availableSize: string;
  availableValue: string;
  coinScale: number;
  borrowSize: string;
  spotHedgeAmount: string;
  assetFrozen: string;
}

export interface PayInfoBorrowBlockV5 {
  coin?: string;
  borrowSize: string;
  borrowValue?: string;
  assetFrozen: string;
  availableBalance: string;
}

export interface PayInfoResultV5 {
  collateralInfo: {
    collateralList: PayInfoCollateralItemV5[];
  };
  borrowInfo: PayInfoBorrowBlockV5;
}

/** GET /v5/account/trade-info-for-analysis */
export interface TradeInfoAnalysisDailyV5 {
  day: string;
  sumBuyExecValue: string;
  sumSellExecValue: string;
  sumExecValue: string;
}

export interface TradeInfoForAnalysisResultV5 {
  symbolRnl: string;
  netExecQty: string;
  sumExecValue: string;
  sumExecQty: string;
  avgBuyExecPrice: string;
  sumBuyExecValue: string;
  sumBuyExecQty: string;
  sumBuyExecFee: string;
  sumBuyOrderQty: string;
  avgSellExecPrice: string;
  sumSellExecValue: string;
  sumSellExecQty: string;
  sumSellExecFee: string;
  sumSellOrderQty: string;
  maxMarginVersion: number;
  baseCoin: string;
  settleCoin: string;
  sumPriceList?: TradeInfoAnalysisDailyV5[];
}
