import { RestClientV5 } from 'bybit-api';

const client = new RestClientV5({
  testnet: true,
  key: 'apikey',
  secret: 'apisecret',
});

client.getAlphaLPPayTokenList({})
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
