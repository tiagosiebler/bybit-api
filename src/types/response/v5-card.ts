export interface CardAssetRecordV5 {
  pan4: string;
  pan6: string;
  tradeStatus: string;
  side: string;
  basicAmount: string;
  basicCurrency: string;
  transactionAmount: string;
  transactionCurrency: string;
  txnCreate: number;
  merchCountry: string;
  merchCity: string;
  merchName: string;
  txnId: string;
  declinedReason: string;
  totalFees: string;
  uid: number;
  transactionCurrencyAmount: string;
  fxPad: string;
  interchangeFee: string;
  billAmount: string;
  paidAmount: string;
  paidCurrency: string;
  bonusAmount: string;
  foreignTransactionFee: string;
  totalTax: string;
  paidFiat: string;
  withdrawalFee: string;
  status: string;
  orderNo: string;
  mccCode: string;
  merchCategoryDesc: string;
}

export interface CardAssetRecordsResultV5 {
  pageSize: number;
  pageNo: number;
  totalCount: number;
  data: CardAssetRecordV5[];
}

export interface CardPointBalanceV5 {
  accountId: string;
  availablePoint: string | number;
  pendingPoint: string | number;
  status: string;
  updateTime: string | number;
  settlementPeriod: number;
}

export interface CardPointRecordV5 {
  outOrderId: string;
  point: number;
  side: string;
  type: string;
  subType: string;
  createTime: number;
  updateTime: number;
  bizId: string;
  bizTxnId: string;
  transactionDate: string;
  transactionId: string;
  transactionAmount: string;
  basicCurrency: string;
  merchCategoryDesc: string;
  merchName: string;
  merchCountry: string;
  merchCity: string;
  pan4: string;
  payFiatAmount: string;
  transactionCurrencyAmount: string;
}

export interface CardPointRecordsResultV5 {
  pageSize: number;
  pageNo: number;
  totalCount: number;
  data: CardPointRecordV5[];
}

export interface CardPointTierInfoV5 {
  usedLimit: string;
  limit: string;
  unit: string;
  tier: string;
  autoCashback: boolean;
}

export interface CardMallItemV5 {
  itemId: string;
  itemName: string;
  priority: number;
  onTime: string;
  offTime: string;
  price: string;
  discountPrice: string;
  totalNum: number;
  redeemNum: number;
  picPath: string;
  currency: string;
  currencyType: number;
  itemType: number;
  itemBizType: number;
}

export interface CardMallItemListResultV5 {
  pageNo: number;
  pageSize: number;
  totalCount: number;
  data: CardMallItemV5[];
}

export interface CardPointCashbackDetailV5 {
  points: string;
  amt: string;
  ccy: string;
  ccyType: string;
  createTime: string;
  bizTxnId: string;
  sourceId: number;
  sourceCode: string;
  orderStatus: number;
  orderSubStatus: number;
  orderShowStatus: string;
  failedBizCode: string;
}
