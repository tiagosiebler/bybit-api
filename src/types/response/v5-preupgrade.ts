export interface PreUpgradeTransaction {
  symbol: string;
  category: string;
  side: 'Buy' | 'Sell' | 'None';
  transactionTime: string;
  type: string;
  qty: string;
  size: string;
  currency: 'USDC' | 'USDT' | 'BTC' | 'ETH';
  tradePrice: string;
  funding: string;
  fee: string;
  cashFlow: string;
  change: string;
  cashBalance: string;
  feeRate: string;
  bonusChange: string;
  tradeId: string;
  orderId: string;
  orderLinkId: string;
}

export interface PreUpgradeOptionsDelivery {
  deliveryTime: number;
  symbol: string;
  side: 'Buy' | 'Sell';
  position: string;
  deliveryPrice: string;
  strike: string;
  fee: string;
  deliveryRpl: string;
}

export interface PreUpgradeUSDCSessionSettlement {
  symbol: string;
  side: 'Buy' | 'Sell';
  size: string;
  sessionAvgPrice: string;
  markPrice: string;
  realisedPnl: string;
  createdTime: string;
}
