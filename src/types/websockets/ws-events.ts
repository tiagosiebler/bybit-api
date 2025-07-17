import WebSocket from 'isomorphic-ws';

import {
  CategoryV5,
  ExecTypeV5,
  OCOTriggerTypeV5,
  OrderCancelTypeV5,
  OrderCreateTypeV5,
  OrderRejectReasonV5,
  OrderSideV5,
  OrderSMPTypeV5,
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
} from '../shared-v5';
import { WsKey } from './ws-general';

export interface MessageEventLike {
  target: WebSocket;
  type: 'message';
  data: string;
}

export function isMessageEvent(msg: unknown): msg is MessageEventLike {
  if (typeof msg !== 'object' || !msg) {
    return false;
  }

  const message = msg as MessageEventLike;
  return message['type'] === 'message' && typeof message['data'] === 'string';
}

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
  WSOrderbookV5
>;

export interface WSTradeV5 {
  T: number;
  s: string;
  S: OrderSideV5;
  v: string;
  p: string;
  L?: string;
  i: string;
  BT: boolean;
  RPI?: boolean;
  mP?: string;
  iP?: string;
  mIv?: string;
  iv?: string;
}

export type WSTradeEventV5 = WSPublicTopicEventV5<
  string,
  'snapshot',
  WSTradeV5[]
>;

/**
 *  WSTickerV5 is the data structure for the "linear" ticker channel
 *  */
export interface WSTickerV5 {
  symbol: string;
  tickDirection: string;
  price24hPcnt: string;
  lastPrice: string;
  prevPrice24h: string;
  highPrice24h: string;
  lowPrice24h: string;
  prevPrice1h: string;
  markPrice: string;
  indexPrice: string;
  openInterest: string;
  openInterestValue: string;
  turnover24h: string;
  volume24h: string;
  nextFundingTime: string;
  fundingRate: string;
  bid1Price: string;
  bid1Size: string;
  ask1Price: string;
  ask1Size: string;
  deliveryTime?: string;
  basisRate?: string;
  deliveryFeeRate?: string;
  predictedDeliveryPrice?: string;
  preOpenPrice?: string;
  preQty?: string;
  curPreListingPhase?: string;
}

export interface WSTickerOptionV5 {
  symbol: string;
  bidPrice: string;
  bidSize: string;
  bidIv: string;
  askPrice: string;
  askSize: string;
  askIv: string;
  lastPrice: string;
  highPrice24h: string;
  lowPrice24h: string;
  markPrice: string;
  indexPrice: string;
  markPriceIv: string;
  underlyingPrice: string;
  openInterest: string;
  turnover24h: string;
  volume24h: string;
  totalVolume: string;
  totalTurnover: string;
  delta: string;
  gamma: string;
  vega: string;
  theta: string;
  predictedDeliveryPrice: string;
  change24h: string;
}

export interface WSTickerSpotV5 {
  symbol: string;
  lastPrice: string;
  highPrice24h: string;
  lowPrice24h: string;
  prevPrice24h: string;
  volume24h: string;
  turnover24h: string;
  price24hPcnt: string;
  usdIndexPrice: string;
}

export type WSTickerEventV5 = WSPublicTopicEventV5<
  string,
  'snapshot' | 'delta',
  WSTickerV5 | WSTickerOptionV5 | WSTickerSpotV5
>;

export interface WSKlineV5 {
  start: number;
  end: number;
  interval: string;
  open: string;
  close: string;
  high: string;
  low: string;
  volume: string;
  turnover: string;
  confirm: boolean;
  timestamp: number;
}

export type WSKlineEventV5 = WSPublicTopicEventV5<
  string,
  'snapshot',
  WSKlineV5[]
>;

export interface WSLiquidationV5 {
  T: number;
  s: string;
  S: OrderSideV5;
  v: string;
  p: string;
}

export type WSLiquidationEventV5 = WSPublicTopicEventV5<
  string,
  'snapshot',
  WSLiquidationV5[]
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
  positionIMByMp: string;
  positionMMByMp: string;
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
  execPnl: string;
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
  extraFees: string;
  seq: number;
  marketUnit: string;
}

export type WSExecutionEventV5 = WSPrivateTopicEventV5<
  'execution',
  WSExecutionV5[]
