import { RestClientV5 } from 'bybit-api';

const client = new RestClientV5({
  testnet: true,
  key: 'apikey',
  secret: 'apisecret',
});

client
  .getAlphaPredictionOrderEstimate({
    tokenId: 'token_yes_123',
    side: 1,
    eventId: 'event_123',
    amount: '100',
    orderType: 1,
    payTokenCode: 'USDC',
  })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
