import { RestClientV5 } from '../../src';

const client = new RestClientV5({
  testnet: true,
  key: 'apikey',
  secret: 'apisecret',
});

client
  .getDeliveryPrice({
    category: 'option',
    symbol: 'ETH-26DEC22-1400-C"',
  })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
