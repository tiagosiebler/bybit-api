/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  APIKeyInfoV3,
  APIResponseV3WithTime,
  APIResponseWithTime,
  AccountCoinBalanceResponseV3,
  AccountCoinBalancesRequestV3,
  AccountCoinBalancesResponseV3,
  AssetInfoRequestV3,
  AssetInfoResponseV3,
  CoinInfoQueryResponseV3,
  CreateSubAPIKeyRequestV3,
  CreateSubAPIKeyResponseV3,
  CreateSubMemberRequestV3,
  CreateSubMemberResponseV3,
  DepositAddressResponseV3,
  DepositRecordQueryRequestV3,
  DepositRecordQueryResponseV3,
  InternalTransferRequestV3,
  ModifyAPIKeyRequestV3,
  QueryDepositAddressRequestV3,
  QueryInternalTransferSResponseV3,
  QueryInternalTransfersRequestV3,
  QuerySubAccountDepositAddressRequestV3,
  SingleAccountCoinBalanceRequestV3,
  SubAccountTransferRequestV3,
  SubAccountTransferResponseV3,
  SubDepositRecordQueryRequestV3,
  SubMemberResponseV3,
  SupportedDepositListRequestV3,
  SupportedDepositListResponseV3,
  TransferCoinListRequestV3,
  UniversalTransferCreateResponse,
  UniversalTransferListRequestV3,
  UniversalTransferListResponseV3,
  UniversalTransferRequestV3,
  WithdrawCreateRequestV3,
  WithdrawRecordQueryRequestV3,
  WithdrawRecordsQueryResponseV3,
} from './types';
import { REST_CLIENT_TYPE_ENUM } from './util';
import BaseRestClient from './util/BaseRestClient';

/**
 * REST API client for Account Asset V3 APIs
 * @deprecated WARNING
 * These endpoints are being switched off gradually and are expected to be completely turned off by the end of 2024.
 * They may stop working at any point before then.
 * Please update your code as soon as possible to use the V5 APIs instead.
 */
export class AccountAssetClientV3 extends BaseRestClient {
  getClientType() {
    return REST_CLIENT_TYPE_ENUM.v3;
  }

  async fetchServerTime(): Promise<number> {
    const res = await this.getServerTime();
    return Number(res.time);
  }

  getServerTime(): Promise<
    APIResponseV3WithTime<{ timeSecond: string; timeNano: string }>
  > {
    return this.get('/v3/public/time');
  }

  /**
   *
   * Transfer Data Endpoints
   *
   */

  createInternalTransfer(
    params: InternalTransferRequestV3,
  ): Promise<APIResponseWithTime<{ transferId: string }>> {
    return this.postPrivate(
      '/asset/v3/private/transfer/inter-transfer',
      params,
    );
  }

  getInternalTransfers(
    params: QueryInternalTransfersRequestV3,
  ): Promise<APIResponseWithTime<QueryInternalTransferSResponseV3>> {
    return this.getPrivate(
      '/asset/v3/private/transfer/inter-transfer/list/query',
      params,
    );
  }

  createSubAccountTransfer(params: {
    transferId: string;
    coin: string;
    amount: string;
    subMemberId: number;
    type: 'IN' | 'OUT';
  }): Promise<APIResponseWithTime<{ transferId: string }>> {
    return this.postPrivate(
      '/asset/v3/private/transfer/sub-member-transfer',
      params,
    );
  }

  getSubAccountTransfers(
    params?: SubAccountTransferRequestV3,
  ): Promise<APIResponseWithTime<SubAccountTransferResponseV3>> {
    return this.getPrivate(
      '/asset/v3/private/transfer/sub-member-transfer/list/query',
      params,
    );
  }

  getSubAccounts(): Promise<
    APIResponseWithTime<{
      subMemberIds: string[];
      transferableSubMemberIds: string[];
    }>
  > {
    return this.getPrivate('/asset/v3/private/transfer/sub-member/list/query');
  }

  enableUniversalTransfer(params?: {
    subMemberIds?: string;
  }): Promise<APIResponseWithTime<any>> {
    return this.postPrivate(
      '/asset/v3/private/transfer/transfer-sub-member-save',
      params,
    );
  }

  createUniversalTransfer(
    params: UniversalTransferRequestV3,
  ): Promise<APIResponseWithTime<UniversalTransferCreateResponse>> {
    return this.postPrivate(
      '/asset/v3/private/transfer/universal-transfer',
      params,
    );
  }

  getUniversalTransfers(
    params: UniversalTransferListRequestV3,
  ): Promise<APIResponseWithTime<UniversalTransferListResponseV3>> {
    return this.getPrivate(
      '/asset/v3/private/transfer/universal-transfer/list/query',
      params,
    );
  }

  getTransferableCoinList(
    params: TransferCoinListRequestV3,
  ): Promise<APIResponseWithTime<{ list: string[] }>> {
    return this.getPrivate(
      '/asset/v3/private/transfer/transfer-coin/list/query',
      params,
    );
  }

  getAccountCoinBalance(
    params: SingleAccountCoinBalanceRequestV3,
  ): Promise<APIResponseWithTime<AccountCoinBalanceResponseV3>> {
    return this.getPrivate(
      '/asset/v3/private/transfer/account-coin/balance/query',
      params,
    );
  }

