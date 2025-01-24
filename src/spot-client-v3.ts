/* eslint-disable @typescript-eslint/no-explicit-any */
import { APIResponseV3, numberInString } from './types';
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
    // Doesn't really matter here, since the only remaining endpoint does not require auth.
    return REST_CLIENT_TYPE_ENUM.v5;
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

  /**
   * Get merged orderbook for symbol
   *
   * This is the only known pre-V5 endpoint to still be online.
   */
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

  /**
   *
   * API Data Endpoints
   *
   */

  getServerTime(): Promise<{ time_now: numberInString }> {
    return this.get('/v2/public/time');
  }
}
