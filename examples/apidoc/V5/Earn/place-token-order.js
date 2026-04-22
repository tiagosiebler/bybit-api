const { RestClientV5 } = require('bybit-api');

const client = new RestClientV5({
  testnet: true,
  key: 'apikey',
  secret: 'apisecret',
});

client
  .submitEarnTokenOrder({
    coin: 'BYUSDT',
    orderLinkId: 'my-order-001',
    orderType: 'Mint',
    amount: '100.00',
    accountType: 'FlexibleSaving',
  })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
