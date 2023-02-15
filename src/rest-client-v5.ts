import {
  APIResponseV3WithTime,
  CategoryListV5,
  CategoryV5,
  FundingRateHistoryResponseV5,
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
  HistoricalVolatilityV5,
  InstrumentInfoV5,
  InsuranceResponseV5,
  OpenInterestResponseV5,
  OrderbookResponseV5,
  OrderParamsV5,
  CursorListV5,
  PublicTradeV5,
  RiskLimitV5,
  AmendOrderParamsV5,
  CancelOrderParamsV5,
  GetAccountOrdersParams,
  OrderResultV5,
  CancelAllOrdersParamsV5,
  BatchOrderParamsV5,
  BatchAmendOrderParamsV5,
  BatchOrderResult,
  BatchOrdersResult,
  BatchAmendOrderResult,
  BatchCancelOrderParamsV5,
  BatchCancelOrderResult,
  OrderSideV5,
  SpotBorrowCheckResult,
  APIResponseV3,
  PositionInfoParamsV5,
  CategoryCursorListV5,
  PositionV5,
  AccountOrderV5,
  OptionDeliveryPriceV5,
  CategorySymbolListV5,
  OHLCV5,
  KlineV5,
  TickerSpotV5,
  TickerOptionV5,
  TickerLinearInverseV5,
} from './types';
import { REST_CLIENT_TYPE_ENUM } from './util';
import BaseRestClient from './util/BaseRestClient';

