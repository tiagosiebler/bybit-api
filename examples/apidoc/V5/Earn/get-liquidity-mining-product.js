const { RestClientV5 } = require('bybit-api');

const client = new RestClientV5({
  testnet: true,
});

client
  .getLiquidityMiningProduct({
    baseCoin: 'BTC',
  })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
