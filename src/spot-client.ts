import {
  NewSpotOrder,
  APIResponse,
  KlineInterval,
  OrderSide,
  OrderTypeSpot,
  SpotBalances,
  SpotLastPrice,
  SpotOrderQueryById,
  SpotSymbolInfo,
} from './types';
import BaseRestClient from './util/BaseRestClient';
import { REST_CLIENT_TYPE_ENUM } from './util/requestUtils';

/**
 * @deprecated Use SpotV3Client instead, which leverages the newer v3 APIs
 * REST API client for Spot APIs (v1)
 */
export class SpotClient extends BaseRestClient {
  getClientType() {
    return REST_CLIENT_TYPE_ENUM.spot;
  }

  fetchServerTime(): Promise<number> {
    return this.getServerTime();
  }

  async getServerTime(): Promise<number> {
    const res = await this.get('/spot/v1/time');
    return res.result.serverTime;
  }

  /**
   *
   * Market Data Endpoints
   *
   **/

  getSymbols(): Promise<APIResponse<SpotSymbolInfo[]>> {
    return this.get('/spot/v1/symbols');
  }

  getOrderBook(symbol: string, limit?: number): Promise<APIResponse<any>> {
    return this.get('/spot/quote/v1/depth', {
      symbol,
      limit,
    });
  }

  getMergedOrderBook(
    symbol: string,
    scale?: number,
    limit?: number
  ): Promise<APIResponse<any>> {
    return this.get('/spot/quote/v1/depth/merged', {
      symbol,
      scale,
      limit,
    });
  }

  getTrades(symbol: string, limit?: number): Promise<APIResponse<any[]>> {
    return this.get('/spot/quote/v1/trades', {
      symbol,
      limit,
    });
  }

  getCandles(
    symbol: string,
    interval: KlineInterval,
    limit?: number,
    startTime?: number,
    endTime?: number
  ): Promise<APIResponse<any[]>> {
    return this.get('/spot/quote/v1/kline', {
      symbol,
      interval,
      limit,
      startTime,
      endTime,
    });
  }

  get24hrTicker(symbol?: string): Promise<APIResponse<any>> {
    return this.get('/spot/quote/v1/ticker/24hr', { symbol });
  }

  getLastTradedPrice(): Promise<APIResponse<SpotLastPrice[]>>;
  getLastTradedPrice(symbol: string): Promise<APIResponse<SpotLastPrice>>;
  getLastTradedPrice(
    symbol?: string
  ): Promise<APIResponse<SpotLastPrice | SpotLastPrice[]>> {
    return this.get('/spot/quote/v1/ticker/price', { symbol });
  }

  getBestBidAskPrice(symbol?: string): Promise<APIResponse<any>> {
    return this.get('/spot/quote/v1/ticker/book_ticker', { symbol });
  }

  /**
   * Account Data Endpoints
   */

  submitOrder(params: NewSpotOrder): Promise<APIResponse<any>> {
    return this.postPrivate('/spot/v1/order', params);
  }

  getOrder(params: SpotOrderQueryById): Promise<APIResponse<any>> {
    return this.getPrivate('/spot/v1/order', params);
  }

  cancelOrder(params: SpotOrderQueryById): Promise<APIResponse<any>> {
    return this.deletePrivate('/spot/v1/order', params);
  }

  cancelOrderBatch(params: {
    symbol: string;
    side?: OrderSide;
    orderTypes: OrderTypeSpot[];
  }): Promise<APIResponse<any>> {
    const orderTypes = params.orderTypes
      ? params.orderTypes.join(',')
      : undefined;

    return this.deletePrivate('/spot/order/batch-cancel', {
      ...params,
      orderTypes,
    });
  }

  getOpenOrders(
    symbol?: string,
    orderId?: string,
    limit?: number
  ): Promise<APIResponse<any>> {
    return this.getPrivate('/spot/v1/open-orders', {
      symbol,
      orderId,
      limit,
    });
  }

  getPastOrders(
    symbol?: string,
    orderId?: string,
    limit?: number
  ): Promise<APIResponse<any>> {
    return this.getPrivate('/spot/v1/history-orders', {
      symbol,
      orderId,
      limit,
    });
  }

  getMyTrades(
    symbol?: string,
    limit?: number,
    fromId?: number,
    toId?: number
  ): Promise<APIResponse<any>> {
    return this.getPrivate('/spot/v1/myTrades', {
      symbol,
      limit,
      fromId,
      toId,
    });
  }

  /**
   * Wallet Data Endpoints
   */

  getBalances(): Promise<APIResponse<SpotBalances>> {
    return this.getPrivate('/spot/v1/account');
  }
}
