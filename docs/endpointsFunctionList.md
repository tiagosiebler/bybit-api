
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

| Function | Authentication | HTTP Method | Endpoint |
| -------- | :------: | :------: | -------- |
| `fetchServerTime()` | :unlock: no | GET | `/v5/market/time` |
| `getServerTime()` | :unlock: no | GET | `/v5/market/time` |
| `requestDemoTradingFunds()` | :lock: YES  | POST | `/v5/account/demo-apply-money` |
| `getKline()` | :unlock: no | GET | `/v5/market/kline` |
| `getMarkPriceKline()` | :unlock: no | GET | `/v5/market/mark-price-kline` |
| `getIndexPriceKline()` | :unlock: no | GET | `/v5/market/index-price-kline` |
| `getPremiumIndexPriceKline()` | :unlock: no | GET | `/v5/market/premium-index-price-kline` |
| `getOrderbook()` | :unlock: no | GET | `/v5/market/orderbook` |
| `getTickers()` | :unlock: no | GET | `/v5/market/tickers` |
| `getTickers()` | :unlock: no | GET | `/v5/market/tickers` |
| `getTickers()` | :unlock: no | GET | `/v5/market/tickers` |
| `getTickers()` | :unlock: no | GET | `/v5/market/tickers` |
| `getFundingRateHistory()` | :unlock: no | GET | `/v5/market/funding/history` |
| `getPublicTradingHistory()` | :unlock: no | GET | `/v5/market/recent-trade` |
| `getOpenInterest()` | :unlock: no | GET | `/v5/market/open-interest` |
| `getHistoricalVolatility()` | :unlock: no | GET | `/v5/market/historical-volatility` |
| `getInsurance()` | :unlock: no | GET | `/v5/market/insurance` |
| `getRiskLimit()` | :unlock: no | GET | `/v5/market/risk-limit` |
| `getOptionDeliveryPrice()` | :unlock: no | GET | `/v5/market/delivery-price` |
| `getDeliveryPrice()` | :unlock: no | GET | `/v5/market/delivery-price` |
| `getLongShortRatio()` | :unlock: no | GET | `/v5/market/account-ratio` |
| `submitOrder()` | :lock: YES  | POST | `/v5/order/create` |
| `amendOrder()` | :lock: YES  | POST | `/v5/order/amend` |
| `cancelOrder()` | :lock: YES  | POST | `/v5/order/cancel` |
| `getActiveOrders()` | :lock: YES  | GET | `/v5/order/realtime` |
| `cancelAllOrders()` | :lock: YES  | POST | `/v5/order/cancel-all` |
| `getHistoricOrders()` | :lock: YES  | GET | `/v5/order/history` |
| `batchSubmitOrders()` | :lock: YES  | POST | `/v5/order/create-batch` |
| `batchAmendOrders()` | :lock: YES  | POST | `/v5/order/amend-batch` |
| `batchCancelOrders()` | :lock: YES  | POST | `/v5/order/cancel-batch` |
| `getSpotBorrowCheck()` | :lock: YES  | GET | `/v5/order/spot-borrow-check` |
| `setDisconnectCancelAllWindow()` | :lock: YES  | POST | `/v5/order/disconnected-cancel-all` |
| `setDisconnectCancelAllWindowV2()` | :lock: YES  | POST | `/v5/order/disconnected-cancel-all` |
| `getPositionInfo()` | :lock: YES  | GET | `/v5/position/list` |
| `setLeverage()` | :lock: YES  | POST | `/v5/position/set-leverage` |
| `switchIsolatedMargin()` | :lock: YES  | POST | `/v5/position/switch-isolated` |
| `setTPSLMode()` | :lock: YES  | POST | `/v5/position/set-tpsl-mode` |
| `switchPositionMode()` | :lock: YES  | POST | `/v5/position/switch-mode` |
| `setRiskLimit()` | :lock: YES  | POST | `/v5/position/set-risk-limit` |
| `setTradingStop()` | :lock: YES  | POST | `/v5/position/trading-stop` |
| `setAutoAddMargin()` | :lock: YES  | POST | `/v5/position/set-auto-add-margin` |
| `addOrReduceMargin()` | :lock: YES  | POST | `/v5/position/add-margin` |
| `getExecutionList()` | :lock: YES  | GET | `/v5/execution/list` |
| `getClosedPnL()` | :lock: YES  | GET | `/v5/position/closed-pnl` |
| `movePosition()` | :lock: YES  | POST | `/v5/position/move-positions` |
| `getMovePositionHistory()` | :lock: YES  | GET | `/v5/position/move-history` |
| `confirmNewRiskLimit()` | :lock: YES  | POST | `/v5/position/confirm-pending-mmr` |
| `getPreUpgradeOrderHistory()` | :lock: YES  | GET | `/v5/pre-upgrade/order/history` |
| `getPreUpgradeTradeHistory()` | :lock: YES  | GET | `/v5/pre-upgrade/execution/list` |
| `getPreUpgradeClosedPnl()` | :lock: YES  | GET | `/v5/pre-upgrade/position/closed-pnl` |
| `getPreUpgradeTransactions()` | :lock: YES  | GET | `/v5/pre-upgrade/account/transaction-log` |
| `getPreUpgradeOptionDeliveryRecord()` | :lock: YES  | GET | `/v5/pre-upgrade/asset/delivery-record` |
| `getPreUpgradeUSDCSessionSettlements()` | :lock: YES  | GET | `/v5/pre-upgrade/asset/settlement-record` |
| `getWalletBalance()` | :lock: YES  | GET | `/v5/account/wallet-balance` |
| `upgradeToUnifiedAccount()` | :lock: YES  | POST | `/v5/account/upgrade-to-uta` |
| `getBorrowHistory()` | :lock: YES  | GET | `/v5/account/borrow-history` |
| `repayLiability()` | :lock: YES  | POST | `/v5/account/quick-repayment` |
| `setCollateralCoin()` | :lock: YES  | POST | `/v5/account/set-collateral-switch` |
| `batchSetCollateralCoin()` | :lock: YES  | POST | `/v5/account/set-collateral-switch-batch` |
| `getCollateralInfo()` | :lock: YES  | GET | `/v5/account/collateral-info` |
| `getCoinGreeks()` | :lock: YES  | GET | `/v5/asset/coin-greeks` |
| `getFeeRate()` | :lock: YES  | GET | `/v5/account/fee-rate` |
| `getAccountInfo()` | :lock: YES  | GET | `/v5/account/info` |
| `getTransactionLog()` | :lock: YES  | GET | `/v5/account/transaction-log` |
| `getClassicTransactionLogs()` | :lock: YES  | GET | `/v5/account/contract-transaction-log` |
| `getSMPGroup()` | :lock: YES  | GET | `/v5/account/smp-group` |
| `setMarginMode()` | :lock: YES  | POST | `/v5/account/set-margin-mode` |
| `setSpotHedging()` | :lock: YES  | POST | `/v5/account/set-hedging-mode` |
| `setMMP()` | :lock: YES  | POST | `/v5/account/mmp-modify` |
| `resetMMP()` | :lock: YES  | POST | `/v5/account/mmp-reset` |
| `getMMPState()` | :lock: YES  | GET | `/v5/account/mmp-state` |
| `getDCPInfo()` | :lock: YES  | GET | `/v5/account/query-dcp-info` |
| `getCoinExchangeRecords()` | :lock: YES  | GET | `/v5/asset/exchange/order-record` |
| `getDeliveryRecord()` | :lock: YES  | GET | `/v5/asset/delivery-record` |
| `getSettlementRecords()` | :lock: YES  | GET | `/v5/asset/settlement-record` |
| `getAssetInfo()` | :lock: YES  | GET | `/v5/asset/transfer/query-asset-info` |
| `getAllCoinsBalance()` | :lock: YES  | GET | `/v5/asset/transfer/query-account-coins-balance` |
| `getCoinBalance()` | :lock: YES  | GET | `/v5/asset/transfer/query-account-coin-balance` |
| `getTransferableCoinList()` | :lock: YES  | GET | `/v5/asset/transfer/query-transfer-coin-list` |
| `createInternalTransfer()` | :lock: YES  | POST | `/v5/asset/transfer/inter-transfer` |
| `getInternalTransferRecords()` | :lock: YES  | GET | `/v5/asset/transfer/query-inter-transfer-list` |
| `getSubUID()` | :lock: YES  | GET | `/v5/asset/transfer/query-sub-member-list` |
| `enableUniversalTransferForSubUIDs()` | :lock: YES  | POST | `/v5/asset/transfer/save-transfer-sub-member` |
| `createUniversalTransfer()` | :lock: YES  | POST | `/v5/asset/transfer/universal-transfer` |
| `getUniversalTransferRecords()` | :lock: YES  | GET | `/v5/asset/transfer/query-universal-transfer-list` |
| `getAllowedDepositCoinInfo()` | :unlock: no | GET | `/v5/asset/deposit/query-allowed-list` |
| `setDepositAccount()` | :lock: YES  | POST | `/v5/asset/deposit/deposit-to-account` |
| `getDepositRecords()` | :lock: YES  | GET | `/v5/asset/deposit/query-record` |
| `getSubAccountDepositRecords()` | :lock: YES  | GET | `/v5/asset/deposit/query-sub-member-record` |
| `getInternalDepositRecords()` | :lock: YES  | GET | `/v5/asset/deposit/query-internal-record` |
| `getMasterDepositAddress()` | :lock: YES  | GET | `/v5/asset/deposit/query-address` |
| `getSubDepositAddress()` | :lock: YES  | GET | `/v5/asset/deposit/query-sub-member-address` |
| `querySubMemberAddress()` | :lock: YES  | GET | `/v5/asset/deposit/query-sub-member-address` |
| `getCoinInfo()` | :lock: YES  | GET | `/v5/asset/coin/query-info` |
| `getWithdrawalRecords()` | :lock: YES  | GET | `/v5/asset/withdraw/query-record` |
| `getWithdrawableAmount()` | :lock: YES  | GET | `/v5/asset/withdraw/withdrawable-amount` |
| `getExchangeEntities()` | :lock: YES  | GET | `/v5/asset/withdraw/vasp/list` |
| `submitWithdrawal()` | :lock: YES  | POST | `/v5/asset/withdraw/create` |
| `cancelWithdrawal()` | :lock: YES  | POST | `/v5/asset/withdraw/cancel` |
| `getConvertCoins()` | :lock: YES  | GET | `/v5/asset/exchange/query-coin-list` |
| `requestConvertQuote()` | :lock: YES  | POST | `/v5/asset/exchange/quote-apply` |
| `confirmConvertQuote()` | :lock: YES  | POST | `/v5/asset/exchange/convert-execute` |
| `getConvertStatus()` | :lock: YES  | GET | `/v5/asset/exchange/convert-result-query` |
| `getConvertHistory()` | :lock: YES  | GET | `/v5/asset/exchange/query-convert-history` |
| `createSubMember()` | :lock: YES  | POST | `/v5/user/create-sub-member` |
| `createSubUIDAPIKey()` | :lock: YES  | POST | `/v5/user/create-sub-api` |
| `getSubUIDList()` | :lock: YES  | GET | `/v5/user/query-sub-members` |
| `getSubUIDListUnlimited()` | :lock: YES  | GET | `/v5/user/submembers` |
| `getSubAccountAllApiKeys()` | :lock: YES  | GET | `/v5/user/sub-apikeys` |
| `setSubUIDFrozenState()` | :lock: YES  | POST | `/v5/user/frozen-sub-member` |
| `getQueryApiKey()` | :lock: YES  | GET | `/v5/user/query-api` |
| `getUIDWalletType()` | :lock: YES  | GET | `/v5/user/query-api` |
| `updateMasterApiKey()` | :lock: YES  | POST | `/v5/user/update-api` |
| `updateSubApiKey()` | :lock: YES  | POST | `/v5/user/update-sub-api` |
| `deleteMasterApiKey()` | :lock: YES  | POST | `/v5/user/delete-api` |
| `deleteSubApiKey()` | :lock: YES  | POST | `/v5/user/delete-sub-api` |
| `deleteSubMember()` | :lock: YES  | POST | `/v5/user/del-submember` |
| `getAffiliateUserInfo()` | :lock: YES  | GET | `/v5/user/aff-customer-info` |
| `getLeveragedTokenInfo()` | :unlock: no | GET | `/v5/spot-lever-token/info` |
| `getLeveragedTokenMarket()` | :unlock: no | GET | `/v5/spot-lever-token/reference` |
| `purchaseSpotLeveragedToken()` | :lock: YES  | POST | `/v5/spot-lever-token/purchase` |
| `redeemSpotLeveragedToken()` | :lock: YES  | POST | `/v5/spot-lever-token/redeem` |
| `getSpotLeveragedTokenOrderHistory()` | :lock: YES  | GET | `/v5/spot-lever-token/order-record` |
| `getVIPMarginData()` | :unlock: no | GET | `/v5/spot-margin-trade/data` |
| `getHistoricalInterestRate()` | :lock: YES  | GET | `/v5/spot-margin-trade/interest-rate-history` |
| `toggleSpotMarginTrade()` | :lock: YES  | POST | `/v5/spot-margin-trade/switch-mode` |
| `setSpotMarginLeverage()` | :lock: YES  | POST | `/v5/spot-margin-trade/set-leverage` |
| `getSpotMarginState()` | :lock: YES  | GET | `/v5/spot-margin-trade/state` |
| `getSpotMarginCoinInfo()` | :lock: YES  | GET | `/v5/spot-cross-margin-trade/pledge-token` |
| `getSpotMarginBorrowableCoinInfo()` | :lock: YES  | GET | `/v5/spot-cross-margin-trade/borrow-token` |
| `getSpotMarginInterestAndQuota()` | :lock: YES  | GET | `/v5/spot-cross-margin-trade/loan-info` |
| `getSpotMarginLoanAccountInfo()` | :lock: YES  | GET | `/v5/spot-cross-margin-trade/account` |
| `spotMarginBorrow()` | :lock: YES  | POST | `/v5/spot-cross-margin-trade/loan` |
| `spotMarginRepay()` | :lock: YES  | POST | `/v5/spot-cross-margin-trade/repay` |
| `getSpotMarginBorrowOrderDetail()` | :lock: YES  | GET | `/v5/spot-cross-margin-trade/orders` |
| `getSpotMarginRepaymentOrderDetail()` | :lock: YES  | GET | `/v5/spot-cross-margin-trade/repay-history` |
| `toggleSpotCrossMarginTrade()` | :lock: YES  | POST | `/v5/spot-cross-margin-trade/switch` |
| `getInstitutionalLendingProductInfo()` | :unlock: no | GET | `/v5/ins-loan/product-infos` |
| `getInstitutionalLendingMarginCoinInfo()` | :unlock: no | GET | `/v5/ins-loan/ensure-tokens` |
| `getInstitutionalLendingMarginCoinInfoWithConversionRate()` | :unlock: no | GET | `/v5/ins-loan/ensure-tokens-convert` |
| `getInstitutionalLendingLoanOrders()` | :lock: YES  | GET | `/v5/ins-loan/loan-order` |
| `getInstitutionalLendingRepayOrders()` | :lock: YES  | GET | `/v5/ins-loan/repaid-history` |
| `getInstitutionalLendingLTV()` | :lock: YES  | GET | `/v5/ins-loan/ltv` |
| `getInstitutionalLendingLTVWithLadderConversionRate()` | :lock: YES  | GET | `/v5/ins-loan/ltv-convert` |
| `bindOrUnbindUID()` | :lock: YES  | POST | `/v5/ins-loan/association-uid` |
| `getExchangeBrokerEarnings()` | :lock: YES  | GET | `/v5/broker/earnings-info` |
| `getExchangeBrokerAccountInfo()` | :lock: YES  | GET | `/v5/broker/account-info` |
| `getBrokerSubAccountDeposits()` | :lock: YES  | GET | `/v5/broker/asset/query-sub-member-deposit-record` |

