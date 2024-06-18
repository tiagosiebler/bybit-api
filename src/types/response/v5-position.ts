import {
  CategoryV5,
  ExecTypeV5,
  OrderSideV5,
  OrderTypeV5,
  PositionIdx,
  PositionSideV5,
  PositionStatusV5,
  StopOrderTypeV5,
  TPSLModeV5,
  TradeModeV5,
} from '../v5-shared';

export interface PositionV5 {
  positionIdx: PositionIdx;
  riskId: number;
  riskLimitValue: string;
  symbol: string;
  side: PositionSideV5;
  size: string;
  avgPrice: string;
  positionValue: string;
  tradeMode: TradeModeV5;
  autoAddMargin?: number;
  positionStatus: PositionStatusV5;
  leverage?: string;
  markPrice: string;
  liqPrice: string | '';
  bustPrice?: string;
  positionIM?: string;
  positionMM?: string;
  tpslMode?: TPSLModeV5;
  takeProfit?: string;
  stopLoss?: string;
  trailingStop?: string;
  sessionAvgPrice: string | '';
  delta?: string;
  gamma?: string;
  vega?: string;
  theta?: string;
  unrealisedPnl: string;
  curRealisedPnl: string;
  cumRealisedPnl: string;
  adlRankIndicator: number;
  isReduceOnly: boolean;
  mmrSysUpdatedTime: string | '';
  leverageSysUpdatedTime: string | '';
  createdTime: string;
  updatedTime: string;
  seq: number;
}

export interface SetRiskLimitResultV5 {
  category: CategoryV5;
  riskId: number;
  riskLimitValue: string;
}

export interface AddOrReduceMarginResultV5 {
  category: CategoryV5;
  symbol: string;
  positionIdx: PositionIdx;
  riskId: number;
  riskLimitValue: string;
  size: string;
  avgPrice: string;
  liqPrice: string;
  bustPrice: string;
  markPrice: string;
  positionValue: string;
  leverage: string;
  autoAddMargin: 0 | 1;
  positionStatus: PositionStatusV5;
  positionIM: string;
  positionMM: string;
  takeProfit: string;
  stopLoss: string;
  trailingStop: string;
  unrealisedPnl: string;
  cumRealisedPnl: string;
  createdTime: string;
  updatedTime: string;
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
  stopOrderType?: StopOrderTypeV5;
  execFee: string;
  execId: string;
  execPrice: string;
  execQty: string;
  execType: ExecTypeV5;
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
  closedSize?: string;
}

export interface ClosedPnLV5 {
  symbol: string;
  orderId: string;
  side: string;
  qty: string;
  orderPrice: string;
  orderType: OrderTypeV5;
  execType: ExecTypeV5;
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

export interface MovePositionResultV5 {
  blockTradeId: string;
  status: 'Processing' | 'Rejected';
  rejectParty: '' | 'Taker' | 'Maker' | 'bybit';
}

export interface MovePositionHistoryV5 {
  blockTradeId: string;
  category: 'linear' | 'spot' | 'option';
  orderId: string;
  userId: number;
  symbol: string;
  side: 'Buy' | 'Sell';
  price: string;
  qty: string;
  execFee: string;
  status: 'Processing' | 'Filled' | 'Rejected';
  execId: string;
  resultCode: number;
  resultMessage: string;
  createdAt: number;
  updatedAt: number;
  rejectParty: '' | 'Taker' | 'Maker' | 'bybit';
}
