import { RestClientV5 } from 'bybit-api';

const client = new RestClientV5({
  testnet: true,
  key: 'apikey',
  secret: 'apisecret',
});

client.getRWANavChart({ productId: 1001 })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
