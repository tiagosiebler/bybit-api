// https://api.bybit.com/v5/spot-margin-trade/state

import { RestClientV5 } from 'bybit-api';
// or, if require is preferred:
// const { RestClientV5 } = require('bybit-api');

const client = new RestClientV5({
  testnet: true,
  key: 'apikey',
  secret: 'apisecret',
});

client
  .getSpotMarginState()
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
