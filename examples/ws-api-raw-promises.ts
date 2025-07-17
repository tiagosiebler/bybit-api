import { DefaultLogger, WebsocketClient, WS_KEY_MAP } from '../src';

// or
// import { DefaultLogger, WS_KEY_MAP, WebsocketClient } from 'bybit-api';

const logger = {
  ...DefaultLogger,
  // For a more detailed view of the WebsocketClient, enable the `trace` level by uncommenting the below line:
  // trace: (...params) => console.log('trace', ...params),
};

const key = process.env.API_KEY;
const secret = process.env.API_SECRET;

const wsClient = new WebsocketClient(
  {
    key: key,
    secret: secret,
    // testnet: true, // Whether to use the testnet environment: https://testnet.bybit.com/app/user/api-management
    // demoTrading: false, // note: As of Jan 2025, demo trading does NOT support the WS API
  },
  logger, // Optional: inject a custom logger
);

/**
 * General event handlers for monitoring the WebsocketClient
 */
wsClient.on('update', (data) => {
  console.log('raw message received ', JSON.stringify(data));
});
wsClient.on('open', (data) => {
  console.log('ws connected', data.wsKey);
});
wsClient.on('reconnect', ({ wsKey }) => {
  console.log('ws automatically reconnecting.... ', wsKey);
});
wsClient.on('reconnected', (data) => {
  console.log('ws has reconnected ', data?.wsKey);
});
wsClient.on('authenticated', (data) => {
  console.log('ws has authenticated ', data?.wsKey);
});
wsClient.on('exception', (data) => {
  console.error('ws exception: ', data);
});

async function main() {
  /**
   *
   * This SDK's WebSocket API integration can connect WS API responses to the request that caused them. Each call
   * to the `sendWSAPIRequest(...)` method returns a promise.
   *
   * This promise will resolve when the matching response is detected, and reject if an exception for that request
   * is detected. This allows using Bybit's Websocket API in the same way that a REST API normally works.
   *
   * Send a command and immediately await the result. Handle any exceptions in a catch block.
   *
   * TypeScript users can benefit from smart type flowing for increased type safety & convenience:
   * - Request parameters are fully typed, depending on the operation in the second parameter to the call. E.g.
   * the `order.create` operation will automatically require the params to match the `OrderParamsV5` interface.
   *
   * - Response parameters are fully typed, depending on the operation in the second parameter. E.g the `order.create`
   * operation will automatically map the returned value to `WSAPIResponse<OrderResultV5, "order.create">`.
   *
   */

  // To make it easier to watch, wait a few seconds before sending the amend order
  const AMEND_AFTER_SECONDS = 5;

  // Then wait a few more before sending the cancel order
  const CANCEL_AFTER_SECONDS = 10;

  /**
   *
   * If you haven't connected yet, the WebsocketClient will automatically connect and authenticate you as soon as you send
   * your first command. That connection will then be reused for every command you send, unless the connection drops - then
   * it will automatically be replaced with a healthy connection.
   *
   * This "not connected yet" scenario can add an initial delay to your first command. If you want to prepare a connection
   * in advance, you can ask the WebsocketClient to prepare it before you start submitting commands. This is optional.
   *
   */

  // Optional, see above. Can be used to prepare a connection before sending commands
  await wsClient.connectWSAPI();

  /**
   * Create a new order
   */

  let orderId: string | undefined;

  try {
    console.log('Step 1: Create an order');

    // The type for `wsAPISubmitOrderResult` is automatically resolved to `WSAPIResponse<OrderResultV5, "order.create">`
    const wsAPISubmitOrderResult = await wsClient.sendWSAPIRequest(
      WS_KEY_MAP.v5PrivateTrade,
      'order.create',
      {
        symbol: 'BTCUSDT',
        side: 'Buy',
        orderType: 'Limit',
        price: '50000',
        qty: '1',
        category: 'linear',
      },
    );

    // Save the orderId for the next call
    orderId = wsAPISubmitOrderResult.data.orderId;

    console.log(
      `Step 1: Order result (order ID: "${orderId}"): `,
      wsAPISubmitOrderResult,
    );
  } catch (e) {
    console.error('Step 1: Order submit exception: ', e);
    return;
  }

  setTimeout(async () => {
    try {
      console.log('Step 2: Amend an order');

      // The type for `wsAPIAmendOrderResult` is automatically resolved to `WSAPIResponse<OrderResultV5, "order.amend">`
      const wsAPIAmendOrderResult = await wsClient.sendWSAPIRequest(
        WS_KEY_MAP.v5PrivateTrade,
        'order.amend',
        {
          symbol: 'BTCUSDT',
          category: 'linear',
          orderId,
          price: '55000',
        },
      );

      // Save the orderId for the next call
      orderId = wsAPIAmendOrderResult.data.orderId;

      console.log(
        `Step 2: Amend result (order ID: "${orderId}"): `,
        wsAPIAmendOrderResult,
      );
    } catch (e) {
      console.error('Step 2: Amend order exception: ', e);
      return;
    }
  }, AMEND_AFTER_SECONDS * 1000);

  setTimeout(async () => {
    try {
      console.log('Step 3: Cancel an order');

      // The type for `wsAPICancelOrderResult` is automatically resolved to `WSAPIResponse<OrderResultV5, "order.cancel">`
      const wsAPICancelOrderResult = await wsClient.sendWSAPIRequest(
        WS_KEY_MAP.v5PrivateTrade,
        'order.cancel',
        {
          category: 'linear',
          symbol: 'BTCUSDT',
          orderId,
        },
      );

      console.log('Step 3: Cancel result:', wsAPICancelOrderResult);
    } catch (e) {
      console.error('Step 3: Cancel order exception: ', e);
    }

    process.exit(-1);
  }, CANCEL_AFTER_SECONDS * 1000);
}

// Start executing the example workflow
main();
