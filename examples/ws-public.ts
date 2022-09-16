import { DefaultLogger, WS_KEY_MAP, WebsocketClient } from '../src';

// or
// import { DefaultLogger, WS_KEY_MAP, WebsocketClient } from 'bybit-api';

(async () => {
  const logger = {
    ...DefaultLogger,
    // silly: () => {},
  };

  const wsClient = new WebsocketClient(
    {
      // key: key,
      // secret: secret,
      // market: 'linear',
      // market: 'inverse',
      // market: 'spot',
      market: 'usdcOption',
    },
    logger
  );

  wsClient.on('update', (data) => {
    console.log('raw message received ', JSON.stringify(data, null, 2));
  });

  wsClient.on('open', (data) => {
    console.log('connection opened open:', data.wsKey);

    if (data.wsKey === WS_KEY_MAP.spotPublic) {
      // Spot public.
      // wsClient.subscribePublicSpotTrades('BTCUSDT');
      // wsClient.subscribePublicSpotTradingPair('BTCUSDT');
      // wsClient.subscribePublicSpotV1Kline('BTCUSDT', '1m');
      // wsClient.subscribePublicSpotOrderbook('BTCUSDT', 'full');
    }
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

  // Inverse
  // wsClient.subscribe('trade');

  // Linear
  wsClient.subscribe('trade.BTCUSDT');

  // usdc options
  wsClient.subscribe(`recenttrades.BTC`);
  wsClient.subscribe(`recenttrades.ETH`);
  wsClient.subscribe(`recenttrades.SOL`);

  // setTimeout(() => {
  //   console.log('unsubscribing');
  //   wsClient.unsubscribe('trade.BTCUSDT');
  // }, 5 * 1000);

  // For spot, request public connection first then send required topics on 'open'
  // wsClient.connectPublic();
})();
