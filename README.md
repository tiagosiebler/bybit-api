# @pxtrn/bybit-api

An unofficial node.js lowlevel wrapper for the Bybit Cryptocurrency Derivative
exchange API.


## Installation

`npm install --save @pxtrn/bybit-api`


## Usage

Create API credentials at bybit (obviously you need to be logged in):
- [Livenet](https://bybit.com/app/user/api-management)
- [Testnet](https://testnet.bybit.com/app/user/api-management)


### Rest client

```js
const {RestClient} = require('@pxtrn/bybit-api');

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

```js
const {WebsocketClient} = require('@pxtrn/bybit-api');

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
const { RestClient, WebsocketClient, DefaultLogger } = require('@pxtrn/bybit-api');

// Disable all logging on the silly level
DefaultLogger.silly = () => {};

const API_KEY = 'xxx';
const PRIVATE_KEY = 'yyy';

const ws = new WebsocketClient({key: API_KEY, secret: PRIVATE_KEY}, DefaultLogger);
```

## Donations

If this library helps you to trade better on bybit, feel free to donate a coffee,
or create a bybit account using my [ref link](https://www.bybit.com/app/register?ref=j8q5l).

- BTC `1Fh1158pXXudfM6ZrPJJMR7Y5SgZUz4EdF`
- ETH `0x21aEdeC53ab7593b77C9558942f0c9E78131e8d7`
- LTC `LNdHSVtG6UWsriMYLJR3qLdfVNKwJ6GSLF`
