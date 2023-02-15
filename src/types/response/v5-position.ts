import { CategoryV5 } from '../v5-shared';

export interface PositionV5 {
  positionIdx: number;
  riskId: number;
  riskLimitValue: string;
  symbol: string;
  side: 'Buy' | 'Sell' | 'None';
  size: string;
  avgPrice: string;
  positionValue: string;
  tradeMode: number;
  autoAddMargin?: number;
  positionStatus: 'Normal' | 'Liq' | 'Adl';
  leverage?: string;
  markPrice: string;
  liqPrice: string;
  bustPrice?: string;
  positionIM?: string;
  positionMM?: string;
  tpslMode?: 'Full' | 'Partial';
  takeProfit?: string;
  stopLoss?: string;
  trailingStop?: string;
  unrealisedPnl: string;
  cumRealisedPnl: string;
  createdTime: string;
  updatedTime: string;
}
