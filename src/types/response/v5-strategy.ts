import {
  OrderSideV5,
  PositionIdx,
  PovModeV5,
  StrategyCategoryV5,
  StrategyPreferV5,
  StrategyTypeV5,
} from '../shared-v5';

export interface CreateStrategyOrderResultV5 {
  strategyId: string;
  /** null when creation succeeded */
  result: string | null;
}

export interface StopStrategyResultV5 {
  strategyId: string;
}

export interface StrategyListItemV5 {
  strategyId: string;
  category: StrategyCategoryV5;
  symbol: string;
  side: OrderSideV5;
  size: string;
  strategyType: StrategyTypeV5;
  /** 2: running, 3: terminated, 4: terminated unfilled, 5: paused, 6: untriggered */
  status: 2 | 3 | 4 | 5 | 6;
  executedSize: string;
  executedAvgPrice: string;
  executedStartTimeE3: string;
  executedEndTimeE3: string;
  createdTimeE3: string;
  updatedTimeE3: string;
  reduceOnly: boolean;
  triggerPrice: string;
  isTriggered: boolean;
  leverageType: 0 | 1;
  terminateType: number;
  terminateRemark: string;
  triggerCount: string;
  tradingCount: string;
  realizedPnl: string;
  strategyName: string;
  strategyPrefer: StrategyPreferV5 | string;
  duration: number;
  executedDuration: number;
  isRandom: boolean;
  interval: number;
  limitPrice: string;
  chasePercentE4: string;
  chaseDistance: string;
  maxChasePrice: string;
  chaseOrderPrice: string;
  chasePrice: string;
  postOnly: number;
  isRebalance: boolean;
  orderType: string;
  orderPriceOffset: string;
  strategySl: string;
  strategyTp: string;
  arbitrageOrders: unknown[];
  positionValue: string;
  filledPositionValue: string;
  /** POV only */
  mode?: PovModeV5 | string;
  participationRate?: string;
  referenceWindow?: string;
  depthReference?: string;
}

export interface StrategyListResultV5 {
  list: StrategyListItemV5[];
  nextCursor: string;
  prevCursor: string;
}

export interface StrategyOrderListItemV5 {
  strategyId: string;
  orderId: string;
  symbol: string;
  side: OrderSideV5;
  size: string;
  price: string;
  /** 2: created, 3: create failed, 4: partially filled, 5: fully filled, 6: rejected, 7: canceled */
  status: string;
  executedSize: string;
  dealTimeE3: string;
  parentOrderId: string;
  createdTimeE3: string;
  updatedTimeE3: string;
  code: number;
  msg: string;
  category: StrategyCategoryV5;
  positionIdx: PositionIdx;
  leverageType: 0 | 1;
  tpPrice: string;
  slPrice: string;
  orderType: string;
  orderPriceOffset: string;
  positionValue: string;
  filledPositionValue: string;
}

export interface StrategyOrderListResultV5 {
  list: StrategyOrderListItemV5[];
  nextCursor: string;
  prevCursor: string;
}
