import { ContractClient } from '../../src/index';

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
    const getPositions = await client.getPositions({
      settleCoin: 'USDT',
    });
    console.log('getPositions:', getPositions);
  } catch (e) {
    console.error('request failed: ', e);
  }
})();
