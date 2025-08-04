import { RestClientV5 } from 'bybit-api';

const client = new RestClientV5({
  testnet: true,
});

async function getBorrowOrderQuote() {
  try {
    const response = await client.getBorrowOrderQuoteFixed({
      orderCurrency: 'USDT',
      orderBy: 'apy',
    });

    console.log(response);
  } catch (error) {
    console.error('Error:', error);
  }
}

getBorrowOrderQuote();
