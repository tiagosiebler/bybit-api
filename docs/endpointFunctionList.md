
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
| [getSystemStatus()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L595) | :closed_lock_with_key:  | GET | `/v5/system/status` |
| [getServerTime()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L612) |  | GET | `/v5/market/time` |
| [requestDemoTradingFunds()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L624) | :closed_lock_with_key:  | POST | `/v5/account/demo-apply-money` |
| [createDemoAccount()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L637) | :closed_lock_with_key:  | POST | `/v5/user/create-demo-member` |
| [getSpreadInstrumentsInfo()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L650) |  | GET | `/v5/spread/instrument` |
| [getSpreadOrderbook()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L662) |  | GET | `/v5/spread/orderbook` |
| [getSpreadTickers()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L672) |  | GET | `/v5/spread/tickers` |
| [getSpreadRecentTrades()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L683) |  | GET | `/v5/spread/recent-trade` |
| [getSpreadMaxQty()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L695) | :closed_lock_with_key:  | GET | `/v5/spread/max-qty` |
| [submitSpreadOrder()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L704) | :closed_lock_with_key:  | POST | `/v5/spread/order/create` |
| [amendSpreadOrder()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L717) | :closed_lock_with_key:  | POST | `/v5/spread/order/amend` |
| [cancelSpreadOrder()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L729) | :closed_lock_with_key:  | POST | `/v5/spread/order/cancel` |
| [cancelAllSpreadOrders()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L747) | :closed_lock_with_key:  | POST | `/v5/spread/order/cancel-all` |
| [getSpreadOpenOrders()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L766) | :closed_lock_with_key:  | GET | `/v5/spread/order/realtime` |
| [getSpreadOrderHistory()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L783) | :closed_lock_with_key:  | GET | `/v5/spread/order/history` |
| [getSpreadTradeHistory()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L799) | :closed_lock_with_key:  | GET | `/v5/spread/execution/list` |
| [getKline()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L819) |  | GET | `/v5/market/kline` |
| [getMarkPriceKline()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L836) |  | GET | `/v5/market/mark-price-kline` |
| [getIndexPriceKline()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L851) |  | GET | `/v5/market/index-price-kline` |
| [getPremiumIndexPriceKline()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L866) |  | GET | `/v5/market/premium-index-price-kline` |
| [getInstrumentsInfo()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L882) |  | GET | `/v5/market/instruments-info` |
| [getOrderbook()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L893) |  | GET | `/v5/market/orderbook` |
| [getRPIOrderbook()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L907) |  | GET | `/v5/market/rpi_orderbook` |
| [getTickers()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L913) |  | GET | `/v5/market/tickers` |
| [getFundingRateHistory()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L951) |  | GET | `/v5/market/funding/history` |
| [getPublicTradingHistory()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L966) |  | GET | `/v5/market/recent-trade` |
| [getOpenInterest()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L979) |  | GET | `/v5/market/open-interest` |
| [getHistoricalVolatility()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L989) |  | GET | `/v5/market/historical-volatility` |
| [getInsurance()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1000) |  | GET | `/v5/market/insurance` |
| [getRiskLimit()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1011) |  | GET | `/v5/market/risk-limit` |
| [getOptionDeliveryPrice()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1026) |  | GET | `/v5/market/delivery-price` |
| [getDeliveryPrice()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1039) |  | GET | `/v5/market/delivery-price` |
| [getNewDeliveryPrice()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1055) |  | GET | `/v5/market/new-delivery-price` |
| [getLongShortRatio()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1071) |  | GET | `/v5/market/account-ratio` |
| [getIndexPriceComponents()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1081) |  | GET | `/v5/market/index-price-components` |
| [getOrderPriceLimit()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1087) |  | GET | `/v5/market/price-limit` |
| [getADLAlert()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1101) |  | GET | `/v5/market/adlAlert` |
| [getFeeGroupStructure()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1114) |  | GET | `/v5/market/fee-group-info` |
| [submitOrder()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1126) | :closed_lock_with_key:  | POST | `/v5/order/create` |
| [amendOrder()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1132) | :closed_lock_with_key:  | POST | `/v5/order/amend` |
| [cancelOrder()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1138) | :closed_lock_with_key:  | POST | `/v5/order/cancel` |
| [getActiveOrders()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1147) | :closed_lock_with_key:  | GET | `/v5/order/realtime` |
| [cancelAllOrders()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1153) | :closed_lock_with_key:  | POST | `/v5/order/cancel-all` |
| [getHistoricOrders()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1166) | :closed_lock_with_key:  | GET | `/v5/order/history` |
| [getExecutionList()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1178) | :closed_lock_with_key:  | GET | `/v5/execution/list` |
| [batchSubmitOrders()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1196) | :closed_lock_with_key:  | POST | `/v5/order/create-batch` |
| [batchAmendOrders()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1221) | :closed_lock_with_key:  | POST | `/v5/order/amend-batch` |
| [batchCancelOrders()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1246) | :closed_lock_with_key:  | POST | `/v5/order/cancel-batch` |
| [getSpotBorrowCheck()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1268) | :closed_lock_with_key:  | GET | `/v5/order/spot-borrow-check` |
| [setDisconnectCancelAllWindow()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1289) | :closed_lock_with_key:  | POST | `/v5/order/disconnected-cancel-all` |
| [setDisconnectCancelAllWindowV2()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1307) | :closed_lock_with_key:  | POST | `/v5/order/disconnected-cancel-all` |
| [preCheckOrder()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1322) | :closed_lock_with_key:  | POST | `/v5/order/pre-check` |
| [createStrategyOrder()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1339) | :closed_lock_with_key:  | POST | `/v5/strategy/create` |
| [getStrategyList()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1350) | :closed_lock_with_key:  | GET | `/v5/strategy/list` |
| [getStrategyOrderList()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1361) | :closed_lock_with_key:  | GET | `/v5/strategy/order-list` |
| [stopStrategy()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1372) | :closed_lock_with_key:  | POST | `/v5/strategy/stop` |
| [getPositionInfo()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1397) | :closed_lock_with_key:  | GET | `/v5/position/list` |
| [setLeverage()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1412) | :closed_lock_with_key:  | POST | `/v5/position/set-leverage` |
| [switchIsolatedMargin()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1425) | :closed_lock_with_key:  | POST | `/v5/position/switch-isolated` |
| [setTPSLMode()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1439) | :closed_lock_with_key:  | POST | `/v5/position/set-tpsl-mode` |
| [switchPositionMode()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1454) | :closed_lock_with_key:  | POST | `/v5/position/switch-mode` |
| [setRiskLimit()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1468) | :closed_lock_with_key:  | POST | `/v5/position/set-risk-limit` |
| [setTradingStop()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1483) | :closed_lock_with_key:  | POST | `/v5/position/trading-stop` |
| [setAutoAddMargin()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1494) | :closed_lock_with_key:  | POST | `/v5/position/set-auto-add-margin` |
| [addOrReduceMargin()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1506) | :closed_lock_with_key:  | POST | `/v5/position/add-margin` |
| [getClosedPnL()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1518) | :closed_lock_with_key:  | GET | `/v5/position/closed-pnl` |
| [getClosedOptionsPositions()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1532) | :closed_lock_with_key:  | GET | `/v5/position/get-closed-positions` |
| [movePosition()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1557) | :closed_lock_with_key:  | POST | `/v5/position/move-positions` |
| [getMovePositionHistory()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1568) | :closed_lock_with_key:  | GET | `/v5/position/move-history` |
| [confirmNewRiskLimit()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1587) | :closed_lock_with_key:  | POST | `/v5/position/confirm-pending-mmr` |
| [getPreUpgradeOrderHistory()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1607) | :closed_lock_with_key:  | GET | `/v5/pre-upgrade/order/history` |
| [getPreUpgradeTradeHistory()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1622) | :closed_lock_with_key:  | GET | `/v5/pre-upgrade/execution/list` |
| [getPreUpgradeClosedPnl()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1633) | :closed_lock_with_key:  | GET | `/v5/pre-upgrade/position/closed-pnl` |
| [getPreUpgradeTransactions()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1647) | :closed_lock_with_key:  | GET | `/v5/pre-upgrade/account/transaction-log` |
| [getPreUpgradeOptionDeliveryRecord()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1664) | :closed_lock_with_key:  | GET | `/v5/pre-upgrade/asset/delivery-record` |
| [getPreUpgradeUSDCSessionSettlements()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1678) | :closed_lock_with_key:  | GET | `/v5/pre-upgrade/asset/settlement-record` |
| [getWalletBalance()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1699) | :closed_lock_with_key:  | GET | `/v5/account/wallet-balance` |
| [getTransferableAmount()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1710) | :closed_lock_with_key:  | GET | `/v5/account/withdrawal` |
| [getAccountInstrumentsInfo()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1727) | :closed_lock_with_key:  | GET | `/v5/account/instruments-info` |
| [upgradeToUnifiedAccount()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1738) | :closed_lock_with_key:  | POST | `/v5/account/upgrade-to-uta` |
| [getBorrowHistory()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1749) | :closed_lock_with_key:  | GET | `/v5/account/borrow-history` |
| [repayLiability()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1770) | :closed_lock_with_key:  | POST | `/v5/account/quick-repayment` |
| [manualRepay()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1795) | :closed_lock_with_key:  | POST | `/v5/account/repay` |
| [setCollateralCoin()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1804) | :closed_lock_with_key:  | POST | `/v5/account/set-collateral-switch` |
| [batchSetCollateralCoin()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1810) | :closed_lock_with_key:  | POST | `/v5/account/set-collateral-switch-batch` |
| [getCollateralInfo()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1820) | :closed_lock_with_key:  | GET | `/v5/account/collateral-info` |
| [getCoinGreeks()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1829) | :closed_lock_with_key:  | GET | `/v5/asset/coin-greeks` |
| [getFeeRate()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1842) | :closed_lock_with_key:  | GET | `/v5/account/fee-rate` |
| [getAccountInfo()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1851) | :closed_lock_with_key:  | GET | `/v5/account/info` |
| [getDCPInfo()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1864) | :closed_lock_with_key:  | GET | `/v5/account/query-dcp-info` |
| [getTransactionLog()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1871) | :closed_lock_with_key:  | GET | `/v5/account/transaction-log` |
| [getClassicTransactionLogs()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1882) | :closed_lock_with_key:  | GET | `/v5/account/contract-transaction-log` |
| [getSMPGroup()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1893) | :closed_lock_with_key:  | GET | `/v5/account/smp-group` |
| [setMarginMode()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1906) | :closed_lock_with_key:  | POST | `/v5/account/set-margin-mode` |
| [setSpotHedging()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1923) | :closed_lock_with_key:  | POST | `/v5/account/set-hedging-mode` |
| [setLimitPriceAction()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1936) | :closed_lock_with_key:  | POST | `/v5/account/set-limit-px-action` |
| [getLimitPriceAction()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1947) | :closed_lock_with_key:  | GET | `/v5/account/user-setting-config` |
| [setDeltaNeutralMode()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1955) | :closed_lock_with_key:  | POST | `/v5/account/set-delta-mode` |
| [setMMP()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1964) | :closed_lock_with_key:  | POST | `/v5/account/mmp-modify` |
| [resetMMP()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1971) | :closed_lock_with_key:  | POST | `/v5/account/mmp-reset` |
| [getMMPState()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1978) | :closed_lock_with_key:  | GET | `/v5/account/mmp-state` |
| [getOptionAssetInfo()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1988) | :closed_lock_with_key:  | GET | `/v5/account/option-asset-info` |
| [getPayInfo()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1998) | :closed_lock_with_key:  | GET | `/v5/account/pay-info` |
| [getTradeInfoForAnalysis()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2008) | :closed_lock_with_key:  | GET | `/v5/account/trade-info-for-analysis` |
| [getAssetOverview()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2028) | :closed_lock_with_key:  | GET | `/v5/asset/asset-overview` |
| [getPortfolioMarginInfo()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2038) | :closed_lock_with_key:  | GET | `/v5/asset/portfolio-margin` |
| [getTotalMembersAssets()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2048) | :closed_lock_with_key:  | GET | `/v5/asset/total-members-assets` |
| [getFundingAccountTransactionHistory()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2060) | :closed_lock_with_key:  | GET | `/v5/asset/fundinghistory` |
| [getDeliveryRecord()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2076) | :closed_lock_with_key:  | GET | `/v5/asset/delivery-record` |
| [getSettlementRecords()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2087) | :closed_lock_with_key:  | GET | `/v5/asset/settlement-record` |
| [getCoinExchangeRecords()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2100) | :closed_lock_with_key:  | GET | `/v5/asset/exchange/order-record` |
| [getCoinInfo()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2115) | :closed_lock_with_key:  | GET | `/v5/asset/coin/query-info` |
| [getSubUID()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2129) | :closed_lock_with_key:  | GET | `/v5/asset/transfer/query-sub-member-list` |
| [getAssetInfo()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2144) | :closed_lock_with_key:  | GET | `/v5/asset/transfer/query-asset-info` |
| [getAllCoinsBalance()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2155) | :closed_lock_with_key:  | GET | `/v5/asset/transfer/query-account-coins-balance` |
| [getCoinBalance()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2169) | :closed_lock_with_key:  | GET | `/v5/asset/transfer/query-account-coin-balance` |
| [getWithdrawableAmount()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2183) | :closed_lock_with_key:  | GET | `/v5/asset/withdraw/withdrawable-amount` |
| [getTransferableCoinList()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2192) | :closed_lock_with_key:  | GET | `/v5/asset/transfer/query-transfer-coin-list` |
| [createInternalTransfer()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2208) | :closed_lock_with_key:  | POST | `/v5/asset/transfer/inter-transfer` |
| [getInternalTransferRecords()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2227) | :closed_lock_with_key:  | GET | `/v5/asset/transfer/query-inter-transfer-list` |
| [enableUniversalTransferForSubUIDs()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2247) | :closed_lock_with_key:  | POST | `/v5/asset/transfer/save-transfer-sub-member` |
| [createUniversalTransfer()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2258) | :closed_lock_with_key:  | POST | `/v5/asset/transfer/universal-transfer` |
| [getUniversalTransferRecords()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2270) | :closed_lock_with_key:  | GET | `/v5/asset/transfer/query-universal-transfer-list` |
| [getAllowedDepositCoinInfo()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2283) | :closed_lock_with_key:  | GET | `/v5/asset/deposit/query-allowed-list` |
| [setDepositAccount()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2298) | :closed_lock_with_key:  | POST | `/v5/asset/deposit/deposit-to-account` |
| [getDepositRecords()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2314) | :closed_lock_with_key:  | GET | `/v5/asset/deposit/query-record` |
| [getSubAccountDepositRecords()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2329) | :closed_lock_with_key:  | GET | `/v5/asset/deposit/query-sub-member-record` |
| [getInternalDepositRecords()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2345) | :closed_lock_with_key:  | GET | `/v5/asset/deposit/query-internal-record` |
| [getMasterDepositAddress()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2357) | :closed_lock_with_key:  | GET | `/v5/asset/deposit/query-address` |
| [getSubDepositAddress()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2375) | :closed_lock_with_key:  | GET | `/v5/asset/deposit/query-sub-member-address` |
| [querySubMemberAddress()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2400) | :closed_lock_with_key:  | GET | `/v5/asset/deposit/query-sub-member-address` |
| [getWithdrawalRecords()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2420) | :closed_lock_with_key:  | GET | `/v5/asset/withdraw/query-record` |
| [getWithdrawalAddressList()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2432) | :closed_lock_with_key:  | GET | `/v5/asset/withdraw/query-address` |
| [getExchangeEntities()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2446) | :closed_lock_with_key:  | GET | `/v5/asset/withdraw/vasp/list` |
| [submitWithdrawal()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2461) | :closed_lock_with_key:  | POST | `/v5/asset/withdraw/create` |
| [cancelWithdrawal()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2472) | :closed_lock_with_key:  | POST | `/v5/asset/withdraw/cancel` |
| [getConvertCoins()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2481) | :closed_lock_with_key:  | GET | `/v5/asset/exchange/query-coin-list` |
| [requestConvertQuote()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2492) | :closed_lock_with_key:  | POST | `/v5/asset/exchange/quote-apply` |
| [confirmConvertQuote()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2501) | :closed_lock_with_key:  | POST | `/v5/asset/exchange/convert-execute` |
| [getConvertStatus()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2513) | :closed_lock_with_key:  | GET | `/v5/asset/exchange/convert-result-query` |
| [getConvertHistory()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2532) | :closed_lock_with_key:  | GET | `/v5/asset/exchange/query-convert-history` |
| [getSmallBalanceList()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2549) | :closed_lock_with_key:  | GET | `/v5/asset/covert/small-balance-list` |
| [getFiatTradingPairList()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2563) | :closed_lock_with_key:  | GET | `/v5/fiat/query-coin-list` |
| [createSubMember()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2581) | :closed_lock_with_key:  | POST | `/v5/user/create-sub-member` |
| [createSubUIDAPIKey()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2593) | :closed_lock_with_key:  | POST | `/v5/user/create-sub-api` |
| [getSubUIDList()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2602) | :closed_lock_with_key:  | GET | `/v5/user/query-sub-members` |
| [getSubUIDListUnlimited()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2611) | :closed_lock_with_key:  | GET | `/v5/user/submembers` |
| [setSubUIDFrozenState()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2629) | :closed_lock_with_key:  | POST | `/v5/user/frozen-sub-member` |
| [getQueryApiKey()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2644) | :closed_lock_with_key:  | GET | `/v5/user/query-api` |
| [getSubAccountAllApiKeys()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2651) | :closed_lock_with_key:  | GET | `/v5/user/sub-apikeys` |
| [getUIDWalletType()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2660) | :closed_lock_with_key:  | GET | `/v5/user/get-member-type` |
| [updateMasterApiKey()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2679) | :closed_lock_with_key:  | POST | `/v5/user/update-api` |
| [updateSubApiKey()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2693) | :closed_lock_with_key:  | POST | `/v5/user/update-sub-api` |
| [deleteSubMember()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2706) | :closed_lock_with_key:  | POST | `/v5/user/del-submember` |
| [deleteMasterApiKey()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2721) | :closed_lock_with_key:  | POST | `/v5/user/delete-api` |
| [deleteSubApiKey()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2735) | :closed_lock_with_key:  | POST | `/v5/user/delete-sub-api` |
| [getAffiliateUserList()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2755) | :closed_lock_with_key:  | GET | `/v5/affiliate/aff-user-list` |
| [getAffiliateSubAffiliateList()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2773) | :closed_lock_with_key:  | GET | `/v5/affiliate/affiliate-sub-list` |
| [getAffiliateUserInfo()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2789) | :closed_lock_with_key:  | GET | `/v5/user/aff-customer-info` |
| [getFriendReferrals()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2801) | :closed_lock_with_key:  | GET | `/v5/user/invitation/referrals` |
| [signAgreement()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2822) | :closed_lock_with_key:  | POST | `/v5/user/agreement` |
| [getAlphaTradeQuote()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2839) | :closed_lock_with_key:  | POST | `/v5/alpha/trade/quote` |
| [executeAlphaTradePurchase()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2850) | :closed_lock_with_key:  | POST | `/v5/alpha/trade/purchase` |
| [executeAlphaTradeRedeem()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2861) | :closed_lock_with_key:  | POST | `/v5/alpha/trade/redeem` |
| [getAlphaPayTokenList()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2871) | :closed_lock_with_key:  | POST | `/v5/alpha/trade/pay-token-list` |
| [getAlphaTradeOrderList()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2881) | :closed_lock_with_key:  | POST | `/v5/alpha/trade/order-list` |
| [getAlphaBizTokenList()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2891) | :closed_lock_with_key:  | POST | `/v5/alpha/trade/biz-token-list` |
| [getAlphaBizTokenPriceList()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2901) | :closed_lock_with_key:  | POST | `/v5/alpha/trade/biz-token-price-list` |
| [getAlphaBizTokenDetails()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2911) | :closed_lock_with_key:  | POST | `/v5/alpha/trade/biz-token-details` |
| [getAlphaAssetList()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2921) | :closed_lock_with_key:  | POST | `/v5/alpha/trade/asset-list` |
| [getAlphaAssetDetail()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2929) | :closed_lock_with_key:  | POST | `/v5/alpha/trade/asset-detail` |
| [getVIPMarginData()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2949) |  | GET | `/v5/spot-margin-trade/data` |
| [getHistoricalInterestRate()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2960) | :closed_lock_with_key:  | GET | `/v5/spot-margin-trade/interest-rate-history` |
| [getSpotMarginCurrencyData()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2985) | :closed_lock_with_key:  | GET | `/v5/spot-margin-trade/currency-data` |
| [toggleSpotMarginTrade()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2997) | :closed_lock_with_key:  | POST | `/v5/spot-margin-trade/switch-mode` |
| [setSpotMarginLeverage()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3008) | :closed_lock_with_key:  | POST | `/v5/spot-margin-trade/set-leverage` |
| [setSpotMarginLeverageV2()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3016) | :closed_lock_with_key:  | POST | `/v5/spot-margin-trade/set-leverage` |
| [getSpotMarginState()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3027) | :closed_lock_with_key:  | GET | `/v5/spot-margin-trade/state` |
| [manualBorrow()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3034) | :closed_lock_with_key:  | POST | `/v5/account/borrow` |
| [getMaxBorrowableAmount()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3043) | :closed_lock_with_key:  | GET | `/v5/spot-margin-trade/max-borrowable` |
| [getPositionTiers()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3052) | :closed_lock_with_key:  | GET | `/v5/spot-margin-trade/position-tiers` |
| [getCoinState()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3063) | :closed_lock_with_key:  | GET | `/v5/spot-margin-trade/coinstate` |
| [getAvailableAmountToRepay()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3074) | :closed_lock_with_key:  | GET | `/v5/spot-margin-trade/repayment-available-amount` |
| [manualRepayWithoutConversion()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3093) | :closed_lock_with_key:  | POST | `/v5/account/no-convert-repay` |
| [getAutoRepayMode()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3106) | :closed_lock_with_key:  | GET | `/v5/spot-margin-trade/get-auto-repay-mode` |
| [setAutoRepayMode()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3122) | :closed_lock_with_key:  | POST | `/v5/spot-margin-trade/set-auto-repay-mode` |
| [getSpotMarginLiability()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3134) | :closed_lock_with_key:  | GET | `/v5/spot-margin-trade/liability` |
| [submitFixedRateBorrow()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3143) | :closed_lock_with_key:  | POST | `/v5/spot-margin-trade/fixedborrow` |
| [getFixedRateBorrowOrderInfo()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3152) | :closed_lock_with_key:  | GET | `/v5/spot-margin-trade/fixedborrow-order-info` |
| [getFixedRateBorrowContractInfo()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3169) | :closed_lock_with_key:  | GET | `/v5/spot-margin-trade/fixedborrow-contract-info` |
| [getFixedRateBorrowOrderQuote()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3186) | :closed_lock_with_key:  | GET | `/v5/spot-margin-trade/fixedborrow-order-quote` |
| [renewFixedRateBorrow()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3198) | :closed_lock_with_key:  | POST | `/v5/spot-margin-trade/fixedborrow-renew` |
| [getSpotMarginCoinInfo()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3213) | :closed_lock_with_key:  | GET | `/v5/spot-cross-margin-trade/pledge-token` |
| [getSpotMarginBorrowableCoinInfo()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3230) | :closed_lock_with_key:  | GET | `/v5/spot-cross-margin-trade/borrow-token` |
| [getSpotMarginInterestAndQuota()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3247) | :closed_lock_with_key:  | GET | `/v5/spot-cross-margin-trade/loan-info` |
| [getSpotMarginLoanAccountInfo()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3265) | :closed_lock_with_key:  | GET | `/v5/spot-cross-margin-trade/account` |
| [spotMarginBorrow()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3289) | :closed_lock_with_key:  | POST | `/v5/spot-cross-margin-trade/loan` |
| [spotMarginRepay()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3300) | :closed_lock_with_key:  | POST | `/v5/spot-cross-margin-trade/repay` |
| [getSpotMarginBorrowOrderDetail()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3315) | :closed_lock_with_key:  | GET | `/v5/spot-cross-margin-trade/orders` |
| [getSpotMarginRepaymentOrderDetail()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3344) | :closed_lock_with_key:  | GET | `/v5/spot-cross-margin-trade/repay-history` |
| [toggleSpotCrossMarginTrade()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3373) | :closed_lock_with_key:  | POST | `/v5/spot-cross-margin-trade/switch` |
| [getCollateralCoins()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3393) |  | GET | `/v5/crypto-loan/collateral-data` |
| [getBorrowableCoins()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3410) |  | GET | `/v5/crypto-loan/loanable-data` |
| [getAccountBorrowCollateralLimit()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3428) | :closed_lock_with_key:  | GET | `/v5/crypto-loan/borrowable-collateralisable-number` |
| [borrowCryptoLoan()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3448) | :closed_lock_with_key:  | POST | `/v5/crypto-loan/borrow` |
| [repayCryptoLoan()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3469) | :closed_lock_with_key:  | POST | `/v5/crypto-loan/repay` |
| [getUnpaidLoanOrders()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3485) | :closed_lock_with_key:  | GET | `/v5/crypto-loan/ongoing-orders` |
| [getRepaymentHistory()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3506) | :closed_lock_with_key:  | GET | `/v5/crypto-loan/repayment-history` |
| [getCompletedLoanOrderHistory()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3526) | :closed_lock_with_key:  | GET | `/v5/crypto-loan/borrow-history` |
| [getMaxAllowedReductionCollateralAmount()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3545) | :closed_lock_with_key:  | GET | `/v5/crypto-loan/max-collateral-amount` |
| [adjustCollateralAmount()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3564) | :closed_lock_with_key:  | POST | `/v5/crypto-loan/adjust-ltv` |
| [getLoanLTVAdjustmentHistory()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3588) | :closed_lock_with_key:  | GET | `/v5/crypto-loan/adjustment-history` |
| [getLoanBorrowableCoins()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3609) |  | GET | `/v5/crypto-loan-common/loanable-data` |
| [getLoanCollateralCoins()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3621) |  | GET | `/v5/crypto-loan-common/collateral-data` |
| [getMaxCollateralAmount()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3631) | :closed_lock_with_key:  | GET | `/v5/crypto-loan-common/max-collateral-amount` |
| [getMaxLoanAmount()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3650) | :closed_lock_with_key:  | POST | `/v5/crypto-loan-common/max-loan` |
| [updateCollateralAmount()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3660) | :closed_lock_with_key:  | POST | `/v5/crypto-loan-common/adjust-ltv` |
| [getCollateralAdjustmentHistory()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3671) | :closed_lock_with_key:  | GET | `/v5/crypto-loan-common/adjustment-history` |
| [getCryptoLoanPosition()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3686) | :closed_lock_with_key:  | GET | `/v5/crypto-loan-common/position` |
| [borrowFlexible()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3703) | :closed_lock_with_key:  | POST | `/v5/crypto-loan-flexible/borrow` |
| [repayFlexible()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3714) | :closed_lock_with_key:  | POST | `/v5/crypto-loan-flexible/repay` |
| [repayCollateralFlexible()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3724) | :closed_lock_with_key:  | POST | `/v5/crypto-loan-flexible/repay-collateral` |
| [getOngoingFlexibleLoans()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3738) | :closed_lock_with_key:  | GET | `/v5/crypto-loan-flexible/ongoing-coin` |
| [getBorrowHistoryFlexible()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3750) | :closed_lock_with_key:  | GET | `/v5/crypto-loan-flexible/borrow-history` |
| [getRepaymentHistoryFlexible()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3763) | :closed_lock_with_key:  | GET | `/v5/crypto-loan-flexible/repayment-history` |
| [getSupplyOrderQuoteFixed()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3788) |  | GET | `/v5/crypto-loan-fixed/supply-order-quote` |
| [getBorrowOrderQuoteFixed()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3801) |  | GET | `/v5/crypto-loan-fixed/borrow-order-quote` |
| [createBorrowOrderFixed()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3814) | :closed_lock_with_key:  | POST | `/v5/crypto-loan-fixed/borrow` |
| [createSupplyOrderFixed()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3827) | :closed_lock_with_key:  | POST | `/v5/crypto-loan-fixed/supply` |
| [cancelBorrowOrderFixed()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3837) | :closed_lock_with_key:  | POST | `/v5/crypto-loan-fixed/borrow-order-cancel` |
| [cancelSupplyOrderFixed()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3851) | :closed_lock_with_key:  | POST | `/v5/crypto-loan-fixed/supply-order-cancel` |
| [getBorrowContractInfoFixed()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3864) | :closed_lock_with_key:  | GET | `/v5/crypto-loan-fixed/borrow-contract-info` |
| [getSupplyContractInfoFixed()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3882) | :closed_lock_with_key:  | GET | `/v5/crypto-loan-fixed/supply-contract-info` |
| [getBorrowOrderInfoFixed()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3900) | :closed_lock_with_key:  | GET | `/v5/crypto-loan-fixed/borrow-order-info` |
| [getSupplyOrderInfoFixed()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3913) | :closed_lock_with_key:  | GET | `/v5/crypto-loan-fixed/supply-order-info` |
| [repayFixed()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3927) | :closed_lock_with_key:  | POST | `/v5/crypto-loan-fixed/fully-repay` |
| [repayCollateralFixed()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3938) | :closed_lock_with_key:  | POST | `/v5/crypto-loan-flexible/repay-collateral` |
| [getRepaymentHistoryFixed()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3951) | :closed_lock_with_key:  | GET | `/v5/crypto-loan-fixed/repayment-history` |
| [renewBorrowOrderFixed()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3968) | :closed_lock_with_key:  | POST | `/v5/crypto-loan-fixed/renew` |
| [getRenewOrderInfoFixed()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3981) | :closed_lock_with_key:  | GET | `/v5/crypto-loan-fixed/renew-info` |
| [getInstitutionalLendingProductInfo()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L3999) |  | GET | `/v5/ins-loan/product-infos` |
| [getInstitutionalLendingMarginCoinInfo()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4009) |  | GET | `/v5/ins-loan/ensure-tokens` |
| [getInstitutionalLendingMarginCoinInfoWithConversionRate()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4018) |  | GET | `/v5/ins-loan/ensure-tokens-convert` |
| [getInstitutionalLendingLoanOrders()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4027) | :closed_lock_with_key:  | GET | `/v5/ins-loan/loan-order` |
| [getInstitutionalLendingRepayOrders()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4039) | :closed_lock_with_key:  | GET | `/v5/ins-loan/repaid-history` |
| [getInstitutionalLendingLTV()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4051) | :closed_lock_with_key:  | GET | `/v5/ins-loan/ltv` |
| [getInstitutionalLendingLTVWithLadderConversionRate()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4060) | :closed_lock_with_key:  | GET | `/v5/ins-loan/ltv-convert` |
| [bindOrUnbindUID()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4075) | :closed_lock_with_key:  | POST | `/v5/ins-loan/association-uid` |
| [repayInstitutionalLoan()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4095) | :closed_lock_with_key:  | POST | `/v5/ins-loan/repay-loan` |
| [getExchangeBrokerEarnings()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4116) | :closed_lock_with_key:  | GET | `/v5/broker/earnings-info` |
| [getExchangeBrokerAccountInfo()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4129) | :closed_lock_with_key:  | GET | `/v5/broker/account-info` |
| [getBrokerSubAccountDeposits()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4145) | :closed_lock_with_key:  | GET | `/v5/broker/asset/query-sub-member-deposit-record` |
| [getBrokerVoucherSpec()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4160) | :closed_lock_with_key:  | POST | `/v5/broker/award/info` |
| [issueBrokerVoucher()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4172) | :closed_lock_with_key:  | POST | `/v5/broker/award/distribute-award` |
| [getBrokerIssuedVoucher()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4184) | :closed_lock_with_key:  | POST | `/v5/broker/award/distribution-record` |
| [setBrokerRateLimit()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4201) | :closed_lock_with_key:  | POST | `/v5/broker/apilimit/set` |
| [getBrokerRateLimitCap()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4220) | :closed_lock_with_key:  | GET | `/v5/broker/apilimit/query-cap` |
| [getAllBrokerRateLimits()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4238) | :closed_lock_with_key:  | GET | `/v5/broker/apilimit/query-all` |
| [getEarnProduct()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4258) |  | GET | `/v5/earn/product` |
| [getHoldToEarnAirdropProducts()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4271) |  | GET | `/v5/earn/hold-to-earn/product` |
| [getAdvanceEarnProduct()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4282) |  | GET | `/v5/earn/advance/product` |
| [getLiquidityMiningProduct()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4293) |  | GET | `/v5/earn/liquidity-mining/product` |
| [getFixedTermEarnProduct()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4304) |  | GET | `/v5/earn/fixed-term/product` |
| [getAdvanceEarnProductExtraInfo()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4316) |  | GET | `/v5/earn/advance/product-extra-info` |
| [submitAdvanceEarnPlaceOrder()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4327) | :closed_lock_with_key:  | POST | `/v5/earn/advance/place-order` |
| [getAdvanceEarnPosition()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4338) | :closed_lock_with_key:  | GET | `/v5/earn/advance/position` |
| [getAdvanceEarnOrder()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4349) | :closed_lock_with_key:  | GET | `/v5/earn/advance/order` |
| [submitFixedTermEarnOrder()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4360) | :closed_lock_with_key:  | POST | `/v5/earn/fixed-term/place-order` |
| [redeemFixedTermEarn()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4371) | :closed_lock_with_key:  | POST | `/v5/earn/fixed-term/redeem` |
| [getFixedTermEarnPosition()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4382) | :closed_lock_with_key:  | GET | `/v5/earn/fixed-term/position` |
| [getFixedTermEarnOrder()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4393) | :closed_lock_with_key:  | GET | `/v5/earn/fixed-term/order` |
| [setFixedTermEarnAutoInvest()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4404) | :closed_lock_with_key:  | POST | `/v5/earn/fixed-term/position/auto-invest` |
| [submitStakeRedeem()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4420) | :closed_lock_with_key:  | POST | `/v5/earn/place-order` |
| [getEarnOrderHistory()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4439) | :closed_lock_with_key:  | GET | `/v5/earn/order` |
| [getEarnPosition()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4457) | :closed_lock_with_key:  | GET | `/v5/earn/position` |
| [modifyEarnPosition()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4470) | :closed_lock_with_key:  | POST | `/v5/earn/position/modify` |
| [getEarnYieldHistory()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4483) | :closed_lock_with_key:  | GET | `/v5/earn/yield` |
| [getHoldToEarnAirdropYieldHistory()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4497) | :closed_lock_with_key:  | GET | `/v5/earn/hold-to-earn/yield-history` |
| [getEarnHourlyYieldHistory()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4508) | :closed_lock_with_key:  | GET | `/v5/earn/hourly-yield` |
| [getEarnAprHistory()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4522) |  | GET | `/v5/earn/apr-history` |
| [getEarnTokenProduct()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4532) |  | GET | `/v5/earn/token/product` |
| [submitEarnTokenOrder()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4541) | :closed_lock_with_key:  | POST | `/v5/earn/token/place-order` |
| [getEarnTokenOrders()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4550) | :closed_lock_with_key:  | GET | `/v5/earn/token/order` |
| [getEarnTokenPosition()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4562) | :closed_lock_with_key:  | GET | `/v5/earn/token/position` |
| [getEarnTokenDailyYield()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4571) | :closed_lock_with_key:  | GET | `/v5/earn/token/yield` |
| [getEarnTokenHourlyYield()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4583) | :closed_lock_with_key:  | GET | `/v5/earn/token/hourly-yield` |
| [getEarnTokenHistoryApr()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4595) |  | GET | `/v5/earn/token/history-apr` |
| [getPwmInvestmentPlanList()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4610) | :closed_lock_with_key:  | GET | `/v5/earn/pwm/investment-plan/list` |
| [getPwmInvestmentPlanDetail()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4619) | :closed_lock_with_key:  | GET | `/v5/earn/pwm/investment-plan/detail` |
| [getPwmPendingInvestmentPlanDetail()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4628) | :closed_lock_with_key:  | GET | `/v5/earn/pwm/investment-plan/new-plan` |
| [claimPwmWithdrawableFunds()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4637) | :closed_lock_with_key:  | POST | `/v5/earn/pwm/investment-plan/claim` |
| [getPwmInvestmentPlanAssetTrend()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4646) | :closed_lock_with_key:  | GET | `/v5/earn/pwm/investment-plan/asset-trend` |
| [getPwmFundHistoricalNav()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4655) | :closed_lock_with_key:  | GET | `/v5/earn/pwm/investment-plan/fund-nav` |
| [subscribePwmInvestmentPlan()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4664) | :closed_lock_with_key:  | POST | `/v5/earn/pwm/investment-plan/subscribe` |
| [investMorePwmInvestmentPlan()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4673) | :closed_lock_with_key:  | POST | `/v5/earn/pwm/investment-plan/invest-more` |
| [redeemPwmInvestmentPlan()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4682) | :closed_lock_with_key:  | POST | `/v5/earn/pwm/investment-plan/redeem` |
| [getPwmInvestmentPlanOrders()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4691) | :closed_lock_with_key:  | GET | `/v5/earn/pwm/investment-plan/order` |
| [getPwmSubscribableProductInfo()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4700) |  | GET | `/v5/earn/pwm/customize-plan/product` |
| [createPwmCustomizeInvestmentPlan()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4709) | :closed_lock_with_key:  | POST | `/v5/earn/pwm/customize-plan/create` |
| [getPwmAllFunds()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4724) | :closed_lock_with_key:  | GET | `/v5/earn/pwm/asset-manager/all-funds` |
| [settlePwmFundProfit()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4733) | :closed_lock_with_key:  | POST | `/v5/earn/pwm/asset-manager/settle-profit` |
| [createPwmFund()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4742) | :closed_lock_with_key:  | POST | `/v5/earn/pwm/asset-manager/create-fund` |
| [createPwmAssetManagerInvestmentPlan()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4751) | :closed_lock_with_key:  | POST | `/v5/earn/pwm/asset-manager/create-investment-plan` |
| [getPwmAssetManagerInvestmentPlans()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4765) | :closed_lock_with_key:  | GET | `/v5/earn/pwm/asset-manager/get-investment-plan` |
| [managePwmAssetManagerInvestmentPlan()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4777) | :closed_lock_with_key:  | POST | `/v5/earn/pwm/asset-manager/manage-investment-plan` |
| [getPwmAllFundOrders()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4791) | :closed_lock_with_key:  | GET | `/v5/earn/pwm/asset-manager/all-order` |
| [managePwmFundOrder()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4800) | :closed_lock_with_key:  | POST | `/v5/earn/pwm/asset-manager/manage-order` |
| [createPwmFundSubAccount()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4809) | :closed_lock_with_key:  | POST | `/v5/earn/pwm/asset-manager/create-sub-account` |
| [pwmFundTransfer()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4821) | :closed_lock_with_key:  | POST | `/v5/earn/pwm/fund-transfer` |
| [getPwmFundTransferRecords()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4830) | :closed_lock_with_key:  | GET | `/v5/earn/pwm/query-fund-transfer-result` |
| [queryCardAssetRecords()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4845) | :closed_lock_with_key:  | POST | `/v5/card/transaction/query-asset-records` |
| [queryCardPointsBalance()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4854) | :closed_lock_with_key:  | POST | `/v5/card/reward/points/balance` |
| [queryCardPointsRecords()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4861) | :closed_lock_with_key:  | POST | `/v5/card/reward/points/records` |
| [queryCardPointsTier()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4870) | :closed_lock_with_key:  | POST | `/v5/card/reward/points/tier` |
| [queryCardMallItemList()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4877) | :closed_lock_with_key:  | POST | `/v5/card/reward/mall/item/list` |
| [queryCardPointCashbackDetail()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4886) | :closed_lock_with_key:  | POST | `/v5/card/reward/point/cashback/detail` |
| [createRFQ()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4902) | :closed_lock_with_key:  | POST | `/v5/rfq/create-rfq` |
| [getRFQConfig()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4913) | :closed_lock_with_key:  | GET | `/v5/rfq/config` |
| [cancelRFQ()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4922) | :closed_lock_with_key:  | POST | `/v5/rfq/cancel-rfq` |
| [cancelAllRFQ()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4932) | :closed_lock_with_key:  | POST | `/v5/rfq/cancel-all-rfq` |
| [createRFQQuote()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4941) | :closed_lock_with_key:  | POST | `/v5/rfq/create-quote` |
| [executeRFQQuote()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4952) | :closed_lock_with_key:  | POST | `/v5/rfq/execute-quote` |
| [cancelRFQQuote()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4963) | :closed_lock_with_key:  | POST | `/v5/rfq/cancel-quote` |
| [cancelAllRFQQuotes()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4973) | :closed_lock_with_key:  | POST | `/v5/rfq/cancel-all-quotes` |
| [getRFQRealtimeInfo()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4987) | :closed_lock_with_key:  | GET | `/v5/rfq/rfq-realtime` |
| [getRFQHistory()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L4999) | :closed_lock_with_key:  | GET | `/v5/rfq/rfq-list` |
| [getRFQRealtimeQuote()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L5013) | :closed_lock_with_key:  | GET | `/v5/rfq/quote-realtime` |
| [getRFQHistoryQuote()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L5028) | :closed_lock_with_key:  | GET | `/v5/rfq/quote-list` |
| [getRFQTrades()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L5041) | :closed_lock_with_key:  | GET | `/v5/rfq/trade-list` |
| [getRFQPublicTrades()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L5054) | :closed_lock_with_key:  | GET | `/v5/rfq/public-trades` |
| [acceptNonLPQuote()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L5070) | :closed_lock_with_key:  | POST | `/v5/rfq/accept-other-quote` |
| [getP2PAccountCoinsBalance()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L5092) | :closed_lock_with_key:  | GET | `/v5/asset/transfer/query-account-coins-balance` |
| [getP2POnlineAds()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L5109) | :closed_lock_with_key:  | POST | `/v5/p2p/item/online` |
| [createP2PAd()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L5118) | :closed_lock_with_key:  | POST | `/v5/p2p/item/create` |
| [cancelP2PAd()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L5127) | :closed_lock_with_key:  | POST | `/v5/p2p/item/cancel` |
| [updateP2PAd()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L5141) | :closed_lock_with_key:  | POST | `/v5/p2p/item/update` |
| [getP2PPersonalAds()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L5151) | :closed_lock_with_key:  | POST | `/v5/p2p/item/personal/list` |
| [getP2PAdDetail()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L5160) | :closed_lock_with_key:  | POST | `/v5/p2p/item/info` |
| [getP2POrders()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L5175) | :closed_lock_with_key:  | POST | `/v5/p2p/order/simplifyList` |
| [getP2POrderDetail()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L5185) | :closed_lock_with_key:  | POST | `/v5/p2p/order/info` |
| [getP2PPendingOrders()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L5194) | :closed_lock_with_key:  | POST | `/v5/p2p/order/pending/simplifyList` |
| [markP2POrderAsPaid()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L5203) | :closed_lock_with_key:  | POST | `/v5/p2p/order/pay` |
| [releaseP2POrder()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L5212) | :closed_lock_with_key:  | POST | `/v5/p2p/order/finish` |
| [sendP2POrderMessage()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L5221) | :closed_lock_with_key:  | POST | `/v5/p2p/order/message/send` |
| [getP2POrderMessages()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L5255) | :closed_lock_with_key:  | POST | `/v5/p2p/order/message/listpage` |
| [getP2PUserInfo()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L5269) | :closed_lock_with_key:  | POST | `/v5/p2p/user/personal/info` |
| [getP2PCounterpartyUserInfo()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L5276) | :closed_lock_with_key:  | POST | `/v5/p2p/user/order/personal/info` |
| [getP2PUserPayments()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L5285) | :closed_lock_with_key:  | POST | `/v5/p2p/user/payment/list` |
| [setApiRateLimit()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L5305) | :closed_lock_with_key:  | POST | `/v5/apilimit/set` |
| [queryApiRateLimit()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L5334) | :closed_lock_with_key:  | GET | `/v5/apilimit/query` |
| [getRateLimitCap()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L5353) | :closed_lock_with_key:  | GET | `/v5/apilimit/query-cap` |
| [getAllRateLimits()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L5372) | :closed_lock_with_key:  | GET | `/v5/apilimit/query-all` |

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