import {
  APIResponseV3,
  APIResponseV3WithTime,
  AccountCoinBalanceV5,
  AccountInfoV5,
  AccountMarginModeV5,
  AccountOrderV5,
  AccountTypeV5,
  AllCoinsBalanceV5,
  AllowedDepositCoinInfoV5,
  AmendOrderParamsV5,
  ApiKeyInfoV5,
  AssetInfoV5,
  BatchAmendOrderParamsV5,
  BatchAmendOrderResult,
  BatchCancelOrderParamsV5,
  BatchCancelOrderResult,
  BatchOrderParamsV5,
  BatchOrderResult,
  BatchOrdersResult,
  BorrowHistoryRecordV5,
  CancelAllOrdersParamsV5,
  CancelOrderParamsV5,
  CategoryCursorListV5,
  CategoryListV5,
  CategorySymbolListV5,
  CategoryV5,
  ClosedPnLV5,
  CoinExchangeRecordV5,
  CoinGreeksV5,
  CoinInfoV5,
  CollateralInfoV5,
  CreateSubApiKeyParamsV5,
  CreateSubApiKeyResultV5,
  CreateSubMemberParamsV5,
  CreateSubMemberResultV5,
  CursorListV5,
  DeliveryRecordV5,
  DepositAddressResultV5,
  DepositRecordV5,
  ExecutionV5,
  FeeRateV5,
  FundingRateHistoryResponseV5,
  GetAccountCoinBalanceParamsV5,
  GetAccountOrdersParams,
  GetAllCoinsBalanceParamsV5,
  GetAllowedDepositCoinInfoParamsV5,
  GetAssetInfoParamsV5,
  GetBorrowHistoryParamsV5,
  GetClosedPnLParamsV5,
  GetCoinExchangeRecordParamsV5,
  GetDeliveryRecordParamsV5,
  GetDepositRecordParamsV5,
  GetExecutionListParamsV5,
  GetFundingRateHistoryParamsV5,
  GetHistoricalVolatilityParamsV5,
  GetIndexPriceKlineParamsV5,
  GetInstrumentsInfoParamsV5,
  GetInsuranceParamsV5,
  GetInternalTransferParamsV5,
  GetKlineParamsV5,
  GetMarkPriceKlineParamsV5,
  GetOpenInterestParamsV5,
  GetOptionDeliveryPriceParamsV5,
  GetOrderbookParamsV5,
  GetPremiumIndexPriceKlineParams,
  GetPublicTradingHistoryParamsV5,
  GetRiskLimitParamsV5,
  GetSettlementRecordParamsV5,
  GetSpotLeveragedTokenOrderHistoryParamsV5,
  GetSubAccountDepositRecordParamsV5,
  GetTickersParamsV5,
  GetTransactionLogParamsV5,
  GetUniversalTransferRecordsParamsV5,
  GetWalletBalanceParamsV5,
  GetWithdrawalRecordsParamsV5,
  HistoricalVolatilityV5,
  InstrumentInfoResponseV5,
  InsuranceResponseV5,
  InternalTransferRecordV5,
  LeverageTokenInfoV5,
  LeveragedTokenMarketResultV5,
  MMPModifyParamsV5,
  MMPStateV5,
  OHLCKlineV5,
  OHLCVKlineV5,
  OpenInterestResponseV5,
  OptionDeliveryPriceV5,
  OrderParamsV5,
  OrderResultV5,
  OrderSideV5,
  OrderbookResponseV5,
  PositionInfoParamsV5,
  PositionV5,
  PublicTradeV5,
  PurchaseSpotLeveragedTokenParamsV5,
  PurchaseSpotLeveragedTokenResultV5,
  RedeemSpotLeveragedTokenParamsV5,
  RedeemSpotLeveragedTokenResultV5,
  RiskLimitV5,
  SetAutoAddMarginParamsV5,
  SetLeverageParamsV5,
  SetRiskLimitParamsV5,
  SetRiskLimitResultV5,
  SetTPSLModeParamsV5,
  SetTradingStopParamsV5,
  SettlementRecordV5,
  SpotBorrowCheckResult,
  SpotLeveragedTokenOrderHistoryV5,
  SubMemberV5,
  SwitchIsolatedMarginParamsV5,
  SwitchPositionModeParamsV5,
  TPSLModeV5,
  TickerLinearInverseV5,
  TickerOptionV5,
  TickerSpotV5,
  TransactionLogV5,
  UnifiedAccountUpgradeResultV5,
  UniversalTransferParamsV5,
  UniversalTransferRecordV5,
  UpdateApiKeyParamsV5,
  UpdateApiKeyResultV5,
  WalletBalanceV5,
  WithdrawParamsV5,
  WithdrawalRecordV5,
} from './types';
import { REST_CLIENT_TYPE_ENUM } from './util';
import BaseRestClient from './util/BaseRestClient';

/**
 * REST API client for V5 REST APIs
 *
 * https://bybit-exchange.github.io/docs/v5/intro
 */
export class RestClientV5 extends BaseRestClient {
  getClientType() {
    return REST_CLIENT_TYPE_ENUM.v3;
  }

