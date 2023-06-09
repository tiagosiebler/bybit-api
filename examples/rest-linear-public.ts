import { LinearClient } from '../src/index';

// or
// import { LinearClient } from 'bybit-api';

const client = new LinearClient();

(async () => {
  try {
    // console.log('getSymbols: ', await client.getSymbols());
    // console.log('getOrderBook: ', await client.getOrderBook(symbol));
    console.log(
      'getKline: ',
      await client.getKline({
        symbol: 'ETHUSDT',
        interval: 'D',
        from: 1,
      }),
    );
  } catch (e) {
    console.error('request failed: ', e);
  }
})();
