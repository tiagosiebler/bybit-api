interface EarningDetailV5 {
  userId: string;
  bizType: 'SPOT' | 'DERIVATIVES' | 'OPTIONS' | 'CONVERT';
  symbol: string;
  coin: string;
  earning: string;
  markupEarning: string;
  baseFeeEarning: string;
  orderId: string;
  execTime: string;
}

interface TotalEarningCategoryV5 {
  coin: string;
  earning: string;
}

export interface ExchangeBrokerEarningResultV5 {
  totalEarningCat: {
    spot: TotalEarningCategoryV5[];
    derivatives: TotalEarningCategoryV5[];
    options: TotalEarningCategoryV5[];
    convert: TotalEarningCategoryV5[];
    total: TotalEarningCategoryV5[];
  };
  details: EarningDetailV5[];
  nextPageCursor: string;
}

export interface ExchangeBrokerAccountInfoV5 {
  subAcctQty: string;
  maxSubAcctQty: string;
  baseFeeRebateRate: {
    spot: string;
    derivatives: string;
  };
  markupFeeRebateRate: {
    spot: string;
    derivatives: string;
    convert: string;
  };
  ts: string;
}

export interface ExchangeBrokerSubAccountDepositRecordV5 {
  subMemberId: string;
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
  batchReleaseLimit: string;
  depositType: string;
}
