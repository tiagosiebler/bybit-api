import { RestClientV5 } from 'bybit-api';
// or:
// const { RestClientV5 } = require('bybit-api');

const client = new RestClientV5({
  testnet: true,
  key: 'YOUR_API_KEY',
  secret: 'YOUR_API_SECRET',
});

client.repayCollateralFixed({
    loanCurrency: "ETH",
    amount: "0.1",  
    collateralCoin:"USDT"
  })
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.error('Error:', error);
  });