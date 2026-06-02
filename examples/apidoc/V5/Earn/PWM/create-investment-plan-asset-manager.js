import { RestClientV5 } from 'bybit-api';

const client = new RestClientV5({
  testnet: true,
  key: 'apikey',
  secret: 'apisecret',
});

client
  .createPwmAssetManagerInvestmentPlan({
    accountUid: '800001',
    planName: 'Conservative Growth Plan',
    planType: 'stable',
    investmentDistribution: [
      {
        productId: '12345',
        amount: '100000.00',
      },
    ],
    reqLinkId: 'create-plan-001',
  })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
