//type Constructor = new (...args: any[]) => {};
import { GenericAPIResponse } from './util/requestUtils';
import RequestWrapper from './util/requestWrapper';

export default class SharedEndpoints {
    protected requestWrapper: RequestWrapper; // XXX Is there a way to say that Base has to provide this?
    
    //------------Market Data Endpoints------------>
    
    getOrderBook(params: {
        symbol: string;
    }): GenericAPIResponse {
        return this.requestWrapper.get('v2/public/orderBook/L2', params);
    }
    
    /**
    * @deprecated use getTickers() instead
    */
    getLatestInformation(params?: {
        symbol?: string;
    }): GenericAPIResponse {
        return this.getTickers(params);
    }

    getTickers(params?: {
        symbol?: string;
    }): GenericAPIResponse {
        return this.requestWrapper.get('v2/public/tickers', params);
    }
    
    getSymbols(): GenericAPIResponse {
        return this.requestWrapper.get('v2/public/symbols');
    }
    
    /**
    * @deprecated use getLiquidations() instead
    */
    getPublicLiquidations(params: {
        symbol: string;
        from?: number;
        limit?: number;
        start_time?: number;
        end_time?: number;
    }): GenericAPIResponse {
        return this.getLiquidations(params);
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
    
    //------------Market Data Endpoints------------>
    
    getApiKeyInfo(): GenericAPIResponse {
        return this.requestWrapper.get('v2/private/account/api-key');
    }
    
    //------------Wallet Data Endpoints------------>
    
    getWalletBalance(params: {
        coin?: string;
    }): GenericAPIResponse {
        return this.requestWrapper.get('v2/private/wallet/balance',params)
    }

    getAssetExchangeRecords(params?: {
        limit?: number;
        from?: number;
        direction?: string;
    }): GenericAPIResponse {
        return this.requestWrapper.get('v2/private/exchange-order/list', params);
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
    
    //-------------API Data Endpoints-------------->

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
