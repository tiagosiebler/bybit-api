export interface EarnProduct {
  category: string;
  estimateApr: string;
  coin: string;
  minStakeAmount: string;
  maxStakeAmount: string;
  precision: string;
  productId: string;
  status: 'Available' | 'NotAvailable';
}

export interface EarnOrderHistory {
  coin: string;
  orderValue: string;
  orderType: 'Redeem' | 'Stake';
  orderId: string;
  orderLinkId: string;
  status: 'Success' | 'Fail' | 'Pending';
  createdAt: string;
  productId: string;
  updatedAt: string;
}

export interface EarnPosition {
  coin: string;
  productId: string;
  amount: string;
  totalPnl: string;
  claimableYield: string;
}
