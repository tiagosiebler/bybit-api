import { AxiosRequestConfig } from 'axios';
import { GenericAPIResponse, getBaseRESTInverseUrl, RestClientInverseOptions } from './util/requestUtils';
import RequestWrapper from './util/requestWrapper';
import SharedEndpoints from './shared-endpoints';

export default class LinearClient extends SharedEndpoints {
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

    /**
   * @public Get the last funding rate.
   */

    getLastFundingRate(params: {
      symbol: string;
    }): GenericAPIResponse {
      return this.requestWrapper.get('public/linear/funding/prev-funding-rate', params);
    }

}
