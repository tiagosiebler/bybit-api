import {
  CategoryV5,
  ExecTypeV5,
  OCOTriggerTypeV5,
  OrderCancelTypeV5,
  OrderCreateTypeV5,
  OrderRejectReasonV5,
  OrderSMPTypeV5,
  OrderSideV5,
  OrderStatusV5,
  OrderTimeInForceV5,
  OrderTriggerByV5,
  OrderTypeV5,
  PositionIdx,
  PositionSideV5,
  PositionStatusV5,
  StopOrderTypeV5,
  TPSLModeV5,
  TradeModeV5,
} from './v5-shared';
import { WsKey } from './websockets';

export interface WSPublicTopicEventV5<TTopic extends string, TType, TData> {
  id?: string;
  topic: TTopic;
  type: TType;
  /** Cross sequence */
  cs?: number;
  /** Event timestamp */
  ts: number;
  data: TData;
  /**
   * matching engine timestamp (correlated with T from public trade channel)
   */
  cts: number;
  /**
   * Internal reference, can be used to determine if this is spot/linear/inverse/etc
   */
  wsKey: WsKey;
}

export interface WSPrivateTopicEventV5<TTopic extends string, TData> {
  id?: string;
  topic: TTopic;
  creationTime: number;
  data: TData;
  wsKey: WsKey;
}

export interface WSOrderbookV5 {
  /** Symbol */
  s: string;
  /** [price, qty][] */
  b: [string, string][];
  /** [price, qty][] */
  a: [string, string][];
  /** Update ID */
  u: number;
  /** Cross sequence */
  seq: number;
}

export type WSOrderbookEventV5 = WSPublicTopicEventV5<
  string,
  'delta' | 'snapshot',
  WSOrderbookV5[]
>;

export interface WSPositionV5 {
  category: string;
  symbol: string;
  side: PositionSideV5;
  size: string;
  positionIdx: PositionIdx;
  tradeMode: TradeModeV5;
  positionValue: string;
  riskId: number;
  riskLimitValue: string;
  entryPrice: string;
  markPrice: string;
  leverage: string;
  positionBalance: string;
  autoAddMargin: number;
  positionMM: string;
  positionIM: string;
  liqPrice: string;
  bustPrice: string;
  tpslMode: string;
  takeProfit: string;
  stopLoss: string;
  trailingStop: string;
  unrealisedPnl: string;
  curRealisedPnl: string;
  sessionAvgPrice: string;
  delta: string;
  gamma: string;
  vega: string;
  theta: string;
  cumRealisedPnl: string;
  positionStatus: PositionStatusV5;
  adlRankIndicator: number;
  isReduceOnly: boolean;
  mmrSysUpdatedTime: string;
  leverageSysUpdatedTime: string;
  createdTime: string;
  updatedTime: string;
  seq: number;
}

export type WSPositionEventV5 = WSPrivateTopicEventV5<
  'position',
  WSPositionV5[]
>;

export interface WSAccountOrderV5 {
  category: CategoryV5;
  orderId: string;
  orderLinkId: string;
  isLeverage: string;
  blockTradeId: string;
  symbol: string;
  price: string;
  qty: string;
  side: OrderSideV5;
  positionIdx: PositionIdx;
  orderStatus: OrderStatusV5;
  createType: OrderCreateTypeV5;
  cancelType: OrderCancelTypeV5;
  rejectReason?: OrderRejectReasonV5;
  avgPrice?: string;
  leavesQty?: string;
  leavesValue?: string;
  cumExecQty: string;
  cumExecValue: string;
  cumExecFee: string;
  closedPnl: string;
  feeCurrency: string;
  timeInForce: OrderTimeInForceV5;
  orderType: OrderTypeV5;
  stopOrderType: StopOrderTypeV5;
  ocoTriggerType?: OCOTriggerTypeV5;
  orderIv: string;
  marketUnit?: 'baseCoin' | 'quoteCoin';
  triggerPrice: string;
  takeProfit: string;
  stopLoss: string;
  tpslMode?: TPSLModeV5;
  tpLimitPrice?: string;
  slLimitPrice?: string;
  tpTriggerBy: string;
  slTriggerBy: string;
  triggerDirection: number;
  triggerBy: OrderTriggerByV5;
  lastPriceOnCreated: string;
  reduceOnly: boolean;
  closeOnTrigger: boolean;
  placeType: string;
  smpType: OrderSMPTypeV5;
  smpGroup: number;
  smpOrderId: string;
  createdTime: string;
  updatedTime: string;
}

export type WSAccountOrderEventV5 = WSPrivateTopicEventV5<
  'order',
  WSAccountOrderV5[]
>;

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

export type WSExecutionEventV5 = WSPrivateTopicEventV5<
  'execution',
  WSExecutionV5[]
>;
