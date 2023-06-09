const { RestClientV5 } = require('bybit-api');

const client = new RestClientV5({
  testnet: true,
  key: 'apikey',
  secret: 'apisecret',
});

client
  .updateMasterApiKey({
    ips: ['*'],
    permissions: {
      ContractTrade: ['Order', 'Position'],
      Spot: ['SpotTrade'],
      Wallet: ['AccountTransfer', 'SubMemberTransfer'],
      Options: ['OptionsTrade'],
      Derivatives: ['DerivativesTrade'],
      CopyTrading: ['CopyTrading'],
      BlockTrade: [],
      Exchange: ['ExchangeHistory'],
      NFT: ['NFTQueryProductList'],
    },
  })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
