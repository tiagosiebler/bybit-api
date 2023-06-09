const { RestClientV5 } = require('bybit-api');

const client = new RestClientV5({
  testnet: true,
  key: 'apikey',
  secret: 'apisecret',
});

client
  .getDeliveryRecord({ category: 'option', expDate: '29DEC22' })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
