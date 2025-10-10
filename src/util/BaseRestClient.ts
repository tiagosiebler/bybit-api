/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosRequestConfig, AxiosResponse, Method } from 'axios';
import https from 'https';

import {
  APIID,
  getMimeType,
  getRestBaseUrl,
  parseRateLimitHeaders,
  RestClientOptions,
  RestClientType,
  serializeParams,
} from './requestUtils';
import {
  checkWebCryptoAPISupported,
  SignAlgorithm,
  signBinaryData,
  SignEncodeMethod,
  signMessage,
} from './webCryptoAPI';

const ENABLE_HTTP_TRACE =
  typeof process === 'object' &&
  typeof process.env === 'object' &&
  process.env.BYBITTRACE;

if (ENABLE_HTTP_TRACE) {
  // axios.interceptors.request.use((request) => {
  //   console.log(
  //     new Date(),
  //     'Starting Request',
  //     JSON.stringify(request, null, 2)
  //   );
  //   return request;
  // });
  axios.interceptors.response.use((response) => {
    console.log(new Date(), 'Response:', {
      request: {
        url: response.config.url,
        method: response.config.method,
        data: response.config.data,
        headers: response.config.headers,
        params: response.config.params,
      },
      response: {
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
        data: response.data,
      },
    });
    return response;
  });
}

interface SignedRequestContext {
  timestamp?: number;
  api_key?: string;
  recv_window?: number;
}

interface SignedRequest<T> {
  originalParams: (T & SignedRequestContext) | SignedRequestContext;
  paramsWithSign?: T & SignedRequestContext & { sign: string };
  serializedParams: string;
  sign: string;
  timestamp: number;
  recvWindow: number;
}

interface UnsignedRequest<T> {
  originalParams: T;
  paramsWithSign: T;
  serializedParams: string;
  sign?: string;
  timestamp?: number;
  recvWindow?: number;
}

interface FileUploadParams {
  fileBuffer: Buffer;
  fileName: string;
}

type SignMethod = 'v5auth';

export default abstract class BaseRestClient {
  private timeOffset: number | null = null;

  private syncTimePromise: null | Promise<any> = null;

  private options: RestClientOptions;

  private baseUrl: string;

  private globalRequestOptions: AxiosRequestConfig;

  private key: string | undefined;

  private secret: string | undefined;

  private clientType: RestClientType;

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
  constructor(
    restOptions: RestClientOptions = {},
    networkOptions: AxiosRequestConfig = {},
  ) {
    this.clientType = this.getClientType();

    this.options = {
      recv_window: 5000,
      /** Throw errors if any request params are empty */
      strict_param_validation: false,
      /** Disable time sync by default */
      enable_time_sync: false,
      /** How often to sync time drift with bybit servers (if time sync is enabled) */
      sync_interval_ms: 3600000,
      /** Determines whether to perform time synchronization before sending private requests */
      syncTimeBeforePrivateRequests: false,
      /** Request parameter values are now URI encoded by default during signing. Set to false to override this behaviour. */
      encodeSerialisedValues: true,
      ...restOptions,
    };

    this.globalRequestOptions = {
      // in ms == 5 minutes by default
      timeout: 1000 * 60 * 5,
      // custom request options based on axios specs - see: https://github.com/axios/axios#request-config
      ...networkOptions,
      headers: {
        ...networkOptions.headers,
        'x-referer': APIID,
      },
    };

    // If enabled, configure a https agent with keepAlive enabled
    if (this.options.keepAlive) {
      // Extract existing https agent parameters, if provided, to prevent the keepAlive flag from overwriting
      // an existing https agent completely
      const existingHttpsAgent = this.globalRequestOptions.httpsAgent as
        | https.Agent
        | undefined;
      const existingAgentOptions = existingHttpsAgent?.options || {};

      // For more advanced configuration, raise an issue on GitHub or use the "networkOptions"
      // parameter to define a custom httpsAgent with the desired properties
      this.globalRequestOptions.httpsAgent = new https.Agent({
        ...existingAgentOptions,
        keepAlive: true,
        keepAliveMsecs: this.options.keepAliveMsecs,
      });
    }

    this.baseUrl = getRestBaseUrl(!!this.options.testnet, restOptions);
    this.key = this.options.key;
    this.secret = this.options.secret;

    if (this.key && !this.secret) {
      throw new Error(
        'API Key & Secret are both required for private endpoints',
      );
    }

    // Check Web Crypto API support when credentials are provided and no custom sign function is used
    if (this.key && this.secret && !this.options.customSignMessageFn) {
      checkWebCryptoAPISupported();
    }

    if (this.options.enable_time_sync) {
      this.syncTime();
      setInterval(this.syncTime.bind(this), +this.options.sync_interval_ms!);
    }
  }

