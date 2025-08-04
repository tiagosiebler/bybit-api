import { RestClientV5 } from 'bybit-api';
// or:
// const { RestClientV5 } = require('bybit-api');

const client = new RestClientV5({
  testnet: true,
  key: 'YOUR_API_KEY',
  secret: 'YOUR_API_SECRET',
});

async function updateCollateralAmount() {
  try {
    const response = await client.updateCollateralAmount({
      currency: 'BTC',
      amount: '0.08',
      direction: '1', // 0: add collateral; 1: reduce collateral
    });

    console.log(response);
  } catch (error) {
    console.error('Error:', error);
  }
}

updateCollateralAmount();