  getAccountCoinBalances(
    params: AccountCoinBalancesRequestV3,
  ): Promise<APIResponseWithTime<AccountCoinBalancesResponseV3>> {
    return this.getPrivate(
      '/asset/v3/private/transfer/account-coins/balance/query',
      params,
    );
  }

  getAssetInfo(
    params?: AssetInfoRequestV3,
  ): Promise<APIResponseWithTime<AssetInfoResponseV3>> {
    return this.getPrivate(
      '/asset/v3/private/transfer/asset-info/query',
      params,
    );
  }

  /**
   *
   * Wallet & Deposit Endpoints
   *
   */

  /** Get Deposit Spec */
  getSupportedDepositList(
    params?: SupportedDepositListRequestV3,
  ): Promise<APIResponseWithTime<SupportedDepositListResponseV3>> {
    return this.get(
      '/asset/v3/public/deposit/allowed-deposit-list/query',
      params,
    );
  }

  getDepositRecords(
    params?: DepositRecordQueryRequestV3,
  ): Promise<APIResponseWithTime<DepositRecordQueryResponseV3>> {
    return this.getPrivate('/asset/v3/private/deposit/record/query', params);
  }

  getSubDepositRecords(
    params: SubDepositRecordQueryRequestV3,
  ): Promise<APIResponseWithTime<DepositRecordQueryResponseV3>> {
    return this.getPrivate(
      '/asset/v3/private/deposit/sub-member-record/query',
      params,
    );
  }

  getWithdrawRecords(
    params?: WithdrawRecordQueryRequestV3,
  ): Promise<APIResponseWithTime<WithdrawRecordsQueryResponseV3>> {
    return this.getPrivate('/asset/v3/private/withdraw/record/query', params);
  }

  getCoinInformation(
    coin?: string,
  ): Promise<APIResponseWithTime<CoinInfoQueryResponseV3>> {
    return this.getPrivate('/asset/v3/private/coin-info/query', { coin });
  }

  submitWithdrawal(
    params: WithdrawCreateRequestV3,
  ): Promise<APIResponseWithTime<{ id: string }>> {
    return this.postPrivate('/asset/v3/private/withdraw/create', params);
  }

  cancelWithdrawal(
    withdrawalId: number,
  ): Promise<APIResponseWithTime<{ status: 1 | 0 }>> {
    return this.postPrivate('/asset/v3/private/withdraw/create', {
      withdrawalId,
    });
  }

  getMasterAccountDepositAddress(
    params?: QueryDepositAddressRequestV3,
  ): Promise<APIResponseWithTime<DepositAddressResponseV3>> {
    return this.getPrivate('/asset/v3/private/deposit/address/query', params);
  }

  getSubAccountDepositAddress(
    params: QuerySubAccountDepositAddressRequestV3,
  ): Promise<APIResponseWithTime<DepositAddressResponseV3>> {
    return this.getPrivate(
      '/asset/v3/private/deposit/sub-member-address/query',
      params,
    );
  }

  createSubMember(
    params: CreateSubMemberRequestV3,
  ): Promise<APIResponseWithTime<CreateSubMemberResponseV3>> {
    return this.postPrivate('/user/v3/private/create-sub-member', params);
  }

  createSubAPIKey(
    params: CreateSubAPIKeyRequestV3,
  ): Promise<APIResponseWithTime<CreateSubAPIKeyResponseV3>> {
    return this.postPrivate('/user/v3/private/create-sub-api', params);
  }

  /**
   * Get Sub UID List
   */
  getSubMembers(): Promise<APIResponseWithTime<SubMemberResponseV3>> {
    return this.getPrivate('/user/v3/private/query-sub-members');
  }

  /**
   * Froze Sub UID
   */
  freezeSubMember(
    subuid: number,
    frozenStatus: 0 | 1,
  ): Promise<APIResponseWithTime<{}>> {
    return this.postPrivate('/user/v3/private/frozen-sub-member', {
      subuid,
      frozen: frozenStatus,
    });
  }

  getAPIKeyInformation(): Promise<APIResponseWithTime<APIKeyInfoV3>> {
    return this.getPrivate('/user/v3/private/query-api');
  }

  modifyMasterAPIKey(
    params: ModifyAPIKeyRequestV3,
  ): Promise<APIResponseWithTime<APIKeyInfoV3>> {
    return this.postPrivate('/user/v3/private/update-api', params);
  }

  modifySubAPIKey(
    params: ModifyAPIKeyRequestV3,
  ): Promise<APIResponseWithTime<APIKeyInfoV3>> {
    return this.postPrivate('/user/v3/private/update-sub-api', params);
  }

  /** WARNING: BE CAREFUL! The API key used to call this interface will be invalid immediately. */
  deleteMasterAPIKey(): Promise<APIResponseWithTime<{}>> {
    return this.postPrivate('/user/v3/private/delete-api');
  }

  /** WARNING: BE CAREFUL! The API key used to call this interface will be invalid immediately. */
  deleteSubAPIKey(): Promise<APIResponseWithTime<{}>> {
    return this.postPrivate('/user/v3/private/delete-sub-api');
  }
}
