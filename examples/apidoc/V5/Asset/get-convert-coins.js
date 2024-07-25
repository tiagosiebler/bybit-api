const { RestClientV5 } = require('bybit-api');

const client = new RestClientV5({
  testnet: true,
  key: 'apikey',
  secret: 'apisecret',
});

client
  .getConvertCoins({ accountType: 'eb_convert_spot' })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
