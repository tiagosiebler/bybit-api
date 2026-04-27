import { RestClientV5 } from 'bybit-api';
// or, if require is preferred:
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
