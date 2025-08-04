import { RestClientV5 } from 'bybit-api';
// or:
// const { RestClientV5 } = require('bybit-api');

const client = new RestClientV5({
  testnet: true,
  key: 'YOUR_API_KEY',
  secret: 'YOUR_API_SECRET',
});

async function getRepaymentHistory() {
  try {
    const response = await client.getRepaymentHistoryFixed({
      repayId: '1780',
    });

    console.log(response);
  } catch (error) {
    console.error('Error:', error);
  }
}

getRepaymentHistory();
