export interface UMLeverageFilter {
  minLeverage: string;
  maxLeverage: string;
  leverageStep: string;
}

export interface UMPriceFilter {
  minPrice: string;
  maxPrice: string;
  tickSize: string;
}

export interface UMLotSizeFilter {
  maxTradingQty: string;
  minTradingQty: string;
  qtyStep: string;
}

export interface UMInstrumentInfo {
  symbol: string;
  contractType: string;
  status: string;
  baseCoin: string;
  quoteCoin: string;
  launchTime: string;
  deliveryTime: string;
  deliveryFeeRate: string;
  priceScale: string;
  leverageFilter: UMLeverageFilter;
  priceFilter: UMPriceFilter;
  lotSizeFilter: UMLotSizeFilter;
}

export interface UMInstrumentInfoResult {
  category: string;
  list: UMInstrumentInfo[];
  nextPageCursor: string;
}
