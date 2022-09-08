import { AxiosRequestConfig } from 'axios';
import { APIResponseWithTime } from './types';
import {
  RestClientOptions,
  getRestBaseUrl,
  REST_CLIENT_TYPE_ENUM,
} from './util';
import BaseRestClient from './util/BaseRestClient';

export class USDCOptionsClient extends BaseRestClient {
  /**
   * @public Creates an instance of the USDC Options REST API client.
   *
   * @param {string} key - your API key
   * @param {string} secret - your API secret
   * @param {boolean} [useLivenet=false] uses testnet by default
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
      REST_CLIENT_TYPE_ENUM.usdcOptions
    );
    return this;
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
  getOrderBook(symbol: string): Promise<APIResponseWithTime<any>> {
    return this.get('/option/usdc/openapi/public/v1/order-book', { symbol });
  }

  /** Fetch trading rules (such as min/max qty). Query for all if blank. */
  getContractInfo(params?: unknown): Promise<APIResponseWithTime<any>> {
    return this.get('/option/usdc/openapi/public/v1/symbols', params);
  }

  /** Get a symbol price/statistics ticker */
  getSymbolTicker(symbol: string): Promise<APIResponseWithTime<any>> {
    return this.get('/option/usdc/openapi/public/v1/tick', { symbol });
  }

  /** Get delivery information */
  getDeliveryPrice(params?: unknown): Promise<APIResponseWithTime<any>> {
    return this.get('/option/usdc/openapi/public/v1/delivery-price', params);
  }

  /** Returned records are Taker Buy in default. */
  getLastTrades(params: unknown): Promise<APIResponseWithTime<any>> {
    return this.get(
      '/option/usdc/openapi/public/v1/query-trade-latest',
      params
    );
  }

  /**
   * The data is in hourly.
   * If time field is not passed, it returns the recent 1 hour data by default.
   * It could be any timeframe by inputting startTime & endTime, but it must satisfy [endTime - startTime] <= 30 days.
   * It returns all data in 2 years when startTime & endTime are not passed.
   * Both startTime & endTime entered together or both are left blank
   */
  getHistoricalVolatility(params?: unknown): Promise<APIResponseWithTime<any>> {
    return this.get(
      '/option/usdc/openapi/public/v1/query-historical-volatility',
      params
    );
  }

  /**
   *
   * Account Data Endpoints
   *
   */

  /** -> Order API */

  /**
   * Place an order using the USDC Derivatives Account.
   * The request status can be queried in real-time.
   * The response parameters must be queried through a query or a WebSocket response.
   */
  submitOrder(params: unknown): Promise<APIResponseWithTime<any>> {
    return this.postPrivate(
      '/option/usdc/openapi/private/v1/place-order',
      params
    );
  }

  /**
   * Each request supports a max. of four orders. The reduceOnly parameter should be separate and unique for each order in the request.
   */
  batchSubmitOrders(
    orderRequest: unknown[]
  ): Promise<APIResponseWithTime<any>> {
    return this.postPrivate(
      '/option/usdc/openapi/private/v1/batch-place-orders',
      { orderRequest }
    );
  }

  /** For Options, at least one of the three parameters — price, quantity or implied volatility — must be input. */
  modifyOrder(params: unknown): Promise<APIResponseWithTime<any>> {
    return this.postPrivate(
      '/option/usdc/openapi/private/v1/replace-order',
      params
    );
  }

  /** Each request supports a max. of four orders. The reduceOnly parameter should be separate and unique for each order in the request. */
  batchModifyOrders(
    replaceOrderRequest: unknown[]
  ): Promise<APIResponseWithTime<any>> {
    return this.postPrivate(
      '/option/usdc/openapi/private/v1/batch-replace-orders',
      { replaceOrderRequest }
    );
  }

  /** Cancel order */
  cancelOrder(params: unknown): Promise<APIResponseWithTime<any>> {
    return this.postPrivate(
      '/option/usdc/openapi/private/v1/cancel-order',
      params
    );
  }

  /** Batch cancel orders */
  batchCancelOrders(
    cancelRequest: unknown[]
  ): Promise<APIResponseWithTime<any>> {
    return this.postPrivate(
      '/option/usdc/openapi/private/v1/batch-cancel-orders',
      { cancelRequest }
    );
  }

  /** This is used to cancel all active orders. The real-time response indicates whether the request is successful, depending on retCode. */
  cancelActiveOrders(params?: unknown): Promise<APIResponseWithTime<any>> {
    return this.postPrivate(
      '/option/usdc/openapi/private/v1/cancel-all',
      params
    );
  }

