export interface LiquidityMiningApyBreakdownV5 {
  coin: string;
  apy: string;
}

export interface LiquidityMiningProductV5 {
  productId: string;
  baseCoin: string;
  quoteCoin: string;
  status: 'Available' | 'NotAvailable' | string;
  maxLeverage: number;
  minInvestmentQuote: string;
  minInvestmentBase: string;
  maxInvestmentQuote: string;
  maxInvestmentBase: string;
  minWithdrawalAmount: string;
  minReinvestAmount: string;
  baseCoinPrecision: number;
  quoteCoinPrecision: number;
  yieldCoins: string[];
  apyE8: string;
  apy7dE8: string;
  poolLiquidityValue: string;
  dailyYield: string;
  slippageRateE8List: string[];
  apyBreakdown: LiquidityMiningApyBreakdownV5[];
  apy7dBreakdown: LiquidityMiningApyBreakdownV5[];
  slippage_levels?: string[];
}

export interface LiquidityMiningProductResultV5 {
  products: LiquidityMiningProductV5[];
}
