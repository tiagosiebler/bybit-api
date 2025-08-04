import { RestClientV5 } from 'bybit-api';
// or:
// const { RestClientV5 } = require('bybit-api');

const client = new RestClientV5({
  testnet: true,
  key: 'YOUR_API_KEY',
  secret: 'YOUR_API_SECRET',
});

async function getBorrowHistory() {
  try {
    const response = await client.getBorrowHistoryFlexible({
      limit: '2',
    });

    console.log(response);
  } catch (error) {
    console.error('Error:', error);
  }
}

getBorrowHistory();
