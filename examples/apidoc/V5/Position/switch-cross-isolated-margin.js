const { RestClientV5 } = require('bybit-api');

const client = new RestClientV5({
  testnet: true,
  key: 'apikey',
  secret: 'apisecret',
});

client
  .switchIsolatedMargin({
    category: 'linear',
    symbol: 'ETHUSDT',
    tradeMode: 1,
    buyLeverage: '10',
    sellLeverage: '10',
  })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
