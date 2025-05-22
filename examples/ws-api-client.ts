import { DefaultLogger, WebsocketAPIClient } from '../src';

// or
// import { DefaultLogger, WebsocketAPIClient } from 'bybit-api';
// const { DefaultLogger, WebsocketAPIClient } = require('bybit-api');

const key = process.env.API_KEY_COM;
const secret = process.env.API_SECRET_COM;

// function attachEventHandlers<TWSClient extends WebsocketClient>(
//   wsClient: TWSClient,
// ): void {
//   wsClient.on('update', (data) => {
//     console.log('raw message received ', JSON.stringify(data));
//   });
//   wsClient.on('open', (data) => {
//     console.log('ws connected', data.wsKey);
//   });
//   wsClient.on('reconnect', ({ wsKey }) => {
//     console.log('ws automatically reconnecting.... ', wsKey);
//   });
//   wsClient.on('reconnected', (data) => {
//     console.log('ws has reconnected ', data?.wsKey);
//   });
//   wsClient.on('authenticated', (data) => {
//     console.log('ws has authenticated ', data?.wsKey);
//   });
// }

async function main() {
  // Optional
  const logger = {
    ...DefaultLogger,
    // For a more detailed view of the WebsocketClient, enable the `trace` level by uncommenting the below line:
    // trace: (...params) => console.log('trace', ...params),
  };

  const wsClient = new WebsocketAPIClient(
    {
      key: key,
      secret: secret,
      // testnet: true, // Whether to use the testnet environment: https://testnet.bybit.com/app/user/api-management

      // Whether to use the livenet demo trading environment
      // Note: As of Jan 2025, demo trading only supports consuming events, it does
      // NOT support the WS API.
      // demoTrading: false,

      // If you want your own event handlers instead of the default ones with logs,
      // disable this setting and see the `attachEventHandlers` example below:
      // attachEventListeners: false
    },
    logger, // Optional: inject a custom logger
  );

  // Optional, see above "attachEventListeners". Attach basic event handlers, so nothing is left unhandled
  // attachEventHandlers(wsClient.getWSClient());

  // Optional, if you see RECV Window errors, you can use this to manage time issues.
  // ! However, make sure you sync your system clock first!
  // https://github.com/tiagosiebler/awesome-crypto-examples/wiki/Timestamp-for-this-request-is-outside-of-the-recvWindow
  // wsClient.setTimeOffsetMs(-5000);

  // Optional: prepare the WebSocket API connection in advance.
  // This happens automatically but you can do this early before making any API calls, to prevent delays from a cold start.
  // await wsClient.getWSClient().connectWSAPI();

  try {
    const response = await wsClient.submitNewOrder({
      category: 'linear',
      symbol: 'BTCUSDT',
      orderType: 'Limit',
      qty: '0.001',
      side: 'Buy',
      price: '50000',
    });
    console.log('submitNewOrder response: ', response);
  } catch (e) {
    console.log('submitNewOrder error: ', e);
  }

  try {
    const response = await wsClient.amendOrder({
      category: 'linear',
      symbol: 'BTCUSDT',
      orderId: 'b4b9e205-793c-4777-8112-0bf3c2d26b6e',
      qty: '0.001',
      price: '60000',
    });
    console.log('amendOrder response: ', response);
  } catch (e) {
    console.log('amendOrder error: ', e);
  }

  try {
    const response = await wsClient.cancelOrder({
      category: 'linear',
      symbol: 'BTCUSDT',
      orderId: 'b4b9e205-793c-4777-8112-0bf3c2d26b6e',
    });
    console.log('cancelOrder response: ', response);
  } catch (e) {
    console.log('cancelOrder error: ', e);
  }

  try {
    const response = await wsClient.batchSubmitOrders('linear', [
      {
        symbol: 'BTCUSDT',
        orderType: 'Limit',
        qty: '0.001',
        side: 'Buy',
        price: '50000',
      },
      {
        symbol: 'BTCUSDT',
        orderType: 'Limit',
        qty: '0.001',
        side: 'Buy',
        price: '60000',
      },
      {
        symbol: 'BTCUSDT',
        orderType: 'Limit',
        qty: '0.001',
        side: 'Buy',
        price: '70000',
      },
    ]);
    console.log('batchSubmitOrders response: ', response);
  } catch (e) {
    console.log('batchSubmitOrders error: ', e);
  }

  try {
    const response = await wsClient.batchAmendOrder('linear', [
      {
        symbol: 'BTCUSDT',
        orderId: '2473ee58',
        price: '80000',
      },
      {
        symbol: 'BTCUSDT',
        orderId: 'b4b9e205-793c-4777-8112-0bf3c2d26b6e',
        price: '80000',
      },
    ]);
    console.log('batchAmendOrder response: ', response);
  } catch (e) {
    console.log('batchAmendOrder error: ', e);
  }

  try {
    const response = await wsClient.batchCancelOrder('linear', [
      {
        symbol: 'BTCUSDT',
        orderId: '2473ee58',
      },
      {
        symbol: 'BTCUSDT',
        orderId: 'b4b9e205-793c-4777-8112-0bf3c2d26b6e',
      },
    ]);
    console.log('batchCancelOrder response: ', response);
  } catch (e) {
    console.log('batchCancelOrder error: ', e);
  }
}

main();
