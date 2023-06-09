const { RestClientV5 } = require('bybit-api');

const client = new RestClientV5({
  testnet: true,
});

client
  .getKline({
    category: 'inverse',
    symbol: 'BTCUSD',
    interval: '60',
    start: 1670601600000,
    end: 1670608800000,
  })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
