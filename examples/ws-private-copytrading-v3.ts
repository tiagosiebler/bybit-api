/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { DefaultLogger, WS_KEY_MAP, WebsocketClient } from '../src';

// or
// import { DefaultLogger, WS_KEY_MAP, WebsocketClient } from 'bybit-api';

const logger = {
  ...DefaultLogger,
  silly: (...params) => {
    // console.log(params);
  },
};

const key = process.env.API_KEY;
const secret = process.env.API_SECRET;

/**
 * Copy trading api docs say that private topics should connect to: wss://stream.bybit.com/realtime_private
 *
 * Within this SDK, only the market `linear` uses this endpoint for private topics:
 */
const market = 'linear';

const wsClient = new WebsocketClient(
  {
    key: key,
    secret: secret,
    market: market,
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

// copy trading topics from api docs: https://bybit-exchange.github.io/docs/copy-trade/ws-private/position
wsClient.subscribe([
  'copyTradePosition',
  'copyTradeOrder',
  'copyTradeExecution',
  'copyTradeWallet',
]);
