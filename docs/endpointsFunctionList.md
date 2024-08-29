
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
| -------- | ------ | ----------- | -------- |
| `fetchServerTime()` | no 🔓 | GET | `/v5/market/time` |
| `getServerTime()` | no 🔓 | GET | `/v5/market/time` |
| `requestDemoTradingFunds()` | YES 🔒 | POST | `/v5/account/demo-apply-money` |
| `getKline()` | no 🔓 | GET | `/v5/market/kline` |
| `getMarkPriceKline()` | no 🔓 | GET | `/v5/market/mark-price-kline` |
| `getIndexPriceKline()` | no 🔓 | GET | `/v5/market/index-price-kline` |
| `getPremiumIndexPriceKline()` | no 🔓 | GET | `/v5/market/premium-index-price-kline` |
| `getOrderbook()` | no 🔓 | GET | `/v5/market/orderbook` |
| `getTickers()` | no 🔓 | GET | `/v5/market/tickers` |
| `getTickers()` | no 🔓 | GET | `/v5/market/tickers` |
| `getTickers()` | no 🔓 | GET | `/v5/market/tickers` |
| `getTickers()` | no 🔓 | GET | `/v5/market/tickers` |
| `getFundingRateHistory()` | no 🔓 | GET | `/v5/market/funding/history` |
| `getPublicTradingHistory()` | no 🔓 | GET | `/v5/market/recent-trade` |
| `getOpenInterest()` | no 🔓 | GET | `/v5/market/open-interest` |
| `getHistoricalVolatility()` | no 🔓 | GET | `/v5/market/historical-volatility` |
| `getInsurance()` | no 🔓 | GET | `/v5/market/insurance` |
| `getRiskLimit()` | no 🔓 | GET | `/v5/market/risk-limit` |
| `getOptionDeliveryPrice()` | no 🔓 | GET | `/v5/market/delivery-price` |
| `getDeliveryPrice()` | no 🔓 | GET | `/v5/market/delivery-price` |
| `getLongShortRatio()` | no 🔓 | GET | `/v5/market/account-ratio` |
| `submitOrder()` | YES 🔒 | POST | `/v5/order/create` |
| `amendOrder()` | YES 🔒 | POST | `/v5/order/amend` |
| `cancelOrder()` | YES 🔒 | POST | `/v5/order/cancel` |
| `getActiveOrders()` | YES 🔒 | GET | `/v5/order/realtime` |
| `cancelAllOrders()` | YES 🔒 | POST | `/v5/order/cancel-all` |
| `getHistoricOrders()` | YES 🔒 | GET | `/v5/order/history` |
| `batchSubmitOrders()` | YES 🔒 | POST | `/v5/order/create-batch` |
| `batchAmendOrders()` | YES 🔒 | POST | `/v5/order/amend-batch` |
| `batchCancelOrders()` | YES 🔒 | POST | `/v5/order/cancel-batch` |
| `getSpotBorrowCheck()` | YES 🔒 | GET | `/v5/order/spot-borrow-check` |
| `setDisconnectCancelAllWindow()` | YES 🔒 | POST | `/v5/order/disconnected-cancel-all` |
| `setDisconnectCancelAllWindowV2()` | YES 🔒 | POST | `/v5/order/disconnected-cancel-all` |
| `getPositionInfo()` | YES 🔒 | GET | `/v5/position/list` |
| `setLeverage()` | YES 🔒 | POST | `/v5/position/set-leverage` |
| `switchIsolatedMargin()` | YES 🔒 | POST | `/v5/position/switch-isolated` |
| `setTPSLMode()` | YES 🔒 | POST | `/v5/position/set-tpsl-mode` |
| `switchPositionMode()` | YES 🔒 | POST | `/v5/position/switch-mode` |
| `setRiskLimit()` | YES 🔒 | POST | `/v5/position/set-risk-limit` |
| `setTradingStop()` | YES 🔒 | POST | `/v5/position/trading-stop` |
| `setAutoAddMargin()` | YES 🔒 | POST | `/v5/position/set-auto-add-margin` |
| `addOrReduceMargin()` | YES 🔒 | POST | `/v5/position/add-margin` |
| `getExecutionList()` | YES 🔒 | GET | `/v5/execution/list` |
| `getClosedPnL()` | YES 🔒 | GET | `/v5/position/closed-pnl` |
| `movePosition()` | YES 🔒 | POST | `/v5/position/move-positions` |
| `getMovePositionHistory()` | YES 🔒 | GET | `/v5/position/move-history` |
| `confirmNewRiskLimit()` | YES 🔒 | POST | `/v5/position/confirm-pending-mmr` |
| `getPreUpgradeOrderHistory()` | YES 🔒 | GET | `/v5/pre-upgrade/order/history` |
| `getPreUpgradeTradeHistory()` | YES 🔒 | GET | `/v5/pre-upgrade/execution/list` |
| `getPreUpgradeClosedPnl()` | YES 🔒 | GET | `/v5/pre-upgrade/position/closed-pnl` |
| `getPreUpgradeTransactions()` | YES 🔒 | GET | `/v5/pre-upgrade/account/transaction-log` |
| `getPreUpgradeOptionDeliveryRecord()` | YES 🔒 | GET | `/v5/pre-upgrade/asset/delivery-record` |
| `getPreUpgradeUSDCSessionSettlements()` | YES 🔒 | GET | `/v5/pre-upgrade/asset/settlement-record` |
| `getWalletBalance()` | YES 🔒 | GET | `/v5/account/wallet-balance` |
| `upgradeToUnifiedAccount()` | YES 🔒 | POST | `/v5/account/upgrade-to-uta` |
| `getBorrowHistory()` | YES 🔒 | GET | `/v5/account/borrow-history` |
| `repayLiability()` | YES 🔒 | POST | `/v5/account/quick-repayment` |
| `setCollateralCoin()` | YES 🔒 | POST | `/v5/account/set-collateral-switch` |
| `batchSetCollateralCoin()` | YES 🔒 | POST | `/v5/account/set-collateral-switch-batch` |
| `getCollateralInfo()` | YES 🔒 | GET | `/v5/account/collateral-info` |
| `getCoinGreeks()` | YES 🔒 | GET | `/v5/asset/coin-greeks` |
| `getFeeRate()` | YES 🔒 | GET | `/v5/account/fee-rate` |
| `getAccountInfo()` | YES 🔒 | GET | `/v5/account/info` |
| `getTransactionLog()` | YES 🔒 | GET | `/v5/account/transaction-log` |
| `getClassicTransactionLogs()` | YES 🔒 | GET | `/v5/account/contract-transaction-log` |
| `getSMPGroup()` | YES 🔒 | GET | `/v5/account/smp-group` |
| `setMarginMode()` | YES 🔒 | POST | `/v5/account/set-margin-mode` |
| `setSpotHedging()` | YES 🔒 | POST | `/v5/account/set-hedging-mode` |
| `setMMP()` | YES 🔒 | POST | `/v5/account/mmp-modify` |
| `resetMMP()` | YES 🔒 | POST | `/v5/account/mmp-reset` |
| `getMMPState()` | YES 🔒 | GET | `/v5/account/mmp-state` |
| `getDCPInfo()` | YES 🔒 | GET | `/v5/account/query-dcp-info` |
| `getCoinExchangeRecords()` | YES 🔒 | GET | `/v5/asset/exchange/order-record` |
| `getDeliveryRecord()` | YES 🔒 | GET | `/v5/asset/delivery-record` |
| `getSettlementRecords()` | YES 🔒 | GET | `/v5/asset/settlement-record` |
| `getAssetInfo()` | YES 🔒 | GET | `/v5/asset/transfer/query-asset-info` |
| `getAllCoinsBalance()` | YES 🔒 | GET | `/v5/asset/transfer/query-account-coins-balance` |
| `getCoinBalance()` | YES 🔒 | GET | `/v5/asset/transfer/query-account-coin-balance` |
| `getTransferableCoinList()` | YES 🔒 | GET | `/v5/asset/transfer/query-transfer-coin-list` |
| `createInternalTransfer()` | YES 🔒 | POST | `/v5/asset/transfer/inter-transfer` |
| `getInternalTransferRecords()` | YES 🔒 | GET | `/v5/asset/transfer/query-inter-transfer-list` |
| `getSubUID()` | YES 🔒 | GET | `/v5/asset/transfer/query-sub-member-list` |
| `enableUniversalTransferForSubUIDs()` | YES 🔒 | POST | `/v5/asset/transfer/save-transfer-sub-member` |
| `createUniversalTransfer()` | YES 🔒 | POST | `/v5/asset/transfer/universal-transfer` |
| `getUniversalTransferRecords()` | YES 🔒 | GET | `/v5/asset/transfer/query-universal-transfer-list` |
| `getAllowedDepositCoinInfo()` | no 🔓 | GET | `/v5/asset/deposit/query-allowed-list` |
| `setDepositAccount()` | YES 🔒 | POST | `/v5/asset/deposit/deposit-to-account` |
| `getDepositRecords()` | YES 🔒 | GET | `/v5/asset/deposit/query-record` |
| `getSubAccountDepositRecords()` | YES 🔒 | GET | `/v5/asset/deposit/query-sub-member-record` |
| `getInternalDepositRecords()` | YES 🔒 | GET | `/v5/asset/deposit/query-internal-record` |
| `getMasterDepositAddress()` | YES 🔒 | GET | `/v5/asset/deposit/query-address` |
| `getSubDepositAddress()` | YES 🔒 | GET | `/v5/asset/deposit/query-sub-member-address` |
| `querySubMemberAddress()` | YES 🔒 | GET | `/v5/asset/deposit/query-sub-member-address` |
| `getCoinInfo()` | YES 🔒 | GET | `/v5/asset/coin/query-info` |
| `getWithdrawalRecords()` | YES 🔒 | GET | `/v5/asset/withdraw/query-record` |
| `getWithdrawableAmount()` | YES 🔒 | GET | `/v5/asset/withdraw/withdrawable-amount` |
| `getExchangeEntities()` | YES 🔒 | GET | `/v5/asset/withdraw/vasp/list` |
| `submitWithdrawal()` | YES 🔒 | POST | `/v5/asset/withdraw/create` |
| `cancelWithdrawal()` | YES 🔒 | POST | `/v5/asset/withdraw/cancel` |
| `getConvertCoins()` | YES 🔒 | GET | `/v5/asset/exchange/query-coin-list` |
| `requestConvertQuote()` | YES 🔒 | POST | `/v5/asset/exchange/quote-apply` |
| `confirmConvertQuote()` | YES 🔒 | POST | `/v5/asset/exchange/convert-execute` |
| `getConvertStatus()` | YES 🔒 | GET | `/v5/asset/exchange/convert-result-query` |
| `getConvertHistory()` | YES 🔒 | GET | `/v5/asset/exchange/query-convert-history` |
| `createSubMember()` | YES 🔒 | POST | `/v5/user/create-sub-member` |
| `createSubUIDAPIKey()` | YES 🔒 | POST | `/v5/user/create-sub-api` |
| `getSubUIDList()` | YES 🔒 | GET | `/v5/user/query-sub-members` |
| `getSubUIDListUnlimited()` | YES 🔒 | GET | `/v5/user/submembers` |
| `getSubAccountAllApiKeys()` | YES 🔒 | GET | `/v5/user/sub-apikeys` |
| `setSubUIDFrozenState()` | YES 🔒 | POST | `/v5/user/frozen-sub-member` |
| `getQueryApiKey()` | YES 🔒 | GET | `/v5/user/query-api` |
| `getUIDWalletType()` | YES 🔒 | GET | `/v5/user/query-api` |
| `updateMasterApiKey()` | YES 🔒 | POST | `/v5/user/update-api` |
| `updateSubApiKey()` | YES 🔒 | POST | `/v5/user/update-sub-api` |
| `deleteMasterApiKey()` | YES 🔒 | POST | `/v5/user/delete-api` |
| `deleteSubApiKey()` | YES 🔒 | POST | `/v5/user/delete-sub-api` |
| `deleteSubMember()` | YES 🔒 | POST | `/v5/user/del-submember` |
| `getAffiliateUserInfo()` | YES 🔒 | GET | `/v5/user/aff-customer-info` |
| `getLeveragedTokenInfo()` | no 🔓 | GET | `/v5/spot-lever-token/info` |
| `getLeveragedTokenMarket()` | no 🔓 | GET | `/v5/spot-lever-token/reference` |
| `purchaseSpotLeveragedToken()` | YES 🔒 | POST | `/v5/spot-lever-token/purchase` |
| `redeemSpotLeveragedToken()` | YES 🔒 | POST | `/v5/spot-lever-token/redeem` |
| `getSpotLeveragedTokenOrderHistory()` | YES 🔒 | GET | `/v5/spot-lever-token/order-record` |
| `getVIPMarginData()` | no 🔓 | GET | `/v5/spot-margin-trade/data` |
| `getHistoricalInterestRate()` | YES 🔒 | GET | `/v5/spot-margin-trade/interest-rate-history` |
| `toggleSpotMarginTrade()` | YES 🔒 | POST | `/v5/spot-margin-trade/switch-mode` |
| `setSpotMarginLeverage()` | YES 🔒 | POST | `/v5/spot-margin-trade/set-leverage` |
| `getSpotMarginState()` | YES 🔒 | GET | `/v5/spot-margin-trade/state` |
| `getSpotMarginCoinInfo()` | YES 🔒 | GET | `/v5/spot-cross-margin-trade/pledge-token` |
| `getSpotMarginBorrowableCoinInfo()` | YES 🔒 | GET | `/v5/spot-cross-margin-trade/borrow-token` |
| `getSpotMarginInterestAndQuota()` | YES 🔒 | GET | `/v5/spot-cross-margin-trade/loan-info` |
| `getSpotMarginLoanAccountInfo()` | YES 🔒 | GET | `/v5/spot-cross-margin-trade/account` |
| `spotMarginBorrow()` | YES 🔒 | POST | `/v5/spot-cross-margin-trade/loan` |
| `spotMarginRepay()` | YES 🔒 | POST | `/v5/spot-cross-margin-trade/repay` |
| `getSpotMarginBorrowOrderDetail()` | YES 🔒 | GET | `/v5/spot-cross-margin-trade/orders` |
| `getSpotMarginRepaymentOrderDetail()` | YES 🔒 | GET | `/v5/spot-cross-margin-trade/repay-history` |
| `toggleSpotCrossMarginTrade()` | YES 🔒 | POST | `/v5/spot-cross-margin-trade/switch` |
| `getInstitutionalLendingProductInfo()` | no 🔓 | GET | `/v5/ins-loan/product-infos` |
| `getInstitutionalLendingMarginCoinInfo()` | no 🔓 | GET | `/v5/ins-loan/ensure-tokens` |
| `getInstitutionalLendingMarginCoinInfoWithConversionRate()` | no 🔓 | GET | `/v5/ins-loan/ensure-tokens-convert` |
| `getInstitutionalLendingLoanOrders()` | YES 🔒 | GET | `/v5/ins-loan/loan-order` |
| `getInstitutionalLendingRepayOrders()` | YES 🔒 | GET | `/v5/ins-loan/repaid-history` |
| `getInstitutionalLendingLTV()` | YES 🔒 | GET | `/v5/ins-loan/ltv` |
| `getInstitutionalLendingLTVWithLadderConversionRate()` | YES 🔒 | GET | `/v5/ins-loan/ltv-convert` |
| `bindOrUnbindUID()` | YES 🔒 | POST | `/v5/ins-loan/association-uid` |
| `getExchangeBrokerEarnings()` | YES 🔒 | GET | `/v5/broker/earnings-info` |
| `getExchangeBrokerAccountInfo()` | YES 🔒 | GET | `/v5/broker/account-info` |
| `getBrokerSubAccountDeposits()` | YES 🔒 | GET | `/v5/broker/asset/query-sub-member-deposit-record` |

