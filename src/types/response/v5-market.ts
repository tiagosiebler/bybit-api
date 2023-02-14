import { CategoryV5 } from '../v5-shared';

/**
 * Next page cursor does not exist for spot!
 */
export interface PaginatedListV5<T> {
  nextPageCursor: string;
  list: T[];
}

export interface CategoryListV5<T, TCategory extends CategoryV5> {
  category: TCategory;
  list: T[];
}

/**
 * OHLCVT candle used by v5 APIs
> list[0]: startTime	string	Start time of the candle (ms)
> list[1]: openPrice	string	Open price
> list[2]: highPrice	string	Highest price
> list[3]: lowPrice	string	Lowest price
> list[4]: closePrice	string	Close price. Is the last traded price when the candle is not closed
> list[5]: volume	string	Trade volume. Unit of contract: pieces of contract. Unit of spot: quantity of coins
> list[6]: turnover	string	Turnover. Unit of figure: quantity of quota coin
 */
export type KlineV5 = [string, string, string, string, string, string, string];

export interface KlineResponseV5 {
  category: 'spot' | 'linear' | 'inverse';
  symbol: string;
  list: KlineV5[];
}

/**
 * OHLC candle used by v5 APIs
> list[0]: startTime	string	Start time of the candle (ms)
> list[1]: openPrice	string	Open price
> list[2]: highPrice	string	Highest price
> list[3]: lowPrice	string	Lowest price
> list[4]: closePrice	string	Close price. Is the last traded price when the candle is not closed
 */
export type OHLCV5 = [string, string, string, string, string];

export interface MarkPriceKlineResponseV5 {
  category: 'linear' | 'inverse';
  symbol: string;
  list: OHLCV5[];
}

export interface IndexPriceKlineResponseV5 {
  category: 'linear' | 'inverse';
  symbol: string;
  list: OHLCV5[];
}

export interface PremiumIndexPriceKlineResponse {
  category: 'linear';
  symbol: string;
  list: OHLCV5[];
}

export interface LinearInverseInstrumentInfoV5 {
  category: 'linear' | 'inverse';
  symbol: string;
  contractType: string;
  status: string;
  baseCoin: string;
  quoteCoin: string;
  launchTime: string;
  deliveryTime: string;
  deliveryFeeRate: string;
  priceScale: string;
  maxLeverage: string;
  minOrderValue: string;
  minOrderVolume: string;
  makerFeeRate: string;
  takerFeeRate: string;
}

export interface OptionInstrumentInfoV5 {
  category: 'option';
  symbol: string;
  contractType: string;
  status: string;
  baseCoin: string;
  quoteCoin: string;
  launchTime: string;
  deliveryTime: string;
  deliveryFeeRate: string;
  priceScale: string;
  maxLeverage: string;
  minOrderValue: string;
  minOrderVolume: string;
  makerFeeRate: string;
  takerFeeRate: string;
  settlementCurrency: string;
  settlementPrice: string;
  deliveryMethod: string;
  optionType: string;
  exercisePrice: string;
  expirationTime: string;
  blockMarginRatio: string;
  marginType: string;
  strike: string;
}

export interface SpotInstrumentInfoV5 {
  category: 'spot';
  symbol: string;
  contractType: string;
  status: string;
  baseCoin: string;
  quoteCoin: string;
  launchTime: string;
  priceScale: string;
  maxLeverage: string;
  minOrderValue: string;
  minOrderVolume: string;
  makerFeeRate: string;
  takerFeeRate: string;
}

export type InstrumentInfoV5 =
  | LinearInverseInstrumentInfoV5
  | OptionInstrumentInfoV5
  | SpotInstrumentInfoV5;

export interface OrderbookLevelV5 {
  price: string;
  size: string;
}

export interface OrderbookResponseV5 {
  s: string;
  b: OrderbookLevelV5[];
  a: OrderbookLevelV5[];
  ts: number;
  u: number;
}

export interface TickerLinearInverseV5 {
  symbol: string;
  lastPrice: string;
  indexPrice: string;
  markPrice: string;
  prevPrice24h: string;
  price24hPcnt: string;
  highPrice24h: string;
  lowPrice24h: string;
  prevPrice1h: string;
  openInterest: string;
  openInterestValue: string;
  turnover24h: string;
  volume24h: string;
  fundingRate: string;
  nextFundingTime: string;
  predictedDeliveryPrice: string;
  basisRate: string;
  deliveryFeeRate: string;
  deliveryTime: string;
  ask1Size: string;
  bid1Price: string;
  ask1Price: string;
  bid1Size: string;
}

export interface TickerOptionV5 {
  symbol: string;
  bid1Price: string;
  bid1Size: string;
  bid1Iv: string;
  ask1Price: string;
  ask1Size: string;
  ask1Iv: string;
  lastPrice: string;
  highPrice24h: string;
  lowPrice24h: string;
  markPrice: string;
  indexPrice: string;
  markIv: string;
  underlyingPrice: string;
  openInterest: string;
  turnover24h: string;
  volume24h: string;
  totalVolume: string;
  totalTurnover: string;
  delta: string;
  gamma: string;
  vega: string;
  theta: string;
  predictedDeliveryPrice: string;
  change24h: string;
}

export interface TickerSpotV5 {
  symbol: string;
  bid1Price: string;
  bid1Size: string;
  ask1Price: string;
  ask1Size: string;
  lastPrice: string;
  prevPrice24h: string;
  price24hPcnt: string;
  highPrice24h: string;
  lowPrice24h: string;
  turnover24h: string;
  volume24h: string;
  usdIndexPrice: string;
}

export interface TickersSpotResponseV5 {
  category: 'spot';
  list: TickerSpotV5[];
}

export interface TickersLinearInverseResponseV5 {
  category: 'linear' | 'inverse';
  list: TickerLinearInverseV5[];
}

export interface TickersOptionResponseV5 {
  category: 'option';
  list: TickerOptionV5[];
}

export interface FundingRateHistoryResponseV5 {
  symbol: string;
  fundingRate: string;
  fundingRateTimestamp: string;
}

export interface PublicTradeV5 {
  execId: string;
  symbol: string;
  price: string;
  size: string;
  side: 'Buy' | 'Sell';
  time: string;
  isBlockTrade: boolean;
}

/**
> openInterest	string	Open interest
> timestamp	string	The timestamp (ms)
*/
export type OpenInterestV5 = [string, string];

export interface OpenInterestResponseV5 {
  category: 'linear' | 'inverse';
  symbol: string;
  list: OpenInterestV5[];
  nextPageCursor?: string;
}

export interface HistoricalVolatilityV5 {
  period: number;
  value: string;
  time: string;
}

export interface InsuranceDataV5 {
  coin: string;
  balance: string;
  value: string;
}

export interface InsuranceResponseV5 {
  updatedTime: string;
  list: InsuranceDataV5[];
}

export interface RiskLimitV5 {
  id: number;
  symbol: string;
  riskLimitValue: string;
  maintenanceMargin: number;
  initialMargin: number;
  section: any;
  isLowestRisk: 0 | 1;
  maxLeverage: string;
}

export interface RiskLimitResponseV5 {
  category: CategoryV5;
  list: RiskLimitV5[];
}

export interface OptionDeliveryPriceV5 {
  symbol: string;
  deliveryPrice: string;
  deliveryTime: string;
}

export interface OptionDeliveryPriceResponseV5 {
  category: CategoryV5;
  list: OptionDeliveryPriceV5[];
  nextPageCursor?: string;
}
