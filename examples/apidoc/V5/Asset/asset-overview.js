// https://api.bybit.com/v5/asset/asset-overview

const { RestClientV5 } = require('bybit-api');

const client = new RestClientV5({
  testnet: true,
  key: 'apikey',
  secret: 'apisecret',
});

client
  .getAssetOverview()
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
