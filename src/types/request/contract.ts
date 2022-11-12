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

export interface ContractSetAutoAddMarginRequest {
  symbol: string;
  side: 'Buy' | 'Sell';
  autoAddMargin: 1 | 0;
  positionIdx?: 0 | 1 | 2;
}

export interface ContractSetMarginSwitchRequest {
  symbol: string;
  tradeMode: 0 | 1;
  buyLeverage: string;
  sellLeverage: string;
}

export interface ContractSetPositionModeRequest {
  symbol?: string;
  coin?: string;
  mode: 0 | 3;
}

export interface ContractSetTPSLRequest {
  symbol: string;
  takeProfit?: string;
  stopLoss?: string;
  activePrice?: string;
  trailingStop?: string;
  tpTriggerBy?: string;
  slTriggerBy?: string;
  slSize?: string;
  tpSize?: string;
  /** 0-one-way, 1-buy side, 2-sell side */
  positionIdx?: 0 | 1 | 2;
}

export interface ContractUserExecutionHistoryRequest {
  symbol: string;
  orderId?: string;
  startTime?: number;
  endTime?: number;
  execType?: 'Trade' | 'AdlTrade' | 'Funding' | 'BustTrade';
  limit?: number;
  cursor?: string;
}

export interface ContractClosedPNLRequest {
  symbol: string;
  startTime?: number;
  endTime?: number;
  limit?: number;
  cursor?: string;
}

export interface ContractWalletFundRecordRequest {
  startTime?: string;
  endTime?: string;
  coin?: string;
  walletFundType?: string;
  limit?: string;
  cursor?: string;
}
