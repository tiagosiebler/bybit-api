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
        from?: number;
        limit?: number;
    }): GenericAPIResponse {
        return this.requestWrapper.get('/public/linear/recent-trading-records', params);
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
        return this.requestWrapper.get('/public/linear/mark-price-kline', params);
    }
    
    getIndexPriceKline(params: {
        symbol: string;
        interval: string;
        from: number;
        limit?: number;
    }): GenericAPIResponse {
        return this.requestWrapper.get('/public/linear/index-price-kline', params);
    }
    
    getPremiumIndexKline(params: {
        symbol: string;
        interval: string;
        from: number;
        limit?: number;
    }): GenericAPIResponse {
        return this.requestWrapper.get('/public/linear/premium-index-kline', params);
    }
    
    
    //-----------Account Data Endpoints------------>
    
    //------------Wallet Data Endpoints------------>
    
    //-------------API Data Endpoints-------------->
    
    
    
}