  async fetchServerTime(): Promise<number> {
    const res = await this.getServerTime();
    return Number(res.time);
  }

  getServerTime(): Promise<
    APIResponseV3WithTime<{ timeSecond: string; timeNano: string }>
  > {
    return this.get('/v3/public/time');
  }

  /**
   *
   ****** Market APIs
   *
   */

  /**
   * Query the kline data. Charts are returned in groups based on the requested interval.
   *
   * Covers: Spot / Linear contract / Inverse contract
   */
  getKline(
    params: GetKlineParamsV5
  ): Promise<
    APIResponseV3WithTime<
      CategorySymbolListV5<OHLCVKlineV5[], 'spot' | 'linear' | 'inverse'>
    >
  > {
    return this.get('/v5/market/kline', params);
  }

  /**
   * Query the mark price kline data. Charts are returned in groups based on the requested interval.
   *
   * Covers: Linear contract / Inverse contract
   */
  getMarkPriceKline(
    params: GetMarkPriceKlineParamsV5
  ): Promise<
    APIResponseV3WithTime<
      CategorySymbolListV5<OHLCKlineV5[], 'linear' | 'inverse'>
    >
  > {
    return this.get('/v5/market/mark-price-kline', params);
  }

  /**
   * Query the index price kline data. Charts are returned in groups based on the requested interval.
   *
   * Covers: Linear contract / Inverse contract
   */
  getIndexPriceKline(
    params: GetIndexPriceKlineParamsV5
  ): Promise<
    APIResponseV3WithTime<
      CategorySymbolListV5<OHLCKlineV5[], 'linear' | 'inverse'>
    >
  > {
    return this.get('/v5/market/index-price-kline', params);
  }

  /**
   * Retrieve the premium index price kline data. Charts are returned in groups based on the requested interval.
   *
   * Covers: Linear contract
   */
  getPremiumIndexPriceKline(
    params: GetPremiumIndexPriceKlineParams
  ): Promise<
    APIResponseV3WithTime<CategorySymbolListV5<OHLCKlineV5[], 'linear'>>
  > {
    return this.get('/v5/market/premium-index-price-kline', params);
  }

  /**
   * Query a list of instruments of online trading pair.
   *
   * Covers: Spot / Linear contract / Inverse contract / Option
   *
   * Note: Spot does not support pagination, so limit & cursor are invalid.
   */
  getInstrumentsInfo(
    params: GetInstrumentsInfoParamsV5
  ): Promise<APIResponseV3WithTime<InstrumentInfoResponseV5>> {
    return this.get('/v5/market/instruments-info', params);
  }

  /**
   * Query orderbook data
   *
   * Covers: Spot / Linear contract / Inverse contract / Option
   */
  getOrderbook(
    params: GetOrderbookParamsV5
  ): Promise<APIResponseV3WithTime<OrderbookResponseV5>> {
    return this.get('/v5/market/orderbook', params);
  }

  /**
   * Query the latest price snapshot, best bid/ask price, and trading volume in the last 24 hours.
   *
   * Covers: Spot / Linear contract / Inverse contract / Option
   */
  getTickers(
    params: GetTickersParamsV5
  ): Promise<
    APIResponseV3WithTime<
      | CategoryListV5<TickerLinearInverseV5[], 'linear' | 'inverse'>
      | CategoryListV5<TickerOptionV5[], 'option'>
      | CategoryListV5<TickerSpotV5[], 'spot'>
    >
  > {
    return this.get('/v5/market/tickers', params);
  }

  /**
   * Query historical funding rate. Each symbol has a different funding interval.
   *
   * Covers: Linear contract / Inverse perpetual
   */
  getFundingRateHistory(
    params: GetFundingRateHistoryParamsV5
  ): Promise<
    APIResponseV3WithTime<
      CategoryListV5<FundingRateHistoryResponseV5[], 'linear' | 'inverse'>
    >
  > {
    return this.get('/v5/market/funding/history', params);
  }

  /**
   * Query recent public trading data in Bybit.
   *
   * Covers: Spot / Linear contract / Inverse contract / Option
   */
  getPublicTradingHistory(
    params: GetPublicTradingHistoryParamsV5
  ): Promise<
    APIResponseV3WithTime<CategoryListV5<PublicTradeV5[], CategoryV5>>
  > {
    return this.get('/v5/market/recent-trade', params);
  }

  /**
   * Get open interest of each symbol.
   *
   * Covers: Linear contract / Inverse contract
   */
  getOpenInterest(
    params: GetOpenInterestParamsV5
  ): Promise<APIResponseV3WithTime<OpenInterestResponseV5>> {
    return this.get('/v5/market/open-interest', params);
  }

  /**
   * Query option historical volatility
   * Covers: Option
   */
  getHistoricalVolatility(
    params: GetHistoricalVolatilityParamsV5
  ): Promise<
    APIResponseV3WithTime<CategoryListV5<HistoricalVolatilityV5[], 'option'>>
  > {
    return this.get('/v5/market/historical-volatility', params);
  }

  /**
   * Query Bybit insurance pool data (BTC/USDT/USDC etc). The data is updated every 24 hours.
   */
  getInsurance(
    params?: GetInsuranceParamsV5
  ): Promise<APIResponseV3WithTime<InsuranceResponseV5>> {
    return this.get('/v5/market/insurance', params);
  }

