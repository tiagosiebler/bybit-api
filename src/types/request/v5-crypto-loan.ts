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
