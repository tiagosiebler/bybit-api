import { RestClientV5 } from 'bybit-api';
// or:
// const { RestClientV5 } = require('bybit-api');

const client = new RestClientV5({
  testnet: true,
  key: 'YOUR_API_KEY',
  secret: 'YOUR_API_SECRET',
});

async function getBorrowContractInfo() {
  try {
    const response = await client.getBorrowContractInfoFixed({
      orderCurrency: 'ETH',
    });

    console.log(response);
  } catch (error) {
    console.error('Error:', error);
  }
}

getBorrowContractInfo(); 