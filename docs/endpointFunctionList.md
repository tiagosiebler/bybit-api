
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
| [getSystemStatus()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L659) | :closed_lock_with_key:  | GET | `/v5/system/status` |
| [getServerTime()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L676) |  | GET | `/v5/market/time` |
| [requestDemoTradingFunds()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L688) | :closed_lock_with_key:  | POST | `/v5/account/demo-apply-money` |
| [createDemoAccount()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L701) | :closed_lock_with_key:  | POST | `/v5/user/create-demo-member` |
| [getSpreadInstrumentsInfo()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L714) |  | GET | `/v5/spread/instrument` |
| [getSpreadOrderbook()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L726) |  | GET | `/v5/spread/orderbook` |
| [getSpreadTickers()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L736) |  | GET | `/v5/spread/tickers` |
| [getSpreadRecentTrades()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L747) |  | GET | `/v5/spread/recent-trade` |
| [getSpreadMaxQty()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L759) | :closed_lock_with_key:  | GET | `/v5/spread/max-qty` |
| [submitSpreadOrder()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L768) | :closed_lock_with_key:  | POST | `/v5/spread/order/create` |
| [amendSpreadOrder()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L781) | :closed_lock_with_key:  | POST | `/v5/spread/order/amend` |
| [cancelSpreadOrder()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L793) | :closed_lock_with_key:  | POST | `/v5/spread/order/cancel` |
| [cancelAllSpreadOrders()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L811) | :closed_lock_with_key:  | POST | `/v5/spread/order/cancel-all` |
| [getSpreadOpenOrders()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L830) | :closed_lock_with_key:  | GET | `/v5/spread/order/realtime` |
| [getSpreadOrderHistory()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L847) | :closed_lock_with_key:  | GET | `/v5/spread/order/history` |
| [getSpreadTradeHistory()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L863) | :closed_lock_with_key:  | GET | `/v5/spread/execution/list` |
| [getKline()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L883) |  | GET | `/v5/market/kline` |
| [getMarkPriceKline()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L900) |  | GET | `/v5/market/mark-price-kline` |
| [getIndexPriceKline()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L915) |  | GET | `/v5/market/index-price-kline` |
| [getPremiumIndexPriceKline()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L930) |  | GET | `/v5/market/premium-index-price-kline` |
| [getInstrumentsInfo()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L946) |  | GET | `/v5/market/instruments-info` |
| [getOrderbook()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L957) |  | GET | `/v5/market/orderbook` |
| [getRPIOrderbook()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L971) |  | GET | `/v5/market/rpi_orderbook` |
| [getTickers()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L977) |  | GET | `/v5/market/tickers` |
| [getFundingRateHistory()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1015) |  | GET | `/v5/market/funding/history` |
| [getPublicTradingHistory()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1030) |  | GET | `/v5/market/recent-trade` |
| [getOpenInterest()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1043) |  | GET | `/v5/market/open-interest` |
| [getHistoricalVolatility()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1053) |  | GET | `/v5/market/historical-volatility` |
| [getInsurance()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1064) |  | GET | `/v5/market/insurance` |
| [getRiskLimit()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1075) |  | GET | `/v5/market/risk-limit` |
| [getOptionDeliveryPrice()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1090) |  | GET | `/v5/market/delivery-price` |
| [getDeliveryPrice()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1103) |  | GET | `/v5/market/delivery-price` |
| [getNewDeliveryPrice()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1119) |  | GET | `/v5/market/new-delivery-price` |
| [getLongShortRatio()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1135) |  | GET | `/v5/market/account-ratio` |
| [getIndexPriceComponents()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1145) |  | GET | `/v5/market/index-price-components` |
| [getOrderPriceLimit()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1151) |  | GET | `/v5/market/price-limit` |
| [getADLAlert()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1165) |  | GET | `/v5/market/adlAlert` |
| [getFeeGroupStructure()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1178) |  | GET | `/v5/market/fee-group-info` |
| [submitOrder()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1190) | :closed_lock_with_key:  | POST | `/v5/order/create` |
| [amendOrder()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1196) | :closed_lock_with_key:  | POST | `/v5/order/amend` |
| [cancelOrder()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1202) | :closed_lock_with_key:  | POST | `/v5/order/cancel` |
| [getActiveOrders()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1211) | :closed_lock_with_key:  | GET | `/v5/order/realtime` |
| [cancelAllOrders()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1217) | :closed_lock_with_key:  | POST | `/v5/order/cancel-all` |
| [getHistoricOrders()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1230) | :closed_lock_with_key:  | GET | `/v5/order/history` |
| [getExecutionList()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1242) | :closed_lock_with_key:  | GET | `/v5/execution/list` |
| [batchSubmitOrders()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1260) | :closed_lock_with_key:  | POST | `/v5/order/create-batch` |
| [batchAmendOrders()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1285) | :closed_lock_with_key:  | POST | `/v5/order/amend-batch` |
| [batchCancelOrders()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1310) | :closed_lock_with_key:  | POST | `/v5/order/cancel-batch` |
| [getSpotBorrowCheck()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1332) | :closed_lock_with_key:  | GET | `/v5/order/spot-borrow-check` |
| [setDisconnectCancelAllWindow()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1353) | :closed_lock_with_key:  | POST | `/v5/order/disconnected-cancel-all` |
| [setDisconnectCancelAllWindowV2()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1371) | :closed_lock_with_key:  | POST | `/v5/order/disconnected-cancel-all` |
| [preCheckOrder()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1386) | :closed_lock_with_key:  | POST | `/v5/order/pre-check` |
| [createStrategyOrder()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1403) | :closed_lock_with_key:  | POST | `/v5/strategy/create` |
| [getStrategyList()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1414) | :closed_lock_with_key:  | GET | `/v5/strategy/list` |
| [getStrategyOrderList()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1425) | :closed_lock_with_key:  | GET | `/v5/strategy/order-list` |
| [stopStrategy()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1436) | :closed_lock_with_key:  | POST | `/v5/strategy/stop` |
| [getPositionInfo()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1461) | :closed_lock_with_key:  | GET | `/v5/position/list` |
| [getFuturesLeverage()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1473) | :closed_lock_with_key:  | GET | `/v5/position/symbol-info` |
| [setLeverage()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1488) | :closed_lock_with_key:  | POST | `/v5/position/set-leverage` |
| [switchIsolatedMargin()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1501) | :closed_lock_with_key:  | POST | `/v5/position/switch-isolated` |
| [setTPSLMode()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1515) | :closed_lock_with_key:  | POST | `/v5/position/set-tpsl-mode` |
| [switchPositionMode()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1530) | :closed_lock_with_key:  | POST | `/v5/position/switch-mode` |
| [setRiskLimit()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1544) | :closed_lock_with_key:  | POST | `/v5/position/set-risk-limit` |
| [setTradingStop()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1559) | :closed_lock_with_key:  | POST | `/v5/position/trading-stop` |
| [setAutoAddMargin()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1570) | :closed_lock_with_key:  | POST | `/v5/position/set-auto-add-margin` |
| [addOrReduceMargin()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1582) | :closed_lock_with_key:  | POST | `/v5/position/add-margin` |
| [getClosedPnL()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1594) | :closed_lock_with_key:  | GET | `/v5/position/closed-pnl` |
| [getClosedOptionsPositions()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1608) | :closed_lock_with_key:  | GET | `/v5/position/get-closed-positions` |
| [movePosition()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1633) | :closed_lock_with_key:  | POST | `/v5/position/move-positions` |
| [getMovePositionHistory()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1644) | :closed_lock_with_key:  | GET | `/v5/position/move-history` |
| [confirmNewRiskLimit()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1663) | :closed_lock_with_key:  | POST | `/v5/position/confirm-pending-mmr` |
| [getPreUpgradeOrderHistory()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1683) | :closed_lock_with_key:  | GET | `/v5/pre-upgrade/order/history` |
| [getPreUpgradeTradeHistory()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1698) | :closed_lock_with_key:  | GET | `/v5/pre-upgrade/execution/list` |
| [getPreUpgradeClosedPnl()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1709) | :closed_lock_with_key:  | GET | `/v5/pre-upgrade/position/closed-pnl` |
| [getPreUpgradeTransactions()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1723) | :closed_lock_with_key:  | GET | `/v5/pre-upgrade/account/transaction-log` |
| [getPreUpgradeOptionDeliveryRecord()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1740) | :closed_lock_with_key:  | GET | `/v5/pre-upgrade/asset/delivery-record` |
| [getPreUpgradeUSDCSessionSettlements()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1754) | :closed_lock_with_key:  | GET | `/v5/pre-upgrade/asset/settlement-record` |
| [getWalletBalance()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1775) | :closed_lock_with_key:  | GET | `/v5/account/wallet-balance` |
| [getTransferableAmount()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1786) | :closed_lock_with_key:  | GET | `/v5/account/withdrawal` |
| [getAccountInstrumentsInfo()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1803) | :closed_lock_with_key:  | GET | `/v5/account/instruments-info` |
| [upgradeToUnifiedAccount()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1814) | :closed_lock_with_key:  | POST | `/v5/account/upgrade-to-uta` |
| [getBorrowHistory()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1825) | :closed_lock_with_key:  | GET | `/v5/account/borrow-history` |
| [repayLiability()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1846) | :closed_lock_with_key:  | POST | `/v5/account/quick-repayment` |
| [manualRepay()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1871) | :closed_lock_with_key:  | POST | `/v5/account/repay` |
| [setCollateralCoin()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1880) | :closed_lock_with_key:  | POST | `/v5/account/set-collateral-switch` |
| [batchSetCollateralCoin()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1886) | :closed_lock_with_key:  | POST | `/v5/account/set-collateral-switch-batch` |
| [getCollateralInfo()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1896) | :closed_lock_with_key:  | GET | `/v5/account/collateral-info` |
| [getCoinGreeks()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1905) | :closed_lock_with_key:  | GET | `/v5/asset/coin-greeks` |
| [getFeeRate()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1918) | :closed_lock_with_key:  | GET | `/v5/account/fee-rate` |
| [getAccountInfo()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1927) | :closed_lock_with_key:  | GET | `/v5/account/info` |
| [getDCPInfo()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1940) | :closed_lock_with_key:  | GET | `/v5/account/query-dcp-info` |
| [getTransactionLog()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1947) | :closed_lock_with_key:  | GET | `/v5/account/transaction-log` |
| [getClassicTransactionLogs()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1958) | :closed_lock_with_key:  | GET | `/v5/account/contract-transaction-log` |
| [getSMPGroup()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1969) | :closed_lock_with_key:  | GET | `/v5/account/smp-group` |
| [setMarginMode()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1982) | :closed_lock_with_key:  | POST | `/v5/account/set-margin-mode` |
| [setSpotHedging()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1999) | :closed_lock_with_key:  | POST | `/v5/account/set-hedging-mode` |
| [setLimitPriceAction()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2012) | :closed_lock_with_key:  | POST | `/v5/account/set-limit-px-action` |
| [getLimitPriceAction()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2023) | :closed_lock_with_key:  | GET | `/v5/account/user-setting-config` |
| [setDeltaNeutralMode()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2031) | :closed_lock_with_key:  | POST | `/v5/account/set-delta-mode` |
| [setMMP()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2040) | :closed_lock_with_key:  | POST | `/v5/account/mmp-modify` |
| [resetMMP()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2047) | :closed_lock_with_key:  | POST | `/v5/account/mmp-reset` |
| [getMMPState()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2054) | :closed_lock_with_key:  | GET | `/v5/account/mmp-state` |
| [getOptionAssetInfo()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2064) | :closed_lock_with_key:  | GET | `/v5/account/option-asset-info` |
| [getPayInfo()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2074) | :closed_lock_with_key:  | GET | `/v5/account/pay-info` |
| [getTradeInfoForAnalysis()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2084) | :closed_lock_with_key:  | GET | `/v5/account/trade-info-for-analysis` |
| [getAssetOverview()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2104) | :closed_lock_with_key:  | GET | `/v5/asset/asset-overview` |
| [getPortfolioMarginInfo()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2114) | :closed_lock_with_key:  | GET | `/v5/asset/portfolio-margin` |
| [getTotalMembersAssets()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2124) | :closed_lock_with_key:  | GET | `/v5/asset/total-members-assets` |
| [getFundingAccountTransactionHistory()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2136) | :closed_lock_with_key:  | GET | `/v5/asset/fundinghistory` |
| [getDeliveryRecord()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2152) | :closed_lock_with_key:  | GET | `/v5/asset/delivery-record` |
| [getSettlementRecords()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2163) | :closed_lock_with_key:  | GET | `/v5/asset/settlement-record` |
| [getCoinExchangeRecords()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2176) | :closed_lock_with_key:  | GET | `/v5/asset/exchange/order-record` |
| [getCoinInfo()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2191) | :closed_lock_with_key:  | GET | `/v5/asset/coin/query-info` |
| [getSubUID()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2205) | :closed_lock_with_key:  | GET | `/v5/asset/transfer/query-sub-member-list` |
| [getAssetInfo()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2220) | :closed_lock_with_key:  | GET | `/v5/asset/transfer/query-asset-info` |
| [getAllCoinsBalance()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2231) | :closed_lock_with_key:  | GET | `/v5/asset/transfer/query-account-coins-balance` |
| [getCoinBalance()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2245) | :closed_lock_with_key:  | GET | `/v5/asset/transfer/query-account-coin-balance` |
| [getWithdrawableAmount()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2259) | :closed_lock_with_key:  | GET | `/v5/asset/withdraw/withdrawable-amount` |
| [getTransferableCoinList()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2268) | :closed_lock_with_key:  | GET | `/v5/asset/transfer/query-transfer-coin-list` |
| [createInternalTransfer()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2284) | :closed_lock_with_key:  | POST | `/v5/asset/transfer/inter-transfer` |
| [getInternalTransferRecords()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2303) | :closed_lock_with_key:  | GET | `/v5/asset/transfer/query-inter-transfer-list` |
| [enableUniversalTransferForSubUIDs()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2323) | :closed_lock_with_key:  | POST | `/v5/asset/transfer/save-transfer-sub-member` |
| [createUniversalTransfer()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2334) | :closed_lock_with_key:  | POST | `/v5/asset/transfer/universal-transfer` |
| [getUniversalTransferRecords()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2346) | :closed_lock_with_key:  | GET | `/v5/asset/transfer/query-universal-transfer-list` |
| [getAllowedDepositCoinInfo()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2359) | :closed_lock_with_key:  | GET | `/v5/asset/deposit/query-allowed-list` |
| [setDepositAccount()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2374) | :closed_lock_with_key:  | POST | `/v5/asset/deposit/deposit-to-account` |
| [getDepositRecords()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2390) | :closed_lock_with_key:  | GET | `/v5/asset/deposit/query-record` |
| [getSubAccountDepositRecords()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2405) | :closed_lock_with_key:  | GET | `/v5/asset/deposit/query-sub-member-record` |
| [getInternalDepositRecords()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2421) | :closed_lock_with_key:  | GET | `/v5/asset/deposit/query-internal-record` |
| [getMasterDepositAddress()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2433) | :closed_lock_with_key:  | GET | `/v5/asset/deposit/query-address` |
| [getSubDepositAddress()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2451) | :closed_lock_with_key:  | GET | `/v5/asset/deposit/query-sub-member-address` |
| [querySubMemberAddress()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2476) | :closed_lock_with_key:  | GET | `/v5/asset/deposit/query-sub-member-address` |
| [getWithdrawalRecords()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2496) | :closed_lock_with_key:  | GET | `/v5/asset/withdraw/query-record` |
| [getWithdrawalAddressList()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2508) | :closed_lock_with_key:  | GET | `/v5/asset/withdraw/query-address` |
| [getExchangeEntities()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2522) | :closed_lock_with_key:  | GET | `/v5/asset/withdraw/vasp/list` |
| [submitDepositOriginatorInfo()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2532) | :closed_lock_with_key:  | POST | `/v5/asset/travel-rule/deposit/submit` |
| [submitWithdrawal()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2547) | :closed_lock_with_key:  | POST | `/v5/asset/withdraw/create` |
| [cancelWithdrawal()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2558) | :closed_lock_with_key:  | POST | `/v5/asset/withdraw/cancel` |
| [getConvertCoins()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2567) | :closed_lock_with_key:  | GET | `/v5/asset/exchange/query-coin-list` |
| [requestConvertQuote()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2578) | :closed_lock_with_key:  | POST | `/v5/asset/exchange/quote-apply` |
| [confirmConvertQuote()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2587) | :closed_lock_with_key:  | POST | `/v5/asset/exchange/convert-execute` |
| [getConvertStatus()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2599) | :closed_lock_with_key:  | GET | `/v5/asset/exchange/convert-result-query` |
| [getConvertHistory()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2618) | :closed_lock_with_key:  | GET | `/v5/asset/exchange/query-convert-history` |
| [getSmallBalanceList()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2635) | :closed_lock_with_key:  | GET | `/v5/asset/covert/small-balance-list` |
| [getFiatTradingPairList()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2649) | :closed_lock_with_key:  | GET | `/v5/fiat/query-coin-list` |
| [createSubMember()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2667) | :closed_lock_with_key:  | POST | `/v5/user/create-sub-member` |
| [createSubUIDAPIKey()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2679) | :closed_lock_with_key:  | POST | `/v5/user/create-sub-api` |
| [getSubUIDList()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2688) | :closed_lock_with_key:  | GET | `/v5/user/query-sub-members` |
| [getSubUIDListUnlimited()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2697) | :closed_lock_with_key:  | GET | `/v5/user/submembers` |
| [setSubUIDFrozenState()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2715) | :closed_lock_with_key:  | POST | `/v5/user/frozen-sub-member` |
| [getQueryApiKey()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2730) | :closed_lock_with_key:  | GET | `/v5/user/query-api` |
| [getSubAccountAllApiKeys()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2737) | :closed_lock_with_key:  | GET | `/v5/user/sub-apikeys` |
| [getUIDWalletType()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2746) | :closed_lock_with_key:  | GET | `/v5/user/get-member-type` |
| [updateMasterApiKey()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2765) | :closed_lock_with_key:  | POST | `/v5/user/update-api` |
| [updateSubApiKey()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2779) | :closed_lock_with_key:  | POST | `/v5/user/update-sub-api` |
| [deleteSubMember()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2792) | :closed_lock_with_key:  | POST | `/v5/user/del-submember` |
| [deleteMasterApiKey()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2807) | :closed_lock_with_key:  | POST | `/v5/user/delete-api` |
| [deleteSubApiKey()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2821) | :closed_lock_with_key:  | POST | `/v5/user/delete-sub-api` |
| [getAffiliateUserList()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2841) | :closed_lock_with_key:  | GET | `/v5/affiliate/aff-user-list` |
| [getAffiliateSubAffiliateList()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2859) | :closed_lock_with_key:  | GET | `/v5/affiliate/affiliate-sub-list` |
| [getAffiliateUserInfo()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2875) | :closed_lock_with_key:  | GET | `/v5/user/aff-customer-info` |
| [getFriendReferrals()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2887) | :closed_lock_with_key:  | GET | `/v5/user/invitation/referrals` |
| [signAgreement()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2908) | :closed_lock_with_key:  | POST | `/v5/user/agreement` |
| [getAlphaTradeQuote()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2925) | :closed_lock_with_key:  | POST | `/v5/alpha/trade/quote` |
| [executeAlphaTradePurchase()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2936) | :closed_lock_with_key:  | POST | `/v5/alpha/trade/purchase` |
| [executeAlphaTradeRedeem()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2947) | :closed_lock_with_key:  | POST | `/v5/alpha/trade/redeem` |
| [getAlphaPayTokenList()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2957) | :closed_lock_with_key:  | POST | `/v5/alpha/trade/pay-token-list` |
| [getAlphaTradeOrderList()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2967) | :closed_lock_with_key:  | POST | `/v5/alpha/trade/order-list` |
| [getAlphaBizTokenList()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2977) | :closed_lock_with_key:  | POST | `/v5/alpha/trade/biz-token-list` |
| [getAlphaBizTokenPriceList()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2987) | :closed_lock_with_key:  | POST | `/v5/alpha/trade/biz-token-price-list` |
| [getAlphaBizTokenDetails()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2997) | :closed_lock_with_key:  | POST | `/v5/alpha/trade/biz-token-details` |
| [getAlphaAssetList()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3007) | :closed_lock_with_key:  | POST | `/v5/alpha/trade/asset-list` |
| [getAlphaAssetDetail()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3015) | :closed_lock_with_key:  | POST | `/v5/alpha/trade/asset-detail` |
| [getAlphaPredictionEngineStatus()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3031) | :closed_lock_with_key:  | GET | `/v5/alpha/prediction/engine-status` |
| [getAlphaPredictionPayTokenList()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3041) | :closed_lock_with_key:  | GET | `/v5/alpha/prediction/pay-token-list` |
| [getAlphaPredictionEventDetail()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3051) | :closed_lock_with_key:  | POST | `/v5/alpha/prediction/event-detail` |
| [getAlphaPredictionOrderEstimate()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3061) | :closed_lock_with_key:  | POST | `/v5/alpha/prediction/order-estimate` |
| [executeAlphaPredictionBuy()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3071) | :closed_lock_with_key:  | POST | `/v5/alpha/prediction/buy` |
| [executeAlphaPredictionSell()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3081) | :closed_lock_with_key:  | POST | `/v5/alpha/prediction/sell` |
| [getAlphaPredictionOrderList()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3091) | :closed_lock_with_key:  | POST | `/v5/alpha/prediction/order-list` |
| [getAlphaPredictionOrderBook()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3101) | :closed_lock_with_key:  | POST | `/v5/alpha/prediction/order-book` |
| [getAlphaPredictionTokenPrice()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3111) | :closed_lock_with_key:  | POST | `/v5/alpha/prediction/token-price` |
| [getAlphaPredictionPriceHistory()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3121) | :closed_lock_with_key:  | POST | `/v5/alpha/prediction/price-history` |
| [getAlphaPredictionPositionList()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3131) | :closed_lock_with_key:  | POST | `/v5/alpha/prediction/position-list` |
| [getAlphaPredictionPositionHistory()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3141) | :closed_lock_with_key:  | POST | `/v5/alpha/prediction/position-history` |
| [getAlphaPredictionPortfolioSummary()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3151) | :closed_lock_with_key:  | POST | `/v5/alpha/prediction/portfolio-summary` |
| [getAlphaPredictionSideMarketList()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3161) | :closed_lock_with_key:  | POST | `/v5/alpha/prediction/side-market-list` |
| [getAlphaPredictionSportsMatchList()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3171) | :closed_lock_with_key:  | POST | `/v5/alpha/prediction/sports/match-list` |
| [getAlphaPredictionSportsTimelineStages()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3181) | :closed_lock_with_key:  | GET | `/v5/alpha/prediction/sports/timeline-stages` |
| [getAlphaPredictionSportsGroupStageDetail()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3194) | :closed_lock_with_key:  | POST | `/v5/alpha/prediction/sports/group-stage-detail` |
| [getAlphaLPPoolList()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3213) | :closed_lock_with_key:  | POST | `/v5/alpha/lp/pool-list` |
| [getAlphaLPPoolInfo()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3223) | :closed_lock_with_key:  | POST | `/v5/alpha/lp/pool-info` |
| [executeAlphaLPStake()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3233) | :closed_lock_with_key:  | POST | `/v5/alpha/lp/stake` |
| [executeAlphaLPRedeem()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3243) | :closed_lock_with_key:  | POST | `/v5/alpha/lp/redeem` |
| [getAlphaLPOrderList()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3253) | :closed_lock_with_key:  | POST | `/v5/alpha/lp/order-list` |
| [getAlphaLPPayTokenList()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3263) | :closed_lock_with_key:  | POST | `/v5/alpha/lp/pay-token-list` |
| [getAlphaLPPayTokenPrice()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3273) | :closed_lock_with_key:  | POST | `/v5/alpha/lp/pay-token-price` |
| [getAlphaLPPositionList()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3283) | :closed_lock_with_key:  | POST | `/v5/alpha/lp/position-list` |
| [getVIPMarginData()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3303) |  | GET | `/v5/spot-margin-trade/data` |
| [getHistoricalInterestRate()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3314) | :closed_lock_with_key:  | GET | `/v5/spot-margin-trade/interest-rate-history` |
| [getSpotMarginCurrencyData()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3339) | :closed_lock_with_key:  | GET | `/v5/spot-margin-trade/currency-data` |
| [toggleSpotMarginTrade()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3351) | :closed_lock_with_key:  | POST | `/v5/spot-margin-trade/switch-mode` |
| [setSpotMarginLeverage()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3362) | :closed_lock_with_key:  | POST | `/v5/spot-margin-trade/set-leverage` |
| [setSpotMarginLeverageV2()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3370) | :closed_lock_with_key:  | POST | `/v5/spot-margin-trade/set-leverage` |
| [getSpotMarginState()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3381) | :closed_lock_with_key:  | GET | `/v5/spot-margin-trade/state` |
| [manualBorrow()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3388) | :closed_lock_with_key:  | POST | `/v5/account/borrow` |
| [getMaxBorrowableAmount()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3397) | :closed_lock_with_key:  | GET | `/v5/spot-margin-trade/max-borrowable` |
| [getPositionTiers()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3406) | :closed_lock_with_key:  | GET | `/v5/spot-margin-trade/position-tiers` |
| [getCoinState()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3417) | :closed_lock_with_key:  | GET | `/v5/spot-margin-trade/coinstate` |
| [getAvailableAmountToRepay()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3428) | :closed_lock_with_key:  | GET | `/v5/spot-margin-trade/repayment-available-amount` |
| [manualRepayWithoutConversion()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3447) | :closed_lock_with_key:  | POST | `/v5/account/no-convert-repay` |
| [getAutoRepayMode()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3460) | :closed_lock_with_key:  | GET | `/v5/spot-margin-trade/get-auto-repay-mode` |
| [setAutoRepayMode()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3476) | :closed_lock_with_key:  | POST | `/v5/spot-margin-trade/set-auto-repay-mode` |
| [getSpotMarginLiability()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3488) | :closed_lock_with_key:  | GET | `/v5/spot-margin-trade/liability` |
| [submitFixedRateBorrow()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3497) | :closed_lock_with_key:  | POST | `/v5/spot-margin-trade/fixedborrow` |
| [getFixedRateBorrowOrderInfo()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3506) | :closed_lock_with_key:  | GET | `/v5/spot-margin-trade/fixedborrow-order-info` |
| [getFixedRateBorrowContractInfo()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3523) | :closed_lock_with_key:  | GET | `/v5/spot-margin-trade/fixedborrow-contract-info` |
| [getFixedRateBorrowOrderQuote()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3540) | :closed_lock_with_key:  | GET | `/v5/spot-margin-trade/fixedborrow-order-quote` |
| [renewFixedRateBorrow()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3552) | :closed_lock_with_key:  | POST | `/v5/spot-margin-trade/fixedborrow-renew` |
| [getSpotMarginCoinInfo()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3567) | :closed_lock_with_key:  | GET | `/v5/spot-cross-margin-trade/pledge-token` |
| [getSpotMarginBorrowableCoinInfo()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3584) | :closed_lock_with_key:  | GET | `/v5/spot-cross-margin-trade/borrow-token` |
| [getSpotMarginInterestAndQuota()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3601) | :closed_lock_with_key:  | GET | `/v5/spot-cross-margin-trade/loan-info` |
| [getSpotMarginLoanAccountInfo()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3619) | :closed_lock_with_key:  | GET | `/v5/spot-cross-margin-trade/account` |
| [spotMarginBorrow()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3643) | :closed_lock_with_key:  | POST | `/v5/spot-cross-margin-trade/loan` |
| [spotMarginRepay()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3654) | :closed_lock_with_key:  | POST | `/v5/spot-cross-margin-trade/repay` |
| [getSpotMarginBorrowOrderDetail()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3669) | :closed_lock_with_key:  | GET | `/v5/spot-cross-margin-trade/orders` |
| [getSpotMarginRepaymentOrderDetail()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3698) | :closed_lock_with_key:  | GET | `/v5/spot-cross-margin-trade/repay-history` |
| [toggleSpotCrossMarginTrade()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3727) | :closed_lock_with_key:  | POST | `/v5/spot-cross-margin-trade/switch` |
| [getCollateralCoins()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3747) |  | GET | `/v5/crypto-loan/collateral-data` |
| [getBorrowableCoins()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3764) |  | GET | `/v5/crypto-loan/loanable-data` |
| [getAccountBorrowCollateralLimit()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3782) | :closed_lock_with_key:  | GET | `/v5/crypto-loan/borrowable-collateralisable-number` |
| [borrowCryptoLoan()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3802) | :closed_lock_with_key:  | POST | `/v5/crypto-loan/borrow` |
| [repayCryptoLoan()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3823) | :closed_lock_with_key:  | POST | `/v5/crypto-loan/repay` |
| [getUnpaidLoanOrders()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3839) | :closed_lock_with_key:  | GET | `/v5/crypto-loan/ongoing-orders` |
| [getRepaymentHistory()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3860) | :closed_lock_with_key:  | GET | `/v5/crypto-loan/repayment-history` |
| [getCompletedLoanOrderHistory()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3880) | :closed_lock_with_key:  | GET | `/v5/crypto-loan/borrow-history` |
| [getMaxAllowedReductionCollateralAmount()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3899) | :closed_lock_with_key:  | GET | `/v5/crypto-loan/max-collateral-amount` |
| [adjustCollateralAmount()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3918) | :closed_lock_with_key:  | POST | `/v5/crypto-loan/adjust-ltv` |
| [getLoanLTVAdjustmentHistory()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3942) | :closed_lock_with_key:  | GET | `/v5/crypto-loan/adjustment-history` |
| [getLoanBorrowableCoins()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3963) |  | GET | `/v5/crypto-loan-common/loanable-data` |
| [getLoanCollateralCoins()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3975) |  | GET | `/v5/crypto-loan-common/collateral-data` |
| [getMaxCollateralAmount()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3985) | :closed_lock_with_key:  | GET | `/v5/crypto-loan-common/max-collateral-amount` |
| [getMaxLoanAmount()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4004) | :closed_lock_with_key:  | POST | `/v5/crypto-loan-common/max-loan` |
| [updateCollateralAmount()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4014) | :closed_lock_with_key:  | POST | `/v5/crypto-loan-common/adjust-ltv` |
| [getCollateralAdjustmentHistory()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4025) | :closed_lock_with_key:  | GET | `/v5/crypto-loan-common/adjustment-history` |
| [getCryptoLoanPosition()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4040) | :closed_lock_with_key:  | GET | `/v5/crypto-loan-common/position` |
| [borrowFlexible()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4057) | :closed_lock_with_key:  | POST | `/v5/crypto-loan-flexible/borrow` |
| [repayFlexible()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4068) | :closed_lock_with_key:  | POST | `/v5/crypto-loan-flexible/repay` |
| [repayCollateralFlexible()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4078) | :closed_lock_with_key:  | POST | `/v5/crypto-loan-flexible/repay-collateral` |
| [getOngoingFlexibleLoans()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4092) | :closed_lock_with_key:  | GET | `/v5/crypto-loan-flexible/ongoing-coin` |
| [getBorrowHistoryFlexible()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4104) | :closed_lock_with_key:  | GET | `/v5/crypto-loan-flexible/borrow-history` |
| [getRepaymentHistoryFlexible()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4117) | :closed_lock_with_key:  | GET | `/v5/crypto-loan-flexible/repayment-history` |
| [getSupplyOrderQuoteFixed()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4142) |  | GET | `/v5/crypto-loan-fixed/supply-order-quote` |
| [getBorrowOrderQuoteFixed()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4155) |  | GET | `/v5/crypto-loan-fixed/borrow-order-quote` |
| [createBorrowOrderFixed()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4168) | :closed_lock_with_key:  | POST | `/v5/crypto-loan-fixed/borrow` |
| [createSupplyOrderFixed()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4181) | :closed_lock_with_key:  | POST | `/v5/crypto-loan-fixed/supply` |
| [cancelBorrowOrderFixed()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4191) | :closed_lock_with_key:  | POST | `/v5/crypto-loan-fixed/borrow-order-cancel` |
| [cancelSupplyOrderFixed()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4205) | :closed_lock_with_key:  | POST | `/v5/crypto-loan-fixed/supply-order-cancel` |
| [getBorrowContractInfoFixed()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4218) | :closed_lock_with_key:  | GET | `/v5/crypto-loan-fixed/borrow-contract-info` |
| [getSupplyContractInfoFixed()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4236) | :closed_lock_with_key:  | GET | `/v5/crypto-loan-fixed/supply-contract-info` |
| [getBorrowOrderInfoFixed()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4254) | :closed_lock_with_key:  | GET | `/v5/crypto-loan-fixed/borrow-order-info` |
| [getSupplyOrderInfoFixed()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4267) | :closed_lock_with_key:  | GET | `/v5/crypto-loan-fixed/supply-order-info` |
| [repayFixed()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4281) | :closed_lock_with_key:  | POST | `/v5/crypto-loan-fixed/fully-repay` |
| [repayCollateralFixed()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4292) | :closed_lock_with_key:  | POST | `/v5/crypto-loan-flexible/repay-collateral` |
| [getRepaymentHistoryFixed()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4305) | :closed_lock_with_key:  | GET | `/v5/crypto-loan-fixed/repayment-history` |
| [renewBorrowOrderFixed()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4322) | :closed_lock_with_key:  | POST | `/v5/crypto-loan-fixed/renew` |
| [getRenewOrderInfoFixed()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4335) | :closed_lock_with_key:  | GET | `/v5/crypto-loan-fixed/renew-info` |
| [getInstitutionalLendingProductInfo()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4353) |  | GET | `/v5/ins-loan/product-infos` |
| [getInstitutionalLendingCoinDeltaAmount()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4365) | :closed_lock_with_key:  | GET | `/v5/ins-loan/coin-delta-amount` |
| [getInstitutionalLendingMarginCoinInfo()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4375) |  | GET | `/v5/ins-loan/ensure-tokens` |
| [getInstitutionalLendingMarginCoinInfoWithConversionRate()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4384) |  | GET | `/v5/ins-loan/ensure-tokens-convert` |
| [getInstitutionalLendingLoanOrders()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4393) | :closed_lock_with_key:  | GET | `/v5/ins-loan/loan-order` |
| [getInstitutionalLendingRepayOrders()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4405) | :closed_lock_with_key:  | GET | `/v5/ins-loan/repaid-history` |
| [getInstitutionalLendingLTV()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4417) | :closed_lock_with_key:  | GET | `/v5/ins-loan/ltv` |
| [getInstitutionalLendingLTVWithLadderConversionRate()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4426) | :closed_lock_with_key:  | GET | `/v5/ins-loan/ltv-convert` |
| [bindOrUnbindUID()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4441) | :closed_lock_with_key:  | POST | `/v5/ins-loan/association-uid` |
| [repayInstitutionalLoan()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4461) | :closed_lock_with_key:  | POST | `/v5/ins-loan/repay-loan` |
| [getExchangeBrokerEarnings()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4482) | :closed_lock_with_key:  | GET | `/v5/broker/earnings-info` |
| [getExchangeBrokerAccountInfo()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4495) | :closed_lock_with_key:  | GET | `/v5/broker/account-info` |
| [getBrokerSubAccountDeposits()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4511) | :closed_lock_with_key:  | GET | `/v5/broker/asset/query-sub-member-deposit-record` |
| [getBrokerVoucherSpec()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4526) | :closed_lock_with_key:  | POST | `/v5/broker/award/info` |
| [issueBrokerVoucher()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4538) | :closed_lock_with_key:  | POST | `/v5/broker/award/distribute-award` |
| [getBrokerIssuedVoucher()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4550) | :closed_lock_with_key:  | POST | `/v5/broker/award/distribution-record` |
| [setBrokerRateLimit()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4567) | :closed_lock_with_key:  | POST | `/v5/broker/apilimit/set` |
| [getBrokerRateLimitCap()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4586) | :closed_lock_with_key:  | GET | `/v5/broker/apilimit/query-cap` |
| [getAllBrokerRateLimits()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4604) | :closed_lock_with_key:  | GET | `/v5/broker/apilimit/query-all` |
| [getEarnProduct()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4624) |  | GET | `/v5/earn/product` |
| [getEarnCouponList()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4636) | :closed_lock_with_key:  | GET | `/v5/earn/coupons` |
| [getRWAProductList()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4646) |  | GET | `/v5/earn/rwa/product` |
| [placeRWAOrder()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4656) | :closed_lock_with_key:  | POST | `/v5/earn/rwa/place-order` |
| [getRWAPositionList()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4665) | :closed_lock_with_key:  | GET | `/v5/earn/rwa/position` |
| [getRWAOrderList()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4674) | :closed_lock_with_key:  | GET | `/v5/earn/rwa/order` |
| [getRWANavChart()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4684) |  | GET | `/v5/earn/rwa/nav-chart` |
| [getHoldToEarnAirdropProducts()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4695) |  | GET | `/v5/earn/hold-to-earn/product` |
| [getAdvanceEarnProduct()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4706) |  | GET | `/v5/earn/advance/product` |
| [getLiquidityMiningProduct()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4717) |  | GET | `/v5/earn/liquidity-mining/product` |
| [getFixedTermEarnProduct()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4728) |  | GET | `/v5/earn/fixed-term/product` |
| [getAdvanceEarnProductExtraInfo()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4740) |  | GET | `/v5/earn/advance/product-extra-info` |
| [submitAdvanceEarnPlaceOrder()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4751) | :closed_lock_with_key:  | POST | `/v5/earn/advance/place-order` |
| [getAdvanceEarnPosition()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4762) | :closed_lock_with_key:  | GET | `/v5/earn/advance/position` |
| [getAdvanceEarnOrder()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4773) | :closed_lock_with_key:  | GET | `/v5/earn/advance/order` |
| [submitFixedTermEarnOrder()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4784) | :closed_lock_with_key:  | POST | `/v5/earn/fixed-term/place-order` |
| [redeemFixedTermEarn()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4795) | :closed_lock_with_key:  | POST | `/v5/earn/fixed-term/redeem` |
| [getFixedTermEarnPosition()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4806) | :closed_lock_with_key:  | GET | `/v5/earn/fixed-term/position` |
| [getFixedTermEarnOrder()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4817) | :closed_lock_with_key:  | GET | `/v5/earn/fixed-term/order` |
| [setFixedTermEarnAutoInvest()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4828) | :closed_lock_with_key:  | POST | `/v5/earn/fixed-term/position/auto-invest` |
| [submitStakeRedeem()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4844) | :closed_lock_with_key:  | POST | `/v5/earn/place-order` |
| [getEarnOrderHistory()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4863) | :closed_lock_with_key:  | GET | `/v5/earn/order` |
| [getEarnPosition()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4881) | :closed_lock_with_key:  | GET | `/v5/earn/position` |
| [modifyEarnPosition()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4894) | :closed_lock_with_key:  | POST | `/v5/earn/position/modify` |
| [getEarnYieldHistory()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4907) | :closed_lock_with_key:  | GET | `/v5/earn/yield` |
| [getHoldToEarnAirdropYieldHistory()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4921) | :closed_lock_with_key:  | GET | `/v5/earn/hold-to-earn/yield-history` |
| [getEarnHourlyYieldHistory()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4932) | :closed_lock_with_key:  | GET | `/v5/earn/hourly-yield` |
| [getEarnAprHistory()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4946) |  | GET | `/v5/earn/apr-history` |
| [getEarnTokenProduct()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4956) |  | GET | `/v5/earn/token/product` |
| [submitEarnTokenOrder()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4965) | :closed_lock_with_key:  | POST | `/v5/earn/token/place-order` |
| [getEarnTokenOrders()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4974) | :closed_lock_with_key:  | GET | `/v5/earn/token/order` |
| [getEarnTokenPosition()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4986) | :closed_lock_with_key:  | GET | `/v5/earn/token/position` |
| [getEarnTokenDailyYield()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4995) | :closed_lock_with_key:  | GET | `/v5/earn/token/yield` |
| [getEarnTokenHourlyYield()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L5007) | :closed_lock_with_key:  | GET | `/v5/earn/token/hourly-yield` |
| [getEarnTokenHistoryApr()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L5019) |  | GET | `/v5/earn/token/history-apr` |
| [getPwmInvestmentPlanList()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L5034) | :closed_lock_with_key:  | GET | `/v5/earn/pwm/investment-plan/list` |
| [getPwmInvestmentPlanDetail()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L5043) | :closed_lock_with_key:  | GET | `/v5/earn/pwm/investment-plan/detail` |
| [getPwmPendingInvestmentPlanDetail()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L5052) | :closed_lock_with_key:  | GET | `/v5/earn/pwm/investment-plan/new-plan` |
| [claimPwmWithdrawableFunds()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L5061) | :closed_lock_with_key:  | POST | `/v5/earn/pwm/investment-plan/claim` |
| [getPwmInvestmentPlanAssetTrend()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L5070) | :closed_lock_with_key:  | GET | `/v5/earn/pwm/investment-plan/asset-trend` |
| [getPwmFundHistoricalNav()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L5079) | :closed_lock_with_key:  | GET | `/v5/earn/pwm/investment-plan/fund-nav` |
| [subscribePwmInvestmentPlan()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L5088) | :closed_lock_with_key:  | POST | `/v5/earn/pwm/investment-plan/subscribe` |
| [investMorePwmInvestmentPlan()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L5097) | :closed_lock_with_key:  | POST | `/v5/earn/pwm/investment-plan/invest-more` |
| [redeemPwmInvestmentPlan()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L5106) | :closed_lock_with_key:  | POST | `/v5/earn/pwm/investment-plan/redeem` |
| [getPwmInvestmentPlanOrders()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L5115) | :closed_lock_with_key:  | GET | `/v5/earn/pwm/investment-plan/order` |
| [getPwmSubscribableProductInfo()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L5124) |  | GET | `/v5/earn/pwm/customize-plan/product` |
| [createPwmCustomizeInvestmentPlan()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L5133) | :closed_lock_with_key:  | POST | `/v5/earn/pwm/customize-plan/create` |
| [getPwmAllFunds()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L5148) | :closed_lock_with_key:  | GET | `/v5/earn/pwm/asset-manager/all-funds` |
| [settlePwmFundProfit()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L5157) | :closed_lock_with_key:  | POST | `/v5/earn/pwm/asset-manager/settle-profit` |
| [createPwmFund()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L5166) | :closed_lock_with_key:  | POST | `/v5/earn/pwm/asset-manager/create-fund` |
| [createPwmAssetManagerInvestmentPlan()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L5175) | :closed_lock_with_key:  | POST | `/v5/earn/pwm/asset-manager/create-investment-plan` |
| [getPwmAssetManagerInvestmentPlans()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L5189) | :closed_lock_with_key:  | GET | `/v5/earn/pwm/asset-manager/get-investment-plan` |
| [managePwmAssetManagerInvestmentPlan()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L5201) | :closed_lock_with_key:  | POST | `/v5/earn/pwm/asset-manager/manage-investment-plan` |
| [getPwmAllFundOrders()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L5215) | :closed_lock_with_key:  | GET | `/v5/earn/pwm/asset-manager/all-order` |
| [managePwmFundOrder()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L5224) | :closed_lock_with_key:  | POST | `/v5/earn/pwm/asset-manager/manage-order` |
| [createPwmFundSubAccount()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L5233) | :closed_lock_with_key:  | POST | `/v5/earn/pwm/asset-manager/create-sub-account` |
| [pwmFundTransfer()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L5245) | :closed_lock_with_key:  | POST | `/v5/earn/pwm/fund-transfer` |
| [getPwmFundTransferRecords()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L5254) | :closed_lock_with_key:  | GET | `/v5/earn/pwm/query-fund-transfer-result` |
| [queryCardAssetRecords()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L5269) | :closed_lock_with_key:  | POST | `/v5/card/transaction/query-asset-records` |
| [queryCardPointsBalance()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L5278) | :closed_lock_with_key:  | POST | `/v5/card/reward/points/balance` |
| [queryCardPointsRecords()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L5285) | :closed_lock_with_key:  | POST | `/v5/card/reward/points/records` |
| [queryCardPointsTier()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L5294) | :closed_lock_with_key:  | POST | `/v5/card/reward/points/tier` |
| [queryCardMallItemList()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L5301) | :closed_lock_with_key:  | POST | `/v5/card/reward/mall/item/list` |
| [queryCardPointCashbackDetail()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L5310) | :closed_lock_with_key:  | POST | `/v5/card/reward/point/cashback/detail` |
| [createRFQ()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L5326) | :closed_lock_with_key:  | POST | `/v5/rfq/create-rfq` |
| [getRFQConfig()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L5337) | :closed_lock_with_key:  | GET | `/v5/rfq/config` |
| [cancelRFQ()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L5346) | :closed_lock_with_key:  | POST | `/v5/rfq/cancel-rfq` |
| [cancelAllRFQ()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L5356) | :closed_lock_with_key:  | POST | `/v5/rfq/cancel-all-rfq` |
| [createRFQQuote()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L5365) | :closed_lock_with_key:  | POST | `/v5/rfq/create-quote` |
| [executeRFQQuote()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L5376) | :closed_lock_with_key:  | POST | `/v5/rfq/execute-quote` |
| [cancelRFQQuote()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L5387) | :closed_lock_with_key:  | POST | `/v5/rfq/cancel-quote` |
| [cancelAllRFQQuotes()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L5397) | :closed_lock_with_key:  | POST | `/v5/rfq/cancel-all-quotes` |
| [getRFQRealtimeInfo()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L5411) | :closed_lock_with_key:  | GET | `/v5/rfq/rfq-realtime` |
| [getRFQHistory()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L5423) | :closed_lock_with_key:  | GET | `/v5/rfq/rfq-list` |
| [getRFQRealtimeQuote()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L5437) | :closed_lock_with_key:  | GET | `/v5/rfq/quote-realtime` |
| [getRFQHistoryQuote()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L5452) | :closed_lock_with_key:  | GET | `/v5/rfq/quote-list` |
| [getRFQTrades()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L5465) | :closed_lock_with_key:  | GET | `/v5/rfq/trade-list` |
| [getRFQPublicTrades()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L5478) | :closed_lock_with_key:  | GET | `/v5/rfq/public-trades` |
| [acceptNonLPQuote()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L5494) | :closed_lock_with_key:  | POST | `/v5/rfq/accept-other-quote` |
| [getP2PAccountCoinsBalance()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L5516) | :closed_lock_with_key:  | GET | `/v5/asset/transfer/query-account-coins-balance` |
| [getP2POnlineAds()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L5533) | :closed_lock_with_key:  | POST | `/v5/p2p/item/online` |
| [createP2PAd()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L5542) | :closed_lock_with_key:  | POST | `/v5/p2p/item/create` |
| [cancelP2PAd()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L5551) | :closed_lock_with_key:  | POST | `/v5/p2p/item/cancel` |
| [updateP2PAd()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L5565) | :closed_lock_with_key:  | POST | `/v5/p2p/item/update` |
| [getP2PPersonalAds()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L5575) | :closed_lock_with_key:  | POST | `/v5/p2p/item/personal/list` |
| [getP2PAdDetail()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L5584) | :closed_lock_with_key:  | POST | `/v5/p2p/item/info` |
| [getP2POrders()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L5599) | :closed_lock_with_key:  | POST | `/v5/p2p/order/simplifyList` |
| [getP2POrderDetail()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L5609) | :closed_lock_with_key:  | POST | `/v5/p2p/order/info` |
| [getP2PPendingOrders()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L5618) | :closed_lock_with_key:  | POST | `/v5/p2p/order/pending/simplifyList` |
| [markP2POrderAsPaid()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L5627) | :closed_lock_with_key:  | POST | `/v5/p2p/order/pay` |
| [releaseP2POrder()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L5636) | :closed_lock_with_key:  | POST | `/v5/p2p/order/finish` |
| [sendP2POrderMessage()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L5645) | :closed_lock_with_key:  | POST | `/v5/p2p/order/message/send` |
| [getP2POrderMessages()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L5679) | :closed_lock_with_key:  | POST | `/v5/p2p/order/message/listpage` |
| [getP2PUserInfo()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L5693) | :closed_lock_with_key:  | POST | `/v5/p2p/user/personal/info` |
| [getP2PCounterpartyUserInfo()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L5700) | :closed_lock_with_key:  | POST | `/v5/p2p/user/order/personal/info` |
| [getP2PUserPayments()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L5709) | :closed_lock_with_key:  | POST | `/v5/p2p/user/payment/list` |
| [setApiRateLimit()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L5729) | :closed_lock_with_key:  | POST | `/v5/apilimit/set` |
| [queryApiRateLimit()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L5758) | :closed_lock_with_key:  | GET | `/v5/apilimit/query` |
| [getRateLimitCap()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L5777) | :closed_lock_with_key:  | GET | `/v5/apilimit/query-cap` |
| [getAllRateLimits()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L5796) | :closed_lock_with_key:  | GET | `/v5/apilimit/query-all` |

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