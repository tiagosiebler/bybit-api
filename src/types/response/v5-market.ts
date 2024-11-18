import {
  CategoryCursorListV5,
  CategoryV5,
  ContractTypeV5,
  CopyTradingV5,
  InstrumentStatusV5,
  MarginTradingV5,
  OptionTypeV5,
  OrderSideV5,
} from '../v5-shared';

/**
 * OHLCVT candle used by v5 APIs
 *
 * - list[0]: startTime	string	Start time of the candle (ms)
 * - list[1]: openPrice	string	Open price
 * - list[2]: highPrice	string	Highest price
 * - list[3]: lowPrice	string	Lowest price
 * - list[4]: closePrice	string	Close price. Is the last traded price when the candle is not closed
 * - list[5]: volume	string	Trade volume. Unit of contract: pieces of contract. Unit of spot: quantity of coins
 * - list[6]: turnover	string	Turnover. Unit of figure: quantity of quota coin
 */
export type OHLCVKlineV5 = [
  string,
  string,
  string,
  string,
  string,
  string,
  string,
];

/**
 * OHLC candle used by v5 APIs
 *
 * - list[0]: startTime	string	Start time of the candle (ms)
 * - list[1]: openPrice	string	Open price
 * - list[2]: highPrice	string	Highest price
 * - list[3]: lowPrice	string	Lowest price
 * - list[4]: closePrice	string	Close price. Is the last traded price when the candle is not closed
 */
export type OHLCKlineV5 = [string, string, string, string, string];

export interface LinearInverseInstrumentInfoV5 {
  symbol: string;
  contractType: ContractTypeV5;
  status: InstrumentStatusV5;
  baseCoin: string;
  quoteCoin: string;
  launchTime: string;
  deliveryTime?: string;
  deliveryFeeRate?: string;
  priceScale: string;
  leverageFilter: {
    minLeverage: string;
    maxLeverage: string;
    leverageStep: string;
  };
  priceFilter: {
    minPrice: string;
    maxPrice: string;
    tickSize: string;
  };
  lotSizeFilter: {
    maxOrderQty: string;
    maxMktOrderQty: string;
    minOrderQty: string;
    qtyStep: string;
    postOnlyMaxOrderQty?: string;
    minNotionalValue?: string;
  };
  unifiedMarginTrade: boolean;
  fundingInterval: number;
  settleCoin: string;
  copyTrading: CopyTradingV5;
  upperFundingRate: string;
  lowerFundingRate: string;
  isPreListing: boolean;
  preListingInfo: {
    curAuctionPhase: string;
    phases: {
      phase: string;
      startTime: string;
      endTime: string;
    }[];
    auctionFeeInfo: {
      auctionFeeRate: string;
      takerFeeRate: string;
      makerFeeRate: string;
    };
  } | null;
}

export interface OptionInstrumentInfoV5 {
  symbol: string;
  optionsType: OptionTypeV5;
  status: InstrumentStatusV5;
  baseCoin: string;
  quoteCoin: string;
  settleCoin: boolean;
  launchTime: string;
  deliveryTime: string;
  deliveryFeeRate: string;
  priceFilter: {
    minPrice: string;
    maxPrice: string;
    tickSize: string;
  };
  lotSizeFilter: {
    maxOrderQty: string;
    minOrderQty: string;
    qtyStep: string;
  };
}

export interface SpotInstrumentInfoV5 {
  symbol: string;
  baseCoin: string;
  quoteCoin: string;
  innovation: '0' | '1';
  status: InstrumentStatusV5;
  marginTrading: MarginTradingV5;
  lotSizeFilter: {
    basePrecision: string;
    quotePrecision: string;
    minOrderQty: string;
    maxOrderQty: string;
    minOrderAmt: string;
    maxOrderAmt: string;
  };
  priceFilter: {
    tickSize: string;
  };
  riskParameters: {
    limitParameter: string;
    marketParameter: string;
  };
}

type InstrumentInfoV5Mapping = {
  linear: LinearInverseInstrumentInfoV5[];
  inverse: LinearInverseInstrumentInfoV5[];
  option: OptionInstrumentInfoV5[];
  spot: SpotInstrumentInfoV5[];
};

export type InstrumentInfoResponseV5<C extends CategoryV5> =
  CategoryCursorListV5<InstrumentInfoV5Mapping[C], C>;

/**
 * [price, size]
 */
export type OrderbookLevelV5 = [string, string];

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
  preOpenPrice: string;
  preQty: string;
  curPreListingPhase: string;
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
  side: OrderSideV5;
  time: string;
  isBlockTrade: boolean;
}

/**
 *
 * - openInterest	string	Open interest
 * - timestamp	string	The timestamp (ms)
 */
export type OpenInterestV5 = {
  openInterest: string;
  timestamp: string;
};

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  section: any;
  isLowestRisk: 0 | 1;
  maxLeverage: string;
  mmDeduction: string;
}

/** @deprecated use DeliveryPriceV5 instead */
export interface OptionDeliveryPriceV5 {
  symbol: string;
  deliveryPrice: string;
  deliveryTime: string;
}

export interface DeliveryPriceV5 {
  symbol: string;
  deliveryPrice: string;
  deliveryTime: string;
}

export interface LongShortRatioV5 {
  symbol: string;
  buyRatio: string;
  sellRatio: string;
  timestamp: string;
}
