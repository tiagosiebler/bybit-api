export interface BorrowCryptoLoanParamsV5 {
  loanCurrency: string;
  loanAmount?: string;
  loanTerm?: string;
  collateralCurrency: string;
  collateralAmount?: string;
}

export interface GetUnpaidLoanOrdersParamsV5 {
  orderId?: string;
  loanCurrency?: string;
  collateralCurrency?: string;
  loanTermType?: string;
  loanTerm?: string;
  limit?: string;
  cursor?: string;
}

export interface GetRepaymentHistoryParamsV5 {
  orderId?: string;
  repayId?: string;
  loanCurrency?: string;
  limit?: string;
  cursor?: string;
}

export interface GetCompletedLoanOrderHistoryParamsV5 {
  orderId?: string;
  loanCurrency?: string;
  collateralCurrency?: string;
  limit?: string;
  cursor?: string;
}

export interface GetLoanLTVAdjustmentHistoryParamsV5 {
  orderId?: string;
  adjustId?: string;
  collateralCurrency?: string;
  limit?: string;
  cursor?: string;
}

// New Crypto Loan Request Types

export interface GetBorrowableCoinsNewParamsV5 {
  vipLevel?: string;
  currency?: string;
}

export interface GetCollateralCoinsNewParamsV5 {
  currency?: string;
}

export interface GetMaxCollateralAmountNewParamsV5 {
  currency: string;
}

export interface AdjustCollateralAmountNewParamsV5 {
  currency: string;
  amount: string;
  direction: '0' | '1';
}

export interface GetCollateralAdjustmentHistoryNewParamsV5 {
  adjustId?: string;
  collateralCurrency?: string;
  limit?: string;
  cursor?: string;
}

// Flexible Loan Request Types

export interface BorrowFlexibleParamsV5 {
  loanCurrency: string;
  loanAmount: string;
  collateralList?: {
    currency: string;
    amount: string;
  }[];
}

export interface RepayFlexibleParamsV5 {
  loanCurrency: string;
  amount: string;
}

export interface GetOngoingFlexibleLoansParamsV5 {
  loanCurrency?: string;
}

export interface GetBorrowHistoryFlexibleParamsV5 {
  orderId?: string;
  loanCurrency?: string;
  limit?: string;
  cursor?: string;
}

export interface GetRepaymentHistoryFlexibleParamsV5 {
  repayId?: string;
  loanCurrency?: string;
  limit?: string;
  cursor?: string;
}
