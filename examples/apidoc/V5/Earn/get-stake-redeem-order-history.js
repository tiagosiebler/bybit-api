const { RestClientV5 } = require('bybit-api');

const client = new RestClientV5({
  testnet: true,
  key: 'apikey',
  secret: 'apisecret',
});

client
  .getEarnOrderHistory({
    category: 'FlexibleSaving',
    orderId: '0572b030-6a0b-423f-88c4-b6ce31c0c82d',
  })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
