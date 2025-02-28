export interface SubmitStakeRedeemParams {
  category: string;
  orderType: 'Stake' | 'Redeem';
  accountType: 'FUND' | 'UNIFIED';
  amount: string;
  coin: string;
  productId: string;
  orderLinkId: string;
}

export interface GetEarnOrderHistoryParams {
  category: string;
  orderId?: string;
  orderLinkId?: string;
}

export interface GetEarnPositionParams {
  category: string;
  productId?: string;
  coin?: string;
}
