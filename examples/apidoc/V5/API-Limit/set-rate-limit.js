import { RestClientV5 } from 'bybit-api';
// or, if require is preferred:
// const { RestClientV5 } = require('bybit-api');

const client = new RestClientV5({
  testnet: true,
  key: 'apikey',
  secret: 'apisecret',
});

client
  .setApiRateLimit({
    list: [
      {
        uids: '1234567890',
        bizType: 'spot',
        rate: 100, // Changed from 'limit' to 'rate'
      },
      {
        uids: '1234567891',
        bizType: 'linear',
        rate: 150,
      },
    ],
  })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
