import { RestClientV5 } from 'bybit-api';
// or:
// const { RestClientV5 } = require('bybit-api');

const client = new RestClientV5({
  testnet: true,
});

client.getLoanBorrowableCoins({
  currency: 'ETH',
  vipLevel: 'VIP5',
})
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.error('Error:', error);
  });
