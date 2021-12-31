import {
  APIResponse,
  AssetExchangeRecordsReq,
  CoinParam,
  SymbolInfo,
  SymbolLimitParam,
  SymbolParam,
  SymbolPeriodLimitParam,
  WalletFundRecordsReq,
  WithdrawRecordsReq,
} from './types/shared';
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

  getOrderBook(params: SymbolParam): GenericAPIResponse {
    return this.requestWrapper.get('v2/public/orderBook/L2', params);
  }

  /**
   * Get latest information for symbol
   */
  getTickers(params?: Partial<SymbolParam>): GenericAPIResponse {
    return this.requestWrapper.get('v2/public/tickers', params);
  }

  getSymbols(): Promise<APIResponse<SymbolInfo[]>> {
    return this.requestWrapper.get('v2/public/symbols');
  }

  /**
   *
   * Market Data : Advanced
   *
   */

  getOpenInterest(params: SymbolPeriodLimitParam): GenericAPIResponse {
    return this.requestWrapper.get('v2/public/open-interest', params);
  }

  getLatestBigDeal(params: SymbolLimitParam): GenericAPIResponse {
    return this.requestWrapper.get('v2/public/big-deal', params);
  }

  getLongShortRatio(params: SymbolPeriodLimitParam): GenericAPIResponse {
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

  getWalletBalance(params?: Partial<CoinParam>): GenericAPIResponse {
    return this.requestWrapper.get('v2/private/wallet/balance', params)
  }

  getWalletFundRecords(params?: WalletFundRecordsReq): GenericAPIResponse {
    return this.requestWrapper.get('v2/private/wallet/fund/records', params);
  }

  getWithdrawRecords(params: WithdrawRecordsReq): GenericAPIResponse {
    return this.requestWrapper.get('v2/private/wallet/withdraw/list', params);
  }

  getAssetExchangeRecords(params?: AssetExchangeRecordsReq): GenericAPIResponse {
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
