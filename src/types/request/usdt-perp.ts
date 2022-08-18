import { LinearPositionIdx } from '../../constants/enum';
import { OrderSide } from '../shared';

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
