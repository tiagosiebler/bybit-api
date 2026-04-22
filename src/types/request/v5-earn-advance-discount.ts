/**
 * /v5/earn/advance/ — product-extra, place order, position, order (Discount Buy, Dual Assets, etc.)
 */
export type GetAdvanceEarnProductExtraInfoParamsV5 =
  | {
      category: 'DiscountBuy';
      productId?: string;
    }
  | {
      category: 'DualAssets';
      /** Required for Dual Assets quote. */
      productId: string;
    };

export interface AdvanceEarnDiscountBuyExtraV5 {
  initialPrice: string;
  purchasePrice: string;
  knockoutPrice: string;
  knockoutCouponE8: string;
  settleType: 'Base' | 'Quote';
  instUid: string;
}

export interface AdvanceEarnDualAssetsExtraV5 {
  orderDirection: 'BuyLow' | 'SellHigh';
  selectPrice: string;
  /** Expected APY in e8 precision; API may return int. */
  apyE8: string | number;
}

export interface AdvanceEarnInterestCardExtraV5 {
  awardId: string | number;
  specCode: string;
}

/**
 * POST /v5/earn/advance/place-order — Discount Buy
 */
export interface SubmitAdvanceEarnPlaceOrderDiscountBuyV5 {
  category: 'DiscountBuy';
  productId: string;
  orderType: 'Stake';
  amount: string;
  coin: string;
  accountType: 'FUND' | 'UNIFIED';
  orderLinkId: string;
  discountBuyExtra: AdvanceEarnDiscountBuyExtraV5;
}

/**
 * POST /v5/earn/advance/place-order — Dual Assets
 */
export interface SubmitAdvanceEarnPlaceOrderDualAssetsV5 {
  category: 'DualAssets';
  productId: string;
  orderType: 'Stake';
  amount: string;
  coin: string;
  accountType: 'FUND' | 'UNIFIED';
  orderLinkId: string;
  dualAssetsExtra: AdvanceEarnDualAssetsExtraV5;
  interestCard?: AdvanceEarnInterestCardExtraV5;
}

export type SubmitAdvanceEarnPlaceOrderParamsV5 =
  | SubmitAdvanceEarnPlaceOrderDiscountBuyV5
  | SubmitAdvanceEarnPlaceOrderDualAssetsV5;

export interface GetAdvanceEarnPositionListParamsV5 {
  category: 'DiscountBuy' | 'DualAssets' | string;
  productId?: string;
  coin?: string;
  limit?: number;
  cursor?: string;
}

export interface GetAdvanceEarnOrderListParamsV5 {
  category: 'DiscountBuy' | 'DualAssets' | string;
  orderId?: string;
  orderLinkId?: string;
  productId?: string;
  /** Dual Assets docs use string ms; other categories may use number. */
  startTime?: string | number;
  endTime?: string | number;
  limit?: number;
  cursor?: string;
}
