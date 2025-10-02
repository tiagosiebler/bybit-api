const { RestClientV5 } = require('bybit-api');

const client = new RestClientV5({
  testnet: true,
});

client
  .getRPIOrderbook({
    category: 'spot',
    symbol: 'BTCUSDT',
    limit: 50,
  })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