  /**
   * Query risk limit of futures
   *
   * Covers: Linear contract / Inverse contract
   */
  getRiskLimit(
    params?: GetRiskLimitParamsV5
  ): Promise<
    APIResponseV3WithTime<CategoryListV5<RiskLimitV5[], 'inverse' | 'linear'>>
  > {
    return this.get('/v5/market/risk-limit', params);
  }

  /**
   * Get the delivery price for option
   *
   * Covers: Option
   */
  getOptionDeliveryPrice(
    params: GetOptionDeliveryPriceParamsV5
  ): Promise<
    APIResponseV3WithTime<CategoryCursorListV5<OptionDeliveryPriceV5[]>>
  > {
    return this.get('/v5/market/delivery-price', params);
  }

  /**
   *
   ****** Trade APIs
   *
   */

  submitOrder(
    params: OrderParamsV5
  ): Promise<APIResponseV3WithTime<OrderResultV5>> {
    return this.postPrivate('/v5/order/create', params);
  }

  amendOrder(
    params: AmendOrderParamsV5
  ): Promise<APIResponseV3WithTime<OrderResultV5>> {
    return this.postPrivate('/v5/order/amend', params);
  }

  cancelOrder(
    params: CancelOrderParamsV5
  ): Promise<APIResponseV3WithTime<OrderResultV5>> {
    return this.postPrivate('/v5/order/cancel', params);
  }

  /**
   * Query unfilled or partially filled orders in real-time. To query older order records, please use the order history interface.
   */
  getActiveOrders(
    params: GetAccountOrdersParams
  ): Promise<APIResponseV3WithTime<CategoryCursorListV5<AccountOrderV5[]>>> {
    return this.getPrivate('/v5/order/realtime', params);
  }

  cancelAllOrders(
    params: CancelAllOrdersParamsV5
  ): Promise<APIResponseV3WithTime<{ list: OrderResultV5[] }>> {
    return this.postPrivate('/v5/order/cancel-all', params);
  }

  /**
   * Query order history. As order creation/cancellation is asynchronous, the data returned from this endpoint may delay.
   *
   * If you want to get real-time order information, you could query this endpoint or rely on the websocket stream (recommended).
   */
  getHistoricOrders(
    params: GetAccountOrdersParams
  ): Promise<APIResponseV3WithTime<CategoryCursorListV5<AccountOrderV5[]>>> {
    return this.getPrivate('/v5/order/history', params);
  }

  /**
   * This endpoint allows you to place more than one order in a single request. Covers: option (unified account).
   *
   * Make sure you have sufficient funds in your account when placing an order.
   * Once an order is placed, according to the funds required by the order,
   * the funds in your account will be frozen by the corresponding amount during the life cycle of the order.
   *
   * A maximum of 20 orders can be placed per request. The returned data list is divided into two lists.
   * The first list indicates whether or not the order creation was successful and the second list details the created order information.
   * The structure of the two lists are completely consistent.
   */
  batchSubmitOrders(
    category: 'option',
    orders: BatchOrderParamsV5[]
  ): Promise<APIResponseV3WithTime<BatchOrdersResult<BatchOrderResult[]>>> {
    return this.postPrivate('/v5/order/create-batch', {
      category,
      request: orders,
    });
  }

  /**
   * This endpoint allows you to amend more than one open order in a single request. Covers: option (unified account).
   *
   * You can modify unfilled or partially filled orders. Conditional orders are not supported.
   *
   * A maximum of 20 orders can be amended per request.
   */
  batchAmendOrders(
    category: 'option',
    orders: BatchAmendOrderParamsV5[]
  ): Promise<
    APIResponseV3WithTime<BatchOrdersResult<BatchAmendOrderResult[]>>
  > {
    return this.postPrivate('/v5/order/amend-batch', {
      category,
      request: orders,
    });
  }

  /**
   * This endpoint allows you to cancel more than one open order in a single request. Covers: option (unified account).
   *
   * You must specify orderId or orderLinkId. If orderId and orderLinkId is not matched, the system will process orderId first.
   *
   * You can cancel unfilled or partially filled orders. A maximum of 20 orders can be cancelled per request.
   */
  batchCancelOrders(
    category: 'option',
    orders: BatchCancelOrderParamsV5[]
  ): Promise<
    APIResponseV3WithTime<BatchOrdersResult<BatchCancelOrderResult[]>>
  > {
    return this.postPrivate('/v5/order/cancel-batch', {
      category,
      request: orders,
    });
  }

  /**
   * Query the qty and amount of borrowable coins in spot account.
   *
   * Covers: Spot (Unified Account)
   */
  getSpotBorrowCheck(
    symbol: string,
    side: OrderSideV5
  ): Promise<APIResponseV3WithTime<SpotBorrowCheckResult>> {
    return this.getPrivate('/v5/order/spot-borrow-check', {
      category: 'spot',
      symbol,
      side,
    });
  }

