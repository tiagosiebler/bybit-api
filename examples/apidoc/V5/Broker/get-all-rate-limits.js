// https://api.bybit.com/v5/broker/apilimit/query-all

const { RestClientV5 } = require('bybit-api');

const client = new RestClientV5({
  testnet: true,
  key: 'apikey',
  secret: 'apisecret',
});

client
  .getAllBrokerRateLimits()
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
