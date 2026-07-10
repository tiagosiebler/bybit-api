/**
 * V5 RWA (Real World Assets) earn responses.
 */

export interface RWAProductV5 {
  productId: number;
  coin: string;
  assetSymbol: string;
  manager: string;
  baseApr: string;
  bonusApr: string;
  savingType: 'Flexible' | 'Fixed' | string;
  duration: number;
  nav: string;
  minStakeAmount: string;
  maxStakeAmount: string;
  userMaxAmount: string;
  userQuota: string;
  minRedeemShare: string;
  redeemFeeRate: string;
  subscriptionFee: string;
  extLink: string;
  amountPrecision: number;
  sharePrecision: number;
}

export interface RWAProductListResultV5 {
  list: RWAProductV5[];
}

export interface PlaceRWAOrderResultV5 {
  orderId: string;
  orderLinkId: string;
}

export interface RWAPositionV5 {
  productId: number;
  coin: string;
  assetSymbol: string;
  effectiveShare: string;
  processingStakeAmount: string;
  processingRedeemShare: string;
  bonusEarned: string;
  nav: string;
  holdAmount: string;
  duration: number;
}

export interface RWAPositionListResultV5 {
  list: RWAPositionV5[];
}

export interface RWAOrderV5 {
  orderId: string;
  orderLinkId: string;
  orderType: 'Stake' | 'Redeem';
  productId: number;
  coin: string;
  stakeAmount?: string;
  redeemShares?: string;
  status: 'Processing' | 'Success' | 'Failed' | string;
  accountType: 'FUND' | 'UNIFIED' | string;
  createdTime: number;
  updatedTime: number;
  settledShares?: string;
  settledAmount?: string;
}

export interface RWAOrderListResultV5 {
  list: RWAOrderV5[];
  nextPageCursor: string;
}

export interface RWANavChartPointV5 {
  date: string;
  nav: string;
}

export interface RWANavChartResultV5 {
  productId: number;
  list: RWANavChartPointV5[];
}
