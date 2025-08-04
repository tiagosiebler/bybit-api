import { RestClientV5 } from 'bybit-api';
// or:
// const { RestClientV5 } = require('bybit-api');

const client = new RestClientV5({
  testnet: true,
  key: 'YOUR_API_KEY',
  secret: 'YOUR_API_SECRET',
});

client.repayFlexible({
  loanCurrency: 'BTC',
  amount: '0.005',
})
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.error('Error:', error);
  });
