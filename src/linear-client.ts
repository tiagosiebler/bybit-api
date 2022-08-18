import { AxiosRequestConfig } from 'axios';
import {
  getRestBaseUrl,
  RestClientOptions,
  REST_CLIENT_TYPE_ENUM,
} from './util/requestUtils';
import {
  APIResponse,
  APIResponseWithTime,
  AssetExchangeRecordsReq,
  CoinParam,
  LinearOrder,
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

export class LinearClient extends BaseRestClient {
  /**
   * @public Creates an instance of the linear (USD Perps) REST API client.
   *
   * @param {string} key - your API key
   * @param {string} secret - your API secret
   * @param {boolean} [useLivenet=false]
   * @param {RestClientOptions} [restClientOptions={}] options to configure REST API connectivity
   * @param {AxiosRequestConfig} [requestOptions={}] HTTP networking options for axios
   */
  constructor(
    key?: string | undefined,
    secret?: string | undefined,
    useLivenet: boolean = false,
    restClientOptions: RestClientOptions = {},
    requestOptions: AxiosRequestConfig = {}
  ) {
    super(
      key,
      secret,
      getRestBaseUrl(useLivenet, restClientOptions),
      restClientOptions,
      requestOptions,
      REST_CLIENT_TYPE_ENUM.linear
    );
    return this;
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

  getActiveOrderList(params: {
    order_id?: string;
    order_link_id?: string;
    symbol: string;
    order?: string;
    page?: number;
    limit?: number;
    order_status?: string;
  }): Promise<APIResponseWithTime<any>> {
    return this.getPrivate('private/linear/order/list', params);
  }

  cancelActiveOrder(params: {
    symbol: string;
    order_id?: string;
    order_link_id?: string;
  }): Promise<APIResponseWithTime<any>> {
    return this.postPrivate('private/linear/order/cancel', params);
  }

  cancelAllActiveOrders(
    params: SymbolParam
  ): Promise<APIResponseWithTime<any>> {
    return this.postPrivate('private/linear/order/cancel-all', params);
  }

  replaceActiveOrder(params: {
    order_id?: string;
    order_link_id?: string;
    symbol: string;
    p_r_qty?: number;
    p_r_price?: number;
    take_profit?: number;
    stop_loss?: number;
    tp_trigger_by?: string;
    sl_trigger_by?: string;
  }): Promise<APIResponseWithTime<any>> {
    return this.postPrivate('private/linear/order/replace', params);
  }

  queryActiveOrder(params: {
    order_id?: string;
    order_link_id?: string;
    symbol: string;
  }): Promise<APIResponseWithTime<any>> {
    return this.getPrivate('private/linear/order/search', params);
  }

  /**
   * Conditional orders
   */

  placeConditionalOrder(params: {
    side: string;
    symbol: string;
    order_type: string;
    qty: number;
    price?: number;
    base_price: number;
    stop_px: number;
    time_in_force: string;
    trigger_by?: string;
    close_on_trigger?: boolean;
    order_link_id?: string;
    reduce_only: boolean;
    take_profit?: number;
    stop_loss?: number;
    tp_trigger_by?: string;
    sl_trigger_by?: string;
  }): Promise<APIResponseWithTime<any>> {
    return this.postPrivate('private/linear/stop-order/create', params);
  }

  getConditionalOrder(params: {
    stop_order_id?: string;
    order_link_id?: string;
    symbol: string;
    stop_order_status?: string;
    order?: string;
    page?: number;
    limit?: number;
  }): Promise<APIResponseWithTime<any>> {
    return this.getPrivate('private/linear/stop-order/list', params);
  }

  cancelConditionalOrder(params: {
    symbol: string;
    stop_order_id?: string;
    order_link_id?: string;
  }): Promise<APIResponseWithTime<any>> {
    return this.postPrivate('private/linear/stop-order/cancel', params);
  }

  cancelAllConditionalOrders(
    params: SymbolParam
  ): Promise<APIResponseWithTime<any>> {
    return this.postPrivate('private/linear/stop-order/cancel-all', params);
  }

  replaceConditionalOrder(params: {
    stop_order_id?: string;
    order_link_id?: string;
    symbol: string;
    p_r_qty?: number;
    p_r_price?: number;
    p_r_trigger_price?: number;
    take_profit?: number;
    stop_loss?: number;
    tp_trigger_by?: string;
    sl_trigger_by?: string;
  }): Promise<APIResponseWithTime<any>> {
    return this.postPrivate('private/linear/stop-order/replace', params);
  }

  queryConditionalOrder(params: {
    symbol: string;
    stop_order_id?: string;
    order_link_id?: string;
  }): Promise<APIResponseWithTime<any>> {
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

  setAutoAddMargin(params?: {
    symbol: string;
    side: string;
    auto_add_margin: boolean;
  }): Promise<APIResponseWithTime<any>> {
    return this.postPrivate(
      'private/linear/position/set-auto-add-margin',
      params
    );
  }

  setMarginSwitch(params?: {
    symbol: string;
    is_isolated: boolean;
    buy_leverage: number;
    sell_leverage: number;
  }): Promise<APIResponseWithTime<any>> {
    return this.postPrivate('private/linear/position/switch-isolated', params);
  }

  /**
   * Switch between one-way vs hedge mode. Use `linearPositionModeEnum` for the mode parameter.
   */
  setPositionMode(params: {
    symbol: string;
    mode: typeof linearPositionModeEnum[keyof typeof linearPositionModeEnum];
  }): Promise<APIResponseWithTime<any>> {
    return this.postPrivate('private/linear/position/switch-mode', params);
  }

  /**
   * Switch TP/SL mode between full or partial. When set to Partial, TP/SL orders may have a quantity less than the position size.
   * This is set with the setTradingStop() method. Use `positionTpSlModeEnum` for the tp_sl_mode parameter.
   */
  setPositionTpSlMode(params: {
    symbol: string;
    tp_sl_mode: typeof positionTpSlModeEnum[keyof typeof positionTpSlModeEnum];
  }): Promise<APIResponseWithTime<any>> {
    return this.postPrivate('private/linear/tpsl/switch-mode', params);
  }

  setAddReduceMargin(params?: {
    symbol: string;
    side: string;
    margin: number;
  }): Promise<APIResponseWithTime<any>> {
    return this.postPrivate('private/linear/position/add-margin', params);
  }

  setUserLeverage(params: {
    symbol: string;
    buy_leverage: number;
    sell_leverage: number;
  }): Promise<APIResponseWithTime<any>> {
    return this.postPrivate('private/linear/position/set-leverage', params);
  }

  setTradingStop(params: {
    symbol: string;
    side: string;
    take_profit?: number;
    stop_loss?: number;
    trailing_stop?: number;
    tp_trigger_by?: string;
    sl_trigger_by?: string;
    sl_size?: number;
    tp_size?: number;
  }): Promise<APIResponseWithTime<any>> {
    return this.postPrivate('private/linear/position/trading-stop', params);
  }

  getTradeRecords(params: {
    symbol: string;
    start_time?: number;
    end_time?: number;
    exec_type?: string;
    page?: number;
    limit?: number;
  }): Promise<APIResponseWithTime<any>> {
    return this.getPrivate('private/linear/trade/execution/list', params);
  }

  getClosedPnl(params: {
    symbol: string;
    start_time?: number;
    end_time?: number;
    exec_type?: string;
    page?: number;
    limit?: number;
  }): Promise<APIResponseWithTime<any>> {
    return this.getPrivate('private/linear/trade/closed-pnl/list', params);
  }

  /**
   * Risk Limit
   */

  getRiskLimitList(params: SymbolParam): Promise<APIResponseWithTime<any>> {
    return this.getPrivate('public/linear/risk-limit', params);
  }

  setRiskLimit(params: {
    symbol: string;
    side: string;
    risk_id: number;
  }): Promise<APIResponseWithTime<any>> {
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
