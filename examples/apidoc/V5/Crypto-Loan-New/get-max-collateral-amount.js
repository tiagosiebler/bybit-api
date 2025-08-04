import { RestClientV5 } from 'bybit-api';

const client = new RestClientV5({
  testnet: true,
  key: 'YOUR_API_KEY',
  secret: 'YOUR_API_SECRET',
});

async function getMaxCollateralAmount() {
  try {
    const response = await client.getMaxCollateralAmountNew({
      currency: 'BTC',
    });

    console.log(response);
  } catch (error) {
    console.error('Error:', error);
  }
}

getMaxCollateralAmount();
