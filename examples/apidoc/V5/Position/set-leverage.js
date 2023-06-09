const { RestClientV5 } = require('bybit-api');

const client = new RestClientV5({
  testnet: true,
  key: 'apikey',
  secret: 'apisecret',
});

client
  .setLeverage({
    category: 'linear',
    symbol: 'BTCUSDT',
    buyLeverage: '6',
    sellLeverage: '6',
  })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
