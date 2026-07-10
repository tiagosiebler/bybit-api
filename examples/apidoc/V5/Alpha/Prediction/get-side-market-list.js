import { RestClientV5 } from 'bybit-api';

const client = new RestClientV5({
  testnet: true,
  key: 'apikey',
  secret: 'apisecret',
});

client
  .getAlphaPredictionSideMarketList({
    eventId: 'event_123',
    sortBy: 'volume',
    limit: 20,
    pageIndex: 1,
  })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
