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
  id?: string;
  status?: string;
  orderId?: string;
  estimateRedeemTime?: string;
  estimateStakeTime?: string;
  estimateInterestCalculationTime?: string;
  settlementTime?: string;
  autoReinvest?: string;
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

export interface EarnAprHistoryPointV5 {
  timestamp: string;
  apr: string;
}

/**
 * Advanced Earn — Dual Asset product (GET /v5/earn/advance/product).
 */
export interface AdvanceEarnDualAssetProductV5 {
  category: string;
  productId: string;
  baseCoin: string;
  quoteCoin: string;
  expectReceiveAt: string;
  duration: string;
  status: 'Available' | 'NotAvailable';
  isVipProduct: boolean;
  subscribeStartAt: string;
  subscribeEndAt: string;
  applyStartAt: string;
  settlementTime: string;
  minPurchaseQuoteAmount: string;
  minPurchaseBaseAmount: string;
  remainingAmountQuote: string;
  remainingAmountBase: string;
  orderPrecisionDigitalQuote: number;
  orderPrecisionDigitalBase: number;
}

export interface AdvanceEarnDualAssetProductInfoV5 {
  category: string;
  list: AdvanceEarnDualAssetProductV5[];
}

/**
 * Advanced Earn — Double Win (GET /v5/earn/advance/product?category=DoubleWin).
 */
export interface AdvanceEarnDoubleWinProductV5 {
  category: string;
  productId: string;
  investCoin: string;
  underlyingAsset: string;
  duration: string;
  subscribeStartAt: string;
  subscribeEndAt: string;
  settlementTime: string;
  expectReceiveAt: string;
  minPurchaseAmount: string;
  orderPrecisionDigital: number;
  isRfqProduct: boolean;
  lowerPriceBuffer: string;
  upperPriceBuffer: string;
  minDeviationRatio: string;
  maxDeviationRatio: string;
  priceTickSize: string;
}

/**
 * Advanced Earn — Smart Leverage (GET /v5/earn/advance/product?category=SmartLeverage).
 */
export interface AdvanceEarnSmartLeverageProductV5 {
  category: string;
  productId: string;
  investCoin: string;
  underlyingAsset: string;
  direction: 'Long' | 'Short';
  leverage: string;
  duration: string;
  subscribeStartAt: string;
  subscribeEndAt: string;
  settlementTime: string;
  expectReceiveAt: string;
  minPurchaseAmount: string;
  remainingAmount: string;
  orderPrecisionDigital: number;
}

/**
 * Advanced Earn — Discount Buy (GET /v5/earn/advance/product?category=DiscountBuy).
 */
export interface AdvanceEarnDiscountBuyProductV5 {
  category: string;
  productId: string;
  coin: string;
  underlyingAsset: string;
  settlementTime: string;
  duration: string;
  isVipProduct: boolean;
  subscribeStartAt: string;
  subscribeEndAt: string;
  minPurchaseAmount: string;
  remainingAmount: string;
  orderPrecisionDigital: number;
  expectReceiveAt: string;
}

export type AdvanceEarnAdvanceProductListItemV5 =
  | AdvanceEarnDualAssetProductV5
  | AdvanceEarnDoubleWinProductV5
  | AdvanceEarnSmartLeverageProductV5
  | AdvanceEarnDiscountBuyProductV5;

export interface AdvanceEarnAdvanceProductInfoV5 {
  category: string;
  list: AdvanceEarnAdvanceProductListItemV5[];
}
