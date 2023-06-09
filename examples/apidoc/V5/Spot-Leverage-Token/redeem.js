const { RestClientV5 } = require('bybit-api');

const client = new RestClientV5({
  testnet: true,
  key: 'apikey',
  secret: 'apisecret',
});

client
  .redeemSpotLeveragedToken({
    ltCoin: 'EOS3L',
    quantity: '200',
    serialNo: 'redeem-001',
  })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
