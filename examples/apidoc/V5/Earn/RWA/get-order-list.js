import { RestClientV5 } from 'bybit-api';

const client = new RestClientV5({
  testnet: true,
  key: 'apikey',
  secret: 'apisecret',
});

client.getRWAOrderList({ orderType: 'Stake', limit: 20 })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
