import { APIKeyInfoV3, APIResponseV3WithTime, APIResponseWithTime, AccountCoinBalanceResponseV3, AccountCoinBalancesRequestV3, AccountCoinBalancesResponseV3, AssetInfoRequestV3, AssetInfoResponseV3, CoinInfoQueryResponseV3, CreateSubAPIKeyRequestV3, CreateSubAPIKeyResponseV3, CreateSubMemberRequestV3, CreateSubMemberResponseV3, DepositAddressResponseV3, DepositRecordQueryRequestV3, DepositRecordQueryResponseV3, InternalTransferRequestV3, ModifyAPIKeyRequestV3, QueryDepositAddressRequestV3, QueryInternalTransferSResponseV3, QueryInternalTransfersRequestV3, QuerySubAccountDepositAddressRequestV3, SingleAccountCoinBalanceRequestV3, SubAccountTransferRequestV3, SubAccountTransferResponseV3, SubDepositRecordQueryRequestV3, SubMemberResponseV3, SupportedDepositListRequestV3, SupportedDepositListResponseV3, TransferCoinListRequestV3, UniversalTransferCreateResponse, UniversalTransferListRequestV3, UniversalTransferListResponseV3, UniversalTransferRequestV3, WithdrawCreateRequestV3, WithdrawRecordQueryRequestV3, WithdrawRecordsQueryResponseV3 } from './types';
import BaseRestClient from './util/BaseRestClient';
/**
 * REST API client for Account Asset V3 APIs
 */
export declare class AccountAssetClientV3 extends BaseRestClient {
    getClientType(): "v3";
    fetchServerTime(): Promise<number>;
    getServerTime(): Promise<APIResponseV3WithTime<{
        timeSecond: string;
        timeNano: string;
    }>>;
    /**
     *
     * Transfer Data Endpoints
     *
     */
    createInternalTransfer(params: InternalTransferRequestV3): Promise<APIResponseWithTime<{
        transferId: string;
    }>>;
    getInternalTransfers(params: QueryInternalTransfersRequestV3): Promise<APIResponseWithTime<QueryInternalTransferSResponseV3>>;
    createSubAccountTransfer(params: {
        transferId: string;
        coin: string;
        amount: string;
        subMemberId: number;
        type: 'IN' | 'OUT';
    }): Promise<APIResponseWithTime<{
        transferId: string;
    }>>;
    getSubAccountTransfers(params?: SubAccountTransferRequestV3): Promise<APIResponseWithTime<SubAccountTransferResponseV3>>;
    getSubAccounts(): Promise<APIResponseWithTime<{
        subMemberIds: string[];
        transferableSubMemberIds: string[];
    }>>;
    enableUniversalTransfer(params?: {
        subMemberIds?: string;
    }): Promise<APIResponseWithTime<any>>;
    createUniversalTransfer(params: UniversalTransferRequestV3): Promise<APIResponseWithTime<UniversalTransferCreateResponse>>;
    getUniversalTransfers(params: UniversalTransferListRequestV3): Promise<APIResponseWithTime<UniversalTransferListResponseV3>>;
    getTransferableCoinList(params: TransferCoinListRequestV3): Promise<APIResponseWithTime<{
        list: string[];
    }>>;
    getAccountCoinBalance(params: SingleAccountCoinBalanceRequestV3): Promise<APIResponseWithTime<AccountCoinBalanceResponseV3>>;
    getAccountCoinBalances(params: AccountCoinBalancesRequestV3): Promise<APIResponseWithTime<AccountCoinBalancesResponseV3>>;
    getAssetInfo(params?: AssetInfoRequestV3): Promise<APIResponseWithTime<AssetInfoResponseV3>>;
    /**
     *
     * Wallet & Deposit Endpoints
     *
     */
    /** Get Deposit Spec */
    getSupportedDepositList(params?: SupportedDepositListRequestV3): Promise<APIResponseWithTime<SupportedDepositListResponseV3>>;
    getDepositRecords(params?: DepositRecordQueryRequestV3): Promise<APIResponseWithTime<DepositRecordQueryResponseV3>>;
    getSubDepositRecords(params: SubDepositRecordQueryRequestV3): Promise<APIResponseWithTime<DepositRecordQueryResponseV3>>;
    getWithdrawRecords(params?: WithdrawRecordQueryRequestV3): Promise<APIResponseWithTime<WithdrawRecordsQueryResponseV3>>;
    getCoinInformation(coin?: string): Promise<APIResponseWithTime<CoinInfoQueryResponseV3>>;
    submitWithdrawal(params: WithdrawCreateRequestV3): Promise<APIResponseWithTime<{
        id: string;
    }>>;
    cancelWithdrawal(withdrawalId: number): Promise<APIResponseWithTime<{
        status: 1 | 0;
    }>>;
    getMasterAccountDepositAddress(params?: QueryDepositAddressRequestV3): Promise<APIResponseWithTime<DepositAddressResponseV3>>;
    getSubAccountDepositAddress(params: QuerySubAccountDepositAddressRequestV3): Promise<APIResponseWithTime<DepositAddressResponseV3>>;
    createSubMember(params: CreateSubMemberRequestV3): Promise<APIResponseWithTime<CreateSubMemberResponseV3>>;
    createSubAPIKey(params: CreateSubAPIKeyRequestV3): Promise<APIResponseWithTime<CreateSubAPIKeyResponseV3>>;
    /**
     * Get Sub UID List
     */
    getSubMembers(): Promise<APIResponseWithTime<SubMemberResponseV3>>;
    /**
     * Froze Sub UID
     */
    freezeSubMember(subuid: number, frozenStatus: 0 | 1): Promise<APIResponseWithTime<{}>>;
    getAPIKeyInformation(): Promise<APIResponseWithTime<APIKeyInfoV3>>;
    modifyMasterAPIKey(params: ModifyAPIKeyRequestV3): Promise<APIResponseWithTime<APIKeyInfoV3>>;
    modifySubAPIKey(params: ModifyAPIKeyRequestV3): Promise<APIResponseWithTime<APIKeyInfoV3>>;
    /** WARNING: BE CAREFUL! The API key used to call this interface will be invalid immediately. */
    deleteMasterAPIKey(): Promise<APIResponseWithTime<{}>>;
    /** WARNING: BE CAREFUL! The API key used to call this interface will be invalid immediately. */
    deleteSubAPIKey(): Promise<APIResponseWithTime<{}>>;
}
