const { RestClientV5 } = require('bybit-api');

const client = new RestClientV5({
  testnet: true,
  key: 'apikey',
  secret: 'apisecret',
});

client
  .getAlphaTradeQuote({
    tradeType: 1,
    fromTokenCode: 'CEX_1',
    fromTokenAmount: '100',
    toTokenCode: 'DEX_123',
    quoteMode: 0,
  })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
