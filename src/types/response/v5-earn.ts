export interface EarnProductV5 {
  category: string;
  estimateApr: string;
  coin: string;
  minStakeAmount: string;
  maxStakeAmount: string;
  precision: string;
  productId: string;
  status: 'Available' | 'NotAvailable';
}

export interface EarnOrderHistoryV5 {
  coin: string;
  orderValue: string;
  orderType: 'Redeem' | 'Stake';
  orderId: string;
  orderLinkId: string;
  status: 'Success' | 'Fail' | 'Pending';
  createdAt: string;
  productId: string;
  updatedAt: string;
  swapOrderValue: string;
  estimateRedeemTime: string;
  estimateStakeTime: string;
}

export interface EarnPositionV5 {
  coin: string;
  productId: string;
  amount: string;
  totalPnl: string;
  claimableYield: string;
}

export interface EarnYieldHistoryV5 {
  productId: string;
  coin: string;
  id: string;
  amount: string;
  yieldType: string;
  distributionMode: string;
  effectiveStakingAmount: string;
  orderId: string;
  status: 'Pending' | 'Success' | 'Fail';
  createdAt: string;
}

export interface EarnHourlyYieldHistoryV5 {
  productId: string;
  coin: string;
  id: string;
  amount: string;
  effectiveStakingAmount: string;
  status: 'Pending' | 'Success' | 'Fail';
  hourlyDate: string;
  createdAt: string;
}
