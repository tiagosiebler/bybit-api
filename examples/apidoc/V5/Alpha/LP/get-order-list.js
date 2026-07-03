import { RestClientV5 } from 'bybit-api';

const client = new RestClientV5({
  testnet: true,
  key: 'apikey',
  secret: 'apisecret',
});

client.getAlphaLPOrderList({ orderType: 0, days: 7, limit: 20, pageIndex: 1 })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
