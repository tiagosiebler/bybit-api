import {
  CategoryV5,
  OrderSideV5,
  OrderTimeInForceV5,
  OrderTriggerByV5,
  OrderTypeV5,
  PositionIdx,
} from '../v5-shared';

export interface OrderResultV5 {
  orderId: string;
  orderLinkId: string;
}

export interface AccountOrderV5 {
  orderId: string;
  orderLinkId?: string;
  blockTradeId?: string;
  symbol: string;
  price: string;
  qty: string;
  side: OrderSideV5;
  isLeverage?: string;
  positionIdx?: PositionIdx;
  orderStatus: string;
  cancelType?: string;
  rejectReason?: string;
  avgPrice: string;
  leavesQty: string;
  leavesValue: string;
  cumExecQty: string;
  cumExecValue: string;
  cumExecFee: string;
  timeInForce?: OrderTimeInForceV5;
  orderType?: OrderTypeV5;
  stopOrderType?: string;
  orderIv?: string;
  triggerPrice?: string;
  takeProfit?: string;
  stopLoss?: string;
  tpTriggerBy?: OrderTriggerByV5;
  slTriggerBy?: OrderTriggerByV5;
  triggerDirection?: number;
  triggerBy?: OrderTriggerByV5;
  lastPriceOnCreated?: string;
  reduceOnly?: boolean;
  closeOnTrigger?: boolean;
  createdTime: string;
  updatedTime: string;
}

export interface BatchOrderResult {
  category: CategoryV5;
  symbol: string;
  orderId: string;
  orderLinkId: string;
  createAt: string;
}

export interface BatchOrdersResult<T extends unknown[]> {
  result: {
    list: T;
  };
  retExtInfo: {
    list: {
      code: number;
      msg: string;
    }[];
  };
}

export interface BatchAmendOrderResult {
  category: CategoryV5;
  symbol: string;
  orderId: string;
  orderLinkId: string;
}

export interface BatchCancelOrderResult {
  category: CategoryV5;
  symbol: string;
  orderId: string;
  orderLinkId: string;
}

export interface SpotBorrowCheckResult {
  symbol: string;
  side: OrderSideV5;
  maxTradeQty: string;
  maxTradeAmount: string;
  borrowCoin: string;
}
