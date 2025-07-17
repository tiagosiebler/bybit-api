import { isWsAllLiquidationEvent, RestClientV5, WebsocketClient } from '../src';

// or
// import {
//   RestClientV5,
//   WebsocketClient,
//   isWsAllLiquidationEvent,
// } from 'bybit-api';

function onAllLiquidationEvent(event) {
  console.log(
    new Date(),
    'allLiquidationEvent',
    JSON.stringify(event, null, 2),
  );
}

const wsClient = new WebsocketClient({});

wsClient.on('update', (data) => {
  if (isWsAllLiquidationEvent(data)) {
    return onAllLiquidationEvent(data);
  }

  console.log('raw unahndled message received ', JSON.stringify(data));
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

wsClient.on('exception', (data) => {
  console.error('ws exception: ', data);
});

/**
 *
 * If you want to receive data for all available symbols, this websocket topic
 * requires you to subscribe to each symbol individually.
 *
 * This can be easily automated by fetching a list of symbols via the REST client,
 * generating a list of topics (one per symbol), before simply passing an
 * array of topics to the websocket client per product group (linear & inverse perps).
 *
 */
async function start() {
  const restClientV5 = new RestClientV5();

  const allSymbolsV5ResultLinear = await restClientV5.getTickers({
    category: 'linear',
  });
  const allSymbolsV5ResultInverse = await restClientV5.getTickers({
    category: 'inverse',
  });

  const allLinearSymbols = allSymbolsV5ResultLinear.result.list.map(
    (ticker) => ticker.symbol,
  );
  const allInverseSymbols = allSymbolsV5ResultInverse.result.list.map(
    (ticker) => ticker.symbol,
  );

  console.log('all v5 linear symbols: ', JSON.stringify(allLinearSymbols));
  console.log('all v5 inverse symbols: ', JSON.stringify(allInverseSymbols));

  const TOPIC_NAME = 'allLiquidation';

  // Make an array of topics ready for submission
  const allLinearTopics = allLinearSymbols.map(
    (symbol) => `${TOPIC_NAME}.${symbol}`,
  );
  const inverseTopics = allInverseSymbols.map(
    (symbol) => `${TOPIC_NAME}.${symbol}`,
  );

  // subscribe to all linear symbols
  wsClient.subscribeV5(allLinearTopics, 'linear');

  // subscribe to all inverse symbols
  wsClient.subscribeV5(inverseTopics, 'inverse');
}

start().catch((e) => console.error('exception in main logic: ', e));
