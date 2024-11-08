/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  APIResponseV3,
  APIResponseWithTime,
  KlineInterval,
  NewSpotOrderV3,
  SpotBalances,
  SpotCancelOrderBatchRequest,
  SpotCrossMarginBorrowingInfoRequest,
  SpotCrossMarginRepaymentHistoryRequest,
  SpotLeveragedTokenPRHistoryRequest,
  SpotMyTradesRequest,
  SpotOrderQueryById,
} from './types';
import { REST_CLIENT_TYPE_ENUM } from './util';
import BaseRestClient from './util/BaseRestClient';

/**
 * REST API client for newer Spot V3 APIs.
 * @deprecated WARNING
 * These endpoints are being switched off gradually and are expected to be completely turned off by the end of 2024.
 * They may stop working at any point before then.
 * Please update your code as soon as possible to use the V5 APIs instead.
 */
export class SpotClientV3 extends BaseRestClient {
  getClientType() {
    // Follows the same authentication mechanism as other v3 APIs (e.g. USDC)
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

  /** Get all symbols */
  getSymbols(): Promise<APIResponseV3<any>> {
    return this.get('/spot/v3/public/symbols');
  }

  /** Get orderbook for symbol */
  getOrderBook(symbol: string, limit?: number): Promise<APIResponseV3<any>> {
    return this.get('/spot/v3/public/quote/depth', { symbol, limit });
  }

  /** Get merged orderbook for symbol */
  getMergedOrderBook(
    symbol: string,
    scale?: number,
    limit?: number,
  ): Promise<APIResponseV3<any>> {
    return this.get('/spot/v3/public/quote/depth/merged', {
      symbol,
      scale,
      limit,
    });
  }

  /** Get public trading records (raw trades) */
  getTrades(symbol: string, limit?: number): Promise<APIResponseV3<any>> {
    return this.get('/spot/v3/public/quote/trades', { symbol, limit });
  }

  /** Get candles/klines */
  getCandles(
    symbol: string,
    interval: KlineInterval,
    limit?: number,
    startTime?: number,
    endTime?: number,
  ): Promise<APIResponseV3<any>> {
    return this.get('/spot/v3/public/quote/kline', {
      symbol,
      interval,
      limit,
      startTime,
      endTime,
    });
  }

  /** Get latest information for symbol (24hr ticker) */
  get24hrTicker(symbol?: string): Promise<APIResponseV3<any>> {
    return this.get('/spot/v3/public/quote/ticker/24hr', { symbol });
  }

  /** Get last traded price */
  getLastTradedPrice(symbol?: string): Promise<APIResponseV3<any>> {
    return this.get('/spot/v3/public/quote/ticker/price', { symbol });
  }

  /** Get best bid/ask price */
  getBestBidAskPrice(symbol?: string): Promise<APIResponseV3<any>> {
    return this.get('/spot/v3/public/quote/ticker/bookTicker', { symbol });
  }

  /**
   *
   * Account Data Endpoints
   *
   */

  /** -> Order API */

  /** Create order */
  submitOrder(params: NewSpotOrderV3): Promise<APIResponseV3<any>> {
    return this.postPrivate('/spot/v3/private/order', params);
  }

  /** Get active order state */
  getOrder(params: SpotOrderQueryById): Promise<APIResponseV3<any>> {
    return this.getPrivate('/spot/v3/private/order', params);
  }

  /** Cancel order */
  cancelOrder(params: SpotOrderQueryById): Promise<APIResponseV3<any>> {
    return this.postPrivate('/spot/v3/private/cancel-order', params);
  }

  /** Batch cancel orders */
  cancelOrderBatch(
    params: SpotCancelOrderBatchRequest,
  ): Promise<APIResponseV3<any>> {
    const orderTypes = params.orderTypes
      ? params.orderTypes.join(',')
      : undefined;

    return this.postPrivate('/spot/v3/private/cancel-orders', {
      ...params,
      orderTypes,
    });
  }

  /** Batch cancel up to 100 orders by ID */
  cancelOrderBatchIDs(orderIds: string[]): Promise<APIResponseV3<any>> {
    const orderIdsCsv = orderIds.join(',');
    return this.postPrivate('/spot/v3/private/cancel-orders-by-ids', {
      orderIds: orderIdsCsv,
    });
  }

  /** Get open orders */
  getOpenOrders(
    symbol?: string,
    orderId?: string,
    limit?: number,
    orderCategory?: 0 | 1,
  ): Promise<APIResponseV3<any>> {
    return this.getPrivate('/spot/v3/private/open-orders', {
      symbol,
      orderId,
      limit,
      orderCategory,
    });
  }

  /** Get order history */
  getPastOrders(
    symbol?: string,
    orderId?: string,
    limit?: number,
    orderCategory?: 0 | 1,
  ): Promise<APIResponseV3<any>> {
    return this.getPrivate('/spot/v3/private/history-orders', {
      symbol,
      orderId,
      limit,
      orderCategory,
    });
  }

  /**
   * Get your trade history.
   * If startTime is not specified, you can only query for records in the last 7 days.
   * If you want to query for records older than 7 days, startTime is required.
   */
  getMyTrades(params?: SpotMyTradesRequest): Promise<APIResponseV3<any>> {
    return this.getPrivate('/spot/v3/private/my-trades', params);
  }

  /**
   *
   * Wallet Data Endpoints
   *
   */

  /** Get Wallet Balance */
  getBalances(): Promise<APIResponseV3<SpotBalances>> {
    return this.getPrivate('/spot/v3/private/account');
  }

  /**
   *
   * API Data Endpoints
   *
   */

  getServerTime(): Promise<APIResponseWithTime> {
    return this.get('/v2/public/time');
  }

  /**
   *
   * Leveraged Token Endpoints
   *
   */

  /** Get all asset infos */
  getLeveragedTokenAssetInfos(ltCode?: string): Promise<APIResponseV3<any>> {
    return this.get('/spot/v3/public/infos', { ltCode });
  }

  /** Get leveraged token market info */
  getLeveragedTokenMarketInfo(ltCode: string): Promise<APIResponseV3<any>> {
    return this.getPrivate('/spot/v3/private/reference', { ltCode });
  }

  /** Purchase leveraged token */
  purchaseLeveragedToken(
    ltCode: string,
    ltAmount: string,
    serialNo?: string,
  ): Promise<APIResponseV3<any>> {
    return this.postPrivate('/spot/v3/private/purchase', {
      ltCode,
      ltAmount,
      serialNo,
    });
  }

  /** Redeem leveraged token */
  redeemLeveragedToken(
    ltCode: string,
    ltAmount: string,
    serialNo?: string,
  ): Promise<APIResponseV3<any>> {
    return this.postPrivate('/spot/v3/private/redeem', {
      ltCode,
      ltAmount,
      serialNo,
    });
  }

  /** Get leveraged token purchase/redemption history */
  getLeveragedTokenPRHistory(
    params?: SpotLeveragedTokenPRHistoryRequest,
  ): Promise<APIResponseV3<any>> {
    return this.getPrivate('/spot/v3/private/record', params);
  }

  /**
   *
   * Cross Margin Trading Endpoints
   *
   */

  /** Borrow margin loan */
  borrowCrossMarginLoan(
    coin: string,
    qty: string,
  ): Promise<APIResponseV3<any>> {
    return this.postPrivate('/spot/v3/private/cross-margin-loan', {
      coin,
      qty,
    });
  }

  /** Repay margin loan */
  repayCrossMarginLoan(coin: string, qty: string): Promise<APIResponseV3<any>> {
    return this.postPrivate('/spot/v3/private/cross-margin-repay', {
      coin,
      qty,
    });
  }

  /** Query borrowing info */
  getCrossMarginBorrowingInfo(
    params?: SpotCrossMarginBorrowingInfoRequest,
  ): Promise<APIResponseV3<any>> {
    return this.getPrivate('/spot/v3/private/cross-margin-orders', params);
  }

  /** Query account info */
  getCrossMarginAccountInfo(): Promise<APIResponseV3<any>> {
    return this.getPrivate('/spot/v3/private/cross-margin-account');
  }

  /** Query interest & quota */
  getCrossMarginInterestQuota(coin: string): Promise<APIResponseV3<any>> {
    return this.getPrivate('/spot/v3/private/cross-margin-loan-info', { coin });
  }

  /** Query repayment history */
  getCrossMarginRepaymentHistory(
    params?: SpotCrossMarginRepaymentHistoryRequest,
  ): Promise<APIResponseV3<any>> {
    return this.getPrivate(
      '/spot/v3/private/cross-margin-repay-history',
      params,
    );
  }
}
