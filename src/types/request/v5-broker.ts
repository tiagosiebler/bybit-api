export interface GetExchangeBrokerEarningsParamsV5 {
  bizType?: 'SPOT' | 'DERIVATIVES' | 'OPTIONS' | 'CONVERT';
  begin?: string;
  end?: string;
  uid?: string;
  limit?: number;
  cursor?: string;
}

export interface GetBrokerSubAccountDepositsV5 {
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
