const { RestClientV5 } = require('bybit-api');

const client = new RestClientV5({
  testnet: true,
  key: 'apikey',
  secret: 'apisecret',
});

// Get all rate limits without filters
client
  .getAllRateLimits()
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });

// Get all rate limits with filters
client
  .getAllRateLimits({
    limit: '10',
    cursor: 'eyJtaW5JRCI6MTc5NjU3OCwibWF4SUQiOjE3OTY1Nzh9',
    uids: '123456789',
  })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
