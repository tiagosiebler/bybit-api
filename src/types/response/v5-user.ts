import { PermissionsV5 } from '../shared-v5';

export interface CreateSubMemberResultV5 {
  uid: string;
  username: string;
  memberType: number;
  status: number;
  remark: string;
}

export interface CreateSubApiKeyResultV5 {
  id: string;
  note: string;
  apiKey: string;
  readOnly: number;
  secret: string;
  permissions: PermissionsV5;
}

export interface SubMemberV5 {
  uid: string;
  username: string;
  memberType: number;
  status: number;
  accountMode: number;
  remark: string;
}
export type ApiKeyType = 1 | 2;

export interface ApiKeyPermissionsV5 {
  ContractTrade: string[];
  Spot: string[];
  Wallet: string[];
  Options: string[];
  Derivatives: string[];
  CopyTrading: string[];
  BlockTrade: string[];
  Exchange: string[];
  NFT: string[];
  Affiliate: string[];
}

export interface ApiKeyInfoV5 {
  id: string;
  note: string;
  apiKey: string;
  readOnly: 0 | 1;
  secret: string;
  permissions: ApiKeyPermissionsV5;
  ips: string[];
  type: 1 | 2; // 1: personal, 2: connected to third-party app
  deadlineDay: number;
  expiredAt: string;
  createdAt: string;
  /** @deprecated */
  unified: number;
  uta: 0 | 1; // 0: regular account, 1: unified trade account
  userID: number;
  inviterID: number;
  vipLevel: string;
  mktMakerLevel: string;
  affiliateID: number;
  rsaPublicKey: string;
  isMaster: boolean;
  parentUid: string;
  kycLevel: 'LEVEL_DEFAULT' | 'LEVEL_1' | 'LEVEL_2';
  kycRegion: string;
}

export interface UpdateApiKeyResultV5 {
  id: string;
  note: string;
  apiKey: string;
  readOnly: 0 | 1;
  secret: string;
  permissions: PermissionsV5;
  ips: string[];
}

export interface SubAccountAllApiKeysResultV5 {
  result: {
    id: string;
    ips?: string[];
    apiKey: string;
    note: string;
    status: number;
    expiredAt?: string;
    createdAt: string;
    type: ApiKeyType;
    permissions: PermissionsV5;
    secret: string;
    readOnly: 0 | 1;
    deadlineDay?: number;
    flag: string;
  }[];
  nextPageCursor: string;
}

export interface AffiliateUserListItemV5 {
  userId: string;
  registerTime: string;
  source: string;
  remarks: string;
  isKyc: boolean;
}

export interface AffiliateUserInfoV5 {
  uid: string;
  vipLevel: string;
  takerVol30Day: string;
  makerVol30Day: string;
  tradeVol30Day: string;
  depositAmount30Day: string;
  takerVol365Day: string;
  makerVol365Day: string;
  tradeVol365Day: string;
  depositAmount365Day: string;
  totalWalletBalance: '1' | '2' | '3' | '4';
  depositUpdateTime: string;
  volUpdateTime: string;
  KycLevel: 0 | 1 | 2;
}
