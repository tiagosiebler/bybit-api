# bybit-api
[![npm version](https://img.shields.io/npm/v/bybit-api)][1] [![npm size](https://img.shields.io/bundlephobia/min/bybit-api/latest)][1] [![npm downloads](https://img.shields.io/npm/dt/bybit-api)][1]
[![last commit](https://img.shields.io/github/last-commit/tiagosiebler/bybit-api)][1]
[![CodeFactor](https://www.codefactor.io/repository/github/tiagosiebler/bybit-api/badge)](https://www.codefactor.io/repository/github/tiagosiebler/bybit-api)

[1]: https://www.npmjs.com/package/bybit-api

A production-ready Node.js connector for the Bybit APIs and WebSockets.

## Installation
`npm install --save bybit-api`

## Usage
Create API credentials at Bybit
- [Livenet](https://bybit.com/app/user/api-management?affiliate_id=9410&language=en-US&group_id=0&group_type=1)
- [Testnet](https://testnet.bybit.com/app/user/api-management)

## Issues & Discussion
- Issues? Check the [issues tab](https://github.com/tiagosiebler/bybit-api/issues).
- Discuss & collaborate with other node devs? Join our [Node.js Algo Traders](https://t.me/nodetraders) engineering community on telegram.

## Documentation
Most methods accept JS objects. These can be populated using parameters specified by Bybit's API documentation.
- [Bybit API Inverse Documentation](https://bybit-exchange.github.io/docs/inverse/#t-introduction).
- [Bybit API Linear Documentation (not supported yet)](https://bybit-exchange.github.io/docs/linear/#t-introduction)

### Inverse Contracts
#### Rest client
```javascript
const {RestClient} = require('bybit-api');

const API_KEY = 'xxx';
const PRIVATE_KEY = 'yyy';

const client = new RestClient(API_KEY, PRIVATE_KEY);

client.changeUserLeverage({leverage: 4, symbol: 'ETHUSD'})
  .then(result => {
    console.log(result);
  })
  .catch(err => {
    console.error(err);
  });
```

See inverse [rest-client.js](./lib/rest-client.js) for further information.

#### Websocket client
```javascript
const {WebsocketClient} = require('bybit-api');

const API_KEY = 'xxx';
const PRIVATE_KEY = 'yyy';

const wsConfig = {
  key: API_KEY,
  secret: PRIVATE_KEY,

  // The following parameters are optional:

  // defaults to false == testnet. set to true for livenet.
  // livenet: true

  // override which URL to use for websocket connections
  // wsUrl: 'wss://stream.bytick.com/realtime'

  // how often to check (in ms) that WS connection is still alive
  // pingInterval: 10000,

  // how long to wait (in ms) before deciding the connection should be terminated & reconnected
  // pongTimeout: 1000,

  // how long to wait before attempting to reconnect (in ms) after connection is closed
  // reconnectTimeout: 500,

  // config options sent to RestClient (used for time sync). See RestClient docs.
  // restOptions: { },

  // config for axios to pass to RestClient. E.g for proxy support
  // requestOptions: { }
};

const ws = new WebsocketClient(wsConfig);

ws.subscribe(['position', 'execution', 'trade']);
ws.subscribe('kline.BTCUSD.1m');

ws.on('open', () => {
  console.log('connection open');
});

ws.on('update', message => {
  console.log('update', message);
});

ws.on('response', response => {
  console.log('response', response);
});

ws.on('close', () => {
  console.log('connection closed');
});

ws.on('error', err => {
  console.error('ERR', err);
});
```
See inverse [websocket-client.js](./lib/websocket-client.js) & [ws api docs](./doc/websocket-client.md) for further information.

### Customise Logging
Pass a custom logger which supports the log methods `silly`, `debug`, `notice`, `info`, `warning` and `error`, or override methods from the default logger as desired:

```js
const { RestClient, WebsocketClient, DefaultLogger } = require('bybit-api');

// Disable all logging on the silly level
DefaultLogger.silly = () => {};

const ws = new WebsocketClient({key: 'xxx', secret: 'yyy'}, DefaultLogger);
```

## Contributions & Thanks
### Donations
#### tiagosiebler
If you found this project interesting or useful, create accounts with my referral links:
- [Bybit](https://www.bybit.com/en-US/register?affiliate_id=9410&language=en-US&group_id=0&group_type=1)
- [Binance](https://www.binance.com/en/register?ref=20983262)

Or buy me a coffee using any of these:
- BTC: `1C6GWZL1XW3jrjpPTS863XtZiXL1aTK7Jk`
- ETH (ERC20): `0xd773d8e6a50758e1ada699bb6c4f98bb4abf82da`

#### pixtron
The original library was started by @pixtron. If this library helps you to trade better on bybit, feel free to donate a coffee to @pixtron:
- BTC `1Fh1158pXXudfM6ZrPJJMR7Y5SgZUz4EdF`
- ETH `0x21aEdeC53ab7593b77C9558942f0c9E78131e8d7`
- LTC `LNdHSVtG6UWsriMYLJR3qLdfVNKwJ6GSLF`

### Contributions & Pull Requests
Contributions are encouraged, I will review any incoming pull requests. See the issues tab for todo items.
