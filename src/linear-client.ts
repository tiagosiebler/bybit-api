import { AxiosRequestConfig } from 'axios';
import { GenericAPIResponse, getRestBaseUrl, RestClientOptions } from './util/requestUtils';
import RequestWrapper from './util/requestWrapper';
import SharedEndpoints from './shared-endpoints';
import { SymbolIntervalFromLimitParam, SymbolLimitParam, SymbolParam } from '.';

export class LinearClient extends SharedEndpoints {
  protected requestWrapper: RequestWrapper;

  /**
   * @public Creates an instance of the linear REST API client.
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
   *
   */

  getKline(params: SymbolIntervalFromLimitParam): GenericAPIResponse {
    return this.requestWrapper.get('public/linear/kline', params);
  }

  getTrades(params: SymbolLimitParam): GenericAPIResponse {
    return this.requestWrapper.get('public/linear/recent-trading-records', params);
  }

  getLastFundingRate(params: SymbolParam): GenericAPIResponse {
    return this.requestWrapper.get('public/linear/funding/prev-funding-rate', params);
  }

  getMarkPriceKline(params: SymbolIntervalFromLimitParam): GenericAPIResponse {
    return this.requestWrapper.get('public/linear/mark-price-kline', params);
  }

  getIndexPriceKline(params: SymbolIntervalFromLimitParam): GenericAPIResponse {
    return this.requestWrapper.get('public/linear/index-price-kline', params);
  }

  getPremiumIndexKline(params: SymbolIntervalFromLimitParam): GenericAPIResponse {
    return this.requestWrapper.get('public/linear/premium-index-kline', params);
  }

  /**
   *
   * Account Data Endpoints
   *
   */

  placeActiveOrder(params: {
    side: string;
    symbol: string;
    order_type: string;
    qty: number;
    price?: number;
    time_in_force: string;
    take_profit?: number;
    stop_loss?: number;
    tp_trigger_by?: string;
    sl_trigger_by?: string;
    reduce_only: boolean;
    close_on_trigger: boolean;
    order_link_id?: string;
    position_idx?: number;
  }): GenericAPIResponse {
    return this.requestWrapper.post('private/linear/order/create', params);
  }

   getActiveOrderList(params: {
    order_id?: string;
    order_link_id?: string;
    symbol: string;
    order?: string;
    page?: number;
    limit?: number;
    order_status?: string;
  }): GenericAPIResponse {
    return this.requestWrapper.get('private/linear/order/list', params);
  }

  cancelActiveOrder(params: {
    symbol: string;
    order_id?: string;
    order_link_id?: string;
  }): GenericAPIResponse {
    return this.requestWrapper.post('private/linear/order/cancel', params);
  }

  cancelAllActiveOrders(params: SymbolParam): GenericAPIResponse {
    return this.requestWrapper.post('private/linear/order/cancel-all', params);
  }

  replaceActiveOrder(params: {
    order_id?: string;
    order_link_id?: string;
    symbol: string;
    p_r_qty?: number;
    p_r_price?: number;
    take_profit?: number;
    stop_loss?: number;
    tp_trigger_by?: string;
    sl_trigger_by?: string;
  }): GenericAPIResponse {
    return this.requestWrapper.post('private/linear/order/replace', params);
  }

  queryActiveOrder(params: {
    order_id?: string;
    order_link_id?: string;
    symbol: string;
  }): GenericAPIResponse {
    return this.requestWrapper.get('private/linear/order/search', params);
  }

  /**
  * Conditional orders
  */

  placeConditionalOrder(params: {
    side: string;
    symbol: string;
    order_type: string;
    qty: number;
    price?: number;
    base_price: number;
    stop_px: number;
    time_in_force: string;
    trigger_by?: string;
    close_on_trigger?: boolean;
    order_link_id?: string;
    reduce_only: boolean;
    take_profit?: number;
    stop_loss?: number;
    tp_trigger_by?: string;
    sl_trigger_by?: string;
  }): GenericAPIResponse {
    return this.requestWrapper.post('private/linear/stop-order/create', params);
  }

  getConditionalOrder(params: {
    stop_order_id?: string;
    order_link_id?: string;
    symbol: string;
    stop_order_status?: string;
    order?: string;
    page?: number;
    limit?: number;
  }): GenericAPIResponse {
    return this.requestWrapper.get('private/linear/stop-order/list', params);
  }

