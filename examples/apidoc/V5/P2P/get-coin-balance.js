const { RestClientV5 } = require('bybit-api');

// Create a client
const client = new RestClientV5({
  testnet: true,
  key: 'XXXXX',
  secret: 'XXXXX',
});

// Get account coins balance
client
  .getP2PAccountCoinsBalance({
    accountType: 'FUND',
    coin: 'USDC',
  })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
