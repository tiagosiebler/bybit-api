const { RestClientV5 } = require('bybit-api');

const client = new RestClientV5({
  testnet: true,
  key: 'apikey',
  secret: 'apisecret',
});

client
  .movePosition({
    fromUid: '100307601',
    toUid: '592324',
    list: [
      {
        category: 'spot',
        symbol: 'BTCUSDT',
        price: '100',
        side: 'Sell',
        qty: '0.01',
      },
    ],
  })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
