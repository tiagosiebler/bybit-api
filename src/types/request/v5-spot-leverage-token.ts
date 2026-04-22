import { LTOrderTypeV5 } from '../shared-v5';

export interface PurchaseSpotLeveragedTokenParamsV5 {
  ltCoin: string;
  amount: string;
  serialNo?: string;
}

export interface RedeemSpotLeveragedTokenParamsV5 {
  ltCoin: string;
  quantity: string;
  serialNo?: string;
}

export interface GetSpotLeveragedTokenOrderHistoryParamsV5 {
  ltCoin?: string;
  orderId?: string;
  startTime?: number;
  endTime?: number;
  limit?: number;
  ltOrderType?: LTOrderTypeV5;
  serialNo?: string;
}

export interface GetVIPMarginDataParamsV5 {
  vipLevel?: string;
  currency?: string;
}

export interface GetSpotMarginCurrencyDataParamsV5 {
  currency?: string;
}

// Spot Margin Trade (UTA) endpoints
export interface ManualBorrowParamsV5 {
  coin: string;
  amount: string;
}

export interface GetMaxBorrowableAmountParamsV5 {
  currency: string;
}

export interface GetPositionTiersParamsV5 {
  currency?: string;
}

export interface GetCoinStateParamsV5 {
  currency?: string;
}

export interface GetAvailableAmountToRepayParamsV5 {
  currency: string;
}

export interface SetSpotMarginLeverageParamsV5 {
  leverage: string;
  currency?: string;
}

export interface ManualRepayWithoutConversionParamsV5 {
  coin: string;
  amount?: string;
  /**
   * ALL: fixed + floating (floating first); FIXED: fixed only; FLEXIBLE: floating only. Default: FLEXIBLE.
   */
  repaymentType?: 'ALL' | 'FIXED' | 'FLEXIBLE';
}

export interface GetAutoRepayModeParamsV5 {
  currency?: string; // Coin name, uppercase only. If not passed, returns all currencies
}

export interface SetAutoRepayModeParamsV5 {
  currency?: string; // Coin name, uppercase only. If not passed, enables for all currencies
  autoRepayMode: '0' | '1'; // 0: Off, 1: On
}

export interface GetSpotMarginLiabilityInfoParamsV5 {
  currency: string;
}

export interface FixedRateBorrowParamsV5 {
  orderCurrency: string;
  orderAmount: string;
  /** e.g. 0.02 = 2% p.a. */
  annualRate: string;
  /** 7, 14, 30, 90, 180 (days) */
  term: string;
  /** 1: auto repayment; 2: transfer to flexible loan */
  repayType?: '1' | '2';
}

export interface GetFixedRateBorrowOrderInfoParamsV5 {
  orderId?: string;
  orderCurrency?: string;
  state?: string;
  term?: string;
  limit?: string;
  cursor?: string;
}

export interface GetFixedRateBorrowContractInfoParamsV5 {
  orderId?: string;
  orderCurrency?: string;
  term?: string;
  limit?: string;
  cursor?: string;
}

export interface GetFixedRateBorrowOrderQuoteParamsV5 {
  orderCurrency: string;
  term?: string;
  orderBy?: 'apy' | 'term' | 'quantity';
  sort?: 0 | 1;
  limit?: number;
}

export interface RenewFixedRateBorrowParamsV5 {
  loanId: string;
  qty?: string;
}
