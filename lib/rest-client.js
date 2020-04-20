
const assert = require('assert');

const Request = require('./request.js');

module.exports = class RestClient {

  constructor(key, secret, livenet=false, options={}) {
    this.request = new Request(...arguments);
  }

  async placeActiveOrder(params) {
    assert(params, 'No params passed');
    assert(params.side, 'Parameter side is required');
    assert(params.symbol, 'Parameter symbol is required');
    assert(params.order_type, 'Parameter order_type is required');
    assert(params.qty, 'Parameter qty is required');
    assert(params.time_in_force, 'Parameter time_in_force is required');

    if(params.order_type === 'Limit') assert(params.price, 'Parameter price is required for limit orders');

    return await this.request.post('/v2/private/order/create', params);
  }

  async getActiveOrder(params) {
    return await this.request.get('/open-api/order/list', params);
  }

  async cancelActiveOrder(params) {
    assert(params, 'No params passed');
    assert(params.symbol, 'Parameter symbol is required');
    assert(params.order_id || params.order_link_id, 'Parameter order_id OR order_link_id is required');

    return await this.request.post('/v2/private/order/cancel', params);
  }

  async cancelAllActiveOrders(params) {
    assert(params, 'No params passed');
    assert(params.symbol, 'Parameter symbol is required');

    return await this.request.post('/v2/private/order/cancelAll', params);
  }

  async replaceActiveOrder(params) {
    assert(params, 'No params passed');
    assert(params.order_id || params.order_link_id, 'Parameter order_id OR order_link_id is required');
    assert(params.symbol, 'Parameter symbol is required');

    return await this.request.post('/open-api/order/replace', params);
  }

  async queryActiveOrder(params) {
    assert(params, 'No params passed');
    assert(params.order_id || params.order_link_id, 'Parameter order_id OR order_link_id is required');
    assert(params.symbol, 'Parameter symbol is required');

    return await this.request.get('/v2/private/order', params);
  }

  async placeConditionalOrder(params) {
    assert(params, 'No params passed');
    assert(params.side, 'Parameter side is required');
    assert(params.symbol, 'Parameter symbol is required');
    assert(params.order_type, 'Parameter order_type is required');
    assert(params.qty, 'Parameter qty is required');
    assert(params.time_in_force, 'Parameter time_in_force is required');
    assert(params.base_price, 'Parameter base_price is required');
    assert(params.stop_px, 'Parameter stop_px is required');

    if(params.order_type === 'Limit') assert(params.price, 'Parameter price is required for limit orders');

    return await this.request.post('/open-api/stop-order/create', params);
  }

  async getConditioanlOrder(params) {
    return await this.request.get('/open-api/stop-order/list', params);
  }

  async cancelConditionalOrder(params) {
    assert(params, 'No params passed');
    assert(params.stop_order_id, 'Parameter stop_order_id is required');

    return await this.request.post('/open-api/stop-order/cancel', params);
  }

  async cancelAllConditionalOrders(params) {
    assert(params, 'No params passed');
    assert(params.symbol, 'Parameter symbol is required');

    return await this.request.post('/v2/private/stop-order/cancelAll', params);
  }

  async queryConditionalOrder(params) {
    assert(params, 'No params passed');
    assert(params.stop_order_id || params.order_link_id, 'Parameter order_id OR order_link_id is required');
    assert(params.symbol, 'Parameter symbol is required');

    return await this.request.get('GET /v2/private/stop-order', params);
  }

  async getUserLeverage() {
    return await this.request.get('/user/leverage');
  }

  async changeUserLeverage(params) {
    assert(params, 'No params passed');
    assert(params.leverage, 'Parameter leverage is required');
    assert(params.symbol, 'Parameter symbol is required');

    return await this.request.post('/user/leverage/save', params);
  }

  async getPosition(params) {
    assert(params, 'No params passed');
    assert(params.symbol, 'Parameter symbol is required');

    return await this.request.get('/v2/private/position/list', params);
  }

  async getPositions() {
    return await this.request.get('/position/list');
  }

  async changePositionMargin(params) {
    assert(params, 'No params passed');
    assert(params.margin, 'Parameter margin is required');
    assert(params.symbol, 'Parameter symbol is required');

    return await this.request.post('/position/change-position-margin', params);
  }

  async setTradingStop(params) {
    assert(params, 'No params passed');
    assert(params.symbol, 'Parameter symbol is required');

    return await this.request.post('/open-api/position/trading-stop', params);
  }

  async getWalletFundRecords(params) {
    return await this.request.get('/open-api/wallet/fund/records', params);
  }

  async getWithdrawRecords(params) {
    return await this.request.get('/open-api/wallet/withdraw/list', params);
  }

  async getWalletBalance(params) {
    assert(params, 'No params passed');
    assert(params.coin, 'Parameter coin is required');
    return await this.request.get('/v2/private/wallet/balance', params);
  }

  async setRiskLimit(params) {
    assert(params, 'No params passed');
    assert(params.symbol, 'Parameter symbol is required');
    assert(params.risk_id, 'Parameter risk_id is required');

    return await this.request.post('/open-api/wallet/risk-limit', params);
  }

  async getRiskLimitList() {
    return await this.request.get('/open-api/wallet/risk-limit/list');
  }

  async getLastFundingRate(params) {
    assert(params, 'No params passed');
    assert(params.symbol, 'Parameter symbol is required');

    return await this.request.get('/open-api/funding/prev-funding-rate', params);
  }

  async getMyLastFundingFee(params) {
    assert(params, 'No params passed');
    assert(params.symbol, 'Parameter symbol is required');

    return await this.request.get('/open-api/funding/prev-funding', params);
  }

  async getPredictedFunding(params) {
    assert(params, 'No params passed');
    assert(params.symbol, 'Parameter symbol is required');

    return await this.request.get('/open-api/funding/predicted-funding', params);
  }

  async getTradeRecords(params) {
    assert(params, 'No params passed');
    assert(params.order_id || params.symbol, 'Parameter order_id OR symbol is required');

    return await this.request.get('/v2/private/execution/list', params);
  }

  async getOrderBook(params) {
    assert(params, 'No params passed');
    assert(params.symbol, 'Parameter symbol is required');

    return await this.request.get('/v2/public/orderBook/L2', params);
  }

  async getKline(params) {
    assert(params, 'No params passed');
    assert(params.symbol, 'Parameter symbol is required');
    assert(params.interval, 'Parameter interval is required');
    assert(params.from, 'Parameter from is required');

    return await this.request.get('/v2/public/kline/list', params);
  }

  async getLatestInformation() {
    return await this.request.get('/v2/public/tickers');
  }

  async getPublicTradingRecords(params) {
    assert(params, 'No params passed');
    assert(params.symbol, 'Parameter symbol is required');

    return await this.request.get('/v2/public/trading-records', params);
  }

  async getServerTime() {
    return await this.request.get('/v2/public/time');
  }

  async getApiAnnouncements() {
    return await this.request.get('/v2/public/announcement');
  }

  async getSymbols() {
    return await this.request.get('/v2/public/symbols');
  }

  async getTimeOffset() {
    return await this.request.getTimeOffset();
  }
}
