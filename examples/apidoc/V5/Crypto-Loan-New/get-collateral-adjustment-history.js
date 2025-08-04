import { RestClientV5 } from 'bybit-api';
// or:
// const { RestClientV5 } = require('bybit-api');

const client = new RestClientV5({
  testnet: true,
  key: 'YOUR_API_KEY',
  secret: 'YOUR_API_SECRET',
});

async function getCollateralAdjustmentHistory() {
  try {
    const response = await client.getCollateralAdjustmentHistory({
      limit: '2',
      collateralCurrency: 'BTC',
    });

    console.log(response);
  } catch (error) {
    console.error('Error:', error);
  }
}

getCollateralAdjustmentHistory();
