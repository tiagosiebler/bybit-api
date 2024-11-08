import {
  LinearPositionIdx,
  linearPositionModeEnum,
  positionTpSlModeEnum,
} from '../../constants/enum';
import { OrderSide } from '../shared';

export interface LinearGetOrdersRequest {
  order_id?: string;
  order_link_id?: string;
  symbol: string;
  order?: string;
  page?: number;
  limit?: number;
  order_status?: string;
}

export interface LinearCancelOrderRequest {
  symbol: string;
  order_id?: string;
  order_link_id?: string;
}

export interface LinearReplaceOrderRequest {
  order_id?: string;
  order_link_id?: string;
  symbol: string;
  p_r_qty?: number;
  p_r_price?: number;
  take_profit?: number;
  stop_loss?: number;
  tp_trigger_by?: string;
  sl_trigger_by?: string;
}

export interface LinearGetOrderRequest {
  order_id?: string;
  order_link_id?: string;
  symbol: string;
}

export type LinearOrderType = 'Limit' | 'Market';

export type LinearTimeInForce =
  | 'GoodTillCancel'
  | 'ImmediateOrCancel'
  | 'FillOrKill'
  | 'PostOnly';

export interface NewLinearOrder {
  side: OrderSide;
  symbol: string;
  order_type: LinearOrderType;
  qty: number;
  price?: number;
  time_in_force: LinearTimeInForce;
  take_profit?: number;
  stop_loss?: number;
  tp_trigger_by?: string;
  sl_trigger_by?: string;
  reduce_only: boolean;
  close_on_trigger: boolean;
  order_link_id?: string;
  position_idx?: LinearPositionIdx;
}

export interface LinearConditionalOrderRequest {
  side: string;
  symbol: string;
  order_type: string;
  qty: number;
  price?: number;
  base_price: number;
  stop_px: number;
  time_in_force: string;
  trigger_by?: string;
  close_on_trigger?: boolean;
  order_link_id?: string;
  reduce_only: boolean;
  take_profit?: number;
  stop_loss?: number;
  tp_trigger_by?: string;
  sl_trigger_by?: string;
}

export interface LinearGetConditionalOrderRequest {
  stop_order_id?: string;
  order_link_id?: string;
  symbol: string;
  stop_order_status?: string;
  order?: string;
  page?: number;
  limit?: number;
}

export interface LinearCancelConditionalOrderRequest {
  symbol: string;
  stop_order_id?: string;
  order_link_id?: string;
}

export interface LinearReplaceConditionalOrderRequest {
  stop_order_id?: string;
  order_link_id?: string;
  symbol: string;
  p_r_qty?: number;
  p_r_price?: number;
  p_r_trigger_price?: number;
  take_profit?: number;
  stop_loss?: number;
  tp_trigger_by?: string;
  sl_trigger_by?: string;
}

export interface LinearQueryConditionalOrderRequest {
  symbol: string;
  stop_order_id?: string;
  order_link_id?: string;
}

export interface LinearSetAutoAddMarginRequest {
  symbol: string;
  side: string;
  auto_add_margin: boolean;
}

export interface LinearSetMarginSwitchRequest {
  symbol: string;
  is_isolated: boolean;
  buy_leverage: number;
  sell_leverage: number;
}

export interface LinearSetPositionModeRequest {
  symbol: string;
  mode: (typeof linearPositionModeEnum)[keyof typeof linearPositionModeEnum];
}

export interface LinearSetPositionTpSlModeRequest {
  symbol: string;
  tp_sl_mode: (typeof positionTpSlModeEnum)[keyof typeof positionTpSlModeEnum];
}

export interface LinearSetAddReduceMarginRequest {
  symbol: string;
  side: string;
  margin: number;
}

export interface LinearSetUserLeverageRequest {
  symbol: string;
  buy_leverage: number;
  sell_leverage: number;
}

export interface LinearSetTradingStopRequest {
  symbol: string;
  side: string;
  take_profit?: number;
  stop_loss?: number;
  trailing_stop?: number;
  tp_trigger_by?: string;
  sl_trigger_by?: string;
  sl_size?: number;
  tp_size?: number;
  position_idx?: 0 | 1 | 2;
}

export interface LinearGetTradeRecordsRequest {
  symbol: string;
  start_time?: number;
  end_time?: number;
  exec_type?: string;
  page?: number;
  limit?: number;
}

export interface LinearGetHistoryTradeRecordsRequest {
  symbol: string;
  start_time?: number;
  end_time?: number;
  exec_type?: string;
  page?: number;
  limit?: number;
  page_token?: string;
}

export interface LinearGetClosedPnlRequest {
  symbol: string;
  start_time?: number;
  end_time?: number;
  exec_type?: string;
  page?: number;
  limit?: number;
}

export interface LinearSetRiskLimitRequest {
  symbol: string;
  side: string;
  risk_id: number;
}
