const { RestClientV5 } = require('bybit-api');

const client = new RestClientV5({
  testnet: true,
  key: 'apiKey',
  secret: 'apiSecret',
});

client
  .amendSpreadOrder({
    symbol: 'SOLUSDT_SOL/USDT',
    orderLinkId: '1744072052193428475',
    price: '14',
    qty: '0.2',
  })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
