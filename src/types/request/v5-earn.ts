export interface SubmitStakeRedeemParamsV5 {
  category: string;
  orderType: 'Stake' | 'Redeem';
  accountType: 'FUND' | 'UNIFIED';
  amount: string;
  coin: string;
  productId: string;
  orderLinkId: string;
  toAccountType?: 'FUND' | 'UNIFIED';
}

export interface GetEarnOrderHistoryParamsV5 {
  category: string;
  orderId?: string;
  orderLinkId?: string;
  productId?: string;
  startTime?: number;
  endTime?: number;
  limit?: number;
  cursor?: string;
}

export interface GetEarnPositionParamsV5 {
  category: string;
  productId?: string;
  coin?: string;
}

export interface GetEarnYieldHistoryParamsV5 {
  category: string;
  productId?: string;
  startTime?: number;
  endTime?: number;
  limit?: number;
  cursor?: string;
}

export interface GetEarnHourlyYieldHistoryParamsV5 {
  category: string;
  productId?: string;
  startTime?: number;
  endTime?: number;
  limit?: number;
  cursor?: string;
}

export interface ModifyEarnPositionParamsV5 {
  category: 'OnChain';
  productId: number;
  positionId: number;
  autoReinvest: 0 | 1;
}

export interface GetEarnAprHistoryParamsV5 {
  category: 'FlexibleSaving' | 'OnChain';
  productId: string;
  startTime?: number;
  endTime?: number;
}

/**
 * GET /v5/earn/advance/product — Advanced Earn: Dual Asset, Double Win, Smart Leverage, etc.
 * Public, no auth. Rate limit: 50 req/s per IP.
 */
export interface GetAdvanceEarnProductParamsV5 {
  category: 'DualAssets' | 'DoubleWin' | 'SmartLeverage' | 'DiscountBuy';
  coin?: string;
  /**
   * Product duration, e.g. 8h, 1d, 2d, 3d, 6d, 7d, 12d (depends on product).
   */
  duration?: string;
}
