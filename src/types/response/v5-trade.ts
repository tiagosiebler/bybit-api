import {
  CategoryV5,
  OrderCancelTypeV5,
  OrderRejectReasonV5,
  OrderSideV5,
  OrderStatusV5,
  OrderTimeInForceV5,
  OrderTriggerByV5,
  OrderTypeV5,
  PositionIdx,
  StopOrderTypeV5,
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
  orderStatus: OrderStatusV5;
  cancelType?: OrderCancelTypeV5;
  rejectReason?: OrderRejectReasonV5;
  avgPrice: string;
  leavesQty: string;
  leavesValue: string;
  cumExecQty: string;
  cumExecValue: string;
  cumExecFee: string;
  timeInForce?: OrderTimeInForceV5;
  orderType?: OrderTypeV5;
  stopOrderType?: StopOrderTypeV5;
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

export interface BatchCreateOrderResultV5 {
  category: CategoryV5;
  symbol: string;
  orderId: string;
  orderLinkId: string;
  createAt: string;
}

export interface BatchOrdersResponseV5<T extends unknown[]> {
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

export interface BatchAmendOrderResultV5 {
  category: CategoryV5;
  symbol: string;
  orderId: string;
  orderLinkId: string;
}

export interface BatchCancelOrderResultV5 {
  category: CategoryV5;
  symbol: string;
  orderId: string;
  orderLinkId: string;
}

export interface SpotBorrowCheckResultV5 {
  symbol: string;
  side: OrderSideV5;
  maxTradeQty: string;
  maxTradeAmount: string;
  borrowCoin: string;
}
