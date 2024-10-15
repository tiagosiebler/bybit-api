export interface CollateralCoinV5 {
  collateralAccuracy: number;
  currency: string;
  initialLTV: string;
  liquidationLTV: string;
  marginCallLTV: string;
  maxLimit: string;
}

export interface VipCollateralCoinsV5 {
  list: CollateralCoinV5[];
  vipLevel: string;
}

export interface BorrowableCoinV5 {
  borrowingAccuracy: number;
  currency: string;
  flexibleHourlyInterestRate: string;
  hourlyInterestRate7D: string;
  hourlyInterestRate14D: string;
  hourlyInterestRate30D: string;
  hourlyInterestRate90D: string;
  hourlyInterestRate180D: string;
  maxBorrowingAmount: string;
  minBorrowingAmount: string;
}

export interface VipBorrowableCoinsV5 {
  list: BorrowableCoinV5[];
  vipLevel: string;
}

export interface AccountBorrowCollateralLimitV5 {
  collateralCurrency: string;
  loanCurrency: string;
  maxCollateralAmount: string;
  maxLoanAmount: string;
  minCollateralAmount: string;
  minLoanAmount: string;
}

export interface UnpaidLoanOrderV5 {
  collateralAmount: string;
  collateralCurrency: string;
  currentLTV: string;
  expirationTime: string;
  hourlyInterestRate: string;
  loanCurrency: string;
  loanTerm: string;
  orderId: string;
  residualInterest: string;
  residualPenaltyInterest: string;
  totalDebt: string;
}

export interface RepaymentHistoryV5 {
  collateralCurrency: string;
  collateralReturn: string;
  loanCurrency: string;
  loanTerm: string;
  orderId: string;
  repayAmount: string;
  repayId: string;
  repayStatus: number;
  repayTime: string;
  repayType: string;
}

export interface CompletedLoanOrderV5 {
  borrowTime: string;
  collateralCurrency: string;
  expirationTime: string;
  hourlyInterestRate: string;
  initialCollateralAmount: string;
  initialLoanAmount: string;
  loanCurrency: string;
  loanTerm: string;
  orderId: string;
  repaidInterest: string;
  repaidPenaltyInterest: string;
  status: number;
}
export interface LoanLTVAdjustmentHistoryV5 {
  collateralCurrency: string;
  orderId: string;
  adjustId: string;
  adjustTime: string;
  preLTV: string;
  afterLTV: string;
  direction: number;
  amount: string;
}
