import { DefaultLogger, RestClientV5, WebsocketClient } from '../src/index';

// or
// import { RestClientV5 } from 'bybit-api';

const key = process.env.API_KEY_COM;
const secret = process.env.API_SECRET_COM;

/**
 *
 *
 * This example demonstrates how to use Bybit's demo trading functionality, both for REST and WS.
 *
 * Refer to the API docs for more information: https://bybit-exchange.github.io/docs/v5/demo
 *
 *
 */

const restClient = new RestClientV5({
  key: key,
  secret: secret,
  parseAPIRateLimits: true,
  /**
   * Set this to true to enable demo trading:
   */
  demoTrading: true,
});

// Optional, uncomment the "silly" override to log a lot more info about what the WS client is doing
const customLogger = {
  ...DefaultLogger,
  // silly: (...params) => console.log('trace', ...params),
};

const wsClient = new WebsocketClient(
  {
    key: key,
    secret: secret,
    market: 'v5',
    /**
     * Set this to true to enable demo trading for the private account data WS
     * Topics: order,execution,position,wallet,greeks
     */
    demoTrading: true,
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
    websocketClient.on('error', (data) => {
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
