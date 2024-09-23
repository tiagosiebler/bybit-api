const { RestClientV5 } = require('bybit-api');

const client = new RestClientV5({
  testnet: true,
});
// linear
client
  .getInstrumentsInfo({
    category: 'linear',
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
  .getInstrumentsInfo({
    category: 'option',
    symbol: 'ETH-3JAN23-1250-P',
  })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });

// spot
client
  .getInstrumentsInfo({
    category: 'spot',
    symbol: 'BTCUSDT',
  })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
