import {
  APIResponseV3WithTime,
  APIResponseWithTime,
  CategoryV5,
  GetFundingRateHistoryParamsV5,
  GetHistoricalVolatilityParamsV5,
  GetIndexPriceKlineParamsV5,
  GetInstrumentsInfoParamsV5,
  GetInsuranceParamsV5,
  GetKlineParamsV5,
  GetMarkPriceKlineParamsV5,
  GetOpenInterestParamsV5,
  GetOptionDeliveryPriceParamsV5,
  GetOrderbookParamsV5,
  GetPremiumIndexPriceKlineParams,
  GetPublicTradingHistoryParamsV5,
  GetRiskLimitParamsV5,
  GetTickersParamsV5,
} from './types';
import {
  CategoryListV5,
  FundingRateHistoryResponseV5,
  HistoricalVolatilityV5,
  IndexPriceKlineResponseV5,
  InstrumentInfoV5,
  InsuranceResponseV5,
  KlineResponseV5,
  MarkPriceKlineResponseV5,
  OpenInterestResponseV5,
  OptionDeliveryPriceResponseV5,
  OrderbookResponseV5,
  PaginatedListV5,
  PremiumIndexPriceKlineResponse,
  PublicTradeV5,
  RiskLimitV5,
  TickersLinearInverseResponseV5,
  TickersOptionResponseV5,
  TickersSpotResponseV5,
} from './types/response/v5-market';
import { REST_CLIENT_TYPE_ENUM } from './util';
import BaseRestClient from './util/BaseRestClient';

/**
 * REST API client for V5 REST APIs
 * https://bybit-exchange.github.io/docs/v5/intro
 */
export class RestClientV5 extends BaseRestClient {
  getClientType() {
    return REST_CLIENT_TYPE_ENUM.v3;
  }

  async fetchServerTime(): Promise<number> {
    const res = await this.getServerTime();
    return Number(res.time);
  }

  getServerTime(): Promise<
    APIResponseV3WithTime<{ timeSecond: string; timeNano: string }>
  > {
    return this.get('/v3/public/time');
  }

  /**
   *
   * Market APIs
   *
   */

  /**
   * Query the kline data. Charts are returned in groups based on the requested interval.
   * Covers: Spot / Linear contract / Inverse contract
   */
  getKline(
    params: GetKlineParamsV5
  ): Promise<APIResponseV3WithTime<KlineResponseV5>> {
    return this.get(`/v5/market/kline`, params);
  }

  /**
   * Query the mark price kline data. Charts are returned in groups based on the requested interval.
   * Covers: Linear contract / Inverse contract
   */
  getMarkPriceKline(
    params: GetMarkPriceKlineParamsV5
  ): Promise<APIResponseV3WithTime<MarkPriceKlineResponseV5>> {
    return this.get(`/v5/market/mark-price-kline`, params);
  }

  /**
   * Query the index price kline data. Charts are returned in groups based on the requested interval.
   * Covers: Linear contract / Inverse contract
   */
  getIndexPriceKline(
    params: GetIndexPriceKlineParamsV5
  ): Promise<APIResponseV3WithTime<IndexPriceKlineResponseV5>> {
    return this.get(`/v5/market/index-price-kline`, params);
  }

  /**
   * Retrieve the premium index price kline data. Charts are returned in groups based on the requested interval.
   * Covers: Linear contract
   */
  getPremiumIndexPriceKline(
    params: GetPremiumIndexPriceKlineParams
  ): Promise<APIResponseV3WithTime<PremiumIndexPriceKlineResponse>> {
    return this.get(`/v5/market/premium-index-price-kline`, params);
  }

  /**
   * Query a list of instruments of online trading pair.
   * Covers: Spot / Linear contract / Inverse contract / Option
   * Note: Spot does not support pagination, so limit & cursor are invalid.
   */
  getInstrumentsInfo(
    params: GetInstrumentsInfoParamsV5
  ): Promise<APIResponseV3WithTime<PaginatedListV5<InstrumentInfoV5>>> {
    return this.get(`/v5/market/instruments-info`, params);
  }

  /**
   * Query orderbook data
   * Covers: Spot / Linear contract / Inverse contract / Option
   */
  getOrderbook(
    params: GetOrderbookParamsV5
  ): Promise<APIResponseV3WithTime<OrderbookResponseV5>> {
    return this.get(`/v5/market/orderbook`, params);
  }

  /**
   * Query the latest price snapshot, best bid/ask price, and trading volume in the last 24 hours.
   * Covers: Spot / Linear contract / Inverse contract / Option
   */
  getTickers(
    params: GetTickersParamsV5
  ): Promise<
    APIResponseV3WithTime<
      | TickersLinearInverseResponseV5
      | TickersOptionResponseV5
      | TickersSpotResponseV5
    >
  > {
    return this.get(`/v5/market/tickers`, params);
  }

  /**
   * Query historical funding rate. Each symbol has a different funding interval.
   * Covers: Linear contract / Inverse perpetual
   */
  getFundingRateHistory(
    params: GetFundingRateHistoryParamsV5
  ): Promise<
    APIResponseV3WithTime<
      CategoryListV5<FundingRateHistoryResponseV5, 'linear' | 'inverse'>
    >
  > {
    return this.get(`/v5/market/funding/history`, params);
  }

  /**
   * Query recent public trading data in Bybit.
   * Covers: Spot / Linear contract / Inverse contract / Option
   */
  getPublicTradingHistory(
    params: GetPublicTradingHistoryParamsV5
  ): Promise<APIResponseV3WithTime<CategoryListV5<PublicTradeV5, CategoryV5>>> {
    return this.get(`/v5/market/recent-trade`, params);
  }

  /**
   * Get open interest of each symbol.
   * Covers: Linear contract / Inverse contract
   */
  getOpenInterest(
    params: GetOpenInterestParamsV5
  ): Promise<APIResponseV3WithTime<OpenInterestResponseV5>> {
    return this.get(`/v5/market/open-interest`, params);
  }

  /**
   * Query option historical volatility
   * Covers: Option
   */
  getHistoricalVolatility(
    params: GetHistoricalVolatilityParamsV5
  ): Promise<
    APIResponseV3WithTime<CategoryListV5<HistoricalVolatilityV5, 'option'>>
  > {
    return this.get(`/v5/market/historical-volatility`, params);
  }

  /**
   * Query Bybit insurance pool data (BTC/USDT/USDC etc). The data is updated every 24 hours.
   */
  getInsurance(
    params?: GetInsuranceParamsV5
  ): Promise<APIResponseV3WithTime<InsuranceResponseV5>> {
    return this.get(`/v5/market/insurance`, params);
  }

  /**
   * Query risk limit of futures
   * Covers: Linear contract / Inverse contract
   */
  getRiskLimit(
    params?: GetRiskLimitParamsV5
  ): Promise<
    APIResponseV3WithTime<CategoryListV5<RiskLimitV5, 'inverse' | 'linear'>>
  > {
    return this.get(`/v5/market/risk-limit`, params);
  }

  /**
   * Get the delivery price for option
   * Covers: Option
   */
  getOptionDeliveryPrice(
    params: GetOptionDeliveryPriceParamsV5
  ): Promise<APIResponseV3WithTime<OptionDeliveryPriceResponseV5>> {
    return this.get(`/v5/market/delivery-price`, params);
  }
}
