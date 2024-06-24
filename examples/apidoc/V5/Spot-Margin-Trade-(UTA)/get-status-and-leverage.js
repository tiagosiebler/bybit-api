// https://api.bybit.com/v5/spot-margin-trade/state

const { RestClientV5 } = require('bybit-api');

const client = new RestClientV5({
  testnet: true,
  key: 'apikey',
  secret: 'apisecret',
});

client
  .getSpotMarginState()
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
