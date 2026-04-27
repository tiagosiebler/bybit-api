// https://api.bybit.com/v5/broker/account-info

import { RestClientV5 } from 'bybit-api';
// or, if require is preferred:
// const { RestClientV5 } = require('bybit-api');

const client = new RestClientV5({
  testnet: true,
  key: 'apikey',
  secret: 'apisecret',
});

client
  .getAffiliateUserInfo({ uid: '1234567890' })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
