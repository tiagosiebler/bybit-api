const { RestClientV5 } = require('bybit-api');

const client = new RestClientV5({
  testnet: true,
  key: 'apikey',
  secret: 'apisecret',
});

client
  .borrowCryptoLoan({
    loanCurrency: 'USDT',
    loanAmount: '550',
    collateralCurrency: 'BTC',
    loanTerm: null,
    collateralAmount: null,
  })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
