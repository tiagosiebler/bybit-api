import { DefaultLogger } from '../src';
import { WebsocketClient, wsKeySpotPublic } from '../src/websocket-client';

// or
// import { DefaultLogger, WebsocketClient } from 'bybit-api';

(async () => {
  const logger = {
    ...DefaultLogger,
    // silly: () => {},
  };

  const wsClient = new WebsocketClient({
    // key: key,
    // secret: secret,
    // market: 'inverse',
    // market: 'linear',
    market: 'spot',
  }, logger);

  wsClient.on('update', (data) => {
    console.log('raw message received ', JSON.stringify(data, null, 2));
  });

  wsClient.on('open', (data) => {
    console.log('connection opened open:', data.wsKey);

    if (data.wsKey === wsKeySpotPublic) {
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
    console.log('ws has reconnected ', data?.wsKey );
  });

  // Inverse
  // wsClient.subscribe('trade');

  // Linear
  // wsClient.subscribe('trade.BTCUSDT');

  // For spot, request public connection first then send required topics on 'open'
  // wsClient.connectPublic();

})();
