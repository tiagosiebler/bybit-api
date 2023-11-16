import {
  CategoryV5,
  OCOTriggerTypeV5,
  OrderRejectReasonV5,
  OrderSMPTypeV5,
  OrderSideV5,
  OrderStatusV5,
  OrderTimeInForceV5,
  OrderTriggerByV5,
  OrderTypeV5,
  StopOrderTypeV5,
  TPSLModeV5,
} from './v5-shared';
import { WsKey } from './websockets';

export interface WSAccountOrderV5 {
  qty: string;
  price: string;
  symbol: string;
  orderId: string;
  orderIv: string;
  stopLoss: string;
  smpGroup: number;
  side: OrderSideV5;
  placeType: string;
  avgPrice?: string;
  leavesQty?: string;
  isLeverage: string;
  cancelType: string;
  cumExecQty: string;
  cumExecFee: string;
  smpOrderId: string;
  takeProfit: string;
  reduceOnly: boolean;
  orderLinkId: string;
  positionIdx: number;
  tpTriggerBy: string;
  slTriggerBy: string;
  createdTime: string;
  updatedTime: string;
  feeCurrency: string;
  triggerPrice: string;
  category: CategoryV5;
  cumExecValue: string;
  blockTradeId: string;
  leavesValue?: string;
  slLimitPrice?: string;
  tpLimitPrice?: string;
  tpslMode?: TPSLModeV5;
  orderType: OrderTypeV5;
  smpType: OrderSMPTypeV5;
  closeOnTrigger: boolean;
  triggerDirection: number;
  orderStatus: OrderStatusV5;
  lastPriceOnCreated: string;
  triggerBy: OrderTriggerByV5;
  stopOrderType: StopOrderTypeV5;
  timeInForce: OrderTimeInForceV5;
  ocoTriggerType?: OCOTriggerTypeV5;
  rejectReason?: OrderRejectReasonV5;
}

export interface WSAccountOrderEventV5 {
  id: string;
  wsKey: WsKey;
  topic: 'order';
  creationTime: number;
  data: WSAccountOrderV5[];
}
