
const assert = require('assert');

const request = require('request');

const {signMessage, getServerTimeOffset} = require('./utility.js');

const baseUrls = {
  livenet: 'https://api.bybit.com',
  testnet: 'https://api-testnet.bybit.com'
}

module.exports = class Request {

  constructor(key, secret, livenet=false) {
    this.baseUrl = baseUrls[livenet === true ? 'livenet' : 'testnet'];
    this._timeOffset = null;

    if(key) assert(secret, 'Secret is required for private enpoints');

    this._syncTime();
    setInterval(this._syncTime.bind(this), 3600000);

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
    const result = await this.get('/v2/public/time');
    const end = Date.now();

    return Math.ceil((result.time_now * 1000) - start + ((end - start) / 2));
  }

  async _call(method, endpoint, params) {
    const publicEndpoint = endpoint.startsWith('/v2/public');

    if(!publicEndpoint) {
      if(!this.key || !this.secret) throw new Error('Private endpoints require api and private keys set');

      if(this._timeOffset === null) await this._syncTime();

      params = this._signRequest(params);
    }

    const options = {
      url: [this.baseUrl, endpoint].join('/'),
      method: method,
      json: true
    };

    switch(method) {
      case 'GET':
        options.qs = params
      break;
      case 'POST':
        options.body = params
      break;
    }

    return new Promise((resolve, reject) => {
      request(options, function callback(error, response, body) {
        if(!error && response.statusCode == 200) {
          resolve(body);
        } else if(error) {
          reject(error);
        }
      });
    });
  }

  _signRequest(data) {
    const params = {
      ...data,
      api_key: this.key,
      timestamp: Date.now() + this._timeOffset
    };

    if(this.key && this.secret) {
      params.sign = signMessage(this._serializeParams(params), this.secret);
    }

    return params;
  }

  _serializeParams(params) {
    return Object.keys(params)
      .sort()
      .map(key => `${key}=${params[key]}`)
      .join('&');
  }

  async _syncTime() {
    this._timeOffset = await this.getTimeOffset();
  }
}
