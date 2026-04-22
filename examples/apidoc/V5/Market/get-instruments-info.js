const { RestClientV5 } = require('bybit-api');

const client = new RestClientV5({
  testnet: true,
});

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

client
  .getInstrumentsInfo({
    category: 'linear',
    symbolType: 'commodity',
  })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
