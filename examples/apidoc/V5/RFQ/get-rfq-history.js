// https://api.bybit.com/v5/rfq/rfq-list

import { RestClientV5 } from 'bybit-api';
// or, if require is preferred:
// const { RestClientV5 } = require('bybit-api');

const client = new RestClientV5({
  testnet: true,
  key: 'apikey',
  secret: 'apisecret',
});

client
  .getRFQHistory({
    rfqId: '1756885055799241492396882271696580', 
    traderType: 'quote', 
    status: 'Active',
    limit: 50,
  })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
