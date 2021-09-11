# bybit-api
[![Tests](https://circleci.com/gh/tiagosiebler/bybit-api.svg?style=shield)](https://circleci.com/gh/tiagosiebler/bybit-api)
[![npm version](https://img.shields.io/npm/v/bybit-api)][1] [![npm size](https://img.shields.io/bundlephobia/min/bybit-api/latest)][1] [![npm downloads](https://img.shields.io/npm/dt/bybit-api)][1]
[![last commit](https://img.shields.io/github/last-commit/tiagosiebler/bybit-api)][1]
[![CodeFactor](https://www.codefactor.io/repository/github/tiagosiebler/bybit-api/badge)](https://www.codefactor.io/repository/github/tiagosiebler/bybit-api)

[1]: https://www.npmjs.com/package/bybit-api

Node.js connector for the Bybit APIs and WebSockets, with TypeScript & browser support.

## Installation
`npm install --save bybit-api`

## Issues & Discussion
- Issues? Check the [issues tab](https://github.com/tiagosiebler/bybit-api/issues).
- Discuss & collaborate with other node devs? Join our [Node.js Algo Traders](https://t.me/nodetraders) engineering community on telegram.

## Documentation
Most methods accept JS objects. These can be populated using parameters specified by Bybit's API documentation.
- [Bybit API Inverse Documentation](https://bybit-exchange.github.io/docs/inverse/#t-introduction).
- [Bybit API Inverse Futures Documentation](https://bybit-exchange.github.io/docs/inverse_futures/#t-introduction).
- [Bybit API Linear Documentation](https://bybit-exchange.github.io/docs/linear/#t-introduction)

## Structure
This project uses typescript. Resources are stored in 3 key structures:
- [src](./src) - the whole connector written in typescript
- [lib](./lib) - the javascript version of the project (compiled from typescript). This should not be edited directly, as it will be overwritten with each release.
- [dist](./dist) - the packed bundle of the project for use in browser environments.
- [examples](./examples) - some implementation examples & demonstrations. Contributions are welcome!

---

# Usage
Create API credentials at Bybit
- [Livenet](https://bybit.com/app/user/api-management?affiliate_id=9410&language=en-US&group_id=0&group_type=1)
- [Testnet](https://testnet.bybit.com/app/user/api-management)

## REST API Clients

There are three REST API modules as there are some differences in each contract type.
1. `InverseClient` for inverse perpetual
2. `InverseFuturesClient` for inverse futures
3. `LinearClient` for linear perpetual

### REST Inverse
To use the inverse REST APIs, import the `InverseClient`:

```javascript
const { InverseClient } = require('bybit-api');

const restClientOptions = {
  // override the max size of the request window (in ms)
  recv_window?: number;

  // how often to sync time drift with bybit servers
  sync_interval_ms?: number | string;

  // Default: false. Disable above sync mechanism if true.
  disable_time_sync?: boolean;

  // Default: false. If true, we'll throw errors if any params are undefined
  strict_param_validation?: boolean;

  // Optionally override API protocol + domain
  // e.g 'https://api.bytick.com'
  baseUrl?: string;

  // Default: true. whether to try and post-process request exceptions.
  parse_exceptions?: boolean;
};

const API_KEY = 'xxx';
const PRIVATE_KEY = 'yyy';
const useLivenet = false;

const client = new InverseClient(
  API_KEY,
  PRIVATE_KEY,

  // optional, uses testnet by default. Set to 'true' to use livenet.
  useLivenet,

  // restClientOptions,
  // requestLibraryOptions
);

client.getApiKeyInfo()
  .then(result => {
    console.log("apiKey result: ", result);
  })
  .catch(err => {
    console.error("apiKey error: ", err);
  });

client.getOrderBook({ symbol: 'BTCUSD' })
  .then(result => {
    console.log("getOrderBook inverse result: ", result);
  })
  .catch(err => {
    console.error("getOrderBook inverse error: ", err);
  });
```


See [inverse-client.ts](./src/inverse-client.ts) for further information.

### REST Inverse Futures
To use the inverse futures REST APIs, import the `InverseFuturesClient`:

```javascript
const { InverseFuturesClient } = require('bybit-api');

const API_KEY = 'xxx';
const PRIVATE_KEY = 'yyy';
const useLivenet = false;

const client = new InverseFuturesClient(
  API_KEY,
  PRIVATE_KEY,

  // optional, uses testnet by default. Set to 'true' to use livenet.
  useLivenet,

  // restClientOptions,
  // requestLibraryOptions
);

client.getApiKeyInfo()
  .then(result => {
    console.log("apiKey result: ", result);
  })
  .catch(err => {
    console.error("apiKey error: ", err);
  });

client.getOrderBook({ symbol: 'BTCUSDH21' })
  .then(result => {
    console.log("getOrderBook inverse futures result: ", result);
  })
  .catch(err => {
    console.error("getOrderBook inverse futures error: ", err);
  });
```

See [inverse-futures-client.ts](./src/inverse-futures-client.ts) for further information.

### REST Linear
To use the Linear (USDT) REST APIs, import the `LinearClient`:

```javascript
const { LinearClient } = require('bybit-api');

const API_KEY = 'xxx';
const PRIVATE_KEY = 'yyy';
const useLivenet = false;

const client = new LinearClient(
  API_KEY,
  PRIVATE_KEY,

  // optional, uses testnet by default. Set to 'true' to use livenet.
  useLivenet,

  // restClientOptions,
  // requestLibraryOptions
);

client.getApiKeyInfo()
  .then(result => {
    console.log(result);
  })
  .catch(err => {
    console.error(err);
  });

client.getOrderBook({ symbol: 'BTCUSDT' })
  .then(result => {
    console.log("getOrderBook linear result: ", result);
  })
  .catch(err => {
    console.error("getOrderBook linear error: ", err);
  });
```

See [linear-client.ts](./src/linear-client.ts) for further information.

### REST Spot
To use the Spot REST APIs, import the `SpotClient`:

```javascript
const { SpotClient } = require('bybit-api');

const API_KEY = 'xxx';
const PRIVATE_KEY = 'yyy';
const useLivenet = false;

const client = new SpotClient(
  API_KEY,
  PRIVATE_KEY,

  // optional, uses testnet by default. Set to 'true' to use livenet.
  useLivenet,

  // restClientOptions,
  // requestLibraryOptions
);

client.getSymbols()
  .then(result => {
    console.log(result);
  })
  .catch(err => {
    console.error(err);
  });

client.getBalances()
  .then(result => {
    console.log("getBalances result: ", result);
  })
  .catch(err => {
    console.error("getBalances error: ", err);
  });
```

See [spot-client.ts](./src/spot-client.ts) for further information.

## WebSockets
Inverse, linear & spot WebSockets can be used via a shared `WebsocketClient`. However, make sure to make one instance of WebsocketClient per market type (spot vs inverse vs linear vs linearfutures):

```javascript
const { WebsocketClient } = require('bybit-api');

const API_KEY = 'xxx';
const PRIVATE_KEY = 'yyy';

const wsConfig = {
  key: API_KEY,
  secret: PRIVATE_KEY,

  /*
    The following parameters are optional:
  */

  // defaults to false == testnet. Set to true for livenet.
  // livenet: true

  // NOTE: to listen to multiple markets (spot vs inverse vs linear vs linearfutures) at once, make one WebsocketClient instance per market

  // defaults to inverse:
  // market: 'inverse'
  // market: 'linear'
  // market: 'spot'

  // how long to wait (in ms) before deciding the connection should be terminated & reconnected
  // pongTimeout: 1000,

  // how often to check (in ms) that WS connection is still alive
  // pingInterval: 10000,

  // how long to wait before attempting to reconnect (in ms) after connection is closed
  // reconnectTimeout: 500,

  // config options sent to RestClient (used for time sync). See RestClient docs.
  // restOptions: { },

  // config for axios used for HTTP requests. E.g for proxy support
  // requestOptions: { }

  // override which URL to use for websocket connections
  // wsUrl: 'wss://stream.bytick.com/realtime'
};

const ws = new WebsocketClient(wsConfig);

// subscribe to multiple topics at once
ws.subscribe(['position', 'execution', 'trade']);

// and/or subscribe to individual topics on demand
ws.subscribe('kline.BTCUSD.1m');

// Listen to events coming from websockets. This is the primary data source
ws.on('update', data => {
  console.log('update', data);
});

// Optional: Listen to websocket connection open event (automatic after subscribing to one or more topics)
ws.on('open', ({ wsKey, event }) => {
  console.log('connection open for websocket with ID: ' + wsKey);
});

// Optional: Listen to responses to websocket queries (e.g. the response after subscribing to a topic)
ws.on('response', response => {
  console.log('response', response);
});

// Optional: Listen to connection close event. Unexpected connection closes are automatically reconnected.
ws.on('close', () => {
  console.log('connection closed');
});

// Optional: Listen to raw error events.
// Note: responses to invalid topics are currently only sent in the "response" event.
ws.on('error', err => {
  console.error('ERR', err);
});
```


See [websocket-client.ts](./src/websocket-client.ts) for further information.

Note: for linear websockets, pass `linear: true` in the constructor options when instancing the `WebsocketClient`. To connect to both linear and inverse websockets, make two instances of the WebsocketClient.

---

## Customise Logging
Pass a custom logger which supports the log methods `silly`, `debug`, `notice`, `info`, `warning` and `error`, or override methods from the default logger as desired.

```javascript
const { WebsocketClient, DefaultLogger } = require('bybit-api');

// Disable all logging on the silly level
DefaultLogger.silly = () => {};

const ws = new WebsocketClient(
  { key: 'xxx', secret: 'yyy' },
  DefaultLogger
);
```

## Browser Usage
Build a bundle using webpack:
- `npm install`
- `npm build`
- `npm pack`

The bundle can be found in `dist/`. Altough usage should be largely consistent, smaller differences will exist. Documentation is still TODO.

However, note that browser usage will lead to CORS errors due Bybit. See [issue #79](#79) for more information & alternative suggestions.

---

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
