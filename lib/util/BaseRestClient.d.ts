import { AxiosRequestConfig } from 'axios';
import { RestClientOptions, RestClientType } from './requestUtils';
export default abstract class BaseRestClient {
    private timeOffset;
    private syncTimePromise;
    private options;
    private baseUrl;
    private globalRequestOptions;
    private key;
    private secret;
    private clientType;
    /**
     * Function that calls exchange API to query & resolve server time, used by time sync, disabled by default.
     *
     * Note: this should always return server time in seconds
     */
    abstract fetchServerTime(): Promise<number>;
    /** Defines the client type (affecting how requests & signatures behave) */
    abstract getClientType(): RestClientType;
    /**
     * Create an instance of the REST client. Pass API credentials in the object in the first parameter.
     * @param {RestClientOptions} [restOptions={}] options to configure REST API connectivity
     * @param {AxiosRequestConfig} [networkOptions={}] HTTP networking options for axios
     */
    constructor(restOptions?: RestClientOptions, networkOptions?: AxiosRequestConfig);
    private isSpotV1Client;
    get(endpoint: string, params?: any): Promise<any>;
    getPrivate(endpoint: string, params?: any): Promise<any>;
    post(endpoint: string, params?: any): Promise<any>;
    postPrivate(endpoint: string, params?: any): Promise<any>;
    deletePrivate(endpoint: string, params?: any): Promise<any>;
    private prepareSignParams;
    /** Returns an axios request object. Handles signing process automatically if this is a private API call */
    private buildRequest;
    /**
     * @private Make a HTTP request to a specific endpoint. Private endpoints are automatically signed.
     */
    private _call;
    /**
     * @private generic handler to parse request exceptions
     */
    parseException(e: any): unknown;
    /**
     * @private sign request and set recv window
     */
    private signRequest;
    /**
     * Trigger time sync and store promise. Use force: true, if automatic time sync is disabled
     */
    private syncTime;
    /**
     * Estimate drift based on client<->server latency
     */
    fetchTimeOffset(): Promise<number>;
}
