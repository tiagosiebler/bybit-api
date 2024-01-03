/**
 * This is the TypeScript version of the `rest-contract-public.js` sample.
 */

// For testing with the repo directly, import from the src folder
import { ContractClient } from '../../src';

// or, use the version installed with npm
// import { ContractClient } from 'bybit-api';

(async () => {
  const client = new ContractClient();

  try {
    const orderbookResult = await client.getOrderBook('BTCUSDT', 'linear');
    console.log('orderbook result: ', orderbookResult);
  } catch (e) {
    console.error('request failed: ', e);
  }
})();
