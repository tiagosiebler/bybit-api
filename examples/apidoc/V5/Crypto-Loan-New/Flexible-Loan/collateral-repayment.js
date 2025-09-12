import { RestClientV5 } from 'bybit-api';
// or:
// const { RestClientV5 } = require('bybit-api');

const client = new RestClientV5({
  testnet: true,
  key: 'YOUR_API_KEY',
  secret: 'YOUR_API_SECRET',
});

client.repayCollateralFlexible({
    loanCurrency: "USDT",
    amount: "500",
    collateralCoin: "BTC"
  })
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.error('Error:', error);
  });