/**
 * REST API client for V5 REST APIs
 *
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
   *
   * Covers: Spot / Linear contract / Inverse contract
   */
  getKline(
    params: GetKlineParamsV5
  ): Promise<
    APIResponseV3WithTime<
      CategorySymbolListV5<KlineV5[], 'spot' | 'linear' | 'inverse'>
    >
  > {
    return this.get(`/v5/market/kline`, params);
  }

  /**
   * Query the mark price kline data. Charts are returned in groups based on the requested interval.
   *
   * Covers: Linear contract / Inverse contract
   */
  getMarkPriceKline(
    params: GetMarkPriceKlineParamsV5
  ): Promise<
    APIResponseV3WithTime<CategorySymbolListV5<OHLCV5[], 'linear' | 'inverse'>>
  > {
    return this.get(`/v5/market/mark-price-kline`, params);
  }

  /**
   * Query the index price kline data. Charts are returned in groups based on the requested interval.
   *
   * Covers: Linear contract / Inverse contract
   */
  getIndexPriceKline(
    params: GetIndexPriceKlineParamsV5
  ): Promise<
    APIResponseV3WithTime<CategorySymbolListV5<OHLCV5[], 'linear' | 'inverse'>>
  > {
    return this.get(`/v5/market/index-price-kline`, params);
  }

  /**
   * Retrieve the premium index price kline data. Charts are returned in groups based on the requested interval.
   *
   * Covers: Linear contract
   */
  getPremiumIndexPriceKline(
    params: GetPremiumIndexPriceKlineParams
  ): Promise<APIResponseV3WithTime<CategorySymbolListV5<OHLCV5[], 'linear'>>> {
    return this.get(`/v5/market/premium-index-price-kline`, params);
  }

  /**
   * Query a list of instruments of online trading pair.
   *
   * Covers: Spot / Linear contract / Inverse contract / Option
   *
   * Note: Spot does not support pagination, so limit & cursor are invalid.
   */
  getInstrumentsInfo(
    params: GetInstrumentsInfoParamsV5
  ): Promise<APIResponseV3WithTime<CursorListV5<InstrumentInfoV5[]>>> {
    return this.get(`/v5/market/instruments-info`, params);
  }

  /**
   * Query orderbook data
   *
   * Covers: Spot / Linear contract / Inverse contract / Option
   */
  getOrderbook(
    params: GetOrderbookParamsV5
  ): Promise<APIResponseV3WithTime<OrderbookResponseV5>> {
    return this.get(`/v5/market/orderbook`, params);
  }

  /**
   * Query the latest price snapshot, best bid/ask price, and trading volume in the last 24 hours.
   *
   * Covers: Spot / Linear contract / Inverse contract / Option
   */
  getTickers(
    params: GetTickersParamsV5
  ): Promise<
    APIResponseV3WithTime<
      | CategoryListV5<TickerLinearInverseV5[], 'linear' | 'inverse'>
      | CategoryListV5<TickerOptionV5[], 'option'>
      | CategoryListV5<TickerSpotV5[], 'spot'>
    >
  > {
    return this.get(`/v5/market/tickers`, params);
  }

  /**
   * Query historical funding rate. Each symbol has a different funding interval.
   *
   * Covers: Linear contract / Inverse perpetual
   */
  getFundingRateHistory(
    params: GetFundingRateHistoryParamsV5
  ): Promise<
    APIResponseV3WithTime<
      CategoryListV5<FundingRateHistoryResponseV5[], 'linear' | 'inverse'>
    >
  > {
    return this.get(`/v5/market/funding/history`, params);
  }

  /**
   * Query recent public trading data in Bybit.
   *
   * Covers: Spot / Linear contract / Inverse contract / Option
   */
  getPublicTradingHistory(
    params: GetPublicTradingHistoryParamsV5
  ): Promise<
    APIResponseV3WithTime<CategoryListV5<PublicTradeV5[], CategoryV5>>
  > {
    return this.get(`/v5/market/recent-trade`, params);
  }

  /**
   * Get open interest of each symbol.
   *
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
    APIResponseV3WithTime<CategoryListV5<HistoricalVolatilityV5[], 'option'>>
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
   *
   * Covers: Linear contract / Inverse contract
   */
  getRiskLimit(
    params?: GetRiskLimitParamsV5
  ): Promise<
    APIResponseV3WithTime<CategoryListV5<RiskLimitV5[], 'inverse' | 'linear'>>
  > {
    return this.get(`/v5/market/risk-limit`, params);
  }

  /**
   * Get the delivery price for option
   *
   * Covers: Option
   */
  getOptionDeliveryPrice(
    params: GetOptionDeliveryPriceParamsV5
  ): Promise<
    APIResponseV3WithTime<CategoryCursorListV5<OptionDeliveryPriceV5[]>>
  > {
    return this.get(`/v5/market/delivery-price`, params);
  }

  /**
   *
   * Trade APIs
   *
   */

  submitOrder(
    params: OrderParamsV5
  ): Promise<APIResponseV3WithTime<OrderResultV5>> {
    return this.postPrivate(`/v5/order/create`, params);
  }

  amendOrder(
    params: AmendOrderParamsV5
  ): Promise<APIResponseV3WithTime<OrderResultV5>> {
    return this.postPrivate('/v5/order/amend', params);
  }

  cancelOrder(
    params: CancelOrderParamsV5
  ): Promise<APIResponseV3WithTime<OrderResultV5>> {
    return this.postPrivate('/v5/order/cancel', params);
  }

  /**
   * Query unfilled or partially filled orders in real-time. To query older order records, please use the order history interface.
   */
  getActiveOrders(
    params: GetAccountOrdersParams
  ): Promise<APIResponseV3WithTime<CategoryCursorListV5<AccountOrderV5[]>>> {
    return this.getPrivate('/v5/order/realtime', params);
  }

  cancelAllOrders(
    params: CancelAllOrdersParamsV5
  ): Promise<APIResponseV3WithTime<{ list: OrderResultV5[] }>> {
    return this.postPrivate('/v5/order/cancel-all', params);
  }

  /**
   * Query order history. As order creation/cancellation is asynchronous, the data returned from this endpoint may delay.
   *
   * If you want to get real-time order information, you could query this endpoint or rely on the websocket stream (recommended).
   */
  getHistoricOrders(
    params: GetAccountOrdersParams
  ): Promise<APIResponseV3WithTime<CategoryCursorListV5<AccountOrderV5[]>>> {
    return this.getPrivate(`/v5/order/history`, params);
  }

  /**
   * This endpoint allows you to place more than one order in a single request. Covers: option (unified account).
   *
   * Make sure you have sufficient funds in your account when placing an order. Once an order is placed, according to the funds required by the order, the funds in your account will be frozen by the corresponding amount during the life cycle of the order.
   *
   * A maximum of 20 orders can be placed per request. The returned data list is divided into two lists. The first list indicates whether or not the order creation was successful and the second list details the created order information. The structure of the two lists are completely consistent.
   */
  batchSubmitOrders(
    category: 'option',
    orders: BatchOrderParamsV5[]
  ): Promise<APIResponseV3WithTime<BatchOrdersResult<BatchOrderResult[]>>> {
    return this.postPrivate('/v5/order/create-batch', {
      category,
      request: orders,
    });
  }

  /**
   * This endpoint allows you to amend more than one open order in a single request. Covers: option (unified account).
   *
   * You can modify unfilled or partially filled orders. Conditional orders are not supported.
   *
   * A maximum of 20 orders can be amended per request.
   */
  batchAmendOrders(
    category: 'option',
    orders: BatchAmendOrderParamsV5[]
  ): Promise<
    APIResponseV3WithTime<BatchOrdersResult<BatchAmendOrderResult[]>>
  > {
    return this.postPrivate('/v5/order/amend-batch', {
      category,
      request: orders,
    });
  }

  /**
   * This endpoint allows you to cancel more than one open order in a single request. Covers: option (unified account).
   *
   * You must specify orderId or orderLinkId. If orderId and orderLinkId is not matched, the system will process orderId first.
   *
   * You can cancel unfilled or partially filled orders. A maximum of 20 orders can be cancelled per request.
   */
  batchCancelOrders(
    category: 'option',
    orders: BatchCancelOrderParamsV5[]
  ): Promise<
    APIResponseV3WithTime<BatchOrdersResult<BatchCancelOrderResult[]>>
  > {
    return this.postPrivate('/v5/order/cancel-batch', {
      category,
      request: orders,
    });
  }

  /**
   * Query the qty and amount of borrowable coins in spot account.
   *
   * Covers: Spot (Unified Account)
   */
  getSpotBorrowCheck(
    symbol: string,
    side: OrderSideV5
  ): Promise<APIResponseV3WithTime<SpotBorrowCheckResult>> {
    return this.getPrivate('/v5/order/spot-borrow-check', {
      category: 'spot',
      symbol,
      side,
    });
  }

  /**
   * This endpoint allows you to set the disconnection protect time window. Covers: option (unified account).
   *
   * If you need to turn it on/off, you can contact your client manager for consultation and application. The default time window is 10 seconds.
   */
  setDisconnectCancelAllWindow(
    category: 'option',
    timeWindow: number
  ): Promise<APIResponseV3<undefined>> {
    return this.postPrivate('/v5/order/disconnected-cancel-all', {
      category,
      timeWindow,
    });
  }

  /**
   *
   * Position APIs
   *
   */

  /**
   * Query real-time position data, such as position size, cumulative realizedPNL.
   *
   * Unified account covers: Linear contract / Options
   *
   * Normal account covers: USDT perpetual / Inverse perpetual / Inverse futures
   */
  getPositionInfo(
    params: PositionInfoParamsV5
  ): Promise<APIResponseV3WithTime<CategoryCursorListV5<PositionV5[]>>> {
    return this.getPrivate('/v5/position/list', params);
  }

  //
  //
  //
  //
  //
  //
  //
}
