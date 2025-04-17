const { RestClientV5 } = require('bybit-api');

const client = new RestClientV5({
  testnet: true,
  key: 'apiKey',
  secret: 'apiSecret',
});

client
  .getSpreadOrderHistory({
    orderId: '5e010c35-2b44-4f03-8081-8fa31fb73376',
  })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
