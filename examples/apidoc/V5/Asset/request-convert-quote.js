const { RestClientV5 } = require('bybit-api');

const client = new RestClientV5({
  testnet: true,
  key: 'apikey',
  secret: 'apisecret',
});

client
  .requestConvertQuote({
    requestId: 'test-00002',
    fromCoin: 'ETH',
    toCoin: 'BTC',
    accountType: 'eb_convert_funding',
    requestCoin: 'ETH',
    requestAmount: '0.1',
  })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
