const { RestClientV5 } = require('bybit-api');

const client = new RestClientV5({
  testnet: true,
  key: 'apikey',
  secret: 'apisecret',
});

client
  .getRepaymentHistory({ repayId: '1794271131730737664' })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
