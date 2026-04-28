import { RestClientV5 } from 'bybit-api';
// or, if require is preferred:
// const { RestClientV5 } = require('bybit-api');

const client = new RestClientV5({
  testnet: true,
  key: 'apiKey',
  secret: 'apiSecret',
});

client
  .cancelAllSpreadOrders()
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
