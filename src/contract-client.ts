/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  APIResponseV3,
  APIResponseWithTime,
  ContractActiveOrdersRequest,
  ContractCancelOrderRequest,
  ContractClosedPNLRequest,
  ContractHistoricOrder,
  ContractHistoricOrdersRequest,
  ContractListResult,
  ContractModifyOrderRequest,
  ContractOrderRequest,
  ContractPositionsRequest,
  ContractSetAutoAddMarginRequest,
  ContractSetMarginSwitchRequest,
  ContractSetPositionModeRequest,
  ContractSetTPSLRequest,
  ContractSymbolTicker,
  ContractUserExecutionHistoryRequest,
  ContractWalletFundRecordRequest,
  PaginatedResult,
  UMCandlesRequest,
  UMCategory,
  UMFundingRateHistoryRequest,
  UMInstrumentInfoRequest,
  UMOpenInterestRequest,
  UMOptionDeliveryPriceRequest,
  UMPublicTradesRequest,
} from './types';
import { REST_CLIENT_TYPE_ENUM } from './util';
import BaseRestClient from './util/BaseRestClient';

/**
 * REST API client for Derivatives V3 Contract APIs
 * @deprecated WARNING
 * These endpoints are being switched off gradually and are expected to be completely turned off by the end of 2024.
 * They may stop working at any point before then.
 * Please update your code as soon as possible to use the V5 APIs instead.
 */
export class ContractClient extends BaseRestClient {
  getClientType() {
    // Follows the same authentication mechanism as other v3 APIs (e.g. USDC)
    return REST_CLIENT_TYPE_ENUM.v3;
  }

  async fetchServerTime(): Promise<number> {
    const res = await this.getServerTime();
    return Number(res.time_now);
  }

  /**
   *
   * Market Data Endpoints : these seem exactly the same as the unified margin market data endpoints
   *
   */

  /** Query order book info. Each side has a depth of 25 orders. */
  getOrderBook(
    symbol: string,
    category?: string,
    limit?: number,
  ): Promise<APIResponseV3<any>> {
    return this.get('/derivatives/v3/public/order-book/L2', {
      category,
      symbol,
      limit,
    });
  }

  /** Get candles/klines */
  getCandles(params: UMCandlesRequest): Promise<APIResponseV3<any>> {
    return this.get('/derivatives/v3/public/kline', params);
  }

  /** Get a symbol price/statistics ticker */
  getSymbolTicker(
    category: UMCategory | '',
    symbol?: string,
  ): Promise<APIResponseV3<ContractListResult<ContractSymbolTicker>>> {
    return this.get('/derivatives/v3/public/tickers', { category, symbol });
  }

  /** Get trading rules per symbol/contract, incl price/amount/value/leverage filters */
  getInstrumentInfo(
    params: UMInstrumentInfoRequest,
  ): Promise<APIResponseV3<any>> {
    return this.get('/derivatives/v3/public/instruments-info', params);
  }

  /** Query mark price kline (like getCandles() but for mark price). */
  getMarkPriceCandles(params: UMCandlesRequest): Promise<APIResponseV3<any>> {
    return this.get('/derivatives/v3/public/mark-price-kline', params);
  }

  /** Query Index Price Kline */
  getIndexPriceCandles(params: UMCandlesRequest): Promise<APIResponseV3<any>> {
    return this.get('/derivatives/v3/public/index-price-kline', params);
  }

  /**
   * The funding rate is generated every 8 hours at 00:00 UTC, 08:00 UTC and 16:00 UTC.
   * For example, if a request is sent at 12:00 UTC, the funding rate generated earlier that day at 08:00 UTC will be sent.
   */
  getFundingRateHistory(
    params: UMFundingRateHistoryRequest,
  ): Promise<APIResponseV3<any>> {
    return this.get(
      '/derivatives/v3/public/funding/history-funding-rate',
      params,
    );
  }

  /** Get Risk Limit */
  getRiskLimit(
    category: UMCategory,
    symbol: string,
  ): Promise<APIResponseV3<any>> {
    return this.get('/derivatives/v3/public/risk-limit/list', {
      category,
      symbol,
    });
  }

  /** Get option delivery price */
  getOptionDeliveryPrice(
    params: UMOptionDeliveryPriceRequest,
  ): Promise<APIResponseV3<any>> {
    return this.get('/derivatives/v3/public/delivery-price', params);
  }

  /** Get public trading history */
  getTrades(params: UMPublicTradesRequest): Promise<APIResponseV3<any>> {
    return this.get('/derivatives/v3/public/recent-trade', params);
  }

  /**
   * Gets the total amount of unsettled contracts.
   * In other words, the total number of contracts held in open positions.
   */
  getOpenInterest(params: UMOpenInterestRequest): Promise<APIResponseV3<any>> {
    return this.get('/derivatives/v3/public/open-interest', params);
  }

  /**
   *
   * Contract Account Endpoints
   *
   */

  /** -> Order API */

  /** Place an order */
  submitOrder(params: ContractOrderRequest): Promise<APIResponseV3<any>> {
    return this.postPrivate('/contract/v3/private/order/create', params);
  }

  /**
   * Query order history.
   *
   * As order creation/cancellation is asynchronous, the data returned from the interface may be delayed.
   * To access order information in real-time, call getActiveOrders().
   */
  getHistoricOrders(
    params: ContractHistoricOrdersRequest,
  ): Promise<APIResponseV3<PaginatedResult<ContractHistoricOrder>>> {
    return this.getPrivate('/contract/v3/private/order/list', params);
  }

  /** Cancel order */
  cancelOrder(params: ContractCancelOrderRequest): Promise<APIResponseV3<any>> {
    return this.postPrivate('/contract/v3/private/order/cancel', params);
  }

