import { AxiosRequestConfig } from 'axios';
import { GenericAPIResponse, getBaseRESTInverseUrl, RestClientInverseOptions } from './util/requestUtils';
import RequestWrapper from './util/requestWrapper';
import SharedEndpoints from './shared-endpoints';

export class LinearClient extends SharedEndpoints {
    protected requestWrapper: RequestWrapper;

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
        super()
        this.requestWrapper = new RequestWrapper(
            key,
            secret,
            getBaseRESTInverseUrl(livenet),
            restInverseOptions,
            requestOptions
        );
        return this;
      }
    //------------Market Data Endpoints------------>
    
    getKline(params: {
        symbol: string;
        interval: string;
        from: number;
        limit?: number;
    }): GenericAPIResponse {
        return this.requestWrapper.get('/public/linear/kline', params);
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
        //from?: number;
        limit?: number;
    }): GenericAPIResponse {
        return this.requestWrapper.get('public/linear/recent-trading-records', params);
    }
    
    getLastFundingRate(params: {
      symbol: string;
    }): GenericAPIResponse {
      return this.requestWrapper.get('public/linear/funding/prev-funding-rate', params);
    }
    
    getMarkPriceKline(params: {
        symbol: string;
        interval: string;
        from: number;
        limit?: number;
    }): GenericAPIResponse {
        return this.requestWrapper.get('public/linear/mark-price-kline', params);
    }
    
    getIndexPriceKline(params: {
        symbol: string;
        interval: string;
        from: number;
        limit?: number;
    }): GenericAPIResponse {
        return this.requestWrapper.get('public/linear/index-price-kline', params);
    }
    
    getPremiumIndexKline(params: {
        symbol: string;
        interval: string;
        from: number;
        limit?: number;
    }): GenericAPIResponse {
        return this.requestWrapper.get('public/linear/premium-index-kline', params);
    }
    
    
    //-----------Account Data Endpoints------------>   
    
    //Active Orders
    
    placeActiveOrder(orderRequest: {
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
        reduce_only?: boolean;
        close_on_trigger?: boolean;
        order_link_id?: string;
    }): GenericAPIResponse {
        // if (orderRequest.order_type === 'Limit' && !orderRequest.price) {
        //   throw new Error('Price required for limit orders');
        // }
        return this.requestWrapper.post('private/linear/order/create', orderRequest);
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
        // if (!params.order_id && !params.order_link_id) {
        //   throw new Error('Parameter order_id OR order_link_id is required');
        // }
        return this.requestWrapper.post('private/linear/order/cancel', params);
    }
    
    cancelAllActiveOrders(params: {
        symbol: string;
    }): GenericAPIResponse {
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
        // if (!params.order_id && !params.order_link_id) {
        //   throw new Error('Parameter order_id OR order_link_id is required');
        // }
        return this.requestWrapper.post('private/linear/order/replace', params);
    }
    
    queryActiveOrder(params: {
        order_id?: string;
        order_link_id?: string;
        symbol: string;
    }): GenericAPIResponse {
        // if (!params.order_id && !params.order_link_id) {
        //   throw new Error('Parameter order_id OR order_link_id is required');
        // }
        return this.requestWrapper.get('/private/linear/order/search', params);
    }
    
    //Conditional Orders
    //Position
    //Risk Limit
    //Funding
    //API Key Info
    
    //------------Wallet Data Endpoints------------>
    
    //-------------API Data Endpoints-------------->
    
    
    
}
