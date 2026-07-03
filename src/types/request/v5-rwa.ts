/**
 * V5 RWA (Real World Assets) earn requests.
 */

export interface GetRWAProductListParamsV5 {
  coin?: string;
}

export interface PlaceRWAOrderParamsV5 {
  productId: number;
  orderType: 'Stake' | 'Redeem';
  coin: string;
  orderLinkId: string;
  stakeAmount?: string;
  redeemShares?: string;
  accountType?: 'FUND' | 'UNIFIED';
}

export interface GetRWAOrderListParamsV5 {
  orderId?: string;
  orderLinkId?: string;
  orderType?: 'Stake' | 'Redeem';
  productId?: number;
  startTime?: number;
  endTime?: number;
  limit?: number;
  cursor?: string;
}

export interface GetRWANavChartParamsV5 {
  productId: number;
  startTime?: number;
  endTime?: number;
}
