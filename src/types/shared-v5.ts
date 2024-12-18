export type CategoryV5 = 'spot' | 'linear' | 'inverse' | 'option';
export type ContractTypeV5 =
  | 'InversePerpetual'
  | 'LinearPerpetual'
  | 'InverseFutures';
export type CopyTradingV5 = 'none' | 'both' | 'utaOnly' | 'normalOnly';

export type InstrumentStatusV5 =
  | 'PreLaunch'
  | 'Trading'
  | 'Settling'
  | 'Delivering'
  | 'Closed';

export type MarginTradingV5 = 'none' | 'both' | 'utaOnly' | 'normalSpotOnly';

export type OrderFilterV5 = 'Order' | 'tpslOrder' | 'StopOrder';
export type OrderSideV5 = 'Buy' | 'Sell';
export type OrderTypeV5 = 'Market' | 'Limit';
export type OrderTimeInForceV5 = 'GTC' | 'IOC' | 'FOK' | 'PostOnly';
export type OrderTriggerByV5 = 'LastPrice' | 'IndexPrice' | 'MarkPrice';
export type OCOTriggerTypeV5 =
  | 'OcoTriggerByUnknown'
  | 'OcoTriggerTp'
  | 'OcoTriggerBySl';

export type OrderSMPTypeV5 =
  | 'None'
  | 'CancelMaker'
  | 'CancelTaker'
  | 'CancelBoth';

export type OrderStatusV5 =
  | 'Created'
  | 'New'
  | 'Rejected'
  | 'PartiallyFilled'
  | 'PartiallyFilledCanceled'
  | 'Filled'
  | 'Cancelled'
  | 'Untriggered'
  | 'Triggered'
  | 'Deactivated'
  | 'Active';

/**
 * Defines the types of order creation mechanisms.
 */
export type OrderCreateTypeV5 =
  /** Represents an order created by a user. */
  | 'CreateByUser'
  /** Represents an order created by an admin closing. */
  | 'CreateByAdminClosing'
  /** Futures conditional order. */
  | 'CreateByStopOrder'
  /** Futures take profit order. */
  | 'CreateByTakeProfit'
  /** Futures partial take profit order. */
  | 'CreateByPartialTakeProfit'
  /** Futures stop loss order. */
  | 'CreateByStopLoss'
  /** Futures partial stop loss order. */
  | 'CreateByPartialStopLoss'
  /** Futures trailing stop order. */
  | 'CreateByTrailingStop'
  /** Laddered liquidation to reduce the required maintenance margin. */
  | 'CreateByLiq'
  /**
   * If the position is still subject to liquidation (i.e., does not meet the required maintenance margin level),
   * the position shall be taken over by the liquidation engine and closed at the bankruptcy price.
   */
  | 'CreateByTakeOver_PassThrough'
  /** Auto-Deleveraging(ADL) */
  | 'CreateByAdl_PassThrough'
  /** Order placed via Paradigm. */
  | 'CreateByBlock_PassThrough'
  /** Order created by move position. */
  | 'CreateByBlockTradeMovePosition_PassThrough'
  /** The close order placed via web or app position area - web/app. */
  | 'CreateByClosing'
  /** Order created via grid bot - web/app. */
  | 'CreateByFGridBot'
  /** Order closed via grid bot - web/app. */
  | 'CloseByFGridBot'
  /** Order created by TWAP - web/app. */
  | 'CreateByTWAP'
  /** Order created by TV webhook - web/app. */
  | 'CreateByTVSignal'
  /** Order created by Mm rate close function - web/app. */
  | 'CreateByMmRateClose'
  /** Order created by Martingale bot - web/app. */
  | 'CreateByMartingaleBot'
  /** Order closed by Martingale bot - web/app. */
  | 'CloseByMartingaleBot'
  /** Order created by Ice berg strategy - web/app. */
  | 'CreateByIceBerg'
  /** Order created by arbitrage - web/app. */
  | 'CreateByArbitrage'
  /** Option dynamic delta hedge order - web/app */
  | 'CreateByDdh';

export type OrderCancelTypeV5 =
  | 'CancelByUser'
  | 'CancelByReduceOnly'
  | 'CancelByPrepareLiq'
  | 'CancelAllBeforeLiq'
  | 'CancelByPrepareAdl'
  | 'CancelAllBeforeAdl'
  | 'CancelByAdmin'
  | 'CancelByTpSlTsClear'
  | 'CancelByPzSideCh'
  | 'UNKNOWN';

export type OrderRejectReasonV5 =
  | 'EC_NoError'
  | 'EC_Others'
  | 'EC_UnknownMessageType'
  | 'EC_MissingClOrdID'
  | 'EC_MissingOrigClOrdID'
  | 'EC_ClOrdIDOrigClOrdIDAreTheSame'
  | 'EC_DuplicatedClOrdID'
  | 'EC_OrigClOrdIDDoesNotExist'
  | 'EC_TooLateToCancel'
  | 'EC_UnknownOrderType'
  | 'EC_UnknownSide'
  | 'EC_UnknownTimeInForce'
  | 'EC_WronglyRouted'
  | 'EC_MarketOrderPriceIsNotZero'
  | 'EC_LimitOrderInvalidPrice'
  | 'EC_NoEnoughQtyToFill'
  | 'EC_NoImmediateQtyToFill'
  | 'EC_PerCancelRequest'
  | 'EC_MarketOrderCannotBePostOnly'
  | 'EC_PostOnlyWillTakeLiquidity'
  | 'EC_CancelReplaceOrder'
  | 'EC_InvalidSymbolStatus';

