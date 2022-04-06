export const linearPositionModeEnum = {
  OneWayMode: 'MergedSingle',
  HedgeMode: 'BothSide',
} as const;

export const positionTpSlModeEnum = {
  /** Full take profit/stop loss mode (a single TP order and a single SL order can be placed, covering the entire position) */
  Full: 'Full',
  /** Partial take profit/stop loss mode (multiple TP and SL orders can be placed, covering portions of the position) */
  Partial: 'Partial',
} as const;
