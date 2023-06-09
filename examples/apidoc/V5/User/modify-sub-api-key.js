const { RestClientV5 } = require('bybit-api');

const client = new RestClientV5({
  testnet: true,
  key: 'apikey',
  secret: 'apisecret',
});

client
  .updateSubApiKey({
    readOnly: 0,
    ips: ['*'],
    permissions: {
      ContractTrade: [],
      Spot: ['SpotTrade'],
      Wallet: ['AccountTransfer'],
      Options: [],
      Derivatives: [],
      CopyTrading: [],
      BlockTrade: [],
      Exchange: [],
      NFT: [],
    },
  })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
