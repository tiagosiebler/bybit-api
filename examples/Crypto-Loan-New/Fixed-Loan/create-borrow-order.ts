import { RestClientV5 } from '../../../src';

const client = new RestClientV5({
  testnet: true,
  key: 'YOUR_API_KEY',
  secret: 'YOUR_API_SECRET',
});

async function createBorrowOrder() {
  try {
    const response = await client.createBorrowOrderFixed({
      orderCurrency: 'ETH',
      orderAmount: '1.5',
      annualRate: '0.022',
      term: '30',
      autoRepay: 'true',
      collateralList: [
        {
          currency: 'BTC',
          amount: '0.1',
        },
      ],
    });

    console.log(response);
  } catch (error) {
    console.error('Error:', error);
  }
}

createBorrowOrder();
