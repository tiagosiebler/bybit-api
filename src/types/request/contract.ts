import { OrderSide } from '../shared';
import { UMOrderType } from './unified-margin';
import { USDCOrderFilter, USDCTimeInForce } from './usdc-shared';

export interface ContractOrderRequest {
  symbol: string;
  side: OrderSide;
  positionIdx?: '0' | '1' | '2';
  orderType: UMOrderType;
  qty: string;
  price?: string;
  triggerDirection?: '1' | '2';
  triggerPrice?: string;
  triggerBy?: string;
  tpTriggerBy?: string;
  slTriggerBy?: string;
  timeInForce: USDCTimeInForce;
  orderLinkId?: string;
  takeProfit?: number;
  stopLoss?: number;
  reduceOnly?: boolean;
  closeOnTrigger?: boolean;
}

export interface ContractHistoricOrdersRequest {
  orderId?: string;
  orderLinkId?: string;
  symbol: string;
  orderStatus?: string;
  orderFilter?: USDCOrderFilter;
  limit?: number;
  cursor?: string;
}

export interface ContractCancelOrderRequest {
  symbol: string;
  orderId?: string;
  orderLinkId?: string;
}

export interface ContractModifyOrderRequest {
  orderId?: string;
  orderLinkId?: string;
  symbol: string;
  qty?: string;
  price?: string;
  takeProfit?: number;
  stopLoss?: number;
  tpTriggerBy?: string;
  slTriggerBy?: string;
  triggerBy?: string;
}

export interface ContractActiveOrdersRequest {
  symbol?: string;
  orderId?: string;
  orderLinkId?: string;
  settleCoin?: string;
  orderFilter?: USDCOrderFilter;
  limit?: number;
}

export interface ContractPositionsRequest {
  symbol?: string;
  settleCoin?: string;
  dataFilter?: string;
}
