import {
  OrderSideV5,
  PositionIdx,
  PovModeV5,
  StrategyCategoryV5,
  StrategyPreferV5,
  StrategyTypeV5,
} from '../shared-v5';

/** POST /v5/strategy/create */
export interface CreateStrategyOrderParamsV5 {
  category: StrategyCategoryV5;
  symbol: string;
  side: OrderSideV5;
  strategyType: StrategyTypeV5;
  /** Total order quantity (coin). Either size or positionValue is required */
  size?: string;
  /** Total order quantity (value). Either size or positionValue is required */
  positionValue?: string;
  reduceOnly?: boolean;
  positionIdx?: PositionIdx;
  /** Spot leverage type. 0: normal, 1: borrow to trade (UTA_SPOT only) */
  leverageType?: 0 | 1;
  /** TWAP / POV: total execution duration (seconds). Range [300, 86400]; TWAP must be divisible by interval */
  duration?: number;
  /** TWAP / POV: sub-order placement interval (seconds) */
  interval?: 5 | 10 | 15 | 30 | 60 | 120;
  /** TWAP: randomize each sub-order quantity by ±20% */
  isRandom?: boolean;
  /** Advanced: activate when market price reaches this value */
  triggerPrice?: string;
  /** Advanced: terminate when last traded price reaches this value */
  maxChasePrice?: string;
  /** Limit chase: absolute distance from best bid/ask. Mutually exclusive with chasePercentE4 */
  chaseDistance?: string;
  /** Limit chase: offset in basis points (1/10000). Mutually exclusive with chaseDistance */
  chasePercentE4?: number;
  /** Chase / Iceberg: reference price side, e.g. Bid1, Ask1 */
  chasePrice?: string;
  strategyPrefer?: StrategyPreferV5;
  limitPrice?: string;
  strategySl?: string;
  strategyTp?: string;
  /** Iceberg: 0 = taker allowed, 1 = post-only */
  postOnly?: 0 | 1;
  isRebalance?: boolean;
  /** 1: market, 2: limit */
  orderType?: 1 | 2;
  orderPriceOffset?: string;
  strategyName?: string;
  /** POV execution mode */
  mode?: PovModeV5;
  /** POV participation rate */
  participationRate?: string;
  /** POV: historical traded volume window (seconds), range [60, 14400] */
  referenceWindow?: string;
  /** POV: book depth reference levels [1, 10] */
  depthReference?: string;
}

/** GET /v5/strategy/list */
export interface GetStrategyListParamsV5 {
  strategyId?: string;
  symbol?: string;
  /** 2: running, 3: terminated, 4: terminated unfilled, 5: paused, 6: untriggered */
  status?: '2' | '3' | '4' | '5' | '6';
  category?: StrategyCategoryV5;
  strategyType?: StrategyTypeV5;
  beginTimeE0?: number;
  endTimeE0?: number;
  pageSize?: number;
  cursor?: string;
}

/** GET /v5/strategy/order-list */
export interface GetStrategyOrderListParamsV5 {
  strategyId: string;
  /** 2: created, 3: create failed, 4: partially filled, 5: fully filled, 6: rejected, 7: canceled */
  status?: '2' | '3' | '4' | '5' | '6' | '7';
  symbol?: string;
  strategyType?: StrategyTypeV5;
  beginTimeE0?: number;
  endTimeE0?: number;
  pageSize?: number;
  cursor?: string;
}

/** POST /v5/strategy/stop */
export interface StopStrategyParamsV5 {
  strategyId: string;
}
