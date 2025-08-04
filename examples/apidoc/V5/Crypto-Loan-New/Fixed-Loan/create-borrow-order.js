import { RestClientV5 } from 'bybit-api';
// or:
// const { RestClientV5 } = require('bybit-api');

const client = new RestClientV5({
  testnet: true,
  key: 'YOUR_API_KEY',
  secret: 'YOUR_API_SECRET',
});

client.createBorrowOrderFixed({
  orderCurrency: 'ETH',
  orderAmount: '1.5',
  annualRate: '0.022',
  term: '30',
  autoRepay: 'true',
  collateralList: [
    {
      currency: 'BTC',
      amount: '0.1',
    },
  ],
})
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.error('Error:', error);
  });
