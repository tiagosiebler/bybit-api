const { RestClientV5 } = require('bybit-api');

const client = new RestClientV5({
  testnet: true,
  key: 'apikey',
  secret: 'apisecret',
});

client
  .getAlphaBizTokenPriceList({
    tokenAddressInfo: [
      {
        chainCode: 'ETH',
        tokenAddress: '0x6982508145454ce325ddbe47a25d4ec3d2311933',
      },
    ],
  })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
