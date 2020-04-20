# Rest API


## Class: RestClient


### new RestClient([key][, secret][, livenet][, options])
- `key` {String} Bybit API Key
- `secret` {String} Bybit private key
- `livenet` {Boolean} If false (default), use testnet.
- `options` {Object} Optional settings for custom behaviour.
  - `recv_window` {Number} Optional, default 5000. Increase if recv errors are seen.
  - `sync_interval_ms` {Number} Optional, default 3600000. Interval at which syncTime is performed.

If you only use the [public endpoints](#public-endpoints) you can ommit key and secret.


### Private enpoints

#### async placeActiveOrder(params)
[See bybit documentation](https://bybit-exchange.github.io/docs/inverse/#t-placev2active)

#### async getActiveOrder(params)
[See bybit documentation](https://bybit-exchange.github.io/docs/inverse/#t-getactive)

#### async cancelActiveOrder(params)
[See bybit documentation](https://bybit-exchange.github.io/docs/inverse/#t-cancelv2active)

#### async cancelAllActiveOrders(params)
[See bybit documentation](https://bybit-exchange.github.io/docs/inverse/#t-cancelallactive)

#### async replaceActiveOrder(params)
[See bybit documentation](https://bybit-exchange.github.io/docs/inverse/#t-replaceactive)

#### async queryActiveOrder(params)
[See bybit documentation](https://bybit-exchange.github.io/docs/inverse/#t-queryactive)

#### async placeConditionalOrder(params)
[See bybit documentation](https://bybit-exchange.github.io/docs/inverse/#t-placecond)

#### async getConditioanlOrder(params)
[See bybit documentation](https://bybit-exchange.github.io/docs/inverse/#t-getcond)

#### async cancelConditionalOrder(params)
[See bybit documentation](https://bybit-exchange.github.io/docs/inverse/#t-cancelcond)

#### async cancelAllConditionalOrders(params)
[See bybit documentation](https://bybit-exchange.github.io/docs/inverse/#t-cancelallcond)

#### async queryConditionalOrder(params)
[See bybit documentation](https://bybit-exchange.github.io/docs/inverse/#t-querycond)

#### async getUserLeverage()
[See bybit documentation](https://bybit-exchange.github.io/docs/inverse/#t-getleverage)

#### async changeUserLeverage(params)
[See bybit documentation](https://bybit-exchange.github.io/docs/inverse/#t-changeleverage)

#### async getPosition(params)
[See bybit documentation](https://bybit-exchange.github.io/docs/inverse/#t-mypositionv2)

#### async getPositions()
*Deprecated v1 method*
[See bybit documentation](https://github.com/bybit-exchange/bybit-official-api-docs/blob/master/en/rest_api.md#positionlistget)

#### async changePositionMargin(params)
[See bybit documentation](https://bybit-exchange.github.io/docs/inverse/#t-changemargin)

#### async setTradingStop(params)
[See bybit documentation](https://bybit-exchange.github.io/docs/inverse/#t-tradingstop)

#### async getWalletFundRecords(params)
[See bybit documentation](https://bybit-exchange.github.io/docs/inverse/#t-walletrecords)

#### async getWithdrawRecords(params)
[See bybit documentation](https://bybit-exchange.github.io/docs/inverse/#t-withdrawrecords)

#### async getWalletBalance(params)
[See bybit documentation](https://bybit-exchange.github.io/docs/inverse/#t-balance)

#### async setRiskLimit(params)
[See bybit documentation](https://bybit-exchange.github.io/docs/inverse/#t-setrisklimit)

#### async getRiskLimitList()
[See bybit documentation](https://bybit-exchange.github.io/docs/inverse/#t-getrisklimit)

#### async getLastFundingRate(params)
[See bybit documentation](https://bybit-exchange.github.io/docs/inverse/#t-fundingrate)

#### async getMyLastFundingFee(params)
[See bybit documentation](https://bybit-exchange.github.io/docs/inverse/#t-mylastfundingfee)

#### async getPredictedFunding(params)
[See bybit documentation](https://bybit-exchange.github.io/docs/inverse/#t-predictedfunding)

#### async getTradeRecords(params)
[See bybit documentation](https://bybit-exchange.github.io/docs/inverse/#t-usertraderecords)

### Public enpoints

#### async getOrderBook(params)
[See bybit documentation](https://bybit-exchange.github.io/docs/inverse/#t-orderbook)

#### async getKline(params)
[See bybit documentation](https://bybit-exchange.github.io/docs/inverse/#t-querykline)

#### async getLatestInformation()
[See bybit documentation](https://bybit-exchange.github.io/docs/inverse/#t-latestsymbolinfo)

#### async getPublicTradingRecords(params)
[See bybit documentation](https://bybit-exchange.github.io/docs/inverse/#t-publictradingrecords)

#### async getServerTime()
[See bybit documentation](https://bybit-exchange.github.io/docs/inverse/#t-servertime)

#### async getApiAnnouncements()
[See bybit documentation](https://bybit-exchange.github.io/docs/inverse/#t-announcement)

#### async getSymbols()
Returns symbol information (such as tick size & min notional):
[Meeting price restrictions](https://bybit-exchange.github.io/docs/inverse/#price-price)

[See bybit documentation](https://bybit-exchange.github.io/docs/inverse/#t-querysymbol)

#### async getTimeOffset()

Returns the time offset in ms to the server time retrieved by [`async getServerTime`](#async-getservertime).
If positive the time on the server is ahead of the clients time, if negative the time on the server is behind the clients time.


## Example

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
    console.error(err);
  });
```
