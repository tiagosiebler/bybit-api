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

export const API_ERROR_CODE = {
  BALANCE_INSUFFICIENT_SPOT: -1131,
  ORDER_NOT_FOUND_OR_TOO_LATE_SPOT: -2013,
  SUCCESS: 0,
  /** This could mean bad request, incorrect value types or even incorrect/missing values */
  PARAMS_MISSING_OR_WRONG: 10001,
  INVALID_API_KEY_OR_PERMISSIONS: 10003,
  SIGNATURE_NOT_VALID: 10004,
  INCORRECT_API_KEY_PERMISSIONS: 10005,
  INCORRECT_PRIVATE_OPERATIONS: 3303001,
  /** Account not unified margin, update required */
  ACCOUNT_NOT_UNIFIED: 10020,
  UNKNOWN_ERROR: 12000,
  BALANCE_INSUFFICIENT_SPOT_V3: 12131,
  ORDER_NOT_FOUND_SPOT_V3: 12213,
  ORDER_NOT_FOUND_LEVERAGED_TOKEN: 12407,
  EXCEEDED_UPPER_LIMIT_LEVERAGED_TOKEN: 12409,
  QUERY_ACCOUNT_INFO_ERROR: 12602,
  CROSS_MARGIN_USER_NOT_FOUND: 12607,
  CROSS_MARGIN_REPAYMENT_NOT_REQUIRED: 12616,
  ORDER_NOT_FOUND_OR_TOO_LATE: 20001,
  POSITION_STATUS_NOT_NORMAL: 30013,
  CANNOT_SET_TRADING_STOP_FOR_ZERO_POS: 30024,
  /** Seen when placing an order */
  INSUFFICIENT_BALANCE_FOR_ORDER_COST: 30031,
  POSITION_IDX_NOT_MATCH_POSITION_MODE: 30041,
  /** Seen if a conditional order is too large */
  INSUFFICIENT_BALANCE: 30042,
  /** E.g. trying to change position margin while on cross */
  POSITION_IS_CROSS_MARGIN: 30056,
  POSITION_MODE_NOT_MODIFIED: 30083,
  ISOLATED_NOT_MODIFIED: 30084,
  RISK_LIMIT_NOT_EXISTS: 30090,
  LEVERAGE_NOT_MODIFIED: 34036,
  SAME_SLTP_MODE: 37002,
  ORDER_NOT_FOUND_OR_TOO_LATE_LINEAR: 130010,
  ORDER_COST_NOT_AVAILABLE: 130021,
  CANNOT_SET_LINEAR_TRADING_STOP_FOR_ZERO_POS: 130024,
  ISOLATED_NOT_MODIFIED_LINEAR: 130056,
  POSITION_SIZE_IS_ZERO: 130057,
  AUTO_ADD_MARGIN_NOT_MODIFIED: 130060,
  INSUFFICIENT_BALANCE_FOR_ORDER_COST_LINEAR: 130080,
  SAME_SLTP_MODE_LINEAR: 130150,
  RISK_ID_NOT_MODIFIED: 134026,
  /** E.g. USDC Options trading, trying to access a symbol that is no longer active */
  CONTRACT_NAME_NOT_EXIST: 3100111,
  ORDER_NOT_EXIST: 3100136,
  NO_ACTIVE_ORDER: 3100205,
  /** E.g. USDC Options trading when the account hasn't been opened for USDC Options yet */
  ACCOUNT_NOT_EXIST: 3200200,
  INCORRECT_MMP_PARAMETERS: 3500712,
  INSTITION_MMP_PROFILE_NOT_FOUND: 3500713,
} as const;

/**
 * Position idx, used to identify positions in different position modes.
 * Required if you are under One-Way Mode:
 */
export enum LinearPositionIdx {
  OneWayMode = 0,
  BuySide = 1,
  SellSide = 2,
}