export type StopOrderTypeV5 =
  | 'TakeProfit'
  | 'StopLoss'
  | 'TrailingStop'
  | 'Stop'
  | 'PartialTakeProfit'
  | 'PartialStopLoss'
  | 'tpslOrder';

/**
 * Position index. Used to identify positions in different position modes.
 *
 * - 0 one-way mode position
 * - 1 Buy side of hedge-mode position
 * - 2 Sell side of hedge-mode position
 */
export type PositionIdx = 0 | 1 | 2;

/**
 * Position status.
 *
 * - 'Normal'
 * - 'Liq' in the liquidation progress
 * - 'Adl' in the auto-deleverage progress
 */
export type PositionStatusV5 = 'Normal' | 'Liq' | 'Adl';
export type PositionSideV5 = 'Buy' | 'Sell' | 'None' | '';

export type OptionTypeV5 = 'Call' | 'Put';

/**
 * Trade mode.
 *
 * - 0 cross-margin,
 * - 1 isolated margin
 */
export type TradeModeV5 = 0 | 1;

export type TPSLModeV5 = 'Full' | 'Partial';
export type AccountMarginModeV5 =
  | 'ISOLATED_MARGIN'
  | 'REGULAR_MARGIN'
  | 'PORTFOLIO_MARGIN';
export type UnifiedUpdateStatusV5 = 'FAIL' | 'PROCESS' | 'SUCCESS';

export type AccountTypeV5 =
  | 'CONTRACT'
  | 'SPOT'
  | 'INVESTMENT'
  | 'OPTION'
  | 'UNIFIED'
  | 'FUND';

export type TransactionTypeV5 =
  | 'TRANSFER_IN'
  | 'TRANSFER_OUT'
  | 'TRADE'
  | 'SETTLEMENT'
  | 'DELIVERY'
  | 'LIQUIDATION'
  | 'BONUS'
  | 'FEE_REFUND'
  | 'INTEREST'
  | 'CURRENCY_BUY'
  | 'CURRENCY_SELL';

export type PermissionTypeV5 =
  | 'ContractTrade'
  | 'Spot'
  | 'Wallet'
  | 'Options'
  | 'Derivatives'
  | 'Exchange'
  | 'NFT';

/**
 * Leveraged token status:
 *
 * - '1' LT can be purchased and redeemed
 * - '2' LT can be purchased, but not redeemed
 * - '3' LT can be redeemed, but not purchased
 * - '4' LT cannot be purchased nor redeemed
 * - '5' Adjusting position
 */
export type LeverageTokenStatusV5 = '1' | '2' | '3' | '4' | '5';

/**
 * Leveraged token order type: '1': purchase, '2': redeem
 */
export type LTOrderTypeV5 = '1' | '2';

/**
 * Leveraged token order status: '1': completed, '2': in progress, '3': failed
 */
export type LTOrderStatusV5 = '1' | '2' | '3';

export type ExecTypeV5 =
  | 'Trade'
  | 'AdlTrade'
  | 'Funding'
  | 'BustTrade'
  | 'Settle'
  | 'BlockTrade'
  | 'MovePosition'
  | 'UNKNOWN';

/**
 * Withdraw type. 0(default): on chain. 1: off chain. 2: all.
 */
export type WithdrawalTypeV5 = '0' | '1' | '2';

export interface PermissionsV5 {
  ContractTrade?: string[];
  Spot?: string[];
  Wallet?: string[];
  Options?: string[];
  Derivatives?: string[];
  CopyTrading?: string[];
  BlockTrade?: string[];
  Exchange?: string[];
  NFT?: string[];
}

export interface CategoryCursorListV5<
  T extends unknown[],
  TCategory extends CategoryV5 = CategoryV5,
> {
  category: TCategory;
  list: T;
  nextPageCursor?: string;
}

/**
 * Next page cursor does not exist for spot!
 */
export interface CursorListV5<T extends unknown[]> {
  nextPageCursor: string;
  list: T;
}

/**
 * A wrapper type for any responses that have a "nextPageCursor" property, and a "rows" property with an array of elements
 *
 * ```{ nextPageCursor: "something", rows: someData[] }```
 */
export interface CursorRowsV5<T extends unknown[]> {
  nextPageCursor: string;
  rows: T;
}

export interface CategoryListV5<
  T extends unknown[],
  TCategory extends CategoryV5,
> {
  category: TCategory;
  list: T;
}

export interface CategorySymbolListV5<
  T extends unknown[],
  TCategory extends CategoryV5,
> {
  category: TCategory;
  symbol: string;
  list: T;
}
