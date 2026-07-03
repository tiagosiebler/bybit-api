import { RestClientV5 } from 'bybit-api';

const client = new RestClientV5({
  testnet: true,
  key: 'apikey',
  secret: 'apisecret',
});

client.getAlphaLPPayTokenPrice({ tokenCode: ['CEX_1', 'CEX_2'] })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
