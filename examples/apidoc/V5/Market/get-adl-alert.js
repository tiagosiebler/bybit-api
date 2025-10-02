const { RestClientV5 } = require('bybit-api');

const client = new RestClientV5({
  testnet: true,
});

// Get ADL alerts for all symbols
client
  .getADLAlert()
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });

// Get ADL alerts for a specific symbol
client
  .getADLAlert({
    symbol: 'BTCUSDT',
  })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
