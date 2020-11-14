import { AxiosRequestConfig } from 'axios';
import { GenericAPIResponse, RestClientInverseOptions } from './util/requestUtils';
export declare class RestClient {
    private requestWrapper;
    /**
     * @public Creates an instance of the inverse REST API client.
     *
     * @param {string} key - your API key
     * @param {string} secret - your API secret
     * @param {boolean} [livenet=false]
     * @param {RestClientInverseOptions} [restInverseOptions={}] options to configure REST API connectivity
     * @param {AxiosRequestConfig} [requestOptions={}] HTTP networking options for axios
     */
    constructor(key?: string | undefined, secret?: string | undefined, livenet?: boolean, restInverseOptions?: RestClientInverseOptions, requestOptions?: AxiosRequestConfig);
    placeActiveOrder(params: any): GenericAPIResponse;
    getActiveOrder(params: any): GenericAPIResponse;
    cancelActiveOrder(params: any): GenericAPIResponse;
    cancelAllActiveOrders(params: any): GenericAPIResponse;
    replaceActiveOrder(params: any): GenericAPIResponse;
    /**
     * @deprecated use replaceActiveOrder()
     */
    replaceActiveOrderOld(params: any): GenericAPIResponse;
    queryActiveOrder(params: any): GenericAPIResponse;
    placeConditionalOrder(params: any): GenericAPIResponse;
    /**
     * @deprecated use placeConditionalOrder
     */
    placeConditionalOrderOld(params: any): GenericAPIResponse;
    getConditionalOrder(params: any): GenericAPIResponse;
    /**
     * @deprecated use placeConditionalOrder
     */
    getConditionalOrderOld(params: any): GenericAPIResponse;
    cancelConditionalOrder(params: any): GenericAPIResponse;
    /**
     * @deprecated use cancelConditionalOrder
     */
    cancelConditionalOrderOld(params: any): GenericAPIResponse;
    cancelAllConditionalOrders(params: any): GenericAPIResponse;
    replaceConditionalOrder(params: any): GenericAPIResponse;
    /**
     * @deprecated use replaceConditionalOrder
     */
    replaceConditionalOrderOld(params: any): GenericAPIResponse;
    queryConditionalOrder(params: any): GenericAPIResponse;
    /**
     * @deprecated use getPosition() instead
     */
    getUserLeverage(): GenericAPIResponse;
    getPosition(params?: any): GenericAPIResponse;
    changeUserLeverage(params: any): GenericAPIResponse;
    /**
     * @deprecated use getPosition() instead
     */
    getPositions(): GenericAPIResponse;
    changePositionMargin(params: any): GenericAPIResponse;
    setTradingStop(params: any): GenericAPIResponse;
    getWalletFundRecords(params: any): GenericAPIResponse;
    getWithdrawRecords(params: any): GenericAPIResponse;
    getAssetExchangeRecords(params: any): GenericAPIResponse;
    getWalletBalance(params: any): GenericAPIResponse;
    setRiskLimit(params: any): GenericAPIResponse;
    getRiskLimitList(): GenericAPIResponse;
    getLastFundingRate(params: any): GenericAPIResponse;
    getMyLastFundingFee(params: any): GenericAPIResponse;
    getPredictedFunding(params: any): GenericAPIResponse;
    getTradeRecords(params: any): GenericAPIResponse;
    getOrderBook(params: any): GenericAPIResponse;
    getKline(params: any): GenericAPIResponse;
    getOpenInterest(params: any): GenericAPIResponse;
    getLatestBigDeal(params: any): GenericAPIResponse;
    getLongShortRatio(params: any): GenericAPIResponse;
    getLatestInformation(): GenericAPIResponse;
    getPublicTradingRecords(params: any): GenericAPIResponse;
    getPublicLiquidations(params: any): GenericAPIResponse;
    getServerTime(): GenericAPIResponse;
    getApiAnnouncements(): GenericAPIResponse;
    getSymbols(): GenericAPIResponse;
    getTimeOffset(): GenericAPIResponse;
}
