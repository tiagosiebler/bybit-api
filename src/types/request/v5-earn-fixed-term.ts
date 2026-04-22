/**
 * /v5/earn/fixed-term/*
 */
export interface GetFixedTermEarnProductParamsV5 {
  coin?: string;
}

export interface SubmitFixedTermEarnOrderParamsV5 {
  productId: string;
  category: 'FixedTermSaving' | 'FundPool' | 'FundPoolPremium';
  coin: string;
  amount: string;
  accountType: 'FUND' | 'UNIFIED';
  orderLinkId: string;
  autoInvest?: boolean;
}

export interface RedeemFixedTermEarnParamsV5 {
  productId: string;
  /** Early redemption: FundPool only */
  category: 'FundPool';
  positionId: string;
}

export interface GetFixedTermEarnPositionParamsV5 {
  productId?: string;
  category?: 'FixedTermSaving' | 'FundPool' | 'FundPoolPremium';
  coin?: string;
}

export interface GetFixedTermEarnOrderListParamsV5 {
  orderType?: 'Stake' | 'Redeem' | 'Reinvest';
  productId?: string;
  category?: 'FixedTermSaving' | 'FundPool' | 'FundPoolPremium';
  orderId?: string;
  startTime?: number;
  endTime?: number;
  limit?: number;
  cursor?: string;
}

export interface SetFixedTermEarnAutoInvestParamsV5 {
  productId: string;
  category: 'FixedTermSaving' | 'FundPool' | 'FundPoolPremium';
  positionId: string;
  status: 'Enable' | 'Disable';
}
