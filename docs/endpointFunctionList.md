
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
| `fetchServerTime()` |  | GET | `/v5/market/time` |
| `getServerTime()` |  | GET | `/v5/market/time` |
| `requestDemoTradingFunds()` | :closed_lock_with_key:  | POST | `/v5/account/demo-apply-money` |
| `getKline()` |  | GET | `/v5/market/kline` |
| `getMarkPriceKline()` |  | GET | `/v5/market/mark-price-kline` |
| `getIndexPriceKline()` |  | GET | `/v5/market/index-price-kline` |
| `getPremiumIndexPriceKline()` |  | GET | `/v5/market/premium-index-price-kline` |
| `getOrderbook()` |  | GET | `/v5/market/orderbook` |
| `getTickers()` |  | GET | `/v5/market/tickers` |
| `getFundingRateHistory()` |  | GET | `/v5/market/funding/history` |
| `getPublicTradingHistory()` |  | GET | `/v5/market/recent-trade` |
| `getOpenInterest()` |  | GET | `/v5/market/open-interest` |
| `getHistoricalVolatility()` |  | GET | `/v5/market/historical-volatility` |
| `getInsurance()` |  | GET | `/v5/market/insurance` |
| `getRiskLimit()` |  | GET | `/v5/market/risk-limit` |
| `getOptionDeliveryPrice()` |  | GET | `/v5/market/delivery-price` |
| `getDeliveryPrice()` |  | GET | `/v5/market/delivery-price` |
| `getLongShortRatio()` |  | GET | `/v5/market/account-ratio` |
| `submitOrder()` | :closed_lock_with_key:  | POST | `/v5/order/create` |
| `amendOrder()` | :closed_lock_with_key:  | POST | `/v5/order/amend` |
| `cancelOrder()` | :closed_lock_with_key:  | POST | `/v5/order/cancel` |
| `getActiveOrders()` | :closed_lock_with_key:  | GET | `/v5/order/realtime` |
| `cancelAllOrders()` | :closed_lock_with_key:  | POST | `/v5/order/cancel-all` |
| `getHistoricOrders()` | :closed_lock_with_key:  | GET | `/v5/order/history` |
| `batchSubmitOrders()` | :closed_lock_with_key:  | POST | `/v5/order/create-batch` |
| `batchAmendOrders()` | :closed_lock_with_key:  | POST | `/v5/order/amend-batch` |
| `batchCancelOrders()` | :closed_lock_with_key:  | POST | `/v5/order/cancel-batch` |
| `getSpotBorrowCheck()` | :closed_lock_with_key:  | GET | `/v5/order/spot-borrow-check` |
| `setDisconnectCancelAllWindow()` | :closed_lock_with_key:  | POST | `/v5/order/disconnected-cancel-all` |
| `setDisconnectCancelAllWindowV2()` | :closed_lock_with_key:  | POST | `/v5/order/disconnected-cancel-all` |
| `getPositionInfo()` | :closed_lock_with_key:  | GET | `/v5/position/list` |
| `setLeverage()` | :closed_lock_with_key:  | POST | `/v5/position/set-leverage` |
| `switchIsolatedMargin()` | :closed_lock_with_key:  | POST | `/v5/position/switch-isolated` |
| `setTPSLMode()` | :closed_lock_with_key:  | POST | `/v5/position/set-tpsl-mode` |
| `switchPositionMode()` | :closed_lock_with_key:  | POST | `/v5/position/switch-mode` |
| `setRiskLimit()` | :closed_lock_with_key:  | POST | `/v5/position/set-risk-limit` |
| `setTradingStop()` | :closed_lock_with_key:  | POST | `/v5/position/trading-stop` |
| `setAutoAddMargin()` | :closed_lock_with_key:  | POST | `/v5/position/set-auto-add-margin` |
| `addOrReduceMargin()` | :closed_lock_with_key:  | POST | `/v5/position/add-margin` |
| `getExecutionList()` | :closed_lock_with_key:  | GET | `/v5/execution/list` |
| `getClosedPnL()` | :closed_lock_with_key:  | GET | `/v5/position/closed-pnl` |
| `movePosition()` | :closed_lock_with_key:  | POST | `/v5/position/move-positions` |
| `getMovePositionHistory()` | :closed_lock_with_key:  | GET | `/v5/position/move-history` |
| `confirmNewRiskLimit()` | :closed_lock_with_key:  | POST | `/v5/position/confirm-pending-mmr` |
| `getPreUpgradeOrderHistory()` | :closed_lock_with_key:  | GET | `/v5/pre-upgrade/order/history` |
| `getPreUpgradeTradeHistory()` | :closed_lock_with_key:  | GET | `/v5/pre-upgrade/execution/list` |
| `getPreUpgradeClosedPnl()` | :closed_lock_with_key:  | GET | `/v5/pre-upgrade/position/closed-pnl` |
| `getPreUpgradeTransactions()` | :closed_lock_with_key:  | GET | `/v5/pre-upgrade/account/transaction-log` |
| `getPreUpgradeOptionDeliveryRecord()` | :closed_lock_with_key:  | GET | `/v5/pre-upgrade/asset/delivery-record` |
| `getPreUpgradeUSDCSessionSettlements()` | :closed_lock_with_key:  | GET | `/v5/pre-upgrade/asset/settlement-record` |
| `getWalletBalance()` | :closed_lock_with_key:  | GET | `/v5/account/wallet-balance` |
| `upgradeToUnifiedAccount()` | :closed_lock_with_key:  | POST | `/v5/account/upgrade-to-uta` |
| `getBorrowHistory()` | :closed_lock_with_key:  | GET | `/v5/account/borrow-history` |
| `repayLiability()` | :closed_lock_with_key:  | POST | `/v5/account/quick-repayment` |
| `setCollateralCoin()` | :closed_lock_with_key:  | POST | `/v5/account/set-collateral-switch` |
| `batchSetCollateralCoin()` | :closed_lock_with_key:  | POST | `/v5/account/set-collateral-switch-batch` |
| `getCollateralInfo()` | :closed_lock_with_key:  | GET | `/v5/account/collateral-info` |
| `getCoinGreeks()` | :closed_lock_with_key:  | GET | `/v5/asset/coin-greeks` |
| `getFeeRate()` | :closed_lock_with_key:  | GET | `/v5/account/fee-rate` |
| `getAccountInfo()` | :closed_lock_with_key:  | GET | `/v5/account/info` |
| `getTransactionLog()` | :closed_lock_with_key:  | GET | `/v5/account/transaction-log` |
| `getClassicTransactionLogs()` | :closed_lock_with_key:  | GET | `/v5/account/contract-transaction-log` |
| `getSMPGroup()` | :closed_lock_with_key:  | GET | `/v5/account/smp-group` |
| `setMarginMode()` | :closed_lock_with_key:  | POST | `/v5/account/set-margin-mode` |
| `setSpotHedging()` | :closed_lock_with_key:  | POST | `/v5/account/set-hedging-mode` |
| `setMMP()` | :closed_lock_with_key:  | POST | `/v5/account/mmp-modify` |
| `resetMMP()` | :closed_lock_with_key:  | POST | `/v5/account/mmp-reset` |
| `getMMPState()` | :closed_lock_with_key:  | GET | `/v5/account/mmp-state` |
| `getDCPInfo()` | :closed_lock_with_key:  | GET | `/v5/account/query-dcp-info` |
| `getCoinExchangeRecords()` | :closed_lock_with_key:  | GET | `/v5/asset/exchange/order-record` |
| `getDeliveryRecord()` | :closed_lock_with_key:  | GET | `/v5/asset/delivery-record` |
| `getSettlementRecords()` | :closed_lock_with_key:  | GET | `/v5/asset/settlement-record` |
| `getAssetInfo()` | :closed_lock_with_key:  | GET | `/v5/asset/transfer/query-asset-info` |
| `getAllCoinsBalance()` | :closed_lock_with_key:  | GET | `/v5/asset/transfer/query-account-coins-balance` |
| `getCoinBalance()` | :closed_lock_with_key:  | GET | `/v5/asset/transfer/query-account-coin-balance` |
| `getTransferableCoinList()` | :closed_lock_with_key:  | GET | `/v5/asset/transfer/query-transfer-coin-list` |
| `createInternalTransfer()` | :closed_lock_with_key:  | POST | `/v5/asset/transfer/inter-transfer` |
| `getInternalTransferRecords()` | :closed_lock_with_key:  | GET | `/v5/asset/transfer/query-inter-transfer-list` |
| `getSubUID()` | :closed_lock_with_key:  | GET | `/v5/asset/transfer/query-sub-member-list` |
| `enableUniversalTransferForSubUIDs()` | :closed_lock_with_key:  | POST | `/v5/asset/transfer/save-transfer-sub-member` |
| `createUniversalTransfer()` | :closed_lock_with_key:  | POST | `/v5/asset/transfer/universal-transfer` |
| `getUniversalTransferRecords()` | :closed_lock_with_key:  | GET | `/v5/asset/transfer/query-universal-transfer-list` |
| `getAllowedDepositCoinInfo()` |  | GET | `/v5/asset/deposit/query-allowed-list` |
| `setDepositAccount()` | :closed_lock_with_key:  | POST | `/v5/asset/deposit/deposit-to-account` |
| `getDepositRecords()` | :closed_lock_with_key:  | GET | `/v5/asset/deposit/query-record` |
| `getSubAccountDepositRecords()` | :closed_lock_with_key:  | GET | `/v5/asset/deposit/query-sub-member-record` |
| `getInternalDepositRecords()` | :closed_lock_with_key:  | GET | `/v5/asset/deposit/query-internal-record` |
| `getMasterDepositAddress()` | :closed_lock_with_key:  | GET | `/v5/asset/deposit/query-address` |
| `getSubDepositAddress()` | :closed_lock_with_key:  | GET | `/v5/asset/deposit/query-sub-member-address` |
| `querySubMemberAddress()` | :closed_lock_with_key:  | GET | `/v5/asset/deposit/query-sub-member-address` |
| `getCoinInfo()` | :closed_lock_with_key:  | GET | `/v5/asset/coin/query-info` |
| `getWithdrawalRecords()` | :closed_lock_with_key:  | GET | `/v5/asset/withdraw/query-record` |
| `getWithdrawableAmount()` | :closed_lock_with_key:  | GET | `/v5/asset/withdraw/withdrawable-amount` |
| `getExchangeEntities()` | :closed_lock_with_key:  | GET | `/v5/asset/withdraw/vasp/list` |
| `submitWithdrawal()` | :closed_lock_with_key:  | POST | `/v5/asset/withdraw/create` |
| `cancelWithdrawal()` | :closed_lock_with_key:  | POST | `/v5/asset/withdraw/cancel` |
| `getConvertCoins()` | :closed_lock_with_key:  | GET | `/v5/asset/exchange/query-coin-list` |
| `requestConvertQuote()` | :closed_lock_with_key:  | POST | `/v5/asset/exchange/quote-apply` |
| `confirmConvertQuote()` | :closed_lock_with_key:  | POST | `/v5/asset/exchange/convert-execute` |
| `getConvertStatus()` | :closed_lock_with_key:  | GET | `/v5/asset/exchange/convert-result-query` |
| `getConvertHistory()` | :closed_lock_with_key:  | GET | `/v5/asset/exchange/query-convert-history` |
| `createSubMember()` | :closed_lock_with_key:  | POST | `/v5/user/create-sub-member` |
| `createSubUIDAPIKey()` | :closed_lock_with_key:  | POST | `/v5/user/create-sub-api` |
| `getSubUIDList()` | :closed_lock_with_key:  | GET | `/v5/user/query-sub-members` |
| `getSubUIDListUnlimited()` | :closed_lock_with_key:  | GET | `/v5/user/submembers` |
| `getSubAccountAllApiKeys()` | :closed_lock_with_key:  | GET | `/v5/user/sub-apikeys` |
| `setSubUIDFrozenState()` | :closed_lock_with_key:  | POST | `/v5/user/frozen-sub-member` |
| `getQueryApiKey()` | :closed_lock_with_key:  | GET | `/v5/user/query-api` |
| `getUIDWalletType()` | :closed_lock_with_key:  | GET | `/v5/user/query-api` |
| `updateMasterApiKey()` | :closed_lock_with_key:  | POST | `/v5/user/update-api` |
| `updateSubApiKey()` | :closed_lock_with_key:  | POST | `/v5/user/update-sub-api` |
| `deleteMasterApiKey()` | :closed_lock_with_key:  | POST | `/v5/user/delete-api` |
| `deleteSubApiKey()` | :closed_lock_with_key:  | POST | `/v5/user/delete-sub-api` |
| `deleteSubMember()` | :closed_lock_with_key:  | POST | `/v5/user/del-submember` |
| `getAffiliateUserInfo()` | :closed_lock_with_key:  | GET | `/v5/user/aff-customer-info` |
| `getLeveragedTokenInfo()` |  | GET | `/v5/spot-lever-token/info` |
| `getLeveragedTokenMarket()` |  | GET | `/v5/spot-lever-token/reference` |
| `purchaseSpotLeveragedToken()` | :closed_lock_with_key:  | POST | `/v5/spot-lever-token/purchase` |
| `redeemSpotLeveragedToken()` | :closed_lock_with_key:  | POST | `/v5/spot-lever-token/redeem` |
| `getSpotLeveragedTokenOrderHistory()` | :closed_lock_with_key:  | GET | `/v5/spot-lever-token/order-record` |
| `getVIPMarginData()` |  | GET | `/v5/spot-margin-trade/data` |
| `getHistoricalInterestRate()` | :closed_lock_with_key:  | GET | `/v5/spot-margin-trade/interest-rate-history` |
| `toggleSpotMarginTrade()` | :closed_lock_with_key:  | POST | `/v5/spot-margin-trade/switch-mode` |
| `setSpotMarginLeverage()` | :closed_lock_with_key:  | POST | `/v5/spot-margin-trade/set-leverage` |
| `getSpotMarginState()` | :closed_lock_with_key:  | GET | `/v5/spot-margin-trade/state` |
| `getSpotMarginCoinInfo()` | :closed_lock_with_key:  | GET | `/v5/spot-cross-margin-trade/pledge-token` |
| `getSpotMarginBorrowableCoinInfo()` | :closed_lock_with_key:  | GET | `/v5/spot-cross-margin-trade/borrow-token` |
| `getSpotMarginInterestAndQuota()` | :closed_lock_with_key:  | GET | `/v5/spot-cross-margin-trade/loan-info` |
| `getSpotMarginLoanAccountInfo()` | :closed_lock_with_key:  | GET | `/v5/spot-cross-margin-trade/account` |
| `spotMarginBorrow()` | :closed_lock_with_key:  | POST | `/v5/spot-cross-margin-trade/loan` |
| `spotMarginRepay()` | :closed_lock_with_key:  | POST | `/v5/spot-cross-margin-trade/repay` |
| `getSpotMarginBorrowOrderDetail()` | :closed_lock_with_key:  | GET | `/v5/spot-cross-margin-trade/orders` |
| `getSpotMarginRepaymentOrderDetail()` | :closed_lock_with_key:  | GET | `/v5/spot-cross-margin-trade/repay-history` |
| `toggleSpotCrossMarginTrade()` | :closed_lock_with_key:  | POST | `/v5/spot-cross-margin-trade/switch` |
| `getInstitutionalLendingProductInfo()` |  | GET | `/v5/ins-loan/product-infos` |
| `getInstitutionalLendingMarginCoinInfo()` |  | GET | `/v5/ins-loan/ensure-tokens` |
| `getInstitutionalLendingMarginCoinInfoWithConversionRate()` |  | GET | `/v5/ins-loan/ensure-tokens-convert` |
| `getInstitutionalLendingLoanOrders()` | :closed_lock_with_key:  | GET | `/v5/ins-loan/loan-order` |
| `getInstitutionalLendingRepayOrders()` | :closed_lock_with_key:  | GET | `/v5/ins-loan/repaid-history` |
| `getInstitutionalLendingLTV()` | :closed_lock_with_key:  | GET | `/v5/ins-loan/ltv` |
| `getInstitutionalLendingLTVWithLadderConversionRate()` | :closed_lock_with_key:  | GET | `/v5/ins-loan/ltv-convert` |
| `bindOrUnbindUID()` | :closed_lock_with_key:  | POST | `/v5/ins-loan/association-uid` |
| `getExchangeBrokerEarnings()` | :closed_lock_with_key:  | GET | `/v5/broker/earnings-info` |
| `getExchangeBrokerAccountInfo()` | :closed_lock_with_key:  | GET | `/v5/broker/account-info` |
| `getBrokerSubAccountDeposits()` | :closed_lock_with_key:  | GET | `/v5/broker/asset/query-sub-member-deposit-record` |