  /**
   * This endpoint allows you to set the disconnection protect time window. Covers: option (unified account).
   *
   * If you need to turn it on/off, you can contact your client manager for consultation and application.
   * The default time window is 10 seconds.
   */
  setDisconnectCancelAllWindow(
    category: 'option',
    timeWindow: number
  ): Promise<APIResponseV3<undefined>> {
    return this.postPrivate('/v5/order/disconnected-cancel-all', {
      category,
      timeWindow,
    });
  }

  /**
   *
   ****** Position APIs
   *
   */

  /**
   * Query real-time position data, such as position size, cumulative realizedPNL.
   *
   * 0: cross margin. 1: isolated margin
   *
   * Unified account covers: Linear contract / Options
   *
   * Normal account covers: USDT perpetual / Inverse perpetual / Inverse futures
   *
   * Note: this will give a 404 error if you query the `option` category if your account is not unified
   */
  getPositionInfo(
    params: PositionInfoParamsV5
  ): Promise<APIResponseV3WithTime<CategoryCursorListV5<PositionV5[]>>> {
    return this.getPrivate('/v5/position/list', params);
  }

  /**
   * Set the leverage
   *
   * Unified account covers: Linear contract
   *
   * Normal account covers: USDT perpetual / Inverse perpetual / Inverse futures
   *
   * Note: Under one-way mode, buyLeverage must be the same as sellLeverage
   */
  setLeverage(params: SetLeverageParamsV5): Promise<APIResponseV3WithTime<{}>> {
    return this.postPrivate('/v5/position/set-leverage', params);
  }

  /**
   * Select cross margin mode or isolated margin mode.
   * 0: cross margin. 1: isolated margin
   *
   * Covers: USDT perpetual (Normal account) / Inverse contract (Normal account).
   *
   * Switching margin modes will cause orders in progress to be cancelled.
   * Please make sure that there are no open orders before you switch margin modes.
   */
  switchIsolatedMargin(
    params: SwitchIsolatedMarginParamsV5
  ): Promise<APIResponseV3WithTime<{}>> {
    return this.postPrivate('/v5/position/switch-isolated', params);
  }

  /**
   * This endpoint sets the take profit/stop loss (TP/SL) mode to full or partial.
   *
   * Unified account covers: Linear contract; normal account covers: USDT perpetual, inverse perpetual, inverse futures.
   *
   * For partial TP/SL mode, you can set the TP/SL size smaller than position size.
   */
  setTPSLMode(
    params: SetTPSLModeParamsV5
  ): Promise<APIResponseV3WithTime<{ tpSlMode: TPSLModeV5 }>> {
    return this.postPrivate('/v5/position/set-tpsl-mode', params);
  }

  /**
   * Switches the position mode for USDT perpetual and Inverse futures.
   *
   * If you are in one-way Mode, you can only open one position on Buy or Sell side.
   *
   * If you are in hedge mode, you can open both Buy and Sell side positions simultaneously.
   *
   * Position mode. 0: Merged Single. 3: Both Sides.
   */
  switchPositionMode(
    params: SwitchPositionModeParamsV5
  ): Promise<APIResponseV3WithTime<{}>> {
    return this.postPrivate('/v5/position/switch-mode', params);
  }

  /**
   * The risk limit will limit the maximum position value you can hold under different margin requirements.
   * If you want to hold a bigger position size, you need more margin.
   *
   * This interface can set the risk limit of a single position.
   * If the order exceeds the current risk limit when placing an order, it will be rejected.
   */
  setRiskLimit(
    params: SetRiskLimitParamsV5
  ): Promise<APIResponseV3WithTime<SetRiskLimitResultV5>> {
    return this.postPrivate('/v5/position/set-risk-limit', params);
  }

  /**
   * This endpoint allows you to set the take profit, stop loss or trailing stop for a position.
   * Passing these parameters will create conditional orders by the system internally.
   *
   * The system will cancel these orders if the position is closed, and adjust the qty according to the size of the open position.
   *
   * Unified account covers: Linear contract.
   * Normal account covers: USDT perpetual / Inverse perpetual / Inverse futures.
   */
  setTradingStop(
    params: SetTradingStopParamsV5
  ): Promise<APIResponseV3WithTime<{}>> {
    return this.postPrivate('/v5/position/trading-stop', params);
  }

  /**
   * This endpoint allows you to turn on/off auto-add-margin for an isolated margin position.
   *
   * Covers: USDT perpetual (Normal Account).
   */
  setAutoAddMargin(
    params: SetAutoAddMarginParamsV5
  ): Promise<APIResponseV3WithTime<{}>> {
    return this.postPrivate('/v5/position/set-auto-add-margin', params);
  }

  /**
   * Query users' execution records, sorted by execTime in descending order
   *
   * Unified account covers: Spot / Linear contract / Options
   * Normal account covers: USDT perpetual / Inverse perpetual / Inverse futures
   */
  getExecutionList(
    params: GetExecutionListParamsV5
  ): Promise<APIResponseV3WithTime<CategoryCursorListV5<ExecutionV5[]>>> {
    return this.getPrivate('/v5/execution/list', params);
  }

