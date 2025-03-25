const { RestClientV5 } = require('bybit-api');

// Create a client
const client = new RestClientV5({
  testnet: true,
  key: 'XXXXX',
  secret: 'XXXXX',
});

// Cancel P2P advertisement
client
  .cancelP2PAd({
    itemId: '1899667660027793408',
  })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
