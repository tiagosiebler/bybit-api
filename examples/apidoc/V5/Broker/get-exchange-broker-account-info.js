// https://api.bybit.com/v5/broker/account-info

const { RestClientV5 } = require('bybit-api');

const client = new RestClientV5({
  testnet: true,
  key: 'apikey',
  secret: 'apisecret',
});

client
  .getExchangeBrokerAccountInfo()
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
