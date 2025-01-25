const { RestClientV5 } = require('bybit-api');

const client = new RestClientV5({
  testnet: true,
  key: 'apikey',
  secret: 'apisecret',
});

// Submit a market order
client
  .submitOrder({
    category: 'spot',
    symbol: 'BTCUSDT',
    side: 'Buy',
    orderType: 'Market',
    qty: '1',
  })
  .then((response) => {
    console.log('Market order result', response);
  })
  .catch((error) => {
    console.error('Market order error', error);
  });

// Submit a limit order
client
  .submitOrder({
    category: 'spot',
    symbol: 'BTCUSDT',
    side: 'Buy',
    orderType: 'Limit',
    qty: '1',
    price: '55000',
  })
  .then((response) => {
    console.log('Limit order result', response);
  })
  .catch((error) => {
    console.error('Limit order error', error);
  });
