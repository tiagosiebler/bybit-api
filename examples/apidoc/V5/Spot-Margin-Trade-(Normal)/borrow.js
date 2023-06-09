const { RestClientV5 } = require('bybit-api');

const client = new RestClientV5({
  testnet: true,
  key: 'apikey',
  secret: 'apisecret',
});

client
  .spotMarginBorrow({ coin: 'ETH', qty: '10' })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
