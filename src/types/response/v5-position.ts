import {
  CategoryV5,
  OrderSideV5,
  OrderTypeV5,
  PositionIdx,
  TPSLModeV5,
  TradeModeV5,
} from '../v5-shared';

export interface PositionV5 {
  positionIdx: PositionIdx;
  riskId: number;
  riskLimitValue: string;
  symbol: string;
  side: 'Buy' | 'Sell' | 'None';
  size: string;
  avgPrice: string;
  positionValue: string;
  tradeMode: TradeModeV5;
  autoAddMargin?: number;
  positionStatus: 'Normal' | 'Liq' | 'Adl';
  leverage?: string;
  markPrice: string;
  liqPrice: string;
  bustPrice?: string;
  positionIM?: string;
  positionMM?: string;
  tpslMode?: TPSLModeV5;
  takeProfit?: string;
  stopLoss?: string;
  trailingStop?: string;
  unrealisedPnl: string;
  cumRealisedPnl: string;
  createdTime: string;
  updatedTime: string;
}

export interface SetRiskLimitResultV5 {
  category: CategoryV5;
  riskId: number;
  riskLimitValue: string;
}

export interface ExecutionV5 {
  symbol: string;
  orderId: string;
  orderLinkId: string;
  side: OrderSideV5;
  orderPrice: string;
  orderQty: string;
  leavesQty: string;
  orderType: OrderTypeV5;
  stopOrderType?: string;
  execFee: string;
  execId: string;
  execPrice: string;
  execQty: string;
  execType: string;
  execValue: string;
  execTime: string;
  isMaker: boolean;
  feeRate: string;
  tradeIv?: string;
  markIv?: string;
  markPrice: string;
  indexPrice: string;
  underlyingPrice?: string;
  blockTradeId?: string;
}

export interface ClosedPnLV5 {
  symbol: string;
  orderId: string;
  side: string;
  qty: string;
  orderPrice: string;
  orderType: string;
  execType: string;
  closedSize: string;
  cumEntryValue: string;
  avgEntryPrice: string;
  cumExitValue: string;
  avgExitPrice: string;
  closedPnl: string;
  fillCount: string;
  leverage: string;
  createdTime: string;
  updatedTime: string;
}
