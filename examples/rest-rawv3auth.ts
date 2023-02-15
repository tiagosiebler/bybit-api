import { ContractClient } from '../src/index';

// or
// import { ContractClient } from 'bybit-api';

const key = process.env.API_KEY_COM;
const secret = process.env.API_SECRET_COM;

const client = new ContractClient({
  key,
  secret,
  strict_param_validation: true,
});

(async () => {
  try {
    /**
     * You can make raw HTTP requests without the per-endpoint abstraction,
     * e.g. if an endpoint is missing and you're blocked (but please raise an issue if you're missing an endpoint)
     */
    const rawCall = await client.getPrivate('/v5/order/realtime', {
      category: 'linear',
      symbol: 'BTCUSDT',
    });

    console.log('rawCall:', rawCall);
  } catch (e) {
    console.error('request failed: ', e);
  }
})();
