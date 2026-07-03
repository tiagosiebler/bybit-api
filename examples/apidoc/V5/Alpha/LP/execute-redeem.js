import { RestClientV5 } from 'bybit-api';

const client = new RestClientV5({
  testnet: true,
  key: 'apikey',
  secret: 'apisecret',
});

client.executeAlphaLPRedeem({ positionId: 12345, poolAddress: '0x1234567890abcdef', dercRatio: '0.5' })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
