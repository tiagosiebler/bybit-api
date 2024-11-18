/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  APIResponseV3,
  APIResponseWithTime,
  CopyTradingCancelOrderRequest,
  CopyTradingCloseOrderRequest,
  CopyTradingOrderListRequest,
  CopyTradingOrderRequest,
  CopyTradingTradingStopRequest,
  CopyTradingTransferRequest,
} from './types';
import { REST_CLIENT_TYPE_ENUM } from './util';
import BaseRestClient from './util/BaseRestClient';

/**
 * REST API client for USDC Perpetual APIs
 * @deprecated WARNING
 * These endpoints are being switched off gradually and are expected to be completely turned off by the end of 2024.
 * They may stop working at any point before then.
 * Please update your code as soon as possible to use the V5 APIs instead.
 */
export class CopyTradingClient extends BaseRestClient {
  getClientType() {
    // Follows the same authentication mechanism as USDC APIs
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

  getSymbols(): Promise<APIResponseV3<any>> {
    return this.get('/contract/v3/public/copytrading/symbol/list');
  }

  /**
   *
   * Account Data Endpoints
   *
   */

  /** -> Order API */

  /** Create order */
  submitOrder(params: CopyTradingOrderRequest): Promise<APIResponseV3<any>> {
    return this.postPrivate(
      '/contract/v3/private/copytrading/order/create',
      params,
    );
  }

  /** Set Trading Stop */
  setTradingStop(
    params: CopyTradingTradingStopRequest,
  ): Promise<APIResponseV3<any>> {
    return this.postPrivate(
      '/contract/v3/private/copytrading/order/trading-stop',
      params,
    );
  }

  /** Query Order List */
  getActiveOrders(
    params?: CopyTradingOrderListRequest,
  ): Promise<APIResponseV3<any>> {
    return this.getPrivate(
      '/contract/v3/private/copytrading/order/list',
      params,
    );
  }

  /** Cancel order */
  cancelOrder(
    params: CopyTradingCancelOrderRequest,
  ): Promise<APIResponseV3<any>> {
    return this.postPrivate(
      '/contract/v3/private/copytrading/order/cancel',
      params,
    );
  }

  /** Close Order.
   * This endpoint's rate_limit will decrease by 10 per request;
   * ie, one request to this endpoint consumes 10 from the limit allowed per minute.
   */
  closeOrder(
    params: CopyTradingCloseOrderRequest,
  ): Promise<APIResponseV3<any>> {
    return this.postPrivate(
      '/contract/v3/private/copytrading/order/close',
      params,
    );
  }

  /** -> Positions API */

  /** Position List */
  getPositions(symbol?: string): Promise<APIResponseV3<any>> {
    return this.getPrivate('/contract/v3/private/copytrading/position/list', {
      symbol,
    });
  }

  /** Close Position */
  closePosition(
    symbol: string,
    positionIdx: string,
  ): Promise<APIResponseV3<any>> {
    return this.postPrivate('/contract/v3/private/copytrading/position/close', {
      symbol,
      positionIdx,
    });
  }

  /** Only integers can be set to set the leverage */
  setLeverage(
    symbol: string,
    buyLeverage: string,
    sellLeverage: string,
  ): Promise<APIResponseV3<any>> {
    return this.postPrivate(
      '/contract/v3/private/copytrading/position/set-leverage',
      { symbol, buyLeverage, sellLeverage },
    );
  }

  /**
   *
   * Wallet Data Endpoints
   *
   */

  /** Get Wallet Balance */
  getBalances(): Promise<APIResponseV3<any>> {
    return this.getPrivate('/contract/v3/private/copytrading/wallet/balance');
  }

  /** Transfer */
  transfer(params: CopyTradingTransferRequest): Promise<APIResponseV3<any>> {
    return this.postPrivate(
      '/contract/v3/private/copytrading/wallet/transfer',
      params,
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
}
