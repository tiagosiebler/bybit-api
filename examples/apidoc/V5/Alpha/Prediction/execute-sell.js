import { RestClientV5 } from 'bybit-api';

const client = new RestClientV5({
  testnet: true,
  key: 'apikey',
  secret: 'apisecret',
});

client
  .executeAlphaPredictionSell({
    tokenId: 'token_yes_123',
    size: '50',
    orderType: 1,
    slippage: '0.05',
    eventId: 'event_123',
    toTokenCode: 'USDC',
  })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
