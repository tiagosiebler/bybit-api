import { RestClientV5 } from '../src/index';

// or
// import { RestClientV5 } from 'bybit-api';

/**
 * If you don't plan on making any private api calls,
 * you can instance the REST client without any parameters
 */
const client = new RestClientV5();

(async () => {
  try {
    // const klineResult = await client.getKline({
    //   category: 'linear',
    //   interval: '15',
    //   symbol: 'BTCUSDT',
    // });
    // console.log('klineResult: ', klineResult);

    // const markPriceKlineResult = await client.getMarkPriceKline({
    //   category: 'linear',
    //   interval: '15',
    //   symbol: 'BTCUSDT',
    // });
    // console.log('markPriceKlineResult: ', markPriceKlineResult);

    // const indexPriceKline = await client.getIndexPriceKline({
    //   category: 'linear',
    //   interval: '15',
    //   symbol: 'BTCUSDT',
    // });
    // console.log('indexPriceKline: ', indexPriceKline);

    // const openInterest = await client.getOpenInterest({
    //   category: 'linear',
    //   symbol: 'BTCUSDT',
    //   intervalTime: '5min',
    // });

    const tickers = await client.getTickers({ category: 'linear' });
    // console.log(
    //   JSON.stringify(
    //     tickers.result.list.map((ticker) => ticker.symbol),
    //     null,
    //     2,
    //   ),
    // );

    console.log('response', tickers);
    // openInterest.result.list.forEach((row) => {
    //   console.log('int: ', {
    //     timestamp: row.timestamp,
    //     value: row.openInterest,
    //   });
    // });
    // console.log('openInterest: ', openInterest.result.list);
  } catch (e) {
    console.error('request failed: ', e);
  }
})();
