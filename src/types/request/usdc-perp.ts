export interface USDCKlineRequest {
  symbol: string;
  period: string;
  startTime: number;
  limit?: string;
}

export interface USDCOpenInterestRequest {
  symbol: string;
  period: string;
  limit?: number;
}

export interface USDCLast500TradesRequest {
  category: string;
  symbol?: string;
  baseCoin?: string;
  limit?: string;
}
