const { RestClientV5 } = require('bybit-api');

const client = new RestClientV5({
  testnet: true,
  key: 'apikey',
  secret: 'apisecret',
});

client
  .cancelOrder({
    category: 'linear',
    symbol: 'BTCPERP',
    orderId: 'c6f055d9-7f21-4079-913d-e6523a9cfffa',
  })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
