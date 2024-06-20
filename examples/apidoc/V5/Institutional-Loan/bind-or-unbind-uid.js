// https://api.bybit.com/v5/ins-loan/association-uid

const { RestClientV5 } = require('bybit-api');

const client = new RestClientV5({
  testnet: true,
  key: 'apikey',
  secret: 'apisecret',
});

client
  .bindOrUnbindUID({
    uid: 'yourUID',
    operate: '0', // 0 for bind, 1 for unbind
  })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
