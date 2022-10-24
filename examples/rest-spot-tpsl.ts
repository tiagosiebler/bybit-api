import { SpotClientV3 } from '../src/index';

// or
// import { SpotClientV3 } from 'bybit-api';

const symbol = 'BTCUSDT';
const key = process.env.API_KEY_COM;
const secret = process.env.API_SECRET_COM;

const client = new SpotClientV3({
  key,
  secret,
  strict_param_validation: true,
});

(async () => {
  try {
    const orderId = undefined;
    const ordersPerPage = undefined;

    const orders = await client.getOpenOrders(symbol);
    console.log('orders 1:', orders);

    const normalOrders = await client.getOpenOrders(
      symbol,
      orderId,
      ordersPerPage,
      0
    );
    console.log('normal orders:', normalOrders);

    const tpSlOrders = await client.getOpenOrders(
      symbol,
      orderId,
      ordersPerPage,
      1
    );
    console.log('tpSlOrders:', tpSlOrders);
  } catch (e) {
    console.error('request failed: ', e);
  }
})();
