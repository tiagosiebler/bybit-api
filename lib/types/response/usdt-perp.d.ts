export interface PerpPosition {
    user_id: number;
    symbol: string;
    side: string;
    size: number;
    position_value: number;
    entry_price: number;
    liq_price: number;
    bust_price: number;
    leverage: number;
    auto_add_margin: number;
    is_isolated: boolean;
    position_margin: number;
    occ_closing_fee: number;
    realised_pnl: number;
    cum_realised_pnl: number;
    free_qty: number;
    tp_sl_mode: string;
    unrealised_pnl: number;
    deleverage_indicator: number;
    risk_id: number;
    stop_loss: number;
    take_profit: number;
    trailing_stop: number;
    position_idx: number;
    mode: string;
}
export interface PerpPositionRoot {
    data: PerpPosition;
    is_valid: boolean;
}
export interface LinearOrder {
    order_id: string;
    user_id: number;
    symbol: string;
    side: string;
    order_type: string;
    price: number;
    qty: number;
    time_in_force: string;
    order_status: string;
    last_exec_price: number;
    cum_exec_qty: number;
    cum_exec_value: number;
    cum_exec_fee: number;
    reduce_only: boolean;
    close_on_trigger: boolean;
    order_link_id: string;
    created_time: string;
    updated_time: string;
    take_profit: number;
    stop_loss: number;
    tp_trigger_by: string;
    sl_trigger_by: string;
    position_idx: number;
}
