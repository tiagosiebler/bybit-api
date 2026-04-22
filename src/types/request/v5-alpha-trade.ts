/**
 * V5 private Alpha / on-chain (Web3) trade requests.
 */

export interface GetAlphaTradeQuoteParamsV5 {
  tradeType: 1 | 2;
  fromTokenCode: string;
  fromTokenAmount: string;
  toTokenCode: string;
  quoteMode?: 0 | 1 | 2;
}

export interface ExecuteAlphaTradeParamsV5 {
  fromTokenCode: string;
  fromTokenAmount: string;
  toTokenCode: string;
  slippage: string;
  quoteData: string;
  gas: string;
  quoteMode: 0 | 1 | 2;
  correctingCode: string;
  tenant?: string;
}

export interface GetAlphaPayTokenListParamsV5 {
  chainCode: string;
  tokenAddress: string;
}

export interface GetAlphaTradeOrderListParamsV5 {
  limit: number;
  pageIndex: number;
  tradeType?: number;
  tokenCode?: string;
  orderStatus?: number[];
  days?: number;
  direction?: 'prev' | 'next';
}

export interface GetAlphaBizTokenListParamsV5 {
  tokenTag?: number;
}

export interface AlphaTokenAddressInfoV5 {
  chainCode: string;
  tokenAddress: string;
}

export interface GetAlphaBizTokenPriceListParamsV5 {
  tokenAddressInfo: AlphaTokenAddressInfoV5[];
}

export interface GetAlphaBizTokenDetailsParamsV5 {
  chainCode: string;
  tokenAddress: string;
}

export interface GetAlphaAssetDetailParamsV5 {
  chainCode: string;
  tokenAddress: string;
}
