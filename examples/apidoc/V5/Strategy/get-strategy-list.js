import { RestClientV5 } from 'bybit-api';
// or, if require is preferred:
// const { RestClientV5 } = require('bybit-api');

const client = new RestClientV5({
  testnet: true,
  key: 'apikey',
  secret: 'apisecret',
});

client
  .getStrategyList({
    strategyId: '119b6211-2611-461b-be5e-5ac557099e82',
  })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
