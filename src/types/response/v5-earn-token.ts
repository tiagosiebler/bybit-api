/**
 * Earn token product (e.g. BYUSDT) — /v5/earn/token/*
 */

export interface EarnTokenProductV5 {
  productId: string;
  coin: string;
  mintFeeRateE8: string;
  redeemFeeRateE8: string;
  minInvestment: string;
  userHolding: string;
  leftQuota: string;
  canMint: boolean;
  savingsBalance: string;
  aprE8: string;
  bonusAprE8: string;
  bonusMaxAmount: string;
  baseCoinPrecision: number;
  tokenPrecision: number;
}

export interface PlaceEarnTokenOrderResultV5 {
  orderId: string;
  orderLinkId: string;
}

export interface EarnTokenOrderV5 {
  orderId: string;
  orderLinkId: string;
  orderType: 'Mint' | 'Redeem';
  fromCoin: string;
  toCoin: string;
  fromAmount: string;
  toAmount: string;
  serviceFee: string;
  status: 'Success' | 'Processing' | 'Fail';
  createdTime: string;
}

export interface EarnTokenPositionV5 {
  totalAmount: string;
  totalYield: string;
  yesterdayYield: string;
  aprE8: number;
  bonusAprE8: number;
  bonusMaxAmount: string;
  hasQuota: boolean;
}

export interface EarnTokenDailyYieldRecordV5 {
  yield: string;
  bonusYield: string;
  status: 'Success' | 'Processing';
  createdTime: string;
}

export interface EarnTokenHourlyYieldRecordV5 {
  effectiveAmount: string;
  yield: string;
  rewardType: 0 | 1;
  aprE8: string;
  hourlyDate: string;
  createdTime: string;
}

export interface EarnTokenHistoryAprPointV5 {
  timestamp: string;
  aprE8: string;
}