  /**
   * Query user's closed profit and loss records. The results are sorted by createdTime in descending order.
   *
   * Unified account covers: Linear contract
   * Normal account covers: USDT perpetual / Inverse perpetual / Inverse futures
   */
  getClosedPnL(
    params: GetClosedPnLParamsV5
  ): Promise<APIResponseV3WithTime<CategoryCursorListV5<ClosedPnLV5[]>>> {
    return this.getPrivate('/v5/position/closed-pnl', params);
  }

  /**
   *
   ****** Account APIs
   *
   */

  /**
   * Obtain wallet balance, query asset information of each currency, and account risk rate information under unified margin mode.
   *
   * By default, currency information with assets or liabilities of 0 is not returned.
   */
  getWalletBalance(
    params: GetWalletBalanceParamsV5
  ): Promise<APIResponseV3WithTime<WalletBalanceV5>> {
    return this.getPrivate('/v5/account/wallet-balance', params);
  }

  /**
   * Upgrade to unified account.
   *
   * Banned/OTC loan/Net asset unsatisfying/Express path users cannot upgrade the account to Unified Account for now.
   */
  upgradeToUnifiedAccount(): Promise<
    APIResponseV3WithTime<UnifiedAccountUpgradeResultV5>
  > {
    return this.postPrivate('/v5/account/upgrade-to-uta');
  }

  /**
   * Get interest records, sorted in reverse order of creation time.
   *
   * Unified account
   */
  getBorrowHistory(
    params?: GetBorrowHistoryParamsV5
  ): Promise<APIResponseV3WithTime<CursorListV5<BorrowHistoryRecordV5[]>>> {
    return this.getPrivate('/v5/account/borrow-history', params);
  }

  /**
   * Get the collateral information of the current unified margin account, including loan interest rate,
   * loanable amount, collateral conversion rate, whether it can be mortgaged as margin, etc.
   */
  getCollateralInfo(
    currency?: string
  ): Promise<APIResponseV3WithTime<{ list: CollateralInfoV5[] }>> {
    return this.getPrivate('/v5/account/collateral-info', { currency });
  }

  /**
   * Get current account Greeks information
   */
  getCoinGreeks(
    baseCoin?: string
  ): Promise<APIResponseV3WithTime<{ list: CoinGreeksV5[] }>> {
    return this.getPrivate(
      '/v5/asset/coin-greeks',
      baseCoin ? { baseCoin } : undefined
    );
  }

  /**
   * Get the trading fee rate of derivatives.
   * Covers: USDT perpetual / Inverse perpetual / Inverse futures
   */
  getFeeRate(
    symbol?: string
  ): Promise<APIResponseV3WithTime<{ list: FeeRateV5[] }>> {
    return this.getPrivate(
      '/v5/account/fee-rate',
      symbol ? { symbol } : undefined
    );
  }

  /**
   * Query the margin mode and the upgraded status of account
   */
  getAccountInfo(): Promise<APIResponseV3<AccountInfoV5>> {
    return this.getPrivate('/v5/account/info');
  }

  /**
   * Query transaction logs in Unified account.
   */
  getTransactionLog(
    params?: GetTransactionLogParamsV5
  ): Promise<APIResponseV3WithTime<CursorListV5<TransactionLogV5[]>>> {
    return this.getPrivate('/v5/account/transaction-log', params);
  }

  /**
   * Default is regular margin mode.
   *
   * This mode is valid for USDT Perp, USDC Perp and USDC Option.
   */
  setMarginMode(
    marginMode: AccountMarginModeV5
  ): Promise<
    APIResponseV3<{ reasons: { reasonCode: string; reasonMsg: string }[] }>
  > {
    return this.postPrivate('/v5/account/set-margin-mode', {
      setMarginMode: marginMode,
    });
  }

  /**
   * Configure Market Maker Protection (MMP)
   */
  setMMP(params: MMPModifyParamsV5): Promise<APIResponseV3<undefined>> {
    return this.postPrivate('/v5/account/mmp-modify', params);
  }

  /**
   * Once the mmp triggered, you can unfreeze the account via this endpoint
   */
  resetMMP(baseCoin: string): Promise<APIResponseV3<undefined>> {
    return this.postPrivate('/v5/account/mmp-modify', { baseCoin });
  }

  /**
   * Get MMP State
   */
  getMMPState(
    baseCoin: string
  ): Promise<APIResponseV3WithTime<{ result: MMPStateV5[] }>> {
    return this.getPrivate('/v5/account/mmp-state', { baseCoin });
  }

  /**
   *
   ****** Asset APIs
   *
   */

  /**
   * Query the coin exchange records.
   *
   * CAUTION: You may experience long delays with this endpoint.
   */
  getCoinExchangeRecords(params?: GetCoinExchangeRecordParamsV5): Promise<
    APIResponseV3WithTime<{
      orderBody: CoinExchangeRecordV5[];
      nextPageCursor?: string;
    }>
  > {
    return this.getPrivate('/v5/asset/exchange/order-record', params);
  }

  /**
   * Query option delivery records, sorted by deliveryTime in descending order.
   *
   * Covers: Option
   */
  getDeliveryRecord(
    params: GetDeliveryRecordParamsV5
  ): Promise<APIResponseV3WithTime<CategoryCursorListV5<DeliveryRecordV5[]>>> {
    return this.getPrivate('/v5/asset/delivery-record', params);
  }

