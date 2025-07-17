/* eslint-disable @typescript-eslint/no-empty-function */
import { DefaultLogger, WebsocketClient, WS_KEY_MAP } from '../src';

// or
// import { DefaultLogger, WS_KEY_MAP, WebsocketClient } from 'bybit-api';

// Create & inject a custom logger to enable the trace logging level (empty function)
const logger = {
  ...DefaultLogger,
  // trace: (...params) => console.log('trace', ...params),
};

const key = process.env.API_KEY_COM;
const secret = process.env.API_SECRET_COM;

/**
 * Prepare an instance of the WebSocket client. This client handles all aspects of connectivity for you:
 * - Connections are opened when you subscribe to topics
 * - If key & secret are provided, authentication is handled automatically
 * - If you subscribe to topics from different v5 products (e.g. spot and linear perps),
 *    subscription events are automatically routed to the different ws endpoints on bybit's side
 * - Heartbeats/ping/pong/reconnects are all handled automatically.
 *    If a connection drops, the client will clean it up, respawn a fresh connection and resubscribe for you.
 */
const wsClient = new WebsocketClient(
  {
    key: key,
    secret: secret,
    // testnet: false,
    // demoTrading: false, // set testnet to false, if you plan on using demo trading
  },
  logger,
);

wsClient.on('update', (data) => {
  console.log('raw message received ', JSON.stringify(data));
  // console.log('raw message received ', JSON.stringify(data, null, 2));
});

wsClient.on('open', (data) => {
  console.log('connection opened open:', data.wsKey);
});
wsClient.on('response', (data) => {
  console.log('log response: ', JSON.stringify(data, null, 2));
});
wsClient.on('reconnect', ({ wsKey }) => {
  console.log('ws automatically reconnecting.... ', wsKey);
});
wsClient.on('reconnected', (data) => {
  console.log('ws has reconnected ', data?.wsKey);
});
// wsClient.on('exception', (data) => {
//   console.error('ws exception: ', data);
// });

/**
 * For private V5 topics, us the subscribeV5() method on the ws client or use the original subscribe() method.
 *
 * Note: for private endpoints the "category" field is ignored since there is only one private endpoint
 * (compared to one public one per category).
 * The "category" is only needed for public topics since bybit has one endpoint for public events per category.
 */

wsClient.subscribeV5('position', 'linear');
wsClient.subscribeV5(['order', 'wallet', 'greeks'], 'linear');

wsClient.subscribeV5('execution', 'linear');
// wsClient.subscribeV5('execution.fast', 'linear');
// wsClient.subscribeV5('execution.fast.linear', 'linear');

/**
 * The following has the same effect as above, since there's only one private endpoint for V5 account topics:
 */
// wsClient.subscribe('position');
// wsClient.subscribe('execution');
// wsClient.subscribe(['order', 'wallet', 'greek']);

// To unsubscribe from topics (after a 5 second delay, in this example):
// setTimeout(() => {
//   console.log('unsubscribing');
//   wsClient.unsubscribeV5('execution', 'linear');
// }, 5 * 1000);

// Topics are tracked per websocket type
// Get a list of subscribed topics (e.g. for public v3 spot topics) (after a 5 second delay)
setTimeout(() => {
  const activePrivateTopics = wsClient
    .getWsStore()
    .getTopics(WS_KEY_MAP.v5Private);
  console.log('Active private v5 topics: ', activePrivateTopics);

  const activePublicLinearTopics = wsClient
    .getWsStore()
    .getTopics(WS_KEY_MAP.v5LinearPublic);
  console.log('Active public linear v5 topics: ', activePublicLinearTopics);

  const activePublicSpotTopis = wsClient
    .getWsStore()
    .getTopics(WS_KEY_MAP.v5SpotPublic);
  console.log('Active public spot v5 topics: ', activePublicSpotTopis);

  const activePublicOptionsTopics = wsClient
    .getWsStore()
    .getTopics(WS_KEY_MAP.v5OptionPublic);
  console.log('Active public option v5 topics: ', activePublicOptionsTopics);
}, 5 * 1000);
