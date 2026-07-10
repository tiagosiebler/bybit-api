/**
 * V5 private Alpha prediction market responses.
 */

export interface AlphaPredictionEngineStatusV5 {
  available: boolean;
}

export interface AlphaPredictionPayTokenV5 {
  tokenCode: string;
  symbol: string;
  tokenDecimals: number;
  tokenIconUrlDay: string;
  tokenIconUrlNight: string;
  supportChains: string[];
}

export interface AlphaPredictionMarketV5 {
  tokenId: string;
  outcome: string;
  price: string;
  side: number;
  volume: string;
  liquidity: string;
}

export interface AlphaPredictionEventDetailV5 {
  eventId: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  endDate: number;
  resolved: boolean;
  volume: string;
  liquidity: string;
  markets: AlphaPredictionMarketV5[];
}

export interface AlphaPredictionOrderEstimateFeeDetailV5 {
  serverFee: string;
  polymarketFee: string;
}

export interface AlphaPredictionOrderEstimateV5 {
  avgPrice: string;
  estimatedCost: string;
  estimatedReceive: string;
  toWin?: string;
  feeAmount: string;
  feeDetail: AlphaPredictionOrderEstimateFeeDetailV5;
  slippage: string;
}

export interface ExecuteAlphaPredictionOrderResultV5 {
  orderNo: string;
}

export interface AlphaPredictionOrderV5 {
  orderNo: string;
  tokenId: string;
  eventId: string;
  side: number;
  orderType: number;
  orderAmount: string;
  filledSize: string;
  filledPrice: string;
  totalFee: string;
  status: number;
  createdAt: number;
  updatedAt: number;
}

export interface AlphaPredictionOrderListResultV5 {
  orders: AlphaPredictionOrderV5[];
  total: number;
  pageIndex: number;
}

export interface AlphaPredictionOrderBookLevelV5 {
  price: string;
  size: string;
}

export interface AlphaPredictionOrderBookV5 {
  tokenId: string;
  bids: AlphaPredictionOrderBookLevelV5[];
  asks: AlphaPredictionOrderBookLevelV5[];
}

export interface AlphaPredictionTokenPriceV5 {
  tokenId: string;
  bestBid: string;
  bestAsk: string;
  lastPrice: string;
  volume24h: string;
  updateTime: number;
}

export interface AlphaPredictionPriceHistoryCandleV5 {
  openTime: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
}

export interface AlphaPredictionPriceHistoryV5 {
  tokenId: string;
  interval: string;
  list: AlphaPredictionPriceHistoryCandleV5[];
}

export interface AlphaPredictionPositionV5 {
  positionId: string;
  tokenId: string;
  eventId: string;
  outcomeName: string;
  shares: string;
  cost: string;
  avgPrice: string;
  currentPrice: string;
  value: string;
  unrealizedPnl: string;
  unrealizedPnlRate: string;
  createdAt: number;
  finished: boolean;
}

export interface AlphaPredictionPositionListResultV5 {
  positions: AlphaPredictionPositionV5[];
  total: number;
  totalAssetUsd: string;
}

export interface AlphaPredictionPositionHistoryV5 {
  positionId: string;
  tokenId: string;
  eventId: string;
  outcomeName: string;
  shares: string;
  cost: string;
  avgPrice: string;
  exitPrice: string;
  realizedPnl: string;
  realizedPnlRate: string;
  result: number;
  closedAt: number;
}

export interface AlphaPredictionPositionHistoryResultV5 {
  positions: AlphaPredictionPositionHistoryV5[];
  total: number;
}

export interface AlphaPredictionPortfolioSummaryV5 {
  positionValue: string;
  positionValueUsd: string;
  biggestWin: string;
  winRate: string;
  winCount: number;
  lossCount: number;
}

export interface AlphaPredictionSideMarketTokenV5 {
  tokenId: string;
  outcome: string;
  price: string;
  liquidity: string;
}

export interface AlphaPredictionSideMarketV5 {
  marketId: string;
  eventId: string;
  marketType: number;
  question: string;
  tokens: AlphaPredictionSideMarketTokenV5[];
  volume24h: string;
  endDate: number;
  status: number;
}

export interface AlphaPredictionSideMarketListResultV5 {
  list: AlphaPredictionSideMarketV5[];
  total: number;
  pageIndex: number;
  pageSize: number;
}

export interface AlphaPredictionSportsMatchV5 {
  matchId: string;
  eventType: number;
  stageCode: string;
  homeTeam: string;
  awayTeam: string;
  matchTime: number;
  status: number;
  eventId: string;
}

export interface AlphaPredictionSportsMatchListResultV5 {
  list: AlphaPredictionSportsMatchV5[];
  total: number;
  pageIndex: number;
  pageSize: number;
}

export interface AlphaPredictionSportsTimelineStageV5 {
  stageCode: string;
  stageName: string;
  status: number;
  matchCount: number;
  startTime: number;
  endTime: number;
}

export interface AlphaPredictionSportsTimelineStagesV5 {
  eventType: number;
  stages: AlphaPredictionSportsTimelineStageV5[];
}

export interface AlphaPredictionSportsGroupStandingV5 {
  rank: number;
  teamName: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
}

export interface AlphaPredictionSportsGroupMatchV5 {
  matchId: string;
  homeTeam: string;
  awayTeam: string;
  matchTime: number;
  status: number;
  homeScore: number;
  awayScore: number;
  eventId: string;
}

export interface AlphaPredictionSportsGroupV5 {
  groupName: string;
  standings: AlphaPredictionSportsGroupStandingV5[];
  matches: AlphaPredictionSportsGroupMatchV5[];
}

export interface AlphaPredictionSportsGroupStageDetailV5 {
  groups: AlphaPredictionSportsGroupV5[];
}