  /**
   * Query session settlement records of USDC perpetual
   *
   * Covers: Linear contract (USDC Perpetual only, Unified Account)
   */
  getSettlementRecords(
    params: GetSettlementRecordParamsV5
  ): Promise<
    APIResponseV3WithTime<CategoryCursorListV5<SettlementRecordV5[]>>
  > {
    return this.getPrivate('/v5/asset/settlement-record', params);
  }

  /**
   * Query asset information.
   *
   * INFO
   * For now, it can query SPOT only.
   */
  getAssetInfo(
    params: GetAssetInfoParamsV5
  ): Promise<APIResponseV3WithTime<{ spot: AssetInfoV5 }>> {
    return this.getPrivate('/v5/asset/transfer/query-asset-info', params);
  }

  /**
   * Query all coin balances of all account types under the master account and sub accounts.
   *
   * It is not allowed to get the master account coin balance via sub account API key.
   */
  getAllCoinsBalance(
    params: GetAllCoinsBalanceParamsV5
  ): Promise<APIResponseV3WithTime<AllCoinsBalanceV5>> {
    return this.getPrivate(
      '/v5/asset/transfer/query-account-coins-balance',
      params
    );
  }

  /**
   * Query the balance of a specific coin in a specific account type. Supports querying sub UID's balance.
   *
   * CAUTION: Can query by the master UID's api key only.
   */
  getCoinBalance(
    params: GetAccountCoinBalanceParamsV5
  ): Promise<APIResponseV3<AccountCoinBalanceV5>> {
    return this.getPrivate(
      '/v5/asset/transfer/query-account-coin-balance',
      params
    );
  }

  /**
   * Query the transferable coin list between each account type.
   */
  getTransferableCoinList(
    fromAccountType: AccountTypeV5,
    toAccountType: AccountTypeV5
  ): Promise<APIResponseV3WithTime<{ list: string[] }>> {
    return this.getPrivate('/v5/asset/transfer/query-transfer-coin-list', {
      fromAccountType,
      toAccountType,
    });
  }

  /**
   * Create the internal transfer between different account types under the same UID.
   * Each account type has its own acceptable coins, e.g, you cannot transfer USDC from SPOT to CONTRACT.
   *
   * Please refer to the getTransferableCoinList() API to find out more.
   */
  createInternalTransfer(
    transferId: string,
    coin: string,
    amount: string,
    fromAccountType: AccountTypeV5,
    toAccountType: AccountTypeV5
  ): Promise<APIResponseV3WithTime<{ transferId: string }>> {
    return this.postPrivate('/v5/asset/transfer/inter-transfer', {
      transferId,
      coin,
      amount,
      fromAccountType,
      toAccountType,
    });
  }

  /**
   * Query the internal transfer records between different account types under the same UID.
   */
  getInternalTransferRecords(
    params?: GetInternalTransferParamsV5
  ): Promise<APIResponseV3WithTime<CursorListV5<InternalTransferRecordV5[]>>> {
    return this.getPrivate(
      '/v5/asset/transfer/query-inter-transfer-list',
      params
    );
  }

  /**
   * Query the sub UIDs under a main UID
   *
   * CAUTION: Can query by the master UID's api key only
   */
  getSubUID(): Promise<
    APIResponseV3WithTime<{
      subMemberIds: string[];
      transferableSubMemberIds: string[];
    }>
  > {
    return this.getPrivate('/v5/asset/transfer/query-sub-member-list');
  }

  /**
   * Enable Universal Transfer for Sub UID
   *
   * Use this endpoint to enable a subaccount to take part in a universal transfer.
   * It is a one-time switch which, once thrown, enables a subaccount permanently.
   * If not set, your subaccount cannot use universal transfers.
   */
  enableUniversalTransferForSubUIDs(
    subMemberIds: string[]
  ): Promise<APIResponseV3WithTime<{}>> {
    return this.postPrivate('/v5/asset/transfer/save-transfer-sub-member', {
      subMemberIds,
    });
  }

  /**
   * Transfer between sub-sub or main-sub. Please make sure you have enabled universal transfer on your sub UID in advance.
   */
  createUniversalTransfer(
    params: UniversalTransferParamsV5
  ): Promise<APIResponseV3WithTime<{ transferId: string }>> {
    return this.postPrivate('/v5/asset/transfer/universal-transfer', params);
  }

  /**
   * Query universal transfer records
   *
   * CAUTION
   * Can query by the master UID's API key only
   */
  getUniversalTransferRecords(
    params?: GetUniversalTransferRecordsParamsV5
  ): Promise<APIResponseV3WithTime<CursorListV5<UniversalTransferRecordV5[]>>> {
    return this.getPrivate(
      '/v5/asset/transfer/query-universal-transfer-list',
      params
    );
  }

  /**
   * Query allowed deposit coin information.
   * To find out paired chain of coin, please refer to the coin info api.
   */
  getAllowedDepositCoinInfo(
    params?: GetAllowedDepositCoinInfoParamsV5
  ): Promise<
    APIResponseV3WithTime<{
      configList: AllowedDepositCoinInfoV5[];
      nextPageCursor: string;
    }>
  > {
    return this.get('/v5/asset/deposit/query-allowed-list', params);
  }

