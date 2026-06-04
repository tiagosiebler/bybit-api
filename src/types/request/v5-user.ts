import { PermissionsV5 } from '../shared-v5';

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

export interface GetAffiliateUserListParamsV5 {
  size?: number;
  cursor?: string;
  needDeposit?: boolean;
  need30?: boolean;
  need365?: boolean;
  startDate?: string;
  endDate?: string;
}

/** GET /v5/affiliate/affiliate-sub-list */
export interface GetAffiliateSubAffiliateListParamsV5 {
  cursor?: string;
  /** [0, 100]. Default: 0 */
  size?: number;
  /** YYYY-MM-DD. Range with endDate max 3 months */
  startDate?: string;
  /** YYYY-MM-DD. Must be provided with startDate or both omitted (T-1 default) */
  endDate?: string;
  /** Exact sub-affiliate ID. 0 or omit for all */
  subAffId?: number;
}

export interface GetAffiliateUserInfoParamsV5 {
  /** The master account UID of affiliate's client */
  uid: string;
  /** Coin type for filtering, e.g. USDT */
  coin?: string;
  /**
   * Business line filter. 1: Derivatives, 2: Spot, 3: ByFi, 4: USDC, 5: Options
   */
  business?: '1' | '2' | '3' | '4' | '5';
}

/** Get Friend Referrals - invitation relationship status. 0: alive; 1: invalid */
export interface GetFriendReferralsParamsV5 {
  status?: string;
  size?: string;
  cursor?: string;
}

/** Sign Agreement. Only master account.
 * - `category` (legacy): 2 = metals (XAU/XAG perps; stock perps share this); 3 = crude oil. New enum values are not added here; prefer `categoryV2`.
 * - `categoryV2` (recommended): 1 = metals; 2 = crude oil. Additional values may be added by the API; use a numeric literal or variable.
 * - Either `category` or `categoryV2` must be sent. */
export interface SignAgreementParamsV5 {
  agree: boolean;
  category?: 2 | 3;
  categoryV2?: number;
}
