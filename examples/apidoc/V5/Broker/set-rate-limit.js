// https://api.bybit.com/v5/broker/apilimit/set

const { RestClientV5 } = require('bybit-api');

const client = new RestClientV5({
  testnet: true,
  key: 'apikey',
  secret: 'apisecret',
});

client
  .setBrokerRateLimit({
    list: [
      {
        uids: '290118',
        bizType: 'SPOT',
        rate: 600,
      },
    ],
  })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
