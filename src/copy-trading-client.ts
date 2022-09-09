import {
  APIResponseWithTime,
  CopyTradingCancelOrderRequest,
  CopyTradingCloseOrderRequest,
  CopyTradingOrderListRequest,
  CopyTradingOrderRequest,
  CopyTradingTradingStopRequest,
  CopyTradingTransferRequest,
  USDCAPIResponse,
} from './types';
import { REST_CLIENT_TYPE_ENUM } from './util';
import BaseRestClient from './util/BaseRestClient';

/**
 * REST API client for USDC Perpetual APIs
 */
export class CopyTradingClient extends BaseRestClient {
  getClientType() {
    // Follows the same authentication mechanism as USDC APIs
    return REST_CLIENT_TYPE_ENUM.usdc;
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

  getSymbolList(): Promise<USDCAPIResponse<any>> {
    return this.get('/contract/v3/public/copytrading/symbol/list');
  }

  /**
   *
   * Account Data Endpoints
   *
   */

  /** -> Order API */

  /** Create order */
  submitOrder(params: CopyTradingOrderRequest): Promise<USDCAPIResponse<any>> {
    return this.postPrivate(
      '/contract/v3/private/copytrading/order/create',
      params
    );
  }

  /** Set Trading Stop */
  setTradingStop(
    params: CopyTradingTradingStopRequest
  ): Promise<USDCAPIResponse<any>> {
    return this.postPrivate(
      '/contract/v3/private/copytrading/order/trading-stop',
      params
    );
  }

  /** Query Order List */
  getActiveOrders(
    params?: CopyTradingOrderListRequest
  ): Promise<USDCAPIResponse<any>> {
    return this.getPrivate(
      '/contract/v3/private/copytrading/order/list',
      params
    );
  }

  /** Cancel order */
  cancelOrder(
    params: CopyTradingCancelOrderRequest
  ): Promise<USDCAPIResponse<any>> {
    return this.postPrivate(
      '/contract/v3/private/copytrading/order/cancel',
      params
    );
  }

  /** Close Order.  This endpoint's rate_limit will decrease by 10 per request; ie, one request to this endpoint consumes 10 from the limit allowed per minute. */
  closeOrder(
    params: CopyTradingCloseOrderRequest
  ): Promise<USDCAPIResponse<any>> {
    return this.postPrivate('/contract/v3/private/copytrading/order/close', {
      params,
    });
  }

  /** -> Positions API */

  /** Position List */
  getPositions(symbol?: string): Promise<USDCAPIResponse<any>> {
    return this.getPrivate('/contract/v3/private/copytrading/position/list', {
      symbol,
    });
  }

  /** Close Position */
  closePosition(
    symbol: string,
    positionIdx: string
  ): Promise<USDCAPIResponse<any>> {
    return this.postPrivate('/contract/v3/private/copytrading/position/close', {
      symbol,
      positionIdx,
    });
  }

  /** Only integers can be set to set the leverage */
  setLeverage(
    symbol: string,
    buyLeverage: string,
    sellLeverage: string
  ): Promise<USDCAPIResponse<any>> {
    return this.postPrivate(
      '/contract/v3/private/copytrading/position/set-leverage',
      { symbol, buyLeverage, sellLeverage }
    );
  }

  /**
   *
   * Wallet Data Endpoints
   *
   */

  /** Get Wallet Balance */
  getBalance(): Promise<USDCAPIResponse<any>> {
    return this.getPrivate('/contract/v3/private/copytrading/wallet/balance');
  }

  /** Transfer */
  transfer(params: CopyTradingTransferRequest): Promise<USDCAPIResponse<any>> {
    return this.postPrivate(
      '/contract/v3/private/copytrading/wallet/transfer',
      params
    );
  }

  /**
   *
   * API Data Endpoints
   *
   */

  getServerTime(): Promise<APIResponseWithTime> {
    return this.get('/v2/public/time');
  }

  getAnnouncements(): Promise<APIResponseWithTime<any[]>> {
    return this.get('/v2/public/announcement');
  }
}
