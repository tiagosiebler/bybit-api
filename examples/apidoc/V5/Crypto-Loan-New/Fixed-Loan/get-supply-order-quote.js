import { RestClientV5 } from 'bybit-api';
// or:
// const { RestClientV5 } = require('bybit-api');

const client = new RestClientV5({
  testnet: true,
});

async function getSupplyOrderQuote() {
  try {
    const response = await client.getSupplyOrderQuoteFixed({
      orderCurrency: 'USDT',
      orderBy: 'apy',
    });

    console.log(response);
  } catch (error) {
    console.error('Error:', error);
  }
}

getSupplyOrderQuote();
