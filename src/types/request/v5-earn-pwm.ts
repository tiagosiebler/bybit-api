/** GET /v5/earn/pwm/investment-plan/detail */
export interface GetPwmInvestmentPlanDetailParamsV5 {
  planId: string;
}

/** GET /v5/earn/pwm/investment-plan/new-plan */
export interface GetPwmPendingInvestmentPlanDetailParamsV5 {
  planId: string;
}

/** POST /v5/earn/pwm/investment-plan/claim */
export interface ClaimPwmWithdrawableFundsParamsV5 {
  planId: string;
  /** Default: FUND */
  toAccountType?: string;
  orderLinkId: string;
}

/** GET /v5/earn/pwm/investment-plan/asset-trend */
export interface GetPwmInvestmentPlanAssetTrendParamsV5 {
  planId: string;
  startTime?: number;
  endTime?: number;
}

/** GET /v5/earn/pwm/investment-plan/fund-nav */
export interface GetPwmFundHistoricalNavParamsV5 {
  fundId: string;
  startTime?: number;
  endTime?: number;
}

/** POST /v5/earn/pwm/investment-plan/subscribe */
export interface SubscribePwmInvestmentPlanParamsV5 {
  planId: string;
  /** Default: FUND */
  accountType?: string;
  orderLinkId: string;
}

/** POST /v5/earn/pwm/investment-plan/invest-more */
export interface InvestMorePwmInvestmentPlanParamsV5 {
  planId: string;
  /** Default: FUND */
  accountType?: string;
  category: string;
  productId: string;
  amount: string;
  orderLinkId: string;
}

/** POST /v5/earn/pwm/investment-plan/redeem */
export interface RedeemPwmInvestmentPlanParamsV5 {
  planId: string;
  category: string;
  productId: string;
  orderLinkId: string;
  /** Required for fund products */
  shares?: string;
  /** Required for non-fund products */
  amount?: string;
  /** Required for FundPool and On-chain Earn */
  positionId?: string;
}

/** GET /v5/earn/pwm/investment-plan/order */
export interface GetPwmInvestmentPlanOrdersParamsV5 {
  planId?: string;
  category?: string;
  type?: 'Subscribe' | 'Redeem' | 'AutoReinvest' | string;
  status?: 'Completed' | 'Pending' | 'Failed' | string;
  startTime?: string;
  endTime?: string;
  limit?: number;
  cursor?: string;
  orderLinkId?: string;
}

/** POST /v5/earn/pwm/customize-plan/create */
export interface CreatePwmCustomizeInvestmentPlanProductV5 {
  category: string;
  productId: string;
  fundName: string;
  amount: string;
}

export interface CreatePwmCustomizeInvestmentPlanParamsV5 {
  accountType?: string;
  products: CreatePwmCustomizeInvestmentPlanProductV5[];
}

/** GET /v5/earn/pwm/asset-manager/all-funds */
export interface GetPwmAllFundsParamsV5 {
  coin?: string;
  fundId?: string;
  status?: string;
  limit?: number;
  cursor?: string;
}

/** POST /v5/earn/pwm/asset-manager/settle-profit */
export interface SettlePwmFundProfitParamsV5 {
  fundId: string;
  reqLinkId: string;
}

/** POST /v5/earn/pwm/asset-manager/create-fund */
export interface CreatePwmFundParamsV5 {
  fundName: string;
  coin: string;
  profitShareRate: string;
  managementFeeRate: string;
  fundIntroduction?: string;
  reqLinkId: string;
}

/** POST /v5/earn/pwm/asset-manager/create-investment-plan */
export interface CreatePwmAssetManagerInvestmentPlanDistributionV5 {
  productId: string;
  amount: string;
}

export interface CreatePwmAssetManagerInvestmentPlanParamsV5 {
  accountUid: string;
  planName: string;
  planType: 'stable' | 'advanced' | string;
  investmentDistribution: CreatePwmAssetManagerInvestmentPlanDistributionV5[];
  reqLinkId: string;
}

/** GET /v5/earn/pwm/asset-manager/get-investment-plan */
export interface GetPwmAssetManagerInvestmentPlansParamsV5 {
  planId?: string;
  status?: string;
  subscriptionUid?: string;
  limit?: number;
  cursor?: string;
}

/** POST /v5/earn/pwm/asset-manager/manage-investment-plan */
export interface ManagePwmAssetManagerInvestmentPlanFundV5 {
  fundId: string;
  amount: string;
}

export interface ManagePwmAssetManagerInvestmentPlanParamsV5 {
  planId: string;
  updateStatus?: 'Closed' | 'Deleted' | string;
  updateFunds?: ManagePwmAssetManagerInvestmentPlanFundV5[];
  reqLinkId: string;
}

/** GET /v5/earn/pwm/asset-manager/all-order */
export interface GetPwmAllFundOrdersParamsV5 {
  fundId?: string;
  orderType?: 'Subscribe' | 'Redeem' | string;
  status?: string;
  startTime?: number;
  endTime?: number;
  limit?: number;
  cursor?: string;
}

/** POST /v5/earn/pwm/asset-manager/manage-order */
export interface ManagePwmFundOrderParamsV5 {
  orderId: string;
  action: 'approve' | 'reject' | string;
  reqLinkId: string;
}

/** POST /v5/earn/pwm/asset-manager/create-sub-account */
export interface CreatePwmFundSubAccountParamsV5 {
  fundId: string;
  reqLinkId: string;
}

/** POST /v5/earn/pwm/fund-transfer */
export interface PwmFundTransferParamsV5 {
  transferId: string;
  fromUserId: number;
  toUserId: number;
  amount: string;
  coin: string;
}

/** GET /v5/earn/pwm/query-fund-transfer-result */
export interface GetPwmFundTransferRecordsParamsV5 {
  transferId?: string;
  fromUserId?: number;
}
