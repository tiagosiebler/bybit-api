const { RestClientV5 } = require('bybit-api');

const client = new RestClientV5({
  testnet: true,
  key: 'apikey',
  secret: 'apisecret',
});

client
  .submitAdvanceEarnPlaceOrder({
    category: 'DualAssets',
    productId: '36320',
    orderType: 'Stake',
    amount: '20',
    accountType: 'UNIFIED',
    coin: 'USDT',
    orderLinkId: '54b3589b-da55-4b17-acdd-aa75912c9eb',
    dualAssetsExtra: {
      orderDirection: 'BuyLow',
      selectPrice: '2325',
      apyE8: 857565000,
    },
  })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
