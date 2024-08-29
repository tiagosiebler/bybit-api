const { RestClientV5 } = require('bybit-api');

const client = new RestClientV5({
  testnet: true,
  key: 'apikey',
  secret: 'apisecret',
});

client
  .getHistoricalInterestRate({
    currency: 'USDC',
    vipLevel: 'No VIP',
    startTime: 1721458800000,
    endTime: 1721469600000,
  })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
