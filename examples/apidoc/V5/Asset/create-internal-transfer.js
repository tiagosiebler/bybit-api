const { RestClientV5 } = require('bybit-api');

const client = new RestClientV5({
  testnet: true,
  key: 'apikey',
  secret: 'apisecret',
});

client
  .createInternalTransfer(
    '42c0cfb0-6bca-c242-bc76-4e6df6cbcb16',
    'BTC',
    '0.05',
    'UNIFIED',
    'CONTRACT',
  )
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
