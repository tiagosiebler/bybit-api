import { CategoryV5, ExecTypeV5, PositionIdx, TPSLModeV5 } from '../v5-shared';

export interface PositionInfoParamsV5 {
  category: CategoryV5;
  symbol?: string;
  baseCoin?: string;
  settleCoin?: string;
  limit?: number;
  cursor?: string;
}

export interface SetLeverageParamsV5 {
  category: 'linear' | 'inverse';
  symbol: string;
  buyLeverage: string;
  sellLeverage: string;
}

export interface SwitchIsolatedMarginParamsV5 {
  category: 'linear' | 'inverse';
  symbol: string;
  tradeMode: 0 | 1;
  buyLeverage: string;
  sellLeverage: string;
}

export interface SetTPSLModeParamsV5 {
  category: 'linear' | 'inverse';
  symbol: string;
  tpSlMode: TPSLModeV5;
}

export interface SwitchPositionModeParamsV5 {
  category: 'linear' | 'inverse';
  symbol?: string;
  coin?: string;
  mode: 0 | 3;
}

export interface SetRiskLimitParamsV5 {
  category: 'linear' | 'inverse';
  symbol: string;
  riskId: number;
  positionIdx?: PositionIdx;
}

export interface SetTradingStopParamsV5 {
  symbol: string;
  category: CategoryV5;
  takeProfit?: string;
  stopLoss?: string;
  trailingStop?: string;
  tpTriggerBy?: string;
  slTriggerBy?: string;
  activePrice?: string;
  tpSize?: string;
  slSize?: string;
  positionIdx: PositionIdx;
}

export interface SetAutoAddMarginParamsV5 {
  category: 'linear';
  symbol: string;
  autoAddMargin: 0 | 1;
  positionIdx?: PositionIdx;
}

export interface GetExecutionListParamsV5 {
  category: CategoryV5;
  symbol?: string;
  orderId?: string;
  orderLinkId?: string;
  baseCoin?: string;
  startTime?: number;
  endTime?: number;
  execType?: ExecTypeV5;
  limit?: number;
  cursor?: string;
}

export interface GetClosedPnLParamsV5 {
  category: CategoryV5;
  symbol?: string;
  startTime?: number;
  endTime?: number;
  limit?: number;
  cursor?: string;
}
