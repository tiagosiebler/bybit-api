import { DefaultLogger, WS_KEY_MAP, WebsocketClient } from '../src';

// or
// import { DefaultLogger, WS_KEY_MAP, WebsocketClient } from 'bybit-api';

(async () => {
  const logger = {
    ...DefaultLogger,
    silly: (...params) => console.log('silly', ...params),
  };

  const wsClient = new WebsocketClient(
    {
      // key: key,
      // secret: secret,
      // market: 'linear',
      // market: 'inverse',
      // market: 'spot',
      market: 'spotv3',
      // market: 'usdcOption',
      // market: 'usdcPerp',
      // market: 'unifiedPerp',
      // market: 'unifiedOption',
    },
    logger
  );

  wsClient.on('update', (data) => {
    console.log('raw message received ', JSON.stringify(data));
    // console.log('raw message received ', JSON.stringify(data, null, 2));
  });

  wsClient.on('open', (data) => {
    console.log('connection opened open:', data.wsKey);

    // if (data.wsKey === WS_KEY_MAP.spotPublic) {
    //   // Spot public, but not recommended - use spotv3 client instead
    //   // The old spot websockets dont automatically resubscribe if they disconnect
    //   // wsClient.subscribePublicSpotTrades('BTCUSDT');
    //   // wsClient.subscribePublicSpotTradingPair('BTCUSDT');
    //   // wsClient.subscribePublicSpotV1Kline('BTCUSDT', '1m');
    //   // wsClient.subscribePublicSpotOrderbook('BTCUSDT', 'full');
    // }
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
  // wsClient.subscribe('trade.BTCUSDT');

  // Spot V3
  wsClient.subscribe('trade.BTCUSDT');
  // Or an array of topics
  // wsClient.subscribe([
  //   'orderbook.40.BTCUSDT',
  //   'orderbook.40.BTCUSDC',
  //   'orderbook.40.USDCUSDT',
  //   'orderbook.40.BTCDAI',
  //   'orderbook.40.DAIUSDT',
  //   'orderbook.40.ETHUSDT',
  //   'orderbook.40.ETHUSDC',
  //   'orderbook.40.ETHDAI',
  //   'orderbook.40.XRPUSDT',
  //   'orderbook.40.XRPUSDC',
  //   'orderbook.40.EOSUSDT',
  //   'orderbook.40.EOSUSDC',
  //   'orderbook.40.DOTUSDT',
  //   'orderbook.40.DOTUSDC',
  //   'orderbook.40.XLMUSDT',
  //   'orderbook.40.XLMUSDC',
  //   'orderbook.40.LTCUSDT',
  //   'orderbook.40.LTCUSDC',
  //   'orderbook.40.DOGEUSDT',
  //   'orderbook.40.DOGEUSDC',
  //   'orderbook.40.BITUSDT',
  //   'orderbook.40.BITUSDC',
  //   'orderbook.40.BITDAI',
  //   'orderbook.40.CHZUSDT',
  //   'orderbook.40.CHZUSDC',
  //   'orderbook.40.MANAUSDT',
  //   'orderbook.40.MANAUSDC',
  //   'orderbook.40.LINKUSDT',
  //   'orderbook.40.LINKUSDC',
  //   'orderbook.40.ICPUSDT',
  //   'orderbook.40.ICPUSDC',
  //   'orderbook.40.ADAUSDT',
  //   'orderbook.40.ADAUSDC',
  //   'orderbook.40.SOLUSDC',
  //   'orderbook.40.SOLUSDT',
  //   'orderbook.40.MATICUSDC',
  //   'orderbook.40.MATICUSDT',
  //   'orderbook.40.SANDUSDC',
  //   'orderbook.40.SANDUSDT',
  //   'orderbook.40.LUNCUSDC',
  //   'orderbook.40.LUNCUSDT',
  //   'orderbook.40.SLGUSDC',
  //   'orderbook.40.SLGUSDT',
  //   'orderbook.40.AVAXUSDC',
  //   'orderbook.40.AVAXUSDT',
  //   'orderbook.40.OPUSDC',
  //   'orderbook.40.OPUSDT',
  //   'orderbook.40.OKSEUSDC',
  //   'orderbook.40.OKSEUSDT',
  //   'orderbook.40.APEXUSDC',
  //   'orderbook.40.APEXUSDT',
  //   'orderbook.40.TRXUSDC',
  //   'orderbook.40.TRXUSDT',
  //   'orderbook.40.GMTUSDC',
  //   'orderbook.40.GMTUSDT',
  //   'orderbook.40.SHIBUSDC',
  //   'orderbook.40.SHIBUSDT',
  //   'orderbook.40.LDOUSDC',
  //   'orderbook.40.LDOUSDT',
  //   'orderbook.40.APEUSDC',
  //   'orderbook.40.APEUSDT',
  //   'orderbook.40.FILUSDC',
  //   'orderbook.40.FILUSDT',
  // ]);

  // usdc options
  // wsClient.subscribe([
  //   `recenttrades.BTC`,
  //   `recenttrades.ETH`,
  //   `recenttrades.SOL`,
  // ]);

  // usdc perps
  // wsClient.subscribe('trade.BTCPERP');

  // unified perps
  // wsClient.subscribe('publicTrade.BTCUSDT');

  // For spot v1 (the old, deprecated client), request public connection first then send required topics on 'open'
  // Not necessary for spot v3
  // wsClient.connectPublic();

  // To unsubscribe from topics (after a 5 second delay, in this example):
  // setTimeout(() => {
  //   console.log('unsubscribing');
  //   wsClient.unsubscribe('trade.BTCUSDT');
  // }, 5 * 1000);

  // Topics are tracked per websocket type
  // Get a list of subscribed topics (e.g. for public v3 spot topics) (after a 5 second delay)
  setTimeout(() => {
    const publicSpotTopics = wsClient
      .getWsStore()
      .getTopics(WS_KEY_MAP.spotV3Public);

    console.log('public spot topics: ', publicSpotTopics);

    const privateSpotTopics = wsClient
      .getWsStore()
      .getTopics(WS_KEY_MAP.spotV3Private);
    console.log('private spot topics: ', privateSpotTopics);
  }, 5 * 1000);
})();
