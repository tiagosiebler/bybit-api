const assert = require('assert');
const RequestWrapper = require('./util/requestWrapper');

module.exports = class RestClient {
  /**
   * @public Creates an instance of the inverse REST API client.
   *
   * @param {string} key - your API key
   * @param {string} secret - your API secret
   * @param {boolean} [livenet=false]
   * @param {*} [options={}] options to configure REST API connectivity
   * @param {*} [requestOptions={}] HTTP networking options for axios
   */
  constructor(key, secret, livenet=false, options={}, requestOptions={}) {
    this.request = new RequestWrapper(...arguments);
  }

  async placeActiveOrder(params) {
    assert(params, 'No params passed');
    assert(params.side, 'Parameter side is required');
    assert(params.symbol, 'Parameter symbol is required');
    assert(params.order_type, 'Parameter order_type is required');
    assert(params.qty, 'Parameter qty is required');
    assert(params.time_in_force, 'Parameter time_in_force is required');

    if (params.order_type === 'Limit') assert(params.price, 'Parameter price is required for limit orders');

    return await this.request.post('v2/private/order/create', params);
  }

  async getActiveOrder(params) {
    return await this.request.get('open-api/order/list', params);
  }

  async cancelActiveOrder(params) {
    assert(params, 'No params passed');
    assert(params.symbol, 'Parameter symbol is required');
    assert(params.order_id || params.order_link_id, 'Parameter order_id OR order_link_id is required');

    return await this.request.post('v2/private/order/cancel', params);
  }

  async cancelAllActiveOrders(params) {
    assert(params, 'No params passed');
    assert(params.symbol, 'Parameter symbol is required');

    return await this.request.post('v2/private/order/cancelAll', params);
  }

  async replaceActiveOrder(params) {
    assert(params, 'No params passed');
    assert(params.order_id || params.order_link_id, 'Parameter order_id OR order_link_id is required');
    assert(params.symbol, 'Parameter symbol is required');

    return await this.request.post('v2/private/order/replace', params);
  }

  /**
   * @deprecated use replaceActiveOrder()
   */
  async replaceActiveOrderOld(params) {
    assert(params, 'No params passed');
    assert(params.order_id || params.order_link_id, 'Parameter order_id OR order_link_id is required');
    assert(params.symbol, 'Parameter symbol is required');

    return await this.request.post('open-api/order/replace', params);
  }

  async queryActiveOrder(params) {
    assert(params, 'No params passed');
    assert(params.order_id || params.order_link_id, 'Parameter order_id OR order_link_id is required');
    assert(params.symbol, 'Parameter symbol is required');

    return await this.request.get('v2/private/order', params);
  }

  async placeConditionalOrder(params) {
    assert(params, 'No params passed');
    assert(params.side, 'Parameter side is required');
    assert(params.symbol, 'Parameter symbol is required');
    assert(params.order_type, 'Parameter order_type is required');
    assert(params.qty, 'Parameter qty is required');
    assert(params.base_price, 'Parameter base_price is required');
    assert(params.stop_px, 'Parameter stop_px is required');
    assert(params.time_in_force, 'Parameter time_in_force is required');

    if (params.order_type === 'Limit') assert(params.price, 'Parameter price is required for limit orders');

    return await this.request.post('v2/private/stop-order/create', params);
  }

  /**
   * @deprecated use placeConditionalOrder
   */
  async placeConditionalOrderOld(params) {
    assert(params, 'No params passed');
    assert(params.side, 'Parameter side is required');
    assert(params.symbol, 'Parameter symbol is required');
    assert(params.order_type, 'Parameter order_type is required');
    assert(params.qty, 'Parameter qty is required');
    assert(params.time_in_force, 'Parameter time_in_force is required');
    assert(params.base_price, 'Parameter base_price is required');
    assert(params.stop_px, 'Parameter stop_px is required');

    if (params.order_type === 'Limit') assert(params.price, 'Parameter price is required for limit orders');

    return await this.request.post('open-api/stop-order/create', params);
  }

  async getConditionalOrder(params) {
    assert(params.symbol, 'Parameter symbol is required');
    return await this.request.get('v2/private/stop-order/list', params);
  }

  /**
   * @deprecated use placeConditionalOrder
   */
  async getConditionalOrderOld(params) {
    return await this.request.get('open-api/stop-order/list', params);
  }

  async cancelConditionalOrder(params) {
    assert(params, 'No params passed');
    assert(params.symbol, 'Parameter symbol is required');
    assert(params.stop_order_id || params.order_link_id, 'Parameter stop_order_id OR order_link_id is required');

    return await this.request.post('v2/private/stop-order/cancel', params);
  }

  /**
   * @deprecated use cancelConditionalOrder
   */
  async cancelConditionalOrderOld(params) {
    assert(params, 'No params passed');
    assert(params.stop_order_id, 'Parameter stop_order_id is required');

    return await this.request.post('open-api/stop-order/cancel', params);
  }

  async cancelAllConditionalOrders(params) {
    assert(params, 'No params passed');
    assert(params.symbol, 'Parameter symbol is required');

    return await this.request.post('v2/private/stop-order/cancelAll', params);
  }

  async replaceConditionalOrder(params) {
    assert(params, 'No params passed');
    assert(params.stop_order_id || params.order_link_id, 'Parameter stop_order_id OR order_link_id is required');
    assert(params.symbol, 'Parameter symbol is required');

    return await this.request.post('v2/private/stop-order/replace', params);
  }

  /**
   * @deprecated use replaceConditionalOrder
   */
  async replaceConditionalOrderOld(params) {
    assert(params, 'No params passed');
    assert(params.stop_order_id, 'Parameter stop_order_id is required');
    assert(params.symbol, 'Parameter symbol is required');

    return await this.request.post('open-api/stop-order/replace', params);
  }

  async queryConditionalOrder(params) {
    assert(params, 'No params passed');
    assert(params.stop_order_id || params.order_link_id, 'Parameter order_id OR order_link_id is required');
    assert(params.symbol, 'Parameter symbol is required');

    return await this.request.get('v2/private/stop-order', params);
  }

  /**
   * @deprecated use getPosition() instead
   */
  async getUserLeverage() {
    return await this.request.get('user/leverage');
  }

  async getPosition(params) {
    return await this.request.get('v2/private/position/list', params);
  }

  async changeUserLeverage(params) {
    assert(params, 'No params passed');
    assert(params.symbol, 'Parameter symbol is required');

    if (typeof params.leverage === 'undefined') {
      throw new Error('Parameter leverage is required');
    }

    return await this.request.post('user/leverage/save', params);
  }

  /**
   * @deprecated use getPosition() instead
   */
  async getPositions() {
    return await this.request.get('position/list');
  }

  async changePositionMargin(params) {
    assert(params, 'No params passed');
    assert(params.symbol, 'Parameter symbol is required');
    assert(params.margin, 'Parameter margin is required');

    return await this.request.post('position/change-position-margin', params);
  }

  async setTradingStop(params) {
    assert(params, 'No params passed');
    assert(params.symbol, 'Parameter symbol is required');

    return await this.request.post('open-api/position/trading-stop', params);
  }

  async getWalletFundRecords(params) {
    return await this.request.get('open-api/wallet/fund/records', params);
  }

  async getWithdrawRecords(params) {
    return await this.request.get('open-api/wallet/withdraw/list', params);
  }

  async getAssetExchangeRecords(params) {
    return await this.request.get('v2/private/exchange-order/list', params);
  }

  async getWalletBalance(params) {
    return await this.request.get('v2/private/wallet/balance', params);
  }

  async setRiskLimit(params) {
    assert(params, 'No params passed');
    assert(params.symbol, 'Parameter symbol is required');
    assert(params.risk_id, 'Parameter risk_id is required');

    return await this.request.post('open-api/wallet/risk-limit', params);
  }

  async getRiskLimitList() {
    return await this.request.get('open-api/wallet/risk-limit/list');
  }

  async getLastFundingRate(params) {
    assert(params, 'No params passed');
    assert(params.symbol, 'Parameter symbol is required');

    return await this.request.get('open-api/funding/prev-funding-rate', params);
  }

  async getMyLastFundingFee(params) {
    assert(params, 'No params passed');
    assert(params.symbol, 'Parameter symbol is required');

    return await this.request.get('open-api/funding/prev-funding', params);
  }

  async getPredictedFunding(params) {
    assert(params, 'No params passed');
    assert(params.symbol, 'Parameter symbol is required');

    return await this.request.get('open-api/funding/predicted-funding', params);
  }

  async getTradeRecords(params) {
    assert(params, 'No params passed');
    assert(params.order_id || params.symbol, 'Parameter order_id OR symbol is required');

    return await this.request.get('v2/private/execution/list', params);
  }

  async getOrderBook(params) {
    assert(params, 'No params passed');
    assert(params.symbol, 'Parameter symbol is required');

    return await this.request.get('v2/public/orderBook/L2', params);
  }

  async getKline(params) {
    assert(params, 'No params passed');
    assert(params.symbol, 'Parameter symbol is required');
    assert(params.interval, 'Parameter interval is required');
    assert(params.from, 'Parameter from is required');

    return await this.request.get('v2/public/kline/list', params);
  }

  async getOpenInterest(params) {
    assert(params, 'No params passed');
    assert(params.symbol, 'Parameter symbol is required');
    assert(params.period, 'Parameter period is required');

    return await this.request.get('v2/public/open-interest', params);
  }

  async getLatestBigDeal(params) {
    assert(params, 'No params passed');
    assert(params.symbol, 'Parameter symbol is required');

    return await this.request.get('v2/public/big-deal', params);
  }

  async getLongShortRatio(params) {
    assert(params, 'No params passed');
    assert(params.symbol, 'Parameter symbol is required');
    assert(params.period, 'Parameter period is required');

    return await this.request.get('v2/public/account-ratio', params);
  }

  async getLatestInformation() {
    return await this.request.get('v2/public/tickers');
  }

  async getPublicTradingRecords(params) {
    assert(params, 'No params passed');
    assert(params.symbol, 'Parameter symbol is required');

    return await this.request.get('v2/public/trading-records', params);
  }

  async getPublicLiquidations(params) {
    assert(params, 'No params passed');
    assert(params.symbol, 'Parameter symbol is required');

    return await this.request.get('v2/public/liq-records', params);
  }

  async getServerTime() {
    return await this.request.get('v2/public/time');
  }

  async getApiAnnouncements() {
    return await this.request.get('v2/public/announcement');
  }

  async getSymbols() {
    return await this.request.get('v2/public/symbols');
  }

  async getTimeOffset() {
    return await this.request.getTimeOffset();
  }
};
