const { RestClientV5 } = require('bybit-api');

const client = new RestClientV5({
  testnet: true,
  key: 'apikey',
  secret: 'apisecret',
});

client
  .getSpreadMaxQty({
    symbol: 'SOLUSDT_SOL/USDT',
    side: '1',
    orderPrice: '50000',
  })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
