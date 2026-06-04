export interface PwmCoinAmountV5 {
  coin: string;
  amount: string;
}

export interface PwmMultiCoinsEarningPositionItemV5 {
  category: string;
  productId: string;
  coin: string;
  currentAmount: string;
  accumulateYield: string;
  apr: string;
  positionId: string;
  status?: string;
}

export interface PwmMultiCoinsEarningPositionsV5 {
  totalInvestmentUsd: string;
  accumulateYieldUsd: string;
  weightedAvgApr: string;
  items: PwmMultiCoinsEarningPositionItemV5[];
}

export interface PwmFixedYieldPositionItemV5 {
  category: string;
  productId: string;
  coin: string;
  currentAmount: string;
  accumulateYield: string;
  apr: string;
  duration: number;
  maturityTime: string;
  autoReinvest: boolean;
  positionId: string;
  status?: string;
}

export interface PwmFixedYieldPositionsV5 {
  totalInvestmentUsd: string;
  accumulateYieldUsd: string;
  weightedAvgApr: string;
  items: PwmFixedYieldPositionItemV5[];
}

export interface PwmEquityFundPositionItemV5 {
  category: string;
  productId: string;
  fundName: string;
  coin: string;
  tags: string[];
  nav: string;
  userShares: string;
  shareValue: string;
  holdingValue: string;
  accumulateYield: string;
  apr30d: string;
  aprTotal: string;
  sharpRatio: string;
  maxDrawdown: string;
  createdTime: string;
  runningDays: number;
  positionId?: string;
  status?: string;
}

export interface PwmEquityFundsPositionsV5 {
  totalInvestmentUsd: string;
  accumulateYieldUsd: string;
  weightedAvgApr: string;
  items: PwmEquityFundPositionItemV5[];
}

export interface PwmOnchainEarnPositionItemV5 {
  category: string;
  productId: string;
  coin: string;
  stakeAmount: string;
  apr: string;
  positionId: string;
  status?: string;
}

export interface PwmOnchainEarnPositionsV5 {
  totalInvestmentUsd: string;
  accumulateYieldUsd: string;
  items: PwmOnchainEarnPositionItemV5[];
}

export interface PwmInvestmentPlanPositionsV5 {
  multiCoinsEarning?: PwmMultiCoinsEarningPositionsV5;
  fixedYield?: PwmFixedYieldPositionsV5;
  equityFunds?: PwmEquityFundsPositionsV5;
  onchainEarn?: PwmOnchainEarnPositionsV5;
  fundingAccount?: PwmCoinAmountV5[];
}

/** GET /v5/earn/pwm/investment-plan/list */
export interface PwmInvestmentPlanSummaryV5 {
  planId: string;
  planName: string;
  planType: string;
  status: string;
  currentAssetUsd?: string;
  accumulateYieldUsd?: string;
  weightedAvgApr?: string;
  createdTime?: string;
}

export interface PwmInvestmentPlanListResultV5 {
  list: PwmInvestmentPlanSummaryV5[];
}

/** GET /v5/earn/pwm/investment-plan/detail */
export interface PwmInvestmentPlanDetailV5 {
  planId: string;
  planName: string;
  planType: string;
  status: string;
  currentAssetUsd: string;
  accumulateYieldUsd: string;
  weightedAvgApr: string;
  currentAssets: PwmCoinAmountV5[];
  positions: PwmInvestmentPlanPositionsV5;
  createdTime: string;
}

export interface PwmEquityFundIntroductionV5 {
  description: string;
  historicalYieldRateMax: string;
  historicalYieldRateMin: string;
  sharpRatio: string;
  maxDrawback: string;
  lockupPeriod: string;
}

export interface PwmPendingMultiCoinsEarningItemV5 {
  category: string;
  productId: string;
  coin: string;
  configuredAmount: string;
  apr: string;
}

export interface PwmPendingFixedYieldItemV5 {
  category: string;
  productId: string;
  coin: string;
  configuredAmount: string;
  apr: string;
  duration: number;
}

export interface PwmPendingEquityFundItemV5 {
  category: string;
  productId: string;
  fundName: string;
  coin: string;
  configuredAmount: string;
  tags: string[];
  introduction: PwmEquityFundIntroductionV5;
}

