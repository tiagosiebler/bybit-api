const { RestClientV5 } = require('bybit-api');

const client = new RestClientV5({
  testnet: true,
});

client
  .getOpenInterest({
    category: 'inverse',
    symbol: 'BTCUSD',
    intervalTime: '5min',
    startTime: 1669571100000,
    endTime: 1669571400000,
  })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
