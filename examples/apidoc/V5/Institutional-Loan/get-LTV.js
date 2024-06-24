// https://api.bybit.com/v5/ins-loan/ltv-convert

const { RestClientV5 } = require('bybit-api');

const client = new RestClientV5({
  testnet: true,
  key: 'apikey',
  secret: 'apisecret',
});

client
  .getInstitutionalLendingLTVWithLadderConversionRate()
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
