import { AxiosRequestConfig } from 'axios';
import { GenericAPIResponse, getRestBaseUrl, RestClientOptions } from './util/requestUtils';
import RequestWrapper from './util/requestWrapper';
import SharedEndpoints from './shared-endpoints';

export class InverseClient extends SharedEndpoints {
  protected requestWrapper: RequestWrapper;

  /**
   * @public Creates an instance of the inverse REST API client.
   *
   * @param {string} key - your API key
   * @param {string} secret - your API secret
   * @param {boolean} [useLivenet=false]
   * @param {RestClientOptions} [restInverseOptions={}] options to configure REST API connectivity
   * @param {AxiosRequestConfig} [requestOptions={}] HTTP networking options for axios
   */
  constructor(
    key?: string | undefined,
    secret?: string | undefined,
    useLivenet?: boolean,
    restInverseOptions: RestClientOptions = {},
    requestOptions: AxiosRequestConfig = {}
  ) {
    super()
    this.requestWrapper = new RequestWrapper(
      key,
      secret,
      getRestBaseUrl(useLivenet, restInverseOptions),
      restInverseOptions,
      requestOptions
    );
    return this;
  }

  /**
   *
   * Market Data Endpoints
   *
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
   * @deprecated use getTickers() instead
   */
  getLatestInformation(params?: {
    symbol?: string;
   }): GenericAPIResponse {
    return this.getTickers(params);
   }

  /**
   * @deprecated use getTrades() instead
   */
  getPublicTradingRecords(params: {
    symbol: string;
    from?: number;
    limit?: number;
  }): GenericAPIResponse {
    return this.getTrades(params);
  }

  getTrades(params: {
    symbol: string;
    from?: number;
    limit?: number;
  }): GenericAPIResponse {
    return this.requestWrapper.get('v2/public/trading-records', params);
  }

  /**
   * @deprecated use getLiquidations() instead
   */
  getPublicLiquidations(params: {
    symbol: string;
    from?: number;
    limit?: number;
    start_time?: number;
    end_time?: number;
  }): GenericAPIResponse {
    return this.getLiquidations(params);
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
    return this.requestWrapper.post('v2/private/order/create', orderRequest);
  }

  getActiveOrderList(params: {
    symbol: string;
    order_status?: string;
    direction?: string;
    limit?: number;
    cursor?: string;
  }): GenericAPIResponse {
    return this.requestWrapper.get('v2/private/order/list', params);
  }

  cancelActiveOrder(params: {
    symbol: string;
    order_id?: string;
    order_link_id?: string;
  }): GenericAPIResponse {
    return this.requestWrapper.post('v2/private/order/cancel', params);
  }

  cancelAllActiveOrders(params: {
    symbol: string;
  }): GenericAPIResponse {
    return this.requestWrapper.post('v2/private/order/cancelAll', params);
  }

  replaceActiveOrder(params: {
    order_id?: string;
    order_link_id?: string;
    symbol: string;
    p_r_qty?: string;
    p_r_price?: string;
  }): GenericAPIResponse {
    return this.requestWrapper.post('v2/private/order/replace', params);
  }

  queryActiveOrder(params: {
    order_id?: string;
    order_link_id?: string;
    symbol: string;
  }): GenericAPIResponse {
    return this.requestWrapper.get('v2/private/order', params);
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

  getConditionalOrder(params: {
    symbol: string;
    stop_order_status?: string;
    direction?: string;
    limit?: number;
    cursor?: string;
  }): GenericAPIResponse {
    return this.requestWrapper.get('v2/private/stop-order/list', params);
  }

  cancelConditionalOrder(params: {
    symbol: string;
    stop_order_id?: string;
    order_link_id?: string;
  }): GenericAPIResponse {
    return this.requestWrapper.post('v2/private/stop-order/cancel', params);
  }

  cancelAllConditionalOrders(params: {
    symbol: string;
  }): GenericAPIResponse {
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
    return this.requestWrapper.get('v2/private/stop-order', params);
  }

	/**
   * Position
   */

  /**
   * @deprecated use getPosition() instead
   */
  getUserLeverage(): GenericAPIResponse {
    return this.requestWrapper.get('user/leverage');
  }

  getPosition(params?: {
    symbol?: string;
  }): GenericAPIResponse {
    return this.requestWrapper.get('v2/private/position/list', params);
  }

  /**
   * @deprecated use getPosition() instead
   */
  getPositions(): GenericAPIResponse {
    return this.requestWrapper.get('position/list');
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
    tp_trigger_by?: string;
    sl_trigger_by?: string;
    new_trailing_active?: number;
  }): GenericAPIResponse {
    return this.requestWrapper.post('v2/private/position/trading-stop', params);
  }

  setUserLeverage(params: {
    symbol: string;
    leverage: number;
  }): GenericAPIResponse {
    return this.requestWrapper.post('v2/private/position/leverage/save', params);
  }

  /**
   * @deprecated use setUserLeverage() instead
   */
  changeUserLeverage(params: any): GenericAPIResponse {
    return this.setUserLeverage(params);
  }

  getTradeRecords(params: {
    order_id?: string;
    symbol: string;
    start_time?: number;
    page?: number;
    limit?: number;
    order?: string;
  }): GenericAPIResponse {
    return this.requestWrapper.get('v2/private/execution/list', params);
  }

  getClosedPnl(params: {
    symbol: string;
    start_time?: number;
    end_time?: number;
    exec_type?: string;
    page?: number;
    limit?: number;
  }): GenericAPIResponse {
    return this.requestWrapper.get('v2/private/trade/closed-pnl/list', params);
  }

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
