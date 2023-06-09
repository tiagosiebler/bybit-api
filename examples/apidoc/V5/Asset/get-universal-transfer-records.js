const { RestClientV5 } = require('bybit-api');

const client = new RestClientV5({
  testnet: true,
  key: 'apikey',
  secret: 'apisecret',
});

client
  .getUniversalTransferRecords({
    limit: 1,
    cursor: 'eyJtaW5JRCI6MTc5NjU3OCwibWF4SUQiOjE3OTY1Nzh9',
  })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
