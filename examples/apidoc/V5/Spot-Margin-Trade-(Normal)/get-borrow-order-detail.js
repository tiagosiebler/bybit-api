const { RestClientV5 } = require('bybit-api');

const client = new RestClientV5({
  testnet: true,
  key: 'apikey',
  secret: 'apisecret',
});

client
  .getSpotMarginBorrowOrderDetail({ coin: 'ETH', limit: 1, status: 2 })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
