import { GenericAPIResponse } from './util/requestUtils';
import RequestWrapper from './util/requestWrapper';

export default class SharedEndpoints {
  // TODO: Is there a way to say that Base has to provide this?
  protected requestWrapper: RequestWrapper;

  /**
   *
   * Market Data Endpoints
   *
   */

  getOrderBook(params: {
    symbol: string;
  }): GenericAPIResponse {
    return this.requestWrapper.get('v2/public/orderBook/L2', params);
  }

  getTickers(params?: {
    symbol?: string;
  }): GenericAPIResponse {
    return this.requestWrapper.get('v2/public/tickers', params);
  }

  getSymbols(): GenericAPIResponse {
    return this.requestWrapper.get('v2/public/symbols');
  }

  getLiquidations(params: {
    symbol: string;
    from?: number;
    limit?: number;
    start_time?: number;
    end_time?: number;
  }): GenericAPIResponse {
    return this.requestWrapper.get('v2/public/liq-records', params);
  }

  /**
   *
   * Market Data : Advanced
   *
   */

  getOpenInterest(params: {
    symbol: string;
    period: string;
    limit?: number;
  }): GenericAPIResponse {
    return this.requestWrapper.get('v2/public/open-interest', params);
  }

  getLatestBigDeal(params: {
    symbol: string;
    limit?: number;
  }): GenericAPIResponse {
    return this.requestWrapper.get('v2/public/big-deal', params);
  }

  getLongShortRatio(params: {
    symbol: string;
    period: string;
    limit?: number;
  }): GenericAPIResponse {
    return this.requestWrapper.get('v2/public/account-ratio', params);
  }

  /**
   *
   * Account Data Endpoints
   *
   */

  getApiKeyInfo(): GenericAPIResponse {
    return this.requestWrapper.get('v2/private/account/api-key');
  }

  /**
   *
   * Wallet Data Endpoints
   *
   */

  getWalletBalance(params: {
    coin?: string;
  }): GenericAPIResponse {
    return this.requestWrapper.get('v2/private/wallet/balance', params)
  }

  getWalletFundRecords(params?: {
    start_date?: string;
    end_date?: string;
    currency?: string;
    coin?: string;
    wallet_fund_type?: string;
    page?: number;
    limit?: number;
  }): GenericAPIResponse {
    return this.requestWrapper.get('v2/private/wallet/fund/records', params);
  }

  getWithdrawRecords(params: {
    start_date?: string;
    end_date?: string;
    coin?: string;
    status?: string;
    page?: number;
    limit?: number;
  }): GenericAPIResponse {
    return this.requestWrapper.get('v2/private/wallet/withdraw/list', params);
  }

  getAssetExchangeRecords(params?: {
    limit?: number;
    from?: number;
    direction?: string;
  }): GenericAPIResponse {
    return this.requestWrapper.get('v2/private/exchange-order/list', params);
  }

  /**
   *
   * API Data Endpoints
   *
   */

  getServerTime(): GenericAPIResponse {
    return this.requestWrapper.get('v2/public/time');
  }

  getApiAnnouncements(): GenericAPIResponse {
    return this.requestWrapper.get('v2/public/announcement');
  }

  async getTimeOffset(): Promise<number> {
    const start = Date.now();
    return this.getServerTime().then(result => {
      const end = Date.now();
      return Math.ceil((result.time_now * 1000) - end + ((end - start) / 2));
    });
  }
}
