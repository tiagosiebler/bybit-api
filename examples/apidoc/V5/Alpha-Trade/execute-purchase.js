const { RestClientV5 } = require('bybit-api');

const client = new RestClientV5({
  testnet: true,
  key: 'apikey',
  secret: 'apisecret',
});

client
  .executeAlphaTradePurchase({
    fromTokenCode: 'CEX_1',
    fromTokenAmount: '100',
    toTokenCode: 'DEX_123',
    slippage: '0.005',
    quoteData: 'eyJhbGciOiJIUzI1NiJ9...',
    gas: '0.0003',
    quoteMode: 0,
    correctingCode: 'a1b2c3d4e5f6',
  })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
