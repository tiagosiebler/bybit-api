/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  APIResponseV3,
  APIResponseWithTime,
  InternalTransferRequest,
  UM7DayTradingHistoryRequest,
  UMActiveOrdersRequest,
  UMBatchOrder,
  UMBatchOrderCancel,
  UMBatchOrderReplace,
  UMBorrowHistoryRequest,
  UMCancelAllOrdersRequest,
  UMCancelOrderRequest,
  UMCandlesRequest,
  UMCategory,
  UMExchangeCoinsRequest,
  UMFundingRateHistoryRequest,
  UMHistoricOrder,
  UMHistoricOrdersRequest,
  UMInstrumentInfo,
  UMInstrumentInfoRequest,
  UMModifyOrderRequest,
  UMOpenInterestRequest,
  UMOptionDeliveryPriceRequest,
  UMOptionsSettlementHistoryRequest,
  UMOrderRequest,
  UMPaginatedResult,
  UMPerpSettlementHistoryRequest,
  UMPositionsRequest,
  UMPublicTradesRequest,
  UMSetTPSLRequest,
  UMTransactionLogRequest,
} from './types';
import { REST_CLIENT_TYPE_ENUM } from './util';
import BaseRestClient from './util/BaseRestClient';

/**
 * REST API client for Derivatives V3 unified margin APIs
 */
