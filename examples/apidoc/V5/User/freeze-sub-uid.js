const { RestClientV5 } = require('bybit-api');

const client = new RestClientV5({
  testnet: true,
  key: 'apikey',
  secret: 'apisecret',
});

client
  .setSubUIDFrozenState(53888001, 1)
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
