import {
  LeverageTokenStatusV5,
  LTOrderStatusV5,
  LTOrderTypeV5,
} from '../shared-v5';

export interface LeverageTokenInfoV5 {
  ltCoin: string;
  ltName: string;
  maxPurchase: string;
  minPurchase: string;
  maxPurchaseDaily: string;
  maxRedeem: string;
  minRedeem: string;
  maxRedeemDaily: string;
  purchaseFeeRate: string;
  redeemFeeRate: string;
  ltStatus: LeverageTokenStatusV5;
  fundFee: string;
  fundFeeTime: string;
  manageFeeRate: string;
  manageFeeTime: string;
  value: string;
  netValue: string;
  total: string;
}

export interface LeveragedTokenMarketResultV5 {
  ltCoin: string;
  nav: string;
  navTime: string;
  circulation: string;
  basket: string;
  leverage: string;
}

export interface PurchaseSpotLeveragedTokenResultV5 {
  ltCoin: string;
  ltOrderStatus: LTOrderStatusV5;
  execQty: string;
  execAmt: string;
  amount: string;
  purchaseId: string;
  serialNo: string;
  valueCoin: string;
}
export interface RedeemSpotLeveragedTokenResultV5 {
  ltCoin: string;
  ltOrderStatus: LTOrderStatusV5;
  quantity: string;
  execQty: string;
  execAmt: string;
  redeemId: string;
  serialNo: string;
  valueCoin: string;
}

export interface SpotLeveragedTokenOrderHistoryV5 {
  ltCoin: string;
  orderId: string;
  ltOrderType: LTOrderTypeV5;
  orderTime: number;
  updateTime: number;
  ltOrderStatus: LTOrderStatusV5;
  fee: string;
  amount: string;
  value: string;
  valueCoin: string;
  serialNo: string;
}

export interface VIPMarginDataV5 {
  vipCoinList: {
    list: {
      borrowable: boolean;
      collateralRatio: string;
      currency: string;
      hourlyBorrowRate: string;
      liquidationOrder: string;
      marginCollateral: boolean;
      maxBorrowingAmount: string;
    }[];
    vipLevel: string;
  }[];
}

export interface SpotMarginCurrencyDataV5 {
  currency: string;
  flexibleManualBorrowable: boolean;
  minFlexibleManualBorrowQty: string;
  flexibleManualBorrowAccuracy: string;
  fixedManualBorrowable: boolean;
  minFixedManualBorrowQty: string;
  fixedManualBorrowAccuracy: string;
  fixedInterestRateAccuracy: string;
  minFixedInterestRate: string;
  maxFixedInterestRate: string;
}

export interface SpotMarginStateV5 {
  spotLeverage: string;
  spotMarginMode: '1' | '0';
  effectiveLeverage: string;
}

// Spot Margin Trade (UTA) response types
export interface ManualBorrowResultV5 {
  coin: string;
  amount: string;
}

export interface MaxBorrowableAmountV5 {
  currency: string;
  maxLoan: string;
}

export interface PositionTierV5 {
  tier: string;
  borrowLimit: string;
  positionMMR: string;
  positionIMR: string;
  maxLeverage: string;
}

export interface CurrencyPositionTiersV5 {
  currency: string;
  positionTiersRatioList: PositionTierV5[];
}

export interface CoinStateV5 {
  currency: string;
  spotLeverage: string;
}

export interface AvailableAmountToRepayV5 {
  currency: string;
  lossLessRepaymentAmount: string;
}

export interface ManualRepayWithoutConversionResultV5 {
  /**
   * Result status:
   * - P: Processing
   * - SU: Success
   * - FA: Failed
   */
  resultStatus: 'P' | 'SU' | 'FA';
}

export interface AutoRepayModeItemV5 {
  currency: string; // Coin name, uppercase only
  autoRepayMode: '0' | '1'; // 0: Off, 1: On
}

export interface AutoRepayModeResultV5 {
  data: AutoRepayModeItemV5[];
}

export interface SpotMarginLiabilityInfoV5 {
  currency: string;
  totalBorrowAmount: string;
  fixedBorrowAmount: string;
  flexibleBorrowAmount: string;
  spotTotalBorrow: string;
  derivativesBorrow: string;
}

export interface FixedRateBorrowResultV5 {
  orderId: string;
}

export interface FixedRateBorrowOrderInfoV5 {
  annualRate: string;
  orderId: string;
  orderTime: string;
  filledQty: string;
  orderQty: string;
  orderCurrency: string;
  state: number;
  term: number;
  repayType: string;
  strategyType: 'PARTIAL' | 'FULL';
}

export interface FixedRateBorrowContractInfoV5 {
  annualRate: string;
  borrowCurrency: string;
  borrowTime: string;
  interestPaid: string;
  loanId: string;
  orderId: string;
  repaymentTime: string;
  residualPenaltyInterest: string;
  residualPrincipal: string;
  status: number;
  term: string;
  repayType: string;
  strategyType: 'PARTIAL' | 'FULL';
}

export interface FixedRateBorrowQuoteV5 {
  orderCurrency: string;
  term: number;
  annualRate: string;
  qty: string;
}
