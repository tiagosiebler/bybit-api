const { RestClientV5 } = require('bybit-api');

const client = new RestClientV5({
  testnet: true,
});

client
  .getPremiumIndexPriceKline({
    category: 'linear',
    symbol: 'BTCUSDT',
    interval: 'D',
    start: 1652112000000,
    end: 1652544000000,
  })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
