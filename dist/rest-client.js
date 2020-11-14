import assert from 'assert';
import RequestWrapper from './util/requestWrapper';
export class RestClient {
    /**
     * @public Creates an instance of the inverse REST API client.
     *
     * @param {string} key - your API key
     * @param {string} secret - your API secret
     * @param {boolean} [livenet=false]
     * @param {RestClientInverseOptions} [restInverseOptions={}] options to configure REST API connectivity
     * @param {AxiosRequestConfig} [requestOptions={}] HTTP networking options for axios
     */
    constructor(key, secret, livenet, restInverseOptions = {}, requestOptions = {}) {
        this.requestWrapper = new RequestWrapper(key, secret, livenet, restInverseOptions, requestOptions);
    }
    placeActiveOrder(params) {
        assert(params, 'No params passed');
        assert(params.side, 'Parameter side is required');
        assert(params.symbol, 'Parameter symbol is required');
        assert(params.order_type, 'Parameter order_type is required');
        assert(params.qty, 'Parameter qty is required');
        assert(params.time_in_force, 'Parameter time_in_force is required');
        if (params.order_type === 'Limit')
            assert(params.price, 'Parameter price is required for limit orders');
        return this.requestWrapper.post('v2/private/order/create', params);
    }
    getActiveOrder(params) {
        return this.requestWrapper.get('open-api/order/list', params);
    }
    cancelActiveOrder(params) {
        assert(params, 'No params passed');
        assert(params.symbol, 'Parameter symbol is required');
        assert(params.order_id || params.order_link_id, 'Parameter order_id OR order_link_id is required');
        return this.requestWrapper.post('v2/private/order/cancel', params);
    }
    cancelAllActiveOrders(params) {
        assert(params, 'No params passed');
        assert(params.symbol, 'Parameter symbol is required');
        return this.requestWrapper.post('v2/private/order/cancelAll', params);
    }
    replaceActiveOrder(params) {
        assert(params, 'No params passed');
        assert(params.order_id || params.order_link_id, 'Parameter order_id OR order_link_id is required');
        assert(params.symbol, 'Parameter symbol is required');
        return this.requestWrapper.post('v2/private/order/replace', params);
    }
    /**
     * @deprecated use replaceActiveOrder()
     */
    replaceActiveOrderOld(params) {
        assert(params, 'No params passed');
        assert(params.order_id || params.order_link_id, 'Parameter order_id OR order_link_id is required');
        assert(params.symbol, 'Parameter symbol is required');
        return this.requestWrapper.post('open-api/order/replace', params);
    }
    queryActiveOrder(params) {
        assert(params, 'No params passed');
        assert(params.order_id || params.order_link_id, 'Parameter order_id OR order_link_id is required');
        assert(params.symbol, 'Parameter symbol is required');
        return this.requestWrapper.get('v2/private/order', params);
    }
    placeConditionalOrder(params) {
        assert(params, 'No params passed');
        assert(params.side, 'Parameter side is required');
        assert(params.symbol, 'Parameter symbol is required');
        assert(params.order_type, 'Parameter order_type is required');
        assert(params.qty, 'Parameter qty is required');
        assert(params.base_price, 'Parameter base_price is required');
        assert(params.stop_px, 'Parameter stop_px is required');
        assert(params.time_in_force, 'Parameter time_in_force is required');
        if (params.order_type === 'Limit')
            assert(params.price, 'Parameter price is required for limit orders');
        return this.requestWrapper.post('v2/private/stop-order/create', params);
    }
    /**
     * @deprecated use placeConditionalOrder
     */
    placeConditionalOrderOld(params) {
        assert(params, 'No params passed');
        assert(params.side, 'Parameter side is required');
        assert(params.symbol, 'Parameter symbol is required');
        assert(params.order_type, 'Parameter order_type is required');
        assert(params.qty, 'Parameter qty is required');
        assert(params.time_in_force, 'Parameter time_in_force is required');
        assert(params.base_price, 'Parameter base_price is required');
        assert(params.stop_px, 'Parameter stop_px is required');
        if (params.order_type === 'Limit')
            assert(params.price, 'Parameter price is required for limit orders');
        return this.requestWrapper.post('open-api/stop-order/create', params);
    }
    getConditionalOrder(params) {
        assert(params.symbol, 'Parameter symbol is required');
        return this.requestWrapper.get('v2/private/stop-order/list', params);
    }
    /**
     * @deprecated use placeConditionalOrder
     */
    getConditionalOrderOld(params) {
        return this.requestWrapper.get('open-api/stop-order/list', params);
    }
    cancelConditionalOrder(params) {
        assert(params, 'No params passed');
        assert(params.stop_order_id || params.order_link_id, 'Parameter stop_order_id OR order_link_id is required');
        return this.requestWrapper.post('v2/private/stop-order/cancel', params);
    }
    /**
     * @deprecated use cancelConditionalOrder
     */
    cancelConditionalOrderOld(params) {
        assert(params, 'No params passed');
        assert(params.stop_order_id, 'Parameter stop_order_id is required');
        return this.requestWrapper.post('open-api/stop-order/cancel', params);
    }
    cancelAllConditionalOrders(params) {
        assert(params, 'No params passed');
        assert(params.symbol, 'Parameter symbol is required');
        return this.requestWrapper.post('v2/private/stop-order/cancelAll', params);
    }
    replaceConditionalOrder(params) {
        assert(params, 'No params passed');
        assert(params.stop_order_id || params.order_link_id, 'Parameter stop_order_id OR order_link_id is required');
        assert(params.symbol, 'Parameter symbol is required');
        return this.requestWrapper.post('v2/private/stop-order/replace', params);
    }
    /**
     * @deprecated use replaceConditionalOrder
     */
    replaceConditionalOrderOld(params) {
        assert(params, 'No params passed');
        assert(params.stop_order_id, 'Parameter stop_order_id is required');
        assert(params.symbol, 'Parameter symbol is required');
        return this.requestWrapper.post('open-api/stop-order/replace', params);
    }
    queryConditionalOrder(params) {
        assert(params, 'No params passed');
        assert(params.stop_order_id || params.order_link_id, 'Parameter order_id OR order_link_id is required');
        assert(params.symbol, 'Parameter symbol is required');
        return this.requestWrapper.get('v2/private/stop-order', params);
    }
    /**
     * @deprecated use getPosition() instead
     */
    getUserLeverage() {
        return this.requestWrapper.get('user/leverage');
    }
    getPosition(params) {
        return this.requestWrapper.get('v2/private/position/list', params);
    }
    changeUserLeverage(params) {
        assert(params, 'No params passed');
        assert(params.leverage, 'Parameter leverage is required');
        assert(params.symbol, 'Parameter symbol is required');
        return this.requestWrapper.post('user/leverage/save', params);
    }
    /**
     * @deprecated use getPosition() instead
     */
    getPositions() {
        return this.requestWrapper.get('position/list');
    }
    changePositionMargin(params) {
        assert(params, 'No params passed');
        assert(params.margin, 'Parameter margin is required');
        assert(params.symbol, 'Parameter symbol is required');
        return this.requestWrapper.post('position/change-position-margin', params);
    }
    setTradingStop(params) {
        assert(params, 'No params passed');
        assert(params.symbol, 'Parameter symbol is required');
        return this.requestWrapper.post('open-api/position/trading-stop', params);
    }
    getWalletFundRecords(params) {
        return this.requestWrapper.get('open-api/wallet/fund/records', params);
    }
    getWithdrawRecords(params) {
        return this.requestWrapper.get('open-api/wallet/withdraw/list', params);
    }
    getAssetExchangeRecords(params) {
        return this.requestWrapper.get('v2/private/exchange-order/list', params);
    }
    getWalletBalance(params) {
        assert(params, 'No params passed');
        assert(params.coin, 'Parameter coin is required');
        return this.requestWrapper.get('v2/private/wallet/balance', params);
    }
    setRiskLimit(params) {
        assert(params, 'No params passed');
        assert(params.symbol, 'Parameter symbol is required');
        assert(params.risk_id, 'Parameter risk_id is required');
        return this.requestWrapper.post('open-api/wallet/risk-limit', params);
    }
    getRiskLimitList() {
        return this.requestWrapper.get('open-api/wallet/risk-limit/list');
    }
    getLastFundingRate(params) {
        assert(params, 'No params passed');
        assert(params.symbol, 'Parameter symbol is required');
        return this.requestWrapper.get('open-api/funding/prev-funding-rate', params);
    }
    getMyLastFundingFee(params) {
        assert(params, 'No params passed');
        assert(params.symbol, 'Parameter symbol is required');
        return this.requestWrapper.get('open-api/funding/prev-funding', params);
    }
    getPredictedFunding(params) {
        assert(params, 'No params passed');
        assert(params.symbol, 'Parameter symbol is required');
        return this.requestWrapper.get('open-api/funding/predicted-funding', params);
    }
    getTradeRecords(params) {
        assert(params, 'No params passed');
        assert(params.order_id || params.symbol, 'Parameter order_id OR symbol is required');
        return this.requestWrapper.get('v2/private/execution/list', params);
    }
    getOrderBook(params) {
        assert(params, 'No params passed');
        assert(params.symbol, 'Parameter symbol is required');
        return this.requestWrapper.get('v2/public/orderBook/L2', params);
    }
    getKline(params) {
        assert(params, 'No params passed');
        assert(params.symbol, 'Parameter symbol is required');
        assert(params.interval, 'Parameter interval is required');
        assert(params.from, 'Parameter from is required');
        return this.requestWrapper.get('v2/public/kline/list', params);
    }
    getOpenInterest(params) {
        assert(params, 'No params passed');
        assert(params.symbol, 'Parameter symbol is required');
        assert(params.period, 'Parameter period is required');
        return this.requestWrapper.get('v2/public/open-interest', params);
    }
    getLatestBigDeal(params) {
        assert(params, 'No params passed');
        assert(params.symbol, 'Parameter symbol is required');
        return this.requestWrapper.get('v2/public/big-deal', params);
    }
    getLongShortRatio(params) {
        assert(params, 'No params passed');
        assert(params.symbol, 'Parameter symbol is required');
        assert(params.period, 'Parameter period is required');
        return this.requestWrapper.get('v2/public/account-ratio', params);
    }
    getLatestInformation() {
        return this.requestWrapper.get('v2/public/tickers');
    }
    getPublicTradingRecords(params) {
        assert(params, 'No params passed');
        assert(params.symbol, 'Parameter symbol is required');
        return this.requestWrapper.get('v2/public/trading-records', params);
    }
    getPublicLiquidations(params) {
        assert(params, 'No params passed');
        assert(params.symbol, 'Parameter symbol is required');
        return this.requestWrapper.get('v2/public/liq-records', params);
    }
    getServerTime() {
        return this.requestWrapper.get('v2/public/time');
    }
    getApiAnnouncements() {
        return this.requestWrapper.get('v2/public/announcement');
    }
    getSymbols() {
        return this.requestWrapper.get('v2/public/symbols');
    }
    getTimeOffset() {
        return this.requestWrapper.getTimeOffset();
    }
}
;
//# sourceMappingURL=rest-client.js.map