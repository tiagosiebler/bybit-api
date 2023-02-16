import { PermissionsV5 } from '../v5-shared';

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
  remark: string;
}
export type ApiKeyType = 1 | 2;

export interface ApiKeyInfoV5 {
  id: string;
  note: string;
  apiKey: string;
  readOnly: 0 | 1;
  secret: string;
  permissions: PermissionsV5;
  ips?: string[];
  type: 1 | 2;
  deadlineDay?: number;
  expiredAt?: string;
  createdAt: string;
  unified: 0 | 1;
  uta: 0 | 1;
  userID: number;
  inviterID: number;
  vipLevel?: string;
  mktMakerLevel?: string;
  affiliateID?: number;
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