export interface PwmPendingOnchainEarnItemV5 {
  category: string;
  productId: string;
  coin: string;
  configuredAmount: string;
  apr: string;
}

export interface PwmPendingInvestmentPlanProductsV5 {
  multiCoinsEarning?: {
    configuredAmountUsd: string;
    items: PwmPendingMultiCoinsEarningItemV5[];
  };
  fixedYield?: {
    configuredAmountUsd: string;
    items: PwmPendingFixedYieldItemV5[];
  };
  equityFunds?: {
    configuredAmountUsd: string;
    items: PwmPendingEquityFundItemV5[];
  };
  onchainEarn?: {
    configuredAmountUsd: string;
    items: PwmPendingOnchainEarnItemV5[];
  };
}

/** GET /v5/earn/pwm/investment-plan/new-plan */
export interface PwmPendingInvestmentPlanDetailV5 {
  planId: string;
  planName: string;
  planType: string;
  status: string;
  source: string;
  totalConfiguredAmountUsd: string;
  products: PwmPendingInvestmentPlanProductsV5;
  createdTime: string;
}

/** POST /v5/earn/pwm/investment-plan/claim */
export interface ClaimPwmWithdrawableFundsResultV5 {
  planId: string;
  toAccountType: number;
  status: string;
  createdTime: string;
}

export interface PwmAssetTrendDataPointV5 {
  date: string;
  assetValueUsd: string;
}

/** GET /v5/earn/pwm/investment-plan/asset-trend */
export interface PwmInvestmentPlanAssetTrendResultV5 {
  planId: string;
  dataPoints: PwmAssetTrendDataPointV5[];
}

export interface PwmFundNavDataPointV5 {
  date: string;
  nav: string;
}

/** GET /v5/earn/pwm/investment-plan/fund-nav */
export interface PwmFundHistoricalNavResultV5 {
  fundId: string;
  fundName: string;
  coin: string;
  currentNav: string;
  dataPoints: PwmFundNavDataPointV5[];
}

/** POST /v5/earn/pwm/investment-plan/subscribe */
export interface SubscribePwmInvestmentPlanResultV5 {
  planId: string;
  status: string;
  orderLinkId: string;
}

/** POST /v5/earn/pwm/investment-plan/invest-more */
export interface InvestMorePwmInvestmentPlanResultV5 {
  planId: string;
  category: string;
  productId: string;
  coin: string;
  amount: string;
  status: string;
  orderLinkId: string;
  orderId: string;
}

/** POST /v5/earn/pwm/investment-plan/redeem */
export interface RedeemPwmInvestmentPlanResultV5 {
  orderId: string;
  planId: string;
  category: string;
  productId: string;
  shares?: string;
  amount?: string;
  estimatedAmount?: string;
  coin: string;
  status: string;
  orderLinkId: string;
}

/** GET /v5/earn/pwm/investment-plan/order */
export interface PwmInvestmentPlanOrderV5 {
  orderId: string;
  planId: string;
  type: string;
  accountType: string;
  coin: string;
  amount: string;
  category: string;
  productId: string;
  status: string;
  orderTime: string;
}

export interface PwmInvestmentPlanOrdersResultV5 {
  list: PwmInvestmentPlanOrderV5[];
  nextPageCursor: string;
}

/** GET /v5/earn/pwm/customize-plan/product */
export interface PwmSubscribableProductCardV5 {
  category: string;
  productId?: string;
  fundName?: string;
  coin: string;
  apr?: string;
  aprRangeLow?: string;
  aprRangeHigh?: string;
  tags?: string[];
  introduction?: string;
  aum?: string;
  minInvestmentAmount?: string;
  maxInvestmentAmount?: string;
  duration?: number;
  maxDrawdown?: string;
  sharpRatio?: string;
  estAPR?: string;
}

export interface PwmSubscribableProductGroupV5 {
  type: string;
  cards: PwmSubscribableProductCardV5[];
}

export interface PwmSubscribableProductInfoResultV5 {
  products: PwmSubscribableProductGroupV5[];
}

