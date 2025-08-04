import { RestClientV5 } from '../../../src';

const client = new RestClientV5({
  testnet: true,
  key: 'YOUR_API_KEY',
  secret: 'YOUR_API_SECRET',
});

async function createSupplyOrder() {
  try {
    const response = await client.createSupplyOrderFixed({
      orderCurrency: 'USDT',
      orderAmount: '2002.21',
      annualRate: '0.35',
      term: '7',
    });

    console.log(response);
  } catch (error) {
    console.error('Error:', error);
  }
}

createSupplyOrder();
