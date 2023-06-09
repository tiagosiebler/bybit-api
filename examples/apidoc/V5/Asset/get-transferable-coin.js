const { RestClientV5 } = require('bybit-api');

const client = new RestClientV5({
  testnet: true,
  key: 'apikey',
  secret: 'apisecret',
});

client
  .getTransferableCoinList('UNIFIED', 'CONTRACT')
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
