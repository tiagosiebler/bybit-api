const { RestClientV5 } = require('bybit-api');

const client = new RestClientV5({
  testnet: true,
  key: 'apikey',
  secret: 'apisecret',
});

client
  .getLoanLTVAdjustmentHistory({ adjustId: '1794271131730737664' })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