  cancelConditionalOrder(params: {
    symbol: string;
    stop_order_id?: string;
    order_link_id?: string;
  }): GenericAPIResponse {
    return this.requestWrapper.post('private/linear/stop-order/cancel', params);
  }

  cancelAllConditionalOrders(params: SymbolParam): GenericAPIResponse {
    return this.requestWrapper.post('private/linear/stop-order/cancel-all', params);
  }

  replaceConditionalOrder(params: {
    stop_order_id?: string;
    order_link_id?: string;
    symbol: string;
    p_r_qty?: number;
    p_r_price?: number;
    p_r_trigger_price?: number;
    take_profit?: number;
    stop_loss?: number;
    tp_trigger_by?: string;
    sl_trigger_by?: string;
  }): GenericAPIResponse {
    return this.requestWrapper.post('private/linear/stop-order/replace', params);
  }

  queryConditionalOrder(params: {
    symbol: string;
    stop_order_id?: string;
    order_link_id?: string;
  }): GenericAPIResponse {
    return this.requestWrapper.get('private/linear/stop-order/search', params);
  }

  /**
   * Position
   */

  getPosition(params?: Partial<SymbolParam>): GenericAPIResponse {
    return this.requestWrapper.get('private/linear/position/list', params);
  }

  setAutoAddMargin(params?: {
    symbol: string;
    side: string;
    auto_add_margin: boolean;
  }): GenericAPIResponse {
    return this.requestWrapper.post('private/linear/position/set-auto-add-margin', params);
  }

  setMarginSwitch(params?: {
    symbol: string;
    is_isolated: boolean;
    buy_leverage: number;
    sell_leverage: number;
  }): GenericAPIResponse {
    return this.requestWrapper.post('private/linear/position/switch-isolated', params);
  }

  setSwitchMode(params?: {
    symbol: string;
    tp_sl_mode: string;
  }): GenericAPIResponse {
    return this.requestWrapper.post('private/linear/tpsl/switch-mode', params);
  }

  setAddReduceMargin(params?: {
    symbol: string;
    side: string;
    margin: number;
  }): GenericAPIResponse {
    return this.requestWrapper.post('private/linear/position/add-margin', params);
  }

  setUserLeverage(params: {
    symbol: string;
    buy_leverage: number;
    sell_leverage: number;
  }): GenericAPIResponse {
    return this.requestWrapper.post('private/linear/position/set-leverage', params);
  }

  setTradingStop(params: {
    symbol: string;
    side: string;
    take_profit?: number;
    stop_loss?: number;
    trailing_stop?: number;
    tp_trigger_by?: string;
    sl_trigger_by?: string;
    sl_size?: number;
    tp_size?: number;
  }): GenericAPIResponse {
    return this.requestWrapper.post('private/linear/position/trading-stop', params);
  }

  getTradeRecords(params: {
    symbol: string;
    start_time?: number;
    end_time?: number;
    exec_type?: string;
    page?: number;
    limit?: number;
  }): GenericAPIResponse {
    return this.requestWrapper.get('private/linear/trade/execution/list', params);
  }

  getClosedPnl(params: {
    symbol: string;
    start_time?: number;
    end_time?: number;
    exec_type?: string;
    page?: number;
    limit?: number;
  }): GenericAPIResponse {
    return this.requestWrapper.get('private/linear/trade/closed-pnl/list', params);
  }

  /**
  * Risk Limit
  */

  getRiskLimitList(params: SymbolParam): GenericAPIResponse {
    return this.requestWrapper.get('public/linear/risk-limit', params);
  }

  setRiskLimit(params: {
    symbol: string;
    side: string;
    risk_id: string;
  }): GenericAPIResponse {
    return this.requestWrapper.get('private/linear/position/set-risk', params);
  }

  /**
  * Funding
  */

  getPredictedFundingFee(params: SymbolParam): GenericAPIResponse {
    return this.requestWrapper.get('private/linear/funding/predicted-funding', params);
  }

  getLastFundingFee(params: SymbolParam): GenericAPIResponse {
    return this.requestWrapper.get('private/linear/funding/prev-funding', params);
  }
}
