/**
 * Earn token product (e.g. BYUSDT) — /v5/earn/token/*
 */

export interface GetEarnTokenProductParamsV5 {
  /** Currently only BYUSDT */
  coin: string;
}

export interface PlaceEarnTokenOrderParamsV5 {
  coin: string;
  orderLinkId: string;
  orderType: 'Mint' | 'Redeem';
  amount: string;
  /** Mint: FlexibleSaving; Redeem: UNIFIED */
  accountType: 'FlexibleSaving' | 'UNIFIED';
}

export interface GetEarnTokenOrderListParamsV5 {
  coin: string;
  orderLinkId?: string;
  orderId?: string;
  orderType?: 'Mint' | 'Redeem';
  /** seconds */
  startTime?: number;
  /** seconds */
  endTime?: number;
  cursor?: string;
  limit?: number;
}

export interface GetEarnTokenPositionParamsV5 {
  coin: string;
}

export interface GetEarnTokenDailyYieldParamsV5 {
  coin: string;
  startTime?: number;
  endTime?: number;
  cursor?: string;
  limit?: number;
}

export interface GetEarnTokenHourlyYieldParamsV5 {
  coin: string;
  startTime?: number;
  endTime?: number;
  cursor?: string;
  limit?: number;
}

export interface GetEarnTokenHistoryAprParamsV5 {
  coin: string;
  /** 1 = 7d, 2 = 30d, 3 = 180d */
  range: 1 | 2 | 3;
}
