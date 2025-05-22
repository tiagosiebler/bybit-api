import { DefaultLogger, WebsocketAPIClient } from '../src';

// or
// import { DefaultLogger, WebsocketClient } from 'bybit-api';

const key = process.env.API_KEY_COM;
const secret = process.env.API_SECRET_COM;

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
      // demoTrading: false, // note: As of Jan 2025, demo trading does NOT support the WS API
    },
    logger, // Optional: inject a custom logger
  );

  // To do: Check if this is how listeners are handled

  wsClient.getWSClient().on('update', (data) => {
    console.log('raw message received ', JSON.stringify(data));
  });

  wsClient.getWSClient().on('open', (data) => {
    console.log('ws connected', data.wsKey);
  });
  wsClient.getWSClient().on('reconnect', ({ wsKey }) => {
    console.log('ws automatically reconnecting.... ', wsKey);
  });
  wsClient.getWSClient().on('reconnected', (data) => {
    console.log('ws has reconnected ', data?.wsKey);
  });
  wsClient.getWSClient().on('authenticated', (data) => {
    console.log('ws has authenticated ', data?.wsKey);
  });

  // Optional, if you see RECV Window errors, you can use this to manage time issues.
  // ! However, make sure you sync your system clock first!
  // https://github.com/tiagosiebler/awesome-crypto-examples/wiki/Timestamp-for-this-request-is-outside-of-the-recvWindow
  // wsClient.setTimeOffsetMs(-5000);

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
