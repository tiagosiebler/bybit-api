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
