"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
const axios_1 = __importDefault(require("axios"));
const requestUtils_1 = require("./requestUtils");
const node_support_1 = require("./node-support");
const ENABLE_HTTP_TRACE = typeof process === 'object' &&
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
    axios_1.default.interceptors.response.use((response) => {
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
class BaseRestClient {
    /**
     * Create an instance of the REST client. Pass API credentials in the object in the first parameter.
     * @param {RestClientOptions} [restOptions={}] options to configure REST API connectivity
     * @param {AxiosRequestConfig} [networkOptions={}] HTTP networking options for axios
     */
    constructor(restOptions = {}, networkOptions = {}) {
        this.timeOffset = null;
        this.syncTimePromise = null;
        this.clientType = this.getClientType();
        this.options = Object.assign({ recv_window: 5000, 
            /** Throw errors if any request params are empty */
            strict_param_validation: false, 
            /** Disable time sync by default */
            enable_time_sync: false, 
            /** How often to sync time drift with bybit servers (if time sync is enabled) */
            sync_interval_ms: 3600000, 
            /** Determines whether to perform time synchronization before sending private requests */
            syncTimeBeforePrivateRequests: false, 
            /** Request parameter values are now URI encoded by default during signing. Set to false to override this behaviour. */
            encodeSerialisedValues: true }, restOptions);
        this.globalRequestOptions = Object.assign(Object.assign({ 
            // in ms == 5 minutes by default
            timeout: 1000 * 60 * 5 }, networkOptions), { headers: Object.assign(Object.assign({}, networkOptions.headers), { 'x-referer': requestUtils_1.APIID }) });
        this.baseUrl = (0, requestUtils_1.getRestBaseUrl)(!!this.options.testnet, restOptions);
        this.key = this.options.key;
        this.secret = this.options.secret;
        if (this.key && !this.secret) {
            throw new Error('API Key & Secret are both required for private endpoints');
        }
        if (this.options.enable_time_sync) {
            this.syncTime();
            setInterval(this.syncTime.bind(this), +this.options.sync_interval_ms);
        }
    }
    isSpotV1Client() {
        return this.clientType === requestUtils_1.REST_CLIENT_TYPE_ENUM.spot;
    }
    get(endpoint, params) {
        return this._call('GET', endpoint, params, true);
    }
    getPrivate(endpoint, params) {
        return this._call('GET', endpoint, params, false);
    }
    post(endpoint, params) {
        return this._call('POST', endpoint, params, true);
    }
    postPrivate(endpoint, params) {
        return this._call('POST', endpoint, params, false);
    }
    deletePrivate(endpoint, params) {
        return this._call('DELETE', endpoint, params, false);
    }
    prepareSignParams(method, signMethod, params, isPublicApi) {
        return __awaiter(this, void 0, void 0, function* () {
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
                yield this.syncTime();
            }
            if (this.options.syncTimeBeforePrivateRequests) {
                this.timeOffset = yield this.fetchTimeOffset();
            }
            return this.signRequest(params || {}, method, signMethod);
        });
    }
    /** Returns an axios request object. Handles signing process automatically if this is a private API call */
    buildRequest(method, url, params, isPublicApi) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = Object.assign(Object.assign({}, this.globalRequestOptions), { url: url, method: method });
            for (const key in params) {
                if (typeof params[key] === 'undefined') {
                    delete params[key];
                }
            }
            if (isPublicApi) {
                return Object.assign(Object.assign({}, options), { params: params });
            }
            // USDC endpoints, unified margin and a few others use a different way of authenticating requests (headers instead of params)
            if (this.clientType === requestUtils_1.REST_CLIENT_TYPE_ENUM.v3) {
                const signResult = yield this.prepareSignParams(method, 'v5auth', params, isPublicApi);
                const headers = Object.assign({ 'X-BAPI-SIGN-TYPE': 2, 'X-BAPI-API-KEY': this.key, 'X-BAPI-TIMESTAMP': signResult.timestamp, 'X-BAPI-SIGN': signResult.sign, 'X-BAPI-RECV-WINDOW': signResult.recvWindow }, options.headers);
                if (method === 'GET') {
                    return Object.assign(Object.assign({}, options), { headers, params: signResult.originalParams });
                }
                return Object.assign(Object.assign({}, options), { headers, data: signResult.originalParams });
            }
            const signResult = yield this.prepareSignParams(method, 'v2auth', params, isPublicApi);
            if (method === 'GET' || this.isSpotV1Client()) {
                return Object.assign(Object.assign({}, options), { params: signResult.paramsWithSign });
            }
            return Object.assign(Object.assign({}, options), { data: signResult.paramsWithSign });
        });
    }
    /**
     * @private Make a HTTP request to a specific endpoint. Private endpoints are automatically signed.
     */
    _call(method, endpoint, params, isPublicApi) {
        return __awaiter(this, void 0, void 0, function* () {
            // Sanity check to make sure it's only ever prefixed by one forward slash
            const requestUrl = [this.baseUrl, endpoint].join(endpoint.startsWith('/') ? '' : '/');
            // Build a request and handle signature process
            const options = yield this.buildRequest(method, requestUrl, params, isPublicApi);
            if (ENABLE_HTTP_TRACE) {
                console.log('full request: ', options);
            }
            // Dispatch request
            return (0, axios_1.default)(options)
                .then((response) => {
                if (response.status == 200) {
                    const perAPIRateLimits = this.options.parseAPIRateLimits
                        ? (0, requestUtils_1.parseRateLimitHeaders)(response.headers, this.options.throwOnFailedRateLimitParse === true)
                        : undefined;
                    return Object.assign({ rateLimitApi: perAPIRateLimits }, response.data);
                }
                throw response;
            })
                .catch((e) => this.parseException(e));
        });
    }
    /**
     * @private generic handler to parse request exceptions
     */
    parseException(e) {
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
        const response = e.response;
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
    signRequest(data, method, signMethod) {
        return __awaiter(this, void 0, void 0, function* () {
            const timestamp = Date.now() + (this.timeOffset || 0);
            const res = {
                originalParams: Object.assign({}, data),
                sign: '',
                timestamp,
                recvWindow: 0,
                serializedParams: '',
            };
            if (!this.key || !this.secret) {
                return res;
            }
            const key = this.key;
            const recvWindow = res.originalParams.recv_window || this.options.recv_window || 5000;
            const strictParamValidation = this.options.strict_param_validation;
            const encodeSerialisedValues = this.options.encodeSerialisedValues;
            // In case the parent function needs it (e.g. USDC uses a header)
            res.recvWindow = recvWindow;
            // usdc is different for some reason
            if (signMethod === 'v5auth') {
                const sortProperties = false;
                const signRequestParams = method === 'GET'
                    ? (0, requestUtils_1.serializeParams)(res.originalParams, strictParamValidation, sortProperties, encodeSerialisedValues)
                    : JSON.stringify(res.originalParams);
                const paramsStr = timestamp + key + recvWindow + signRequestParams;
                res.sign = yield (0, node_support_1.signMessage)(paramsStr, this.secret);
                res.serializedParams = signRequestParams;
                // console.log('sign req: ', {
                //   req: paramsStr,
                //   sign: res.sign,
                // });
                return res;
            }
            // spot/v2 derivatives
            if (signMethod === 'v2auth') {
                res.originalParams.api_key = key;
                res.originalParams.timestamp = timestamp;
                // Optional, set to 5000 by default. Increase if timestamp/recv_window errors are seen.
                if (recvWindow) {
                    if (this.isSpotV1Client()) {
                        res.originalParams.recvWindow = recvWindow;
                    }
                    else {
                        res.originalParams.recv_window = recvWindow;
                    }
                }
                const sortProperties = true;
                const encodeValues = false;
                res.serializedParams = (0, requestUtils_1.serializeParams)(res.originalParams, strictParamValidation, sortProperties, encodeValues);
                res.sign = yield (0, node_support_1.signMessage)(res.serializedParams, this.secret);
                // @ts-ignore
                res.paramsWithSign = Object.assign(Object.assign({}, res.originalParams), { sign: res.sign });
                return res;
            }
            return res;
        });
    }
    /**
     * Trigger time sync and store promise. Use force: true, if automatic time sync is disabled
     */
    syncTime(force) {
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
    fetchTimeOffset() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const start = Date.now();
                const serverTime = yield this.fetchServerTime();
                if (!serverTime || isNaN(serverTime)) {
                    throw new Error(`fetchServerTime() returned non-number: "${serverTime}" typeof(${typeof serverTime})`);
                }
                const end = Date.now();
                const severTimeMs = serverTime * 1000;
                const avgDrift = (end - start) / 2;
                return Math.ceil(severTimeMs - end + avgDrift);
            }
            catch (e) {
                console.error('Failed to fetch get time offset: ', e);
                return 0;
            }
        });
    }
}
exports.default = BaseRestClient;
//# sourceMappingURL=BaseRestClient.js.map