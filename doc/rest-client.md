# Rest API


## Class: RestClient


### new RestClient([key][, secret])
- `key` {String} Bybit API Key
- `secret` {String} Bybit private key

If you only use the [public endpoints](#public-endpoints) you can ommit key and secret.


### Private enpoints

#### async placeActiveOrder(params)
[See bybit documentation](https://github.com/bybit-exchange/bybit-official-api-docs/blob/master/en/rest_api.md#place-active-order-v2)

#### async getActiveOrder(params)
[See bybit documentation](https://github.com/bybit-exchange/bybit-official-api-docs/blob/master/en/rest_api.md#get-active-order)

#### async cancelActiveOrder(params)
[See bybit documentation](https://github.com/bybit-exchange/bybit-official-api-docs/blob/master/en/rest_api.md#open-apiordercancelv2post)

#### async cancelAllActiveOrders(params)
[See bybit documentation](https://github.com/bybit-exchange/bybit-official-api-docs/blob/master/en/rest_api.md#open-apiordercancelallpost)

#### async replaceActiveOrder(params)
[See bybit documentation](https://github.com/bybit-exchange/bybit-official-api-docs/blob/master/en/rest_api.md#open-apiorderreplacepost)

#### async queryActiveOrder(params)
[See bybit documentation](https://github.com/bybit-exchange/bybit-official-api-docs/blob/master/en/rest_api.md#query-active-order-real-time)

#### async placeConditionalOrder(params)
[See bybit documentation](https://github.com/bybit-exchange/bybit-official-api-docs/blob/master/en/rest_api.md#place-conditional-order)

#### async getConditioanlOrder(params)
[See bybit documentation](https://github.com/bybit-exchange/bybit-official-api-docs/blob/master/en/rest_api.md#get-conditional-order)

#### async cancelConditionalOrder(params)
[See bybit documentation](https://github.com/bybit-exchange/bybit-official-api-docs/blob/master/en/rest_api.md#cancel-conditional-order-)

#### async cancelAllConditionalOrders(params)
[See bybit documentation](https://github.com/bybit-exchange/bybit-official-api-docs/blob/master/en/rest_api.md#cancel-all-conditional-orders)

#### async queryConditionalOrder(params)
[See bybit documentation](https://github.com/bybit-exchange/bybit-official-api-docs/blob/master/en/rest_api.md#query-stop-order-real-time)

#### async getUserLeverage()
[See bybit documentation](https://github.com/bybit-exchange/bybit-official-api-docs/blob/master/en/rest_api.md#user-leverage)

#### async changeUserLeverage(params)
[See bybit documentation](https://github.com/bybit-exchange/bybit-official-api-docs/blob/master/en/rest_api.md#-change-user-leverage)

#### async getPosition(params)
[See bybit documentation](https://github.com/bybit-exchange/bybit-official-api-docs/blob/master/en/rest_api.md#-my-position-v2)

#### async getPositions()
*Deprecated v1 method*
[See bybit documentation](https://github.com/bybit-exchange/bybit-official-api-docs/blob/master/en/rest_api.md#positionlistget)

#### async changePositionMargin(params)
[See bybit documentation](https://github.com/bybit-exchange/bybit-official-api-docs/blob/master/en/rest_api.md#-change-position-margin)

#### async setTradingStop(params)
[See bybit documentation](https://github.com/bybit-exchange/bybit-official-api-docs/blob/master/en/rest_api.md#-set-trading-stop)

#### async getWalletFundRecords(params)
[See bybit documentation](https://github.com/bybit-exchange/bybit-official-api-docs/blob/master/en/rest_api.md#-get-wallet-fund-records)

#### async getWithdrawRecords(params)
[See bybit documentation](https://github.com/bybit-exchange/bybit-official-api-docs/blob/master/en/rest_api.md#-get-withdraw-records)

#### async getWalletBalance(params)
[See bybit documentation](https://github.com/bybit-exchange/bybit-official-api-docs/blob/master/en/rest_api.md#open-apiwalletbalanceget)

#### async setRiskLimit(params)
[See bybit documentation](https://github.com/bybit-exchange/bybit-official-api-docs/blob/master/en/rest_api.md#set-risk-limit-)

#### async getRiskLimitList()
[See bybit documentation](https://github.com/bybit-exchange/bybit-official-api-docs/blob/master/en/rest_api.md#get-risk-limit-list-)

#### async getLastFundingRate(params)
[See bybit documentation](https://github.com/bybit-exchange/bybit-official-api-docs/blob/master/en/rest_api.md#-get-the-last-funding-rate)

#### async getMyLastFundingFee(params)
[See bybit documentation](https://github.com/bybit-exchange/bybit-official-api-docs/blob/master/en/rest_api.md#-get-my-last-funding-fee)

#### async getPredictedFunding(params)
[See bybit documentation](https://github.com/bybit-exchange/bybit-official-api-docs/blob/master/en/rest_api.md#get-predicted-funding-rate-and-funding-fee)

#### async getTradeRecords(params)
[See bybit documentation](https://github.com/bybit-exchange/bybit-official-api-docs/blob/master/en/rest_api.md#get-users-trade-records)

### Public enpoints

#### async getOrderBook(params)
[See bybit documentation](https://github.com/bybit-exchange/bybit-official-api-docs/blob/master/en/rest_api.md#get-orderbook)

#### async getLatestInformation()
[See bybit documentation](https://github.com/bybit-exchange/bybit-official-api-docs/blob/master/en/rest_api.md#latest-information-for-symbol)

#### async getPublicTradingRecords(params)
[See bybit documentation](https://github.com/bybit-exchange/bybit-official-api-docs/blob/master/en/rest_api.md#get-public-trading-records)

#### async getServerTime()
[See bybit documentation](https://github.com/bybit-exchange/bybit-official-api-docs/blob/master/en/rest_api.md#server-time)

#### async getApiAnnouncements()
[See bybit documentation](https://github.com/bybit-exchange/bybit-official-api-docs/blob/master/en/rest_api.md#open-apiannouncement)

#### async getSymbols()
Returns symbol information (such as tick size & min notional):
[Meeting price restrictions](https://github.com/bybit-exchange/bybit-official-api-docs/blob/master/en/rest_api.md#price-price)

[See bybit documentation](https://bybit-exchange.github.io/bybit-official-api-docs/en/index.html#operation/query_symbol)

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
