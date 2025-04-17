const { RestClientV5 } = require('bybit-api');

const client = new RestClientV5({
  testnet: true,
  key: 'apiKey',
  secret: 'apiSecret',
});

client
  .submitSpreadOrder({
    symbol: 'SOLUSDT_SOL/USDT',
    side: 'Buy',
    orderType: 'Limit',
    qty: '0.1',
    price: '21',
    orderLinkId: '1744072052193428479',
    timeInForce: 'PostOnly',
  })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
