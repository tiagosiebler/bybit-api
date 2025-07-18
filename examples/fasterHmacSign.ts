import { createHmac } from 'crypto';

import { DefaultLogger, RestClientV5, WebsocketClient } from '../src/index';

// or
// import { createHmac } from 'crypto';
// import { DefaultLogger, RestClientV5, WebsocketClient } from 'bybit-api';

/**
 * Injecting a custom signMessage function.
 *
 * As of version 4.0.0 of the bybit-api Node.js/TypeScript/JavaScript
 * SDK for Bybit, the SDK uses the Web Crypto API for signing requests.
 * While it is compatible with Node and Browser environments, it is
 * slightly slower than using Node's native crypto module (only
 * available in backend Node environments).
 *
 * For latency sensitive users, you can inject the previous node crypto sign
 * method (or your own even faster-implementation), if this change affects you.
 *
 * This example demonstrates how to inject a custom sign function, to achieve
 * the same peformance as seen before the Web Crypto API was introduced.
 *
 * For context on standard usage, the "signMessage" function is used:
 * - During every single API call
 * - After opening a new private WebSocket connection
 *
 */

const key = process.env.API_KEY_COM;
const secret = process.env.API_SECRET_COM;

const restClient = new RestClientV5({
  key: key,
  secret: secret,
  parseAPIRateLimits: true,
  /**
   * Set this to true to enable demo trading:
   */
  demoTrading: true,
  /**
   * Overkill in almost every case, but if you need any optimisation available,
   * you can inject a faster sign mechanism such as node's native createHmac:
   */
  customSignMessageFn: async (message, secret) => {
    return createHmac('sha256', secret).update(message).digest('hex');
  },
});

// Optional, uncomment the "trace" override to log a lot more info about what the WS client is doing
const customLogger = {
  ...DefaultLogger,
  // trace: (...params) => console.log('trace', ...params),
};

const wsClient = new WebsocketClient(
  {
    key: key,
    secret: secret,
    /**
     * Set this to true to enable demo trading for the private account data WS
     * Topics: order,execution,position,wallet,greeks
     */
    demoTrading: true,
    /**
     * Overkill in almost every case, but if you need any optimisation available,
     * you can inject a faster sign mechanism such as node's native createHmac:
     */
    customSignMessageFn: async (message, secret) => {
      return createHmac('sha256', secret).update(message).digest('hex');
    },
  },
  customLogger,
);

function setWsClientEventListeners(
  websocketClient: WebsocketClient,
  accountRef: string,
): Promise<void> {
  return new Promise((resolve) => {
    websocketClient.on('update', (data) => {
      console.log(new Date(), accountRef, 'data ', JSON.stringify(data));
      // console.log('raw message received ', JSON.stringify(data, null, 2));
    });

    websocketClient.on('open', (data) => {
      console.log(
        new Date(),
        accountRef,
        'connection opened open:',
        data.wsKey,
      );
    });
    websocketClient.on('response', (data) => {
      console.log(
        new Date(),
        accountRef,
        'log response: ',
        JSON.stringify(data, null, 2),
      );

      if (typeof data.req_id === 'string') {
        const topics = data.req_id.split(',');
        if (topics.length) {
          console.log(new Date(), accountRef, 'Subscribed to topics: ', topics);
          return resolve();
        }
      }
    });
    websocketClient.on('reconnect', ({ wsKey }) => {
      console.log(
        new Date(),
        accountRef,
        'ws automatically reconnecting.... ',
        wsKey,
      );
    });
    websocketClient.on('reconnected', (data) => {
      console.log(new Date(), accountRef, 'ws has reconnected ', data?.wsKey);
    });
    websocketClient.on('exception', (data) => {
      console.error(new Date(), accountRef, 'ws exception: ', data);
    });
  });
}

(async () => {
  try {
    const onSubscribed = setWsClientEventListeners(wsClient, 'demoAcc');

    wsClient.subscribeV5(['position', 'execution', 'wallet'], 'linear');

    // Simple promise to ensure we're subscribed before trying anything else
    await onSubscribed;

    // Start trading
    const balResponse1 = await restClient.getWalletBalance({
      accountType: 'UNIFIED',
    });
    console.log('balResponse1: ', JSON.stringify(balResponse1, null, 2));

    const demoFunds = await restClient.requestDemoTradingFunds();
    console.log('requested demo funds: ', demoFunds);

    const balResponse2 = await restClient.getWalletBalance({
      accountType: 'UNIFIED',
    });
    console.log('balResponse2: ', JSON.stringify(balResponse2, null, 2));

    /** Simple examples for private REST API calls with bybit's V5 REST APIs */
    const response = await restClient.getPositionInfo({
      category: 'linear',
      symbol: 'BTCUSDT',
    });

    console.log('response:', response);

    // Trade USDT linear perps
    const buyOrderResult = await restClient.submitOrder({
      category: 'linear',
      symbol: 'BTCUSDT',
      orderType: 'Market',
      qty: '1',
      side: 'Buy',
    });
    console.log('buyOrderResult:', buyOrderResult);

    const sellOrderResult = await restClient.submitOrder({
      category: 'linear',
      symbol: 'BTCUSDT',
      orderType: 'Market',
      qty: '1',
      side: 'Sell',
    });
    console.log('sellOrderResult:', sellOrderResult);

    const balResponse3 = await restClient.getWalletBalance({
      accountType: 'UNIFIED',
    });
    console.log('balResponse2: ', JSON.stringify(balResponse3, null, 2));
  } catch (e) {
    console.error('request failed: ', e);
  }
})();
