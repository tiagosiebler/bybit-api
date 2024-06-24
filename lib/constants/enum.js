"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinearPositionIdx = exports.API_ERROR_CODE = exports.positionTpSlModeEnum = exports.linearPositionModeEnum = void 0;
exports.linearPositionModeEnum = {
    OneWayMode: 'MergedSingle',
    HedgeMode: 'BothSide',
};
exports.positionTpSlModeEnum = {
    /** Full take profit/stop loss mode (a single TP order and a single SL order can be placed, covering the entire position) */
    Full: 'Full',
    /** Partial take profit/stop loss mode (multiple TP and SL orders can be placed, covering portions of the position) */
    Partial: 'Partial',
};
exports.API_ERROR_CODE = {
    BALANCE_INSUFFICIENT_SPOT: -1131,
    ORDER_NOT_FOUND_OR_TOO_LATE_SPOT: -2013,
    SUCCESS: 0,
    /** This could mean bad request, incorrect value types or even incorrect/missing values */
    PARAMS_MISSING_OR_WRONG: 10001,
    INVALID_API_KEY_OR_PERMISSIONS: 10003,
    SIGNATURE_NOT_VALID: 10004,
    INCORRECT_API_KEY_PERMISSIONS: 10005,
    /** API key requires specific whitelisted IPs, and this IP was not in the list */
    INCORRECT_API_REQUEST_IP: 10010,
    DB_ERROR_WRONG_CURSOR: 10016,
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
    CROSS_MARGIN_NOT_ENABLED: 12640,
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
    SUB_USER_ALREADY_EXISTS: 31005,
    LEVERAGE_NOT_MODIFIED: 34036,
    SAME_SLTP_MODE: 37002,
    COPY_TRADE_NOT_OPEN_ORDER: 39426,
    V5_ORDER_NOT_FOUND: 110001,
    V5_INSUFFICIENT_BALANCE: 110007,
    V5_API_KEY_PERMISSION_DENIED: 10005,
    V5_CROSS_ISOLATED_MARGIN_NOT_CHANGED: 110026,
    V5_LEVERAGE_NOT_CHANGED: 110043,
    V5_MARGIN_MODE_NOT_CHANGED: 110073,
    V5_TPSL_NOT_CHANGED: 10001,
    V5_RISK_ID_NOT_CHANGED: 10001,
    V5_AUTO_ADD_MARGIN_NOT_CHANGED: 10001,
    V5_TPSL_ERROR_NO_POSITION: 10001,
    V5_RISK_ID_NOT_MODIFIED: 110075,
    QTY_EXCEEDS_MAX_LIMIT: 130006,
    ORDER_NOT_FOUND_OR_TOO_LATE_LINEAR: 130010,
    ORDER_COST_NOT_AVAILABLE: 130021,
    CANNOT_SET_LINEAR_TRADING_STOP_FOR_ZERO_POS: 130024,
    ISOLATED_NOT_MODIFIED_LINEAR: 130056,
    POSITION_SIZE_IS_ZERO: 130057,
    AUTO_ADD_MARGIN_NOT_MODIFIED: 130060,
    INSUFFICIENT_BALANCE_FOR_ORDER_COST_LINEAR: 130080,
    SAME_SLTP_MODE_LINEAR: 130150,
    NOT_SUPPORTED_FOR_SUBACCOUNTS: 131003,
    TRANSFER_ID_EXISTS: 131214,
    RISK_ID_NOT_MODIFIED: 134026,
    CONTRACT_ORDER_NOT_EXISTS: 140001,
    CONTRACT_INSUFFICIENT_BALANCE: 140007,
    CONTRACT_POSITION_MODE_NOT_MODIFIED: 140025,
    CONTRACT_MARGIN_MODE_NOT_MODIFIED: 140026,
    CONTRACT_RISK_LIMIT_INFO_NOT_EXISTS: 140031,
    CONTRACT_SET_LEVERAGE_NOT_MODIFIED: 140043,
    SUB_USER_NOT_FOUND: 141009,
    SPOT_LEVERAGE_TOKEN_INSUFFICIENT_BALANCE: 175006,
    SPOT_LEVERAGE_TOKEN_ORDER_NOT_FOUND: 175007,
    SPOT_LEVERAGE_QUIZ_REQUIRED: 175010,
    SPOT_MARGIN_NOT_ENABLED: 176008,
    SPOT_MARGIN_QUESTIONNAIRE_NOT_SUBMIT: 176037,
    /** E.g. USDC Options trading, trying to access a symbol that is no longer active */
    CONTRACT_NAME_NOT_EXIST: 3100111,
    ORDER_NOT_EXIST: 3100136,
    NO_ACTIVE_ORDER: 3100205,
    /** E.g. USDC Options trading when the account hasn't been opened for USDC Options yet */
    ACCOUNT_NOT_EXIST: 3200200,
    INCORRECT_PRIVATE_OPERATIONS: 3303001,
    SET_MARGIN_MODE_FAILED_USDC: 3400045,
    INCORRECT_MMP_PARAMETERS: 3500712,
    INSTITION_MMP_PROFILE_NOT_FOUND: 3500713,
};
/**
 * Position idx, used to identify positions in different position modes.
 * Required if you are under One-Way Mode:
 */
var LinearPositionIdx;
(function (LinearPositionIdx) {
    LinearPositionIdx[LinearPositionIdx["OneWayMode"] = 0] = "OneWayMode";
    LinearPositionIdx[LinearPositionIdx["BuySide"] = 1] = "BuySide";
    LinearPositionIdx[LinearPositionIdx["SellSide"] = 2] = "SellSide";
})(LinearPositionIdx || (exports.LinearPositionIdx = LinearPositionIdx = {}));
//# sourceMappingURL=enum.js.map