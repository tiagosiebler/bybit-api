import { RestClientV5 } from 'bybit-api';
// or:
// const { RestClientV5 } = require('bybit-api');

const client = new RestClientV5({
  testnet: true,
  key: 'YOUR_API_KEY',
  secret: 'YOUR_API_SECRET',
});

client.borrowFlexible({
  loanCurrency: 'BTC',
  loanAmount: '0.1',
  collateralList: [
    {
      currency: 'USDT',
      amount: '1000',
    },
    {
      currency: 'ETH',
      amount: '1',
    },
  ],
})
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.error('Error:', error);
  });
