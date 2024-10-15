const { RestClientV5 } = require('bybit-api');

const client = new RestClientV5({
  testnet: true,
  key: 'apikey',
  secret: 'apisecret',
});

client
  .getUnpaidLoanOrders({ orderId: '1793683005081680384' })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
