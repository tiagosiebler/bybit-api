import { RestClientV5 } from 'bybit-api';
// or, if require is preferred:
// const { RestClientV5 } = require('bybit-api');

const client = new RestClientV5({
  testnet: true,
  key: 'apikey',
  secret: 'apisecret',
});

client
  .getAffiliateSubAffiliateList({
    cursor: '',
    size: 100,
    startDate: '2024-01-01',
    endDate: '2024-01-31',
  })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
