export interface RFQConfigV5 {
  deskCode: string; // Own deskCode, unique identification code
  maxLegs: number; // Maximum number of legs
  maxLP: number; // Maximum number of LPs selected in inquiry form
  maxActiveRfq: number; // Maximum number of unfinished inquiry orders allowed
  minLimitQtySpotOrder: number; // Spot minimum order quantity multiplier
  minLimitQtyContractOrder: number; // Contract minimum order quantity multiplier
  minLimitQtyOptionOrder: number; // Option minimum order multiplier
  strategyTypes: {
    strategyName: string; // Policy name
  }[];
  counterparties: {
    strategyName: string; // Policy name
  }[];
}

export interface RFQCounterpartyV5 {
  traderName: string; // Name of the bidder
  deskCode: string; // Unique identification code of the quotation party
  type: string | null; // Quoter type. LP is automated market maker, null means normal quote party
}

export interface CreateRFQResultV5 {
  rfqId: string; // Inquiry ID
  rfqLinkId: string; // Inquiry Custom ID
  status: 'Active' | 'Canceled' | 'Filled' | 'Expired' | 'Failed'; // Status of the inquiry form
  expiresAt: string; // Expiration time in milliseconds Unix timestamp
  deskCode: string; // Inquiry party unique identification code
}

export interface CancelRFQResultV5 {
  rfqId: string; // Inquiry ID
  rfqLinkId: string; // Inquiry Custom ID
}

export interface CancelRFQItemV5 {
  rfqId: string; // Inquiry ID
  rfqLinkId: string; // Inquiry Custom ID
  code: number; // Cancel success or failure, 0 means success
  msg: string; // Cancellation failure reason
}

export interface CancelAllRFQResultV5 {
  data: CancelRFQItemV5[]; // Array of cancellation results
}

export interface CreateRFQQuoteResultV5 {
  rfqId: string; // Inquiry ID
  quoteId: string; // Quotation ID
  quoteLinkId: string; // Quotation Custom ID
  expiresAt: string; // Expiration time in milliseconds Unix timestamp
  deskCode: string; // Quoter's unique identification code
  status: 'Active' | 'Canceled' | 'Filled' | 'Expired' | 'Failed'; // Status of quotation
}

export interface ExecuteRFQQuoteResultV5 {
  rfqId: string; // Inquiry ID
  rfqLinkId: string; // Inquiry Custom ID
  quoteId: string; // Quotation ID
  status: 'Processing' | 'Rejected'; // Order status
  rejectParty: string; // Empty means passed, "Taker", "Maker", "Bybit" when rejected
}

export interface CancelRFQQuoteResultV5 {
  rfqId: string; // Inquiry ID
  quoteId: string; // Quotation ID
  quoteLinkId: string; // Quotation Custom ID
}

export interface CancelRFQQuoteItemV5 {
  rfqId: string; // Inquiry ID
  quoteId: string; // Quotation ID
  quoteLinkId: string; // Quotation Custom ID
  code: number; // Cancel success or failure, 0 means success
  msg: string; // Cancellation failure reason
}

export interface RFQLegV5 {
  category: 'linear' | 'option' | 'spot'; // Product category
  symbol: string; // The unique instrument ID
  side: 'buy' | 'sell'; // Inquiry direction
  qty: string; // Order quantity of the instrument
  isLeverage?: boolean; // For spot lending
}

export interface RFQItemV5 {
  rfqId: string; // Inquiry ID
  rfqLinkId: string; // Custom ID for inquiry form
  counterparties: string[]; // List of bidders
  expiresAt: string; // Expiration time in milliseconds Unix timestamp
  strategyType: string; // Inquiry label
  status:
    | 'Active'
    | 'Canceled'
    | 'PendingFill'
    | 'Filled'
    | 'Expired'
    | 'Failed'; // Status
  deskCode: string; // Unique identification code of the inquiry party
  createdAt: number; // Time when the trade is created in epoch
  updatedAt: number; // Time when the trade is updated in epoch
  legs: RFQLegV5[]; // Combination transaction
}

export interface GetRFQRealtimeResultV5 {
  list: RFQItemV5[]; // Array of RFQ items
}

export interface RFQHistory {
  cursor: string; // Page turning mark
  list: RFQItemV5[]; // Array of RFQ items
}

export interface QuoteLegV5 {
  category: 'spot' | 'linear' | 'option'; // Product type
  symbol: string; // The unique instrument ID or name of trading contract
  price: string; // Order price or quote price
  qty?: string; // Order quantity
  isLeverage?: boolean; // For spot lending
}

export interface RFQQuoteItemV5 {
  rfqId: string; // Inquiry ID
  rfqLinkId: string; // Custom ID for inquiry form
  quoteId: string; // Quotation ID
  quoteLinkId: string; // Quotation custom ID
  expiresAt: string; // Expiration time in milliseconds Unix timestamp
  deskCode: string; // Unique identification code of quotation party
  status:
    | 'Active'
    | 'Canceled'
    | 'PendingFill'
    | 'Filled'
    | 'Expired'
    | 'Failed'; // Status
  execQuoteSide: string; // Execute quote direction, buy or sell
  createdAt: number; // Time when the trade is created in epoch
  updatedAt: number; // Time when the trade is updated in epoch
  quoteBuyList: QuoteLegV5[]; // Quotation buy direction
  quoteSellList: QuoteLegV5[]; // Quotation sell direction
}

export interface RFQTradeLegV5 {
  category: 'linear' | 'option' | 'spot'; // Product category
  orderId: string; // Bybit order ID
  symbol: string; // The unique instrument ID
  side: 'buy' | 'sell'; // Direction
  price: string; // Execution price
  qty: string; // Number of executions
  isLeverage?: boolean; // For spot lending
  markPrice: string; // MarkPrice (contract) at transaction time, indexPrice for spot
  execFee: string; // Fee for taker or maker in base currency
  execId: string; // Unique exec(trade) ID from exchange
  resultCode: number; // Status code, 0 means success
  resultMessage: string; // Error message about resultCode
  rejectParty: string; // Empty if Filled, "Taker"/"Maker"/"bybit" if Rejected
}

export interface RFQTradeItemV5 {
  rfqId: string; // Inquiry ID
  quoteId: string; // Completed inquiry form and executed quotation ID
  quoteSide: 'buy' | 'sell'; // Executed quotation direction
  strategyType: string; // Inquiry label
  status: 'Filled' | 'Rejected'; // Status
  rfqDeskCode: string; // Unique identification code of inquiry party
  quoteDestCode: string; // Unique identification code of quotation party
  createdAt: number; // Time when trade is created in epoch
  updatedAt: number; // Time when trade is updated in epoch
  legs: RFQTradeLegV5[]; // Combination transaction
}

export interface RFQPublicTradeLegV5 {
  category: 'linear' | 'option' | 'spot'; // Product category
  symbol: string; // The unique instrument ID
  side: 'buy' | 'sell'; // Inquiry direction
  price: string; // Execution price
  qty: string; // Number of executions
  markPrice: string; // MarkPrice (contract) at transaction time, indexPrice for spot
}

export interface RFQPublicTradeV5 {
  rfqId: string; // Inquiry ID
  strategyType: string; // Inquiry label
  createdAt: number; // Time when trade is created in epoch
  updatedAt: number; // Time when trade is updated in epoch
  legs: RFQPublicTradeLegV5[]; // Combination transaction
}
