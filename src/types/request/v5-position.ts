import { CategoryV5 } from '../v5-shared';

export interface PositionInfoParamsV5 {
  category: CategoryV5;
  symbol?: string;
  baseCoin?: string;
  settleCoin?: string;
  limit?: number;
  cursor?: string;
}