# spot-client-v3.ts

This table includes all endpoints from the official Exchange API docs and corresponding SDK functions for each endpoint that are found in [spot-client-v3.ts](/src/spot-client-v3.ts). 

| Function | Authentication | HTTP Method | Endpoint |
| -------- | :------: | :------: | -------- |
| `fetchServerTime()` | :unlock: no | GET | `/spot/v3/public/symbols` |
| `getSymbols()` | :unlock: no | GET | `/spot/v3/public/symbols` |
| `getOrderBook()` | :unlock: no | GET | `/spot/v3/public/quote/depth` |
| `getMergedOrderBook()` | :unlock: no | GET | `/spot/v3/public/quote/depth/merged` |
| `getTrades()` | :unlock: no | GET | `/spot/v3/public/quote/trades` |
| `getCandles()` | :unlock: no | GET | `/spot/v3/public/quote/kline` |
| `get24hrTicker()` | :unlock: no | GET | `/spot/v3/public/quote/ticker/24hr` |
| `getLastTradedPrice()` | :unlock: no | GET | `/spot/v3/public/quote/ticker/price` |
| `getBestBidAskPrice()` | :unlock: no | GET | `/spot/v3/public/quote/ticker/bookTicker` |
| `submitOrder()` | :lock: YES  | POST | `/spot/v3/private/order` |
| `getOrder()` | :lock: YES  | GET | `/spot/v3/private/order` |
| `cancelOrder()` | :lock: YES  | POST | `/spot/v3/private/cancel-order` |
| `cancelOrderBatch()` | :lock: YES  | POST | `/spot/v3/private/cancel-orders` |
| `cancelOrderBatchIDs()` | :lock: YES  | POST | `/spot/v3/private/cancel-orders-by-ids` |
| `getOpenOrders()` | :lock: YES  | GET | `/spot/v3/private/open-orders` |
| `getPastOrders()` | :lock: YES  | GET | `/spot/v3/private/history-orders` |
| `getMyTrades()` | :lock: YES  | GET | `/spot/v3/private/my-trades` |
| `getBalances()` | :lock: YES  | GET | `/spot/v3/private/account` |
| `getServerTime()` | :unlock: no | GET | `/v2/public/time` |
| `getLeveragedTokenAssetInfos()` | :unlock: no | GET | `/spot/v3/public/infos` |
| `getLeveragedTokenMarketInfo()` | :lock: YES  | GET | `/spot/v3/private/reference` |
| `purchaseLeveragedToken()` | :lock: YES  | POST | `/spot/v3/private/purchase` |
| `redeemLeveragedToken()` | :lock: YES  | POST | `/spot/v3/private/redeem` |
| `getLeveragedTokenPRHistory()` | :lock: YES  | GET | `/spot/v3/private/record` |
| `borrowCrossMarginLoan()` | :lock: YES  | POST | `/spot/v3/private/cross-margin-loan` |
| `repayCrossMarginLoan()` | :lock: YES  | POST | `/spot/v3/private/cross-margin-repay` |
| `getCrossMarginBorrowingInfo()` | :lock: YES  | GET | `/spot/v3/private/cross-margin-orders` |
| `getCrossMarginAccountInfo()` | :lock: YES  | GET | `/spot/v3/private/cross-margin-account` |
| `getCrossMarginInterestQuota()` | :lock: YES  | GET | `/spot/v3/private/cross-margin-loan-info` |
| `getCrossMarginRepaymentHistory()` | :lock: YES  | GET | `/spot/v3/private/cross-margin-repay-history` |