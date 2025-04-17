const { RestClientV5 } = require('bybit-api');

const client = new RestClientV5({
  testnet: true,
  key: 'apiKey',
  secret: 'apiSecret',
});

client
  .cancelSpreadOrder({
    orderLinkId: '1744072052193428476',
  })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  }); 