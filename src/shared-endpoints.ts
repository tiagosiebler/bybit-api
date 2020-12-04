type Constructor = new (...args: any[]) => {};
import assert from 'assert';
import { GenericAPIResponse } from './util/requestUtils';
import RequestWrapper from './util/requestWrapper';

export function SharedEndpoints<TBase extends Constructor>(Base: TBase) {
  return class Shared extends Base {
    public requestWrapper: RequestWrapper; // XXX Is there a way to say that Base has to provide this?

    // Market Data Endpoints

    getOrderBook(params: any): GenericAPIResponse {
      assert(params, 'No params passed');
      assert(params.symbol, 'Parameter symbol is required');

      return this.requestWrapper.get('v2/public/orderBook/L2', params);
    }

    getLatestInformation(): GenericAPIResponse {
      return this.requestWrapper.get('v2/public/tickers');
    }

    getSymbols(): GenericAPIResponse {
      return this.requestWrapper.get('v2/public/symbols');
    }

    getPublicLiquidations(params: any): GenericAPIResponse {
      assert(params, 'No params passed');
      assert(params.symbol, 'Parameter symbol is required');

      return this.requestWrapper.get('v2/public/liq-records', params);
    }

    getOpenInterest(params: any): GenericAPIResponse {
      assert(params, 'No params passed');
      assert(params.symbol, 'Parameter symbol is required');
      assert(params.period, 'Parameter period is required');

      return this.requestWrapper.get('v2/public/open-interest', params);
    }

    getLatestBigDeal(params: any): GenericAPIResponse {
      assert(params, 'No params passed');
      assert(params.symbol, 'Parameter symbol is required');

      return this.requestWrapper.get('v2/public/big-deal', params);
    }

    getLongShortRatio(params: any): GenericAPIResponse {
      assert(params, 'No params passed');
      assert(params.symbol, 'Parameter symbol is required');
      assert(params.period, 'Parameter period is required');

      return this.requestWrapper.get('v2/public/account-ratio', params);
    }

    // Account Data Endpoints

    getApiKeyInfo(params: any): GenericAPIResponse {
      return this.requestWrapper.get('open-api/api-key', params);
    }

    // Wallet Data Endpoints

    getWalletBalance(params: any): GenericAPIResponse {
      assert(params, 'No params passed');
      assert(params.coin, 'Parameter coin is required');

      return this.requestWrapper.get('v2/private/wallet/balance', params);
    }

    getWalletFundRecords(params: any): GenericAPIResponse {
      return this.requestWrapper.get('open-api/wallet/fund/records', params);
    }

    getWithdrawRecords(params: any): GenericAPIResponse {
      return this.requestWrapper.get('open-api/wallet/withdraw/list', params);
    }

    getAssetExchangeRecords(params: any): GenericAPIResponse {
      return this.requestWrapper.get('v2/private/exchange-order/list', params);
    }

    // API Data Endpoints

    getServerTime(): GenericAPIResponse {
      return this.requestWrapper.get('v2/public/time');
    }

    getApiAnnouncements(): GenericAPIResponse {
      return this.requestWrapper.get('v2/public/announcement');
    }

  }
}
