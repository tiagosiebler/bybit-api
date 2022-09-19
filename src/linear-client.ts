import { REST_CLIENT_TYPE_ENUM } from './util/requestUtils';
import {
  APIResponse,
  APIResponseWithTime,
  AssetExchangeRecordsReq,
  CoinParam,
  LinearCancelConditionalOrderRequest,
  LinearCancelOrderRequest,
  LinearConditionalOrderRequest,
  LinearGetClosedPnlRequest,
  LinearGetConditionalOrderRequest,
  LinearGetOrderRequest,
  LinearGetOrdersRequest,
  LinearGetTradeRecordsRequest,
  LinearOrder,
  LinearQueryConditionalOrderRequest,
  LinearReplaceConditionalOrderRequest,
  LinearReplaceOrderRequest,
  LinearSetAddReduceMarginRequest,
  LinearSetAutoAddMarginRequest,
  LinearSetMarginSwitchRequest,
  LinearSetPositionModeRequest,
  LinearSetPositionTpSlModeRequest,
  LinearSetRiskLimitRequest,
  LinearSetTradingStopRequest,
  LinearSetUserLeverageRequest,
  NewLinearOrder,
  PerpPosition,
  PerpPositionRoot,
  SymbolInfo,
  SymbolIntervalFromLimitParam,
  SymbolLimitParam,
  SymbolParam,
  SymbolPeriodLimitParam,
  WalletBalances,
  WalletFundRecordsReq,
  WithdrawRecordsReq,
} from './types';
import { linearPositionModeEnum, positionTpSlModeEnum } from './constants/enum';
import BaseRestClient from './util/BaseRestClient';

/**
 * REST API client for linear/USD perpetual futures APIs (v2)
 */
export class LinearClient extends BaseRestClient {
  getClientType() {
    return REST_CLIENT_TYPE_ENUM.linear;
  }

  async fetchServerTime(): Promise<number> {
    const timeRes = await this.getServerTime();
    return Number(timeRes.time_now);
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
    return this.get('public/linear/kline', params);
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
    return this.get('public/linear/recent-trading-records', params);
  }

  getSymbols(): Promise<APIResponse<SymbolInfo[]>> {
    return this.get('v2/public/symbols');
  }

  getLastFundingRate(params: SymbolParam): Promise<APIResponseWithTime<any[]>> {
    return this.get('public/linear/funding/prev-funding-rate', params);
  }

  getMarkPriceKline(
    params: SymbolIntervalFromLimitParam
  ): Promise<APIResponseWithTime<any[]>> {
    return this.get('public/linear/mark-price-kline', params);
  }

  getIndexPriceKline(
    params: SymbolIntervalFromLimitParam
  ): Promise<APIResponseWithTime<any[]>> {
    return this.get('public/linear/index-price-kline', params);
  }

