import { RestClientV5 } from 'bybit-api';

const client = new RestClientV5({
  testnet: true,
  key: 'apikey',
  secret: 'apisecret',
});

client
  .getAlphaPredictionSportsMatchList({
    eventType: 1,
    status: 2,
    limit: 20,
    pageIndex: 1,
  })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
