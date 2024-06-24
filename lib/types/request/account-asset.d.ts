export type TransferAccountType = 'CONTRACT' | 'SPOT' | 'INVESTMENT' | 'OPTION' | 'UNIFIED';
export type TransferType = 'IN' | 'OUT';
export type TransferStatus = 'SUCCESS' | 'PENDING' | 'FAILED';
export type PageDirection = 'Prev' | 'Next';
export interface InternalTransferRequest {
    transfer_id: string;
    coin: string;
    amount: string;
    from_account_type: TransferAccountType;
    to_account_type: TransferAccountType;
}
export interface InternalTransferRequestV3 {
    transferId: string;
    coin: string;
    amount: string;
    fromAccountType: string;
    toAccountType: string;
}
export interface QueryInternalTransfersRequestV3 {
    transferId?: string;
    coin: string;
    status?: string;
    startTime?: number;
    endTime?: number;
    limit?: number;
    cursor?: string;
}
export interface SubAccountTransferRequest {
    transfer_id: string;
    coin: string;
    amount: string;
    sub_user_id: string;
    type: TransferType;
}
export interface SubAccountTransferRequestV3 {
    transferId?: string;
    coin?: string;
    status?: string;
    startTime?: number;
    endTime?: number;
    limit?: number;
    cursor?: string;
}
export interface TransferQueryRequest {
    transfer_id?: string;
    coin?: string;
    status?: TransferStatus;
    start_time?: number;
    end_time?: number;
    direction?: PageDirection;
    limit?: number;
    cursor?: string;
}
export interface EnableUniversalTransferRequest {
    /** A comma-separated list of subaccount UIDs, for example "123,45,14,26,46" */
    transferable_sub_ids?: string;
}
export interface UniversalTransferRequest {
    transfer_id: string;
    coin: string;
    amount: string;
    from_member_id: string;
    to_member_id: string;
    from_account_type: TransferAccountType;
    to_account_type: TransferAccountType;
}
export interface SupportedDepositListRequest {
    coin?: string;
    chain?: string;
    page_index?: number;
    page_size?: number;
}
export interface DepositRecordsRequest {
    start_time?: number;
    end_time?: number;
    coin?: string;
    cursor?: string;
    direction?: PageDirection;
    limit?: number;
}
export interface WithdrawalRecordsRequest {
    withdraw_id?: number;
    start_time?: number;
    end_time?: number;
    coin?: string;
    cursor?: string;
    direction?: PageDirection;
    limit?: number;
}
export interface AccountAssetInformationRequest {
    /** Account type. Default value: ACCOUNT_TYPE_SPOT */
    account_type?: string;
    coin?: string;
}
export interface WithdrawalRequest {
    address: string;
    amount: string;
    coin: string;
    chain: string;
    tag?: string;
}
export interface UniversalTransferRequestV3 {
    transferId: string;
    coin: string;
    amount: string;
    fromMemberId: string;
    toMemberId: string;
    fromAccountType: TransferAccountType;
    toAccountType: TransferAccountType;
}
export interface UniversalTransferListRequestV3 {
    transferId?: string;
    coin: string;
    status?: string;
    startTime?: number;
    endTime?: number;
    limit?: number;
    cursor?: string;
}
export interface TransferCoinListRequestV3 {
    fromAccountType: TransferAccountType;
    toAccountType: TransferAccountType;
}
export interface SingleAccountCoinBalanceRequestV3 {
    memberId?: string;
    accountType: TransferAccountType;
    coin: string;
    withBonus?: '0' | '1';
}
export interface AccountCoinBalancesRequestV3 {
    memberId?: string;
    accountType: TransferAccountType;
    coin?: string;
    withBonus?: '0' | '1';
}
export interface AssetInfoRequestV3 {
    accountType?: TransferAccountType;
    coin?: string;
}
export interface SupportedDepositListRequestV3 {
    coin?: string;
    chain?: string;
    cursor?: string;
    limit?: number;
}
export interface DepositRecordQueryRequestV3 {
    startTime?: number;
    endTime?: number;
    coin?: string;
    cursor?: string;
    limit?: number;
}
export interface SubDepositRecordQueryRequestV3 {
    subMemberId: number;
    startTime?: number;
    endTime?: number;
    coin?: string;
    cursor?: string;
    limit?: number;
}
export interface WithdrawRecordQueryRequestV3 {
    withdrawID?: number;
    startTime?: number;
    endTime?: number;
    coin?: string;
    withdrawType?: string;
    cursor?: string;
    limit?: number;
}
export interface WithdrawCreateRequestV3 {
    coin: string;
    chain: string;
    address: string;
    tag?: string;
    amount: string;
    timestamp: number;
    forceChain?: 0 | 1;
}
export interface QueryDepositAddressRequestV3 {
    coin?: string;
    chainType?: string;
}
export interface QuerySubAccountDepositAddressRequestV3 {
    coin?: string;
    chainType?: string;
    subMemberId: string;
}
export interface CreateSubMemberRequestV3 {
    username: string;
    memberType: 1 | 6;
    switch?: 0 | 1;
    note?: string;
}
export interface CreateSubAPIKeyRequestV3 {
    subuid: string;
    note?: string;
    readOnly: 0 | 1;
    ips?: string[];
    permissions: {
        ContractTrade?: string[];
        Spot?: string[];
        Wallet?: string[];
        Options?: string[];
        Derivatives?: string[];
        Exchange?: string[];
    };
}
export interface ModifyAPIKeyRequestV3 {
    readOnly: number;
    ips?: string[];
    permissions: {
        ContractTrade?: string[];
        Spot?: string[];
        Wallet?: string[];
        Options?: string[];
        Derivatives?: string[];
        CopyTrading?: string[];
        BlockTrade?: string[];
        Exchange?: string[];
        NFT?: string[];
    };
}
