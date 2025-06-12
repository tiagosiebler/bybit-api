const { RestClientV5 } = require('bybit-api');

const client = new RestClientV5({
  testnet: true,
  key: 'apikey',
  secret: 'apisecret',
});

// Submit a market order
client
  .preCheckOrder({
    category: 'spot',
    symbol: 'BTCUSDT',
    side: 'Buy',
    orderType: 'Limit',
    qty: '0.01',
    price: '28000',
  })
  .then((response) => {
    console.log('Market order result', response);
  })
  .catch((error) => {
    console.error('Market order error', error);
  });