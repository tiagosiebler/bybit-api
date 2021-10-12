import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, Method } from 'axios';

import { signMessage } from './node-support';
import { RestClientOptions, GenericAPIResponse, getRestBaseUrl, serializeParams, isPublicEndpoint } from './requestUtils';

export default abstract class BaseRestClient {
  private timeOffset: number | null;
  private syncTimePromise: null | Promise<any>;
  private options: RestClientOptions;
  private baseUrl: string;
  private globalRequestOptions: AxiosRequestConfig;
  private key: string | undefined;
  private secret: string | undefined;

  constructor(
    key: string | undefined,
    secret: string | undefined,
    baseUrl: string,
    options: RestClientOptions = {},
    requestOptions: AxiosRequestConfig = {}
  ) {
    this.timeOffset = null;
    this.syncTimePromise = null;

    this.options = {
      recv_window: 5000,
      // how often to sync time drift with bybit servers
      sync_interval_ms: 3600000,
      // if true, we'll throw errors if any params are undefined
      strict_param_validation: false,
      ...options
    };

    this.globalRequestOptions = {
      // in ms == 5 minutes by default
      timeout: 1000 * 60 * 5,
      // custom request options based on axios specs - see: https://github.com/axios/axios#request-config
      ...requestOptions,
      headers: {
        'x-referer': 'bybitapinode'
      },
    };

    this.baseUrl = baseUrl;

    if (key && !secret) {
      throw new Error('API Key & Secret are both required for private enpoints')
    }

    if (this.options.disable_time_sync !== true) {
      this.syncTime();
      setInterval(this.syncTime.bind(this), +this.options.sync_interval_ms!);
    }

    this.key = key;
    this.secret = secret;
  }

  get(endpoint: string, params?: any): GenericAPIResponse {
    return this._call('GET', endpoint, params, true);
  }

  post(endpoint: string, params?: any): GenericAPIResponse {
    return this._call('POST', endpoint, params, true);
  }

  getPrivate(endpoint: string, params?: any): GenericAPIResponse {
    return this._call('GET', endpoint, params, false);
  }

  postPrivate(endpoint: string, params?: any): GenericAPIResponse {
    return this._call('POST', endpoint, params, false);
  }

  deletePrivate(endpoint: string, params?: any): GenericAPIResponse {
    return this._call('DELETE', endpoint, params, false);
  }

  /**
   * @private Make a HTTP request to a specific endpoint. Private endpoints are automatically signed.
   */
  private async _call(method: Method, endpoint: string, params?: any, isPublicApi?: boolean): GenericAPIResponse {
    if (params) {
      // Filter undefined values
      params = Object.entries(params).reduce((a, [k, v]) => (v === undefined ? a : (a[k]=v, a)), {});
    }
    
    if (!isPublicApi) {
      if (!this.key || !this.secret) {
        throw new Error('Private endpoints require api and private keys set');
      }

      if (this.timeOffset === null) {
        await this.syncTime();
      }

      params = await this.signRequest(params);
    }

    const options = {
      ...this.globalRequestOptions,
      url: [this.baseUrl, endpoint].join(endpoint.startsWith('/') ? '' : '/'),
      method: method,
      json: true
    };

    if (method === 'GET' || endpoint.includes('spot')) {
      options.params = params;
    } else {
      options.data = params;
    }

    return axios(options).then(response => {
      if (response.status == 200) {
        return response.data;
      }

      throw response;
    }).catch(e => this.parseException(e));
  }

  /**
   * @private generic handler to parse request exceptions
   */
  parseException(e: any): unknown {
    if (this.options.parse_exceptions === false) {
      throw e;
    }

    // Something happened in setting up the request that triggered an Error
    if (!e.response) {
      if (!e.request) {
        throw e.message;
      }

      // request made but no response received
      throw e;
    }

    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    const response: AxiosResponse = e.response;
    throw {
      code: response.status,
      message: response.statusText,
      body: response.data,
      headers: response.headers,
      requestOptions: this.options
    };
  }

  /**
   * @private sign request and set recv window
   */
  async signRequest(data: any): Promise<any> {
    const params = {
      ...data,
      api_key: this.key,
      timestamp: Date.now() + (this.timeOffset || 0)
    };

    // Optional, set to 5000 by default. Increase if timestamp/recv_window errors are seen.
    if (this.options.recv_window && !params.recv_window) {
      params.recv_window = this.options.recv_window;
    }

    if (this.key && this.secret) {
      const serializedParams = serializeParams(params, this.options.strict_param_validation);
      params.sign = await signMessage(serializedParams, this.secret);
    }

    return params;
  }

  /**
   * Trigger time sync and store promise
   */
  private syncTime(): GenericAPIResponse {
    if (this.options.disable_time_sync === true) {
      return Promise.resolve(false);
    }

    if (this.syncTimePromise !== null) {
      return this.syncTimePromise;
    }

    this.syncTimePromise = this.fetchTimeOffset().then(offset => {
      this.timeOffset = offset;
      this.syncTimePromise = null;
    });

    return this.syncTimePromise;
  }

  abstract getServerTime(baseUrlKeyOverride?: string): Promise<number>;

  /**
   * Estimate drift based on client<->server latency
   */
  async fetchTimeOffset(): Promise<number> {
    try {
      const start = Date.now();
      const serverTime = await this.getServerTime();
      const end = Date.now();

      const avgDrift = ((end - start) / 2);
      return Math.ceil(serverTime - end + avgDrift);
    } catch (e) {
      console.error('Failed to fetch get time offset: ', e);
      return 0;
    }
  }
};