  /**
   * Query deposit records.
   *
   * TIP
   * endTime - startTime should be less than 30 days. Query last 30 days records by default.
   *
   * Can use main or sub UID api key to query deposit records respectively.
   */
  getDepositRecords(
    params?: GetDepositRecordParamsV5
  ): Promise<
    APIResponseV3WithTime<{ rows: DepositRecordV5[]; nextPageCursor: string }>
  > {
    return this.getPrivate('/v5/asset/deposit/query-record', params);
  }

  /**
   * Query subaccount's deposit records by MAIN UID's API key.
   *
   * TIP: Query deposit records of SPOT only
   *      endTime - startTime should be less than 30 days.
   *      Queries for the last 30 days worth of records by default.
   */
  getSubAccountDepositRecords(
    params: GetSubAccountDepositRecordParamsV5
  ): Promise<
    APIResponseV3WithTime<{ rows: DepositRecordV5[]; nextPageCursor: string }>
  > {
    return this.getPrivate('/v5/asset/deposit/query-sub-member-record', params);
  }

  /**
   * Query the deposit address information of MASTER account.
   */
  getMasterDepositAddress(
    coin: string,
    chainType?: string
  ): Promise<APIResponseV3WithTime<DepositAddressResultV5>> {
    return this.getPrivate('/v5/asset/deposit/query-address', {
      coin,
      chainType,
    });
  }

  /**
   * Query the deposit address information of SUB account.
   *
   * CAUTION
   * Can use master UID's api key only
   */
  querySubMemberAddress(
    coin: string,
    chainType: string,
    subMemberId: string
  ): Promise<APIResponseV3<DepositAddressResultV5>> {
    return this.getPrivate('/v5/asset/deposit/query-sub-member-address', {
      coin,
      chainType,
      subMemberId,
    });
  }

  /**
   * Query coin information, including chain information, withdraw and deposit status.
   */
  getCoinInfo(
    coin?: string
  ): Promise<APIResponseV3WithTime<{ rows: CoinInfoV5[] }>> {
    return this.getPrivate(
      '/v5/asset/coin/query-info',
      coin ? { coin } : undefined
    );
  }

  /**
   * Query withdrawal records.
   */
  getWithdrawalRecords(
    params?: GetWithdrawalRecordsParamsV5
  ): Promise<APIResponseV3<{ rows: WithdrawalRecordV5[] }>> {
    return this.getPrivate('/v5/asset/withdraw/query-record', params);
  }

  /**
   * Withdraw assets from the SPOT account.
   *
   * CAUTION: Make sure you have whitelisted your wallet address before calling this endpoint.
   *
   * You can make an off-chain transfer if the target wallet address is from Bybit. This means that no blockchain fee will be charged.
   */
  submitWithdrawal(
    params: WithdrawParamsV5
  ): Promise<APIResponseV3WithTime<{ id: string }>> {
    return this.postPrivate('/v5/asset/withdraw/create', params);
  }

  /**
   * Cancel the withdrawal
   *
   * CAUTION: Can query by the master UID's api key only
   */
  cancelWithdrawal(
    id: string
  ): Promise<APIResponseV3WithTime<{ status: 0 | 1 }>> {
    return this.postPrivate('/v5/asset/withdraw/cancel', { id });
  }

  /**
   *
   ****** User APIs
   *
   */

  /**
   * Create a new sub user id. Use master user's api key only.
   *
   * The API key must own one of permissions will be allowed to call the following API endpoint.
   *
   * master API key: "Account Transfer", "Subaccount Transfer", "Withdrawal"
   */
  createSubMember(
    params: CreateSubMemberParamsV5
  ): Promise<APIResponseV3WithTime<CreateSubMemberResultV5>> {
    return this.postPrivate('/v5/user/create-sub-member', params);
  }

  /**
   * To create new API key for those newly created sub UID. Use master user's api key only.
   *
   * TIP
   * The API key must own one of permissions will be allowed to call the following API endpoint.
   * master API key: "Account Transfer", "Subaccount Transfer", "Withdrawal"
   */
  createSubUIDAPIKey(
    params: CreateSubApiKeyParamsV5
  ): Promise<APIResponseV3WithTime<CreateSubApiKeyResultV5>> {
    return this.postPrivate('/v5/user/create-sub-api', params);
  }

  /**
   * This endpoint allows you to get a list of all sub UID of master account.
   */
  getSubUIDList(): Promise<
    APIResponseV3WithTime<{ subMembers: SubMemberV5[] }>
  > {
    return this.getPrivate('/v5/user/query-sub-members');
  }

  /**
   * Froze sub uid. Use master user's api key only.
   *
   * TIP: The API key must own one of the following permissions will be allowed to call the following API endpoint.
   *
   * master API key: "Account Transfer", "Subaccount Transfer", "Withdrawal"
   */
  setSubUIDFrozenState(
    subuid: number,
    frozen: 0 | 1
  ): Promise<APIResponseV3WithTime<{}>> {
    return this.postPrivate('/v5/user/frozen-sub-member', { subuid, frozen });
  }

