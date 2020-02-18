# Websocket API


## Class: WebsocketClient

The `WebsocketClient` inherits from `EventEmitter`. After establishing a
connection, the client sends heartbeats in regular intervalls, and reconnects
to the server once connection has been lost.


### new WebsocketClient([options][, logger])
- `options` {Object} Configuration options
  - `key` {String} Bybit API Key. Only needed if private topics are subscribed
  - `secret` {String} Bybit private Key. Only needed if private topics are
     subscribed
  - `livenet` {Bool} Weather to connect to livenet (`true`). Default `false`.   
  - `pingInterval` {Integer} Interval in ms for heartbeat ping. Default: `10000`,
  - `pongTimeout` {Integer} Timeout in ms waiting for heartbeat pong response
     from server. Default: `1000`,
  - `reconnectTimeout` {Integer} Timeout in ms the client waits before trying
     to reconnect after a lost connection. Default: 500
- `logger` {Object} Optional custom logger

  Custom logger must contain the following methods:
  ```js
  const logger = {
    silly: function(message, data) {},
    debug: function(message, data) {},
    notice: function(message, data) {},
    info: function(message, data) {},
    warning: function(message, data) {},
    error: function(message, data) {},
  }
  ```

### ws.subscribe(topics)

- `topics` {String|Array} Single topic as string or multiple topics as array of strings.
Subscribe to one or multiple topics. See [available topics](#available-topics)

### ws.unsubscribe(topics)

- `topics` {String|Array} Single topic as string or multiple topics as array of strings.
Unsubscribe from one or multiple topics.

### ws.close()

Close the connection to the server.


### Event: 'open'

Emmited when the connection has been opened for the first time.


### Event: 'reconnected'

Emmited when the client has been opened after a reconnect.


### Event: 'update'

- `message` {Object}
  - `topic` {String} the topic for which the update occured
  - `data` {Array|Object} updated data (see docs for each [topic](#available-topics)).
  - `type` {String} Some topics might have different update types (see docs for each [topic](#available-topics)).

Emmited whenever an update to a subscribed topic occurs.


### Event: 'response'

- `response` {Object}
  - `success` {Bool}
  - `ret_msg` {String} empty if operation was successfull, otherwise error message.
  - `conn_id` {String} connection id
  - `request` {Object} Original request, to which the response belongs
    - `op` {String} operation
    - `args` {Array} Request Arguments

Emited when the server responds to an operation sent by the client (usually after subscribing to a topic).


### Event: 'close'

Emitted when the connection has been finally closed, after a call to `ws.close()`


### Event: 'reconnect'

Emitted when the connection has been closed, but the client will try to reconnect.


### Event: 'error'

- `error` {Error}

Emitted when an error occurs.


## Available Topics

Generaly all [public](https://bybit-exchange.github.io/docs/inverse/#t-publictopics) and [private](https://bybit-exchange.github.io/docs/inverse/#t-privatetopics)
 topics are available.

### Private topics

#### Positions of your account

All positions of your account.
Topic: `position`

[See bybit documentation](https://bybit-exchange.github.io/docs/inverse/#t-websocketposition)

#### Execution message

Execution message, whenever an order has been (partially) filled.
Topic: `execution`

[See bybit documentation](https://bybit-exchange.github.io/docs/inverse/#t-websocketexecution)

#### Update for your orders

Updates for your active orders
Topic: `order`

[See bybit documentation](https://bybit-exchange.github.io/docs/inverse/#t-websocketorder)

#### Update for your conditional orders

Updates for your active conditional orders
Topic: `stop_order`

[See bybit documentation](https://bybit-exchange.github.io/docs/inverse/#t-websocketstoporder)


### Public topics

#### Candlestick chart

Candlestick OHLC "candles" for selected symbol and interval.
Example topic: `klineV2.BTCUSD.1m`

[See bybit documentation](https://bybit-exchange.github.io/docs/inverse/#t-websocketklinev2)

#### Real-time trading information

All trades as they occur.
Topic: `trade`

[See bybit documentation](https://bybit-exchange.github.io/docs/inverse/#t-websockettrade)

#### Daily insurance fund update

Topic: `insurance`

[See bybit documentation](https://bybit-exchange.github.io/docs/inverse/#t-websocketinsurance)

#### OrderBook of 25 depth per side

OrderBook for selected symbol
Example topic: `orderBookL2_25.BTCUSD`

[See bybit documentation](https://bybit-exchange.github.io/docs/inverse/#t-websocketorderbook25)

#### OrderBook of 200 depth per side

OrderBook for selected symbol
Example topic: `orderBook_200.100ms.BTCUS`

[See bybit documentation](https://bybit-exchange.github.io/docs/inverse/#t-websocketorderbook200)

#### Latest information for symbol

Latest information for selected symbol
Example topic: `instrument_info.100ms.BTCUSD`

[See bybit documentation](https://bybit-exchange.github.io/docs/inverse/#t-websocketinstrumentinfo)


## Example

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
