/**
 * This is the pure javascript version of the `rest-contract-public.ts` sample
 */

// To use a local build (testing with the repo directly), make sure to `npm run build` first from the repo root
// const { ContractClient } = require('../dist');

// or, use the version installed with npm
const { ContractClient } = require('bybit-api');

(async () => {
  const client = new ContractClient();

  try {
    const orderbookResult = await client.getOrderBook('BTCUSDT', 'linear');
    console.log('orderbook result: ', orderbookResult);
  } catch (e) {
    console.error('request failed: ', e);
  }

})();
