// https://api.bybit.com/v5/spot-margin-trade/set-auto-repay-mode

import { RestClientV5 } from 'bybit-api';
// or, if require is preferred:
// const { RestClientV5 } = require('bybit-api');

const client = new RestClientV5({
  testnet: true,
  key: 'apikey',
  secret: 'apisecret',
});

client
  .setAutoRepayMode({
    currency: 'ETH', // optional: if not passed, applies to all currencies
    autoRepayMode: '1', // 0: Off, 1: On
  })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