  /**
   * Get the information of the api key. Use the api key pending to be checked to call the endpoint.
   * Both master and sub user's api key are applicable.
   *
   * TIP: Any permission can access this endpoint.
   */
  getQueryApiKey(): Promise<APIResponseV3WithTime<ApiKeyInfoV5>> {
    return this.getPrivate('/v5/user/query-api');
  }

  /**
   * Modify the settings of a master API key. Use the API key pending to be modified to call the endpoint. Use master user's API key only.
   *
   * TIP: The API key must own one of the permissions to call the following API endpoint.
   *
   * Master API key: "Account Transfer", "Subaccount Transfer", "Withdrawal"
   */
  updateMasterApiKey(
    params: UpdateApiKeyParamsV5
  ): Promise<APIResponseV3WithTime<UpdateApiKeyResultV5>> {
    return this.postPrivate('/v5/user/update-api', params);
  }

  /**
   * This endpoint modifies the settings of a sub API key.
   * Use the API key pending to be modified to call the endpoint.
   * Only the API key that calls this interface can be modified.
   *
   * The API key must own "Account Transfer" permission to be allowed to call this API endpoint.
   */
  updateSubApiKey(
    params: UpdateApiKeyParamsV5
  ): Promise<APIResponseV3<UpdateApiKeyResultV5>> {
    return this.postPrivate('/v5/user/update-sub-api', params);
  }

  /**
   * Delete the api key of master account. Use the api key pending to be delete to call the endpoint. Use master user's api key only.
   *
   * TIP: The API key must own one of permissions will be allowed to call the following API endpoint.
   *      master API key: "Account Transfer", "Subaccount Transfer", "Withdrawal"
   *
   * DANGER: BE CAREFUL! The API key used to call this interface will be invalid immediately.
   */
  deleteMasterApiKey(): Promise<APIResponseV3WithTime<{}>> {
    return this.postPrivate('/v5/user/delete-api');
  }

  /**
   * Delete the api key of sub account. Use the api key pending to be delete to call the endpoint. Use sub user's api key only.
   *
   * TIP
   * The API key must own one of permissions will be allowed to call the following API endpoint.
   * sub API key: "Account Transfer"
   *
   * DANGER: BE CAREFUL! The API key used to call this interface will be invalid immediately.
   */
  deleteSubApiKey(): Promise<APIResponseV3WithTime<{}>> {
    return this.postPrivate('/v5/user/delete-sub-api');
  }

  /**
   *
   ****** Spot Leverage Token APIs
   *
   */

  /**
   * Query leverage token information
   */
  getLeveragedTokenInfo(
    ltCoin?: string
  ): Promise<APIResponseV3WithTime<{ list: LeverageTokenInfoV5[] }>> {
    return this.get('/v5/spot-lever-token/info', { ltCoin });
  }

  /**
   * Get leverage token market information.
   */
  getLeveragedTokenMarket(
    ltCoin: string
  ): Promise<APIResponseV3WithTime<LeveragedTokenMarketResultV5>> {
    return this.get('/v5/spot-lever-token/reference', { ltCoin });
  }

  /**
   * This endpoint allows you to purchase a leveraged token with a specified amount.
   */
  purchaseSpotLeveragedToken(
    params: PurchaseSpotLeveragedTokenParamsV5
  ): Promise<APIResponseV3WithTime<PurchaseSpotLeveragedTokenResultV5>> {
    return this.postPrivate('/v5/spot-lever-token/purchase', params);
  }

  /**
   * Redeem leveraged token.
   */
  redeemSpotLeveragedToken(
    params: RedeemSpotLeveragedTokenParamsV5
  ): Promise<APIResponseV3WithTime<RedeemSpotLeveragedTokenResultV5>> {
    return this.postPrivate('/v5/spot-lever-token/redeem', params);
  }

  /**
   * Get purchase or redemption history
   */
  getSpotLeveragedTokenOrderHistory(
    params?: GetSpotLeveragedTokenOrderHistoryParamsV5
  ): Promise<
    APIResponseV3WithTime<{ list: SpotLeveragedTokenOrderHistoryV5[] }>
  > {
    return this.getPrivate('/v5/spot-lever-token/order-record', params);
  }

  /**
   *
   ****** Spot Margin Trade APIs
   *
   */

  /**
   * Turn spot margin trade on / off.
   *
   * CAUTION
   * Your account needs to turn on spot margin first
   */
  toggleSpotMarginTrade(
    spotMarginMode: '1' | '0'
  ): Promise<APIResponseV3WithTime<{ spotMarginMode: '1' | '0' }>> {
    return this.postPrivate('/v5/spot-margin-trade/switch-mode', {
      spotMarginMode,
    });
  }

  /**
   * Set the user's maximum leverage in spot cross margin.
   * CAUTION: Your account needs to enable spot margin first; i.e., you must have finished the quiz on web / app.
   */
  setSpotMarginLeverage(leverage: string): Promise<APIResponseV3WithTime<{}>> {
    return this.postPrivate('/v5/spot-margin-trade/set-leverage', { leverage });
  }
}
