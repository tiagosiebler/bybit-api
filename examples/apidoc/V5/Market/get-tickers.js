const { RestClientV5 } = require('bybit-api');

const client = new RestClientV5({
  testnet: true,
});

// inverse
client
  .getTickers({
    category: 'inverse',
    symbol: 'BTCUSDT',
  })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });

// option

client
  .getTickers({
    category: 'option',
    symbol: 'BTC-30DEC22-18000-C',
  })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });

// spot

client
  .getTickers({
    category: 'spot',
    symbol: 'BTCUSDT',
  })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
