const { RestClientV5 } = require('bybit-api');

const client = new RestClientV5({
  testnet: true,
  key: 'apikey',
  secret: 'apisecret',
});

client
  .movePosition({
    fromUid: 'UTA12345',
    toUid: 'UTA67890',
    list: [
      {
        category: 'linear',
        symbol: 'BTCUSDT',
        price: '50000',
        side: 'Sell',
        qty: '1',
      },
    ],
  })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
