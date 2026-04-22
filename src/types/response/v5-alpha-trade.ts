/**
 * V5 private Alpha / on-chain (Web3) trade responses.
 */

export interface AlphaTradeQuoteModeEstimationV5 {
  quoteMode: number;
  estimatedGas: string;
  estimatedGasUsd: string;
  estimatedSlippage: string;
}

export interface AlphaTradeQuoteResultV5 {
  tradeType: number;
  fromTokenCode: string;
  fromTokenAmount: string;
  fromTokenAmountUsd: string;
  toTokenCode: string;
  toTokenAmount: string;
  toTokenAmountUsd: string;
  minToTokenAmount: string;
  slippage: string;
  gas: string;
  gasUsd: string;
  platformFee: string;
  platformFeeUsd: string;
  swapRate: string;
  lossRate: string;
  quoteData: string;
  correctingCode: string;
  quoteMode: number;
  quoteDataId: string;
  expireTime: number;
  modeEstimations: AlphaTradeQuoteModeEstimationV5[];
  chargeAmount?: string;
  timestamp?: number;
}

export interface ExecuteAlphaTradeResultV5 {
  orderNo: string;
}

export interface AlphaPayTokenV5 {
  tokenCode: string;
  symbol: string;
  tokenDecimals: number;
  tokenIconUrlDay: string;
  tokenIconUrlNight: string;
  limit: string;
  supportChains: string[];
}

export interface AlphaTradeOrderV5 {
  orderType: number;
  tradeType: number;
  orderNo: string;
  orderStatus: number;
  fromTokenCode: string;
  fromTokenAmount: string;
  fromTokenSymbol: string;
  fromTokenDecimals: number;
  fromTokenIconUrlDay?: string;
  fromTokenIconUrlNight?: string;
  fromChainCode: string;
  fromChainIconUrl?: string;
  toTokenCode: string;
  toTokenAmount: string;
  toTokenSymbol: string;
  toTokenDecimals: number;
  toTokenIconUrlDay?: string;
  toTokenIconUrlNight?: string;
  toChainCode: string;
  toChainIconUrl?: string;
  gasTokenSymbol: string;
  gasOnchain: string;
  gasUsd: string | null;
  platformFee: string;
  platformFeeUsd: string | null;
  quoteMode: number;
  createTime: number;
  executionTime?: number;
  failureReasonCode?: string;
  source?: string;
  swapRate: string;
  actualFromTokenAmount: string;
}

export interface AlphaTradeOrderListResultV5 {
  total: number;
  pageIndex: number;
  orders: AlphaTradeOrderV5[];
}

export interface AlphaBizTokenV5 {
  tokenCode: string;
  chainCode: string;
  chainIconUrl: string;
  tokenAddress: string;
  symbol: string;
  tokenDecimals: number;
  tokenIconUrlDay: string;
  tokenIconUrlNight: string;
  createTime: number;
  createTimeOnchain: number;
  riskFlag: number;
  minOrderQuantity: number;
  maxOrderQuantity: number;
  tokenTags: number[];
  payTokenCodes: string[];
}

export interface AlphaBizTokenPriceV5 {
  chainCode: string;
  tokenAddress: string;
  price: string;
  change24h: string;
  vol24h: string;
  marketCap: string;
  liquidity: string;
  holders: string;
}

export interface AlphaBizTokenPriceListResultV5 {
  tokenPriceInfoList: AlphaBizTokenPriceV5[];
}

export interface AlphaBizTokenDetailsV5 {
  tokenCode: string;
  chainCode: string;
  chainIconUrl: string;
  tokenAddress: string;
  symbol: string;
  tokenDecimals: number;
  tokenIconUrlDay: string;
  tokenIconUrlNight: string;
  minOrderQuantity: string;
  maxOrderQuantity: string;
  maxPositionQuantity: string;
  tokenDesc: string;
  xUrl: string;
  officialUrl: string;
  whitePaperUrl: string;
  tokenTag: number;
  riskFlag: number;
  createTimeOnchain: number;
  status: number;
  tokenTags: number[];
  showMessage: number;
  content?: string;
  linkName?: string;
  linkAddress?: string;
}

export interface AlphaAssetV5 {
  chainCode: string;
  chainIconUrl: string;
  tokenAddress: string;
  tokenCode: string;
  tokenSymbol: string;
  tokenDecimals: number;
  tokenIconUrlDay: string;
  tokenIconUrlNight: string;
  tokenAmount: string;
  tokenAmountUsd: string;
  tradeFlag: number;
  pnl: string | null;
  pnlRatio: string | null;
  costPrice: string | null;
  lastPrice: string;
  costTotalValue: string | null;
  assetStatus: number;
  announcementUrl?: string;
  estimatedOfflineTime?: number;
  delistingTime?: number;
}

export interface AlphaAssetListResultV5 {
  totalAssetUsd: string;
  assetList: AlphaAssetV5[];
}

export interface AlphaAssetDetailResultV5 {
  assetList: AlphaAssetV5[];
}
