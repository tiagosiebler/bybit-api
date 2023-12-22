/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { DefaultLogger, WS_KEY_MAP, WebsocketClient } from '../../src';

// or
// import { DefaultLogger, WS_KEY_MAP, WebsocketClient } from 'bybit-api';

const logger = {
  ...DefaultLogger,
  silly: () => {},
};

const key = process.env.API_KEY;
const secret = process.env.API_SECRET;

// USDT Perps:
// const market = 'linear';
// Inverse Perp
// const market = 'inverse';
// const market = 'spotv3';
// Contract v3
const market = 'contractUSDT';
// const market = 'contractInverse';

const wsClient = new WebsocketClient(
  {
    key: key,
    secret: secret,
    market: market,
    // testnet: true,
    restOptions: {
      // enable_time_sync: true,
    },
  },
  logger,
);

wsClient.on('update', (data) => {
  console.log('raw message received ', JSON.stringify(data, null, 2));
});

wsClient.on('open', (data) => {
  console.log('connection opened open:', data.wsKey);
});
wsClient.on('response', (data) => {
  console.log('ws response: ', JSON.stringify(data, null, 2));
});
wsClient.on('reconnect', ({ wsKey }) => {
  console.log('ws automatically reconnecting.... ', wsKey);
});
wsClient.on('reconnected', (data) => {
  console.log('ws has reconnected ', data?.wsKey);
});
wsClient.on('error', (data) => {
  console.error('ws exception: ', data);
});

// subscribe to private endpoints
// check the api docs in your api category to see the available topics
// wsClient.subscribe(['position', 'execution', 'order', 'wallet']);

// Contract v3
wsClient.subscribe([
  'user.position.contractAccount',
  'user.execution.contractAccount',
  'user.order.contractAccount',
  'user.wallet.contractAccount',
]);