export class UnifiedMarginClient extends BaseRestClient {
  getClientType() {
    return REST_CLIENT_TYPE_ENUM.v3;
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

  /** Query order book info. Each side has a depth of 25 orders. */
  getOrderBook(
    symbol: string,
    category: string,
    limit?: number,
  ): Promise<APIResponseV3<any>> {
    return this.get('/derivatives/v3/public/order-book/L2', {
      category,
      symbol,
      limit,
    });
  }

  /** Get candles/klines */
  getCandles(params: UMCandlesRequest): Promise<APIResponseV3<any>> {
    return this.get('/derivatives/v3/public/kline', params);
  }

  /** Get a symbol price/statistics ticker */
  getSymbolTicker(
    category: UMCategory,
    symbol?: string,
  ): Promise<APIResponseV3<any>> {
    return this.get('/derivatives/v3/public/tickers', { category, symbol });
  }

  /** Get trading rules per symbol/contract, incl price/amount/value/leverage filters */
  getInstrumentInfo(
    params: UMInstrumentInfoRequest,
  ): Promise<APIResponseV3<UMPaginatedResult<UMInstrumentInfo>>> {
    return this.get('/derivatives/v3/public/instruments-info', params);
  }

  /** Query mark price kline (like getCandles() but for mark price). */
  getMarkPriceCandles(params: UMCandlesRequest): Promise<APIResponseV3<any>> {
    return this.get('/derivatives/v3/public/mark-price-kline', params);
  }

  /** Query Index Price Kline */
  getIndexPriceCandles(params: UMCandlesRequest): Promise<APIResponseV3<any>> {
    return this.get('/derivatives/v3/public/index-price-kline', params);
  }

  /**
   * The funding rate is generated every 8 hours at 00:00 UTC, 08:00 UTC and 16:00 UTC.
   * For example, if a request is sent at 12:00 UTC, the funding rate generated earlier that day at 08:00 UTC will be sent.
   */
  getFundingRateHistory(
    params: UMFundingRateHistoryRequest,
  ): Promise<APIResponseV3<any>> {
    return this.get(
      '/derivatives/v3/public/funding/history-funding-rate',
      params,
    );
  }

  /** Get Risk Limit */
  getRiskLimit(
    category: UMCategory,
    symbol: string,
  ): Promise<APIResponseV3<any>> {
    return this.get('/derivatives/v3/public/risk-limit/list', {
      category,
      symbol,
    });
  }

  /** Get option delivery price */
  getOptionDeliveryPrice(
    params: UMOptionDeliveryPriceRequest,
  ): Promise<APIResponseV3<any>> {
    return this.get('/derivatives/v3/public/delivery-price', params);
  }

  /** Get recent trades */
  getTrades(params: UMPublicTradesRequest): Promise<APIResponseV3<any>> {
    return this.get('/derivatives/v3/public/recent-trade', params);
  }

  /**
   * Gets the total amount of unsettled contracts.
   * In other words, the total number of contracts held in open positions.
   */
  getOpenInterest(params: UMOpenInterestRequest): Promise<APIResponseV3<any>> {
    return this.get('/derivatives/v3/public/open-interest', params);
  }

  /**
   *
   * Unified Margin Account Endpoints
   *
   */

  /** -> Order API */

  /** Place an order */
  submitOrder(params: UMOrderRequest): Promise<APIResponseV3<any>> {
    return this.postPrivate('/unified/v3/private/order/create', params);
  }

  /** Active order parameters (such as quantity, price) and stop order parameters cannot be modified in one request at the same time. Please request modification separately. */
  modifyOrder(params: UMModifyOrderRequest): Promise<APIResponseV3<any>> {
    return this.postPrivate('/unified/v3/private/order/replace', params);
  }

  /** Cancel order */
  cancelOrder(params: UMCancelOrderRequest): Promise<APIResponseV3<any>> {
    return this.postPrivate('/unified/v3/private/order/cancel', params);
  }

  /** Query Open Orders */
  getActiveOrders(params: UMActiveOrdersRequest): Promise<APIResponseV3<any>> {
    return this.getPrivate('/unified/v3/private/order/unfilled-orders', params);
  }

  /** Query order history. As order creation/cancellation is asynchronous, the data returned from the interface may be delayed. To access order information in real-time, call getActiveOrders() */
  getHistoricOrders(
    params: UMHistoricOrdersRequest,
  ): Promise<APIResponseV3<UMPaginatedResult<UMHistoricOrder>>> {
    return this.getPrivate('/unified/v3/private/order/list', params);
  }

  /**
   * This API provides the batch order mode under the unified margin account.
   * Max 10 per request
   */
  batchSubmitOrders(
    category: UMCategory,
    orders: UMBatchOrder[],
  ): Promise<APIResponseV3<any>> {
    return this.postPrivate('/unified/v3/private/order/create-batch', {
      category,
      request: orders,
    });
  }

  /**
   * This interface can modify the open order information in batches.
   * Currently, it is not supported to modify the conditional order information.
   * Please note that only unfilled or partial filled orders can be modified.
   * If both futures and options orders are in one request, only the orders matching the category will be operated according to the category type
   */
  batchReplaceOrders(
    category: UMCategory,
    orders: UMBatchOrderReplace[],
  ): Promise<APIResponseV3<any>> {
    return this.postPrivate('/unified/v3/private/order/replace-batch', {
      category,
      request: orders,
    });
  }

  /**
   * This API provides batch cancellation under the unified margin account.
   * Order cancellation of futures and options cannot be canceled in one request at the same time.
   * If both futures and options orders are in one request, only the orders matching the category will be operated according to the category type.
   */
  batchCancelOrders(
    category: UMCategory,
    orders: UMBatchOrderCancel[],
  ): Promise<APIResponseV3<any>> {
    return this.postPrivate('/unified/v3/private/order/cancel-batch', {
      category,
      request: orders,
    });
  }

  /**
   * This API provides the cancellation of all open orders under the unified margin account.
   * Order cancellation of futures and options cannot be canceled in one request at the same time.
   * If both futures and options orders are in one request, only the orders matching the category will be operated according to the category type.
   */
  cancelAllOrders(
    params: UMCancelAllOrdersRequest,
  ): Promise<APIResponseV3<any>> {
    return this.postPrivate('/unified/v3/private/order/cancel-all', params);
  }

  /** -> Positions API */

  /**
   * Query my positions real-time. Accessing personal list of positions.
   * Users can access their position holding information through this interface, such as the number of position holdings and wallet balance.
   */
  getPositions(params: UMPositionsRequest): Promise<APIResponseV3<any>> {
    return this.getPrivate('/unified/v3/private/position/list', params);
  }

  /** Leverage setting. */
  setLeverage(
    category: UMCategory,
    symbol: string,
    buyLeverage: number,
    sellLeverage: number,
  ): Promise<APIResponseV3<any>> {
    return this.postPrivate('/unified/v3/private/position/set-leverage', {
      category,
      symbol,
      buyLeverage,
      sellLeverage,
    });
  }

  /**
   * Switching the TP/SL mode to the cross margin mode or selected positions.
   * When you set the TP/SL mode on the selected positions, the quantity of take-profit or stop-loss orders can be smaller than the position size. Please use Trading-Stop endpoint.
   */
  setTPSLMode(
    category: UMCategory,
    symbol: string,
    tpSlMode: 1 | 0,
  ): Promise<APIResponseV3<any>> {
    return this.postPrivate('/unified/v3/private/position/tpsl/switch-mode', {
      category,
      symbol,
      tpSlMode,
    });
  }

  /** Set risk limit */
  setRiskLimit(
    category: UMCategory,
    symbol: string,
    riskId: number,
    positionIdx: number,
  ): Promise<APIResponseV3<any>> {
    return this.postPrivate('/unified/v3/private/position/set-risk-limit', {
      category,
      symbol,
      riskId,
      positionIdx,
    });
  }

  /**
   * Set position TP/SL and trailing stop.
   * Pass the following parameters, then the system will create conditional orders.
   * If the position is closed, the system will cancel these orders, and adjust the position size.
   */
  setTPSL(params: UMSetTPSLRequest): Promise<APIResponseV3<any>> {
    return this.postPrivate(
      '/unified/v3/private/position/trading-stop',
      params,
    );
  }

  /**
   * Access the user's filled history, ranked by time in descending order.
   * There might be multiple filled histories for an order.
   */
  get7DayTradingHistory(
    params: UM7DayTradingHistoryRequest,
  ): Promise<APIResponseV3<any>> {
    return this.getPrivate('/unified/v3/private/execution/list', params);
  }

  /** Query the settlement history, ranked by time in descending order. */
  getOptionsSettlementHistory(
    params: UMOptionsSettlementHistoryRequest,
  ): Promise<APIResponseV3<any>> {
    return this.getPrivate('/unified/v3/private/delivery-record', params);
  }

  /** Query session settlement records, only for USDC perpetual */
  getUSDCPerpetualSettlementHistory(
    params: UMPerpSettlementHistoryRequest,
  ): Promise<APIResponseV3<any>> {
    return this.getPrivate('/unified/v3/private/settlement-record', params);
  }

  /** -> Account API */

  /** Query wallet balance */
  getBalances(coin?: string): Promise<APIResponseV3<any>> {
    return this.getPrivate('/unified/v3/private/account/wallet/balance', {
      coin,
    });
  }

  /**
   * Upgrade to unified margin account.
   * WARNING: This is currently not reversable!
   */
  upgradeToUnifiedMargin(): Promise<APIResponseV3<any>> {
    return this.postPrivate(
      '/unified/v3/private/account/upgrade-unified-account',
    );
  }

  /** Query trading history */
  getTransactionLog(
    params: UMTransactionLogRequest,
  ): Promise<APIResponseV3<any>> {
    return this.getPrivate(
      '/unified/v3/private/account/transaction-log',
      params,
    );
  }

  /** Fund transfer between accounts (v2) */
  transferFunds(params: InternalTransferRequest): Promise<APIResponseV3<any>> {
    return this.postPrivate('/asset/v1/private/transfer', params);
  }

  /** Exchange Coins */
  getCoinExchangeHistory(
    params?: UMExchangeCoinsRequest,
  ): Promise<APIResponseV3<any>> {
    return this.getPrivate(
      '/asset/v2/private/exchange/exchange-order-all',
      params,
    );
  }

  /** Get Borrow History */
  getBorrowHistory(
    params?: UMBorrowHistoryRequest,
  ): Promise<APIResponseV3<any>> {
    return this.getPrivate(
      '/unified/v3/private/account/borrow-history',
      params,
    );
  }

  /** Get Borrow Rate */
  getBorrowRate(currency?: string): Promise<APIResponseV3<any>> {
    return this.getPrivate('/unified/v3/private/account/borrow-rate', {
      currency,
    });
  }

  /**
   *
   * API Data Endpoints
   *
   */

  getServerTime(): Promise<APIResponseWithTime> {
    return this.get('/v2/public/time');
  }
}
