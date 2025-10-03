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

