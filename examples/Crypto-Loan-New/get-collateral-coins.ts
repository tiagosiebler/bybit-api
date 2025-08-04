import { RestClientV5 } from '../../src';

const client = new RestClientV5({
  testnet: true,
});

async function getCollateralCoins() {
  try {
    const response = await client.getCollateralCoinsNew({
      currency: 'BTC',
    });

    console.log(
      'Get Collateral Coins Response:',
      JSON.stringify(response, null, 2),
    );
  } catch (error) {
    console.error('Error:', error);
  }
}

getCollateralCoins();
