const { RestClientV5 } = require('bybit-api');

const client = new RestClientV5({
  testnet: true,
  key: 'apikey',
  secret: 'apisecret',
});

client
  .setMMP({
    baseCoin: 'ETH',
    window: '5000',
    frozenPeriod: '100000',
    qtyLimit: '50',
    deltaLimit: '20',
  })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
