export interface InverseOrderRequest {
    side: string;
    symbol: string;
    order_type: string;
    qty: number;
    price?: number;
    time_in_force: string;
    take_profit?: number;
    stop_loss?: number;
    reduce_only?: boolean;
    tp_trigger_by?: 'LastPrice' | 'MarkPrice' | 'IndexPrice';
    sl_trigger_by?: 'LastPrice' | 'MarkPrice' | 'IndexPrice';
    close_on_trigger?: boolean;
    order_link_id?: string;
}
export interface InverseActiveOrdersRequest {
    symbol: string;
    order_status?: string;
    direction?: string;
    limit?: number;
    cursor?: string;
}
export interface InverseCancelOrderRequest {
    symbol: string;
    order_id?: string;
    order_link_id?: string;
}
export interface InverseReplaceOrderRequest {
    order_id?: string;
    order_link_id?: string;
    symbol: string;
    p_r_qty?: number;
    p_r_price?: string;
    take_profit?: number;
    stop_loss?: number;
    tp_trigger_by?: string;
    sl_trigger_by?: string;
}
export interface InverseGetOrderRequest {
    order_id?: string;
    order_link_id?: string;
    symbol: string;
}
export interface InverseConditionalOrderRequest {
    side: string;
    symbol: string;
    order_type: string;
    qty: string;
    price?: string;
    base_price: string;
    stop_px: string;
    time_in_force: string;
    trigger_by?: string;
    close_on_trigger?: boolean;
    order_link_id?: string;
}
export interface InverseActiveConditionalOrderRequest {
    symbol: string;
    stop_order_status?: string;
    direction?: string;
    limit?: number;
    cursor?: string;
}
export interface InverseCancelConditionalOrderRequest {
    symbol: string;
    stop_order_id?: string;
    order_link_id?: string;
}
export interface InverseReplaceConditionalOrderRequest {
    stop_order_id?: string;
    order_link_id?: string;
    symbol: string;
    p_r_qty?: number;
    p_r_price?: string;
    p_r_trigger_price?: string;
}
export interface InverseChangePositionMarginRequest {
    symbol: string;
    margin: string;
}
export interface InverseSetTradingStopRequest {
    symbol: string;
    take_profit?: number;
    stop_loss?: number;
    trailing_stop?: number;
    tp_trigger_by?: string;
    sl_trigger_by?: string;
    new_trailing_active?: number;
}
export interface InverseSetLeverageRequest {
    symbol: string;
    leverage: number;
    leverage_only?: boolean;
}
export interface InverseGetTradeRecordsRequest {
    order_id?: string;
    symbol: string;
    start_time?: number;
    page?: number;
    limit?: number;
    order?: string;
}
export interface InverseGetClosedPnlRequest {
    symbol: string;
    start_time?: number;
    end_time?: number;
    exec_type?: string;
    page?: number;
    limit?: number;
}
export interface InverseSetSlTpPositionModeRequest {
    symbol: string;
    tp_sl_mode: 'Full' | 'Partial';
}
export interface InverseSetMarginTypeRequest {
    symbol: string;
    is_isolated: boolean;
    buy_leverage: number;
    sell_leverage: number;
}
