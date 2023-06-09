const { RestClientV5 } = require('bybit-api');

const client = new RestClientV5({
  testnet: true,
  key: 'apikey',
  secret: 'apisecret',
});

client
  .getAssetInfo({ accountType: 'FUND', coin: 'USDC' })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