  /** Cancel all orders */
  cancelAllOrders(symbol: string): Promise<APIResponseV3<any>> {
    return this.postPrivate('/contract/v3/private/order/cancel-all', {
      symbol,
    });
  }

  /**
   * Replace order
   *
   * Active order parameters (such as quantity, price) and stop order parameters
   * cannot be modified in one request at the same time.
   *
   * Please request modification separately.
   */
  modifyOrder(params: ContractModifyOrderRequest): Promise<APIResponseV3<any>> {
    return this.postPrivate('/contract/v3/private/order/replace', params);
  }

  /** Query Open Order(s) (real-time) */
  getActiveOrders(
    params: ContractActiveOrdersRequest,
  ): Promise<APIResponseV3<any>> {
    return this.getPrivate(
      '/contract/v3/private/order/unfilled-orders',
      params,
    );
  }

  /** -> Positions API */

  /**
   * Query my positions real-time. Accessing personal list of positions.
   * Either symbol or settleCoin is required.
   * Users can access their position holding information through this interface, such as the number of position holdings and wallet balance.
   */
  getPositions(params?: ContractPositionsRequest): Promise<APIResponseV3<any>> {
    return this.getPrivate('/contract/v3/private/position/list', params);
  }

  /** Set auto add margin, or Auto-Margin Replenishment. */
  setAutoAddMargin(
    params: ContractSetAutoAddMarginRequest,
  ): Promise<APIResponseV3<any>> {
    return this.postPrivate(
      '/contract/v3/private/position/set-auto-add-margin',
      params,
    );
  }

  /** Switch cross margin mode/isolated margin mode */
  setMarginSwitch(
    params: ContractSetMarginSwitchRequest,
  ): Promise<APIResponseV3<any>> {
    return this.postPrivate(
      '/contract/v3/private/position/switch-isolated',
      params,
    );
  }

  /** Supports switching between One-Way Mode and Hedge Mode at the coin level. */
  setPositionMode(
    params: ContractSetPositionModeRequest,
  ): Promise<APIResponseV3<any>> {
    return this.postPrivate(
      '/contract/v3/private/position/switch-mode',
      params,
    );
  }

  /**
   * Switch mode between Full or Partial
   */
  setTPSLMode(
    symbol: string,
    tpSlMode: 'Full' | 'Partial',
  ): Promise<APIResponseV3<any>> {
    return this.postPrivate('/contract/v3/private/position/switch-tpsl-mode', {
      symbol,
      tpSlMode,
    });
  }

  /** Leverage setting. */
  setLeverage(
    symbol: string,
    buyLeverage: string,
    sellLeverage: string,
  ): Promise<APIResponseV3<any>> {
    return this.postPrivate('/contract/v3/private/position/set-leverage', {
      symbol,
      buyLeverage,
      sellLeverage,
    });
  }

  /**
   * Set take profit, stop loss, and trailing stop for your open position.
   * If using partial mode, TP/SL/TS orders will not close your entire position.
   */
  setTPSL(params: ContractSetTPSLRequest): Promise<APIResponseV3<any>> {
    return this.postPrivate(
      '/contract/v3/private/position/trading-stop',
      params,
    );
  }

  /** Set risk limit */
  setRiskLimit(
    symbol: string,
    riskId: number,
    /** 0-one-way, 1-buy side, 2-sell side */
    positionIdx: 0 | 1 | 2,
  ): Promise<APIResponseV3<any>> {
    return this.postPrivate('/contract/v3/private/position/set-risk-limit', {
      symbol,
      riskId,
      positionIdx,
    });
  }

  /**
   * Get user's trading records.
   * The results are ordered in descending order (the first item is the latest). Returns records up to 2 years old.
   */
  getUserExecutionHistory(
    params: ContractUserExecutionHistoryRequest,
  ): Promise<APIResponseV3<any>> {
    return this.getPrivate('/contract/v3/private/execution/list', params);
  }

  /**
   * Get user's closed profit and loss records.
   * The results are ordered in descending order (the first item is the latest).
   */
  getClosedProfitAndLoss(
    params: ContractClosedPNLRequest,
  ): Promise<APIResponseV3<any>> {
    return this.getPrivate('/contract/v3/private/position/closed-pnl', params);
  }

  /** Get the information of open interest limit. */
  getOpenInterestLimitInfo(symbol: string): Promise<APIResponseV3<any>> {
    return this.getPrivate('/contract/v3/private/position/limit-info', {
      symbol,
    });
  }

  /** -> Account API */

  /** Query wallet balance */
  getBalances(coin?: string): Promise<APIResponseV3<any>> {
    return this.getPrivate('/contract/v3/private/account/wallet/balance', {
      coin,
    });
  }

  /** Get user trading fee rate */
  getTradingFeeRate(symbol?: string): Promise<APIResponseV3<any>> {
    return this.getPrivate('/contract/v3/private/account/fee-rate', {
      symbol,
    });
  }

  /**
   * Get wallet fund records.
   * This endpoint also shows exchanges from the Asset Exchange,
   * where the types for the exchange are ExchangeOrderWithdraw and ExchangeOrderDeposit.
   *
   * This endpoint returns incomplete information for transfers involving the derivatives wallet.
   * Use the account asset API for creating and querying internal transfers.
   */
  getWalletFundRecords(
    params?: ContractWalletFundRecordRequest,
  ): Promise<APIResponseV3<any>> {
    return this.getPrivate(
      '/contract/v3/private/account/wallet/fund-records',
      params,
    );
  }

  /**
   *
   * API Data Endpoints
   *
   */

  getServerTime(): Promise<APIResponseWithTime> {
    return this.get('/v2/public/time');
  }
}
