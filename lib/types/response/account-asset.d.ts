export interface UniversalTransferCreateResponse {
    transferId: string;
}
export interface UniversalTransferListResponseV3 {
    list: {
        transferId: string;
        coin: string;
        amount: string;
        timestamp: string;
        status: string;
        fromAccountType: string;
        toAccountType: string;
        fromMemberId: string;
        toMemberId: string;
    }[];
    nextPageCursor: string;
}
export interface QueryInternalTransferSResponseV3 {
    list: {
        transferId: string;
        coin: string;
        amount: string;
        fromAccountType: string;
        toAccountType: string;
        timestamp: string;
        status: string;
    }[];
    nextPageCursor: string;
}
export interface SubAccountTransferResponseV3 {
    list: {
        transferId: string;
        coin: string;
        amount: string;
        memberId: number;
        subMemberId: number;
        timestamp: string;
        status: string;
        type: 'IN' | 'OUT';
    }[];
    nextPageCursor: string;
}
export interface AccountCoinBalanceResponseV3 {
    accountType: string;
    bizType: number;
    accountId: string;
    memberId: string;
    balance: {
        coin: string;
        walletBalance: string;
        transferBalance: string;
        bonus: string;
    };
}
export interface AccountCoinBalancesResponseV3 {
    accountType: string;
    memberId: string;
    balance: {
        coin: string;
        walletBalance: string;
        transferBalance: string;
        bonus: string;
    }[];
}
export interface AssetInfoResponseV3 {
    spot: {
        status: 'ACCOUNT_STATUS_NORMAL' | 'ACCOUNT_STATUS_UNSPECIFIED';
        assets: {
            coin: string;
            frozen: string;
            free: string;
            withdraw: string;
        }[];
    };
}
interface SupportedDepositV3 {
    coin: string;
    chain: string;
    coinShowName: string;
    chainType: string;
    blockConfirmNumber: number;
    minDepositAmount: string;
}
export interface SupportedDepositListResponseV3 {
    configList: SupportedDepositV3[];
    nextPageCursor: string;
}
interface DepositRecordV3 {
    coin: string;
    chain: string;
    amount: string;
    txID: string;
    status: number;
    toAddress: string;
    tag: string;
    depositFee: string;
    successAt: string;
    confirmations: string;
    txIndex: string;
    blockHash: string;
}
export interface DepositRecordQueryResponseV3 {
    rows: DepositRecordV3[];
    nextPageCursor: string;
}
export interface WithdrawRecordsQueryResponseV3 {
    rows: {
        coin: string;
        chain: string;
        amount: string;
        txID: string;
        status: number;
        toAddress: string;
        tag: string;
        withdrawFee: string;
        createTime: string;
        updateTime: string;
        withdrawId: string;
        withdrawType: number;
    }[];
    nextPageCursor: string;
}
export interface CoinInfoV3 {
    name: string;
    coin: string;
    remainAmount: string;
    chains: {
        chainType: string;
        confirmation: string;
        withdrawFee: string;
        depositMin: string;
        withdrawMin: string;
        chain: string;
        chainDeposit: string;
        chainWithdraw: string;
        minAccuracy: string;
    }[];
}
export interface CoinInfoQueryResponseV3 {
    rows: CoinInfoV3[];
}
export interface DepositAddressChainV3 {
    chainType: string;
    addressDeposit: string;
    tagDeposit: string;
    chain: string;
}
export interface DepositAddressResponseV3 {
    coin: string;
    chains: DepositAddressChainV3[];
}
export interface CreateSubMemberResponseV3 {
    uid: number;
    username: string;
    memberType: 1 | 6;
    switch: 0 | 1;
    note: string;
}
export interface CreateSubAPIKeyResponseV3 {
    id: string;
    note: string;
    apiKey: string;
    readOnly: string;
    secret: string;
    permissions: {
        ContractTrade: string[];
        Spot: string[];
        Wallet: string[];
        Options: string[];
        Derivatives: string[];
        CopyTrading: string[];
        BlockTrade: string[];
        Exchange: string[];
        NFT: string[];
    };
}
export interface SubMemberV3 {
    uid: string;
    username: string;
    memberType: 1 | 6;
    status: 1 | 2 | 4;
    remark: string;
}
export interface SubMemberResponseV3 {
    subMembers: SubMemberV3[];
}
export interface APIKeyInfoV3 {
    id: string;
    note: string;
    apiKey: string;
    readOnly: string;
    secret: string;
    permissions: {
        ContractTrade: string[];
        Spot: string[];
        Wallet: string[];
        Options: string[];
        Derivatives: string[];
        CopyTrading: string[];
        BlockTrade: string[];
        Exchange: string[];
        NFT: string[];
    };
    ips: string[];
    type: number;
    deadlineDay: number;
    expiredAt: string;
    createdAt: string;
    unified: number;
    uta: number;
    userID: number;
    inviterID: number;
    vipLevel: string;
    mktMakerLevel: string;
    affiliateID: number;
}
export {};
