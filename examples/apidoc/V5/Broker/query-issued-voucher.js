const { RestClientV5 } = require('bybit-api');

const client = new RestClientV5({
  testnet: true,
  key: 'apikey',
  secret: 'apisecret',
});

client
  .getBrokerVoucherSpec({
    accountId: '5714139',
    awardId: '189528',
    specCode: 'demo000',
    withUsedAmount: false,
})
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
