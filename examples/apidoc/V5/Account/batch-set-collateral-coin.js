const { RestClientV5 } = require('bybit-api');

const client = new RestClientV5({
  testnet: true,
  key: 'apikey',
  secret: 'apisecret',
});

client
  .batchSetCollateralCoin({
    request: [
      {
        coin: 'BTC',
        collateralSwitch: 'ON',
      },
      {
        coin: 'ETH',
        collateralSwitch: 'OFF',
      },
    ],
  })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
