import { RestClientV5 } from 'bybit-api';
// or:
// const { RestClientV5 } = require('bybit-api');

const client = new RestClientV5({
  testnet: true,
});

async function getLoanCollateralCoins() {
  try {
    const response = await client.getLoanCollateralCoins({
      currency: 'BTC',
    });

    console.log(response);
  } catch (error) {
    console.error('Error:', error);
  }
}

getCollateralCoins();
