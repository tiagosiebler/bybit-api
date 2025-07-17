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

async function main() {
  /**
   *
   * This SDK's WebSocket API integration is event-driven at its core. You can treat the sentWSAPIRquest(...) method as
   * a fire-and-forget method, to submit commands (create/amend/cancel order) via a WebSocket Connection.
   *
   * Replies to commands will show in the `response` event from the WebsocketClient's EventEmitter. Exceptions, however,
   * will show in the `error` event from the WebsocketClient's EventEmitter.
   *
   * - Fire-and-forget a command.
   * - Handle command results in the `response` event handler asynchronously as desired.
   * - Handle any exceptions in a catch block.
   *
   * This is a more "raw" workflow in how WebSockets behave. For a more convenient & REST-like approach, using the
   * promise-driven interface is recommended. See the `ws-api-raw-promises.ts` and `ws-api-client.ts` examples for a
   * demonstration you can compare.
   *
   * Note: even without using promises, you should still tie on a .catch handler to each sendWSAPIRequest call, to prevent
   * any unnecessary "unhandled promise rejection" exceptions.
   *
   */

  // To make it easier to watch, wait a few seconds before sending the amend order
  const AMEND_AFTER_SECONDS = 3;

  // Then wait a few more before sending the cancel order
  const CANCEL_AFTER_SECONDS = 5;

  // Exceptions including rejected commands will show here (as well as the catch handler used below)
  wsClient.on('exception', (data) => {
    console.error('ws exception: ', data);
  });

  // Replies to commands will show here
  wsClient.on('response', (data) => {
    console.log('received reply to command: ', JSON.stringify(data, null, 2));
  });

  /**
   *
   * If you haven't connected yet, the WebsocketClient will automatically connect and authenticate you as soon as you send
   * your first command. That connection will then be reused for every command you send, unless the connection drops - then
   * it will automatically be replaced with a healthy connection.
   *
   * This "not connected yet" scenario can add an initial delay to your first command. If you want to prepare a connection
   * in advance, you can ask the WebsocketClient to prepare it before you start submitting commands. This is optional.
   *
   * Repeated note: even without using promises, you should still tie on a .catch handler to each sendWSAPIRequest call, to prevent
   * any unnecessary "unhandled promise rejection" exceptions.
   *
   */

  // Optional, see above. Can be used to prepare a connection before sending commands
  await wsClient.connectWSAPI();

  console.log('Step 1: Create an order');

  // Fire and forget the create.order command
  // Even without using promises, you should still "catch" exceptions (although no need to await anything you send)
  wsClient
    .sendWSAPIRequest(WS_KEY_MAP.v5PrivateTrade, 'order.create', {
      symbol: 'BTCUSDT',
      side: 'Buy',
      orderType: 'Limit',
      price: '50000',
      qty: '1',
      category: 'linear',
    })
    .catch((e) => console.error('Step 1: Order submit exception: ', e));

  console.log('Step 1: Create order sent...');

  //
  setTimeout(() => {
    console.log('Step 2: Amend an order');

    // Fire and forget the order.amend command
    // For simplicity, the orderId is hardcoded here (and will probably not work)
    wsClient
      .sendWSAPIRequest(WS_KEY_MAP.v5PrivateTrade, 'order.amend', {
        symbol: 'BTCUSDT',
        category: 'linear',
        orderId: '1234567',
        price: '55000',
      })
      .catch((e) => console.error('Step 2: Amend order exception: ', e));

    console.log('Step 2: Amend order sent...');
  }, AMEND_AFTER_SECONDS * 1000);

  //
  setTimeout(() => {
    console.log('Step 3: Cancel an order');

    // Fire and forget the order.cancel command
    // For simplicity, the orderId is hardcoded here (and will probably not work)
    wsClient
      .sendWSAPIRequest(WS_KEY_MAP.v5PrivateTrade, 'order.cancel', {
        category: 'linear',
        symbol: 'BTCUSDT',
        orderId: '1234567',
      })
      .catch((e) => console.error('Step 3: Cancel order exception: ', e));

    console.log('Step 3: Cancel order sent...');
  }, CANCEL_AFTER_SECONDS * 1000);
}

// Start executing the example workflow
main();
