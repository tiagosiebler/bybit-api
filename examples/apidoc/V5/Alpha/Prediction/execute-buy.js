import { RestClientV5 } from 'bybit-api';

const client = new RestClientV5({
  testnet: true,
  key: 'apikey',
  secret: 'apisecret',
});

client
  .executeAlphaPredictionBuy({
    tokenId: 'token_yes_123',
    amount: '100',
    payTokenCode: 'USDC',
    orderType: 1,
    slippage: '0.05',
    eventId: 'event_123',
  })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
