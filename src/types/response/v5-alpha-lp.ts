/**
 * V5 private Alpha LP responses.
 */

export interface AlphaLPPoolV5 {
  poolAddress: string;
  poolName: string;
  poolTag: string;
  apy: string;
  tvl: string;
  token0Symbol: string;
  token0IconUrlDay: string;
  token0IconUrlNight: string;
  token1Symbol: string;
  token1IconUrlDay: string;
  token1IconUrlNight: string;
  chainCode: string;
  chainIconUrl: string;
}

export interface AlphaLPPoolListResultV5 {
  pools: AlphaLPPoolV5[];
}

export interface AlphaLPPoolInfoV5 {
  poolAddress: string;
  poolName: string;
  apy: string;
  tvl: string;
  feeRate: string;
  token0Symbol: string;
  token0Reserve: string;
  token1Symbol: string;
  token1Reserve: string;
  priceRangeLower: string;
  priceRangeUpper: string;
  currentPrice: string;
}

export interface ExecuteAlphaLPStakeResultV5 {
  positionId: number;
  orderNo: string;
}

export interface ExecuteAlphaLPRedeemResultV5 {
  orderNo: string;
}

export interface AlphaLPOrderV5 {
  orderType: number;
  orderNo: string;
  orderStatus: number;
  poolAddress: string;
  poolName: string;
  positionId: number;
  tokenCode: string;
  tokenSymbol: string;
  tokenIconUrlDay: string;
  tokenIconUrlNight: string;
  amount: string;
  chainCode: string;
  chainIconUrl: string;
  gasTokenSymbol: string;
  gasOnchain: string;
  gasUsd: string | null;
  platformFee: string;
  platformFeeUsd: string | null;
  createTime: number;
  executionTime: number;
  failureReason?: string;
  dercRatio?: string;
}

export interface AlphaLPOrderListResultV5 {
  total: number;
  pageIndex: number;
  orders: AlphaLPOrderV5[];
}

export interface AlphaLPPayTokenV5 {
  tokenCode: string;
  tokenSymbol: string;
  chainCode: string;
  chainIconUrl: string;
  decimals: number;
  availableBalance: string;
  tokenIconUrlDay: string;
  tokenIconUrlNight: string;
  minStakeAmount: string;
  maxStakeAmount: string;
}

export interface AlphaLPPayTokenListResultV5 {
  tokens: AlphaLPPayTokenV5[];
}

export interface AlphaLPPayTokenPriceV5 {
  tokenCode: string;
  tokenSymbol: string;
  priceUsd: string;
  chainCode: string;
  updateTime: number;
}

export interface AlphaLPPayTokenPriceResultV5 {
  prices: AlphaLPPayTokenPriceV5[];
}

export interface AlphaLPPositionV5 {
  positionId: number;
  poolAddress: string;
  poolName: string;
  stakedAmount: string;
  stakedTokenCode: string;
  stakedTokenSymbol: string;
  currentValueUsd: string;
  earnedRewardsUsd: string;
  unrealizedPnl: string;
  realizedPnl: string;
  apy: string;
  token0Amount: string;
  token0Symbol: string;
  token1Amount: string;
  token1Symbol: string;
  rangeUpper: string;
  rangeLower: string;
  createTime: number;
  updateTime: number;
  status: number;
}

export interface AlphaLPPositionListResultV5 {
  positions: AlphaLPPositionV5[];
}
