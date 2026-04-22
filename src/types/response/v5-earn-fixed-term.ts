export interface FixedTermEarnTieredApyV5 {
  min: string;
  max: string;
  apy: string;
}

export interface FixedTermEarnInterestCoinApyV5 {
  coin: string;
  apy: string;
  expectUnitEarning: string;
  currentPrice: string;
}

export interface FixedTermEarnProductV5 {
  productId: string;
  category: 'FixedTermSaving' | 'FundPool' | 'FundPoolPremium' | string;
  coin: string;
  duration: string;
  status: 'Available' | 'SoldOut' | 'NotStarted' | string;
  tieredApyList: FixedTermEarnTieredApyV5[];
  minStakeAmount: string;
  maxStakeAmount: string;
  precision: number;
  subscribeStartAt: string;
  subscribeEndAt: string;
  allowEarlyRedemption: boolean;
  earlyRedemptionApy: string;
  redemptionLimitDuration: string;
  allowAutoReinvest: boolean;
  interestCoinApyList: FixedTermEarnInterestCoinApyV5[];
  isVip: boolean;
  creditTime: string;
  specialUserGroupRequired: boolean;
  specialUserGroupInfo: string;
}

export interface FixedTermEarnProductListV5 {
  list: FixedTermEarnProductV5[];
}

export interface FixedTermEarnPlaceOrderResultV5 {
  orderId: string;
  orderLinkId: string;
}

export interface RedeemFixedTermEarnResultV5 {
  redeemAmount: string;
  estEarnings: string;
}

export interface FixedTermEarnEarlyRedeemInfoV5 {
  allowEarlyRedeem: boolean;
  earlyRedeemEarning: string;
  returnCoin: string;
  redemptionLimitDuration: string;
}

export interface FixedTermEarnPositionInterestV5 {
  coin: string;
  apy: string;
  expectReturnEarning: string;
  price: string;
}

export interface FixedTermEarnPositionV5 {
  positionId: string;
  productId: string;
  category: string;
  coin: string;
  amount: string;
  effectiveAmount: string;
  duration: string;
  status: string;
  settlementTime: string;
  createdAt: string;
  orderId: string;
  earlyRedeemInfo: FixedTermEarnEarlyRedeemInfoV5 | null;
  allowAutoReinvest: boolean;
  autoReinvest: string;
  interestCoinApyList: FixedTermEarnPositionInterestV5[];
}

export interface FixedTermEarnPositionListV5 {
  list: FixedTermEarnPositionV5[];
}

export interface FixedTermEarnOrderYieldInfoV5 {
  coin: string;
  amount: string;
  status: string;
  createdAt: string;
  apy: string;
}

export interface FixedTermEarnOrderV5 {
  orderId: string;
  orderLinkId: string;
  orderType: string;
  status: string;
  productId: string;
  category: string;
  coin: string;
  amount: string;
  duration: string;
  accountType: string;
  settlementTime: string;
  createdAt: string;
  yieldInfoList: FixedTermEarnOrderYieldInfoV5[];
}

export interface FixedTermEarnOrderListV5 {
  list: FixedTermEarnOrderV5[];
  nextPageCursor: string;
}
