export declare const linearPositionModeEnum: {
    readonly OneWayMode: "MergedSingle";
    readonly HedgeMode: "BothSide";
};
export declare const positionTpSlModeEnum: {
    /** Full take profit/stop loss mode (a single TP order and a single SL order can be placed, covering the entire position) */
    readonly Full: "Full";
    /** Partial take profit/stop loss mode (multiple TP and SL orders can be placed, covering portions of the position) */
    readonly Partial: "Partial";
};
export declare const API_ERROR_CODE: {
    readonly BALANCE_INSUFFICIENT_SPOT: -1131;
    readonly ORDER_NOT_FOUND_OR_TOO_LATE_SPOT: -2013;
    readonly SUCCESS: 0;
    /** This could mean bad request, incorrect value types or even incorrect/missing values */
    readonly PARAMS_MISSING_OR_WRONG: 10001;
    readonly INVALID_API_KEY_OR_PERMISSIONS: 10003;
    readonly SIGNATURE_NOT_VALID: 10004;
    readonly INCORRECT_API_KEY_PERMISSIONS: 10005;
    /** API key requires specific whitelisted IPs, and this IP was not in the list */
    readonly INCORRECT_API_REQUEST_IP: 10010;
    readonly DB_ERROR_WRONG_CURSOR: 10016;
    /** Account not unified margin, update required */
    readonly ACCOUNT_NOT_UNIFIED: 10020;
    readonly UNKNOWN_ERROR: 12000;
    readonly BALANCE_INSUFFICIENT_SPOT_V3: 12131;
    readonly ORDER_NOT_FOUND_SPOT_V3: 12213;
    readonly ORDER_NOT_FOUND_LEVERAGED_TOKEN: 12407;
    readonly EXCEEDED_UPPER_LIMIT_LEVERAGED_TOKEN: 12409;
    readonly QUERY_ACCOUNT_INFO_ERROR: 12602;
    readonly CROSS_MARGIN_USER_NOT_FOUND: 12607;
    readonly CROSS_MARGIN_REPAYMENT_NOT_REQUIRED: 12616;
    readonly CROSS_MARGIN_NOT_ENABLED: 12640;
    readonly ORDER_NOT_FOUND_OR_TOO_LATE: 20001;
    readonly POSITION_STATUS_NOT_NORMAL: 30013;
    readonly CANNOT_SET_TRADING_STOP_FOR_ZERO_POS: 30024;
    /** Seen when placing an order */
    readonly INSUFFICIENT_BALANCE_FOR_ORDER_COST: 30031;
    readonly POSITION_IDX_NOT_MATCH_POSITION_MODE: 30041;
    /** Seen if a conditional order is too large */
    readonly INSUFFICIENT_BALANCE: 30042;
    /** E.g. trying to change position margin while on cross */
    readonly POSITION_IS_CROSS_MARGIN: 30056;
    readonly POSITION_MODE_NOT_MODIFIED: 30083;
    readonly ISOLATED_NOT_MODIFIED: 30084;
    readonly RISK_LIMIT_NOT_EXISTS: 30090;
    readonly SUB_USER_ALREADY_EXISTS: 31005;
    readonly LEVERAGE_NOT_MODIFIED: 34036;
    readonly SAME_SLTP_MODE: 37002;
    readonly COPY_TRADE_NOT_OPEN_ORDER: 39426;
    readonly V5_ORDER_NOT_FOUND: 110001;
    readonly V5_INSUFFICIENT_BALANCE: 110007;
    readonly V5_API_KEY_PERMISSION_DENIED: 10005;
    readonly V5_CROSS_ISOLATED_MARGIN_NOT_CHANGED: 110026;
    readonly V5_LEVERAGE_NOT_CHANGED: 110043;
    readonly V5_MARGIN_MODE_NOT_CHANGED: 110073;
    readonly V5_TPSL_NOT_CHANGED: 10001;
    readonly V5_RISK_ID_NOT_CHANGED: 10001;
    readonly V5_AUTO_ADD_MARGIN_NOT_CHANGED: 10001;
    readonly V5_TPSL_ERROR_NO_POSITION: 10001;
    readonly V5_RISK_ID_NOT_MODIFIED: 110075;
    readonly QTY_EXCEEDS_MAX_LIMIT: 130006;
    readonly ORDER_NOT_FOUND_OR_TOO_LATE_LINEAR: 130010;
    readonly ORDER_COST_NOT_AVAILABLE: 130021;
    readonly CANNOT_SET_LINEAR_TRADING_STOP_FOR_ZERO_POS: 130024;
    readonly ISOLATED_NOT_MODIFIED_LINEAR: 130056;
    readonly POSITION_SIZE_IS_ZERO: 130057;
    readonly AUTO_ADD_MARGIN_NOT_MODIFIED: 130060;
    readonly INSUFFICIENT_BALANCE_FOR_ORDER_COST_LINEAR: 130080;
    readonly SAME_SLTP_MODE_LINEAR: 130150;
    readonly NOT_SUPPORTED_FOR_SUBACCOUNTS: 131003;
    readonly TRANSFER_ID_EXISTS: 131214;
    readonly RISK_ID_NOT_MODIFIED: 134026;
    readonly CONTRACT_ORDER_NOT_EXISTS: 140001;
    readonly CONTRACT_INSUFFICIENT_BALANCE: 140007;
    readonly CONTRACT_POSITION_MODE_NOT_MODIFIED: 140025;
    readonly CONTRACT_MARGIN_MODE_NOT_MODIFIED: 140026;
    readonly CONTRACT_RISK_LIMIT_INFO_NOT_EXISTS: 140031;
    readonly CONTRACT_SET_LEVERAGE_NOT_MODIFIED: 140043;
    readonly SUB_USER_NOT_FOUND: 141009;
    readonly SPOT_LEVERAGE_TOKEN_INSUFFICIENT_BALANCE: 175006;
    readonly SPOT_LEVERAGE_TOKEN_ORDER_NOT_FOUND: 175007;
    readonly SPOT_LEVERAGE_QUIZ_REQUIRED: 175010;
    readonly SPOT_MARGIN_NOT_ENABLED: 176008;
    readonly SPOT_MARGIN_QUESTIONNAIRE_NOT_SUBMIT: 176037;
    /** E.g. USDC Options trading, trying to access a symbol that is no longer active */
    readonly CONTRACT_NAME_NOT_EXIST: 3100111;
    readonly ORDER_NOT_EXIST: 3100136;
    readonly NO_ACTIVE_ORDER: 3100205;
    /** E.g. USDC Options trading when the account hasn't been opened for USDC Options yet */
    readonly ACCOUNT_NOT_EXIST: 3200200;
    readonly INCORRECT_PRIVATE_OPERATIONS: 3303001;
    readonly SET_MARGIN_MODE_FAILED_USDC: 3400045;
    readonly INCORRECT_MMP_PARAMETERS: 3500712;
    readonly INSTITION_MMP_PROFILE_NOT_FOUND: 3500713;
};
/**
 * Position idx, used to identify positions in different position modes.
 * Required if you are under One-Way Mode:
 */
export declare enum LinearPositionIdx {
    OneWayMode = 0,
    BuySide = 1,
    SellSide = 2
}