  getPremiumIndexKline(
    params: SymbolIntervalFromLimitParam
  ): Promise<APIResponseWithTime<any[]>> {
    return this.get('public/linear/premium-index-kline', params);
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
  ): Promise<APIResponseWithTime<WalletBalances>> {
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

  getApiAnnouncements(): Promise<APIResponseWithTime<any>> {
    return this.get('v2/public/announcement');
  }

  /**
   *
   * Account Data Endpoints
   *
   */

  placeActiveOrder(
    params: NewLinearOrder
  ): Promise<APIResponseWithTime<LinearOrder | null>> {
    return this.postPrivate('private/linear/order/create', params);
  }

  getActiveOrderList(
    params: LinearGetOrdersRequest
  ): Promise<APIResponseWithTime<any>> {
    return this.getPrivate('private/linear/order/list', params);
  }

  cancelActiveOrder(
    params: LinearCancelOrderRequest
  ): Promise<APIResponseWithTime<any>> {
    return this.postPrivate('private/linear/order/cancel', params);
  }

  cancelAllActiveOrders(
    params: SymbolParam
  ): Promise<APIResponseWithTime<any>> {
    return this.postPrivate('private/linear/order/cancel-all', params);
  }

  replaceActiveOrder(
    params: LinearReplaceOrderRequest
  ): Promise<APIResponseWithTime<any>> {
    return this.postPrivate('private/linear/order/replace', params);
  }

  queryActiveOrder(
    params: LinearGetOrderRequest
  ): Promise<APIResponseWithTime<any>> {
    return this.getPrivate('private/linear/order/search', params);
  }

  /**
   * Conditional orders
   */

  placeConditionalOrder(
    params: LinearConditionalOrderRequest
  ): Promise<APIResponseWithTime<any>> {
    return this.postPrivate('private/linear/stop-order/create', params);
  }

  getConditionalOrder(
    params: LinearGetConditionalOrderRequest
  ): Promise<APIResponseWithTime<any>> {
    return this.getPrivate('private/linear/stop-order/list', params);
  }

  cancelConditionalOrder(
    params: LinearCancelConditionalOrderRequest
  ): Promise<APIResponseWithTime<any>> {
    return this.postPrivate('private/linear/stop-order/cancel', params);
  }

  cancelAllConditionalOrders(
    params: SymbolParam
  ): Promise<APIResponseWithTime<any>> {
    return this.postPrivate('private/linear/stop-order/cancel-all', params);
  }

  replaceConditionalOrder(
    params: LinearReplaceConditionalOrderRequest
  ): Promise<APIResponseWithTime<any>> {
    return this.postPrivate('private/linear/stop-order/replace', params);
  }

  queryConditionalOrder(
    params: LinearQueryConditionalOrderRequest
  ): Promise<APIResponseWithTime<any>> {
    return this.getPrivate('private/linear/stop-order/search', params);
  }

  /**
   * Position
   */

  getPosition(): Promise<APIResponseWithTime<PerpPositionRoot[]>>;
  getPosition(
    params: Partial<SymbolParam>
  ): Promise<APIResponseWithTime<PerpPosition[]>>;

  getPosition(
    params?: Partial<SymbolParam>
  ): Promise<APIResponseWithTime<PerpPosition[] | PerpPositionRoot[]>> {
    return this.getPrivate('private/linear/position/list', params);
  }

  setAutoAddMargin(
    params?: LinearSetAutoAddMarginRequest
  ): Promise<APIResponseWithTime<any>> {
    return this.postPrivate(
      'private/linear/position/set-auto-add-margin',
      params
    );
  }

  setMarginSwitch(
    params?: LinearSetMarginSwitchRequest
  ): Promise<APIResponseWithTime<any>> {
    return this.postPrivate('private/linear/position/switch-isolated', params);
  }

  /**
   * Switch between one-way vs hedge mode. Use `linearPositionModeEnum` for the mode parameter.
   */
  setPositionMode(
    params: LinearSetPositionModeRequest
  ): Promise<APIResponseWithTime<any>> {
    return this.postPrivate('private/linear/position/switch-mode', params);
  }

  /**
   * Switch TP/SL mode between full or partial. When set to Partial, TP/SL orders may have a quantity less than the position size.
   * This is set with the setTradingStop() method. Use `positionTpSlModeEnum` for the tp_sl_mode parameter.
   */
  setPositionTpSlMode(
    params: LinearSetPositionTpSlModeRequest
  ): Promise<APIResponseWithTime<any>> {
    return this.postPrivate('private/linear/tpsl/switch-mode', params);
  }

  setAddReduceMargin(
    params?: LinearSetAddReduceMarginRequest
  ): Promise<APIResponseWithTime<any>> {
    return this.postPrivate('private/linear/position/add-margin', params);
  }

  setUserLeverage(
    params: LinearSetUserLeverageRequest
  ): Promise<APIResponseWithTime<any>> {
    return this.postPrivate('private/linear/position/set-leverage', params);
  }

  setTradingStop(
    params: LinearSetTradingStopRequest
  ): Promise<APIResponseWithTime<any>> {
    return this.postPrivate('private/linear/position/trading-stop', params);
  }

  getTradeRecords(
    params: LinearGetTradeRecordsRequest
  ): Promise<APIResponseWithTime<any>> {
    return this.getPrivate('private/linear/trade/execution/list', params);
  }

  getClosedPnl(
    params: LinearGetClosedPnlRequest
  ): Promise<APIResponseWithTime<any>> {
    return this.getPrivate('private/linear/trade/closed-pnl/list', params);
  }

  /**
   * Risk Limit
   */

  getRiskLimitList(params: SymbolParam): Promise<APIResponseWithTime<any>> {
    return this.getPrivate('public/linear/risk-limit', params);
  }

  setRiskLimit(
    params: LinearSetRiskLimitRequest
  ): Promise<APIResponseWithTime<any>> {
    return this.postPrivate('private/linear/position/set-risk', params);
  }

  /**
   * Funding
   */

  getPredictedFundingFee(
    params: SymbolParam
  ): Promise<APIResponseWithTime<any>> {
    return this.getPrivate('private/linear/funding/predicted-funding', params);
  }

  getLastFundingFee(params: SymbolParam): Promise<APIResponseWithTime<any>> {
    return this.getPrivate('private/linear/funding/prev-funding', params);
  }
}
