const { RestClientV5 } = require('bybit-api');

const client = new RestClientV5({
  testnet: true,
  key: 'apikey',
  secret: 'apisecret',
});

client
  .issueBrokerVoucher({
    accountId: '2846381',
    awardId: '123456',
    specCode: 'award-001',
    amount: '100',
    brokerId: 'v-28478',
  })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
