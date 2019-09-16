# Rest API


## Class: RestClient


### new RestClient([key][, secret])
- `key` {String} Bybit API Key
- `secret` {String} Bybit private key

If you only use the [public endpoints](#public-endpoints) you can ommit key and secret.


### Private enpoints

#### async placeActiveOrder(params)
[See bybit documentation](https://github.com/bybit-exchange/bybit-official-api-docs/blob/master/en/rest_api.md#place-active-order)

#### async getActiveOrder(params)
[See bybit documentation](https://github.com/bybit-exchange/bybit-official-api-docs/blob/master/en/rest_api.md#get-active-order)

#### async cancelActiveOrder(params)
[See bybit documentation](https://github.com/bybit-exchange/bybit-official-api-docs/blob/master/en/rest_api.md#cancel-active-order)

#### async placeConditionalOrder(params)
[See bybit documentation](https://github.com/bybit-exchange/bybit-official-api-docs/blob/master/en/rest_api.md#place-conditional-order)

#### async getConditioanlOrder(params)
[See bybit documentation](https://github.com/bybit-exchange/bybit-official-api-docs/blob/master/en/rest_api.md#get-conditional-order)

#### async cancelConditionalOrder(params)
[See bybit documentation](https://github.com/bybit-exchange/bybit-official-api-docs/blob/master/en/rest_api.md#cancel-conditional-order-)

#### async getUserLeverage()
[See bybit documentation](https://github.com/bybit-exchange/bybit-official-api-docs/blob/master/en/rest_api.md#user-leverage)

#### async changeUserLeverage(params)
[See bybit documentation](https://github.com/bybit-exchange/bybit-official-api-docs/blob/master/en/rest_api.md#-change-user-leverage)

#### async getPosition()
[See bybit documentation](https://github.com/bybit-exchange/bybit-official-api-docs/blob/master/en/rest_api.md#-my-position)

#### async changePositionMargin(params)
[See bybit documentation](https://github.com/bybit-exchange/bybit-official-api-docs/blob/master/en/rest_api.md#-change-position-margin)

#### async getLastFundingRate(params)
[See bybit documentation](https://github.com/bybit-exchange/bybit-official-api-docs/blob/master/en/rest_api.md#-get-the-last-funding-rate)

#### async getMyLastFundingFee(params)
[See bybit documentation](https://github.com/bybit-exchange/bybit-official-api-docs/blob/master/en/rest_api.md#-get-my-last-funding-fee)

#### async getPredictedFunding(params)
[See bybit documentation](https://github.com/bybit-exchange/bybit-official-api-docs/blob/master/en/rest_api.md#get-predicted-funding-rate-and-funding-fee)

#### async getOrderTradeRecords(params)
[See bybit documentation](https://github.com/bybit-exchange/bybit-official-api-docs/blob/master/en/rest_api.md#get-the-trade-records-of-a-order)


### Public enpoints

#### async getOrderBook(params)
[See bybit documentation](https://github.com/bybit-exchange/bybit-official-api-docs/blob/master/en/rest_api.md#get-orderbook)

#### async getLatestInformation()
[See bybit documentation](https://github.com/bybit-exchange/bybit-official-api-docs/blob/master/en/rest_api.md#latest-information-for-symbol)

#### async getServerTime()
[See bybit documentation](https://github.com/bybit-exchange/bybit-official-api-docs/blob/master/en/rest_api.md#server-time)

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
    console.error(error);
  });
```
