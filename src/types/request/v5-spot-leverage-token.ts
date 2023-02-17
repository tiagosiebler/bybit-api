import { LTOrderTypeV5 } from '../v5-shared';

export interface PurchaseSpotLeveragedTokenParamsV5 {
  ltCoin: string;
  ltAmount: string;
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
