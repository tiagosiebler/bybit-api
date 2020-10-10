export class RestClient {
  constructor(key: string, secret: string, livenet?: boolean, options?: RestClientOptions);

  placeActiveOrder(params: PlaceActiveOrderRequest): Promise<OrderResponse>;
  getActiveOrder(params: GetActiveOrderRequest): Promise<GetActiveOrderResponse>;
  cancelActiveOrder(params: CancelActiveOrderRequest): Promise<ActiveOrder>;
  cancelAllActiveOrders(params: CancelAllActiveOrdersRequest): Promise<CancelAllActiveOrdersResponse>;
  replaceActiveOrder(params: ReplaceActiveOrderRequest): Promise<ReplaceActiveOrderResponse>;
  queryActiveOrder(params: QueryActiveOrderRequest): Promise<QueryActiveOrderResponse>;
  getPublicTradingRecords(params: GetPublicTradingRecordsRequest): Promise<GetPublicTradingRecordsResponse>;
  getWalletBalance(params: GetWalletBalanceRequest): Promise<GetWalletBalanceResponse>;
}

export interface RestClientOptions {
  recv_window?: number;
  sync_interval_ms?: number;
}

export interface PublicResponse {
  ret_code: number;
  ret_msg: string;
  ext_code: string;
  ext_info: string;
  time_now: number;
}

export interface PrivateResponse extends PublicResponse {
  rate_limit_status: number;
  rate_limit_reset_ms: number;
  rate_limit: number;
}

export interface OrderResponse extends PrivateResponse {
  result: ActiveOrder;
}

export interface PlaceOrderRequest {
  side: Side;
  symbol: Symbol;
  order_type: OrderType;
  qty: number;
  price?: number;
  time_in_force: TimeInForce;
  close_on_trigger?: boolean;
  order_link_id?: string;
}

export interface PlaceActiveOrderRequest extends PlaceOrderRequest {
  take_profit?: number;
  stop_loss?: number;
  reduce_only?: boolean;
}

export interface GetActiveOrderRequest {
  order_id?: string;
  order_link_id?: string;
  symbol?: Symbol;
  order: Order
  page: number;
  limit: number;
  order_status: OrderStatus;
}

export interface GetActiveOrderResponse extends PrivateResponse {
  result: {
    current_page: number;
    last_page: number;
    data: OrderResponse & {
      ext_fields: {
        close_on_trigger: boolean;
        orig_order_type: string;
        prior_x_req_price: number;
        op_from: string;
        remark: string;
        o_req_num: number;
        xreq_type: string;
      }
    }[];
  }
}

export interface CancelActiveOrderRequest {
  symbol: Symbol;
  order_id?: string;
  order_link_id?: string;
}

export interface CancelAllActiveOrdersRequest {
  symbol: Symbol;
}

export interface CancelAllActiveOrdersResponse extends PrivateResponse {
  result: Pick<ActiveOrder,
    "user_id" |
    "symbol" |
    "side" |
    "order_type" |
    "qty" |
    "time_in_force" |
    "order_status" |
    "leaves_qty" |
    "leaves_value" |
    "created_at" |
    "updated_at"
    > & {
    price: string
    create_type: CreateType;
    cancel_type: CancelType;
    clOrdID: string;
    cross_status: string;
    cross_seq: number;
  }[] | null;
}

export interface ReplaceActiveOrderRequest {
  order_id?: string;
  order_link_id?: string;
  symbol: Symbol;
  p_r_qty?: number;
  p_r_price?: number;
}

export interface ReplaceActiveOrderResponse extends PrivateResponse {
  result: {
    order_id: string;
  }
}

export interface QueryActiveOrderRequest {
  order_id?: string;
  order_link_id: string;
  symbol: Symbol;
}

export interface QueryActiveOrderResponse extends PrivateResponse {
  result: ActiveOrder & {
    extFields: {};
  }
}

export interface BaseOrder {
  user_id: number;
  symbol: Symbol;
  side: Side;
  order_type: OrderType;
  price: number;
  qty: number;
  time_in_force: TimeInForce;
  order_status: OrderStatus;
  last_exec_time: number;
  last_exec_price: number;
  leaves_qty: number;
  leaves_value: string;
  cum_exec_qty: number;
  cum_exec_value: number;
  cum_exec_fee: number;
  reject_reason: string;
  order_link_id: string;
  created_at: string;
  updated_at: string;
}

