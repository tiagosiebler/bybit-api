import { RestClientV5 } from '../../../src';

const client = new RestClientV5({
  testnet: true,
  key: 'YOUR_API_KEY',
  secret: 'YOUR_API_SECRET',
});

async function getRepaymentHistory() {
  try {
    const response = await client.getRepaymentHistoryFlexible({
      loanCurrency: 'BTC',
    });

    console.log(response);
  } catch (error) {
    console.error('Error:', error);
  }
}

getRepaymentHistory();
