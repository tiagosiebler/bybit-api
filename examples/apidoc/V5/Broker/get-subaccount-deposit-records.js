// https://api.bybit.com/v5/broker/asset/query-sub-member-deposit-record

const { RestClientV5 } = require('bybit-api');

const client = new RestClientV5({
  testnet: true,
  key: 'apikey',
  secret: 'apisecret',
});

client
  .getBrokerSubAccountDeposits({
    limit: 50,
  })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
