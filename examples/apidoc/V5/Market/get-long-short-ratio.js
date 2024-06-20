const { RestClientV5 } = require('bybit-api');

const client = new RestClientV5({
  testnet: true,
});

client
  .getLongShortRatio({
    category: 'linear',
    symbol: 'BTCUSDT',
    period: '1h',
    limit: 100,
  })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
