import { AxiosRequestConfig } from 'axios';
import {
  AccountAssetInformationRequest,
  APIResponseWithTime,
  DepositRecordsRequest,
  EnableUniversalTransferRequest,
  InternalTransferRequest,
  SubAccountTransferRequest,
  SupportedDepositListRequest,
  TransferQueryRequest,
  UniversalTransferRequest,
  WithdrawalRecordsRequest,
  WithdrawalRequest,
} from './types';
import {
  RestClientOptions,
  getRestBaseUrl,
  REST_CLIENT_TYPE_ENUM,
} from './util';
import BaseRestClient from './util/BaseRestClient';

export class AccountAssetClient extends BaseRestClient {
  /**
   * @public Creates an instance of the Account Asset REST API client.
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
    super(
      key,
      secret,
      getRestBaseUrl(useLivenet, restClientOptions),
      restClientOptions,
      requestOptions,
      REST_CLIENT_TYPE_ENUM.accountAsset
    );
    return this;
  }

  async fetchServerTime(): Promise<number> {
    const res = await this.getServerTime();
    return Number(res.time_now);
  }

  /**
   *
   * Transfer Data Endpoints
   *
   */

  createInternalTransfer(
    params: InternalTransferRequest
  ): Promise<APIResponseWithTime<any>> {
    return this.postPrivate('/asset/v1/private/transfer', params);
  }

  createSubAccountTransfer(
    params: SubAccountTransferRequest
  ): Promise<APIResponseWithTime<any>> {
    return this.postPrivate('/asset/v1/private/sub-member/transfer', params);
  }

  getInternalTransfers(
    params?: TransferQueryRequest
  ): Promise<APIResponseWithTime<any>> {
    return this.getPrivate('/asset/v1/private/transfer/list', params);
  }

  getSubAccountTransfers(
    params?: TransferQueryRequest
  ): Promise<APIResponseWithTime<any>> {
    return this.getPrivate(
      '/asset/v1/private/sub-member/transfer/list',
      params
    );
  }

  getSubAccounts(): Promise<APIResponseWithTime<any>> {
    return this.getPrivate('/asset/v1/private/sub-member/member-ids');
  }

  enableUniversalTransfer(
    params?: EnableUniversalTransferRequest
  ): Promise<APIResponseWithTime<any>> {
    return this.postPrivate('/asset/v1/private/transferable-subs/save', params);
  }

  createUniversalTransfer(
    params: UniversalTransferRequest
  ): Promise<APIResponseWithTime<any>> {
    return this.postPrivate('/asset/v1/private/universal/transfer', params);
  }

  getUniversalTransfers(
    params?: TransferQueryRequest
  ): Promise<APIResponseWithTime<any>> {
    return this.getPrivate('/asset/v1/private/universal/transfer/list', params);
  }

  /**
   *
   * Wallet & Deposit Endpoints
   *
   */

  getSupportedDepositList(
    params?: SupportedDepositListRequest
  ): Promise<APIResponseWithTime<any>> {
    return this.get('/asset/v1/public/deposit/allowed-deposit-list', params);
  }

  getDepositRecords(
    params?: DepositRecordsRequest
  ): Promise<APIResponseWithTime<any>> {
    return this.getPrivate('/asset/v1/private/deposit/record/query', params);
  }

  getWithdrawRecords(
    params?: WithdrawalRecordsRequest
  ): Promise<APIResponseWithTime<any>> {
    return this.getPrivate('/asset/v1/private/withdraw/record/query', params);
  }

  getCoinInformation(coin?: string): Promise<APIResponseWithTime<any>> {
    return this.getPrivate('/asset/v1/private/coin-info/query', { coin });
  }

  getAssetInformation(
    params?: AccountAssetInformationRequest
  ): Promise<APIResponseWithTime<any>> {
    return this.getPrivate('/asset/v1/private/asset-info/query', params);
  }

  submitWithdrawal(
    params: WithdrawalRequest
  ): Promise<APIResponseWithTime<any>> {
    return this.postPrivate('/asset/v1/private/withdraw', params);
  }

  cancelWithdrawal(withdrawalId: number): Promise<APIResponseWithTime<any>> {
    return this.postPrivate('/asset/v1/private/withdraw/cancel', {
      id: withdrawalId,
    });
  }

  getDepositAddress(coin: string): Promise<APIResponseWithTime<any>> {
    return this.getPrivate('/asset/v1/private/deposit/address', { coin });
  }

  /**
   *
   * API Data Endpoints
   *
   */

  getServerTime(): Promise<APIResponseWithTime> {
    return this.get('/v2/public/time');
  }

  getApiAnnouncements(): Promise<APIResponseWithTime<any[]>> {
    return this.get('/v2/public/announcement');
  }
}
