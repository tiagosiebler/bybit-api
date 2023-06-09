const { RestClientV5 } = require('bybit-api');

const client = new RestClientV5({
  testnet: true,
  key: 'apikey',
  secret: 'apisecret',
});

client
  .createSubUIDAPIKey({
    subuid: 53888000,
    note: 'testxxx',
    readOnly: 0,
    permissions: {
      Wallet: ['AccountTransfer'],
    },
  })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
