export interface CollateralCoinV5 {
  collateralAccuracy: number;
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

// New Crypto Loan Types

export interface BorrowableCoinNewV5 {
  currency: string;
  fixedBorrowable: boolean;
  fixedBorrowingAccuracy: number;
  flexibleBorrowable: boolean;
  flexibleBorrowingAccuracy: number;
  maxBorrowingAmount: string;
  minFixedBorrowingAmount: string;
  minFlexibleBorrowingAmount: string;
  vipLevel: string;
  flexibleAnnualizedInterestRate: string;
  annualizedInterestRate7D: string;
  annualizedInterestRate14D: string;
  annualizedInterestRate30D: string;
  annualizedInterestRate60D: string;
  annualizedInterestRate90D: string;
  annualizedInterestRate180D: string;
}

export interface CollateralRatioV5 {
  collateralRatio: string;
  maxValue: string;
  minValue: string;
}

export interface CollateralRatioConfigV5 {
  collateralRatioList: CollateralRatioV5[];
  currencies: string;
}

export interface CurrencyLiquidationV5 {
  currency: string;
  liquidationOrder: number;
}

export interface CollateralDataNewV5 {
  collateralRatioConfigList: CollateralRatioConfigV5[];
  currencyLiquidationList: CurrencyLiquidationV5[];
}

export interface MaxCollateralAmountNewV5 {
  maxCollateralAmount: string;
}

// Additional New Crypto Loan Types

export interface AdjustCollateralAmountNewV5 {
  adjustId: number;
}

export interface CollateralAdjustmentHistoryNewV5 {
  adjustId: number;
  adjustTime: number;
  afterLTV: string;
  amount: string;
  collateralCurrency: string;
  direction: number;
  preLTV: string;
  status: number;
}

export interface BorrowListNewV5 {
  fixedTotalDebt: string;
  fixedTotalDebtUSD: string;
  flexibleHourlyInterestRate: string;
  flexibleTotalDebt: string;
  flexibleTotalDebtUSD: string;
  loanCurrency: string;
}

export interface CollateralListNewV5 {
  amount: string;
  amountUSD: string;
  currency: string;
  ltv: string;
}

export interface SupplyListNewV5 {
  amount: string;
  amountUSD: string;
  currency: string;
}

export interface CryptoLoanPositionNewV5 {
  borrowList: BorrowListNewV5[];
  collateralList: CollateralListNewV5[];
  supplyList: SupplyListNewV5[];
  totalCollateral: string;
  totalDebt: string;
  totalSupply: string;
}

// Flexible Loan Types

export interface BorrowFlexibleV5 {
  orderId: string;
}

export interface RepayFlexibleV5 {
  repayId: string;
}

export interface OngoingFlexibleLoanV5 {
  hourlyInterestRate: string;
  loanCurrency: string;
  totalDebt: string;
}

export interface BorrowHistoryFlexibleV5 {
  borrowTime: number;
  initialLoanAmount: string;
  loanCurrency: string;
  orderId: string;
  status: number;
}

export interface RepaymentHistoryFlexibleV5 {
  loanCurrency: string;
  repayAmount: string;
  repayId: string;
  repayStatus: number;
  repayTime: number;
  repayType: number;
}

// Fixed Loan Types

export interface SupplyOrderQuoteFixedV5 {
  orderCurrency: string;
  term: number;
  annualRate: string;
  qty: string;
}

export interface BorrowOrderQuoteFixedV5 {
  orderCurrency: string;
  term: number;
  annualRate: string;
  qty: string;
}

export interface CreateBorrowOrderFixedV5 {
  orderId: string;
}

export interface CreateSupplyOrderFixedV5 {
  orderId: string;
}

export interface BorrowContractInfoFixedV5 {
  annualRate: string;
  autoRepay: string;
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
}

export interface SupplyContractInfoFixedV5 {
  annualRate: string;
  supplyCurrency: string;
  supplyTime: string;
  supplyAmount: string;
  interestPaid: string;
  supplyId: string;
  orderId: string;
  redemptionTime: string;
  penaltyInterest: string;
  actualRedemptionTime: string;
  status: number;
  term: string;
}

export interface BorrowOrderInfoFixedV5 {
  annualRate: string;
  orderId: number;
  orderTime: string;
  filledQty: string;
  orderQty: string;
  orderCurrency: string;
  state: number;
  term: number;
}

export interface SupplyOrderInfoFixedV5 {
  annualRate: string;
  orderId: number;
  orderTime: string;
  filledQty: string;
  orderQty: string;
  orderCurrency: string;
  state: number;
  term: number;
}

export interface RepayFixedV5 {
  repayId: string;
}

export interface RepaymentHistoryFixedV5 {
  details: {
    loanCurrency: string;
    loanId: string;
    repayAmount: string;
  }[];
  loanCurrency: string;
  repayAmount: string;
  repayId: string;
  repayStatus: number;
  repayTime: number;
  repayType: number;
}
