import { RestClientV5 } from 'bybit-api';

const client = new RestClientV5({
  testnet: true,
  key: 'apikey',
  secret: 'apisecret',
});

client
  .createPwmCustomizeInvestmentPlan({
    accountType: 'FUND',
    products: [
      {
        category: 'equityFund',
        productId: '2001',
        fundName: 'Market Neutral Alpha',
        amount: '100000.00',
      },
      {
        category: 'multiCoinEarning',
        productId: '430',
        fundName: '',
        amount: '50000.00',
      },
    ],
  })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
