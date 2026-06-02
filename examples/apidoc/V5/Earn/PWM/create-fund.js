import { RestClientV5 } from 'bybit-api';

const client = new RestClientV5({
  testnet: true,
  key: 'apikey',
  secret: 'apisecret',
});

client
  .createPwmFund({
    fundName: 'BTC Alpha Fund',
    coin: 'BTC',
    profitShareRate: '20.00',
    managementFeeRate: '2.00',
    reqLinkId: 'create-fund-001',
  })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
