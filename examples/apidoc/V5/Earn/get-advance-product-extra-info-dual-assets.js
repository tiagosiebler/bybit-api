const { RestClientV5 } = require('bybit-api');

const client = new RestClientV5({
  testnet: true,
});

client
  .getAdvanceEarnProductExtraInfo({
    category: 'DualAssets',
    productId: '36340',
  })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
