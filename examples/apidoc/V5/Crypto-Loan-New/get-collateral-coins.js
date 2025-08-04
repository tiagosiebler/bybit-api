import { RestClientV5 } from 'bybit-api';

const client = new RestClientV5({
  testnet: true,
});

async function getCollateralCoins() {
  try {
    const response = await client.getCollateralCoinsNew({
      currency: 'BTC',
    });

    console.log(response);
  } catch (error) {
    console.error('Error:', error);
  }
}

getCollateralCoins();
