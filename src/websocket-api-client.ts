import {
  AmendOrderParamsV5,
  BatchAmendOrderParamsV5,
  BatchAmendOrderResultV5,
  BatchCancelOrderParamsV5,
  BatchCancelOrderResultV5,
  BatchCreateOrderResultV5,
  BatchOrderParamsV5,
  BatchOrdersRetExtInfoV5,
  CancelOrderParamsV5,
  OrderParamsV5,
  OrderResultV5,
} from './types';
import { WSAPIResponse } from './types/websockets/ws-api';
import { WSClientConfigurableOptions } from './types/websockets/ws-general';
import { DefaultLogger } from './util';
import { WS_KEY_MAP } from './util/websockets/websocket-util';
import { WebsocketClient } from './websocket-client';

/**
 * Configurable options specific to only the REST-like WebsocketAPIClient
 */
export interface WSAPIClientConfigurableOptions {
  /**
   * Default: true
   *
   * Attach default event listeners, which will console log any high level
   * events (opened/reconnecting/reconnected/etc).
   *
   * If you disable this, you should set your own event listeners
   * on the embedded WS Client `wsApiClient.getWSClient().on(....)`.
   */
  attachEventListeners: boolean;
}

/**
 * This is a minimal Websocket API wrapper around the WebsocketClient.
 *
 * Some methods support passing in a custom "wsKey". This is a reference to which WS connection should
 * be used to transmit that message. This is only useful if you wish to use an alternative wss
 * domain that is supported by the SDK.
 *
 * Note: To use testnet, don't set the wsKey - use `testnet: true` in
 * the constructor instead.
 *
 * Note: You can also directly use the sendWSAPIRequest() method to make WS API calls, but some
 * may find the below methods slightly more intuitive.
 *
 * Refer to the WS API promises example for a more detailed example on using sendWSAPIRequest() directly:
 * https://github.com/tiagosiebler/bybit-api/blob/master/examples/ws-api-raw-promises.ts
 */
export class WebsocketAPIClient {
  private wsClient: WebsocketClient;

  private logger: DefaultLogger;

  private options: WSClientConfigurableOptions & WSAPIClientConfigurableOptions;

  constructor(
    options?: WSClientConfigurableOptions &
      Partial<WSAPIClientConfigurableOptions>,
    logger?: DefaultLogger,
  ) {
    this.wsClient = new WebsocketClient(options, logger);

    this.options = {
      attachEventListeners: true,
      ...options,
    };

    this.logger = this.wsClient.logger;

    this.setupDefaultEventListeners();
  }

  public getWSClient(): WebsocketClient {
    return this.wsClient;
  }

  public setTimeOffsetMs(newOffset: number): void {
    return this.getWSClient().setTimeOffsetMs(newOffset);
  }

  /*
   * Bybit WebSocket API Methods
   * https://bybit-exchange.github.io/docs/v5/websocket/trade/guideline
   */

  /**
   * Submit a new order
   *
   * @param params
   * @returns
   */
  submitNewOrder(
    params: OrderParamsV5,
  ): Promise<WSAPIResponse<OrderResultV5, 'order.create'>> {
    return this.wsClient.sendWSAPIRequest(
      WS_KEY_MAP.v5PrivateTrade,
      'order.create',
      params,
    );
  }

  /**
   * Amend an order
   *
   * @param params
   * @returns
   */
  amendOrder(
    params: AmendOrderParamsV5,
  ): Promise<WSAPIResponse<OrderResultV5, 'order.amend'>> {
    return this.wsClient.sendWSAPIRequest(
      WS_KEY_MAP.v5PrivateTrade,
      'order.amend',
      params,
    );
  }

  /**
   * Cancel an order
   *
   * @param params
   * @returns
   */
  cancelOrder(
    params: CancelOrderParamsV5,
  ): Promise<WSAPIResponse<OrderResultV5, 'order.cancel'>> {
    return this.wsClient.sendWSAPIRequest(
      WS_KEY_MAP.v5PrivateTrade,
      'order.cancel',
      params,
    );
  }

  /**
   * Batch submit orders
   *
   * @param params
   * @returns
   */
  batchSubmitOrders(
    category: 'option' | 'linear',
    orders: BatchOrderParamsV5[],
  ): Promise<
    WSAPIResponse<
      {
        list: BatchCreateOrderResultV5[];
      },
      'order.create-batch',
      BatchOrdersRetExtInfoV5
    >
  > {
    return this.wsClient.sendWSAPIRequest(
      WS_KEY_MAP.v5PrivateTrade,
      'order.create-batch',
      {
        category,
        request: orders,
      },
    );
  }

  /**
   * Batch amend orders
   *
   * @param params
   * @returns
   */
  batchAmendOrder(
    category: 'option' | 'linear',
    orders: BatchAmendOrderParamsV5[],
  ): Promise<
    WSAPIResponse<
      {
        list: BatchAmendOrderResultV5[];
      },
      'order.amend-batch',
      BatchOrdersRetExtInfoV5
    >
  > {
    return this.wsClient.sendWSAPIRequest(
      WS_KEY_MAP.v5PrivateTrade,
      'order.amend-batch',
      {
        category,
        request: orders,
      },
    );
  }

  /**
   * Batch cancel orders
   *
   * @param params
   * @returns
   */
  batchCancelOrder(
    category: 'option' | 'linear',
    orders: BatchCancelOrderParamsV5[],
  ): Promise<
    WSAPIResponse<
      {
        list: BatchCancelOrderResultV5[];
      },
      'order.cancel-batch',
      BatchOrdersRetExtInfoV5
    >
  > {
    return this.wsClient.sendWSAPIRequest(
      WS_KEY_MAP.v5PrivateTrade,
      'order.cancel-batch',
      {
        category,
        request: orders,
      },
    );
  }

  /**
   *
   *
   *
   *
   *
   *
   *
   * Private methods for handling some of the convenience/automation provided by the WS API Client
   *
   *
   *
   *
   *
   *
   *
   */

  private setupDefaultEventListeners() {
    if (this.options.attachEventListeners) {
      /**
       * General event handlers for monitoring the WebsocketClient
       */
      this.wsClient
        .on('open', (data) => {
          console.log(new Date(), 'ws connected', data.wsKey);
        })
        .on('reconnect', ({ wsKey }) => {
          console.log(new Date(), 'ws automatically reconnecting.... ', wsKey);
        })
        .on('reconnected', (data) => {
          console.log(new Date(), 'ws has reconnected ', data?.wsKey);
        })
        .on('authenticated', (data) => {
          console.info(new Date(), 'ws has authenticated ', data?.wsKey);
        })
        .on('exception', (data) => {
          console.error(new Date(), 'ws exception: ', JSON.stringify(data));
        });
    }
  }
}
