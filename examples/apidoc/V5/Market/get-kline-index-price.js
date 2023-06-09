const { RestClientV5 } = require('bybit-api');

const client = new RestClientV5({
  testnet: true,
});

client
  .getIndexPriceKline({
    category: 'inverse',
    symbol: 'BTCUSDZ22',
    interval: '1',
    start: 1670601600000,
    end: 1670608800000,
    limit: 2,
  })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
