
# Endpoint maps

<p align="center">
  <a href="https://www.npmjs.com/package/bybit-api">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://github.com/tiagosiebler/bybit-api/blob/master/docs/images/logoDarkMode2.svg?raw=true#gh-dark-mode-only">
      <img alt="SDK Logo" src="https://github.com/tiagosiebler/bybit-api/blob/master/docs/images/logoBrightMode2.svg?raw=true#gh-light-mode-only">
    </picture>
  </a>
</p>

Each REST client is a JavaScript class, which provides functions individually mapped to each endpoint available in the exchange's API offering. 

The following table shows all methods available in each REST client, whether the method requires authentication (automatically handled if API keys are provided), as well as the exact endpoint each method is connected to.

This can be used to easily find which method to call, once you have [found which endpoint you're looking to use](https://github.com/tiagosiebler/awesome-crypto-examples/wiki/How-to-find-SDK-functions-that-match-API-docs-endpoint).

All REST clients are in the [src](/src) folder. For usage examples, make sure to check the [examples](/examples) folder.

List of clients:
- [rest-client-v5](#rest-client-v5ts)
- [websocket-api-client](#websocket-api-clientts)


If anything is missing or wrong, please open an issue or let us know in our [Node.js Traders](https://t.me/nodetraders) telegram group!

## How to use table

Table consists of 4 parts:

- Function name
- AUTH
- HTTP Method
- Endpoint

**Function name** is the name of the function that can be called through the SDK. Check examples folder in the repo for more help on how to use them!

**AUTH** is a boolean value that indicates if the function requires authentication - which means you need to pass your API key and secret to the SDK.

**HTTP Method** shows HTTP method that the function uses to call the endpoint. Sometimes endpoints can have same URL, but different HTTP method so you can use this column to differentiate between them.

**Endpoint** is the URL that the function uses to call the endpoint. Best way to find exact function you need for the endpoint is to search for URL in this table and find corresponding function name.


# rest-client-v5.ts

This table includes all endpoints from the official Exchange API docs and corresponding SDK functions for each endpoint that are found in [rest-client-v5.ts](/src/rest-client-v5.ts). 

| Function | AUTH | HTTP Method | Endpoint |
| -------- | :------: | :------: | -------- |
| [getSystemStatus()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L381) | :closed_lock_with_key:  | GET | `/v5/system/status` |
| [fetchServerTime()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L393) |  | GET | `/v5/market/time` |
| [requestDemoTradingFunds()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L410) | :closed_lock_with_key:  | POST | `/v5/account/demo-apply-money` |
| [createDemoAccount()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L423) | :closed_lock_with_key:  | POST | `/v5/user/create-demo-member` |
| [getSpreadInstrumentsInfo()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L436) |  | GET | `/v5/spread/instrument` |
| [getSpreadOrderbook()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L448) |  | GET | `/v5/spread/orderbook` |
| [getSpreadTickers()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L458) |  | GET | `/v5/spread/tickers` |
| [getSpreadRecentTrades()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L469) |  | GET | `/v5/spread/recent-trade` |
| [submitSpreadOrder()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L480) | :closed_lock_with_key:  | POST | `/v5/spread/order/create` |
| [amendSpreadOrder()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L493) | :closed_lock_with_key:  | POST | `/v5/spread/order/amend` |
| [cancelSpreadOrder()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L505) | :closed_lock_with_key:  | POST | `/v5/spread/order/cancel` |
| [cancelAllSpreadOrders()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L523) | :closed_lock_with_key:  | POST | `/v5/spread/order/cancel-all` |
| [getSpreadOpenOrders()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L542) | :closed_lock_with_key:  | GET | `/v5/spread/order/realtime` |
| [getSpreadOrderHistory()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L559) | :closed_lock_with_key:  | GET | `/v5/spread/order/history` |
| [getSpreadTradeHistory()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L575) | :closed_lock_with_key:  | GET | `/v5/spread/execution/list` |
| [getKline()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L595) |  | GET | `/v5/market/kline` |
| [getMarkPriceKline()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L610) |  | GET | `/v5/market/mark-price-kline` |
| [getIndexPriceKline()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L625) |  | GET | `/v5/market/index-price-kline` |
| [getPremiumIndexPriceKline()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L640) |  | GET | `/v5/market/premium-index-price-kline` |
| [getOrderbook()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L666) |  | GET | `/v5/market/orderbook` |
| [getTickers()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L672) |  | GET | `/v5/market/tickers` |
| [getFundingRateHistory()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L710) |  | GET | `/v5/market/funding/history` |
| [getPublicTradingHistory()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L725) |  | GET | `/v5/market/recent-trade` |
| [getOpenInterest()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L738) |  | GET | `/v5/market/open-interest` |
| [getHistoricalVolatility()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L748) |  | GET | `/v5/market/historical-volatility` |
| [getInsurance()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L759) |  | GET | `/v5/market/insurance` |
| [getRiskLimit()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L770) |  | GET | `/v5/market/risk-limit` |
| [getOptionDeliveryPrice()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L785) |  | GET | `/v5/market/delivery-price` |
| [getDeliveryPrice()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L798) |  | GET | `/v5/market/delivery-price` |
| [getNewDeliveryPrice()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L814) |  | GET | `/v5/market/new-delivery-price` |
| [getLongShortRatio()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L830) |  | GET | `/v5/market/account-ratio` |
| [getOrderPriceLimit()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L836) |  | GET | `/v5/market/price-limit` |
| [submitOrder()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L849) | :closed_lock_with_key:  | POST | `/v5/order/create` |
| [amendOrder()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L855) | :closed_lock_with_key:  | POST | `/v5/order/amend` |
| [cancelOrder()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L861) | :closed_lock_with_key:  | POST | `/v5/order/cancel` |
| [getActiveOrders()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L870) | :closed_lock_with_key:  | GET | `/v5/order/realtime` |
| [cancelAllOrders()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L876) | :closed_lock_with_key:  | POST | `/v5/order/cancel-all` |
| [getHistoricOrders()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L889) | :closed_lock_with_key:  | GET | `/v5/order/history` |
| [getExecutionList()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L901) | :closed_lock_with_key:  | GET | `/v5/execution/list` |
| [batchSubmitOrders()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L919) | :closed_lock_with_key:  | POST | `/v5/order/create-batch` |
| [batchAmendOrders()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L944) | :closed_lock_with_key:  | POST | `/v5/order/amend-batch` |
| [batchCancelOrders()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L969) | :closed_lock_with_key:  | POST | `/v5/order/cancel-batch` |
| [getSpotBorrowCheck()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L991) | :closed_lock_with_key:  | GET | `/v5/order/spot-borrow-check` |
| [setDisconnectCancelAllWindow()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1012) | :closed_lock_with_key:  | POST | `/v5/order/disconnected-cancel-all` |
| [setDisconnectCancelAllWindowV2()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1030) | :closed_lock_with_key:  | POST | `/v5/order/disconnected-cancel-all` |
| [preCheckOrder()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1045) | :closed_lock_with_key:  | POST | `/v5/order/pre-check` |
| [getPositionInfo()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1068) | :closed_lock_with_key:  | GET | `/v5/position/list` |
| [setLeverage()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1083) | :closed_lock_with_key:  | POST | `/v5/position/set-leverage` |
| [switchIsolatedMargin()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1096) | :closed_lock_with_key:  | POST | `/v5/position/switch-isolated` |
| [setTPSLMode()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1110) | :closed_lock_with_key:  | POST | `/v5/position/set-tpsl-mode` |
| [switchPositionMode()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1125) | :closed_lock_with_key:  | POST | `/v5/position/switch-mode` |
| [setRiskLimit()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1139) | :closed_lock_with_key:  | POST | `/v5/position/set-risk-limit` |
| [setTradingStop()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1154) | :closed_lock_with_key:  | POST | `/v5/position/trading-stop` |
| [setAutoAddMargin()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1165) | :closed_lock_with_key:  | POST | `/v5/position/set-auto-add-margin` |
| [addOrReduceMargin()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1177) | :closed_lock_with_key:  | POST | `/v5/position/add-margin` |
| [getClosedPnL()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1189) | :closed_lock_with_key:  | GET | `/v5/position/closed-pnl` |
| [getClosedOptionsPositions()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1203) | :closed_lock_with_key:  | GET | `/v5/position/get-closed-positions` |
| [movePosition()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1228) | :closed_lock_with_key:  | POST | `/v5/position/move-positions` |
| [getMovePositionHistory()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1239) | :closed_lock_with_key:  | GET | `/v5/position/move-history` |
| [confirmNewRiskLimit()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1258) | :closed_lock_with_key:  | POST | `/v5/position/confirm-pending-mmr` |
| [getPreUpgradeOrderHistory()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1278) | :closed_lock_with_key:  | GET | `/v5/pre-upgrade/order/history` |
| [getPreUpgradeTradeHistory()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1293) | :closed_lock_with_key:  | GET | `/v5/pre-upgrade/execution/list` |
| [getPreUpgradeClosedPnl()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1304) | :closed_lock_with_key:  | GET | `/v5/pre-upgrade/position/closed-pnl` |
| [getPreUpgradeTransactions()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1318) | :closed_lock_with_key:  | GET | `/v5/pre-upgrade/account/transaction-log` |
| [getPreUpgradeOptionDeliveryRecord()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1335) | :closed_lock_with_key:  | GET | `/v5/pre-upgrade/asset/delivery-record` |
| [getPreUpgradeUSDCSessionSettlements()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1349) | :closed_lock_with_key:  | GET | `/v5/pre-upgrade/asset/settlement-record` |
| [getWalletBalance()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1370) | :closed_lock_with_key:  | GET | `/v5/account/wallet-balance` |
| [getTransferableAmount()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1381) | :closed_lock_with_key:  | GET | `/v5/account/withdrawal` |
| [upgradeToUnifiedAccount()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1394) | :closed_lock_with_key:  | POST | `/v5/account/upgrade-to-uta` |
| [getBorrowHistory()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1405) | :closed_lock_with_key:  | GET | `/v5/account/borrow-history` |
| [repayLiability()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1419) | :closed_lock_with_key:  | POST | `/v5/account/quick-repayment` |
| [setCollateralCoin()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1428) | :closed_lock_with_key:  | POST | `/v5/account/set-collateral-switch` |
| [batchSetCollateralCoin()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1434) | :closed_lock_with_key:  | POST | `/v5/account/set-collateral-switch-batch` |
| [getCollateralInfo()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1444) | :closed_lock_with_key:  | GET | `/v5/account/collateral-info` |
| [getCoinGreeks()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1453) | :closed_lock_with_key:  | GET | `/v5/asset/coin-greeks` |
| [getFeeRate()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1466) | :closed_lock_with_key:  | GET | `/v5/account/fee-rate` |
| [getAccountInfo()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1475) | :closed_lock_with_key:  | GET | `/v5/account/info` |
| [getDCPInfo()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1488) | :closed_lock_with_key:  | GET | `/v5/account/query-dcp-info` |
| [getTransactionLog()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1495) | :closed_lock_with_key:  | GET | `/v5/account/transaction-log` |
| [getClassicTransactionLogs()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1506) | :closed_lock_with_key:  | GET | `/v5/account/contract-transaction-log` |
| [getSMPGroup()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1517) | :closed_lock_with_key:  | GET | `/v5/account/smp-group` |
| [setMarginMode()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1530) | :closed_lock_with_key:  | POST | `/v5/account/set-margin-mode` |
| [setSpotHedging()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1547) | :closed_lock_with_key:  | POST | `/v5/account/set-hedging-mode` |
| [setLimitPriceAction()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1560) | :closed_lock_with_key:  | POST | `/v5/account/set-limit-px-action` |
| [getLimitPriceAction()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1570) | :closed_lock_with_key:  | GET | `/v5/account/user-setting-config` |
| [setMMP()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1582) | :closed_lock_with_key:  | POST | `/v5/account/mmp-modify` |
| [resetMMP()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1589) | :closed_lock_with_key:  | POST | `/v5/account/mmp-reset` |
| [getMMPState()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1596) | :closed_lock_with_key:  | GET | `/v5/account/mmp-state` |
| [getDeliveryRecord()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1613) | :closed_lock_with_key:  | GET | `/v5/asset/delivery-record` |
| [getSettlementRecords()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1624) | :closed_lock_with_key:  | GET | `/v5/asset/settlement-record` |
| [getCoinExchangeRecords()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1637) | :closed_lock_with_key:  | GET | `/v5/asset/exchange/order-record` |
| [getCoinInfo()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1649) | :closed_lock_with_key:  | GET | `/v5/asset/coin/query-info` |
| [getSubUID()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1663) | :closed_lock_with_key:  | GET | `/v5/asset/transfer/query-sub-member-list` |
| [getAssetInfo()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1678) | :closed_lock_with_key:  | GET | `/v5/asset/transfer/query-asset-info` |
| [getAllCoinsBalance()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1689) | :closed_lock_with_key:  | GET | `/v5/asset/transfer/query-account-coins-balance` |
| [getCoinBalance()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1703) | :closed_lock_with_key:  | GET | `/v5/asset/transfer/query-account-coin-balance` |
| [getWithdrawableAmount()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1715) | :closed_lock_with_key:  | GET | `/v5/asset/withdraw/withdrawable-amount` |
| [getTransferableCoinList()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1724) | :closed_lock_with_key:  | GET | `/v5/asset/transfer/query-transfer-coin-list` |
| [createInternalTransfer()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1740) | :closed_lock_with_key:  | POST | `/v5/asset/transfer/inter-transfer` |
| [getInternalTransferRecords()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1759) | :closed_lock_with_key:  | GET | `/v5/asset/transfer/query-inter-transfer-list` |
| [enableUniversalTransferForSubUIDs()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1779) | :closed_lock_with_key:  | POST | `/v5/asset/transfer/save-transfer-sub-member` |
| [createUniversalTransfer()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1790) | :closed_lock_with_key:  | POST | `/v5/asset/transfer/universal-transfer` |
| [getUniversalTransferRecords()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1802) | :closed_lock_with_key:  | GET | `/v5/asset/transfer/query-universal-transfer-list` |
| [getAllowedDepositCoinInfo()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1815) | :closed_lock_with_key:  | GET | `/v5/asset/deposit/query-allowed-list` |
| [setDepositAccount()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1829) | :closed_lock_with_key:  | POST | `/v5/asset/deposit/deposit-to-account` |
| [getDepositRecords()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1845) | :closed_lock_with_key:  | GET | `/v5/asset/deposit/query-record` |
| [getSubAccountDepositRecords()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1860) | :closed_lock_with_key:  | GET | `/v5/asset/deposit/query-sub-member-record` |
| [getInternalDepositRecords()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1876) | :closed_lock_with_key:  | GET | `/v5/asset/deposit/query-internal-record` |
| [getMasterDepositAddress()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1888) | :closed_lock_with_key:  | GET | `/v5/asset/deposit/query-address` |
| [getSubDepositAddress()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1906) | :closed_lock_with_key:  | GET | `/v5/asset/deposit/query-sub-member-address` |
| [querySubMemberAddress()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1931) | :closed_lock_with_key:  | GET | `/v5/asset/deposit/query-sub-member-address` |
| [getWithdrawalRecords()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1951) | :closed_lock_with_key:  | GET | `/v5/asset/withdraw/query-record` |
| [getExchangeEntities()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1962) | :closed_lock_with_key:  | GET | `/v5/asset/withdraw/vasp/list` |
| [submitWithdrawal()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1975) | :closed_lock_with_key:  | POST | `/v5/asset/withdraw/create` |
| [cancelWithdrawal()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1986) | :closed_lock_with_key:  | POST | `/v5/asset/withdraw/cancel` |
| [getConvertCoins()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1995) | :closed_lock_with_key:  | GET | `/v5/asset/exchange/query-coin-list` |
| [requestConvertQuote()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2006) | :closed_lock_with_key:  | POST | `/v5/asset/exchange/quote-apply` |
| [confirmConvertQuote()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2015) | :closed_lock_with_key:  | POST | `/v5/asset/exchange/convert-execute` |
| [getConvertStatus()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2027) | :closed_lock_with_key:  | GET | `/v5/asset/exchange/convert-result-query` |
| [getConvertHistory()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2046) | :closed_lock_with_key:  | GET | `/v5/asset/exchange/query-convert-history` |
| [createSubMember()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2066) | :closed_lock_with_key:  | POST | `/v5/user/create-sub-member` |
| [createSubUIDAPIKey()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2078) | :closed_lock_with_key:  | POST | `/v5/user/create-sub-api` |
| [getSubUIDList()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2087) | :closed_lock_with_key:  | GET | `/v5/user/query-sub-members` |
| [getSubUIDListUnlimited()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2096) | :closed_lock_with_key:  | GET | `/v5/user/submembers` |
| [setSubUIDFrozenState()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2114) | :closed_lock_with_key:  | POST | `/v5/user/frozen-sub-member` |
| [getQueryApiKey()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2127) | :closed_lock_with_key:  | GET | `/v5/user/query-api` |
| [getSubAccountAllApiKeys()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2134) | :closed_lock_with_key:  | GET | `/v5/user/sub-apikeys` |
| [getUIDWalletType()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2143) | :closed_lock_with_key:  | GET | `/v5/user/get-member-type` |
| [updateMasterApiKey()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2160) | :closed_lock_with_key:  | POST | `/v5/user/update-api` |
| [updateSubApiKey()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2174) | :closed_lock_with_key:  | POST | `/v5/user/update-sub-api` |
| [deleteSubMember()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2187) | :closed_lock_with_key:  | POST | `/v5/user/del-submember` |
| [deleteMasterApiKey()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2202) | :closed_lock_with_key:  | POST | `/v5/user/delete-api` |
| [deleteSubApiKey()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2216) | :closed_lock_with_key:  | POST | `/v5/user/delete-sub-api` |
| [getAffiliateUserList()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2236) | :closed_lock_with_key:  | GET | `/v5/affiliate/aff-user-list` |
| [getAffiliateUserInfo()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2255) | :closed_lock_with_key:  | GET | `/v5/user/aff-customer-info` |
| [getVIPMarginData()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2275) |  | GET | `/v5/spot-margin-trade/data` |
| [getHistoricalInterestRate()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2286) | :closed_lock_with_key:  | GET | `/v5/spot-margin-trade/interest-rate-history` |
| [toggleSpotMarginTrade()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2313) | :closed_lock_with_key:  | POST | `/v5/spot-margin-trade/switch-mode` |
| [setSpotMarginLeverage()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2325) | :closed_lock_with_key:  | POST | `/v5/spot-margin-trade/set-leverage` |
| [getSpotMarginState()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2334) | :closed_lock_with_key:  | GET | `/v5/spot-margin-trade/state` |
| [getSpotMarginCoinInfo()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2347) | :closed_lock_with_key:  | GET | `/v5/spot-cross-margin-trade/pledge-token` |
| [getSpotMarginBorrowableCoinInfo()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2364) | :closed_lock_with_key:  | GET | `/v5/spot-cross-margin-trade/borrow-token` |
| [getSpotMarginInterestAndQuota()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2381) | :closed_lock_with_key:  | GET | `/v5/spot-cross-margin-trade/loan-info` |
| [getSpotMarginLoanAccountInfo()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2399) | :closed_lock_with_key:  | GET | `/v5/spot-cross-margin-trade/account` |
| [spotMarginBorrow()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2423) | :closed_lock_with_key:  | POST | `/v5/spot-cross-margin-trade/loan` |
| [spotMarginRepay()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2434) | :closed_lock_with_key:  | POST | `/v5/spot-cross-margin-trade/repay` |
| [getSpotMarginBorrowOrderDetail()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2449) | :closed_lock_with_key:  | GET | `/v5/spot-cross-margin-trade/orders` |
| [getSpotMarginRepaymentOrderDetail()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2478) | :closed_lock_with_key:  | GET | `/v5/spot-cross-margin-trade/repay-history` |
| [toggleSpotCrossMarginTrade()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2507) | :closed_lock_with_key:  | POST | `/v5/spot-cross-margin-trade/switch` |
| [getCollateralCoins()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2527) |  | GET | `/v5/crypto-loan/collateral-data` |
| [getBorrowableCoins()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2544) |  | GET | `/v5/crypto-loan/loanable-data` |
| [getAccountBorrowCollateralLimit()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2562) | :closed_lock_with_key:  | GET | `/v5/crypto-loan/borrowable-collateralisable-number` |
| [borrowCryptoLoan()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2582) | :closed_lock_with_key:  | POST | `/v5/crypto-loan/borrow` |
| [repayCryptoLoan()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2603) | :closed_lock_with_key:  | POST | `/v5/crypto-loan/repay` |
| [getUnpaidLoanOrders()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2619) | :closed_lock_with_key:  | GET | `/v5/crypto-loan/ongoing-orders` |
| [getRepaymentHistory()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2640) | :closed_lock_with_key:  | GET | `/v5/crypto-loan/repayment-history` |
| [getCompletedLoanOrderHistory()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2660) | :closed_lock_with_key:  | GET | `/v5/crypto-loan/borrow-history` |
| [getMaxAllowedReductionCollateralAmount()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2679) | :closed_lock_with_key:  | GET | `/v5/crypto-loan/max-collateral-amount` |
| [adjustCollateralAmount()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2698) | :closed_lock_with_key:  | POST | `/v5/crypto-loan/adjust-ltv` |
| [getLoanLTVAdjustmentHistory()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2722) | :closed_lock_with_key:  | GET | `/v5/crypto-loan/adjustment-history` |
| [getLoanBorrowableCoins()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2743) |  | GET | `/v5/crypto-loan-common/loanable-data` |
| [getLoanCollateralCoins()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2755) |  | GET | `/v5/crypto-loan-common/collateral-data` |
| [getMaxCollateralAmount()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2765) | :closed_lock_with_key:  | GET | `/v5/crypto-loan-common/max-collateral-amount` |
| [updateCollateralAmount()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2780) | :closed_lock_with_key:  | POST | `/v5/crypto-loan-common/adjust-ltv` |
| [getCollateralAdjustmentHistory()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2791) | :closed_lock_with_key:  | GET | `/v5/crypto-loan-common/adjustment-history` |
| [getCryptoLoanPosition()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2806) | :closed_lock_with_key:  | GET | `/v5/crypto-loan-common/position` |
| [borrowFlexible()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2823) | :closed_lock_with_key:  | POST | `/v5/crypto-loan-flexible/borrow` |
| [repayFlexible()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2834) | :closed_lock_with_key:  | POST | `/v5/crypto-loan-flexible/repay` |
| [repayCollateralFlexible()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2844) | :closed_lock_with_key:  | POST | `/v5/crypto-loan-flexible/repay-collateral` |
| [getOngoingFlexibleLoans()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2858) | :closed_lock_with_key:  | GET | `/v5/crypto-loan-flexible/ongoing-coin` |
| [getBorrowHistoryFlexible()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2870) | :closed_lock_with_key:  | GET | `/v5/crypto-loan-flexible/borrow-history` |
| [getRepaymentHistoryFlexible()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2883) | :closed_lock_with_key:  | GET | `/v5/crypto-loan-flexible/repayment-history` |
| [getSupplyOrderQuoteFixed()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2908) |  | GET | `/v5/crypto-loan-fixed/supply-order-quote` |
| [getBorrowOrderQuoteFixed()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2921) |  | GET | `/v5/crypto-loan-fixed/borrow-order-quote` |
| [createBorrowOrderFixed()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2934) | :closed_lock_with_key:  | POST | `/v5/crypto-loan-fixed/borrow` |
| [createSupplyOrderFixed()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2945) | :closed_lock_with_key:  | POST | `/v5/crypto-loan-fixed/supply` |
| [cancelBorrowOrderFixed()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2955) | :closed_lock_with_key:  | POST | `/v5/crypto-loan-fixed/borrow-order-cancel` |
| [cancelSupplyOrderFixed()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2967) | :closed_lock_with_key:  | POST | `/v5/crypto-loan-fixed/supply-order-cancel` |
| [getBorrowContractInfoFixed()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2980) | :closed_lock_with_key:  | GET | `/v5/crypto-loan-fixed/borrow-contract-info` |
| [getSupplyContractInfoFixed()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2998) | :closed_lock_with_key:  | GET | `/v5/crypto-loan-fixed/supply-contract-info` |
| [getBorrowOrderInfoFixed()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3016) | :closed_lock_with_key:  | GET | `/v5/crypto-loan-fixed/borrow-order-info` |
| [getSupplyOrderInfoFixed()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3029) | :closed_lock_with_key:  | GET | `/v5/crypto-loan-fixed/supply-order-info` |
| [repayFixed()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3043) | :closed_lock_with_key:  | POST | `/v5/crypto-loan-fixed/fully-repay` |
| [repayCollateralFixed()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3054) | :closed_lock_with_key:  | POST | `/v5/crypto-loan-flexible/repay-collateral` |
| [getRepaymentHistoryFixed()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3067) | :closed_lock_with_key:  | GET | `/v5/crypto-loan-fixed/repayment-history` |
| [getInstitutionalLendingProductInfo()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3085) |  | GET | `/v5/ins-loan/product-infos` |
| [getInstitutionalLendingMarginCoinInfo()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3095) |  | GET | `/v5/ins-loan/ensure-tokens` |
| [getInstitutionalLendingMarginCoinInfoWithConversionRate()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3104) |  | GET | `/v5/ins-loan/ensure-tokens-convert` |
| [getInstitutionalLendingLoanOrders()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3113) | :closed_lock_with_key:  | GET | `/v5/ins-loan/loan-order` |
| [getInstitutionalLendingRepayOrders()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3125) | :closed_lock_with_key:  | GET | `/v5/ins-loan/repaid-history` |
| [getInstitutionalLendingLTV()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3137) | :closed_lock_with_key:  | GET | `/v5/ins-loan/ltv` |
| [getInstitutionalLendingLTVWithLadderConversionRate()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3146) | :closed_lock_with_key:  | GET | `/v5/ins-loan/ltv-convert` |
| [bindOrUnbindUID()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3161) | :closed_lock_with_key:  | POST | `/v5/ins-loan/association-uid` |
| [getExchangeBrokerEarnings()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3185) | :closed_lock_with_key:  | GET | `/v5/broker/earnings-info` |
| [getExchangeBrokerAccountInfo()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3198) | :closed_lock_with_key:  | GET | `/v5/broker/account-info` |
| [getBrokerSubAccountDeposits()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3214) | :closed_lock_with_key:  | GET | `/v5/broker/asset/query-sub-member-deposit-record` |
| [getBrokerVoucherSpec()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3229) | :closed_lock_with_key:  | POST | `/v5/broker/award/info` |
| [issueBrokerVoucher()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3241) | :closed_lock_with_key:  | POST | `/v5/broker/award/distribute-award` |
| [getBrokerIssuedVoucher()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3253) | :closed_lock_with_key:  | POST | `/v5/broker/award/distribution-record` |
| [getEarnProduct()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3270) |  | GET | `/v5/earn/product` |
| [submitStakeRedeem()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3288) | :closed_lock_with_key:  | POST | `/v5/earn/place-order` |
| [getEarnOrderHistory()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3305) | :closed_lock_with_key:  | GET | `/v5/earn/order` |
| [getEarnPosition()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3320) | :closed_lock_with_key:  | GET | `/v5/earn/position` |
| [createRFQ()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3338) | :closed_lock_with_key:  | POST | `/v5/rfq/create-rfq` |
| [getRFQConfig()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3349) | :closed_lock_with_key:  | GET | `/v5/rfq/config` |
| [cancelRFQ()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3358) | :closed_lock_with_key:  | POST | `/v5/rfq/cancel-rfq` |
| [cancelAllRFQ()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3368) | :closed_lock_with_key:  | POST | `/v5/rfq/cancel-all-rfq` |
| [createRFQQuote()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3377) | :closed_lock_with_key:  | POST | `/v5/rfq/create-quote` |
| [executeRFQQuote()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3388) | :closed_lock_with_key:  | POST | `/v5/rfq/execute-quote` |
| [cancelRFQQuote()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3399) | :closed_lock_with_key:  | POST | `/v5/rfq/cancel-quote` |
| [cancelAllRFQQuotes()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3409) | :closed_lock_with_key:  | POST | `/v5/rfq/cancel-all-quotes` |
| [getRFQRealtimeInfo()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3423) | :closed_lock_with_key:  | GET | `/v5/rfq/rfq-realtime` |
| [getRFQHistory()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3435) | :closed_lock_with_key:  | GET | `/v5/rfq/rfq-list` |
| [getRFQRealtimeQuote()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3449) | :closed_lock_with_key:  | GET | `/v5/rfq/quote-realtime` |
| [getRFQHistoryQuote()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3464) | :closed_lock_with_key:  | GET | `/v5/rfq/quote-list` |
| [getRFQTrades()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3477) | :closed_lock_with_key:  | GET | `/v5/rfq/trade-list` |
| [getRFQPublicTrades()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3490) | :closed_lock_with_key:  | GET | `/v5/rfq/public-trades` |
| [getP2PAccountCoinsBalance()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3515) | :closed_lock_with_key:  | GET | `/v5/asset/transfer/query-account-coins-balance` |
| [getP2POnlineAds()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3532) | :closed_lock_with_key:  | POST | `/v5/p2p/item/online` |
| [createP2PAd()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3541) | :closed_lock_with_key:  | POST | `/v5/p2p/item/create` |
| [cancelP2PAd()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3550) | :closed_lock_with_key:  | POST | `/v5/p2p/item/cancel` |
| [updateP2PAd()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3564) | :closed_lock_with_key:  | POST | `/v5/p2p/item/update` |
| [getP2PPersonalAds()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3574) | :closed_lock_with_key:  | POST | `/v5/p2p/item/personal/list` |
| [getP2PAdDetail()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3583) | :closed_lock_with_key:  | POST | `/v5/p2p/item/info` |
| [getP2POrders()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3598) | :closed_lock_with_key:  | POST | `/v5/p2p/order/simplifyList` |
| [getP2POrderDetail()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3608) | :closed_lock_with_key:  | POST | `/v5/p2p/order/info` |
| [getP2PPendingOrders()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3617) | :closed_lock_with_key:  | POST | `/v5/p2p/order/pending/simplifyList` |
| [markP2POrderAsPaid()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3626) | :closed_lock_with_key:  | POST | `/v5/p2p/order/pay` |
| [releaseP2POrder()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3635) | :closed_lock_with_key:  | POST | `/v5/p2p/order/finish` |
| [sendP2POrderMessage()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3644) | :closed_lock_with_key:  | POST | `/v5/p2p/order/message/send` |
| [uploadP2PChatFile()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3653) | :closed_lock_with_key:  | POST | `/v5/p2p/oss/upload_file` |
| [getP2POrderMessages()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3662) | :closed_lock_with_key:  | POST | `/v5/p2p/order/message/listpage` |
| [getP2PUserInfo()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3676) | :closed_lock_with_key:  | POST | `/v5/p2p/user/personal/info` |
| [getP2PCounterpartyUserInfo()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3683) | :closed_lock_with_key:  | POST | `/v5/p2p/user/order/personal/info` |
| [getP2PUserPayments()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3692) | :closed_lock_with_key:  | POST | `/v5/p2p/user/payment/list` |
| [setApiRateLimit()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3712) | :closed_lock_with_key:  | POST | `/v5/apilimit/set` |
| [queryApiRateLimit()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3741) | :closed_lock_with_key:  | GET | `/v5/apilimit/query` |

# websocket-api-client.ts

This table includes all endpoints from the official Exchange API docs and corresponding SDK functions for each endpoint that are found in [websocket-api-client.ts](/src/websocket-api-client.ts). 

This client provides WebSocket API endpoints which allow for faster interactions with the Bybit API via a WebSocket connection.

| Function | AUTH | HTTP Method | Endpoint |
| -------- | :------: | :------: | -------- |
| [submitNewOrder()](https://github.com/tiagosiebler/bybit-api/blob/master/src/websocket-api-client.ts#L95) | :closed_lock_with_key:  | WS | `order.create` |
| [amendOrder()](https://github.com/tiagosiebler/bybit-api/blob/master/src/websocket-api-client.ts#L111) | :closed_lock_with_key:  | WS | `order.amend` |
| [cancelOrder()](https://github.com/tiagosiebler/bybit-api/blob/master/src/websocket-api-client.ts#L127) | :closed_lock_with_key:  | WS | `order.cancel` |
| [batchSubmitOrders()](https://github.com/tiagosiebler/bybit-api/blob/master/src/websocket-api-client.ts#L143) | :closed_lock_with_key:  | WS | `order.create-batch` |
| [batchAmendOrder()](https://github.com/tiagosiebler/bybit-api/blob/master/src/websocket-api-client.ts#L171) | :closed_lock_with_key:  | WS | `order.amend-batch` |
| [batchCancelOrder()](https://github.com/tiagosiebler/bybit-api/blob/master/src/websocket-api-client.ts#L199) | :closed_lock_with_key:  | WS | `order.cancel-batch` |