# spot-client-v3.ts

This table includes all endpoints from the official Exchange API docs and corresponding SDK functions for each endpoint that are found in [spot-client-v3.ts](/src/spot-client-v3.ts). 

| Function | AUTH | HTTP Method | Endpoint |
| -------- | ------ | ----------- | -------- |
| `fetchServerTime()` | no 🔓 | GET | `/spot/v3/public/symbols` |
| `getSymbols()` | no 🔓 | GET | `/spot/v3/public/symbols` |
| `getOrderBook()` | no 🔓 | GET | `/spot/v3/public/quote/depth` |
| `getMergedOrderBook()` | no 🔓 | GET | `/spot/v3/public/quote/depth/merged` |
| `getTrades()` | no 🔓 | GET | `/spot/v3/public/quote/trades` |
| `getCandles()` | no 🔓 | GET | `/spot/v3/public/quote/kline` |
| `get24hrTicker()` | no 🔓 | GET | `/spot/v3/public/quote/ticker/24hr` |
| `getLastTradedPrice()` | no 🔓 | GET | `/spot/v3/public/quote/ticker/price` |
| `getBestBidAskPrice()` | no 🔓 | GET | `/spot/v3/public/quote/ticker/bookTicker` |
| `submitOrder()` | YES 🔒 | POST | `/spot/v3/private/order` |
| `getOrder()` | YES 🔒 | GET | `/spot/v3/private/order` |
| `cancelOrder()` | YES 🔒 | POST | `/spot/v3/private/cancel-order` |
| `cancelOrderBatch()` | YES 🔒 | POST | `/spot/v3/private/cancel-orders` |
| `cancelOrderBatchIDs()` | YES 🔒 | POST | `/spot/v3/private/cancel-orders-by-ids` |
| `getOpenOrders()` | YES 🔒 | GET | `/spot/v3/private/open-orders` |
| `getPastOrders()` | YES 🔒 | GET | `/spot/v3/private/history-orders` |
| `getMyTrades()` | YES 🔒 | GET | `/spot/v3/private/my-trades` |
| `getBalances()` | YES 🔒 | GET | `/spot/v3/private/account` |
| `getServerTime()` | no 🔓 | GET | `/v2/public/time` |
| `getLeveragedTokenAssetInfos()` | no 🔓 | GET | `/spot/v3/public/infos` |
| `getLeveragedTokenMarketInfo()` | YES 🔒 | GET | `/spot/v3/private/reference` |
| `purchaseLeveragedToken()` | YES 🔒 | POST | `/spot/v3/private/purchase` |
| `redeemLeveragedToken()` | YES 🔒 | POST | `/spot/v3/private/redeem` |
| `getLeveragedTokenPRHistory()` | YES 🔒 | GET | `/spot/v3/private/record` |
| `borrowCrossMarginLoan()` | YES 🔒 | POST | `/spot/v3/private/cross-margin-loan` |
| `repayCrossMarginLoan()` | YES 🔒 | POST | `/spot/v3/private/cross-margin-repay` |
| `getCrossMarginBorrowingInfo()` | YES 🔒 | GET | `/spot/v3/private/cross-margin-orders` |
| `getCrossMarginAccountInfo()` | YES 🔒 | GET | `/spot/v3/private/cross-margin-account` |
| `getCrossMarginInterestQuota()` | YES 🔒 | GET | `/spot/v3/private/cross-margin-loan-info` |
| `getCrossMarginRepaymentHistory()` | YES 🔒 | GET | `/spot/v3/private/cross-margin-repay-history` |