>;

export interface WSExecutionFastV5 {
  category: CategoryV5;
  symbol: string;
  execId: string;
  execPrice: string;
  execQty: string;
  orderId: string;
  isMaker: boolean;
  orderLinkId: string;
  side: OrderSideV5;
  execTime: string;
  seq: number;
}

export type WSExecutionFastEventV5 = WSPrivateTopicEventV5<
  'execution.fast',
  WSExecutionFastV5[]
>;

export interface WSCoinV5 {
  coin: string;
  equity: string;
  usdValue: string;
  walletBalance: string;
  free?: string;
  locked: string;
  spotHedgingQty: string;
  borrowAmount: string;
  availableToBorrow: string;
  availableToWithdraw: string;
  accruedInterest: string;
  totalOrderIM: string;
  totalPositionIM: string;
  totalPositionMM: string;
  unrealisedPnl: string;
  cumRealisedPnl: string;
  bonus: string;
  collateralSwitch: boolean;
  marginCollateral: boolean;
}

export interface WSWalletV5 {
  accountType: string;
  accountLTV: string;
  accountIMRate: string;
  accountMMRate: string;
  accountIMRateByMp: string;
  accountMMRateByMp: string;
  totalInitialMarginByMp: string;
  totalMaintenanceMarginByMp: string;
  totalEquity: string;
  totalWalletBalance: string;
  totalMarginBalance: string;
  totalAvailableBalance: string;
  totalPerpUPL: string;
  totalInitialMargin: string;
  totalMaintenanceMargin: string;
  coin: WSCoinV5[];
}

export type WSWalletEventV5 = WSPrivateTopicEventV5<'wallet', WSWalletV5[]>;

export interface WSGreeksV5 {
  baseCoin: string;
  totalDelta: string;
  totalGamma: string;
  totalVega: string;
  totalTheta: string;
}

export type WSGreeksEventV5 = WSPrivateTopicEventV5<'greeks', WSGreeksV5[]>;

export interface WSSpreadOrderV5 {
  category: 'combination' | 'spot_leg' | 'future_leg';
  symbol: string;
  parentOrderId: string;
  orderId: string;
  orderLinkId: string;
  side: OrderSideV5;
  orderStatus: OrderStatusV5;
  cancelType: OrderCancelTypeV5;
  rejectReason: OrderRejectReasonV5;
  timeInForce: OrderTimeInForceV5;
  price: string;
  qty: string;
  avgPrice: string;
  leavesQty: string;
  leavesValue: string;
  cumExecQty: string;
  cumExecValue: string;
  cumExecFee: string;
  orderType: OrderTypeV5;
  isLeverage: string;
  createdTime: string;
  updatedTime: string;
  feeCurrency: string;
  createType: OrderCreateTypeV5;
  closedPnl: string;
}

export type WSSpreadOrderEventV5 = WSPrivateTopicEventV5<
  'spread.order',
  WSSpreadOrderV5[]
>;

export interface WSSpreadExecutionV5 {
  category: 'combination' | 'spot_leg' | 'future_leg';
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
  execFee: string;
  execFeeV2: string;
  feeCurrency: string;
  parentExecId: string;
  execId: string;
  execPrice: string;
  execQty: string;
  execPnl: string;
  execType: ExecTypeV5;
  execValue: string;
  execTime: string;
  isMaker: boolean;
  feeRate: string;
  markPrice: string;
  closedSize: string;
  seq: number;
}

export type WSSpreadExecutionEventV5 = WSPrivateTopicEventV5<
  'spread.execution',
  WSSpreadExecutionV5[]
>;

export interface WSInsuranceV5 {
  coin: string;
  symbols: string;
  balance: string;
  updateTime: string;
}

export type WSInsuranceEventV5 = WSPublicTopicEventV5<
  'insurance.USDT' | 'insurance.USDC' | 'insurance.inverse',
  'snapshot' | 'delta',
  WSInsuranceV5[]
>;

export interface WSPriceLimitV5 {
  symbol: string;
  buyLmt: string;
  sellLmt: string;
}

export type WSPriceLimitEventV5 = WSPublicTopicEventV5<
  string,
  'snapshot',
  WSPriceLimitV5
>;