  get(endpoint: string, params?: any) {
    return this._call('GET', endpoint, params, true);
  }

  getPrivate(endpoint: string, params?: any) {
    return this._call('GET', endpoint, params, false);
  }

  post(endpoint: string, params?: any) {
    return this._call('POST', endpoint, params, true);
  }

  postPrivate(endpoint: string, params?: any) {
    return this._call('POST', endpoint, params, false);
  }

  postPrivateFile(endpoint: string, params?: FileUploadParams) {
    return this._callFile('POST', endpoint, params);
  }

  deletePrivate(endpoint: string, params?: any) {
    return this._call('DELETE', endpoint, params, false);
  }

  private async prepareSignParams<TParams = any>(
    method: Method,
    signMethod: SignMethod,
    params?: TParams,
    isPublicApi?: true,
  ): Promise<UnsignedRequest<TParams>>;

  private async prepareSignParams<TParams = any>(
    method: Method,
    signMethod: SignMethod,
    params?: TParams,
    isPublicApi?: false | undefined,
  ): Promise<SignedRequest<TParams>>;

  private async prepareSignParams<TParams extends SignedRequestContext = any>(
    method: Method,
    signMethod: SignMethod,
    params?: TParams,
    isPublicApi?: boolean,
  ): Promise<SignedRequest<TParams> | UnsignedRequest<TParams>>;

  private async prepareSignParams<TParams extends SignedRequestContext = any>(
    method: Method,
    signMethod: SignMethod,
    params?: TParams,
    isPublicApi?: boolean,
  ) {
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

    if (this.options.syncTimeBeforePrivateRequests) {
      this.timeOffset = await this.fetchTimeOffset();
    }

    return this.signRequest(params || {}, method, signMethod);
  }

  /** Returns an axios request object. Handles signing process automatically if this is a private API call */
  private async buildRequest(
    method: Method,
    url: string,
    params?: any,
    isPublicApi?: boolean,
  ): Promise<AxiosRequestConfig> {
    const options: AxiosRequestConfig = {
      ...this.globalRequestOptions,
      url: url,
      method: method,
    };

    for (const key in params) {
      if (typeof params[key] === 'undefined') {
        delete params[key];
      }
    }

    if (isPublicApi) {
      return {
        ...options,
        params: params,
      };
    }

    const signResult = await this.prepareSignParams(
      method,
      'v5auth',
      params,
      isPublicApi,
    );

    const headers: AxiosRequestConfig['headers'] = {
      'X-BAPI-SIGN-TYPE': 2,
      'X-BAPI-API-KEY': this.key,
      'X-BAPI-TIMESTAMP': signResult.timestamp,
      'X-BAPI-SIGN': signResult.sign,
      'X-BAPI-RECV-WINDOW': signResult.recvWindow,
      ...options.headers,
    };

    if (method === 'GET') {
      return {
        ...options,
        headers,
        url: signResult.serializedParams
          ? options.url + '?' + signResult.serializedParams
          : options.url,
      };
    }

    return {
      ...options,
      headers,
      data: signResult.originalParams,
    };
  }

