
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
| [fetchServerTime()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L305) |  | GET | `/v5/market/time` |
| [requestDemoTradingFunds()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L316) | :closed_lock_with_key:  | POST | `/v5/account/demo-apply-money` |
| [getKline()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L331) |  | GET | `/v5/market/kline` |
| [getMarkPriceKline()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L346) |  | GET | `/v5/market/mark-price-kline` |
| [getIndexPriceKline()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L361) |  | GET | `/v5/market/index-price-kline` |
| [getPremiumIndexPriceKline()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L376) |  | GET | `/v5/market/premium-index-price-kline` |
| [getOrderbook()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L402) |  | GET | `/v5/market/orderbook` |
| [getTickers()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L408) |  | GET | `/v5/market/tickers` |
| [getFundingRateHistory()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L446) |  | GET | `/v5/market/funding/history` |
| [getPublicTradingHistory()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L461) |  | GET | `/v5/market/recent-trade` |
| [getOpenInterest()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L474) |  | GET | `/v5/market/open-interest` |
| [getHistoricalVolatility()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L484) |  | GET | `/v5/market/historical-volatility` |
| [getInsurance()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L495) |  | GET | `/v5/market/insurance` |
| [getRiskLimit()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L506) |  | GET | `/v5/market/risk-limit` |
| [getOptionDeliveryPrice()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L521) |  | GET | `/v5/market/delivery-price` |
| [getDeliveryPrice()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L534) |  | GET | `/v5/market/delivery-price` |
| [getLongShortRatio()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L540) |  | GET | `/v5/market/account-ratio` |
| [submitOrder()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L552) | :closed_lock_with_key:  | POST | `/v5/order/create` |
| [amendOrder()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L558) | :closed_lock_with_key:  | POST | `/v5/order/amend` |
| [cancelOrder()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L564) | :closed_lock_with_key:  | POST | `/v5/order/cancel` |
| [getActiveOrders()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L573) | :closed_lock_with_key:  | GET | `/v5/order/realtime` |
| [cancelAllOrders()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L579) | :closed_lock_with_key:  | POST | `/v5/order/cancel-all` |
| [getHistoricOrders()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L592) | :closed_lock_with_key:  | GET | `/v5/order/history` |
| [getExecutionList()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L604) | :closed_lock_with_key:  | GET | `/v5/execution/list` |
| [batchSubmitOrders()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L622) | :closed_lock_with_key:  | POST | `/v5/order/create-batch` |
| [batchAmendOrders()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L642) | :closed_lock_with_key:  | POST | `/v5/order/amend-batch` |
| [batchCancelOrders()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L662) | :closed_lock_with_key:  | POST | `/v5/order/cancel-batch` |
| [getSpotBorrowCheck()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L679) | :closed_lock_with_key:  | GET | `/v5/order/spot-borrow-check` |
| [setDisconnectCancelAllWindow()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L700) | :closed_lock_with_key:  | POST | `/v5/order/disconnected-cancel-all` |
| [setDisconnectCancelAllWindowV2()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L718) | :closed_lock_with_key:  | POST | `/v5/order/disconnected-cancel-all` |
| [getPositionInfo()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L742) | :closed_lock_with_key:  | GET | `/v5/position/list` |
| [setLeverage()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L757) | :closed_lock_with_key:  | POST | `/v5/position/set-leverage` |
| [switchIsolatedMargin()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L770) | :closed_lock_with_key:  | POST | `/v5/position/switch-isolated` |
| [setTPSLMode()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L784) | :closed_lock_with_key:  | POST | `/v5/position/set-tpsl-mode` |
| [switchPositionMode()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L799) | :closed_lock_with_key:  | POST | `/v5/position/switch-mode` |
| [setRiskLimit()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L813) | :closed_lock_with_key:  | POST | `/v5/position/set-risk-limit` |
| [setTradingStop()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L828) | :closed_lock_with_key:  | POST | `/v5/position/trading-stop` |
| [setAutoAddMargin()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L839) | :closed_lock_with_key:  | POST | `/v5/position/set-auto-add-margin` |
| [addOrReduceMargin()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L851) | :closed_lock_with_key:  | POST | `/v5/position/add-margin` |
| [getClosedPnL()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L863) | :closed_lock_with_key:  | GET | `/v5/position/closed-pnl` |
| [movePosition()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L882) | :closed_lock_with_key:  | POST | `/v5/position/move-positions` |
| [getMovePositionHistory()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L893) | :closed_lock_with_key:  | GET | `/v5/position/move-history` |
| [confirmNewRiskLimit()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L912) | :closed_lock_with_key:  | POST | `/v5/position/confirm-pending-mmr` |
| [getPreUpgradeOrderHistory()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L932) | :closed_lock_with_key:  | GET | `/v5/pre-upgrade/order/history` |
| [getPreUpgradeTradeHistory()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L947) | :closed_lock_with_key:  | GET | `/v5/pre-upgrade/execution/list` |
| [getPreUpgradeClosedPnl()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L958) | :closed_lock_with_key:  | GET | `/v5/pre-upgrade/position/closed-pnl` |
| [getPreUpgradeTransactions()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L972) | :closed_lock_with_key:  | GET | `/v5/pre-upgrade/account/transaction-log` |
| [getPreUpgradeOptionDeliveryRecord()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L989) | :closed_lock_with_key:  | GET | `/v5/pre-upgrade/asset/delivery-record` |
| [getPreUpgradeUSDCSessionSettlements()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1003) | :closed_lock_with_key:  | GET | `/v5/pre-upgrade/asset/settlement-record` |
| [getWalletBalance()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1024) | :closed_lock_with_key:  | GET | `/v5/account/wallet-balance` |
| [getTransferableAmount()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1035) | :closed_lock_with_key:  | GET | `/v5/account/withdrawal` |
| [upgradeToUnifiedAccount()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1048) | :closed_lock_with_key:  | POST | `/v5/account/upgrade-to-uta` |
| [getBorrowHistory()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1059) | :closed_lock_with_key:  | GET | `/v5/account/borrow-history` |
| [repayLiability()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1073) | :closed_lock_with_key:  | POST | `/v5/account/quick-repayment` |
| [setCollateralCoin()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1082) | :closed_lock_with_key:  | POST | `/v5/account/set-collateral-switch` |
| [batchSetCollateralCoin()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1088) | :closed_lock_with_key:  | POST | `/v5/account/set-collateral-switch-batch` |
| [getCollateralInfo()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1098) | :closed_lock_with_key:  | GET | `/v5/account/collateral-info` |
| [getCoinGreeks()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1107) | :closed_lock_with_key:  | GET | `/v5/asset/coin-greeks` |
| [getFeeRate()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1120) | :closed_lock_with_key:  | GET | `/v5/account/fee-rate` |
| [getAccountInfo()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1129) | :closed_lock_with_key:  | GET | `/v5/account/info` |
| [getDCPInfo()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1142) | :closed_lock_with_key:  | GET | `/v5/account/query-dcp-info` |
| [getTransactionLog()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1149) | :closed_lock_with_key:  | GET | `/v5/account/transaction-log` |
| [getClassicTransactionLogs()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1160) | :closed_lock_with_key:  | GET | `/v5/account/contract-transaction-log` |
| [getSMPGroup()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1171) | :closed_lock_with_key:  | GET | `/v5/account/smp-group` |
| [setMarginMode()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1184) | :closed_lock_with_key:  | POST | `/v5/account/set-margin-mode` |
| [setSpotHedging()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1201) | :closed_lock_with_key:  | POST | `/v5/account/set-hedging-mode` |
| [setMMP()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1210) | :closed_lock_with_key:  | POST | `/v5/account/mmp-modify` |
| [resetMMP()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1217) | :closed_lock_with_key:  | POST | `/v5/account/mmp-reset` |
| [getMMPState()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1224) | :closed_lock_with_key:  | GET | `/v5/account/mmp-state` |
| [getDeliveryRecord()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1241) | :closed_lock_with_key:  | GET | `/v5/asset/delivery-record` |
| [getSettlementRecords()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1252) | :closed_lock_with_key:  | GET | `/v5/asset/settlement-record` |
| [getCoinExchangeRecords()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1265) | :closed_lock_with_key:  | GET | `/v5/asset/exchange/order-record` |
| [getCoinInfo()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1277) | :closed_lock_with_key:  | GET | `/v5/asset/coin/query-info` |
| [getSubUID()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1291) | :closed_lock_with_key:  | GET | `/v5/asset/transfer/query-sub-member-list` |
| [getAssetInfo()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1306) | :closed_lock_with_key:  | GET | `/v5/asset/transfer/query-asset-info` |
| [getAllCoinsBalance()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1317) | :closed_lock_with_key:  | GET | `/v5/asset/transfer/query-account-coins-balance` |
| [getCoinBalance()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1331) | :closed_lock_with_key:  | GET | `/v5/asset/transfer/query-account-coin-balance` |
| [getWithdrawableAmount()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1343) | :closed_lock_with_key:  | GET | `/v5/asset/withdraw/withdrawable-amount` |
| [getTransferableCoinList()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1352) | :closed_lock_with_key:  | GET | `/v5/asset/transfer/query-transfer-coin-list` |
| [createInternalTransfer()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1368) | :closed_lock_with_key:  | POST | `/v5/asset/transfer/inter-transfer` |
| [getInternalTransferRecords()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1387) | :closed_lock_with_key:  | GET | `/v5/asset/transfer/query-inter-transfer-list` |
| [enableUniversalTransferForSubUIDs()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1407) | :closed_lock_with_key:  | POST | `/v5/asset/transfer/save-transfer-sub-member` |
| [createUniversalTransfer()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1418) | :closed_lock_with_key:  | POST | `/v5/asset/transfer/universal-transfer` |
| [getUniversalTransferRecords()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1430) | :closed_lock_with_key:  | GET | `/v5/asset/transfer/query-universal-transfer-list` |
| [getAllowedDepositCoinInfo()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1443) | :closed_lock_with_key:  | GET | `/v5/asset/deposit/query-allowed-list` |
| [setDepositAccount()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1457) | :closed_lock_with_key:  | POST | `/v5/asset/deposit/deposit-to-account` |
| [getDepositRecords()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1473) | :closed_lock_with_key:  | GET | `/v5/asset/deposit/query-record` |
| [getSubAccountDepositRecords()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1488) | :closed_lock_with_key:  | GET | `/v5/asset/deposit/query-sub-member-record` |
| [getInternalDepositRecords()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1504) | :closed_lock_with_key:  | GET | `/v5/asset/deposit/query-internal-record` |
| [getMasterDepositAddress()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1516) | :closed_lock_with_key:  | GET | `/v5/asset/deposit/query-address` |
| [getSubDepositAddress()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1534) | :closed_lock_with_key:  | GET | `/v5/asset/deposit/query-sub-member-address` |
| [querySubMemberAddress()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1559) | :closed_lock_with_key:  | GET | `/v5/asset/deposit/query-sub-member-address` |
| [getWithdrawalRecords()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1579) | :closed_lock_with_key:  | GET | `/v5/asset/withdraw/query-record` |
| [getExchangeEntities()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1590) | :closed_lock_with_key:  | GET | `/v5/asset/withdraw/vasp/list` |
| [submitWithdrawal()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1603) | :closed_lock_with_key:  | POST | `/v5/asset/withdraw/create` |
| [cancelWithdrawal()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1614) | :closed_lock_with_key:  | POST | `/v5/asset/withdraw/cancel` |
| [getConvertCoins()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1623) | :closed_lock_with_key:  | GET | `/v5/asset/exchange/query-coin-list` |
| [requestConvertQuote()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1634) | :closed_lock_with_key:  | POST | `/v5/asset/exchange/quote-apply` |
| [confirmConvertQuote()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1643) | :closed_lock_with_key:  | POST | `/v5/asset/exchange/convert-execute` |
| [getConvertStatus()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1655) | :closed_lock_with_key:  | GET | `/v5/asset/exchange/convert-result-query` |
| [getConvertHistory()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1674) | :closed_lock_with_key:  | GET | `/v5/asset/exchange/query-convert-history` |
| [createSubMember()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1694) | :closed_lock_with_key:  | POST | `/v5/user/create-sub-member` |
| [createSubUIDAPIKey()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1706) | :closed_lock_with_key:  | POST | `/v5/user/create-sub-api` |
| [getSubUIDList()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1715) | :closed_lock_with_key:  | GET | `/v5/user/query-sub-members` |
| [getSubUIDListUnlimited()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1724) | :closed_lock_with_key:  | GET | `/v5/user/submembers` |
| [setSubUIDFrozenState()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1742) | :closed_lock_with_key:  | POST | `/v5/user/frozen-sub-member` |
| [getQueryApiKey()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1755) | :closed_lock_with_key:  | GET | `/v5/user/query-api` |
| [getSubAccountAllApiKeys()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1762) | :closed_lock_with_key:  | GET | `/v5/user/sub-apikeys` |
| [getUIDWalletType()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1771) | :closed_lock_with_key:  | GET | `/v5/user/get-member-type` |
| [updateMasterApiKey()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1788) | :closed_lock_with_key:  | POST | `/v5/user/update-api` |
| [updateSubApiKey()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1802) | :closed_lock_with_key:  | POST | `/v5/user/update-sub-api` |
| [deleteSubMember()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1815) | :closed_lock_with_key:  | POST | `/v5/user/del-submember` |
| [deleteMasterApiKey()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1830) | :closed_lock_with_key:  | POST | `/v5/user/delete-api` |
| [deleteSubApiKey()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1844) | :closed_lock_with_key:  | POST | `/v5/user/delete-sub-api` |
| [getAffiliateUserList()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1864) | :closed_lock_with_key:  | GET | `/v5/affiliate/aff-user-list` |
| [getAffiliateUserInfo()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1883) | :closed_lock_with_key:  | GET | `/v5/user/aff-customer-info` |
| [getLeveragedTokenInfo()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1898) |  | GET | `/v5/spot-lever-token/info` |
| [getLeveragedTokenMarket()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1907) |  | GET | `/v5/spot-lever-token/reference` |
| [purchaseSpotLeveragedToken()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1916) | :closed_lock_with_key:  | POST | `/v5/spot-lever-token/purchase` |
| [redeemSpotLeveragedToken()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1925) | :closed_lock_with_key:  | POST | `/v5/spot-lever-token/redeem` |
| [getSpotLeveragedTokenOrderHistory()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1934) | :closed_lock_with_key:  | GET | `/v5/spot-lever-token/order-record` |
| [getVIPMarginData()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1956) |  | GET | `/v5/spot-margin-trade/data` |
| [getHistoricalInterestRate()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1967) | :closed_lock_with_key:  | GET | `/v5/spot-margin-trade/interest-rate-history` |
| [toggleSpotMarginTrade()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L1994) | :closed_lock_with_key:  | POST | `/v5/spot-margin-trade/switch-mode` |
| [setSpotMarginLeverage()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2006) | :closed_lock_with_key:  | POST | `/v5/spot-margin-trade/set-leverage` |
| [getSpotMarginState()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2015) | :closed_lock_with_key:  | GET | `/v5/spot-margin-trade/state` |
| [getSpotMarginCoinInfo()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2028) | :closed_lock_with_key:  | GET | `/v5/spot-cross-margin-trade/pledge-token` |
| [getSpotMarginBorrowableCoinInfo()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2045) | :closed_lock_with_key:  | GET | `/v5/spot-cross-margin-trade/borrow-token` |
| [getSpotMarginInterestAndQuota()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2062) | :closed_lock_with_key:  | GET | `/v5/spot-cross-margin-trade/loan-info` |
| [getSpotMarginLoanAccountInfo()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2080) | :closed_lock_with_key:  | GET | `/v5/spot-cross-margin-trade/account` |
| [spotMarginBorrow()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2104) | :closed_lock_with_key:  | POST | `/v5/spot-cross-margin-trade/loan` |
| [spotMarginRepay()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2115) | :closed_lock_with_key:  | POST | `/v5/spot-cross-margin-trade/repay` |
| [getSpotMarginBorrowOrderDetail()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2130) | :closed_lock_with_key:  | GET | `/v5/spot-cross-margin-trade/orders` |
| [getSpotMarginRepaymentOrderDetail()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2159) | :closed_lock_with_key:  | GET | `/v5/spot-cross-margin-trade/repay-history` |
| [toggleSpotCrossMarginTrade()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2188) | :closed_lock_with_key:  | POST | `/v5/spot-cross-margin-trade/switch` |
| [getCollateralCoins()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2205) |  | GET | `/v5/crypto-loan/collateral-data` |
| [getBorrowableCoins()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2221) |  | GET | `/v5/crypto-loan/loanable-data` |
| [getAccountBorrowCollateralLimit()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2238) | :closed_lock_with_key:  | GET | `/v5/crypto-loan/borrowable-collateralisable-number` |
| [borrowCryptoLoan()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2257) | :closed_lock_with_key:  | POST | `/v5/crypto-loan/borrow` |
| [repayCryptoLoan()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2276) | :closed_lock_with_key:  | POST | `/v5/crypto-loan/repay` |
| [getUnpaidLoanOrders()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2290) | :closed_lock_with_key:  | GET | `/v5/crypto-loan/ongoing-orders` |
| [getRepaymentHistory()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2309) | :closed_lock_with_key:  | GET | `/v5/crypto-loan/repayment-history` |
| [getCompletedLoanOrderHistory()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2327) | :closed_lock_with_key:  | GET | `/v5/crypto-loan/borrow-history` |
| [getMaxAllowedReductionCollateralAmount()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2344) | :closed_lock_with_key:  | GET | `/v5/crypto-loan/max-collateral-amount` |
| [adjustCollateralAmount()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2361) | :closed_lock_with_key:  | POST | `/v5/crypto-loan/adjust-ltv` |
| [getLoanLTVAdjustmentHistory()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2383) | :closed_lock_with_key:  | GET | `/v5/crypto-loan/adjustment-history` |
| [getInstitutionalLendingProductInfo()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2403) |  | GET | `/v5/ins-loan/product-infos` |
| [getInstitutionalLendingMarginCoinInfo()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2413) |  | GET | `/v5/ins-loan/ensure-tokens` |
| [getInstitutionalLendingMarginCoinInfoWithConversionRate()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2422) |  | GET | `/v5/ins-loan/ensure-tokens-convert` |
| [getInstitutionalLendingLoanOrders()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2431) | :closed_lock_with_key:  | GET | `/v5/ins-loan/loan-order` |
| [getInstitutionalLendingRepayOrders()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2443) | :closed_lock_with_key:  | GET | `/v5/ins-loan/repaid-history` |
| [getInstitutionalLendingLTV()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2455) | :closed_lock_with_key:  | GET | `/v5/ins-loan/ltv` |
| [getInstitutionalLendingLTVWithLadderConversionRate()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2464) | :closed_lock_with_key:  | GET | `/v5/ins-loan/ltv-convert` |
| [bindOrUnbindUID()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2479) | :closed_lock_with_key:  | POST | `/v5/ins-loan/association-uid` |
| [getExchangeBrokerEarnings()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2503) | :closed_lock_with_key:  | GET | `/v5/broker/earnings-info` |
| [getExchangeBrokerAccountInfo()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2516) | :closed_lock_with_key:  | GET | `/v5/broker/account-info` |
| [getBrokerSubAccountDeposits()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2532) | :closed_lock_with_key:  | GET | `/v5/broker/asset/query-sub-member-deposit-record` |
| [getBrokerVoucherSpec()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2547) | :closed_lock_with_key:  | POST | `/v5/broker/award/info` |
| [issueBrokerVoucher()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2559) | :closed_lock_with_key:  | POST | `/v5/broker/award/distribute-award` |
| [getBrokerIssuedVoucher()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2571) | :closed_lock_with_key:  | POST | `/v5/broker/award/distribution-record` |
| [getEarnProduct()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2588) |  | GET | `/v5/earn/product` |
| [submitStakeRedeem()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2606) | :closed_lock_with_key:  | POST | `/v5/earn/place-order` |
| [getEarnOrderHistory()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2623) | :closed_lock_with_key:  | GET | `/v5/earn/order` |
| [getEarnPosition()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2638) | :closed_lock_with_key:  | GET | `/v5/earn/position` |
| [getP2PAccountCoinsBalance()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2662) | :closed_lock_with_key:  | GET | `/v5/asset/transfer/query-account-coins-balance` |
| [getP2POnlineAds()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2679) |  | POST | `/v5/p2p/item/online` |
| [createP2PAd()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2688) | :closed_lock_with_key:  | POST | `/v5/p2p/item/create` |
| [cancelP2PAd()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2697) | :closed_lock_with_key:  | POST | `/v5/p2p/item/cancel` |
| [updateP2PAd()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2711) | :closed_lock_with_key:  | POST | `/v5/p2p/item/update` |
| [getP2PPersonalAds()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2721) | :closed_lock_with_key:  | POST | `/v5/p2p/item/personal/list` |
| [getP2PAdDetail()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2730) | :closed_lock_with_key:  | POST | `/v5/p2p/item/info` |
| [getP2POrders()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2745) | :closed_lock_with_key:  | POST | `/v5/p2p/order/simplifyList` |
| [getP2POrderDetail()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2755) | :closed_lock_with_key:  | POST | `/v5/p2p/order/info` |
| [getP2PPendingOrders()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2764) | :closed_lock_with_key:  | POST | `/v5/p2p/order/pending/simplifyList` |
| [markP2POrderAsPaid()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2773) | :closed_lock_with_key:  | POST | `/v5/p2p/order/pay` |
| [releaseP2POrder()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2782) | :closed_lock_with_key:  | POST | `/v5/p2p/order/finish` |
| [sendP2POrderMessage()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2791) | :closed_lock_with_key:  | POST | `/v5/p2p/order/message/send` |
| [uploadP2PChatFile()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2800) | :closed_lock_with_key:  | POST | `/v5/p2p/oss/upload_file` |
| [getP2POrderMessages()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2809) | :closed_lock_with_key:  | POST | `/v5/p2p/order/message/listpage` |
| [getP2PUserInfo()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2823) | :closed_lock_with_key:  | POST | `/v5/p2p/user/personal/info` |
| [getP2PCounterpartyUserInfo()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2830) | :closed_lock_with_key:  | POST | `/v5/p2p/user/order/personal/info` |
| [getP2PUserPayments()](https://github.com/tiagosiebler/bybit-api/blob/master/src/rest-client-v5.ts#L2839) | :closed_lock_with_key:  | POST | `/v5/p2p/user/payment/list` |