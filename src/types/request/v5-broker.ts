export interface GetExchangeBrokerEarningParamsV5 {
  bizType?: 'SPOT' | 'DERIVATIVES' | 'OPTIONS';
  begin?: string;
  end?: string;
  uid?: string;
  limit?: number;
  cursor?: string;
}

export interface getBrokerSubAccountDepositRecords {
  subMemberId?: string;
  coin?: string;
  startTime?: number;
  endTime?: number;
  limit?: number;
  cursor?: string;
}
