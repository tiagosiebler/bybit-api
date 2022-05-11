import { AxiosRequestConfig } from 'axios';
import {
  GenericAPIResponse,
  getRestBaseUrl,
  RestClientOptions,
  REST_CLIENT_TYPE_ENUM,
} from './util/requestUtils';
import {
  APIResponseWithTime,
  AssetExchangeRecordsReq,
  CoinParam,
  SymbolInfo,
  SymbolIntervalFromLimitParam,
  SymbolLimitParam,
  SymbolParam,
  SymbolPeriodLimitParam,
  WalletFundRecordsReq,
  WithdrawRecordsReq,
} from './types/shared';
import BaseRestClient from './util/BaseRestClient';

export class InverseFuturesClient extends BaseRestClient {
  /**
   * @public Creates an instance of the inverse futures REST API client.
   *
   * @param {string} key - your API key
   * @param {string} secret - your API secret
   * @param {boolean} [useLivenet=false]
   * @param {RestClientOptions} [restClientOptions={}] options to configure REST API connectivity
   * @param {AxiosRequestConfig} [requestOptions={}] HTTP networking options for axios
   */
  constructor(
    key?: string | undefined,
    secret?: string | undefined,
    useLivenet: boolean = false,
    restClientOptions: RestClientOptions = {},
    requestOptions: AxiosRequestConfig = {}
  ) {
    super(
      key,
      secret,
      getRestBaseUrl(useLivenet, restClientOptions),
      restClientOptions,
      requestOptions,
      REST_CLIENT_TYPE_ENUM.inverseFutures
    );
    return this;
  }

  async fetchServerTime(): Promise<number> {
    const res = await this.getServerTime();
    return Number(res.time_now);
  }

  /**
   *
   * Market Data Endpoints
   *
   */

  getOrderBook(params: SymbolParam): Promise<APIResponseWithTime<any[]>> {
    return this.get('v2/public/orderBook/L2', params);
  }

  getKline(
    params: SymbolIntervalFromLimitParam
  ): Promise<APIResponseWithTime<any[]>> {
    return this.get('v2/public/kline/list', params);
  }

  /**
   * Get latest information for symbol
   */
  getTickers(
    params?: Partial<SymbolParam>
  ): Promise<APIResponseWithTime<any[]>> {
    return this.get('v2/public/tickers', params);
  }

  /**
   * Public trading records
   */
  getTrades(params: SymbolLimitParam): Promise<APIResponseWithTime<any[]>> {
    return this.get('v2/public/trading-records', params);
  }

  getSymbols(): Promise<APIResponseWithTime<SymbolInfo[]>> {
    return this.get('v2/public/symbols');
  }

  getMarkPriceKline(
    params: SymbolIntervalFromLimitParam
  ): Promise<APIResponseWithTime<any[]>> {
    return this.get('v2/public/mark-price-kline', params);
  }

  getIndexPriceKline(
    params: SymbolIntervalFromLimitParam
  ): Promise<APIResponseWithTime<any[]>> {
    return this.get('v2/public/index-price-kline', params);
  }

  getPremiumIndexKline(
    params: SymbolIntervalFromLimitParam
  ): Promise<APIResponseWithTime<any[]>> {
    return this.get('v2/public/premium-index-kline', params);
  }

  /**
   *
   * Market Data : Advanced
   *
   */

  getOpenInterest(
    params: SymbolPeriodLimitParam
  ): Promise<APIResponseWithTime<any[]>> {
    return this.get('v2/public/open-interest', params);
  }

  getLatestBigDeal(
    params: SymbolLimitParam
  ): Promise<APIResponseWithTime<any[]>> {
    return this.get('v2/public/big-deal', params);
  }

  getLongShortRatio(
    params: SymbolPeriodLimitParam
  ): Promise<APIResponseWithTime<any[]>> {
    return this.get('v2/public/account-ratio', params);
  }

  /**
   *
   * Account Data Endpoints
   *
   */

  getApiKeyInfo(): GenericAPIResponse {
    return this.getPrivate('v2/private/account/api-key');
  }

  /**
   *
   * Wallet Data Endpoints
   *
   */

  getWalletBalance(params?: Partial<CoinParam>): GenericAPIResponse {
    return this.getPrivate('v2/private/wallet/balance', params);
  }

  getWalletFundRecords(params?: WalletFundRecordsReq): GenericAPIResponse {
    return this.getPrivate('v2/private/wallet/fund/records', params);
  }

  getWithdrawRecords(params?: WithdrawRecordsReq): GenericAPIResponse {
    return this.getPrivate('v2/private/wallet/withdraw/list', params);
  }

  getAssetExchangeRecords(
    params?: AssetExchangeRecordsReq
  ): GenericAPIResponse {
    return this.getPrivate('v2/private/exchange-order/list', params);
  }

  /**
   *
   * API Data Endpoints
   *
   */

  getServerTime(): Promise<APIResponseWithTime<{}>> {
    return this.get('v2/public/time');
  }

  getApiAnnouncements(): GenericAPIResponse {
    return this.get('v2/public/announcement');
  }

  /**
   *
   * Account Data Endpoints
   *
   */

  /**
   * Active orders
   */

  placeActiveOrder(orderRequest: {
    side: string;
    symbol: string;
    order_type: string;
    qty: number;
    price?: number;
    time_in_force: string;
    take_profit?: number;
    stop_loss?: number;
    reduce_only?: boolean;
    close_on_trigger?: boolean;
    order_link_id?: string;
  }): GenericAPIResponse {
    return this.postPrivate('futures/private/order/create', orderRequest);
  }

