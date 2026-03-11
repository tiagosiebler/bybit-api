export interface GetExchangeBrokerEarningsParamsV5 {
  bizType?: 'SPOT' | 'DERIVATIVES' | 'OPTIONS' | 'CONVERT';
  begin?: string;
  end?: string;
  uid?: string;
  limit?: number;
  cursor?: string;
}

export interface GetBrokerSubAccountDepositsV5 {
  id?: string;
  txID?: string;
  subMemberId?: string;
  coin?: string;
  startTime?: number;
  endTime?: number;
  limit?: number;
  cursor?: string;
}

export interface IssueVoucherParamsV5 {
  accountId: string;
  awardId: string;
  specCode: string;
  amount: string;
  brokerId: string;
}

export interface GetBrokerIssuedVoucherParamsV5 {
  accountId: string;
  awardId: string;
  specCode: string;
  withUsedAmount?: boolean;
}

/** Set Rate Limit - exchange broker only. API rate limit: 1 req per second. */
export interface SetBrokerRateLimitParamsV5 {
  list: {
    uids: string;
    bizType: string;
    rate: number;
  }[];
}

/** Get All Rate Limits - exchange broker only. API rate limit: 1 req per second. */
export interface GetAllBrokerRateLimitsParamsV5 {
  limit?: string;
  cursor?: string;
  uids?: string;
}
