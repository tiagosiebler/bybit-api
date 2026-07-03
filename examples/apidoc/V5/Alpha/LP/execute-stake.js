import { RestClientV5 } from 'bybit-api';

const client = new RestClientV5({
  testnet: true,
  key: 'apikey',
  secret: 'apisecret',
});

client.executeAlphaLPStake({ positionId: 0, poolAddress: '0x1234567890abcdef', payTokenAmount: '1000', payTokenCode: 'CEX_1', rangeUpper: '2000', rangeLower: '1800' })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
