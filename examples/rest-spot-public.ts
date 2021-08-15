import { SpotClient } from '../src/index';

// or
// import { SpotClient } from 'bybit-api';

const client = new SpotClient();

const symbol = 'BTCUSDT';

(async () => {
  try {
    // console.log('getSymbols: ', await client.getSymbols());
    // console.log('getOrderBook: ', await client.getOrderBook(symbol));
    console.log('getOrderBook: ', await client.getOrderBook(symbol));
  } catch (e) {
    console.error('request failed: ', e);
  }
})();
