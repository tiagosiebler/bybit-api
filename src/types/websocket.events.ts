import {
  CategoryV5,
  ExecTypeV5,
  OCOTriggerTypeV5,
  OrderCreateTypeV5,
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

export interface WSOrderbookEventV5 {
  topic: string;
  /** Event timestamp */
  ts: number;
  type: 'delta' | 'snapshot';
  data: {
    /** Symbol */
    s: string;
    /** [price, qty][] */
    b: [string, string][];
    /** [price, qty][] */
    a: [string, string][];
    /** Update ID */
    u: number;
    /**
     * Cross sequence
     */
    seq: number;
  };
  /**
   * matching engine timestamp (correlated with T from public trade channel)
   */
  cts: number;
  /**
   * Internal reference, can be used to determine if this is spot/linear/inverse/etc
   */
  wsKey: WsKey;
}

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

export interface WSExecutionV5 {
  category: CategoryV5;
  symbol: string;
  isLeverage: string;
  orderId: string;
  orderLinkId: string;
  side: OrderSideV5;
  orderPrice: string;
  orderQty: string;
  leavesQty: string;
  createType: OrderCreateTypeV5;
  orderType: OrderTypeV5;
  stopOrderType: StopOrderTypeV5;
  execFee: string;
  execId: string;
  execPrice: string;
  execQty: string;
  execType: ExecTypeV5;
  execValue: string;
  execTime: string;
  isMaker: boolean;
  feeRate: string;
  tradeIv: string;
  markIv: string;
  markPrice: string;
  indexPrice: string;
  underlyingPrice: string;
  blockTradeId: string;
  closedSize: string;
  seq: number;
  marketUnit: string;
}

export interface WSExecutionEventV5 {
  id: string;
  topic: 'execution';
  creationTime: number;
  data: WSExecutionV5[];
  wsKey: WsKey;
}