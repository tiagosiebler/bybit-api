const { RestClientV5 } = require('bybit-api');

const client = new RestClientV5({
  testnet: true,
  key: 'apikey',
  secret: 'apisecret',
});

client
  .createUniversalTransfer({
    transferId: 'be7a2462-1138-4e27-80b1-62653f24925e',
    coin: 'ETH',
    amount: '0.5',
    fromMemberId: 592334,
    toMemberId: 691355,
    fromAccountType: 'CONTRACT',
    toAccountType: 'UNIFIED',
  })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