  getActiveOrderList(params: {
    symbol: string;
    order_status?: string;
    direction?: string;
    limit?: number;
    cursor?: string;
  }): GenericAPIResponse {
    return this.getPrivate('futures/private/order/list', params);
  }

  cancelActiveOrder(params: {
    symbol: string;
    order_id?: string;
    order_link_id?: string;
  }): GenericAPIResponse {
    return this.postPrivate('futures/private/order/cancel', params);
  }

  cancelAllActiveOrders(params: SymbolParam): GenericAPIResponse {
    return this.postPrivate('futures/private/order/cancelAll', params);
  }

  replaceActiveOrder(params: {
    order_id?: string;
    order_link_id?: string;
    symbol: string;
    p_r_qty?: string;
    p_r_price?: string;
  }): GenericAPIResponse {
    return this.postPrivate('futures/private/order/replace', params);
  }

  queryActiveOrder(params: {
    order_id?: string;
    order_link_id?: string;
    symbol: string;
  }): GenericAPIResponse {
    return this.getPrivate('futures/private/order', params);
  }

  /**
   * Conditional orders
   */

  placeConditionalOrder(params: {
    side: string;
    symbol: string;
    order_type: string;
    qty: string;
    price?: string;
    base_price: string;
    stop_px: string;
    time_in_force: string;
    trigger_by?: string;
    close_on_trigger?: boolean;
    order_link_id?: string;
  }): GenericAPIResponse {
    return this.postPrivate('futures/private/stop-order/create', params);
  }

  getConditionalOrder(params: {
    symbol: string;
    stop_order_status?: string;
    direction?: string;
    limit?: number;
    cursor?: string;
  }): GenericAPIResponse {
    return this.getPrivate('futures/private/stop-order/list', params);
  }

  cancelConditionalOrder(params: {
    symbol: string;
    stop_order_id?: string;
    order_link_id?: string;
  }): GenericAPIResponse {
    return this.postPrivate('futures/private/stop-order/cancel', params);
  }

  cancelAllConditionalOrders(params: SymbolParam): GenericAPIResponse {
    return this.postPrivate('futures/private/stop-order/cancelAll', params);
  }

  replaceConditionalOrder(params: {
    stop_order_id?: string;
    order_link_id?: string;
    symbol: string;
    p_r_qty?: number;
    p_r_price?: string;
    p_r_trigger_price?: string;
  }): GenericAPIResponse {
    return this.postPrivate('futures/private/stop-order/replace', params);
  }

  queryConditionalOrder(params: {
    symbol: string;
    stop_order_id?: string;
    order_link_id?: string;
  }): GenericAPIResponse {
    return this.getPrivate('futures/private/stop-order', params);
  }

  /**
   * Position
   */

  /**
   * Get position list
   */
  getPosition(params?: Partial<SymbolParam>): GenericAPIResponse {
    return this.getPrivate('futures/private/position/list', params);
  }

  changePositionMargin(params: {
    symbol: string;
    margin: string;
  }): GenericAPIResponse {
    return this.postPrivate(
      'futures/private/position/change-position-margin',
      params
    );
  }

  setTradingStop(params: {
    symbol: string;
    take_profit?: number;
    stop_loss?: number;
    trailing_stop?: number;
    tp_trigger_by?: string;
    sl_trigger_by?: string;
    new_trailing_active?: number;
  }): GenericAPIResponse {
    return this.postPrivate('futures/private/position/trading-stop', params);
  }

  setUserLeverage(params: {
    symbol: string;
    buy_leverage: number;
    sell_leverage: number;
  }): GenericAPIResponse {
    return this.postPrivate('futures/private/position/leverage/save', params);
  }

  /**
   * Position mode switch
   */
  setPositionMode(params: {
    symbol: string;
    mode: number;
  }): GenericAPIResponse {
    return this.postPrivate('futures/private/position/switch-mode', params);
  }

  /**
   * Cross/Isolated margin switch. Must set leverage value when switching.
   */
  setMarginType(params: {
    symbol: string;
    is_isolated: boolean;
    buy_leverage: number;
    sell_leverage: number;
  }): GenericAPIResponse {
    return this.postPrivate('futures/private/position/switch-isolated', params);
  }

  getTradeRecords(params: {
    order_id?: string;
    symbol: string;
    start_time?: number;
    page?: number;
    limit?: number;
    order?: string;
  }): GenericAPIResponse {
    return this.getPrivate('futures/private/execution/list', params);
  }

  getClosedPnl(params: {
    symbol: string;
    start_time?: number;
    end_time?: number;
    exec_type?: string;
    page?: number;
    limit?: number;
  }): GenericAPIResponse {
    return this.getPrivate('futures/private/trade/closed-pnl/list', params);
  }

  /**
   **** The following are all the same as the inverse client ****
   */

  /**
   * Risk Limit
   */
  getRiskLimitList(): GenericAPIResponse {
    return this.getPrivate('open-api/wallet/risk-limit/list');
  }

  setRiskLimit(params: {
    symbol: string;
    risk_id: string;
  }): GenericAPIResponse {
    return this.postPrivate('open-api/wallet/risk-limit', params);
  }

  /**
   * Funding
   */

  getLastFundingRate(params: SymbolParam): GenericAPIResponse {
    return this.get('v2/public/funding/prev-funding-rate', params);
  }

  getMyLastFundingFee(params: SymbolParam): GenericAPIResponse {
    return this.getPrivate('v2/private/funding/prev-funding', params);
  }

  getPredictedFunding(params: SymbolParam): GenericAPIResponse {
    return this.getPrivate('v2/private/funding/predicted-funding', params);
  }

  /**
   * LCP Info
   */

  getLcpInfo(params: SymbolParam): GenericAPIResponse {
    return this.getPrivate('v2/private/account/lcp', params);
  }
}
