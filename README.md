# Node.js & JavaScript SDK for Bybit REST API & WebSockets

[![Build & Test](https://github.com/tiagosiebler/bybit-api/actions/workflows/e2etest.yml/badge.svg?branch=master)](https://github.com/tiagosiebler/bybit-api/actions/workflows/e2etest.yml)
[![npm version](https://img.shields.io/npm/v/bybit-api)][1]
[![npm size](https://img.shields.io/bundlephobia/min/bybit-api/latest)][1]
[![npm downloads](https://img.shields.io/npm/dt/bybit-api)][1]
[![last commit](https://img.shields.io/github/last-commit/tiagosiebler/bybit-api)][1]
[![CodeFactor](https://www.codefactor.io/repository/github/tiagosiebler/bybit-api/badge)](https://www.codefactor.io/repository/github/tiagosiebler/bybit-api)
[![Telegram](https://img.shields.io/badge/chat-on%20telegram-blue.svg)](https://t.me/nodetraders)

<p align="center">
  <a href="https://www.npmjs.com/package/bybit-api">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://github.com/tiagosiebler/bybit-api/blob/master/docs/images/logoDarkMode2.svg?raw=true#gh-dark-mode-only">
      <img alt="SDK Logo" src="https://github.com/tiagosiebler/bybit-api/blob/master/docs/images/logoBrightMode2.svg?raw=true#gh-light-mode-only">
    </picture>
  </a>
</p>

[1]: https://www.npmjs.com/package/bybit-api

Node.js, JavaScript & TypeScript SDK for the Bybit REST APIs and WebSockets:

- Complete integration with all Bybit REST APIs & WebSockets, including the WebSocket API.
- Actively maintained with a modern, promise-driven interface.
- TypeScript support (with type declarations for most API requests & responses).
- Thorough end-to-end tests making real API calls & WebSocket connections, validating any changes before they reach npm.
- Proxy support via axios integration.
- Robust WebSocket integration with configurable connection heartbeats & automatic reconnect then resubscribe workflows.
  - Event driven messaging.
  - Smart websocket persistence
    - Automatically handle silent websocket disconnections through timed heartbeats, including the scheduled 24hr disconnect.
    - Automatically handle listenKey persistence and expiration/refresh.
    - Emit `reconnected` event when dropped connection is restored.
- WebSocket API integration, with two design patterns to choose from:
  - Asynchronous promise-driven responses:
      - This behaves very much like a REST API. No need to subscribe to asynchronous events.
      - Send commands with the await sendWSAPIRequest(...) method.
      - Await responses to commands directly in the fully typed sendWSAPIRequest() call.
      - The method directly returns a promise. Use a try/catch block for convenient error handling without the complexity of asynchronous WebSockets.
      - See example for more details: [examples/ws-api-promises.ts](./examples/ws-api-promises.ts)
  - Asynchronous event-driven responses:
      - Subscribe to `response` and `error` events from WebsocketClient's event emitter.
      - Send commands with the sendWSAPIRequest(...) method.
      - Responses to commands will arrive via the `response` and `error` events.
      - See example for more details: [examples/ws-api-events.ts](./examples/ws-api-events.ts)
- Active community support & collaboration in telegram: [Node.js Algo Traders](https://t.me/nodetraders).

## Installation

`npm install --save bybit-api`

## Issues & Discussion

- Issues? Check the [issues tab](https://github.com/tiagosiebler/bybit-api/issues).
- Discuss & collaborate with other node devs? Join our [Node.js Algo Traders](https://t.me/nodetraders) engineering community on telegram.
- Follow our announcement channel for real-time updates on [X/Twitter](https://x.com/QuantSDKs)

<!-- template_related_projects -->

## Related projects

Check out my related JavaScript/TypeScript/Node.js projects:

- Try my REST API & WebSocket SDKs:
  - [Bybit-api Node.js SDK](https://www.npmjs.com/package/bybit-api)
  - [Okx-api Node.js SDK](https://www.npmjs.com/package/okx-api)
  - [Binance Node.js SDK](https://www.npmjs.com/package/binance)
  - [Gateio-api Node.js SDK](https://www.npmjs.com/package/gateio-api)
  - [Bitget-api Node.js SDK](https://www.npmjs.com/package/bitget-api)
  - [Kucoin-api Node.js SDK](https://www.npmjs.com/package/kucoin-api)
  - [Coinbase-api Node.js SDK](https://www.npmjs.com/package/coinbase-api)
  - [Bitmart-api Node.js SDK](https://www.npmjs.com/package/bitmart-api)
- Try my misc utilities:
  - [OrderBooks Node.js](https://www.npmjs.com/package/orderbooks)
  - [Crypto Exchange Account State Cache](https://www.npmjs.com/package/accountstate)
- Check out my examples:
  - [awesome-crypto-examples Node.js](https://github.com/tiagosiebler/awesome-crypto-examples)
  <!-- template_related_projects_end -->

## Documentation

Most methods accept JS objects. These can be populated using parameters specified by Bybit's API documentation, or check the type definition in each class within the github repository (see table below for convenient links to each class). TypeScript is definitely recommended, but not required.

- [Bybit API Docs](https://bybit-exchange.github.io/docs/v5/intro)
- [REST Endpoint Function List](./docs/endpointFunctionList.md)
- [TSDoc Documentation (generated using typedoc via npm module)](https://tsdocs.dev/docs/bybit-api)

## Structure

The SDK is written in TypeScript, but fully compatible with both TypeScript and pure JavaScript projects. A pure JavaScript version can be built using `npm run build`. The output of the `build` command is the version published to npm, packaged as a JavaScript module (with types available for you TypeScript users).


- [src](./src) - the complete SDK written in TypeScript.
- [lib](./lib) - the JavaScript version of the project (built from TypeScript). This should not be edited directly, as it will be overwritten with each release.
- [examples](./examples) - examples & demonstrations. Contributions are welcome!
- [test](./test) - automated end-to-end tests that run before every release, making real API calls.

---

Examples for using each client can be found in:

- the [examples](./examples) folder.
- the [awesome-crypto-examples](https://github.com/tiagosiebler/awesome-crypto-examples) repository.

If you're missing an example, you're welcome to request one. Priority will be given to [github sponsors](https://github.com/sponsors/tiagosiebler).

## REST API Clients

You should be using the V5 APIs. If you aren't, you should upgrade your project to use the V5 APIs as soon as possible. Bybit used to have several API groups (originally one per product), but the V5 API is currently the latest standard.

Refer to the [V5 interface mapping page](https://bybit-exchange.github.io/docs/v5/intro#v5-and-v3-interface-mapping-list) for more information on which V5 endpoints can be used instead of previous V3 endpoints. To learn more about the V5 API, please read the [V5 upgrade guideline](https://bybit-exchange.github.io/docs/v5/upgrade-guide).

Here are the available REST clients and the corresponding API groups described in the documentation:

|                         Class                          |                                                                                                      Description                       |
| :----------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------: |
|                     [ **V5 API** ]                     | The new unified V5 APIs (successor to previously fragmented APIs for all API groups).                                                  |
|         [RestClientV5](src/rest-client-v5.ts)          |   Unified V5 all-in-one REST client for all [V5 REST APIs](https://bybit-exchange.github.io/docs/v5/intro)                             |
|       [WebsocketClient](src/websocket-client.ts)       |   All WebSocket Events (Public & Private for all API categories)                                                                       |

---

### Deprecated/Obsolete APIs

The following API clients are for previous generation REST APIs and will be removed in the next major release. Some have already stopped working (because bybit stopped supporting them). You should use the V5 APIs for all new development.

<details>
  <summary>Click me to read more</summary>

Each generation is labelled with the version number (e.g. v1/v2/v3/v5). New projects & developments should use the newest available API generation (e.g. use the V5 APIs instead of V3).


|                                                Class                                                 |                                                 Description                                                  |
| :--------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------: |
|                 [ **Derivatives v3** ]                                                               |                                The Derivatives v3 APIs (successor to the Futures V2 APIs)                    |
|                                  [UnifiedMarginClient](src/unified-margin-client.ts)                 |[Derivatives (v3) Unified Margin APIs](https://bybit-exchange.github.io/docs/derivatives/unified/place-order) |
|                            [ContractClient](src/contract-client.ts)                                  | [Derivatives (v3) Contract APIs](https://bybit-exchange.github.io/docs/derivatives/contract/place-order).    |
|                                          [ **Futures v2** ]                                          |                                             The Futures v2 APIs                                              |
|                              [~~InverseClient~~](src/inverse-client.ts)                              |       [Inverse Perpetual Futures (v2) APIs](https://bybit-exchange.github.io/docs/futuresV2/inverse/)        |
|                               [~~LinearClient~~](src/linear-client.ts)                               |  [USDT Perpetual Futures (v2) APIs](https://bybit-exchange.github.io/docs/futuresV2/linear/#t-introduction)  |
|                      [~~InverseFuturesClient~~](src/inverse-futures-client.ts)                       | [Inverse Futures (v2) APIs](https://bybit-exchange.github.io/docs/futuresV2/inverse_futures/#t-introduction) |
|                                             [ **Spot** ]                                             |                                                The spot APIs                                                 |
|                                [SpotClientV3](src/spot-client-v3.ts)                                 |            [Spot Market (v3) APIs](https://bybit-exchange.github.io/docs/spot/public/instrument)             |
|             [~~SpotClient~~](src/spot-client.ts) (deprecated, SpotClientV3 recommended)              |            [Spot Market (v1) APIs](https://bybit-exchange.github.io/docs/spot/v1/#t-introduction)            |
|                                        [ **USDC Contract** ]                                         |                                            The USDC Contract APIs                                            |
|                         [USDCPerpetualClient](src/usdc-perpetual-client.ts)                          |     [USDC Perpetual APIs](https://bybit-exchange.github.io/docs/usdc/option/?console#t-querydeliverylog)     |
|                            [USDCOptionClient](src/usdc-option-client.ts)                             |            [USDC Option APIs](https://bybit-exchange.github.io/docs/usdc/option/#t-introduction)             |
| [~~AccountAssetClient~~](src/account-asset-client.ts)                                                |       [Account Asset V1 APIs](https://bybit-exchange.github.io/docs/account_asset/v1/#t-introduction)        |
|                                         [ **Other** ]                                                |                                        Other standalone API groups                                           |
|                          [CopyTradingClient](src/copy-trading-client.ts)                             |              [Copy Trading APIs](https://bybit-exchange.github.io/docs/category/copy-trade)                  |
|                        [AccountAssetClientV3](src/account-asset-client-v3.ts)                        |      [Account Asset V3 APIs](https://bybit-exchange.github.io/docs/account-asset/internal-transfer)          |

</details>


### Usage

Create API credentials on Bybit's website:

- [Livenet](https://bybit.com/app/user/api-management?affiliate_id=9410&language=en-US&group_id=0&group_type=1)
- [Testnet](https://testnet.bybit.com/app/user/api-management)


The following is a minimal example for using the REST clients included with this SDK. For more detailed examples, refer to the [examples](./examples/) folder in the repository on GitHub:

```typescript
const { RestClientV5 } = require('bybit-api');
// or
// import { RestClientV5 } from 'bybit-api';

const restClientOptions = {
  /** Your API key */
  key: 'apiKeyHere',

  /** Your API secret */
  secret: 'apiSecretHere',

  /** Set to `true` to connect to testnet. Uses the live environment by default. */
  // testnet: true,

  /**
   * Set to `true` to use Bybit's V5 demo trading: https://bybit-exchange.github.io/docs/v5/demo
   *
   * Note: to use demo trading, you should have `testnet` disabled
   */
  // demoTrading: true,

  /** Override the max size of the request window (in ms) */
  // recv_window: 5000, // 5000 = 5 seconds

  /**
   * Enable keep alive for REST API requests (via axios).
   * See: https://github.com/tiagosiebler/bybit-api/issues/368
   */
  // keepAlive: true,

  /**
   * When using HTTP KeepAlive, how often to send TCP KeepAlive packets over sockets being kept alive. Default = 1000.
   * Only relevant if keepAlive is set to true.
   * Default: 1000 (defaults comes from https agent)
   */
  // keepAliveMsecs: 1000, // 1000 = 1 second

  /**
   * Optionally override API domain used:
   * apiRegion: 'default' | 'bytick' | 'NL' | 'HK' | 'TK',
   **/

  // apiRegion: 'bytick',

  /** Default: false. Enable to parse/include per-API/endpoint rate limits in responses. */
  // parseAPIRateLimits: true,

  /**
   * Allows you to provide a custom "signMessage" function, e.g. to use node's much faster createHmac method
   *
   * Look at examples/fasterHmacSign.ts for a demonstration:
   */
  // customSignMessageFn: (message: string, secret: string) => Promise<string>;
};

const API_KEY = 'xxx';
const API_SECRET = 'yyy';

const client = new RestClientV5({
  key: API_KEY,
  secret: API_SECRET,
  // demoTrading: true,
  // Optional: enable to try parsing rate limit values from responses
  // parseAPIRateLimits: true
},
  // requestLibraryOptions
);

// For public-only API calls, simply don't provide a key & secret or set them to undefined
// const client = new RestClientV5();

client.getAccountInfo()
  .then(result => {
    console.log("getAccountInfo result: ", result);
  })
  .catch(err => {
    console.error("getAccountInfo error: ", err);
  });

client.getOrderbook({ category: 'linear', symbol: 'BTCUSDT' })
  .then(result => {
    console.log("getOrderBook result: ", result);
  })
  .catch(err => {
    console.error("getOrderBook error: ", err);
  });
```

## WebSockets

The WebsocketClient will automatically use the latest V5 WebSocket endpoints by default. To use a different endpoint, use the `market` parameter. Except for the WebSocket API - this can be accessed without any special configuration.

### WebSocket Examples

#### Subscriptions - Consuming events

Here's a minimal example for using the websocket client. For more complete examples, look into the ws-\* examples in the [examples](./examples/) folder in the repo on GitHub.

```javascript
const { WebsocketClient } = require('bybit-api');
// or
// import { WebsocketClient } from 'bybit-api';

const API_KEY = 'xxx';
const PRIVATE_KEY = 'yyy';

const wsConfig = {
  /**
   * API credentials are optional. They are only required if you plan on using any account-specific topics or the WS API
   */
  key: 'yourAPIKeyHere',
  secret: 'yourAPISecretHere',

  /*
    The following parameters are optional:
  */

  /**
   * The API group this client should connect to. The V5 market is currently used by default.
   *
   * For the V3 APIs use `v3` as the market (spot/unified margin/usdc/account asset/copy trading). Note that older API groups are deprecated and may stop working soon.
   */
  // market: 'v5',

  /**
   * Set to `true` to connect to Bybit's testnet environment.
   * - If demo trading, `testnet` should be set to false!
   * - If testing a strategy, use demo trading instead. Testnet market data is very different from real market conditions.
   */
  // testnet: true

  /**
   * Set to `true` to connect to Bybit's V5 demo trading: https://bybit-exchange.github.io/docs/v5/demo
   *
   * Only the "V5" "market" is supported here.
   */
  // demoTrading; true;

  // recv window size for websocket authentication (higher latency connections (VPN) can cause authentication to fail if the recv window is too small)
  // recvWindow: 5000,

  /** How often to check if the connection is alive (in ms) */
  // pingInterval: 10000,

  /** How long to wait (in ms) for a pong (heartbeat reply) before assuming the connection is dead */
  // pongTimeout: 1000,

  /** Delay in milliseconds before respawning the connection */
  // reconnectTimeout: 500,

  // override which URL to use for websocket connections
  // wsUrl: 'wss://stream.bytick.com/realtime'

  /**
   * Allows you to provide a custom "signMessage" function, e.g. to use node's much faster createHmac method
   *
   * Look at examples/fasterHmacSign.ts for a demonstration:
   */
  // customSignMessageFn: (message: string, secret: string) => Promise<string>;
};

const ws = new WebsocketClient(wsConfig);

// (v5) subscribe to multiple topics at once
ws.subscribeV5(['orderbook.50.BTCUSDT', 'orderbook.50.ETHUSDT'], 'linear');

// Or one at a time
ws.subscribeV5('kline.5.BTCUSDT', 'linear');
ws.subscribeV5('kline.5.ETHUSDT', 'linear');

// Private/public topics can be used in the same WS client instance, even for different API groups (linear, options, spot, etc)
ws.subscribeV5('position', 'linear');
ws.subscribeV5('publicTrade.BTC', 'option');

/**
 * The Websocket Client will automatically manage all connectivity & authentication for you.
 *
 * If a network issue occurs, it will automatically:
 * - detect it,
 * - remove the dead connection,
 * - replace it with a new one,
 * - resubscribe to everything you were subscribed to.
 *
 * When this happens, you will see the "reconnected" event.
 */

// Listen to events coming from websockets. This is the primary data source
ws.on('update', (data) => {
  console.log('data received', JSON.stringify(data, null, 2));
});

// Optional: Listen to websocket connection open event (automatic after subscribing to one or more topics)
ws.on('open', ({ wsKey, event }) => {
  console.log('connection open for websocket with ID: ', wsKey);
});

// Optional: Listen to responses to websocket queries (e.g. the response after subscribing to a topic)
ws.on('response', (response) => {
  console.log('response', response);
});

// Optional: Listen to connection close event. Unexpected connection closes are automatically reconnected.
ws.on('close', () => {
  console.log('connection closed');
});

// Listen to raw error events. Recommended.
ws.on('error', (err) => {
  console.error('error', err);
});

ws.on('reconnect', ({ wsKey }) => {
  console.log('ws automatically reconnecting.... ', wsKey);
});

ws.on('reconnected', (data) => {
  console.log('ws has reconnected ', data?.wsKey);
});
```

#### Websocket API - Sending orders via WebSockets

Bybit supports sending, amending and cancelling orders over a WebSocket connection. The [WebsocketClient](./src/WebsocketClient.ts) fully supports Bybit's WebSocket API.

Links for reference:
- [Bybit WebSocket API Documentation](https://bybit-exchange.github.io/docs/v5/websocket/trade/guideline)
- [WebSocket API Example Node.js/TypeScript/JavaScript](./examples/ws-api-promises.ts).

Note: as of January 2024, the demo trading environment does not support the WebSocket API.

There are two ways to use the WS API, depending on individual preference:
- event-driven:
  - send requests via `client.sendWSAPIRequest(wsKey, operation, params)`, fire and forget, don't use await
  - handle async replies via event handlers on `client.on('exception', cb)` and `client.on('response', cb)`
  - See example for more details: [examples/ws-api-events.ts](./examples/ws-api-events.ts)
- promise-driven:
  - send requests via `const result = await client.sendWSAPIRequest(wsKey, operation, params)`, which returns a promise
  - await each call
  - use try/catch blocks to handle promise rejections
  - See example for more details: [examples/ws-api-promises.ts](./examples/ws-api-promises.ts)

The below example demonstrates the promise-driven approach, which behaves similar to a REST API. The WebSocket API even accepts the same parameters as the corresponding REST API endpoints, so this approach should be compatible with existing REST implementations. Connectivity, authentication, and processing requests wrapped in promises - these are all handled automatically by the WebsocketClient without additional configuration.

```javascript
const { WS_KEY_MAP, WebsocketClient } = require('bybit-api');

// or
// import { WS_KEY_MAP, WebsocketClient } from 'bybit-api';

// Create an instance of the WebsocketClient. This will automatically handle connectivity and authentication for you.
const wsClient = new WebsocketClient(
  {
    key: 'yourApiKeyHere',
    secret: 'yourApiSecretHere',
    // testnet: true, // Whether to use the testnet environment. Create API keys here: https://testnet.bybit.com/app/user/api-management
    // demoTrading: false, // note: As of Jan 2025, demo trading does NOT support the WS API
  }
);

// This example is wrapped in an async function, so "await" can be used
async function main() {
  // Optional. Can be used to prepare a connection before sending commands (e.g. as part of your startup process)
  // This is not necessary and will happen automatically when sending a command, if you aren't connected/authenticated yet
  // await wsClient.connectWSAPI();

  try {
    console.log('Step 1: Create an order');

    // The type for `wsAPISubmitOrderResult` is automatically resolved to `WSAPIResponse<OrderResultV5, "order.create">`
    const wsAPISubmitOrderResult = await wsClient.sendWSAPIRequest(
      WS_KEY_MAP.v5PrivateTrade,
      'order.create',
      {
        symbol: 'BTCUSDT',
        side: 'Buy',
        orderType: 'Limit',
        price: '50000',
        qty: '1',
        category: 'linear',
      },
    );

    console.log(
      `Step 1: Order result (order ID: "${wsAPISubmitOrderResult.data.orderId}"): `,
      wsAPISubmitOrderResult,
    );
  } catch (e) {
    console.error('Step 1: Order submit exception: ', e);
  }
}

// Start executing the example workflow
main();

```

See the [examples/ws-api-promises.ts](./examples/ws-api-promises.ts) example for a more detailed explanation.

---

### Specifying other markets

The WebsocketClient can be configured to a specific API group using the market parameter. These are the currently available API groups:
| API Category | Market | Description |
|:----------------------------: |:-------------------: |-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| V5 Subscriptions | `market: 'v5'` | The [v5](https://bybit-exchange.github.io/docs/v5/ws/connect) websocket topics for all categories under one market. Use the subscribeV5 method when subscribing to v5 topics. |


### Balancing load across multiple connections

The WebsocketClient will automatically prepare one connection per API group, for all topics in that API group. Any topics that you subscribe to on that WebSocket client will automatically be added to the same connection.

To spread your subscribed topics over multiple connections, e.g. to reduce the throughput of an individual connectionk, you can make one instance of the WebsocketClient per connection group.

```typescript
const wsClientGroup1 = new WebsocketClient();
const wsClientGroup2 = new WebsocketClient();

// Attach event listeners to each WS Client
// Divide your desired topics into separate groups
```

Important: do not subscribe to the same topics on both clients or you will receive duplicate messages (once per WS client).

---

### Older Websocket APIs

The following API groups are still available in the WebsocketClient but are deprecated and may no longer work. They will be removed in the next major release:

<details>
  <summary>Click me to see the table</summary>

|           API Category           |           Market            | Description                                                                                                                                                                                                                                             |
| :------------------------------: | :-------------------------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|   ~~Unified Margin - Options~~   |  `market: 'unifiedOption'`  | The [derivatives v3](https://bybit-exchange.github.io/docs/derivativesV3/unified_margin/#t-websocket) category for unified margin. Note: public topics only support options topics. If you need USDC/USDT perps, use `unifiedPerp` instead.             |
|    ~~Unified Margin - Perps~~    |   `market: 'unifiedPerp'`   | The [derivatives v3](https://bybit-exchange.github.io/docs/derivativesV3/unified_margin/#t-websocket) category for unified margin. Note: public topics only support USDT/USDC perpetual topics - use `unifiedOption` if you need public options topics. |
|  ~~Futures v2 - Inverse Perps~~  |     `market: 'inverse'`     | The [inverse v2 perps](https://bybit-exchange.github.io/docs/futuresV2/inverse/#t-websocket) category.                                                                                                                                                  |
|   ~~Futures v2 - USDT Perps~~    |     `market: 'linear'`      | The [USDT/linear v2 perps](https://bybit-exchange.github.io/docs/futuresV2/linear/#t-websocket) category.                                                                                                                                               |
| ~~Futures v2 - Inverse Futures~~ |     `market: 'inverse'`     | The [inverse futures v2](https://bybit-exchange.github.io/docs/futuresV2/inverse_futures/#t-websocket) category uses the same market as inverse perps.                                                                                                  |
|           ~~Spot v3~~            |     `market: 'spotv3'`      | The [spot v3](https://bybit-exchange.github.io/docs/spot/v3/#t-websocket) category.                                                                                                                                                                     |
|           ~~Spot v1~~            |      `market: 'spot'`       | The older [spot v1](https://bybit-exchange.github.io/docs/spot/v1/#t-websocket) category. Use the `spotv3` market if possible, as the v1 category does not have automatic re-subscribe if reconnected.                                                  |
|         ~~Copy Trading~~         |     `market: 'linear'`      | The [copy trading](https://bybit-exchange.github.io/docs/copy_trading/#t-websocket) category. Use the linear market to listen to all copy trading topics.                                                                                               |
|          ~~USDC Perps~~          |     `market: 'usdcPerp`     | The [USDC perps](https://bybit-exchange.github.io/docs/usdc/perpetual/#t-websocket) category.                                                                                                                                                           |
|         ~~USDC Options~~         |   `market: 'usdcOption'`    | The [USDC options](https://bybit-exchange.github.io/docs/usdc/option/#t-websocket) category.                                                                                                                                                            |
|       ~~Contract v3 USDT~~       |  `market: 'contractUSDT'`   | The [Contract V3](https://bybit-exchange.github.io/docs/derivativesV3/contract/#t-websocket) category (USDT perps)                                                                                                                                      |
|     ~~Contract v3 Inverse~~      | `market: 'contractInverse'` | The [Contract V3](https://bybit-exchange.github.io/docs/derivativesV3/contract/#t-websocket) category (inverse perps)                                                                                                                                   |

</details

---

## Logging

### Customise logging

Pass a custom logger (or mutate the imported DefaultLogger class) which supports the log methods `silly`, `debug`, `notice`, `info`, `warning` and `error`, or override methods from the default logger as desired, as in the example below:

```javascript
const { WebsocketClient, DefaultLogger } = require('bybit-api');

// Enable all logging on the trace level (disabled by default)
const customLogger = {
  ...DefaultLogger,
  trace: (...params) => console.log('trace', ...params),
};

const wsClient = new WebsocketClient({ key: 'xxx', secret: 'yyy' }, customLogger);
```

### Debug HTTP requests

In rare situations, you may want to see the raw HTTP requets being built as well as the API response. These can be enabled by setting the `BYBITTRACE` env var to `true`.

## Browser Usage

### Import

This is the "modern" way, allowing the package to be directly imported into frontend projects with full typescript support.

1. Install these dependencies
   ```sh
   npm install stream-browserify
   ```
2. Add this to your `tsconfig.json`
   ```json
   {
     "compilerOptions": {
       "paths": {
         "stream": [
           "./node_modules/stream-browserify"
         ]
   }
   ```
3. Declare this in the global context of your application (ex: in polyfills for angular)
   ```js
   (window as any).global = window;
   ```

### Webpack

This is the "old" way of using this package on webpages. This will build a minified js bundle that can be pulled in using a script tag on a website.

Build a bundle using webpack:

- `npm install`
- `npm build`
- `npm pack`

The bundle can be found in `dist/`. Altough usage should be largely consistent, smaller differences will exist. Documentation is still TODO - contributions welcome.

---

<!-- template_contributions -->

### Contributions & Thanks

Have my projects helped you? Share the love, there are many ways you can show your thanks:

- Star & share my projects.
- Are my projects useful? Sponsor me on Github and support my effort to maintain & improve them: https://github.com/sponsors/tiagosiebler
- Have an interesting project? Get in touch & invite me to it.
- Or buy me all the coffee:
  - ETH(ERC20): `0xA3Bda8BecaB4DCdA539Dc16F9C54a592553Be06C` <!-- metamask -->

<!-- template_contributions_end -->

### Contributions & Pull Requests

Contributions are encouraged, I will review any incoming pull requests. See the issues tab for todo items.

<!-- template_star_history -->

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=tiagosiebler/bybit-api,tiagosiebler/okx-api,tiagosiebler/binance,tiagosiebler/bitget-api,tiagosiebler/bitmart-api,tiagosiebler/gateio-api,tiagosiebler/kucoin-api,tiagosiebler/coinbase-api,tiagosiebler/orderbooks,tiagosiebler/accountstate,tiagosiebler/awesome-crypto-examples&type=Date)](https://star-history.com/#tiagosiebler/bybit-api&tiagosiebler/okx-api&tiagosiebler/binance&tiagosiebler/bitget-api&tiagosiebler/bitmart-api&tiagosiebler/gateio-api&tiagosiebler/kucoin-api&tiagosiebler/coinbase-api&tiagosiebler/orderbooks&tiagosiebler/accountstate&tiagosiebler/awesome-crypto-examples&Date)

<!-- template_star_history_end -->
