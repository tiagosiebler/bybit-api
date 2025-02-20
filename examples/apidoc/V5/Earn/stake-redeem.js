const { RestClientV5 } = require('bybit-api');

const client = new RestClientV5({
  testnet: true,
  key: 'apikey',
  secret: 'apisecret',
});

client
  .submitStakeRedeem({
    category: 'FlexibleSaving',
    orderType: 'Stake',
    accountType: 'FUND',
    amount: '0.35',
    coin: 'BTC',
    productId: '430',
    orderLinkId: 'btc-earn-001',
  })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
