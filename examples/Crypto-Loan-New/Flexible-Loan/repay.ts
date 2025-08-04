import { RestClientV5 } from '../../../src';

const client = new RestClientV5({
  testnet: true,
  key: 'YOUR_API_KEY',
  secret: 'YOUR_API_SECRET',
});

async function repayFlexible() {
  try {
    const response = await client.repayFlexible({
      loanCurrency: 'BTC',
      amount: '0.005',
    });

    console.log(response);
  } catch (error) {
    console.error('Error:', error);
  }
}

repayFlexible();
