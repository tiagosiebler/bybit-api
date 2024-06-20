const { RestClientV5 } = require('bybit-api');

const client = new RestClientV5({
  testnet: true,
  key: 'apikey',
  secret: 'apisecret',
});

client
  .getBorrowHistory({
    currency: 'USDT', 
    startTime: 1670601600000, 
    endTime: 1673203200000, 
    limit: 30, 
    cursor: 'nextPageCursorToken', 
  })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
