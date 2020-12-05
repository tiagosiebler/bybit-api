import assert from 'assert';
import { AxiosRequestConfig } from 'axios';
import { GenericAPIResponse, RestClientInverseOptions } from './util/requestUtils';
import RequestWrapper from './util/requestWrapper';
import { SharedEndpoints } from './shared-endpoints';

class _LinearClient {
  private requestWrapper: RequestWrapper;

  /**
   * @public Creates an instance of the inverse REST API client.
   *
   * @param {string} key - your API key
   * @param {string} secret - your API secret
   * @param {boolean} [livenet=false]
   * @param {RestClientInverseOptions} [restInverseOptions={}] options to configure REST API connectivity
   * @param {AxiosRequestConfig} [requestOptions={}] HTTP networking options for axios
   */
  constructor(
    key?: string | undefined,
    secret?: string | undefined,
    livenet?: boolean,
    restInverseOptions:RestClientInverseOptions = {}, // TODO: Rename this type to be more general.
    requestOptions: AxiosRequestConfig = {}
  ) {
    this.requestWrapper = new RequestWrapper(key, secret, livenet, restInverseOptions, requestOptions);
  }

  // __ Market Data Endpoints
  // https://bybit-exchange.github.io/docs/linear/#t-marketdata

  /**
   * @public Getch candle data for a symbol.
   */
  getKline(params: any): GenericAPIResponse {
    assert(params, 'No params passed');
    assert(params.symbol, 'Parameter symbol is required');
    assert(params.interval, 'Parameter interval is required');
    assert(params.from, 'Parameter from is required');

    return this.requestWrapper.get('public/linear/kline', params);
  }

  /**
   * @public Get a list of recently executed trades.
   */
  getPublicTradingRecords(params: any): GenericAPIResponse {
    assert(params, 'No params passed');
    assert(params.symbol, 'Parameter symbol is required');

    return this.requestWrapper.get('public/linear/trading-records', params);
  }

  /**
   * @public Get the last funding rate.
   */
  getLastFundingRate(params: any): GenericAPIResponse {
    assert(params, 'No params passed');
    assert(params.symbol, 'Parameter symbol is required');

    return this.requestWrapper.get('public/linear/funding/prev-funding-rate', params);
  }

  /**
   * @public Fetch candle data for a symbol's mark price.
   */
  getMarkPriceKline(params: any): GenericAPIResponse {
    assert(params, 'No params passed');
    assert(params.symbol, 'Parameter symbol is required');
    assert(params.interval, 'Parameter interval is required');
    assert(params.from, 'Parameter from is required');

    return this.requestWrapper.get('public/linear/mark-price-kline', params);
  }

  // __ Account Data Endpoints
  // https://bybit-exchange.github.io/docs/linear/#t-accountdata

  /**
   * @public Place an active order into the order book.
   */
  placeActiveOrder(params: any): GenericAPIResponse {
    assert(params, 'No params passed');
    assert(params.side, 'Parameter side is required');
    assert(params.symbol, 'Parameter symbol is required');
    assert(params.order_type, 'Parameter order_type is required');
    assert(params.qty, 'Parameter qty is required');
    assert(params.time_in_force, 'Parameter time_in_force is required');
    assert(params.reduce_only, 'Parameter reduce_only is required');
    assert(params.close_on_trigger, 'Parameter close_on_trigger is required');

    if (params.order_type === 'Limit') assert(params.price, 'Parameter price is required for limit orders');

    return this.requestWrapper.post('private/linear/order/create', params);
  }

  /**
   * @public Get a list of your active orders.
   */
  getActiveOrder(params: any): GenericAPIResponse {
    assert(params.symbol, 'Parameter symbol is required');

    return this.requestWrapper.get('private/linear/order/list', params);
  }

  /**
   * @public Cancel an active order.
   */
  cancelActiveOrder(params: any): GenericAPIResponse {
    assert(params, 'No params passed');
    assert(params.symbol, 'Parameter symbol is required');
    assert(params.order_id || params.order_link_id, 'Parameter order_id OR order_link_id is required');

    return this.requestWrapper.post('private/linear/order/cancel', params);
  }

