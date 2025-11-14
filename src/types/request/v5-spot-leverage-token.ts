import { LTOrderTypeV5 } from '../shared-v5';

export interface PurchaseSpotLeveragedTokenParamsV5 {
  ltCoin: string;
  amount: string;
  serialNo?: string;
}

export interface RedeemSpotLeveragedTokenParamsV5 {
  ltCoin: string;
  quantity: string;
  serialNo?: string;
}

export interface GetSpotLeveragedTokenOrderHistoryParamsV5 {
  ltCoin?: string;
  orderId?: string;
  startTime?: number;
  endTime?: number;
  limit?: number;
  ltOrderType?: LTOrderTypeV5;
  serialNo?: string;
}

export interface GetVIPMarginDataParamsV5 {
  vipLevel?: string;
  currency?: string;
}

// Spot Margin Trade (UTA) endpoints
export interface ManualBorrowParamsV5 {
  coin: string;
  amount: string;
}

export interface GetMaxBorrowableAmountParamsV5 {
  currency: string;
}

export interface GetPositionTiersParamsV5 {
  currency?: string;
}

export interface GetCoinStateParamsV5 {
  currency?: string;
}

export interface GetAvailableAmountToRepayParamsV5 {
  currency: string;
}

export interface SetSpotMarginLeverageParamsV5 {
  leverage: string;
  currency?: string;
}

export interface ManualRepayWithoutConversionParamsV5 {
  coin: string;
  amount?: string;
}
