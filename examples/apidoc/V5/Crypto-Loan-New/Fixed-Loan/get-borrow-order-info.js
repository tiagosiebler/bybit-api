import { RestClientV5 } from 'bybit-api';
// or:
// const { RestClientV5 } = require('bybit-api');

const client = new RestClientV5({
  testnet: true,
  key: 'YOUR_API_KEY',
  secret: 'YOUR_API_SECRET',
});

async function getBorrowOrderInfo() {
  try {
    const response = await client.getBorrowOrderInfoFixed({
      orderId: '13010',
    });

    console.log(response);
  } catch (error) {
    console.error('Error:', error);
  }
}

getBorrowOrderInfo(); 