/** POST /v5/earn/pwm/customize-plan/create */
export interface CreatePwmCustomizeInvestmentPlanResultV5 {
  planId: string;
  planName: string;
  status: string;
  orderLinkId?: string;
}

/** GET /v5/earn/pwm/asset-manager/all-funds */
export interface PwmAssetManagerFundV5 {
  fundId: string;
  fundName: string;
  coin: string;
  status: string;
  totalEquity: string;
  totalShares: string;
  currentNav: string;
  currentAPR?: string;
  accountUid: string;
  subAccountList: string[];
  profitShareRate: string;
  managementFeeRate: string;
  uncollectedProfit: string;
  collectedProfit: string;
  totalLoan: string;
  createdTime: string;
}

export interface PwmAllFundsResultV5 {
  list: PwmAssetManagerFundV5[];
  nextPageCursor: string;
}

/** POST /v5/earn/pwm/asset-manager/settle-profit */
export interface SettlePwmFundProfitResultV5 {
  fundId: string;
  status: string;
  totalProfitShared: string;
  instIncome: string;
  coin: string;
  createdTime: string;
}

/** POST /v5/earn/pwm/asset-manager/create-fund */
export interface CreatePwmFundResultV5 {
  fundId: string;
  fundName: string;
  coin: string;
  status: string;
  profitShareRate: string;
  managementFeeRate: string;
  accountUid: string;
  createdTime: string;
}

/** POST /v5/earn/pwm/asset-manager/create-investment-plan */
export interface CreatePwmAssetManagerInvestmentPlanResultV5 {
  planId: string;
  planType: string;
  accountUid: string;
  status: string;
  createdTime: string;
}

/** GET /v5/earn/pwm/asset-manager/get-investment-plan */
export interface PwmAssetManagerInvestmentPlanDistributionV5 {
  category: string;
  coin: string;
  productId: string;
  currentAmount: string;
}

export interface PwmAssetManagerInvestmentPlanV5 {
  planId: string;
  planName: string;
  planType: string;
  subscriptionUid: string;
  status: string;
  source: string;
  currentAssetUsd: string;
  accumulateYieldUsd: string;
  investmentDistribution: PwmAssetManagerInvestmentPlanDistributionV5[];
  createdTime: string;
}

export interface PwmAssetManagerInvestmentPlansResultV5 {
  list: PwmAssetManagerInvestmentPlanV5[];
  nextPageCursor: string;
}

/** POST /v5/earn/pwm/asset-manager/manage-investment-plan */
export interface ManagePwmAssetManagerInvestmentPlanFundResultV5 {
  fundId: string;
  amount: string;
}

export interface ManagePwmAssetManagerInvestmentPlanResultV5 {
  planId: string;
  status: string;
  updatedTime: string;
  updateFunds: ManagePwmAssetManagerInvestmentPlanFundResultV5[];
}

/** GET /v5/earn/pwm/asset-manager/all-order */
export interface PwmAssetManagerFundOrderV5 {
  orderId: string;
  fundId: string;
  fundName: string;
  accountUid: string;
  orderType: string;
  coin: string;
  amount: string;
  shares: string;
  status: string;
  createdTime: string;
}

export interface PwmAllFundOrdersResultV5 {
  list: PwmAssetManagerFundOrderV5[];
  nextPageCursor: string;
}

/** POST /v5/earn/pwm/asset-manager/manage-order */
export interface ManagePwmFundOrderResultV5 {
  orderId: string;
  fundId: string;
  accountUid: string;
  orderStatus: string;
  orderType: string;
  action: string;
  coin: string;
  amount: string;
  shares: string;
  updatedTime: string;
}

/** POST /v5/earn/pwm/asset-manager/create-sub-account */
export interface CreatePwmFundSubAccountResultV5 {
  fundId: string;
  subAccountUid: string;
  createdTime: string;
  status: string;
}

/** POST /v5/earn/pwm/fund-transfer */
export interface PwmFundTransferResultV5 {
  transferId: string;
  status: string;
}

/** GET /v5/earn/pwm/query-fund-transfer-result */
export interface PwmFundTransferRecordV5 {
  transferId: string;
  status: string;
  fromUserId: number;
  toUserId: number;
  amount: string;
  coin: string;
}
