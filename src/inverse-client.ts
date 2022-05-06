import { AxiosRequestConfig } from 'axios';
import {
  GenericAPIResponse,
  getRestBaseUrl,
  RestClientOptions,
} from './util/requestUtils';
import RequestWrapper from './util/requestWrapper';
import {
  APIResponse,
  APIResponseWithTime,
  AssetExchangeRecordsReq,
  CoinParam,
  SymbolFromLimitParam,
  SymbolInfo,
  SymbolIntervalFromLimitParam,
  SymbolLimitParam,
  SymbolParam,
  SymbolPeriodLimitParam,
  WalletFundRecordsReq,
  WithdrawRecordsReq,
} from './types/shared';
import BaseRestClient from './util/BaseRestClient';

export class InverseClient extends BaseRestClient {
  /** @deprecated,  */
  protected requestWrapper: RequestWrapper;

  /**
   * @public Creates an instance of the inverse REST API client.
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
      requestOptions
    );
    this.requestWrapper = new RequestWrapper(
      key,
      secret,
      getRestBaseUrl(useLivenet, restClientOptions),
      { ...restClientOptions, disable_time_sync: true },
      requestOptions
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

  getApiAnnouncements(): Promise<APIResponseWithTime<any[]>> {
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
    tp_trigger_by?: 'LastPrice' | 'MarkPrice' | 'IndexPrice';
    sl_trigger_by?: 'LastPrice' | 'MarkPrice' | 'IndexPrice';
    close_on_trigger?: boolean;
    order_link_id?: string;
  }): GenericAPIResponse {
    return this.requestWrapper.post('v2/private/order/create', orderRequest);
  }

  getActiveOrderList(params: {
    symbol: string;
    order_status?: string;
    direction?: string;
    limit?: number;
    cursor?: string;
  }): GenericAPIResponse {
    return this.getPrivate('v2/private/order/list', params);
  }

  cancelActiveOrder(params: {
    symbol: string;
    order_id?: string;
    order_link_id?: string;
  }): GenericAPIResponse {
    return this.requestWrapper.post('v2/private/order/cancel', params);
  }

  cancelAllActiveOrders(params: SymbolParam): GenericAPIResponse {
    return this.requestWrapper.post('v2/private/order/cancelAll', params);
  }

  replaceActiveOrder(params: {
    order_id?: string;
    order_link_id?: string;
    symbol: string;
    p_r_qty?: number;
    p_r_price?: string;
    take_profit?: number;
    stop_loss?: number;
    tp_trigger_by?: string;
    sl_trigger_by?: string;
  }): GenericAPIResponse {
    return this.requestWrapper.post('v2/private/order/replace', params);
  }

  queryActiveOrder(params: {
    order_id?: string;
    order_link_id?: string;
    symbol: string;
  }): GenericAPIResponse {
    return this.getPrivate('v2/private/order', params);
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
    return this.requestWrapper.post('v2/private/stop-order/create', params);
  }

  /** get conditional order list. This may see delays, use queryConditionalOrder() for real-time queries */
  getConditionalOrder(params: {
    symbol: string;
    stop_order_status?: string;
    direction?: string;
    limit?: number;
    cursor?: string;
  }): GenericAPIResponse {
    return this.getPrivate('v2/private/stop-order/list', params);
  }

  cancelConditionalOrder(params: {
    symbol: string;
    stop_order_id?: string;
    order_link_id?: string;
  }): GenericAPIResponse {
    return this.requestWrapper.post('v2/private/stop-order/cancel', params);
  }

  cancelAllConditionalOrders(params: SymbolParam): GenericAPIResponse {
    return this.requestWrapper.post('v2/private/stop-order/cancelAll', params);
  }

  replaceConditionalOrder(params: {
    stop_order_id?: string;
    order_link_id?: string;
    symbol: string;
    p_r_qty?: number;
    p_r_price?: string;
    p_r_trigger_price?: string;
  }): GenericAPIResponse {
    return this.requestWrapper.post('v2/private/stop-order/replace', params);
  }

  queryConditionalOrder(params: {
    symbol: string;
    stop_order_id?: string;
    order_link_id?: string;
  }): GenericAPIResponse {
    return this.getPrivate('v2/private/stop-order', params);
  }

  /**
   * Position
   */

  getPosition(params?: Partial<SymbolParam>): GenericAPIResponse {
    return this.getPrivate('v2/private/position/list', params);
  }

  changePositionMargin(params: {
    symbol: string;
    margin: string;
  }): GenericAPIResponse {
    return this.requestWrapper.post('position/change-position-margin', params);
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
    return this.requestWrapper.post('v2/private/position/trading-stop', params);
  }

  setUserLeverage(params: {
    symbol: string;
    leverage: number;
    leverage_only?: boolean;
  }): GenericAPIResponse {
    return this.requestWrapper.post(
      'v2/private/position/leverage/save',
      params
    );
  }

  getTradeRecords(params: {
    order_id?: string;
    symbol: string;
    start_time?: number;
    page?: number;
    limit?: number;
    order?: string;
  }): GenericAPIResponse {
    return this.getPrivate('v2/private/execution/list', params);
  }

  getClosedPnl(params: {
    symbol: string;
    start_time?: number;
    end_time?: number;
    exec_type?: string;
    page?: number;
    limit?: number;
  }): GenericAPIResponse {
    return this.getPrivate('v2/private/trade/closed-pnl/list', params);
  }

  setPositionMode(params: { symbol: string; mode: 0 | 3 }): GenericAPIResponse {
    return this.requestWrapper.post('v2/private/position/switch-mode', params);
  }

  setSlTpPositionMode(params: {
    symbol: string;
    tp_sl_mode: 'Full' | 'Partial';
  }): GenericAPIResponse {
    return this.requestWrapper.post('v2/private/tpsl/switch-mode', params);
  }

  setMarginType(params: {
    symbol: string;
    is_isolated: boolean;
    buy_leverage: number;
    sell_leverage: number;
  }): GenericAPIResponse {
    return this.requestWrapper.post(
      'v2/private/position/switch-isolated',
      params
    );
  }

  /**
   * Risk Limit
   */

  getRiskLimitList(): GenericAPIResponse {
    return this.get('open-api/wallet/risk-limit/list');
  }

  setRiskLimit(params: {
    symbol: string;
    risk_id: string;
  }): GenericAPIResponse {
    return this.requestWrapper.post('open-api/wallet/risk-limit', params);
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
