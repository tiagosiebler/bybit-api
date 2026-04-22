/**
 * Bybit Card — /v5/card/*
 * Authenticated; API key permission per Bybit (often card-related).
 */

export interface QueryCardAssetRecordsParamsV5 {
  /** 0: Pending, 1: Cleared, 2: Declined */
  statusCode?: string;
  /** Default 100, range [1, 500] */
  limit?: number;
  /** Default 1, min 1 */
  page?: number;
  /** Last 2/4 digits of card number */
  pan4?: string;
  createBeginTime?: number;
  createEndTime?: number;
  /** Fuzzy search */
  merchName?: string;
  /** Authorization / Clearing / Refund (see Bybit) */
  type?: string;
  txnId?: string;
  cardToken?: string;
  orderNo?: string;
}

export interface QueryCardPointRecordsParamsV5 {
  type?: string;
  pageSize?: number;
  pageNo?: number;
  startTime?: number;
  endTime?: number;
  outOrderId?: string;
  bizId?: string;
  bizTxnId?: string;
  /** 1: Earn, 2: Deduct */
  side?: string;
}

export interface QueryCardMallItemListParamsV5 {
  pageNo?: number;
  pageSize?: number;
  /** 1: Virtual, 2: Physical */
  itemType?: number;
  /** 1: POINTS, 2: CURRENCY */
  itemBizType?: number;
  /** 1: Priority, 2: Listing time, 3: Price */
  orderBy?: number;
  asc?: boolean;
  /** 0: Default, 1: VIP */
  source?: number;
}

export interface QueryCardPointCashbackDetailParamsV5 {
  bizTxnId: string;
}
