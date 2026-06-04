import { RestClientV5 } from 'bybit-api';
// or, if require is preferred:
// const { RestClientV5 } = require('bybit-api');

const client = new RestClientV5({
  testnet: true,
  key: 'apikey',
  secret: 'apisecret',
});

client
  .investMorePwmInvestmentPlan({
    planId: '10001',
    accountType: 'FUND',
    category: 'equityFund',
    productId: '2001',
    amount: '20000.00',
    orderLinkId: 'xxx',
  })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
