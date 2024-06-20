// https://api.bybit.com/v5/user/sub-apikeys

const { RestClientV5 } = require('bybit-api');

const client = new RestClientV5({
  testnet: true,
  key: 'apikey',
  secret: 'apisecret',
});

client
  .getSubAccountAllApiKeys({
    subMemberId: 'subUID',
    limit: 20,
  })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
