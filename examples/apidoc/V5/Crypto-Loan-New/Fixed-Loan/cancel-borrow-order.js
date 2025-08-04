import { RestClientV5 } from 'bybit-api';

const client = new RestClientV5({
  testnet: true,
  key: 'YOUR_API_KEY',
  secret: 'YOUR_API_SECRET',
});

async function cancelBorrowOrder() {
  try {
    const response = await client.cancelBorrowOrderFixed({
      orderId: '13009',
    });

    console.log(response);
  } catch (error) {
    console.error('Error:', error);
  }
}

cancelBorrowOrder();
