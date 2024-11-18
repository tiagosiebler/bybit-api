import { KlineIntervalV3 } from '../shared';
import { CategoryV5, InstrumentStatusV5, OptionTypeV5 } from '../v5-shared';

export interface GetKlineParamsV5 {
  category: 'spot' | 'linear' | 'inverse';
  symbol: string;
  interval: KlineIntervalV3;
  start?: number;
  end?: number;
  limit?: number;
}

export interface GetMarkPriceKlineParamsV5 {
  category: 'linear' | 'inverse';
  symbol: string;
  interval: KlineIntervalV3;
  start?: number;
  end?: number;
  limit?: number;
}

export interface GetIndexPriceKlineParamsV5 {
  category: 'linear' | 'inverse';
  symbol: string;
  interval: KlineIntervalV3;
  start?: number;
  end?: number;
  limit?: number;
}

export interface GetPremiumIndexPriceKlineParamsV5 {
  category: 'linear';
  symbol: string;
  interval: KlineIntervalV3;
  start?: number;
  end?: number;
  limit?: number;
}

export interface GetInstrumentsInfoParamsV5 {
  category: CategoryV5;
  symbol?: string;
  status?: InstrumentStatusV5;
  baseCoin?: string;
  limit?: number;
  cursor?: string;
}

export interface GetOrderbookParamsV5 {
  category: CategoryV5;
  symbol: string;
  limit?: number;
}

export interface GetTickersParamsV5<TCategory = CategoryV5> {
  category: TCategory;
  symbol?: string;
  baseCoin?: string;
  expDate?: string;
}

export interface GetFundingRateHistoryParamsV5 {
  category: 'linear' | 'inverse';
  symbol: string;
  startTime?: number;
  endTime?: number;
  limit?: number;
}

export interface GetPublicTradingHistoryParamsV5 {
  category: CategoryV5;
  symbol: string;
  baseCoin?: string;
  optionType?: OptionTypeV5;
  limit?: number;
}

export type OpenInterestIntervalV5 =
  | '5min'
  | '15min'
  | '30min'
  | '1h'
  | '4h'
  | '1d';

export interface GetOpenInterestParamsV5 {
  category: 'linear' | 'inverse';
  symbol: string;
  intervalTime: OpenInterestIntervalV5;
  startTime?: number;
  endTime?: number;
  limit?: number;
  cursor?: string;
}

export interface GetHistoricalVolatilityParamsV5 {
  category: 'option';
  baseCoin?: string;
  period?: 7 | 14 | 21 | 30 | 60 | 90 | 180 | 270;
  startTime?: number;
  endTime?: number;
}

export interface GetInsuranceParamsV5 {
  coin?: string;
}

export interface GetRiskLimitParamsV5 {
  category?: 'linear' | 'inverse';
  symbol?: string;
}

export interface GetOptionDeliveryPriceParamsV5 {
  category: 'option';
  symbol?: string;
  baseCoin?: string;
  limit?: number;
  cursor?: string;
}

export interface GetDeliveryPriceParamsV5 {
  category: 'linear' | 'inverse' | 'option';
  symbol?: string;
  baseCoin?: string;
  limit?: number;
  cursor?: string;
}

export interface GetLongShortRatioParamsV5 {
  category: 'linear' | 'inverse';
  symbol: string;
  period: OpenInterestIntervalV5;
  startTime?: string;
  endTime?: string;
  limit?: number;
  cursor?: string;
}
