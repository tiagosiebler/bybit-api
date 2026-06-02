import { RestClientV5 } from 'bybit-api';
// or, if require is preferred:
// const { RestClientV5 } = require('bybit-api');

const client = new RestClientV5({
  testnet: true,
  key: 'apikey',
  secret: 'apisecret',
});

client
  .createStrategyOrder({
    side: 'Buy',
    symbol: 'BTCUSDT',
    reduceOnly: false,
    category: 'UTA_USDT',
    size: '0.1',
    positionIdx: 1,
    strategyType: 'chaseOrder',
    chasePrice: '75967.7',
    maxChasePrice: '83564.5',
    triggerPrice: '75000.0',
  })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
