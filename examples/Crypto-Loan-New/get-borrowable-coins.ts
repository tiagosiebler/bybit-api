import { RestClientV5 } from '../../src';

const client = new RestClientV5({
  testnet: true,
});

async function getBorrowableCoins() {
  try {
    const response = await client.getBorrowableCoinsNew({
      currency: 'ETH',
      vipLevel: 'VIP5',
    });

    console.log(
      'Get Borrowable Coins Response:',
      JSON.stringify(response, null, 2),
    );
  } catch (error) {
    console.error('Error:', error);
  }
}

getBorrowableCoins();
