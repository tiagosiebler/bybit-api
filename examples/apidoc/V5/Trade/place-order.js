const { RestClientV5 } = require('bybit-api');

const client = new RestClientV5({
  testnet: true,
  key: 'apikey',
  secret: 'apisecret',
});

client
  .submitOrder({
    category: 'spot',
    symbol: 'BTCUSDT',
    side: 'Buy',
    orderType: 'Market',
    qty: '0.1',
    price: '15600',
    timeInForce: 'PostOnly',
    orderLinkId: 'spot-test-postonly',
    isLeverage: 0,
    orderFilter: 'Order',
  })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
