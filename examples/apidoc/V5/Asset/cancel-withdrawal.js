const { RestClientV5 } = require('bybit-api');

const client = new RestClientV5({
  testnet: true,
  key: 'apikey',
  secret: 'apisecret',
});

client
  .cancelWithdrawal('10197')
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
