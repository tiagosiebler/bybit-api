import { API_ERROR_CODE, SpotClient } from '../../src';
import { successResponseObject } from '../response.util';

describe('Private Spot REST API POST Endpoints', () => {
  const API_KEY = process.env.API_KEY_COM;
  const API_SECRET = process.env.API_SECRET_COM;

  it('should have api credentials to test with', () => {
    expect(API_KEY).toStrictEqual(expect.any(String));
    expect(API_SECRET).toStrictEqual(expect.any(String));
  });

  const api = new SpotClient({
    key: API_KEY,
    secret: API_SECRET,
    testnet: false,
  });

  // Warning: if some of these start to fail with 10001 params error, it's probably that this future expired and a newer one exists with a different symbol!
  const symbol = 'BTCUSDT';

  // These tests are primarily check auth is working by expecting balance or order not found style errors

  it('submitOrder()', async () => {
    expect(
      await api.submitOrder({
        side: 'Buy',
        symbol,
        qty: 10000,
        type: 'MARKET',
      })
    ).toMatchObject({
      ret_code: API_ERROR_CODE.BALANCE_INSUFFICIENT_SPOT,
      ret_msg: 'Balance insufficient ',
    });
  });

  it('cancelOrder()', async () => {
    expect(
      await api.cancelOrder({
        orderId: '1231231',
      })
    ).toMatchObject({
      ret_code: API_ERROR_CODE.ORDER_NOT_FOUND_OR_TOO_LATE_SPOT,
      ret_msg: 'Order does not exist.',
    });
  });

  it('cancelOrderBatch()', async () => {
    expect(
      await api.cancelOrderBatch({
        symbol,
        orderTypes: ['LIMIT', 'LIMIT_MAKER'],
      })
    ).toMatchObject(successResponseObject());
  });
});
