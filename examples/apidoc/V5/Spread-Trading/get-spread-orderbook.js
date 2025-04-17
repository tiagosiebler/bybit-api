const { RestClientV5 } = require('bybit-api');

const client = new RestClientV5({
  testnet: true,
});

client
  .getSpreadOrderbook({
    symbol: 'SOLUSDT_SOL/USDT',
    limit: 1, // Show 5 levels of depth
  })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