export interface ActiveOrder extends BaseOrder {
  order_id: string;
}

export interface ConditionalOrder extends BaseOrder {

}

export interface GetPublicTradingRecordsRequest {
  symbol: string;
  from?: number;
  limit?: number;
}

export interface GetPublicTradingRecordsResponse extends PublicResponse {
  result: {
    id: number;
    symbol: Symbol;
    price: number;
    qty: number;
    side: Side;
    time: string;
  }[];
}

export interface GetWalletBalanceRequest {
  coin: Currency;
}

export interface GetWalletBalanceResponse  extends PrivateResponse {
  result: Record<Currency, WalletBalanceResult>;
}

export interface WalletBalanceResult {
  equity: number;
  available_balance: number;
  used_margin: number;
  order_margin: number;
  position_margin: number;
  occ_closing_fee: number;
  occ_funding_fee: number;
  wallet_balance: number;
  realised_pnl: number;
  unrealised_pnl: number;
  cum_realised_pnl: number;
  given_cash: number;
  service_cash: number;
}
export type Side =
  "Buy" |
  "Sell";

export type Symbol =
  "BTCUSD" |
  "ETHUSD" |
  "EOSUSD" |
  "XRPUSD";

export type Currency =
  "BTC" |
  "ETH" |
  "EOS" |
  "XRP" |
  "USDT";

export type WalletFundType =
  "Deposit" |
  "Withdraw" |
  "RealisedPNL" |
  "Commission" |
  "Refund" |
  "Prize" |
  "ExchangeOrderWithdraw" |
  "ExchangeOrderDeposit";

export type WithdrawStatus =
  "ToBeConfirmed" |
  "UnderReview" |
  "Pending - Pending transfer" |
  "Success" |
  "CancelByUser" |
  "Reject" |
  "Expire";

export type OrderType =
  "Market" |
  "Limit";

export type TimeInForce =
  "GoodTillCancel" |
  "ImmediateOrCancel" |
  "FillOrKill" |
  "PostOnly";

export type TriggerPriceType =
  "LastPrice" |
  "IndexPrice" |
  "MarkPrice";

export type Order =
  "desc" |
  "asc";

export type OrderStatus =
  "Created" | // order accepted by the system but not yet put through matching engine
  "Rejected" |
  "New" | // order has placed successfully
  "PartiallyFilled" |
  "Filled" |
  "Cancelled" |
  "PendingCancel";

export type StopOrderStatus =
  "Active" | // - order is triggered and placed successfully
  "Untriggered" | // order waits to be triggered
  "Triggered" | // order is triggered
  "Cancelled" | // order is cancelled
  "Rejected" | // order is triggered but failed to be placed (for example, due to insufficient margin)
  "Deactivated"; // order was cancelled by user before triggering

export type CancelType =
  "CancelByUser" |
  "CancelByReduceOnly" |
  "CancelByPrepareLiq" | // - Cancelled by force liquidation
  "CancelAllBeforeLiq" | // - Cancelled by force liquidation
  "CancelByPrepareAdl" | // - Cancelled by ADL
  "CancelAllBeforeAdl" | // - Cancelled by ADL
  "CancelByAdmin" |
  "CancelByTpSlTsClear" | // - This is a cancelled TP/SL/TS order
  "CancelByPzSideCh"; // - This order is cancelled after TP/SL/TS

export type CreateType =
  "CreateByUser" |
  "CreateByAdminClosing" |
  "CreateByStopOrder" |
  "CreateByTakeProfit" |
  "CreateByStopLoss" |
  "CreateByTrailingStop" |
  "CreateByAdl_PassThrough" | // Created by ADL
  "CreateByTakeOver_PassThrough"; // Created by liquidation takeover

export type ExecType =
  "Trade" |
  "AdlTrade" |
  "Funding" |
  "BustTrade";

export type LiquidityType =
  "AddedLiquidity" | // Maker liquidity
  "RemovedLiquidity"; // Taker Liquidity

export type TickDirection =
  "PlusTick" | // - Rise in price
  "ZeroPlusTick" | // - Rise in price compared to last trade of different price
  "MinusTick" | // - Drop in price
  "ZeroMinusTick"; // - Drop in price compared to last trade of different price
