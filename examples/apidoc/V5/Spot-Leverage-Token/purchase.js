const { RestClientV5 } = require('bybit-api');

const client = new RestClientV5({
  testnet: true,
  key: 'apikey',
  secret: 'apisecret',
});

client
  .purchaseSpotLeveragedToken({
    ltCoin: 'EOS3L',
    amount: '200',
    serialNo: 'purchase-001',
  })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
