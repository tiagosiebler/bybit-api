# Linear API

## Class: LinearClient
### new LinearClient([key][, secret][, livenet][, options])
- `key` {String} Bybit API Key
- `secret` {String} Bybit private key
- `livenet` {Boolean} If false (default), use testnet.
- `options` {Object} Optional settings for custom behaviour.
  - `recv_window` {Number} Optional, default 5000. Increase if recv errors are seen.
  - `sync_interval_ms` {Number} Optional, default 3600000. Interval at which syncTime is performed.

If you only use the [public endpoints](#public-endpoints) you can omit key and secret.

### Private endpoints

#### async placeActiveOrder(params)
[See bybit documentation](https://bybit-exchange.github.io/docs/linear/#t-placeactive)

#### async getActiveOrder(params)
[See bybit documentation](https://bybit-exchange.github.io/docs/linear/#t-getactive)

#### async cancelActiveOrder(params)
[See bybit documentation](https://bybit-exchange.github.io/docs/linear/#t-cancelactive)

#### async cancelAllActiveOrders(params)
[See bybit documentation](https://bybit-exchange.github.io/docs/linear/#t-cancelallactive)

#### async replaceActiveOrder(params)
[See bybit documentation](https://bybit-exchange.github.io/docs/linear/#t-replaceactive)

#### async queryActiveOrder(params)
[See bybit documentation](https://bybit-exchange.github.io/docs/linear/#t-queryactive)

#### async placeConditionalOrder(params)
[See bybit documentation](https://bybit-exchange.github.io/docs/linear/#t-placecond)

#### async getConditionalOrder(params)
[See bybit documentation](https://bybit-exchange.github.io/docs/linear/#t-getcond)

#### async cancelConditionalOrder(params)
[See bybit documentation](https://bybit-exchange.github.io/docs/linear/#t-cancelcond)

#### async cancelAllConditionalOrders(params)
[See bybit documentation](https://bybit-exchange.github.io/docs/linear/#t-cancelallcond)

#### async replaceConditionalOrder(params)
[See bybit documentation](https://bybit-exchange.github.io/docs/linear/#t-replacecond)

#### async queryConditionalOrder(params)
[See bybit documentation](https://bybit-exchange.github.io/docs/linear/#t-querycond)

#### async getPosition(params)
[See bybit documentation](https://bybit-exchange.github.io/docs/linear/#t-myposition)

#### async setAutoAddMargin(params)
[See bybit documentation](https://bybit-exchange.github.io/docs/linear/#t-setautoaddmargin)

#### async switchIsolated(params)
[See bybit documentation](https://bybit-exchange.github.io/docs/linear/#t-marginswitch)

#### async switchMode(params)
[See bybit documentation](https://bybit-exchange.github.io/docs/linear/#t-switchmode)

#### async addMargin(params)
[See bybit documentation](https://bybit-exchange.github.io/docs/linear/#t-addmargin)

#### async setLeverage(params)
[See bybit documentation](https://bybit-exchange.github.io/docs/linear/#t-setleverage)

#### async setTradingStop(params)
[See bybit documentation](https://bybit-exchange.github.io/docs/linear/#t-tradingstop)

#### async getTradeRecords(params)
[See bybit documentation](https://bybit-exchange.github.io/docs/linear/#t-usertraderecords)

#### async getClosedPNL(params)
[See bybit documentation](https://bybit-exchange.github.io/docs/linear/#t-closedprofitandloss)

#### async getRiskLimitList(params)
[See bybit documentation](https://bybit-exchange.github.io/docs/linear/#t-getrisklimit)

#### async getPredictedFunding(params)
[See bybit documentation](https://bybit-exchange.github.io/docs/linear/#t-predictedfunding)

#### async getMyLastFundingFee(params)
[See bybit documentation](https://bybit-exchange.github.io/docs/linear/#t-mylastfundingfee)

#### async getApiKeyInfo(params)
[See bybit documentation](https://bybit-exchange.github.io/docs/linear/#t-key)

#### async getWalletBalance(params)
[See bybit documentation](https://bybit-exchange.github.io/docs/linear/#t-balance)

#### async getWalletFundRecords(params)
[See bybit documentation](https://bybit-exchange.github.io/docs/linear/#t-walletrecords)

#### async getWithdrawRecords(params)
[See bybit documentation](https://bybit-exchange.github.io/docs/linear/#t-withdrawrecords)

#### async getAssetExchangeRecords(params)
[See bybit documentation](https://bybit-exchange.github.io/docs/linear/#t-assetexchangerecords)


### Public endpoints

#### async getOrderBook(params)
[See bybit documentation](https://bybit-exchange.github.io/docs/linear/#t-orderbook)

#### async getKline(params)
[See bybit documentation](https://bybit-exchange.github.io/docs/linear/#t-querykline)

#### async getLatestInformation(params)
[See bybit documentation](https://bybit-exchange.github.io/docs/linear/#t-latestsymbolinfo)

#### async getPublicTradingRecords(params)
[See bybit documentation](https://bybit-exchange.github.io/docs/linear/#t-publictradingrecords)

#### async getSymbols()
Returns symbol information (such as tick size & min notional):
[Meeting price restrictions](https://bybit-exchange.github.io/docs/inverse/#price-price)

[See bybit documentation](https://bybit-exchange.github.io/docs/linear/#t-querysymbol)

#### async getPublicLiquidations(params)
[See bybit documentation](https://bybit-exchange.github.io/docs/linear/#t-query_liqrecords)

#### async getMarkPriceKline(params)
[See bybit documentation](https://bybit-exchange.github.io/docs/linear/#t-markpricekline)

#### async getOpenInterest(params)
[See bybit documentation](https://bybit-exchange.github.io/docs/linear/#t-marketopeninterest)

#### async getLatestBigDeal(params)
[See bybit documentation](https://bybit-exchange.github.io/docs/linear/#t-marketbigdeal)

#### async getLongShortRatio(params)
[See bybit documentation](https://bybit-exchange.github.io/docs/linear/#t-marketaccountratio)

#### async getServerTime(params)
[See bybit documentation](https://bybit-exchange.github.io/docs/linear/#t-servertime)

#### async getAnnouncements(params)
[See bybit documentation](https://bybit-exchange.github.io/docs/linear/#t-announcement)

#### async getTimeOffset()

Returns the time offset in ms to the server time retrieved by [`async getServerTime`](#async-getservertime).
If positive the time on the server is ahead of the clients time, if negative the time on the server is behind the clients time.

