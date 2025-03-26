const { RestClientV5 } = require('bybit-api');

// Create a client
const client = new RestClientV5({
  testnet: true,
  key: 'XXXXX',
  secret: 'XXXXX',
});

// Get market online ads list
client
  .getP2POnlineAds({
    tokenId: 'USDT',
    currencyId: 'USD',
    side: '0', // 0: buy; 1: sell
  })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
