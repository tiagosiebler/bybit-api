import { RestClientV5 } from '../src/index';

// or
// import { RestClientV5 } from 'bybit-api';

const key = process.env.API_KEY_COM;
const secret = process.env.API_SECRET_COM;

const client = new RestClientV5({
  key,
  secret,
  strict_param_validation: true,
});

(async () => {
  try {
    /** Simple example for a private REST API call with bybit's V5 REST APIs */
    const response = await client.getPositionInfo({
      category: 'option',
      symbol: 'BTCUSDT',
    });

    console.log('response:', response);
  } catch (e) {
    console.error('request failed: ', e);
  }
})();
