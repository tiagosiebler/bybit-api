import { RestClientV5 } from 'bybit-api';
// or, if require is preferred:
// const { RestClientV5 } = require('bybit-api');

const client = new RestClientV5({
  testnet: true,
  key: 'YOUR_API_KEY',
  secret: 'YOUR_API_SECRET',
});

client
  .getMaxCollateralAmount({
    currency: 'BTC',
  })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
