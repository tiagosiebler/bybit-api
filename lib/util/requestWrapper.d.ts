import { AxiosRequestConfig, Method } from 'axios';
import { RestClientInverseOptions, GenericAPIResponse } from './requestUtils';
export default class RequestUtil {
    private timeOffset;
    private syncTimePromise;
    private options;
    private baseUrl;
    private globalRequestOptions;
    private key;
    private secret;
    constructor(key: string | undefined, secret: string | undefined, livenet?: boolean, options?: RestClientInverseOptions, requestOptions?: AxiosRequestConfig);
    get(endpoint: string, params?: any): GenericAPIResponse;
    post(endpoint: string, params?: any): GenericAPIResponse;
    getTimeOffset(): Promise<number>;
    _call(method: Method, endpoint: string, params?: any): GenericAPIResponse;
    _signRequest(data: any): object;
    _syncTime(): GenericAPIResponse;
}