  /**
   * @public Cancal all active orders.
   */
  cancelAllActiveOrders(params: any): GenericAPIResponse {
    assert(params, 'No params passed');
    assert(params.symbol, 'Parameter symbol is required');

    return this.requestWrapper.post('private/linear/order/cancel-all', params);
  }

  /**
   * @public Replace an active order.
   */
  replaceActiveOrder(params: any): GenericAPIResponse {
    assert(params, 'No params passed');
    assert(params.order_id || params.order_link_id, 'Parameter order_id OR order_link_id is required');
    assert(params.symbol, 'Parameter symbol is required');

    return this.requestWrapper.post('private/linear/order/replace', params);
  }

  /**
   * @public Query active orders.
   */
  queryActiveOrder(params: any): GenericAPIResponse {
    assert(params, 'No params passed');
    //assert(params.order_id || params.order_link_id, 'Parameter order_id OR order_link_id is required'); // XXX not required on linear
    assert(params.symbol, 'Parameter symbol is required');

    return this.requestWrapper.get('private/linear/order/search', params);
  }

  /**
   * @public Place a conditional order.
   */
  placeConditionalOrder(params: any): GenericAPIResponse {
    assert(params, 'No params passed');
    assert(params.side, 'Parameter side is required');
    assert(params.symbol, 'Parameter symbol is required');
    assert(params.order_type, 'Parameter order_type is required');
    assert(params.qty, 'Parameter qty is required');
    assert(params.base_price, 'Parameter base_price is required');
    assert(params.stop_px, 'Parameter stop_px is required');
    assert(params.time_in_force, 'Parameter time_in_force is required');
    assert(params.close_on_trigger, 'Parameter close_on_trigger is required');
    assert(params.reduce_only, 'Parameter reduce_only is required');

    if (params.order_type === 'Limit') assert(params.price, 'Parameter price is required for limit orders');

    return this.requestWrapper.post('private/linear/stop-order/create', params);
  }

  /**
   * @public Get a list of your conditional orders.
   */
  getConditionalOrder(params: any): GenericAPIResponse {
    assert(params.symbol, 'Parameter symbol is required');

    return this.requestWrapper.get('private/linear/stop-order/list', params);
  }

  /**
   * @public Cancel a conditonal order.
   */
  cancelConditionalOrder(params: any): GenericAPIResponse {
    assert(params, 'No params passed');
    assert(params.stop_order_id || params.order_link_id, 'Parameter stop_order_id OR order_link_id is required');

    return this.requestWrapper.post('private/linear/stop-order/cancel', params);
  }

  /**
   * @public Cancel all conditional orders.
   */
  cancelAllConditionalOrders(params: any): GenericAPIResponse {
    assert(params, 'No params passed');
    assert(params.symbol, 'Parameter symbol is required');

    return this.requestWrapper.post('private/linear/stop-order/cancel-all', params);
  }

  /**
   * @public Replace a conditional order.
   */
  replaceConditionalOrder(params: any): GenericAPIResponse {
    assert(params, 'No params passed');
    assert(params.stop_order_id || params.order_link_id, 'Parameter stop_order_id OR order_link_id is required');
    assert(params.symbol, 'Parameter symbol is required');

    return this.requestWrapper.post('private/linear/stop-order/replace', params);
  }

  /**
   * @public Query conditional orders.
   */
  queryConditionalOrder(params: any): GenericAPIResponse {
    assert(params, 'No params passed');
    assert(params.stop_order_id || params.order_link_id, 'Parameter order_id OR order_link_id is required');
    assert(params.symbol, 'Parameter symbol is required');

    return this.requestWrapper.get('private/linear/stop-order/search', params);
  }

  /**
   * @public Get list of positions.
   */
  getPosition(params?: any): GenericAPIResponse {
    return this.requestWrapper.get('private/linear/position/list', params);
  }

