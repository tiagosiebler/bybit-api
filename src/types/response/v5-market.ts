import {
  CategoryCursorListV5,
  CategoryV5,
  ContractTypeV5,
  CopyTradingV5,
  InstrumentStatusV5,
  MarginTradingV5,
  OptionTypeV5,
  OrderSideV5,
} from '../shared-v5';

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
  symbolType: string; // The region to which the trading pair belongs
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
  riskParameters: {
    priceLimitRatioX: string;
    priceLimitRatioY: string;
  };
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
  skipCallAuction?: boolean; // For USDT pre-market contract
  displayName: string;
}

export interface OptionInstrumentInfoV5 {
  symbol: string;
  optionsType: OptionTypeV5;
  status: InstrumentStatusV5;
  baseCoin: string;
  quoteCoin: string;
  settleCoin: string;
  symbolType: string; // The region to which the trading pair belongs
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
  displayName: string;
}

export interface SpotInstrumentInfoV5 {
  symbol: string;
  baseCoin: string;
  quoteCoin: string;
  symbolType: string; // The region to which the trading pair belongs
  innovation: '0' | '1'; // Deprecated, always 0
  status: InstrumentStatusV5;
  marginTrading: MarginTradingV5;
  stTag: '0' | '1';
  lotSizeFilter: {
    basePrecision: string;
    quotePrecision: string;
    minOrderQty: string;
    maxOrderQty: string;
    minOrderAmt: string;
    maxOrderAmt: string;
    maxLimitOrderQty: string;
    maxMarketOrderQty: string;
    postOnlyMaxLimitOrderSize: string;
  };
  priceFilter: {
    tickSize: string;
  };
  riskParameters: {
    priceLimitRatioX: string;
    priceLimitRatioY: string;
  };
  forbidUplWithdrawal: boolean;
}

type InstrumentInfoV5Mapping = {
  linear: LinearInverseInstrumentInfoV5[];
  inverse: LinearInverseInstrumentInfoV5[];
  option: OptionInstrumentInfoV5[];
  spot: SpotInstrumentInfoV5[];
};

export type InstrumentInfoResponseV5<C extends CategoryV5> =
  CategoryCursorListV5<InstrumentInfoV5Mapping[C], C>;

// Account Instruments Info (includes RPI permissions)
export interface AccountSpotInstrumentInfoV5 extends SpotInstrumentInfoV5 {
  isPublicRpi: boolean;
  myRpiPermission: boolean;
}

export interface AccountLinearInverseInstrumentInfoV5
  extends LinearInverseInstrumentInfoV5 {
  isPublicRpi: boolean;
  myRpiPermission: boolean;
}

type AccountInstrumentInfoV5Mapping = {
  linear: AccountLinearInverseInstrumentInfoV5[];
  inverse: AccountLinearInverseInstrumentInfoV5[];
  spot: AccountSpotInstrumentInfoV5[];
};

export type AccountInstrumentInfoResponseV5<
  C extends 'spot' | 'linear' | 'inverse',
> = CategoryCursorListV5<AccountInstrumentInfoV5Mapping[C], C>;

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
  seq: number;
  cts: number;
}

/**
 * RPI Orderbook level: [price, nonRpiSize, rpiSize]
 */
export type RPIOrderbookLevelV5 = [string, string, string];

export interface RPIOrderbookResponseV5 {
  s: string; // Symbol name
  b: RPIOrderbookLevelV5[]; // Bids. Sorted by price in descending order
  a: RPIOrderbookLevelV5[]; // Asks. Sorted by price in ascending order
  ts: number; // The timestamp (ms) that the system generates the data
  u: number; // Update ID, is always in sequence corresponds to u in the 50-level WebSocket RPI orderbook stream
  seq: number; // Cross sequence
  cts: number; // The timestamp from the matching engine when this orderbook data is produced
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
  basisRateYear: string;
  fundingIntervalHour: string;
  fundingCap: string;
  deliveryFeeRate: string;
  deliveryTime: string;
  ask1Size: string;
  bid1Price: string;
  ask1Price: string;
  bid1Size: string;
  preOpenPrice: string;
  preQty: string;
  curPreListingPhase: string;
  basis: string;
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
  isRPITrade: boolean;
  mP?: string;
  iP?: string;
  mIv?: string;
  iv?: string;
  seq?: string;
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
  symbols: string;
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
  nextPageCursor?: string;
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

export interface OrderPriceLimitV5 {
  symbol: string;
  buyLmt: string;
  sellLmt: string;
  ts: string;
}

export interface IndexPriceComponentV5 {
  exchange: string; // Name of the exchange
  spotPair: string; // Spot trading pair on the exchange (e.g., BTCUSDT)
  equivalentPrice: string; // Equivalent price
  multiplier: string; // Multiplier used for the component price
  price: string; // Actual price
  weight: string; // Weight in the index calculation
}

export interface IndexPriceComponentsResponseV5 {
  indexName: string; // Name of the index (e.g., BTCUSDT)
  lastPrice: string; // Last price of the index
  updateTime: string; // Timestamp of the last update in milliseconds
  components: IndexPriceComponentV5[]; // List of components contributing to the index price
}

export interface ADLAlertItemV5 {
  coin: string; // Token of the insurance pool
  symbol: string; // Trading pair name
  balance: string; // Balance of the insurance fund. Used to determine if ADL is triggered
  maxBalance: string; // Maximum balance of the insurance pool in the last 8 hours
  insurancePnlRatio: string; // PnL ratio threshold for triggering contract PnL drawdown ADL
  pnlRatio: string; // Symbol's PnL drawdown ratio in the last 8 hours. Used to determine whether ADL is triggered or stopped
  adlTriggerThreshold: string; // Trigger threshold for contract PnL drawdown ADL
  adlStopRatio: string; // Stop ratio threshold for contract PnL drawdown ADL
}

export interface ADLAlertResponseV5 {
  updateTime: string; // Latest data update timestamp (ms)
  list: ADLAlertItemV5[]; // List of ADL alert items
}

export interface FeeGroupLevelV5 {
  level: string; // Pro level name or Market Maker level name
  takerFeeRate: string; // Taker fee rate
  makerFeeRate: string; // Maker fee rate
  makerRebate: string; // Maker rebate fee rate
}

export interface FeeGroupRatesV5 {
  pro: FeeGroupLevelV5[]; // Pro-level fee structures
  marketMaker: FeeGroupLevelV5[]; // Market Maker-level fee structures
}

export interface FeeGroupItemV5 {
  groupName: string; // Fee group name
  weightingFactor: number; // Group weighting factor
  symbolsNumbers: number; // Symbols number
  symbols: string[]; // Symbol names
  feeRates: FeeGroupRatesV5; // Fee rate details for different categories
  updateTime: string; // Latest data update timestamp (ms)
}

export interface FeeGroupStructureResponseV5 {
  list: FeeGroupItemV5[]; // List of fee group objects
}
