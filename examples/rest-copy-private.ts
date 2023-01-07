import { CopyTradingClient } from '../src/index';

// or
// import { CopyTradingClient } from 'bybit-api';

const key = process.env.API_KEY_COM;
const secret = process.env.API_SECRET_COM;

const client = new CopyTradingClient({
  key,
  secret,
  strict_param_validation: true,
});

(async () => {
  try {
    const res = await client.closeOrder({
      symbol: 'BTCUSDT',
      parentOrderId: '419190fe-016c-469a-810e-936bef2f1234',
    });
    console.log('res:', res);
  } catch (e) {
    console.error('request failed: ', e);
  }
})();
