# bybit-api
[![npm version](https://img.shields.io/npm/v/bybit-api)][1] [![npm size](https://img.shields.io/bundlephobia/min/bybit-api/latest)][1] [![npm downloads](https://img.shields.io/npm/dt/bybit-api)][1]
[![last commit](https://img.shields.io/github/last-commit/tiagosiebler/bybit-api)][1]
[![CodeFactor](https://www.codefactor.io/repository/github/tiagosiebler/bybit-api/badge)](https://www.codefactor.io/repository/github/tiagosiebler/bybit-api)

[1]: https://www.npmjs.com/package/bybit-api

An light node.js wrapper for the Bybit Cryptocurrency Derivative exchange API. Forked & adapted from [@pxtrn/bybit-api](https://github.com/pixtron/bybit-api).

## Installation
`npm install --save bybit-api`

## Usage
Create API credentials at bybit (obviously you need to be logged in):
- [Livenet](https://bybit.com/app/user/api-management?affiliate_id=9410&language=en-US&group_id=0&group_type=1)
- [Testnet](https://testnet.bybit.com/app/user/api-management)

## Documentation
Most of the documentation is in [Bybit's official API docs](https://bybit-exchange.github.io/docs/inverse/#t-introduction). Most of this library's methods accept objects that directly correspond to expectations from Bybit's API docs.

### Rest client
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
    console.error(error);
  });
```

See rest client [api docs](./doc/rest-client.md) for further information.

### Websocket client
```javascript
const {WebsocketClient} = require('bybit-api');

const API_KEY = 'xxx';
const PRIVATE_KEY = 'yyy';

const ws = new WebsocketClient({key: API_KEY, secret: PRIVATE_KEY});

ws.subscribe(['position', 'execution', 'trade']);
ws.subscribe('kline.BTCUSD.1m');

ws.on('open', function() {
  console.log('connection open');
});

ws.on('update', function(message) {
  console.log('update', message);
});

ws.on('response', function(response) {
  console.log('response', response);
});

ws.on('close', function() {
  console.log('connection closed');
});

ws.on('error', function(err) {
  console.error('ERR', err);
});
```

See websocket client [api docs](./doc/websocket-client.md) for further information.

### Customise Logging
Pass a custom logger which supports the log methods `silly`, `debug`, `notice`, `info`, `warning` and `error`, or override methods from the default logger as desired:

```js
const { RestClient, WebsocketClient, DefaultLogger } = require('bybit-api');

// Disable all logging on the silly level
DefaultLogger.silly = () => {};

const API_KEY = 'xxx';
const PRIVATE_KEY = 'yyy';

const ws = new WebsocketClient({key: API_KEY, secret: PRIVATE_KEY}, DefaultLogger);
```

## Contributions & Thanks
### Donations
#### pixtron
This library was started by @pixtron. If this library helps you to trade better on bybit, feel free to donate a coffee to @pixtron:
- BTC `1Fh1158pXXudfM6ZrPJJMR7Y5SgZUz4EdF`
- ETH `0x21aEdeC53ab7593b77C9558942f0c9E78131e8d7`
- LTC `LNdHSVtG6UWsriMYLJR3qLdfVNKwJ6GSLF`

#### tiagosiebler
If you found this project interesting or useful, create accounts with my referral links:
- [Bybit](https://www.bybit.com/en-US/register?affiliate_id=9410&language=en-US&group_id=0&group_type=1)
- [Binance](https://www.binance.com/en/register?ref=20983262)

Or buy me a coffee using any of these:
- BTC: `1C6GWZL1XW3jrjpPTS863XtZiXL1aTK7Jk`
- ETH (ERC20): `0xd773d8e6a50758e1ada699bb6c4f98bb4abf82da`

### Contributions & Pull Requests
Contributions are encouraged, I will review any incoming pull requests. See the issues tab for todo items.
