import { RestClientV5 } from '../src/index';

// or
// import { RestClientV5 } from 'bybit-api';

const key = process.env.API_KEY_COM;
const secret = process.env.API_SECRET_COM;

const client = new RestClientV5({
  key: key,
  secret: secret,
});

/**
 * If you don't plan on making any private api calls,
 * you can instance the REST client without any parameters:
 *
 * const client = new RestClientV5();
 */

(async () => {
  try {
    const klineResult = await client.getKline({
      category: 'linear',
      interval: '15',
      symbol: 'BTCUSDT',
    });
    console.log('klineResult: ', klineResult);

    const markPriceKlineResult = await client.getMarkPriceKline({
      category: 'linear',
      interval: '15',
      symbol: 'BTCUSDT',
    });
    console.log('markPriceKlineResult: ', markPriceKlineResult);

    const indexPriceKline = await client.getIndexPriceKline({
      category: 'linear',
      interval: '15',
      symbol: 'BTCUSDT',
    });
    console.log('indexPriceKline: ', indexPriceKline);
  } catch (e) {
    console.error('request failed: ', e);
  }
})();
