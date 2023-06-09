const { RestClientV5 } = require('bybit-api');

const client = new RestClientV5({
  testnet: true,
  key: 'apikey',
  secret: 'apisecret',
});

client
  .submitOrder({
    category: 'linear',
    symbol: 'ETHPERP',
    orderLinkId: 'linear-004',
    triggerPrice: '1145',
    qty: '0.15',
    price: '1050',
    takeProfit: '0',
    stopLoss: '0',
  })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
