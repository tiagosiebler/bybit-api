export interface AdvanceEarnDiscountBuyOfferV5 {
  productId: string;
  currentPrice: string;
  purchasePrice: string;
  knockoutPrice: string;
  knockoutCouponE8: string;
  maxInvestmentAmount: string;
  instUid: string;
  expiredAt: string;
  category: string;
}

/** GET /v5/earn/advance/product-extra-info?category=DiscountBuy */
export interface AdvanceEarnProductExtraInfoDiscountBuyV5 {
  offers: AdvanceEarnDiscountBuyOfferV5[];
}

export interface AdvanceEarnDualAssetQuoteLevelV5 {
  selectPrice: string;
  apyE8: string;
  maxInvestmentAmount: string;
  expiredAt: string;
}

export interface AdvanceEarnDualAssetQuoteProductV5 {
  productId: string;
  currentPrice: string;
  buyLowPrice: AdvanceEarnDualAssetQuoteLevelV5[];
  sellHighPrice: AdvanceEarnDualAssetQuoteLevelV5[];
}

/** GET /v5/earn/advance/product-extra-info?category=DualAssets&productId= */
export interface AdvanceEarnProductExtraInfoDualAssetsV5 {
  category: 'DualAssets';
  list: AdvanceEarnDualAssetQuoteProductV5[];
}

export type AdvanceEarnProductExtraInfoV5 =
  | AdvanceEarnProductExtraInfoDiscountBuyV5
  | AdvanceEarnProductExtraInfoDualAssetsV5;

export interface AdvanceEarnPlaceOrderResultV5 {
  orderId: string;
  orderLinkId: string;
}

export interface AdvanceEarnDiscountBuyPositionV5 {
  positionId: string;
  productId: string;
  category: string;
  coin: string;
  underlyingAsset: string;
  amount: string;
  purchasePrice: string;
  knockoutPrice: string;
  knockoutCouponE8: string;
  status: string;
  orderId: string;
  duration: string;
  settlementTime: string;
  accountType: string;
  toAccountType: string;
  settleType: string;
  expectReceiveAt: string;
}

export interface AdvanceEarnDualAssetsPositionV5 {
  positionId: string;
  productId: string;
  category: string;
  baseCoin: string;
  quoteCoin: string;
  investCoin: string;
  amount: string;
  apyE8: string;
  direction: 'BuyLow' | 'SellHigh' | string;
  targetPrice: string;
  settlementTime: string;
  status: string;
  orderId: string;
  duration: string;
  expectReturnCoin: string;
  expectReturnAmount: string;
  accountType: string;
  toAccountType: string;
  yieldStartAt: string | number;
  yieldEndAt: string | number;
}

export interface AdvanceEarnPositionListV5 {
  category: string;
  list: (AdvanceEarnDiscountBuyPositionV5 | AdvanceEarnDualAssetsPositionV5)[];
  nextPageCursor: string;
}

export interface AdvanceEarnDiscountBuyOrderV5 {
  orderId: string;
  orderLinkId: string;
  productId: string;
  category: string;
  orderType: string;
  amount: string;
  coin: string;
  underlyingAsset: string;
  status: string;
  createdTime: string;
  purchasePrice: string;
  knockoutPrice: string;
  knockoutCouponE8: string;
  duration: string;
  settlementTime: string;
  accountType: string;
  toAccountType: string;
  settleType: string;
  settlementPrice: string;
  settlementCoin: string;
  settlementAmount: string;
  isVip: boolean;
  refundStatus: string;
}

export interface AdvanceEarnDualAssetsOrderV5 {
  orderId: string;
  orderLinkId: string;
  productId: string;
  category: string;
  orderType: string;
  amount: string;
  coin: string;
  baseCoin: string;
  quoteCoin: string;
  status: string;
  createdTime: string;
  updatedTime: string;
  direction: 'BuyLow' | 'SellHigh' | string;
  targetPrice: string;
  settlementTime: string | number;
  estimateApyE8: string | number;
  duration: string;
  accountType: string;
  toAccountType: string;
  selectApyE8: string | number;
  isVip: boolean;
  settlementCoin: string;
  settlementAmount: string;
  orderMode: string;
  settlementPrice: string;
  refundStatus: string;
  trialBonusAmount: string;
  trialBonusPnl: string;
}

export interface AdvanceEarnOrderListV5 {
  category: string;
  list: (AdvanceEarnDiscountBuyOrderV5 | AdvanceEarnDualAssetsOrderV5)[];
  nextPageCursor: string;
}
