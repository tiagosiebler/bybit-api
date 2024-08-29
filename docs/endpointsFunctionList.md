
# Endpoint maps

<p align="center">
  <a href="https://www.npmjs.com/package/bybit-api">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://github.com/tiagosiebler/bybit-api/blob/master/docs/images/logoDarkMode2.svg?raw=true#gh-dark-mode-only">
      <img alt="SDK Logo" src="https://github.com/tiagosiebler/bybit-api/blob/master/docs/images/logoBrightMode2.svg?raw=true#gh-light-mode-only">
    </picture>
  </a>
</p>

In this folder you can find table of all endpoints and its corresponding functions from the official exchange API documentation. All functions are mapped based on the
client they are associated with. You can easily search which function uses which URL and what client to use for it.

You can find all clients in the [source folder](/src).

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
| -------- | ------- | ----------- | -------- |
| `fetchServerTime()` | no :unlock:      | GET | `/v5/market/time` |
| `getServerTime()` | no :unlock:      | GET | `/v5/market/time` |
| `requestDemoTradingFunds()` | YES :lock:      | POST | `/v5/account/demo-apply-money` |
| `getKline()` | no :unlock:      | GET | `/v5/market/kline` |
| `getMarkPriceKline()` | no :unlock:      | GET | `/v5/market/mark-price-kline` |
| `getIndexPriceKline()` | no :unlock:      | GET | `/v5/market/index-price-kline` |
| `getPremiumIndexPriceKline()` | no :unlock:      | GET | `/v5/market/premium-index-price-kline` |
| `getOrderbook()` | no :unlock:      | GET | `/v5/market/orderbook` |
| `getTickers()` | no :unlock:      | GET | `/v5/market/tickers` |
| `getTickers()` | no :unlock:      | GET | `/v5/market/tickers` |
| `getTickers()` | no :unlock:      | GET | `/v5/market/tickers` |
| `getTickers()` | no :unlock:      | GET | `/v5/market/tickers` |
| `getFundingRateHistory()` | no :unlock:      | GET | `/v5/market/funding/history` |
| `getPublicTradingHistory()` | no :unlock:      | GET | `/v5/market/recent-trade` |
| `getOpenInterest()` | no :unlock:      | GET | `/v5/market/open-interest` |
| `getHistoricalVolatility()` | no :unlock:      | GET | `/v5/market/historical-volatility` |
| `getInsurance()` | no :unlock:      | GET | `/v5/market/insurance` |
| `getRiskLimit()` | no :unlock:      | GET | `/v5/market/risk-limit` |
| `getOptionDeliveryPrice()` | no :unlock:      | GET | `/v5/market/delivery-price` |
| `getDeliveryPrice()` | no :unlock:      | GET | `/v5/market/delivery-price` |
| `getLongShortRatio()` | no :unlock:      | GET | `/v5/market/account-ratio` |
| `submitOrder()` | YES :lock:      | POST | `/v5/order/create` |
| `amendOrder()` | YES :lock:      | POST | `/v5/order/amend` |
| `cancelOrder()` | YES :lock:      | POST | `/v5/order/cancel` |
| `getActiveOrders()` | YES :lock:      | GET | `/v5/order/realtime` |
| `cancelAllOrders()` | YES :lock:      | POST | `/v5/order/cancel-all` |
| `getHistoricOrders()` | YES :lock:      | GET | `/v5/order/history` |
| `batchSubmitOrders()` | YES :lock:      | POST | `/v5/order/create-batch` |
| `batchAmendOrders()` | YES :lock:      | POST | `/v5/order/amend-batch` |
| `batchCancelOrders()` | YES :lock:      | POST | `/v5/order/cancel-batch` |
| `getSpotBorrowCheck()` | YES :lock:      | GET | `/v5/order/spot-borrow-check` |
| `setDisconnectCancelAllWindow()` | YES :lock:      | POST | `/v5/order/disconnected-cancel-all` |
| `setDisconnectCancelAllWindowV2()` | YES :lock:      | POST | `/v5/order/disconnected-cancel-all` |
| `getPositionInfo()` | YES :lock:      | GET | `/v5/position/list` |
| `setLeverage()` | YES :lock:      | POST | `/v5/position/set-leverage` |
| `switchIsolatedMargin()` | YES :lock:      | POST | `/v5/position/switch-isolated` |
| `setTPSLMode()` | YES :lock:      | POST | `/v5/position/set-tpsl-mode` |
| `switchPositionMode()` | YES :lock:      | POST | `/v5/position/switch-mode` |
| `setRiskLimit()` | YES :lock:      | POST | `/v5/position/set-risk-limit` |
| `setTradingStop()` | YES :lock:      | POST | `/v5/position/trading-stop` |
| `setAutoAddMargin()` | YES :lock:      | POST | `/v5/position/set-auto-add-margin` |
| `addOrReduceMargin()` | YES :lock:      | POST | `/v5/position/add-margin` |
| `getExecutionList()` | YES :lock:      | GET | `/v5/execution/list` |
| `getClosedPnL()` | YES :lock:      | GET | `/v5/position/closed-pnl` |
| `movePosition()` | YES :lock:      | POST | `/v5/position/move-positions` |
| `getMovePositionHistory()` | YES :lock:      | GET | `/v5/position/move-history` |
| `confirmNewRiskLimit()` | YES :lock:      | POST | `/v5/position/confirm-pending-mmr` |
| `getPreUpgradeOrderHistory()` | YES :lock:      | GET | `/v5/pre-upgrade/order/history` |
| `getPreUpgradeTradeHistory()` | YES :lock:      | GET | `/v5/pre-upgrade/execution/list` |
| `getPreUpgradeClosedPnl()` | YES :lock:      | GET | `/v5/pre-upgrade/position/closed-pnl` |
| `getPreUpgradeTransactions()` | YES :lock:      | GET | `/v5/pre-upgrade/account/transaction-log` |
| `getPreUpgradeOptionDeliveryRecord()` | YES :lock:      | GET | `/v5/pre-upgrade/asset/delivery-record` |
| `getPreUpgradeUSDCSessionSettlements()` | YES :lock:      | GET | `/v5/pre-upgrade/asset/settlement-record` |
| `getWalletBalance()` | YES :lock:      | GET | `/v5/account/wallet-balance` |
| `upgradeToUnifiedAccount()` | YES :lock:      | POST | `/v5/account/upgrade-to-uta` |
| `getBorrowHistory()` | YES :lock:      | GET | `/v5/account/borrow-history` |
| `repayLiability()` | YES :lock:      | POST | `/v5/account/quick-repayment` |
| `setCollateralCoin()` | YES :lock:      | POST | `/v5/account/set-collateral-switch` |
| `batchSetCollateralCoin()` | YES :lock:      | POST | `/v5/account/set-collateral-switch-batch` |
| `getCollateralInfo()` | YES :lock:      | GET | `/v5/account/collateral-info` |
| `getCoinGreeks()` | YES :lock:      | GET | `/v5/asset/coin-greeks` |
| `getFeeRate()` | YES :lock:      | GET | `/v5/account/fee-rate` |
| `getAccountInfo()` | YES :lock:      | GET | `/v5/account/info` |
| `getTransactionLog()` | YES :lock:      | GET | `/v5/account/transaction-log` |
| `getClassicTransactionLogs()` | YES :lock:      | GET | `/v5/account/contract-transaction-log` |
| `getSMPGroup()` | YES :lock:      | GET | `/v5/account/smp-group` |
| `setMarginMode()` | YES :lock:      | POST | `/v5/account/set-margin-mode` |
| `setSpotHedging()` | YES :lock:      | POST | `/v5/account/set-hedging-mode` |
| `setMMP()` | YES :lock:      | POST | `/v5/account/mmp-modify` |
| `resetMMP()` | YES :lock:      | POST | `/v5/account/mmp-reset` |
| `getMMPState()` | YES :lock:      | GET | `/v5/account/mmp-state` |
| `getDCPInfo()` | YES :lock:      | GET | `/v5/account/query-dcp-info` |
| `getCoinExchangeRecords()` | YES :lock:      | GET | `/v5/asset/exchange/order-record` |
| `getDeliveryRecord()` | YES :lock:      | GET | `/v5/asset/delivery-record` |
| `getSettlementRecords()` | YES :lock:      | GET | `/v5/asset/settlement-record` |
| `getAssetInfo()` | YES :lock:      | GET | `/v5/asset/transfer/query-asset-info` |
| `getAllCoinsBalance()` | YES :lock:      | GET | `/v5/asset/transfer/query-account-coins-balance` |
| `getCoinBalance()` | YES :lock:      | GET | `/v5/asset/transfer/query-account-coin-balance` |
| `getTransferableCoinList()` | YES :lock:      | GET | `/v5/asset/transfer/query-transfer-coin-list` |
| `createInternalTransfer()` | YES :lock:      | POST | `/v5/asset/transfer/inter-transfer` |
| `getInternalTransferRecords()` | YES :lock:      | GET | `/v5/asset/transfer/query-inter-transfer-list` |
| `getSubUID()` | YES :lock:      | GET | `/v5/asset/transfer/query-sub-member-list` |
| `enableUniversalTransferForSubUIDs()` | YES :lock:      | POST | `/v5/asset/transfer/save-transfer-sub-member` |
| `createUniversalTransfer()` | YES :lock:      | POST | `/v5/asset/transfer/universal-transfer` |
| `getUniversalTransferRecords()` | YES :lock:      | GET | `/v5/asset/transfer/query-universal-transfer-list` |
| `getAllowedDepositCoinInfo()` | no :unlock:      | GET | `/v5/asset/deposit/query-allowed-list` |
| `setDepositAccount()` | YES :lock:      | POST | `/v5/asset/deposit/deposit-to-account` |
| `getDepositRecords()` | YES :lock:      | GET | `/v5/asset/deposit/query-record` |
| `getSubAccountDepositRecords()` | YES :lock:      | GET | `/v5/asset/deposit/query-sub-member-record` |
| `getInternalDepositRecords()` | YES :lock:      | GET | `/v5/asset/deposit/query-internal-record` |
| `getMasterDepositAddress()` | YES :lock:      | GET | `/v5/asset/deposit/query-address` |
| `getSubDepositAddress()` | YES :lock:      | GET | `/v5/asset/deposit/query-sub-member-address` |
| `querySubMemberAddress()` | YES :lock:      | GET | `/v5/asset/deposit/query-sub-member-address` |
| `getCoinInfo()` | YES :lock:      | GET | `/v5/asset/coin/query-info` |
| `getWithdrawalRecords()` | YES :lock:      | GET | `/v5/asset/withdraw/query-record` |
| `getWithdrawableAmount()` | YES :lock:      | GET | `/v5/asset/withdraw/withdrawable-amount` |
| `getExchangeEntities()` | YES :lock:      | GET | `/v5/asset/withdraw/vasp/list` |
| `submitWithdrawal()` | YES :lock:      | POST | `/v5/asset/withdraw/create` |
| `cancelWithdrawal()` | YES :lock:      | POST | `/v5/asset/withdraw/cancel` |
| `getConvertCoins()` | YES :lock:      | GET | `/v5/asset/exchange/query-coin-list` |
| `requestConvertQuote()` | YES :lock:      | POST | `/v5/asset/exchange/quote-apply` |
| `confirmConvertQuote()` | YES :lock:      | POST | `/v5/asset/exchange/convert-execute` |
| `getConvertStatus()` | YES :lock:      | GET | `/v5/asset/exchange/convert-result-query` |
| `getConvertHistory()` | YES :lock:      | GET | `/v5/asset/exchange/query-convert-history` |
| `createSubMember()` | YES :lock:      | POST | `/v5/user/create-sub-member` |
| `createSubUIDAPIKey()` | YES :lock:      | POST | `/v5/user/create-sub-api` |
| `getSubUIDList()` | YES :lock:      | GET | `/v5/user/query-sub-members` |
| `getSubUIDListUnlimited()` | YES :lock:      | GET | `/v5/user/submembers` |
| `getSubAccountAllApiKeys()` | YES :lock:      | GET | `/v5/user/sub-apikeys` |
| `setSubUIDFrozenState()` | YES :lock:      | POST | `/v5/user/frozen-sub-member` |
| `getQueryApiKey()` | YES :lock:      | GET | `/v5/user/query-api` |
| `getUIDWalletType()` | YES :lock:      | GET | `/v5/user/query-api` |
| `updateMasterApiKey()` | YES :lock:      | POST | `/v5/user/update-api` |
| `updateSubApiKey()` | YES :lock:      | POST | `/v5/user/update-sub-api` |
| `deleteMasterApiKey()` | YES :lock:      | POST | `/v5/user/delete-api` |
| `deleteSubApiKey()` | YES :lock:      | POST | `/v5/user/delete-sub-api` |
| `deleteSubMember()` | YES :lock:      | POST | `/v5/user/del-submember` |
| `getAffiliateUserInfo()` | YES :lock:      | GET | `/v5/user/aff-customer-info` |
| `getLeveragedTokenInfo()` | no :unlock:      | GET | `/v5/spot-lever-token/info` |
| `getLeveragedTokenMarket()` | no :unlock:      | GET | `/v5/spot-lever-token/reference` |
| `purchaseSpotLeveragedToken()` | YES :lock:      | POST | `/v5/spot-lever-token/purchase` |
| `redeemSpotLeveragedToken()` | YES :lock:      | POST | `/v5/spot-lever-token/redeem` |
| `getSpotLeveragedTokenOrderHistory()` | YES :lock:      | GET | `/v5/spot-lever-token/order-record` |
| `getVIPMarginData()` | no :unlock:      | GET | `/v5/spot-margin-trade/data` |
| `getHistoricalInterestRate()` | YES :lock:      | GET | `/v5/spot-margin-trade/interest-rate-history` |
| `toggleSpotMarginTrade()` | YES :lock:      | POST | `/v5/spot-margin-trade/switch-mode` |
| `setSpotMarginLeverage()` | YES :lock:      | POST | `/v5/spot-margin-trade/set-leverage` |
| `getSpotMarginState()` | YES :lock:      | GET | `/v5/spot-margin-trade/state` |
| `getSpotMarginCoinInfo()` | YES :lock:      | GET | `/v5/spot-cross-margin-trade/pledge-token` |
| `getSpotMarginBorrowableCoinInfo()` | YES :lock:      | GET | `/v5/spot-cross-margin-trade/borrow-token` |
| `getSpotMarginInterestAndQuota()` | YES :lock:      | GET | `/v5/spot-cross-margin-trade/loan-info` |
| `getSpotMarginLoanAccountInfo()` | YES :lock:      | GET | `/v5/spot-cross-margin-trade/account` |
| `spotMarginBorrow()` | YES :lock:      | POST | `/v5/spot-cross-margin-trade/loan` |
| `spotMarginRepay()` | YES :lock:      | POST | `/v5/spot-cross-margin-trade/repay` |
| `getSpotMarginBorrowOrderDetail()` | YES :lock:      | GET | `/v5/spot-cross-margin-trade/orders` |
| `getSpotMarginRepaymentOrderDetail()` | YES :lock:      | GET | `/v5/spot-cross-margin-trade/repay-history` |
| `toggleSpotCrossMarginTrade()` | YES :lock:      | POST | `/v5/spot-cross-margin-trade/switch` |
| `getInstitutionalLendingProductInfo()` | no :unlock:      | GET | `/v5/ins-loan/product-infos` |
| `getInstitutionalLendingMarginCoinInfo()` | no :unlock:      | GET | `/v5/ins-loan/ensure-tokens` |
| `getInstitutionalLendingMarginCoinInfoWithConversionRate()` | no :unlock:      | GET | `/v5/ins-loan/ensure-tokens-convert` |
| `getInstitutionalLendingLoanOrders()` | YES :lock:      | GET | `/v5/ins-loan/loan-order` |
| `getInstitutionalLendingRepayOrders()` | YES :lock:      | GET | `/v5/ins-loan/repaid-history` |
| `getInstitutionalLendingLTV()` | YES :lock:      | GET | `/v5/ins-loan/ltv` |
| `getInstitutionalLendingLTVWithLadderConversionRate()` | YES :lock:      | GET | `/v5/ins-loan/ltv-convert` |
| `bindOrUnbindUID()` | YES :lock:      | POST | `/v5/ins-loan/association-uid` |
| `getExchangeBrokerEarnings()` | YES :lock:      | GET | `/v5/broker/earnings-info` |
| `getExchangeBrokerAccountInfo()` | YES :lock:      | GET | `/v5/broker/account-info` |
| `getBrokerSubAccountDeposits()` | YES :lock:      | GET | `/v5/broker/asset/query-sub-member-deposit-record` |

