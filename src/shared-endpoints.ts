//type Constructor = new (...args: any[]) => {};
import { GenericAPIResponse } from './util/requestUtils';
import RequestWrapper from './util/requestWrapper';

export default class SharedEndpoints {
    protected requestWrapper: RequestWrapper; // XXX Is there a way to say that Base has to provide this?

    
    
    //------------Wallet Data Endpoints------------>
    
    getWalletBalance(params: {
        coin: string;
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
}
