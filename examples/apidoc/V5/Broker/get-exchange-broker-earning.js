// https://api.bybit.com/v5/broker/earnings-info

const { RestClientV5 } = require('bybit-api');

const client = new RestClientV5({
  testnet: true,
  key: 'apikey',
  secret: 'apisecret',
});

client
  .getExchangeBrokerEarnings({
    bizType: 'SPOT',
    begin: '20231201',
    end: '20231207',
    limit: 1000,
  })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
