import { AxiosRequestConfig } from 'axios';
import { GenericAPIResponse, getRestBaseUrl, RestClientOptions } from './util/requestUtils';
import RequestWrapper from './util/requestWrapper';
import SharedEndpoints from './shared-endpoints';

export class InverseFuturesClient extends SharedEndpoints {
  protected requestWrapper: RequestWrapper;

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
    super();

    this.requestWrapper = new RequestWrapper(
      key,
      secret,
      getRestBaseUrl(useLivenet, restClientOptions),
      restClientOptions,
      requestOptions
    );
    return this;
  }

  /**
   *
   * Market Data Endpoints
   *    Note: These are currently the same as the inverse client
   */

  getKline(params: {
    symbol: string;
    interval: string;
    from: number;
    limit?: number;
  }): GenericAPIResponse {
    return this.requestWrapper.get('v2/public/kline/list', params);
  }

  /**
   * Public trading records
   */
  getTrades(params: {
    symbol: string;
    from?: number;
    limit?: number;
  }): GenericAPIResponse {
    return this.requestWrapper.get('v2/public/trading-records', params);
  }

  getMarkPriceKline(params: {
    symbol: string;
    interval: string;
    from: number;
    limit?: number;
  }): GenericAPIResponse {
    return this.requestWrapper.get('v2/public/mark-price-kline', params);
  }

  getIndexPriceKline(params: {
    symbol: string;
    interval: string;
    from: number;
    limit?: number;
  }): GenericAPIResponse {
    return this.requestWrapper.get('v2/public/index-price-kline', params);
  }

  getPremiumIndexKline(params: {
    symbol: string;
    interval: string;
    from: number;
    limit?: number;
  }): GenericAPIResponse {
    return this.requestWrapper.get('v2/public/premium-index-kline', params);
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
    return this.requestWrapper.post('futures/private/order/create', orderRequest);
  }

  getActiveOrderList(params: {
    symbol: string;
    order_status?: string;
    direction?: string;
    limit?: number;
    cursor?: string;
  }): GenericAPIResponse {
    return this.requestWrapper.get('futures/private/order/list', params);
  }

  cancelActiveOrder(params: {
    symbol: string;
    order_id?: string;
    order_link_id?: string;
  }): GenericAPIResponse {
    return this.requestWrapper.post('futures/private/order/cancel', params);
  }

  cancelAllActiveOrders(params: {
    symbol: string;
  }): GenericAPIResponse {
    return this.requestWrapper.post('futures/private/order/cancelAll', params);
  }

  replaceActiveOrder(params: {
    order_id?: string;
    order_link_id?: string;
    symbol: string;
    p_r_qty?: string;
    p_r_price?: string;
  }): GenericAPIResponse {
    return this.requestWrapper.post('futures/private/order/replace', params);
  }

  queryActiveOrder(params: {
    order_id?: string;
    order_link_id?: string;
    symbol: string;
  }): GenericAPIResponse {
    return this.requestWrapper.get('futures/private/order', params);
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
    return this.requestWrapper.post('futures/private/stop-order/create', params);
  }

  getConditionalOrder(params: {
    symbol: string;
    stop_order_status?: string;
    direction?: string;
    limit?: number;
    cursor?: string;
  }): GenericAPIResponse {
    return this.requestWrapper.get('futures/private/stop-order/list', params);
  }

  cancelConditionalOrder(params: {
    symbol: string;
    stop_order_id?: string;
    order_link_id?: string;
  }): GenericAPIResponse {
    return this.requestWrapper.post('futures/private/stop-order/cancel', params);
  }

  cancelAllConditionalOrders(params: {
    symbol: string;
  }): GenericAPIResponse {
    return this.requestWrapper.post('futures/private/stop-order/cancelAll', params);
  }

  replaceConditionalOrder(params: {
    stop_order_id?: string;
    order_link_id?: string;
    symbol: string;
    p_r_qty?: number;
    p_r_price?: string;
    p_r_trigger_price?: string;
  }): GenericAPIResponse {
    return this.requestWrapper.post('futures/private/stop-order/replace', params);
  }

  queryConditionalOrder(params: {
    symbol: string;
    stop_order_id?: string;
    order_link_id?: string;
  }): GenericAPIResponse {
    return this.requestWrapper.get('futures/private/stop-order', params);
  }

	/**
   * Position
   */


  /**
   * Get position list
   */
  getPosition(params?: {
    symbol?: string;
  }): GenericAPIResponse {
    return this.requestWrapper.get('futures/private/position/list', params);
  }

  changePositionMargin(params: {
    symbol: string;
    margin: string;
  }): GenericAPIResponse {
    return this.requestWrapper.post('futures/private/position/change-position-margin', params);
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
    return this.requestWrapper.post('futures/private/position/trading-stop', params);
  }

  setUserLeverage(params: {
    symbol: string;
    buy_leverage: number;
    sell_leverage: number;
  }): GenericAPIResponse {
    return this.requestWrapper.post('futures/private/position/leverage/save', params);
  }

  /**
   * Position mode switch
   */
  setPositionMode(params: {
    symbol: string;
    mode: number;
  }): GenericAPIResponse {
    return this.requestWrapper.post('futures/private/position/switch-mode', params);
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
    return this.requestWrapper.post('futures/private/position/switch-isolated', params);
  }

  getTradeRecords(params: {
    order_id?: string;
    symbol: string;
    start_time?: number;
    page?: number;
    limit?: number;
    order?: string;
  }): GenericAPIResponse {
    return this.requestWrapper.get('futures/private/execution/list', params);
  }

  getClosedPnl(params: {
    symbol: string;
    start_time?: number;
    end_time?: number;
    exec_type?: string;
    page?: number;
    limit?: number;
  }): GenericAPIResponse {
    return this.requestWrapper.get('futures/private/trade/closed-pnl/list', params);
  }

  /**
   **** The following are all the same as the inverse client ****
   */

	/**
   * Risk Limit
   */
  getRiskLimitList(): GenericAPIResponse {
    return this.requestWrapper.get('open-api/wallet/risk-limit/list');
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

  getLastFundingRate(params: {
    symbol: string;
  }): GenericAPIResponse {
    return this.requestWrapper.get('v2/public/funding/prev-funding-rate', params);
  }

  getMyLastFundingFee(params: {
    symbol: string;
  }): GenericAPIResponse {
    return this.requestWrapper.get('v2/private/funding/prev-funding', params);
  }

  getPredictedFunding(params: {
    symbol: string;
  }): GenericAPIResponse {
    return this.requestWrapper.get('v2/private/funding/predicted-funding', params);
  }

	/**
   * LCP Info
   */

  getLcpInfo(params: {
    symbol: string;
  }): GenericAPIResponse {
    return this.requestWrapper.get('v2/private/account/lcp', params);
  }
};