  // The next few are linear-only methods

  /**
   * @public Set auto add margin.
   */
  setAutoAddMargin(params?: any): GenericAPIResponse {
    assert(params, 'No params passed');
    assert(params.symbol, 'Parameter symbol is required');
    assert(params.side, 'Parameter side is required');
    assert(params.auto_add_margin, 'Parameter auto_add_margin is required');

    return this.requestWrapper.post('private/linear/position/set-auto-add-margin', params);
  }

  /**
   * @public Switch to isolated or cross margin mode.
   */
  switchIsolated(params?: any): GenericAPIResponse {
    assert(params, 'No params passed');
    assert(params.symbol, 'Parameter symbol is required');
    assert(params.is_isolated, 'Parameter is_isolated is required');
    assert(params.buy_leverage, 'Parameter buy_leverage is required');
    assert(params.sell_leverage, 'Parameter sell_leverage is required');

    return this.requestWrapper.post('private/linear/position/switch-isolated', params)
  }

  /**
   * @public Switch between partial and full stop loss and take profit mode.
   */
  switchMode(params?: any): GenericAPIResponse {
    assert(params, 'No params passed');
    assert(params.symbol, 'Parameter symbol is required');
    assert(params.tp_sl_mode, 'Parameter tp_sl_mode is required');

    return this.requestWrapper.post('private/linear/tpsl/switch-mode', params)
  }

  /**
   * @public Add or reduce margin.
   */
  addMargin(params?: any): GenericAPIResponse {
    assert(params, 'No params passed');
    assert(params.symbol, 'Parameter symbol is required');
    assert(params.side, 'Parameter side is required');

    return this.requestWrapper.post('private/linear/position/add-margin', params)
  }

  /**
   * @public Set leverage.
   */
  setLeverage(params?: any): GenericAPIResponse {
    assert(params, 'No params passed');
    assert(params.symbol, 'Parameter symbol is required');
    assert(params.buy_leverage, 'Parameter buy_leverage is required');
    assert(params.sell_leverage, 'Parameter sell_leverage is required');

    return this.requestWrapper.post('private/linear/position/set-leverage', params)
  }

  /**
   * @public Set trading stop.
   */
  setTradingStop(params?: any): GenericAPIResponse {
    assert(params, 'No params passed');
    assert(params.symbol, 'Parameter symbol is required');
    assert(params.side, 'Parameter side is required');

    return this.requestWrapper.post('private/linear/position/trading-stop', params);
  }

  /**
   * @public Get list of executed trades.
   */
  getTradeRecords(params?: any): GenericAPIResponse {
    assert(params, 'No params passed');
    assert(params.symbol, 'Parameter symbol is required');

    return this.requestWrapper.get('private/linear/trade/execution/list', params)
  }

  /**
   * @public Get closed PnL.
   */
  getClosedPNL(params?: any): GenericAPIResponse {
    assert(params, 'No params passed');
    assert(params.symbol, 'Parameter symbol is required');

    return this.requestWrapper.get('private/linear/trade/closed-pnl/list', params)
  }

  /**
   * @public Get risk limit.
   */
  getRiskLimitList(params?: any): GenericAPIResponse {
    assert(params, 'No params passed');
    assert(params.symbol, 'Parameter symbol is required');

    return this.requestWrapper.get('public/linear/risk-limit');
  }

  /**
   * @public Get the last funding fee.
   */
  getMyLastFundingFee(params: any): GenericAPIResponse {
    assert(params, 'No params passed');
    assert(params.symbol, 'Parameter symbol is required');

    return this.requestWrapper.get('private/linear/funding/prev-funding', params);
  }

  /**
   * @public Get the next predicted funding.
   */
  getPredictedFunding(params: any): GenericAPIResponse {
    assert(params, 'No params passed');
    assert(params.symbol, 'Parameter symbol is required');

    return this.requestWrapper.get('private/linear/funding/predicted-funding', params);
  }

}

export const LinearClient = SharedEndpoints(_LinearClient);
