const { RestClientV5 } = require('bybit-api');

const client = new RestClientV5({
  testnet: true,
  key: 'apikey',
  secret: 'apisecret',
});

client
  .batchSubmitOrders('option', [
    {
      symbol: 'ETH-30DEC22-500-C',
      orderType: 'Limit',
      side: 'Buy',
      qty: '1',
      orderIv: '6',
      timeInForce: 'GTC',
      orderLinkId: 'option-test-001',
      mmp: false,
      reduceOnly: false,
    },
    {
      symbol: 'ETH-30DEC22-700-C',
      orderType: 'Limit',
      side: 'Sell',
      qty: '2',
      price: '700',
      timeInForce: 'GTC',
      orderLinkId: 'option-test-001',
      mmp: false,
      reduceOnly: false,
    },
  ])
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
