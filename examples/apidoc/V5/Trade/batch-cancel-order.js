const { RestClientV5 } = require('bybit-api');

const client = new RestClientV5({
  testnet: true,
  key: 'apikey',
  secret: 'apisecret',
});

client
  .batchCancelOrders('option', [
    {
      symbol: 'ETH-30DEC22-500-C',
      orderId: 'b551f227-7059-4fb5-a6a6-699c04dbd2f2',
    },
    {
      symbol: 'ETH-30DEC22-700-C',
      orderId: 'fa6a595f-1a57-483f-b9d3-30e9c8235a52',
    },
  ])
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
