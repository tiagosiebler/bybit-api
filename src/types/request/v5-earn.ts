export interface SubmitStakeRedeemParamsV5 {
  category: string;
  orderType: 'Stake' | 'Redeem';
  accountType: 'FUND' | 'UNIFIED';
  amount: string;
  coin: string;
  productId: string;
  orderLinkId: string;
}

export interface GetEarnOrderHistoryParamsV5 {
  category: string;
  orderId?: string;
  orderLinkId?: string;
}

export interface GetEarnPositionParamsV5 {
  category: string;
  productId?: string;
  coin?: string;
}
