// https://api.bybit.com/v5/crypto-loan-common/max-loan

import { RestClientV5 } from 'bybit-api';
// or, if require is preferred:
// const { RestClientV5 } = require('bybit-api');

const client = new RestClientV5({
  testnet: true,
  key: 'apikey',
  secret: 'apisecret',
});

client
  .getMaxLoanAmount({
    currency: 'BTC',
    collateralList: [
      {
        ccy: 'XRP',
        amount: '1000',
      },
      {
        ccy: 'USDT',
        amount: '1000',
      },
    ],
  })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
