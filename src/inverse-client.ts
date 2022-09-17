import { REST_CLIENT_TYPE_ENUM } from './util';
import {
  APIResponseWithTime,
  AssetExchangeRecordsReq,
  CoinParam,
  InverseActiveConditionalOrderRequest,
  InverseActiveOrdersRequest,
  InverseCancelConditionalOrderRequest,
  InverseCancelOrderRequest,
  InverseChangePositionMarginRequest,
  InverseConditionalOrderRequest,
  InverseGetClosedPnlRequest,
  InverseGetOrderRequest,
  InverseGetTradeRecordsRequest,
  InverseOrderRequest,
  InverseReplaceConditionalOrderRequest,
  InverseReplaceOrderRequest,
  InverseSetLeverageRequest,
  InverseSetMarginTypeRequest,
  InverseSetSlTpPositionModeRequest,
  InverseSetTradingStopRequest,
  SymbolInfo,
  SymbolIntervalFromLimitParam,
  SymbolLimitParam,
  SymbolParam,
  SymbolPeriodLimitParam,
  WalletFundRecordsReq,
  WithdrawRecordsReq,
} from './types';
import BaseRestClient from './util/BaseRestClient';

/**
 * REST API client for Inverse Perpetual Futures APIs (v2)
 */
export class InverseClient extends BaseRestClient {
  getClientType() {
    return REST_CLIENT_TYPE_ENUM.inverse;
  }

  async fetchServerTime(): Promise<number> {
    const res = await this.getServerTime();
    return Number(res.time_now);
  }

  /**
   *
   * Market Data Endpoints
   *
   */

  getOrderBook(params: SymbolParam): Promise<APIResponseWithTime<any[]>> {
    return this.get('v2/public/orderBook/L2', params);
  }

  getKline(
    params: SymbolIntervalFromLimitParam
  ): Promise<APIResponseWithTime<any[]>> {
    return this.get('v2/public/kline/list', params);
  }

  /**
   * Get latest information for symbol
   */
  getTickers(
    params?: Partial<SymbolParam>
  ): Promise<APIResponseWithTime<any[]>> {
    return this.get('v2/public/tickers', params);
  }

  getTrades(params: SymbolLimitParam): Promise<APIResponseWithTime<any[]>> {
    return this.get('v2/public/trading-records', params);
  }

  getSymbols(): Promise<APIResponseWithTime<SymbolInfo[]>> {
    return this.get('v2/public/symbols');
  }

  getMarkPriceKline(
    params: SymbolIntervalFromLimitParam
  ): Promise<APIResponseWithTime<any[]>> {
    return this.get('v2/public/mark-price-kline', params);
  }

  getIndexPriceKline(
    params: SymbolIntervalFromLimitParam
  ): Promise<APIResponseWithTime<any[]>> {
    return this.get('v2/public/index-price-kline', params);
  }

  getPremiumIndexKline(
    params: SymbolIntervalFromLimitParam
  ): Promise<APIResponseWithTime<any[]>> {
    return this.get('v2/public/premium-index-kline', params);
  }

  /**
   *
   * Market Data : Advanced
   *
   */

  getOpenInterest(
    params: SymbolPeriodLimitParam
  ): Promise<APIResponseWithTime<any[]>> {
    return this.get('v2/public/open-interest', params);
  }

  getLatestBigDeal(
    params: SymbolLimitParam
  ): Promise<APIResponseWithTime<any[]>> {
    return this.get('v2/public/big-deal', params);
  }

  getLongShortRatio(
    params: SymbolPeriodLimitParam
  ): Promise<APIResponseWithTime<any[]>> {
    return this.get('v2/public/account-ratio', params);
  }

  /**
   *
   * Account Data Endpoints
   *
   */

  getApiKeyInfo(): Promise<APIResponseWithTime<any>> {
    return this.getPrivate('v2/private/account/api-key');
  }

  /**
   *
   * Wallet Data Endpoints
   *
   */

  getWalletBalance(
    params?: Partial<CoinParam>
  ): Promise<APIResponseWithTime<any>> {
    return this.getPrivate('v2/private/wallet/balance', params);
  }

  getWalletFundRecords(
    params?: WalletFundRecordsReq
  ): Promise<APIResponseWithTime<any>> {
    return this.getPrivate('v2/private/wallet/fund/records', params);
  }

  getWithdrawRecords(
    params?: WithdrawRecordsReq
  ): Promise<APIResponseWithTime<any>> {
    return this.getPrivate('v2/private/wallet/withdraw/list', params);
  }

  getAssetExchangeRecords(
    params?: AssetExchangeRecordsReq
  ): Promise<APIResponseWithTime<any>> {
    return this.getPrivate('v2/private/exchange-order/list', params);
  }

  /**
   *
   * API Data Endpoints
   *
   */

  getServerTime(): Promise<APIResponseWithTime<{}>> {
    return this.get('v2/public/time');
  }

  getApiAnnouncements(): Promise<APIResponseWithTime<any[]>> {
    return this.get('v2/public/announcement');
  }

