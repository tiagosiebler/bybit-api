import { RestClientV5 } from 'bybit-api';

const client = new RestClientV5({
  testnet: true,
  key: 'apikey',
  secret: 'apisecret',
});

client
  .settlePwmFundProfit({
    fundId: '12323',
    reqLinkId: 'settle-001',
  })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
