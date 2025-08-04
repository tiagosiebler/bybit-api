import { RestClientV5 } from 'bybit-api';
// or:
// const { RestClientV5 } = require('bybit-api');

const client = new RestClientV5({
  testnet: true,
});

async function getBorrowableCoins() {
  try {
    const response = await client.getBorrowableCoinsNew({
      currency: 'ETH',
      vipLevel: 'VIP5',
    });

    console.log(response);
  } catch (error) {
    console.error('Error:', error);
  }
}

getBorrowableCoins();
