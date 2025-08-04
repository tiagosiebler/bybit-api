import { RestClientV5 } from '../../src';

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

    console.log(
      'Get Max Collateral Amount Response:',
      JSON.stringify(response, null, 2),
    );
  } catch (error) {
    console.error('Error:', error);
  }
}

getMaxCollateralAmount();
