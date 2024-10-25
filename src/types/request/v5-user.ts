import { PermissionsV5 } from '../v5-shared';

export interface CreateSubMemberParamsV5 {
  username: string;
  password?: string;
  /**
   * 1: normal, 6: custodial
   */
  memberType: 1 | 6;
  /**
   * 0: quick login disabled (default), 1: quick login enabled
   */
  switch?: 0 | 1;
  isUta?: boolean;
  note?: string;
}

export interface CreateSubApiKeyParamsV5 {
  subuid: number;
  note?: string;
  readOnly: 0 | 1;
  ips?: string;
  permissions: PermissionsV5;
}

export interface UpdateApiKeyParamsV5 {
  apikey?: string;
  readOnly?: 0 | 1;
  ips?: string[];
  permissions: PermissionsV5;
}

export interface UpdateSubApiKeyUpdateParamsV5 {
  readOnly?: number;
  ips?: string[];
  permissions: PermissionsV5;
}

export interface DeleteSubMemberParamsV5 {
  subMemberId: string;
}

export interface GetSubAccountAllApiKeysParamsV5 {
  subMemberId: string;
  limit?: number;
  cursor?: string;
}
