import { RestClientV5 } from 'bybit-api';

const client = new RestClientV5({
  testnet: true,
  key: 'apikey',
  secret: 'apisecret',
});

client
  .managePwmAssetManagerInvestmentPlan({
    planId: '10088',
    updateStatus: 'Closed',
    updateFunds: [
      {
        fundId: '430',
        amount: '100000',
      },
      {
        fundId: '2005',
        amount: '270000',
      },
    ],
    reqLinkId: 'manage-plan-001',
  })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