  /**
   *
   * Account Data Endpoints
   *
   */

  /**
   * Active orders
   */

  placeActiveOrder(
    orderRequest: InverseOrderRequest
  ): Promise<APIResponseWithTime<any>> {
    return this.postPrivate('v2/private/order/create', orderRequest);
  }

  getActiveOrderList(
    params: InverseActiveOrdersRequest
  ): Promise<APIResponseWithTime<any>> {
    return this.getPrivate('v2/private/order/list', params);
  }

  cancelActiveOrder(
    params: InverseCancelOrderRequest
  ): Promise<APIResponseWithTime<any>> {
    return this.postPrivate('v2/private/order/cancel', params);
  }

  cancelAllActiveOrders(
    params: SymbolParam
  ): Promise<APIResponseWithTime<any>> {
    return this.postPrivate('v2/private/order/cancelAll', params);
  }

  replaceActiveOrder(
    params: InverseReplaceOrderRequest
  ): Promise<APIResponseWithTime<any>> {
    return this.postPrivate('v2/private/order/replace', params);
  }

  queryActiveOrder(
    params: InverseGetOrderRequest
  ): Promise<APIResponseWithTime<any>> {
    return this.getPrivate('v2/private/order', params);
  }

  /**
   * Conditional orders
   */

  placeConditionalOrder(
    params: InverseConditionalOrderRequest
  ): Promise<APIResponseWithTime<any>> {
    return this.postPrivate('v2/private/stop-order/create', params);
  }

  /** get conditional order list. This may see delays, use queryConditionalOrder() for real-time queries */
  getConditionalOrder(
    params: InverseActiveConditionalOrderRequest
  ): Promise<APIResponseWithTime<any>> {
    return this.getPrivate('v2/private/stop-order/list', params);
  }

  cancelConditionalOrder(
    params: InverseCancelConditionalOrderRequest
  ): Promise<APIResponseWithTime<any>> {
    return this.postPrivate('v2/private/stop-order/cancel', params);
  }

  cancelAllConditionalOrders(
    params: SymbolParam
  ): Promise<APIResponseWithTime<any>> {
    return this.postPrivate('v2/private/stop-order/cancelAll', params);
  }

  replaceConditionalOrder(
    params: InverseReplaceConditionalOrderRequest
  ): Promise<APIResponseWithTime<any>> {
    return this.postPrivate('v2/private/stop-order/replace', params);
  }

  queryConditionalOrder(
    params: InverseGetOrderRequest
  ): Promise<APIResponseWithTime<any>> {
    return this.getPrivate('v2/private/stop-order', params);
  }

  /**
   * Position
   */

  getPosition(
    params?: Partial<SymbolParam>
  ): Promise<APIResponseWithTime<any>> {
    return this.getPrivate('v2/private/position/list', params);
  }

  changePositionMargin(
    params: InverseChangePositionMarginRequest
  ): Promise<APIResponseWithTime<any>> {
    return this.postPrivate('position/change-position-margin', params);
  }

  setTradingStop(
    params: InverseSetTradingStopRequest
  ): Promise<APIResponseWithTime<any>> {
    return this.postPrivate('v2/private/position/trading-stop', params);
  }

  setUserLeverage(
    params: InverseSetLeverageRequest
  ): Promise<APIResponseWithTime<any>> {
    return this.postPrivate('v2/private/position/leverage/save', params);
  }

  getTradeRecords(
    params: InverseGetTradeRecordsRequest
  ): Promise<APIResponseWithTime<any>> {
    return this.getPrivate('v2/private/execution/list', params);
  }

  getClosedPnl(
    params: InverseGetClosedPnlRequest
  ): Promise<APIResponseWithTime<any>> {
    return this.getPrivate('v2/private/trade/closed-pnl/list', params);
  }

  setSlTpPositionMode(
    params: InverseSetSlTpPositionModeRequest
  ): Promise<APIResponseWithTime<any>> {
    return this.postPrivate('v2/private/tpsl/switch-mode', params);
  }

  setMarginType(
    params: InverseSetMarginTypeRequest
  ): Promise<APIResponseWithTime<any>> {
    return this.postPrivate('v2/private/position/switch-isolated', params);
  }

  /**
   * Funding
   */

  getLastFundingRate(params: SymbolParam): Promise<APIResponseWithTime<any>> {
    return this.get('v2/public/funding/prev-funding-rate', params);
  }

  getMyLastFundingFee(params: SymbolParam): Promise<APIResponseWithTime<any>> {
    return this.getPrivate('v2/private/funding/prev-funding', params);
  }

  getPredictedFunding(params: SymbolParam): Promise<APIResponseWithTime<any>> {
    return this.getPrivate('v2/private/funding/predicted-funding', params);
  }

  /**
   * LCP Info
   */

  getLcpInfo(params: SymbolParam): Promise<APIResponseWithTime<any>> {
    return this.getPrivate('v2/private/account/lcp', params);
  }
}
