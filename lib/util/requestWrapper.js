const assert = require('assert');
const axios = require('axios');

const { signMessage, serializeParams } = require('./requestUtils');

const baseUrls = {
  livenet: 'https://api.bybit.com',
  testnet: 'https://api-testnet.bybit.com'
};

module.exports = class RequestUtil {
  constructor(key, secret, livenet=false, options={}, requestOptions={}) {
    this._timeOffset = null;
    this._syncTimePromise = null;

    this.options = {
      recv_window: 5000,
      // how often to sync time drift with bybit servers
      sync_interval_ms: 3600000,
      // if true, we'll throw errors if any params are undefined
      strict_param_validation: false,
      ...options
    };

    this.baseUrl = baseUrls[livenet === true ? 'livenet' : 'testnet'];
    if (options.baseUrl) {
      this.baseUrl = options.baseUrl;
    }

    this.globalRequestOptions = {
      // in ms == 5 minutes by default
      timeout: 1000 * 60 * 5,
      // custom request options based on axios specs - see: https://github.com/axios/axios#request-config
      ...requestOptions,
      headers: {
        'referer': 'bybitapinode'
      },
    };

    if (key) {
      assert(secret, 'Secret is required for private enpoints');
    }

    this._syncTime();
    setInterval(this._syncTime.bind(this), parseInt(this.options.sync_interval_ms));

    this.key = key;
    this.secret = secret;
  }

  async get(endpoint, params) {
    const result = await this._call('GET', endpoint, params);
    return result;
  }

  async post(endpoint, params) {
    const result = await this._call('POST', endpoint, params);
    return result;
  }

  async getTimeOffset() {
    const start = Date.now();
    const result = await this.get('v2/public/time');
    const end = Date.now();

    return Math.ceil((result.time_now * 1000) - end + ((end - start) / 2));
  }

  async _call(method, endpoint, params) {
    const publicEndpoint = endpoint.startsWith('v2/public');

    if (!publicEndpoint) {
      if (!this.key || !this.secret) {
        throw new Error('Private endpoints require api and private keys set');
      }

      if (this._timeOffset === null) {
        await this._syncTime();
      }

      params = this._signRequest(params);
    }

    const options = {
      ...this.globalRequestOptions,
      url: [this.baseUrl, endpoint].join('/'),
      method: method,
      json: true
    };

    switch (method) {
    case 'GET':
      options.params = params;
      break;
    default:
      options.data = params;
      break;
    }

    return axios(options).then(response => {
      if (response.status == 200) {
        return response.data;
      }

      throw {
        code: response.status,
        message: response.statusText,
        body: response.data,
        requestOptions: options
      };
    })
      .catch(e => {
        if (!e.response) {
        // Something happened in setting up the request that triggered an Error
          if (!e.request) {
            throw e.message;
          }

          // request made but no response received
          throw e;
        }

        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        throw {
          code: e.response.statusCode,
          message: e.response.message,
          body: e.response.body,
          requestOptions: options,
          headers: e.response.headers
        };
      });
  }

  _signRequest(data) {
    const params = {
      ...data,
      api_key: this.key,
      timestamp: Date.now() + this._timeOffset
    };

    // Optional, set to 5000 by default. Increase if timestamp/recv_window errors are seen.
    if (this.options.recv_window && !params.recv_window) {
      params.recv_window = this.options.recv_window;
    }

    if (this.key && this.secret) {
      const serializedParams = serializeParams(params, this.options.strict_param_validation);
      params.sign = signMessage(serializedParams, this.secret);
    }

    return params;
  }

  _syncTime() {
    if (this._syncTimePromise !== null) {
      return this._syncTimePromise;
    }

    this._syncTimePromise = this.getTimeOffset().then(offset => {
      this._timeOffset = offset;
      this._syncTimePromise = null;
    });

    return this._syncTimePromise;
  }
};
