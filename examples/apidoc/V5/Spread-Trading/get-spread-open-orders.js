const { RestClientV5 } = require('bybit-api');

const client = new RestClientV5({
  testnet: true,
  key: 'apiKey',
  secret: 'apiSecret',
});

client
  .getSpreadOpenOrders()
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
