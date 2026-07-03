/**
 * V5 private Alpha LP requests.
 */

export interface GetAlphaLPPoolListParamsV5 {
  tokenSymbol?: string;
}

export interface GetAlphaLPPoolInfoParamsV5 {
  poolAddress: string;
}

export interface ExecuteAlphaLPStakeParamsV5 {
  positionId: number;
  poolAddress: string;
  payTokenAmount: string;
  payTokenCode: string;
  rangeUpper?: string;
  rangeLower?: string;
  priceUpper?: string;
  priceLower?: string;
}

export interface ExecuteAlphaLPRedeemParamsV5 {
  positionId: number;
  poolAddress: string;
  dercRatio: string;
  receiveTokenCode?: string;
}

export interface GetAlphaLPOrderListParamsV5 {
  orderType?: 0 | 1 | 2;
  tokenCode?: string;
  orderStatus?: number[];
  days?: number;
  limit?: number;
  pageIndex?: number;
  poolAddress?: string;
}

export interface GetAlphaLPPayTokenListParamsV5 {
  chainCode?: string;
  tokenAddress?: string;
}

export interface GetAlphaLPPayTokenPriceParamsV5 {
  tokenCode: string[];
  chainCode?: string;
}
