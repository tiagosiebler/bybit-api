const { RestClientV5 } = require('bybit-api');

const client = new RestClientV5({
  testnet: true,
  key: 'apikey',
  secret: 'apisecret',
});

client
  .queryApiRateLimit({
    uids: '1234567890',
  })
  .then((response) => {
    console.log(response);
    // Response now contains 'rate' field instead of 'limit'
    console.log('Rate limits:', response.result.list);
  })
  .catch((error) => {
    console.error(error);
  });