# spot-client-v3.ts

This table includes all endpoints from the official Exchange API docs and corresponding SDK functions for each endpoint that are found in [spot-client-v3.ts](/src/spot-client-v3.ts). 

| Function | AUTH | HTTP Method | Endpoint |
| -------- | ------- | ----------- | -------- |
| `fetchServerTime()` | no :unlock:      | GET | `/spot/v3/public/symbols` |
| `getSymbols()` | no :unlock:      | GET | `/spot/v3/public/symbols` |
| `getOrderBook()` | no :unlock:      | GET | `/spot/v3/public/quote/depth` |
| `getMergedOrderBook()` | no :unlock:      | GET | `/spot/v3/public/quote/depth/merged` |
| `getTrades()` | no :unlock:      | GET | `/spot/v3/public/quote/trades` |
| `getCandles()` | no :unlock:      | GET | `/spot/v3/public/quote/kline` |
| `get24hrTicker()` | no :unlock:      | GET | `/spot/v3/public/quote/ticker/24hr` |
| `getLastTradedPrice()` | no :unlock:      | GET | `/spot/v3/public/quote/ticker/price` |
| `getBestBidAskPrice()` | no :unlock:      | GET | `/spot/v3/public/quote/ticker/bookTicker` |
| `submitOrder()` | YES :lock:      | POST | `/spot/v3/private/order` |
| `getOrder()` | YES :lock:      | GET | `/spot/v3/private/order` |
| `cancelOrder()` | YES :lock:      | POST | `/spot/v3/private/cancel-order` |
| `cancelOrderBatch()` | YES :lock:      | POST | `/spot/v3/private/cancel-orders` |
| `cancelOrderBatchIDs()` | YES :lock:      | POST | `/spot/v3/private/cancel-orders-by-ids` |
| `getOpenOrders()` | YES :lock:      | GET | `/spot/v3/private/open-orders` |
| `getPastOrders()` | YES :lock:      | GET | `/spot/v3/private/history-orders` |
| `getMyTrades()` | YES :lock:      | GET | `/spot/v3/private/my-trades` |
| `getBalances()` | YES :lock:      | GET | `/spot/v3/private/account` |
| `getServerTime()` | no :unlock:      | GET | `/v2/public/time` |
| `getLeveragedTokenAssetInfos()` | no :unlock:      | GET | `/spot/v3/public/infos` |
| `getLeveragedTokenMarketInfo()` | YES :lock:      | GET | `/spot/v3/private/reference` |
| `purchaseLeveragedToken()` | YES :lock:      | POST | `/spot/v3/private/purchase` |
| `redeemLeveragedToken()` | YES :lock:      | POST | `/spot/v3/private/redeem` |
| `getLeveragedTokenPRHistory()` | YES :lock:      | GET | `/spot/v3/private/record` |
| `borrowCrossMarginLoan()` | YES :lock:      | POST | `/spot/v3/private/cross-margin-loan` |
| `repayCrossMarginLoan()` | YES :lock:      | POST | `/spot/v3/private/cross-margin-repay` |
| `getCrossMarginBorrowingInfo()` | YES :lock:      | GET | `/spot/v3/private/cross-margin-orders` |
| `getCrossMarginAccountInfo()` | YES :lock:      | GET | `/spot/v3/private/cross-margin-account` |
| `getCrossMarginInterestQuota()` | YES :lock:      | GET | `/spot/v3/private/cross-margin-loan-info` |
| `getCrossMarginRepaymentHistory()` | YES :lock:      | GET | `/spot/v3/private/cross-margin-repay-history` |