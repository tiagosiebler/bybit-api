export const API_ERROR_CODE = {
  ORDER_NOT_FOUND_OR_TOO_LATE: 20001,
  CANNOT_SET_TRADING_STOP_FOR_ZERO_POS: 30024,
  /** Seen when placing an order */
  INSUFFICIENT_BALANCE_FOR_ORDER_COST: 30031,
  /** Seen if a conditional order is too large */
  INSUFFICIENT_BALANCE: 30042,
  /** E.g. trying to change position margin while on cross */
  POSITION_IS_CROSS_MARGIN: 30056,
  RISK_LIMIT_NOT_EXISTS: 30090,
  SAME_SLTP_MODE: 37002,
} as const;
