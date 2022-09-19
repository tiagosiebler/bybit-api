import { SpotClientV3 } from '../src/index';

// or
// import { SpotClientV3 } from 'bybit-api';

const client = new SpotClientV3();

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
