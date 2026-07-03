/**
 * V5 private Alpha prediction market requests.
 */

export interface GetAlphaPredictionEventDetailParamsV5 {
  eventId?: string;
  slug?: string;
  hasMoreMarkets?: boolean;
}

export interface GetAlphaPredictionOrderEstimateParamsV5 {
  tokenId: string;
  side: 1 | 2;
  eventId: string;
  amount: string;
  orderType: 1;
  payTokenCode?: string;
}

export interface ExecuteAlphaPredictionBuyParamsV5 {
  tokenId: string;
  amount: string;
  payTokenCode: string;
  orderType: 1;
  slippage: string;
  eventId: string;
}

export interface ExecuteAlphaPredictionSellParamsV5 {
  tokenId: string;
  size: string;
  orderType: 1;
  slippage: string;
  eventId: string;
  toTokenCode?: string;
}

export interface GetAlphaPredictionOrderListParamsV5 {
  status?: number;
  tokenId?: string;
  eventId?: string;
  side?: 1 | 2;
  days?: number;
  limit?: number;
  pageIndex?: number;
}

export interface GetAlphaPredictionOrderBookParamsV5 {
  tokenIds: string[];
}

export interface GetAlphaPredictionTokenPriceParamsV5 {
  tokenIds: string[];
}

export interface GetAlphaPredictionPriceHistoryParamsV5 {
  tokenId: string;
  interval: string;
}

export interface GetAlphaPredictionPositionListParamsV5 {
  tokenId?: string;
  eventId?: string;
  limit?: number;
  pageIndex?: number;
}

export interface GetAlphaPredictionPositionHistoryParamsV5 {
  tokenId?: string;
  eventId?: string;
  result?: number;
  days?: number;
  limit?: number;
  pageIndex?: number;
}

export interface GetAlphaPredictionPortfolioSummaryParamsV5 {
  eventType?: number;
}

export interface GetAlphaPredictionSideMarketListParamsV5 {
  eventId: string;
  sortBy?: string;
  marketType?: number;
  limit?: number;
  pageIndex?: number;
}

export interface GetAlphaPredictionSportsMatchListParamsV5 {
  eventType: number;
  status?: number;
  startTime?: number;
  endTime?: number;
  stageCode?: string;
  limit?: number;
  pageIndex?: number;
}

export interface GetAlphaPredictionSportsTimelineStagesParamsV5 {
  eventType: number;
}

export interface GetAlphaPredictionSportsGroupStageDetailParamsV5 {
  eventType: number;
  groupName?: string;
}
