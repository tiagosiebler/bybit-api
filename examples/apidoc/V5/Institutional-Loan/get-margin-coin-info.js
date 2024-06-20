// https://api.bybit.com/v5/ins-loan/ensure-tokens-convert

const { RestClientV5 } = require('bybit-api');

const client = new RestClientV5({
  testnet: true,
  key: 'apikey',
  secret: 'apisecret',
});

client
  .getInstitutionalLendingMarginCoinInfoWithConversionRate({
    productId: '81',
  })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
