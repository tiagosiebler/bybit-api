const { RestClientV5 } = require('bybit-api');

const client = new RestClientV5({
  testnet: true,
});

client
  .getMarkPriceKline({
    category: 'linear',
    symbol: 'BTCUSD',
    interval: '15',
    start: 1670601600000,
    end: 1670608800000,
    limit: 1,
  })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