  /** Query Unfilled/Partially Filled Orders(real-time), up to last 7 days of partially filled/unfilled orders */
  getActiveRealtimeOrders(params?: unknown): Promise<APIResponseWithTime<any>> {
    return this.getPrivate(
      '/option/usdc/openapi/private/v1/trade/query-active-orders',
      params
    );
  }

  /** Query Unfilled/Partially Filled Orders */
  getActiveOrders(params: unknown): Promise<APIResponseWithTime<any>> {
    return this.postPrivate(
      '/option/usdc/openapi/private/v1/query-active-orders',
      params
    );
  }

  /** Query order history. The endpoint only supports up to 30 days of queried records */
  getHistoricOrders(params: unknown): Promise<APIResponseWithTime<any>> {
    return this.postPrivate(
      '/option/usdc/openapi/private/v1/query-order-history',
      params
    );
  }

  /** Query trade history. The endpoint only supports up to 30 days of queried records. An error will be returned if startTime is more than 30 days. */
  getOrderExecutionHistory(params: unknown): Promise<APIResponseWithTime<any>> {
    return this.postPrivate(
      '/option/usdc/openapi/private/v1/execution-list',
      params
    );
  }

  /** -> Account API */

  /** The endpoint only supports up to 30 days of queried records. An error will be returned if startTime is more than 30 days. */
  getTransactionLog(params: unknown): Promise<APIResponseWithTime<any>> {
    return this.postPrivate(
      '/option/usdc/openapi/private/v1/query-transaction-log',
      params
    );
  }

  /** Wallet info for USDC account. */
  getBalance(params?: unknown): Promise<APIResponseWithTime<any>> {
    return this.postPrivate(
      '/option/usdc/openapi/private/v1/query-wallet-balance',
      params
    );
  }

  /** Asset Info */
  getAssetInfo(baseCoin?: string): Promise<APIResponseWithTime<any>> {
    return this.postPrivate(
      '/option/usdc/openapi/private/v1/query-asset-info',
      { baseCoin }
    );
  }

  /**
   * If USDC derivatives account balance is greater than X, you can open PORTFOLIO_MARGIN, and if it is less than Y, it will automatically close PORTFOLIO_MARGIN and change back to REGULAR_MARGIN. X and Y will be adjusted according to operational requirements.
   * Rest API returns the result of checking prerequisites. You could get the real status of margin mode change by subscribing margin mode.
   */
  setMarginMode(
    newMarginMode: 'REGULAR_MARGIN' | 'PORTFOLIO_MARGIN'
  ): Promise<APIResponseWithTime<any>> {
    return this.postPrivate(
      '/option/usdc/private/asset/account/setMarginMode',
      { setMarginMode: newMarginMode }
    );
  }

  /** Query margin mode for USDC account. */
  getMarginMode(): Promise<APIResponseWithTime<any>> {
    return this.postPrivate(
      '/option/usdc/openapi/private/v1/query-margin-info'
    );
  }

  /** -> Positions API */

  /** Query my positions */
  getPositions(params: unknown): Promise<APIResponseWithTime<any>> {
    return this.postPrivate(
      '/option/usdc/openapi/private/v1/query-position',
      params
    );
  }

  /** Query Delivery History */
  getDeliveryHistory(params: unknown): Promise<APIResponseWithTime<any>> {
    return this.postPrivate(
      '/option/usdc/openapi/private/v1/query-delivery-list',
      params
    );
  }

  /** Query Positions Info Upon Expiry */
  getPositionsInfoUponExpiry(
    params?: unknown
  ): Promise<APIResponseWithTime<any>> {
    return this.postPrivate(
      '/option/usdc/openapi/private/v1/query-position-exp-date',
      params
    );
  }

  /** -> Market Maker Protection */

  /** modifyMMP */
  modifyMMP(params?: unknown): Promise<APIResponseWithTime<any>> {
    return this.postPrivate(
      '/option/usdc/openapi/private/v1/mmp-modify',
      params
    );
  }

  /** resetMMP */
  resetMMP(currency: string): Promise<APIResponseWithTime<any>> {
    return this.postPrivate('/option/usdc/openapi/private/v1/mmp-reset', {
      currency,
    });
  }

  /** queryMMPState */
  queryMMPState(baseCoin: string): Promise<APIResponseWithTime<any>> {
    return this.postPrivate('/option/usdc/openapi/private/v1/get-mmp-state', {
      baseCoin,
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
