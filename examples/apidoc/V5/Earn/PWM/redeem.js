import { RestClientV5 } from 'bybit-api';
// or, if require is preferred:
// const { RestClientV5 } = require('bybit-api');

const client = new RestClientV5({
  testnet: true,
  key: 'apikey',
  secret: 'apisecret',
});

client
  .redeemPwmInvestmentPlan({
    planId: '10001',
    category: 'equityFund',
    productId: '2001',
    shares: '3000',
    orderLinkId: 'xxx',
  })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
