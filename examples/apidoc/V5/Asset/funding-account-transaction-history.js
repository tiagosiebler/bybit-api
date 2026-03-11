// https://api.bybit.com/v5/asset/fundinghistory

const { RestClientV5 } = require('bybit-api');

const client = new RestClientV5({
  testnet: true,
  key: 'apikey',
  secret: 'apisecret',
});

client
  .getFundingAccountTransactionHistory({
    limit: '1',
    cursor: 'MTM3MTU3OTk=',
  })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
