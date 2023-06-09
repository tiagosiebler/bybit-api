const { RestClientV5 } = require('bybit-api');

const client = new RestClientV5({
  testnet: true,
  key: 'apikey',
  secret: 'apisecret',
});

client
  .submitWithdrawal({
    coin: 'USDT',
    chain: 'ETH',
    address: '0x99ced129603abc771c0dabe935c326ff6c86645d',
    amount: '24',
    timestamp: 1672196561407,
    forceChain: 0,
    accountType: 'FUND',
  })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
