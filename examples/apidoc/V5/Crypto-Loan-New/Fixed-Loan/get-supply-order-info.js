import { RestClientV5 } from 'bybit-api';
// or:
// const { RestClientV5 } = require('bybit-api');

const client = new RestClientV5({
  testnet: true,
  key: 'YOUR_API_KEY',
  secret: 'YOUR_API_SECRET',
});

async function getSupplyOrderInfo() {
  try {
    const response = await client.getSupplyOrderInfoFixed({
      orderId: '13564',
    });

    console.log(response);
  } catch (error) {
    console.error('Error:', error);
  }
}

getSupplyOrderInfo();
