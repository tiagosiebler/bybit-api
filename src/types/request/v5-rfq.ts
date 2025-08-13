export interface RFQTransactionV5 {
  category: 'spot' | 'linear' | 'inverse' | 'option'; // Product type
  symbol: string; // Name of the trading contract
  side: 'buy' | 'sell'; // Inquiry transaction direction
  qty: string; // Transaction quantity
  isLeverage?: boolean; // For spot lending, default false
}

export interface CreateRFQParamsV5 {
  counterparties: string[]; // Array of deskCode
  rfqLinkId?: string; // Custom ID for inquiry form, 1-32 characters
  anonymous?: boolean; // Whether it is anonymous inquiry, default false
  strategyType?: string; // Inquiry label, max 36 characters
  list: RFQTransactionV5[]; // Transaction list, up to 10 sets
}

export interface CancelRFQParamsV5 {
  rfqId?: string; // Inquiry ID
  rfqLinkId?: string; // Inquiry Custom ID
}

export interface RFQQuoteV5 {
  category: 'spot' | 'linear' | 'option'; // Product type
  symbol: string; // Name of the trading contract
  price: string; // Quote price
  isLeverage?: boolean; // For spot lending, default false
}

export interface CreateRFQQuoteParamsV5 {
  rfqId: string; // Inquiry ID
  quoteLinkId?: string; // Quotation custom ID, 1-32 characters
  anonymous?: boolean; // Whether it is anonymous quotation, default false
  expiresIn?: number; // Validity period in seconds, default 60
  quoteBuyList?: RFQQuoteV5[]; // Quotation buy direction
  quoteSellList?: RFQQuoteV5[]; // Quotation sell direction
}

export interface ExecuteRFQQuoteParamsV5 {
  rfqId: string; // Inquiry ID
  quoteId: string; // Quotation ID
  quoteSide: 'buy' | 'sell'; // The direction of the quote
}

export interface CancelRFQQuoteParamsV5 {
  quoteId?: string; // Quotation ID
  rfqId?: string; // Inquiry ID
  quoteLinkId?: string; // Quotation Custom ID
}

export interface GetRFQRealtimeParamsV5 {
  rfqId?: string; // Inquiry ID
  rfqLinkId?: string; // Inquiry Custom ID
  traderType?: 'quote' | 'request'; // Trader type, default 'request'
}

export interface GetRFQListParamsV5 {
  rfqId?: string; // Inquiry ID
  rfqLinkId?: string; // Custom ID for inquiry form
  traderType?: 'quoter' | 'request'; // Trader type, default 'request'
  status?:
    | 'Active'
    | 'Canceled'
    | 'PendingFill'
    | 'Filled'
    | 'Expired'
    | 'Failed'; // Status of the inquiry form
  limit?: number; // Return number of items, max 100, default 50
  cursor?: string; // Page turning mark
}

export interface GetRFQQuoteRealtimeParamsV5 {
  rfqId?: string; // Inquiry ID
  quoteId?: string; // Quotation ID
  quoteLinkId?: string; // Quotation Custom ID
  traderType?: 'quote' | 'request'; // Trader type, default 'quote'
}

export interface GetRFQHistoryParamsV5 {
  rfqId?: string; // Inquiry ID
  quoteId?: string; // Quotation ID
  quoteLinkId?: string; // Quotation custom ID, can only check last 3 months
  traderType?: 'quote' | 'request'; // Trader type, default 'quote'
  status?:
    | 'Active'
    | 'Canceled'
    | 'PendingFill'
    | 'Filled'
    | 'Expired'
    | 'Failed'; // Status of quotation
  limit?: number; // Return number of items, max 100, default 50
  cursor?: string; // Page turning mark
}

export interface GetRFQTradeListParamsV5 {
  rfqId?: string; // Inquiry ID
  rfqLinkId?: string; // Custom ID for inquiry form, can only check last 3 months
  quoteId?: string; // Quotation ID
  quoteLinkId?: string; // Quotation custom ID, can only check last 3 months
  status?: 'Filled' | 'Rejected'; // Status
  limit?: number; // Return number of items, max 100, default 50
  cursor?: string; // Page turning mark
}

export interface GetRFQPublicTradesParamsV5 {
  startTime?: number; // Timestamp in milliseconds, time range is 7 days
  endTime?: number; // Timestamp in milliseconds, time range is 7 days
  limit?: number; // Return number of items, max 100, default 50
  cursor?: string; // Page turning mark
}
