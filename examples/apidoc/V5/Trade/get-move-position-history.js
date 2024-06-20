const { RestClientV5 } = require('bybit-api');

const client = new RestClientV5({
  testnet: true,
  key: 'apikey',
  secret: 'apisecret',
});

client
  .getMovePositionHistory({
    category: 'linear',
    symbol: 'BTCUSDT',
    startTime: 1670601600000, 
    endTime: 1671206400000, 
    status: 'Filled',
    limit: '50', 
  })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
