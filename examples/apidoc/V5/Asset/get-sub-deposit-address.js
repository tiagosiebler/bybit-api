const { RestClientV5 } = require('bybit-api');

const client = new RestClientV5({
  testnet: true,
  key: 'apikey',
  secret: 'apisecret',
});

client
  .getSubDepositAddress('USDT', 'TRX', '592334')
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
