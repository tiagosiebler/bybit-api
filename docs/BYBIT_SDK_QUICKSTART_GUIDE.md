# Bybit API JavaScript Tutorial for Node.js and TypeScript

> [!TIP]
> This guide can be read in tutorial format on the Siebly Website: [Bybit JavaScript REST API & WebSocket Tutorial](https://siebly.io/sdk/bybit/javascript/tutorial)

This tutorial walks through a practical Bybit REST API, WebSocket stream, and WebSocket API integration using [`bybit-api`](https://www.npmjs.com/package/bybit-api), the Bybit JavaScript and TypeScript SDK by Siebly.io.

The SDK handles the repetitive parts: HMAC and RSA request signing, Bybit API endpoint routing, testnet and demo trading differences, WebSocket authentication, heartbeats, reconnects, resubscribe behavior, WebSocket API request/response matching, and TypeScript request and response definitions. The sections below move from installation and client choice to public calls, private auth, trading flows, WebSocket API commands, environments, and production checks.

**Key links**

- Bybit JavaScript SDK by Siebly: [`bybit-api`](https://www.npmjs.com/package/bybit-api)
- GitHub Repository: [`tiagosiebler/bybit-api`](https://github.com/tiagosiebler/bybit-api)
- SDK function-endpoint map: [Bybit JavaScript Endpoint Reference](./endpointFunctionList.md)
- REST API examples: [Bybit SDK REST API examples](../examples/Rest)
- WebSocket examples: [Bybit SDK WebSocket examples](../examples/Websocket)
- Bybit API docs: [Bybit API Documentation](https://bybit-exchange.github.io/docs/v5/intro)
- More SDKs: [Siebly.io](https://siebly.io)

---

## Why use the SDK

The Bybit API is unified, but a real integration still has several moving parts:

- The API spans Spot, Linear contracts, Inverse contracts, Options, account, asset, user, broker, Earn, P2P, RFQ, spread trading, spot margin, and loan workflows.
	- Within the Bybit JavaScript SDK by Siebly.io, all product groups are available in one unified REST API client.
- Many market and trade calls use a `category` parameter such as `spot`, `linear`, `inverse`, or `option`.
- Public WebSocket streams are split across category-specific endpoints.
- Private WebSocket streams use a separate private endpoint.
- WebSocket API commands use a separate endpoint represented by `v5PrivateTrade`.
- Private REST API and WebSocket API requests are timestamp-sensitive and must be signed.
- Bybit supports both HMAC keys and self-generated RSA keys. The SDK has automatic support for all key types.
- Live, testnet, demo trading, and regional Bybit domains are separate routing choices.

The SDK gives you the main surfaces needed for those workflows:

- `RestClientV5` for Bybit REST API calls.
- `WebsocketClient` for public and private streams.
- `WebsocketAPIClient` for promise-driven WebSocket API commands.
- `SpotClientV3` for the remaining legacy Spot V3 endpoint. New integrations should use the current Bybit API surface. The V3 client might be removed at any time.

The method names stay close to Bybit's endpoint names, while the SDK handles base URLs, request signatures, request routing, headers, WebSocket lifecycle, authentication, topic tracking, reconnects, and typed request shapes. It also lets you use the WebSocket API in a request/response style: send a command and await the matching response, similar to a REST API.

---

## Install and API keys

If you do not have Node.js installed yet, install it first. The SDK is published to both [GitHub](https://github.com/tiagosiebler/bybit-api) and [npm](https://www.npmjs.com/package/bybit-api).

Install the SDK with npm:

```bash
npm install bybit-api
```

Or use another npm-compatible package manager:

```bash
pnpm install bybit-api
yarn add bybit-api
```

Create API keys from the relevant Bybit page:

- Bybit live API keys: [Bybit API Management](https://bybit.com/app/user/api-management?affiliate_id=9410&language=en-US&group_id=0&group_type=1)
- Bybit testnet API keys: [Bybit Testnet API Management](https://testnet.bybit.com/app/user/api-management)
- Bybit demo trading notes: [Bybit Demo Trading Service](https://bybit-exchange.github.io/docs/v5/demo)

> Always use the minimum permissions needed for your scenario. Trading does not require withdrawal permissions. Analytics does not require trading permissions.
> Always use strict IP whitelisting for API keys whenever your deployment environment allows it.

The main auth and environment rules are:

- Public market data does not usually require API keys.
- Private REST API calls require `key` and `secret`.
- Private WebSocket streams require `key` and `secret`.
- WebSocket API commands require `key` and `secret`.
- Live, testnet, and demo trading credentials are separate.
- API permissions must match the product and action your code is using.
- HMAC keys use a normal API key and API secret.
- RSA keys use a Bybit API key plus your PEM private key as `secret`.
- The SDK automatically detects RSA private keys when the secret contains a private-key PEM header.

Typical environment variables:

```bash
export BYBIT_API_KEY='your-api-key'
export BYBIT_API_SECRET='your-api-secret-or-rsa-private-key'
```

Create a private REST API client:

```typescript
import { RestClientV5 } from 'bybit-api';

const client = new RestClientV5({
  key: process.env.BYBIT_API_KEY!,
  secret: process.env.BYBIT_API_SECRET!,
});
```

If you are only testing public endpoints, you do not need keys:

```typescript
import { RestClientV5 } from 'bybit-api';

const client = new RestClientV5();
```

For RSA setup details, see [examples/Auth/RSA-sign.md](../examples/Auth/RSA-sign.md).

---

## Products and clients

For new Bybit integrations, start with the current API. Older Bybit SDK surfaces were split into many product-specific clients; this SDK now centers the current API around one REST API client plus WebSocket clients.

| Use case                   | SDK surface                             | Common usage                                                                                                                                          |
| -------------------------- | --------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| REST API                   | `RestClientV5`                          | Public market data, account reads, order management, positions, wallet, asset transfers, user APIs, Earn, broker, P2P, RFQ, and other endpoint groups |
| Public and private streams | `WebsocketClient`                       | Live order books, trades, klines, tickers, liquidations, private orders, executions, positions, wallet, and greeks                                    |
| WebSocket API commands     | `WebsocketAPIClient`                    | Awaitable order create, amend, cancel, and batch order commands over Bybit's WebSocket API                                                            |
| Raw WebSocket API commands | `WebsocketClient.sendWSAPIRequest(...)` | Lower-level WebSocket API usage where you want to send an operation directly                                                                          |

The `category` parameter matters:

| Category  | Meaning                                         |
| --------- | ----------------------------------------------- |
| `spot`    | Spot market and Spot orders                     |
| `linear`  | USDT and USDC linear contracts                  |
| `inverse` | Inverse perpetual and inverse futures contracts |
| `option`  | Options                                         |

As a rule of thumb:

- Use `RestClientV5` for current Bybit REST API endpoints.
- Use `WebsocketClient.subscribeV5(...)` when you want streaming data.
- Use `WebsocketAPIClient` when you want to send commands over WebSocket and await the response.
- Use `docs/endpointFunctionList.md` when you already know the Bybit endpoint path and need the matching SDK method.

For a complete method map, see [docs/endpointFunctionList.md](./endpointFunctionList.md).

### REST API, streams, and WebSocket API

Bybit exposes several different integration flows. Keep them separate in your architecture:

| Flow                      | SDK surface                                     | Best for                                                                                                               | What the SDK handles                                                                                   |
| ------------------------- | ----------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| REST API                  | `RestClientV5`                                  | Request/response calls, broad endpoint coverage, public reads, private account reads, order submission, reconciliation | Base URLs, timestamps, HMAC/RSA signing, headers, response parsing, optional rate-limit parsing        |
| Public WebSocket streams  | `WebsocketClient.subscribeV5(...)`              | Real-time market data such as order books, trades, klines, tickers, and liquidations                                   | Endpoint routing by category, subscribe requests, heartbeats, reconnects, resubscribe                  |
| Private WebSocket streams | `WebsocketClient.subscribeV5(...)` with keys    | Account events such as orders, executions, wallet, positions, and greeks                                               | Authentication, private endpoint routing, reconnects, resubscribe                                      |
| WebSocket API commands    | `WebsocketAPIClient` or `sendWSAPIRequest(...)` | Order create, amend, cancel, and batch order operations over a persistent WebSocket connection                         | Connection setup, authentication, request IDs, signing, promise resolution, response/error correlation |

Use the REST API when you want maximum endpoint coverage or a simple one-off request. Use WebSocket streams when you need realtime lower-latency updates. Use the WebSocket API when you want a command path over an already-open WebSocket connection.

---

## Start building: first calls

If you only want the fastest path to a working integration, start here.

### 1. First public REST API request

```typescript
import { RestClientV5 } from 'bybit-api';

const client = new RestClientV5();

async function main() {
  const serverTime = await client.getServerTime();
  const instruments = await client.getInstrumentsInfo({
    category: 'linear',
    symbol: 'BTCUSDT',
  });
  const ticker = await client.getTickers({
    category: 'linear',
    symbol: 'BTCUSDT',
  });
  const orderBook = await client.getOrderbook({
    category: 'linear',
    symbol: 'BTCUSDT',
    limit: 50,
  });
  const candles = await client.getKline({
    category: 'linear',
    symbol: 'BTCUSDT',
    interval: '1',
    limit: 5,
  });

  console.log({
    serverTime,
    instrument: instruments.result.list[0]?.symbol,
    ticker: ticker.result.list[0],
    orderBook,
    candles,
  });
}

main().catch(console.error);
```

That confirms public REST API access is wired correctly.

See also: [public REST API example](../examples/Rest/rest-v5-public.ts)

### 2. First public WebSocket stream

```typescript
import { WebsocketClient, isWsOrderbookEventV5 } from 'bybit-api';

const ws = new WebsocketClient();

ws.on('open', (data) => console.log('connected', data.wsKey, data.wsUrl));
ws.on('response', (data) => console.log('response', JSON.stringify(data)));
ws.on('update', (data) => {
  if (isWsOrderbookEventV5(data)) {
    console.log('orderbook update', data.data.s, data.type);
    return;
  }

  console.log('stream update', JSON.stringify(data));
});
ws.on('reconnect', (data) => console.log('reconnecting', data.wsKey));
ws.on('reconnected', (data) => console.log('reconnected', data.wsKey));
ws.on('exception', console.error);

ws.subscribeV5(['orderbook.50.BTCUSDT', 'tickers.BTCUSDT', 'publicTrade.BTCUSDT'], 'linear');
```

For public streams, pass the category so the SDK can route the topic to the right public endpoint.

See also: [public WebSocket example](../examples/Websocket/Public/ws-public-v5.ts)

### 3. First private account WebSocket stream

```typescript
import { WebsocketClient } from 'bybit-api';

const ws = new WebsocketClient({
  key: process.env.BYBIT_API_KEY!,
  secret: process.env.BYBIT_API_SECRET!,
});

ws.on('authenticated', (data) => {
  console.log('authenticated', data.wsKey);
});

ws.on('update', (data) => {
  console.log('account event', JSON.stringify(data));
});

ws.on('reconnect', ({ wsKey }) => {
  console.log('reconnecting', wsKey);
});

ws.on('reconnected', ({ wsKey }) => {
  console.log('reconnected', wsKey);
  // Fetch wallet, positions, open orders, or recent executions here if needed.
});

ws.on('exception', console.error);

ws.subscribeV5(['order', 'execution', 'position', 'wallet'], 'linear');
```

Private topics are routed to the private endpoint. The category argument is still required by `subscribeV5(...)`, but it is only used for public-topic routing.

See also: [private WebSocket example](../examples/Websocket/Private/ws-private-v5.ts)

### 4. First REST API order in demo trading

Use demo trading before placing live orders. Demo trading uses a separate Bybit demo account and separate API keys.

```typescript
import { RestClientV5 } from 'bybit-api';

const client = new RestClientV5({
  key: process.env.BYBIT_API_KEY!,
  secret: process.env.BYBIT_API_SECRET!,
  demoTrading: true,
});

async function placeDemoOrder() {
  await client.requestDemoTradingFunds();

  const orderRequest = {
    category: 'linear',
    symbol: 'BTCUSDT',
    side: 'Buy',
    orderType: 'Limit',
    qty: '0.001',
    price: '10000',
    timeInForce: 'PostOnly',
    orderLinkId: `demo-${Date.now()}`,
  } as const;

  const result = await client.submitOrder(orderRequest);
  console.log(result);
}

placeDemoOrder().catch(console.error);
```

This submits to Bybit demo trading because `demoTrading: true` is set. Do not remove that option or switch to live keys until you are ready to place real orders.

See also: [Demo trading example](../examples/Rest/demo-trading.ts)

### 5. First WebSocket API order command

The WebSocket API lets you submit order commands over a persistent WebSocket connection and await responses. Bybit supports WebSocket API order commands in live and testnet environments, but not demo trading.

```typescript
import { WebsocketAPIClient } from 'bybit-api';

const wsApi = new WebsocketAPIClient({
  key: process.env.BYBIT_API_KEY!,
  secret: process.env.BYBIT_API_SECRET!,
  // Use testnet API keys with this option.
  testnet: true,
});

const wsClient = wsApi.getWSClient();

wsClient.on('open', (data) => console.log('ws api open', data.wsKey));
wsClient.on('authenticated', (data) => {
  console.log('ws api authenticated', data.wsKey);
});
wsClient.on('exception', console.error);

async function main() {
  await wsClient.connectWSAPI();

  if (process.env.BYBIT_PLACE_ORDER !== 'true') {
    console.log('Set BYBIT_PLACE_ORDER=true when you are ready to submit.');
    return;
  }

  const result = await wsApi.submitNewOrder({
    category: 'linear',
    symbol: 'BTCUSDT',
    side: 'Buy',
    orderType: 'Limit',
    qty: '0.001',
    price: '10000',
    timeInForce: 'PostOnly',
    orderLinkId: `wsapi-${Date.now()}`,
  });

  console.log(result);
}

main().catch(console.error);
```

The WebSocket API acknowledgement tells you the command was accepted. Track the final order state through the private `order` and `execution` streams, or reconcile with the REST API.

See also: [WebSocket API client example](../examples/Websocket/WS-API/ws-api-client.ts)

---

## REST API

Most Bybit integrations start with `RestClientV5`. It covers the current REST API surface and uses Bybit's `category` parameter to distinguish product groups where the endpoint requires it.

### Create a public `RestClientV5`

```typescript
import { RestClientV5 } from 'bybit-api';

const client = new RestClientV5();
```

Public market calls do not require keys.

### Create a private `RestClientV5`

```typescript
import { RestClientV5 } from 'bybit-api';

const client = new RestClientV5({
  key: process.env.BYBIT_API_KEY!,
  secret: process.env.BYBIT_API_SECRET!,
  recv_window: 5000,
  parseAPIRateLimits: true,
});
```

Private REST API methods are signed automatically. You do not need to add timestamps, signatures, `X-BAPI-API-KEY`, `X-BAPI-SIGN`, or SDK referer headers yourself.

### Common public market data calls

```typescript
const serverTime = await client.getServerTime();

const instruments = await client.getInstrumentsInfo({
  category: 'linear',
  symbol: 'BTCUSDT',
});

const orderBook = await client.getOrderbook({
  category: 'linear',
  symbol: 'BTCUSDT',
  limit: 50,
});

const ticker = await client.getTickers({
  category: 'linear',
  symbol: 'BTCUSDT',
});

const candles = await client.getKline({
  category: 'linear',
  symbol: 'BTCUSDT',
  interval: '5',
  limit: 10,
});

const recentTrades = await client.getPublicTradingHistory({
  category: 'linear',
  symbol: 'BTCUSDT',
  limit: 10,
});

const funding = await client.getFundingRateHistory({
  category: 'linear',
  symbol: 'BTCUSDT',
  limit: 10,
});

const openInterest = await client.getOpenInterest({
  category: 'linear',
  symbol: 'BTCUSDT',
  intervalTime: '15min',
});
```

For Spot market data, use `category: 'spot'`. For inverse contracts, use `category: 'inverse'`. For options, use `category: 'option'` where the endpoint supports it.

### Common private account and order calls

```typescript
const accountInfo = await client.getAccountInfo();
const systemStatus = await client.getSystemStatus();

const wallet = await client.getWalletBalance({
  accountType: 'UNIFIED',
});

const positions = await client.getPositionInfo({
  category: 'linear',
  symbol: 'BTCUSDT',
});

const openOrders = await client.getActiveOrders({
  category: 'linear',
  symbol: 'BTCUSDT',
});

const orderHistory = await client.getHistoricOrders({
  category: 'linear',
  symbol: 'BTCUSDT',
  limit: 20,
});

const executions = await client.getExecutionList({
  category: 'linear',
  symbol: 'BTCUSDT',
  limit: 20,
});

const feeRate = await client.getFeeRate({
  category: 'linear',
  symbol: 'BTCUSDT',
});

const transactions = await client.getTransactionLog({
  accountType: 'UNIFIED',
});
```

See also:

- [Private REST API example](../examples/Rest/rest-v5-private.ts)
- [Cursor pagination example](../examples/Rest/rest-v5-next-cursor.ts)
- [Endpoint function map](./endpointFunctionList.md)

### Order examples

Market order:

```typescript
await client.submitOrder({
  category: 'linear',
  symbol: 'BTCUSDT',
  side: 'Buy',
  orderType: 'Market',
  qty: '0.001',
  orderLinkId: `market-${Date.now()}`,
});
```

Limit order:

```typescript
await client.submitOrder({
  category: 'linear',
  symbol: 'BTCUSDT',
  side: 'Buy',
  orderType: 'Limit',
  qty: '0.001',
  price: '10000',
  timeInForce: 'GTC',
  orderLinkId: `limit-${Date.now()}`,
});
```

Post-only limit order:

```typescript
await client.submitOrder({
  category: 'linear',
  symbol: 'BTCUSDT',
  side: 'Buy',
  orderType: 'Limit',
  qty: '0.001',
  price: '10000',
  timeInForce: 'PostOnly',
  orderLinkId: `postonly-${Date.now()}`,
});
```

Amend an order:

```typescript
await client.amendOrder({
  category: 'linear',
  symbol: 'BTCUSDT',
  orderId: 'existing-order-id',
  price: '11000',
  qty: '0.002',
});
```

Cancel an order:

```typescript
await client.cancelOrder({
  category: 'linear',
  symbol: 'BTCUSDT',
  orderId: 'existing-order-id',
});
```

Cancel open orders for a category and symbol:

```typescript
await client.cancelAllOrders({
  category: 'linear',
  symbol: 'BTCUSDT',
});
```

Batch submit orders:

```typescript
await client.batchSubmitOrders('linear', [
  {
    symbol: 'BTCUSDT',
    side: 'Buy',
    orderType: 'Limit',
    qty: '0.001',
    price: '10000',
    timeInForce: 'PostOnly',
    orderLinkId: `batch-a-${Date.now()}`,
  },
  {
    symbol: 'ETHUSDT',
    side: 'Buy',
    orderType: 'Limit',
    qty: '0.01',
    price: '1000',
    timeInForce: 'PostOnly',
    orderLinkId: `batch-b-${Date.now()}`,
  },
]);
```

Pre-check an order where your account mode and product support it:

```typescript
await client.preCheckOrder({
  category: 'linear',
  symbol: 'BTCUSDT',
  side: 'Buy',
  orderType: 'Limit',
  qty: '0.001',
  price: '10000',
});
```

Bybit order acknowledgements are asynchronous. After submitting, use private WebSocket `order` and `execution` events, or REST API reads such as `getActiveOrders(...)`, `getHistoricOrders(...)`, and `getExecutionList(...)`, to track what actually happened.

### Positions and risk

```typescript
const positions = await client.getPositionInfo({
  category: 'linear',
  symbol: 'BTCUSDT',
});

await client.setLeverage({
  category: 'linear',
  symbol: 'BTCUSDT',
  buyLeverage: '3',
  sellLeverage: '3',
});

await client.switchPositionMode({
  category: 'linear',
  coin: 'USDT',
  mode: 3,
});

await client.setTradingStop({
  category: 'linear',
  symbol: 'BTCUSDT',
  positionIdx: 0,
  stopLoss: '25000',
  slTriggerBy: 'LastPrice',
});

const closedPnl = await client.getClosedPnL({
  category: 'linear',
  symbol: 'BTCUSDT',
});
```

Position mode, margin mode, leverage, risk limit, and TP/SL behavior are account-sensitive. Read your current state first, then apply changes intentionally.

### Wallet, assets, and transfers

```typescript
const wallet = await client.getWalletBalance({
  accountType: 'UNIFIED',
});

const allCoins = await client.getAllCoinsBalance({
  accountType: 'UNIFIED',
  coin: 'USDT,BTC',
});

const coinBalance = await client.getCoinBalance({
  accountType: 'UNIFIED',
  coin: 'USDT',
});

const transferableCoins = await client.getTransferableCoinList('UNIFIED', 'FUND');

const deposits = await client.getDepositRecords({
  coin: 'USDT',
});

const withdrawals = await client.getWithdrawalRecords({
  coin: 'USDT',
});
```

Withdrawal and transfer permissions are high risk. Keep those on separate keys where possible, and do not grant withdrawal permissions to trading services that do not need them.

### Other endpoint groups

`RestClientV5` also includes many specialized parts of the Bybit API. The most useful way to find the exact method is usually the [endpoint map](./endpointFunctionList.md), but the groups below show the shape of the surface:

| Group                | Example SDK methods                                                                               |
| -------------------- | ------------------------------------------------------------------------------------------------- |
| Spread trading       | `getSpreadInstrumentsInfo(...)`, `submitSpreadOrder(...)`, `cancelAllSpreadOrders(...)`           |
| Spot margin          | `toggleSpotMarginTrade(...)`, `setSpotMarginLeverageV2(...)`, `getSpotMarginLoanAccountInfo(...)` |
| Crypto loans         | `borrowCryptoLoan(...)`, `repayCryptoLoan(...)`, `getUnpaidLoanOrders(...)`                       |
| Earn                 | `getEarnProduct(...)`, `submitStakeRedeem(...)`, `getEarnPosition(...)`                           |
| Broker and affiliate | `getBrokerRateLimitCap(...)`, `setBrokerRateLimit(...)`, `getAffiliateUserList(...)`              |
| User and sub-account | `getSubUIDList(...)`, `createSubMember(...)`, `createSubUIDAPIKey(...)`                           |
| Convert              | `requestConvertQuote(...)`, `confirmConvertQuote(...)`, `getConvertHistory(...)`                  |
| P2P                  | `getP2POrders(...)`, `sendP2POrderMessage(...)`, `uploadP2PChatFile(...)`                         |
| RFQ                  | `createRFQ(...)`, `createRFQQuote(...)`, `executeRFQQuote(...)`                                   |

If an endpoint exists in Bybit's API docs, search for the endpoint path or method group in [docs/endpointFunctionList.md](./endpointFunctionList.md).

---

## WebSocket Streams

Use `WebsocketClient` when you want event-driven updates instead of REST API polling. The same client handles public streams, private account streams, and raw WebSocket API commands.

Typical setup is: create a client, attach event handlers, provide keys if private topics are needed, and subscribe to topics. The SDK opens the correct endpoint, authenticates when needed, sends subscribe requests, tracks topics, monitors heartbeats, reconnects dropped sockets, and resubscribes cached topics after reconnect.

### Common `WebsocketClient` events

| Event           | Meaning                                                           |
| --------------- | ----------------------------------------------------------------- |
| `open`          | Connection established                                            |
| `update`        | Streaming topic data received                                     |
| `response`      | Subscribe, unsubscribe, auth, or WebSocket API acknowledgement    |
| `reconnect`     | Connection dropped and the SDK is replacing it                    |
| `reconnected`   | Replacement connection opened and cached subscriptions can resume |
| `close`         | Socket closed                                                     |
| `authenticated` | Private authentication succeeded                                  |
| `exception`     | Errors and unexpected conditions                                  |

Use `exception`, not the deprecated `error` event.

### Understanding `WS_KEY_MAP`

`WS_KEY_MAP` tells the SDK which Bybit WebSocket endpoint family a connection belongs to:

| Key               | Use                        |
| ----------------- | -------------------------- |
| `v5SpotPublic`    | Spot public market data    |
| `v5LinearPublic`  | Linear public market data  |
| `v5InversePublic` | Inverse public market data |
| `v5OptionPublic`  | Options public market data |
| `v5Private`       | Private account streams    |
| `v5PrivateTrade`  | WebSocket API commands     |

You normally do not need to pass these keys when subscribing to ordinary topics. `subscribeV5(...)` derives the correct connection from the topic and category. They are still useful for diagnostics, explicit connection calls, inspecting the internal topic store, and lower-level WebSocket API usage.

### Public topics

```typescript
import { WebsocketClient } from 'bybit-api';

const ws = new WebsocketClient();

ws.on('update', (data) => console.log('public update', JSON.stringify(data)));
ws.on('exception', console.error);

ws.subscribeV5(
  ['orderbook.50.BTCUSDT', 'publicTrade.BTCUSDT', 'tickers.BTCUSDT', 'kline.5.BTCUSDT'],
  'linear',
);
```

For Spot:

```typescript
ws.subscribeV5(['orderbook.50.BTCUSDT', 'tickers.BTCUSDT'], 'spot');
```

For inverse:

```typescript
ws.subscribeV5(['orderbook.50.BTCUSD', 'tickers.BTCUSD'], 'inverse');
```

For options:

```typescript
ws.subscribeV5('publicTrade.BTC', 'option');
```

See also:

- [public WebSocket example](../examples/Websocket/Public/ws-public-v5.ts)
- [All liquidations WebSocket example](../examples/Websocket/Public/ws-public-allLiquidations.ts)

### Private topics

```typescript
import { WebsocketClient } from 'bybit-api';

const ws = new WebsocketClient({
  key: process.env.BYBIT_API_KEY!,
  secret: process.env.BYBIT_API_SECRET!,
});

ws.on('authenticated', (data) => console.log('authenticated', data.wsKey));
ws.on('update', (data) => console.log('private update', JSON.stringify(data)));
ws.on('exception', console.error);

ws.subscribeV5(['order', 'execution', 'position', 'wallet', 'greeks'], 'linear');
```

Private topics currently share the private endpoint. The category parameter is ignored for private routing, but passing the category keeps your code consistent with `subscribeV5(...)`.

### Unsubscribe and connection cleanup

```typescript
ws.unsubscribeV5('kline.5.BTCUSDT', 'linear');

// Close all active WebSocket connections when shutting down a process.
ws.closeAll();
```

`unsubscribeV5(...)` removes the topic from the SDK's subscription cache, so it will not be resubscribed after a reconnect.

### Multiple connections for load isolation

The SDK groups topics by Bybit endpoint. If you want to isolate heavy streams, create separate client instances and split topics yourself:

```typescript
const marketDataA = new WebsocketClient();
const marketDataB = new WebsocketClient();

marketDataA.subscribeV5(['orderbook.50.BTCUSDT'], 'linear');
marketDataB.subscribeV5(['kline.1.BTCUSDT', 'publicTrade.BTCUSDT'], 'linear');
```

Do not subscribe to the same topic in multiple clients unless you intentionally want duplicate events.

---

## WebSocket API

Bybit's WebSocket API is a request/response API over a persistent WebSocket connection. In this SDK, you can use it in two ways:

- `WebsocketAPIClient` for promise-driven methods such as `submitNewOrder(...)`, `amendOrder(...)`, and `cancelOrder(...)`.
- `WebsocketClient.sendWSAPIRequest(...)` for lower-level operation calls such as `order.create`.

The promise-driven client is the easiest place to start.

```typescript
import { WebsocketAPIClient } from 'bybit-api';

const wsApi = new WebsocketAPIClient({
  key: process.env.BYBIT_API_KEY!,
  secret: process.env.BYBIT_API_SECRET!,
  // Use testnet API keys with this option.
  testnet: true,
});

await wsApi.getWSClient().connectWSAPI();

const createResult = await wsApi.submitNewOrder({
  category: 'linear',
  symbol: 'BTCUSDT',
  side: 'Buy',
  orderType: 'Limit',
  qty: '0.001',
  price: '10000',
  timeInForce: 'PostOnly',
  orderLinkId: `wsapi-${Date.now()}`,
});

console.log(createResult);
```

Amend and cancel:

```typescript
await wsApi.amendOrder({
  category: 'linear',
  symbol: 'BTCUSDT',
  orderId: createResult.data.orderId,
  price: '11000',
});

await wsApi.cancelOrder({
  category: 'linear',
  symbol: 'BTCUSDT',
  orderId: createResult.data.orderId,
});
```

Batch commands:

```typescript
await wsApi.batchSubmitOrders('linear', [
  {
    symbol: 'BTCUSDT',
    side: 'Buy',
    orderType: 'Limit',
    qty: '0.001',
    price: '10000',
    timeInForce: 'PostOnly',
    orderLinkId: `wsapi-batch-a-${Date.now()}`,
  },
]);
```

Raw command style:

```typescript
import { WS_KEY_MAP, WebsocketClient } from 'bybit-api';

const ws = new WebsocketClient({
  key: process.env.BYBIT_API_KEY!,
  secret: process.env.BYBIT_API_SECRET!,
  testnet: true,
});

const result = await ws.sendWSAPIRequest(WS_KEY_MAP.v5PrivateTrade, 'order.create', {
  category: 'linear',
  symbol: 'BTCUSDT',
  side: 'Buy',
  orderType: 'Limit',
  qty: '0.001',
  price: '10000',
  timeInForce: 'PostOnly',
});

console.log(result);
```

Bybit's WebSocket API response means the request was accepted for processing. Use private streams to confirm order status and executions.

See also:

- [WebSocket API client example](../examples/Websocket/WS-API/ws-api-client.ts)
- [Raw WebSocket API promises example](../examples/Websocket/WS-API/ws-api-raw-promises.ts)
- [Raw WebSocket API events example](../examples/Websocket/WS-API/ws-api-raw-events.ts)
- [Bybit WebSocket API guideline](https://bybit-exchange.github.io/docs/v5/websocket/trade/guideline)

---

## Environments and regions

### Live

Live is the default environment:

```typescript
const client = new RestClientV5({
  key: process.env.BYBIT_API_KEY!,
  secret: process.env.BYBIT_API_SECRET!,
});
```

### Testnet

Testnet uses separate credentials and separate API domains:

```typescript
const client = new RestClientV5({
  key: process.env.BYBIT_API_KEY!,
  secret: process.env.BYBIT_API_SECRET!,
  testnet: true,
});

const ws = new WebsocketClient({
  key: process.env.BYBIT_API_KEY!,
  secret: process.env.BYBIT_API_SECRET!,
  testnet: true,
});
```

Use testnet for endpoint wiring, permissions, and safe integration checks. Do not treat testnet market behavior as representative of live market behavior.

### Demo trading

Demo trading uses a mainnet demo account with simulated trading and separate demo keys.

```typescript
const client = new RestClientV5({
  key: process.env.BYBIT_API_KEY!,
  secret: process.env.BYBIT_API_SECRET!,
  demoTrading: true,
});
```

Private demo WebSocket streams are also supported:

```typescript
const ws = new WebsocketClient({
  key: process.env.BYBIT_API_KEY!,
  secret: process.env.BYBIT_API_SECRET!,
  demoTrading: true,
});

ws.subscribeV5(['order', 'execution', 'position', 'wallet'], 'linear');
```

Do not combine `testnet: true` with `demoTrading: true`. Bybit's demo trading docs also note that WebSocket API commands are not supported in demo trading, so use REST API demo trading or private demo streams for demo workflows, and use testnet for WebSocket API command testing.

### Regional REST API domains

By default, REST API calls use the global Bybit domain. If your account belongs to a regional Bybit domain, set `apiRegion`:

```typescript
const client = new RestClientV5({
  key: process.env.BYBIT_API_KEY!,
  secret: process.env.BYBIT_API_SECRET!,
  apiRegion: 'EU',
});
```

Supported API region values in this SDK:

- `default`
- `bytick`
- `NL`
- `TK`
- `KZ`
- `HK`
- `GE`
- `UAE`
- `EU`

New API regions will be supported as they become available. If you're looking for a region not yet supported, please get in touch.

You can also pass `baseUrl` for a custom REST API domain, or `wsUrl` for a custom WebSocket URL when needed.

See also: [custom REST API URL example](../examples/Rest/rest-v5-custom-url.ts)

---

## Production notes

Before a Bybit integration trades unattended, make these decisions explicit.

### 1. Roll out in layers

Move from read-only behavior to order placement one layer at a time:

1. Public REST API calls
2. Public WebSocket streams
3. Private REST API account reads
4. Private WebSocket account streams
5. Demo or testnet order placement
6. Tiny live trading tests

Keep each layer observable before adding the next one.

### 2. Reconnect, then backfill

Listen for `reconnect` and `reconnected`. A dropped WebSocket connection is a normal production condition, especially during volatility or scheduled exchange-side disconnects.

When the SDK emits `reconnect`, pause risky actions if your strategy depends on stream state. When it emits `reconnected`, query the REST API for the account state you may have missed:

```typescript
ws.on('reconnected', async ({ wsKey }) => {
  console.log('reconnected', wsKey);

  const [wallet, positions, openOrders] = await Promise.all([
    client.getWalletBalance({ accountType: 'UNIFIED' }),
    client.getPositionInfo({ category: 'linear', settleCoin: 'USDT' }),
    client.getActiveOrders({ category: 'linear', settleCoin: 'USDT' }),
  ]);

  // Reconcile these with your local state before resuming risky actions.
  console.log({ wallet, positions, openOrders });
});
```

### 3. Use `orderLinkId` deliberately

For order workflows, generate and store your own `orderLinkId` when you need idempotency, retries, or reconciliation.

```typescript
const orderLinkId = `entry-btc-${Date.now()}`;

await client.submitOrder({
  category: 'linear',
  symbol: 'BTCUSDT',
  side: 'Buy',
  orderType: 'Limit',
  qty: '0.001',
  price: '10000',
  timeInForce: 'PostOnly',
  orderLinkId,
});
```

Persist the ID before sending the request. Then match it against REST API order history and private WebSocket order/execution events. That gives your system a stable way to connect local intent with exchange-side order state.

### 4. Watch clocks and receive windows

Private requests are timestamp-sensitive. Keep your system clock synced first. If you still see receive-window errors, set the receive window intentionally.

REST API calls use `recv_window`:

```typescript
const client = new RestClientV5({
  key: process.env.BYBIT_API_KEY!,
  secret: process.env.BYBIT_API_SECRET!,
  recv_window: 5000,
});

await client.fetchLatencySummary();
```

WebSockets use `recvWindow`:

```typescript
const ws = new WebsocketClient({
  key: process.env.BYBIT_API_KEY!,
  secret: process.env.BYBIT_API_SECRET!,
  recvWindow: 5000,
});

ws.setTimeOffsetMs(-500);
```

Use time offsets as a last resort. Fix host clock sync first. Refer to the timestamp guidance if you're having persistent issues with it: https://github.com/sieblyio/awesome-crypto-examples/wiki/Timestamp-for-this-request-is-outside-of-the-recvWindow

### 5. Keep credentials scoped

Live, testnet, and demo credentials are different. Keep them separate in your secrets manager and deployment configuration.

Use separate keys for separate risk levels:

- Read-only market and account monitoring.
- Trading without withdrawals.
- Transfers or withdrawals, only where absolutely required.

Do not put private keys in frontend code. Use IP whitelisting.

### 6. Monitor rate limits

The SDK can parse Bybit REST API rate-limit headers into responses when `parseAPIRateLimits: true` is enabled:

```typescript
const client = new RestClientV5({
  key: process.env.BYBIT_API_KEY!,
  secret: process.env.BYBIT_API_SECRET!,
  parseAPIRateLimits: true,
});

const response = await client.getPositionInfo({
  category: 'linear',
  symbol: 'BTCUSDT',
});

console.log(response.rateLimitApi);
```

Bybit also returns rate-limit information in WebSocket API response headers. Use that data to reduce polling, back off safely, and prefer streaming updates where possible.

### 7. Inject your own logger if needed

If you want SDK logs in your own monitoring stack, pass a logger:

```typescript
import { DefaultLogger, WebsocketClient } from 'bybit-api';

const customLogger: typeof DefaultLogger = {
  ...DefaultLogger,
  trace: () => {},
  info: (...params) => console.info(new Date(), ...params),
  error: (...params) => console.error(new Date(), ...params),
};

const ws = new WebsocketClient(
  {
    key: process.env.BYBIT_API_KEY!,
    secret: process.env.BYBIT_API_SECRET!,
  },
  customLogger,
);
```

For raw HTTP request/response tracing during local debugging, the repo also supports the `BYBITTRACE` environment variable. Do not enable verbose tracing in production logs if it could expose sensitive request data.

---

## FAQ

**Do I need API keys for public market data?**

No. Public REST API market data and public WebSocket market data do not usually require API keys.

**Which REST API client should I use?**

Use `RestClientV5` for new Bybit API work. `SpotClientV3` remains in the package for legacy compatibility, but new integrations should use the current API surface.

**Why does every example use `category`?**

The Bybit API uses `category` to distinguish Spot, Linear, Inverse, and Options behavior. The same SDK method can often cover several product groups, so the category tells Bybit which product family the request belongs to. Refer to Bybit's API documentation for exact guidance on expected request parameters.

**Why both `WebsocketClient` and `WebsocketAPIClient`?**

- `WebsocketClient` is for subscriptions and streaming topics.
- `WebsocketAPIClient` is for commands over Bybit's WebSocket API. Think request/response methods over a persistent WebSocket connection.

**Can I use one key for everything?**

Only if the key belongs to the correct environment and has the required permissions. For production systems, keep keys scoped by environment and permission level. Avoid withdrawal permissions unless your service truly needs them.

**Does the SDK support RSA authentication?**

Yes. Pass your Bybit API key as `key` and your PEM private key as `secret`. The SDK detects RSA private keys automatically.

**Should I use demo trading or testnet?**

Use demo trading for simulated trading with live-like market context where Bybit supports the endpoint. Use testnet for API wiring and WebSocket API command testing. Do not use testnet market behavior as evidence that a strategy will behave well live. Read more about CEX testnets here: https://github.com/sieblyio/awesome-crypto-examples/wiki/CEX-Testnets

**What happens if a WebSocket connection drops?**

The SDK detects dead connections, opens a replacement connection, authenticates where needed, and resubscribes cached topics. Listen for `reconnect` and `reconnected`, then reconcile state with the REST API before resuming risky trading actions.

**Does this guide cover every SDK method?**

No. This guide covers the common first steps and production concerns. For full method coverage, see:

- [Bybit JavaScript endpoint reference](./endpointFunctionList.md)
- [Bybit SDK examples](../examples)
- [TSDoc documentation](https://tsdocs.dev/docs/bybit-api)

---

## Next steps

If you want to learn more about integrating with the Bybit API and WebSockets:

- Explore the [Bybit JavaScript examples on GitHub](../examples)
- Review the full endpoint list: [Bybit JavaScript endpoint reference](./endpointFunctionList.md)
- Check the Bybit JavaScript SDK on npm: [`bybit-api`](https://www.npmjs.com/package/bybit-api)
- Browse the source code of the Bybit JavaScript SDK on GitHub: [`tiagosiebler/bybit-api`](https://github.com/tiagosiebler/bybit-api)
- Review RSA auth: [Bybit RSA authentication example](../examples/Auth/RSA-sign.md)
- Explore the wider SDK ecosystem: [Siebly.io](https://siebly.io)