  /**
   * @private Make a HTTP request to a specific endpoint. Private endpoints are automatically signed.
   */
  private async _call(
    method: Method,
    endpoint: string,
    params?: any,
    isPublicApi?: boolean,
  ): Promise<any> {
    // Sanity check to make sure it's only ever prefixed by one forward slash
    const requestUrl = [this.baseUrl, endpoint].join(
      endpoint.startsWith('/') ? '' : '/',
    );

    // Build a request and handle signature process
    const options = await this.buildRequest(
      method,
      requestUrl,
      params,
      isPublicApi,
    );

    if (ENABLE_HTTP_TRACE) {
      console.log('full request: ', options);
    }

    // Dispatch request
    return axios(options)
      .then((response) => {
        if (response.status == 200) {
          const perAPIRateLimits = this.options.parseAPIRateLimits
            ? parseRateLimitHeaders(
                response.headers,
                this.options.throwOnFailedRateLimitParse === true,
              )
            : undefined;

          const result = {
            rateLimitApi: perAPIRateLimits,
            ...response.data,
          };

          if (this.options.throwExceptions && result.retCode !== 0) {
            throw result;
          }

          return result;
        }

        throw response;
      })
      .catch((e) => this.parseException(e));
  }

  /**
   * @private Make a HTTP request to upload a file (Node.js only). Handles multipart/form-data encoding and binary signature, but assumes file is provided as Buffer
   */
  private async _callFile(
    method: Method,
    endpoint: string,
    params?: FileUploadParams,
  ): Promise<any> {
    if (!params) {
      throw new Error('No file provided in upload request');
    }
    if (!this.key || !this.secret) {
      throw new Error('Private endpoints require api and private keys set');
    }

    // Sync time if needed
    if (this.timeOffset === null) {
      await this.syncTime();
    }

    if (this.options.syncTimeBeforePrivateRequests) {
      this.timeOffset = await this.fetchTimeOffset();
    }

    const timestamp = Date.now() + (this.timeOffset || 0);
    const recvWindow = this.options.recv_window || 5000;

    // Build multipart payload
    const { payload, contentType } = await this.buildMultipartPayload(params);

    // Sign the binary payload (supports both HMAC and RSA)
    // Signature format: HMAC-SHA256 or RSA-SHA256(timestamp + api_key + recv_window + binary_payload)
    const signStringPrefix = `${timestamp}${this.key}${recvWindow}`;
    const signBuffer = Buffer.concat([
      Buffer.from(signStringPrefix, 'utf-8'),
      payload,
    ]);

    // Sign binary data with HMAC or RSA using Web Crypto API
    const sign = await signBinaryData(signBuffer, this.secret);

    // Sanity check to make sure it's only ever prefixed by one forward slash
    const requestUrl = [this.baseUrl, endpoint].join(
      endpoint.startsWith('/') ? '' : '/',
    );

    const options: AxiosRequestConfig = {
      ...this.globalRequestOptions,
      url: requestUrl,
      method: method,
      headers: {
        ...this.globalRequestOptions.headers,
        'X-BAPI-SIGN-TYPE': 2,
        'X-BAPI-API-KEY': this.key,
        'X-BAPI-TIMESTAMP': timestamp,
        'X-BAPI-SIGN': sign,
        'X-BAPI-RECV-WINDOW': recvWindow,
        'Content-Type': contentType,
      },
      data: payload,
    };

    if (ENABLE_HTTP_TRACE) {
      console.log('full file upload request: ', {
        ...options,
        data: `<binary data, ${payload.length} bytes>`,
      });
    }

    // Dispatch request
    return axios(options)
      .then((response) => {
        if (response.status == 200) {
          const perAPIRateLimits = this.options.parseAPIRateLimits
            ? parseRateLimitHeaders(
                response.headers,
                this.options.throwOnFailedRateLimitParse === true,
              )
            : undefined;

          const result = {
            rateLimitApi: perAPIRateLimits,
            ...response.data,
          };

          if (this.options.throwExceptions && result.retCode !== 0) {
            throw result;
          }

          return result;
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
      if (!e.request && e.message) {
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
   * @private Build multipart/form-data payload for file uploads (Node.js only)
   */
  private async buildMultipartPayload(params: FileUploadParams): Promise<{
    payload: Buffer;
    contentType: string;
  }> {
    const fileBuffer = params.fileBuffer;
    const fileName = params.fileName;

    if (!fileBuffer) {
      throw new Error('upload_file parameter is required for file uploads');
    }

    if (!fileName) {
      throw new Error(
        'filename parameter is required for file uploads (used for MIME type detection)',
      );
    }

    if (!Buffer.isBuffer(fileBuffer)) {
      throw new Error(
        'uploadFile must be provided as a Buffer. To upload from a file path, read the file yourself: fs.readFileSync(filePath)',
      );
    }

    const fileData = { data: fileBuffer, filename: fileName };

    // Determine MIME type from filename extension
    const mimeType = getMimeType(fileData.filename);

    // Build multipart/form-data manually (following Bybit's format)
    const boundary = 'boundary-for-file';
    const contentType = `multipart/form-data; boundary=${boundary}`;

    const header = `--${boundary}\r\nContent-Disposition: form-data; name="upload_file"; filename="${fileData.filename}"\r\nContent-Type: ${mimeType}\r\n\r\n`;
    const footer = `\r\n--${boundary}--\r\n`;

    // Construct payload (Node.js only - simple Buffer concatenation)
    const payload = Buffer.concat([
      Buffer.from(header, 'utf-8'),
      fileData.data,
      Buffer.from(footer, 'utf-8'),
    ]);

    return { payload, contentType };
  }

  private async signMessage(
    paramsStr: string,
    secret: string,
    method?: SignEncodeMethod,
    algorithm: SignAlgorithm = 'SHA-256',
  ): Promise<string> {
    if (typeof this.options.customSignMessageFn === 'function') {
      return this.options.customSignMessageFn(paramsStr, secret);
    }
    return await signMessage(paramsStr, secret, method, algorithm);
  }

  /**
   * @private sign request and set recv window
   */
  private async signRequest<T extends SignedRequestContext | {} = {}>(
    data: T,
    method: Method,
    signMethod: SignMethod,
  ): Promise<SignedRequest<T>> {
    const timestamp = Date.now() + (this.timeOffset || 0);

    const res: SignedRequest<T> = {
      originalParams: {
        ...data,
      },
      sign: '',
      timestamp,
      recvWindow: 0,
      serializedParams: '',
    };

    if (!this.key || !this.secret) {
      return res;
    }
    const key = this.key;
    const recvWindow =
      res.originalParams.recv_window || this.options.recv_window || 5000;
    const strictParamValidation = this.options.strict_param_validation;
    const encodeSerialisedValues = this.options.encodeSerialisedValues;

    // In case the parent function needs it (e.g. USDC uses a header)
    res.recvWindow = recvWindow;

    // usdc is different for some reason
    if (signMethod === 'v5auth') {
      const sortProperties = false;
      const signRequestParams =
        method === 'GET'
          ? serializeParams(
              res.originalParams,
              strictParamValidation,
              sortProperties,
              encodeSerialisedValues,
            )
          : JSON.stringify(res.originalParams);

      const paramsStr = timestamp + key + recvWindow + signRequestParams;

      res.sign = await this.signMessage(
        paramsStr,
        this.secret,
        undefined, // Let the function automatically determine encoding based on key type
        'SHA-256',
      );

      res.serializedParams = signRequestParams;

      // console.log('sign req: ', {
      //   req: paramsStr,
      //   sign: res.sign,
      // });
      return res;
    }

    return res;
  }

  /**
   * Trigger time sync and store promise. Use force: true, if automatic time sync is disabled
   */
  private syncTime(force?: boolean): Promise<any> {
    if (!force && !this.options.enable_time_sync) {
      this.timeOffset = 0;
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
          `fetchServerTime() returned non-number: "${serverTime}" typeof(${typeof serverTime})`,
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
