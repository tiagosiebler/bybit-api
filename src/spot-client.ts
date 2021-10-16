import { AxiosRequestConfig } from 'axios';
import { KlineInterval } from './types/shared';
import { NewSpotOrder, OrderSide, OrderTypeSpot, SpotOrderQueryById } from './types/spot';
import BaseRestClient from './util/BaseRestClient';
import { GenericAPIResponse, getRestBaseUrl, RestClientOptions } from './util/requestUtils';
import RequestWrapper from './util/requestWrapper';

export class SpotClient extends BaseRestClient {
  protected requestWrapper: RequestWrapper;

  /**
   * @public Creates an instance of the Spot REST API client.
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
    super(key, secret, getRestBaseUrl(useLivenet, restClientOptions), restClientOptions, requestOptions);

    // this.requestWrapper = new RequestWrapper(
    //   key,
    //   secret,
    //   getRestBaseUrl(useLivenet, restClientOptions),
    //   restClientOptions,
    //   requestOptions
    // );
    return this;
  }

  async getServerTime(urlKeyOverride?: string): Promise<number> {
    const result = await this.get('/spot/v1/time');
    return result.serverTime;
  }

  /**
   *
   * Market Data Endpoints
   *
  **/

  getSymbols() {
    return this.get('/spot/v1/symbols');
  }

  getOrderBook(symbol: string, limit?: number) {
    return this.get('/spot/quote/v1/depth', {
      symbol, limit
    });
  }

  getMergedOrderBook(symbol: string, scale?: number, limit?: number) {
    return this.get('/spot/quote/v1/depth/merged', {
      symbol,
      scale,
      limit,
    });
  }

  getTrades(symbol: string, limit?: number) {
    return this.get('/spot/quote/v1/trades', {
      symbol,
      limit,
    });
  }

  getCandles(symbol: string, interval: KlineInterval, limit?: number, startTime?: number, endTime?: number) {
    return this.get('/spot/quote/v1/kline', {
      symbol,
      interval,
      limit,
      startTime,
      endTime,
    });
  }

  get24hrTicker(symbol?: string) {
    return this.get('/spot/quote/v1/ticker/24hr', { symbol });
  }

  getLastTradedPrice(symbol?: string) {
    return this.get('/spot/quote/v1/ticker/price', { symbol });
  }

  getBestBidAskPrice(symbol?: string) {
    return this.get('/spot/quote/v1/ticker/book_ticker', { symbol });
  }

  /**
   * Account Data Endpoints
   */

  submitOrder(params: NewSpotOrder) {
    return this.postPrivate('/spot/v1/order', params);
  }

  getOrder(params: SpotOrderQueryById) {
    return this.getPrivate('/spot/v1/order', params);
  }

  cancelOrder(params: SpotOrderQueryById) {
    return this.deletePrivate('/spot/v1/order', params);
  }

  cancelOrderBatch(params: {
    symbol: string;
    side?: OrderSide;
    orderTypes: OrderTypeSpot[]
  }) {
    const orderTypes = params.orderTypes ? params.orderTypes.join(',') : undefined;
    return this.deletePrivate('/spot/order/batch-cancel', {
      ...params,
      orderTypes,
    });
  }

  getOpenOrders(symbol?: string, orderId?: string, limit?: number) {
    return this.getPrivate('/spot/v1/open-orders', {
      symbol,
      orderId,
      limit,
    });
  }

  getPastOrders(symbol?: string, orderId?: string, limit?: number) {
    return this.getPrivate('/spot/v1/history-orders', {
      symbol,
      orderId,
      limit,
    });
  }

  getMyTrades(symbol?: string, limit?: number, fromId?: number, toId?: number) {
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

  getBalances() {
    return this.getPrivate('/spot/v1/account');
  }
}
