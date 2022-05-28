import axios, { AxiosRequestConfig, AxiosResponse, Method } from 'axios';

import { signMessage } from './node-support';
import {
  RestClientOptions,
  serializeParams,
  RestClientType,
  REST_CLIENT_TYPE_ENUM,
  agentSource,
} from './requestUtils';

// axios.interceptors.request.use((request) => {
//   console.log(new Date(), 'Starting Request', JSON.stringify(request, null, 2));
//   return request;
// });

// axios.interceptors.response.use((response) => {
//   console.log(new Date(), 'Response:', JSON.stringify(response, null, 2));
//   return response;
// });

interface SignedRequestContext {
  timestamp: number;
  api_key?: string;
  recv_window?: number;
  // spot is diff from the rest...
  recvWindow?: number;
}

interface SignedRequest<T> {
  originalParams: T & SignedRequestContext;
  paramsWithSign?: T & SignedRequestContext & { sign: string };
  sign: string;
}

export default abstract class BaseRestClient {
  private timeOffset: number | null;
  private syncTimePromise: null | Promise<any>;
  private options: RestClientOptions;
  private baseUrl: string;
  private globalRequestOptions: AxiosRequestConfig;
  private key: string | undefined;
  private secret: string | undefined;
  private clientType: RestClientType;

  /** Function that calls exchange API to query & resolve server time, used by time sync */
  abstract fetchServerTime(): Promise<number>;

  constructor(
    key: string | undefined,
    secret: string | undefined,
    baseUrl: string,
    options: RestClientOptions = {},
    requestOptions: AxiosRequestConfig = {},
    clientType: RestClientType
  ) {
    this.timeOffset = null;
    this.syncTimePromise = null;

    this.clientType = clientType;

    this.options = {
      recv_window: 5000,
      // how often to sync time drift with bybit servers
      sync_interval_ms: 3600000,
      // if true, we'll throw errors if any params are undefined
      strict_param_validation: false,
      ...options,
    };

    this.globalRequestOptions = {
      // in ms == 5 minutes by default
      timeout: 1000 * 60 * 5,
      // custom request options based on axios specs - see: https://github.com/axios/axios#request-config
      ...requestOptions,
      headers: {
        'x-referer': 'bybitapinode',
      },
    };

    this.baseUrl = baseUrl;

    if (key && !secret) {
      throw new Error(
        'API Key & Secret are both required for private enpoints'
      );
    }

    if (this.options.disable_time_sync !== true) {
      this.syncTime();
      setInterval(this.syncTime.bind(this), +this.options.sync_interval_ms!);
    }

    this.key = key;
    this.secret = secret;
  }

  private isSpotClient() {
    return this.clientType === REST_CLIENT_TYPE_ENUM.spot;
  }

  get(endpoint: string, params?: any) {
    return this._call('GET', endpoint, params, true);
  }

  post(endpoint: string, params?: any) {
    return this._call('POST', endpoint, params, true);
  }

  getPrivate(endpoint: string, params?: any) {
    return this._call('GET', endpoint, params, false);
  }

  postPrivate(endpoint: string, params?: any) {
    return this._call('POST', endpoint, params, false);
  }

  deletePrivate(endpoint: string, params?: any) {
    return this._call('DELETE', endpoint, params, false);
  }

  private async prepareSignParams(params?: any, isPublicApi?: boolean) {
    if (isPublicApi) {
      return {
        originalParams: params,
        paramsWithSign: params,
      };
    }

    if (!this.key || !this.secret) {
      throw new Error('Private endpoints require api and private keys set');
    }

    if (this.timeOffset === null) {
      await this.syncTime();
    }

    return this.signRequest(params);
  }

  /**
   * @private Make a HTTP request to a specific endpoint. Private endpoints are automatically signed.
   */
  private async _call(
    method: Method,
    endpoint: string,
    params?: any,
    isPublicApi?: boolean
  ): Promise<any> {
    const options = {
      ...this.globalRequestOptions,
      url: [this.baseUrl, endpoint].join(endpoint.startsWith('/') ? '' : '/'),
      method: method,
      json: true,
    };

    for (const key in params) {
      if (typeof params[key] === 'undefined') {
        delete params[key];
      }
    }

    const signResult = await this.prepareSignParams(params, isPublicApi);

    if (method === 'GET' || this.isSpotClient()) {
      options.params = signResult.paramsWithSign;
      if (options.params?.agentSource) {
        options.data = {
          agentSource: agentSource,
        };
      }
    } else {
      options.data = signResult.paramsWithSign;
    }

    return axios(options)
      .then((response) => {
        if (response.status == 200) {
          return response.data;
        }

        throw response;
      })
      .catch((e) => this.parseException(e));
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
      requestOptions: this.options,
    };
  }

  /**
   * @private sign request and set recv window
   */
  private async signRequest<T extends Object>(
    data: T & SignedRequestContext
  ): Promise<SignedRequest<T>> {
    const res: SignedRequest<T> = {
      originalParams: {
        ...data,
        api_key: this.key,
        timestamp: Date.now() + (this.timeOffset || 0),
      },
      sign: '',
    };

    // Optional, set to 5000 by default. Increase if timestamp/recv_window errors are seen.
    if (this.options.recv_window && !res.originalParams.recv_window) {
      if (this.isSpotClient()) {
        res.originalParams.recvWindow = this.options.recv_window;
      } else {
        res.originalParams.recv_window = this.options.recv_window;
      }
    }

    if (this.key && this.secret) {
      const serializedParams = serializeParams(
        res.originalParams,
        this.options.strict_param_validation
      );
      res.sign = await signMessage(serializedParams, this.secret);
      res.paramsWithSign = {
        ...res.originalParams,
        sign: res.sign,
      };
    }

    return res;
  }

  /**
   * Trigger time sync and store promise
   */
  private syncTime(): Promise<any> {
    if (this.options.disable_time_sync === true) {
      return Promise.resolve(false);
    }

    if (this.syncTimePromise !== null) {
      return this.syncTimePromise;
    }

    this.syncTimePromise = this.fetchTimeOffset().then((offset) => {
      this.timeOffset = offset;
      this.syncTimePromise = null;
    });

    return this.syncTimePromise;
  }

  /**
   * Estimate drift based on client<->server latency
   */
  async fetchTimeOffset(): Promise<number> {
    try {
      const start = Date.now();
      const serverTime = await this.fetchServerTime();

      if (!serverTime || isNaN(serverTime)) {
        throw new Error(
          `fetchServerTime() returned non-number: "${serverTime}" typeof(${typeof serverTime})`
        );
      }

      const end = Date.now();
      const severTimeMs = serverTime * 1000;

      const avgDrift = (end - start) / 2;
      return Math.ceil(severTimeMs - end + avgDrift);
    } catch (e) {
      console.error('Failed to fetch get time offset: ', e);
      return 0;
    }
  }
}
