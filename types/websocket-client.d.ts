import {
  CancelType,
  CreateType,
  OrderStatus,
  OrderType,
  Side,
  Symbol,
  TickDirection,
  TimeInForce
} from "./rest-client";
import {EventEmitter} from "events";

interface ILogger {
  silly(): void;
  debug(): void;
  notice(): void;
  info(): void;
  warning(): void;
  error(): void;
}

export interface Response {
  success?: boolean;
  topic?: string;
}

export interface SubscriptionResponse extends Response{
  success: boolean;
  ret_msg: string;
  conn_id: string;
  request: Object;
}

export interface TopicResponse extends Response {
  topic: string;
  data: Object;
}

export interface TradeTopicResponse extends TopicResponse {
  data: RealtimeTrade[];
}

export interface PositionTopicResponse extends TopicResponse {
  data: Position[];
}

export interface OrderTopicResponse extends TopicResponse {
  data: Order[];
}

export interface OrderbookTopicResponse extends TopicResponse {
  type: "snapshot" | "delta";
}

export interface OrderbookSnapshotTopicResponse extends OrderbookTopicResponse {
  data: OrderbookEntry[];
}

export interface OrderbookDeltaTopicResponse extends OrderbookTopicResponse {
  data: {
    delete: Omit<OrderbookEntry, "size">[];
    update: OrderbookEntry[];
    insert: OrderbookEntry[];
  }
}

export interface OrderbookEntry {
  price: string;
  symbol: Symbol;
  id: number;
  side: Side;
  size: number;
}


export interface RealtimeTrade {
  trade_time_ms: number;
  timestamp: string;
  symbol: Symbol;
  side: Side;
  size: number;
  price: number;
  tick_direction: TickDirection;
  trade_id: string;
  cross_seq: number;
}

export interface Position {
  user_id: number;
  symbol: Symbol;
  size: number;
  side: Side;
  position_value: string;
  entry_price: string;
  liq_price: string;
  bust_price: string;
  leverage: string;
  order_margin: string;
  position_margin: string;
  available_balance: string;
  take_profit: string;
  stop_loss: string;
  realised_pnl: string;
  trailing_stop: string;
  trailing_active: string;
  wallet_balance: string;
  risk_id: number;
  occ_closing_fee: string;
  occ_funding_fee: string;
  auto_add_margin: number;
  cum_realised_pnl: string;
  position_status: string;
  position_seq: number;
}

export interface Order {
  order_id: string;
  order_link_id: string;
  symbol: Symbol;
  side: Side;
  order_type: OrderType;
  price: string;
  qty: number;
  time_in_force: TimeInForce;
  create_type: CreateType;
  cancel_type: CancelType;
  order_status: OrderStatus;
  leaves_qty: number;
  cum_exec_qty: number;
  cum_exec_value: string;
  cum_exec_fee: string;
  timestamp: string;
  take_profit: string;
  stop_loss: string;
  trailing_stop: string;
  last_exec_price: string;
}

export class WebsocketClient extends EventEmitter {
  constructor(options: WebsocketClientOptions, logger?: ILogger);

  subscribe(topics: string | string[]): void;
  unsubscribe(topics: string | string[]): void;
  close(): void;
  on(event: EventName, callback: (message: Object) => void): this;
}

interface WebsocketClientOptions {
  key: string;
  secret: string;
  livenet?: boolean;
  pingInterval?: number;
  pongTimeout?: number;
  reconnectTimeout?: number;
}

type EventName = "open" | "reconnected" | "update" | "response" | "close" | "reconnect" | "error";
