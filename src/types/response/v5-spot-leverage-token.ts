import {
  LTOrderStatusV5,
  LTOrderTypeV5,
  LeverageTokenStatusV5,
} from '../v5-shared';

export interface LeverageTokenInfoV5 {
  ltCoin: string;
  ltName: string;
  maxPurchase: string;
  minPurchase: string;
  maxPurchaseDaily: string;
  maxRedeem: string;
  minRedeem: string;
  maxRedeemDaily: string;
  purchaseFeeRate: string;
  redeemFeeRate: string;
  ltStatus: LeverageTokenStatusV5;
  fundFee: string;
  fundFeeTime: string;
  manageFeeRate: string;
  manageFeeTime: string;
  value: string;
  netValue: string;
  total: string;
}

export interface LeveragedTokenMarketResultV5 {
  ltCoin: string;
  nav: string;
  navTime: string;
  circulation: string;
  basket: string;
  leverage: string;
}

export interface PurchaseSpotLeveragedTokenResultV5 {
  ltCoin: string;
  ltOrderStatus: LTOrderStatusV5;
  execQty: string;
  execAmt: string;
  amount: string;
  purchaseId: string;
  serialNo: string;
  valueCoin: string;
}
export interface RedeemSpotLeveragedTokenResultV5 {
  ltCoin: string;
  ltOrderStatus: LTOrderStatusV5;
  quantity: string;
  execQty: string;
  execAmt: string;
  redeemId: string;
  serialNo: string;
  valueCoin: string;
}

export interface SpotLeveragedTokenOrderHistoryV5 {
  ltCoin: string;
  orderId: string;
  ltOrderType: LTOrderTypeV5;
  orderTime: number;
  updateTime: number;
  ltOrderStatus: LTOrderStatusV5;
  fee: string;
  amount: string;
  value: string;
  valueCoin: string;
  serialNo: string;
}

export interface VIPMarginDataV5 {
  vipCoinList: {
    list: {
      borrowable: boolean;
      collateralRatio: string;
      currency: string;
      hourlyBorrowRate: string;
      liquidationOrder: string;
      marginCollateral: boolean;
      maxBorrowingAmount: string;
    }[];
    vipLevel: string;
  }[];
}

export interface SpotMarginStateV5 {
  spotLeverage: string;
  spotMarginMode: '1' | '0';
  effectiveLeverage: string;
}
