import { SpotClient } from '../../src';
import {
  errorResponseObject,
  notAuthenticatedError,
  successResponseList,
  successResponseObject,
} from '../response.util';

describe('Private Spot REST API Endpoints', () => {
  const useLivenet = true;
  const API_KEY = process.env.API_KEY_COM;
  const API_SECRET = process.env.API_SECRET_COM;

  it('should have api credentials to test with', () => {
    expect(API_KEY).toStrictEqual(expect.any(String));
    expect(API_SECRET).toStrictEqual(expect.any(String));
  });

  const api = new SpotClient(API_KEY, API_SECRET, useLivenet, {
    disable_time_sync: true,
  });

  const symbol = 'BTCUSDT';
  const interval = '15m';

  it('getOrder()', async () => {
    // No auth error == test pass
    expect(await api.getOrder({ orderId: '123123' })).toMatchObject(
      errorResponseObject(null, -2013, 'Order does not exist.')
    );
  });

  it('getOpenOrders()', async () => {
    expect(await api.getOpenOrders()).toMatchObject(successResponseList(''));
  });

  it('getPastOrders()', async () => {
    expect(await api.getPastOrders()).toMatchObject(successResponseList(''));
  });

  it('getMyTrades()', async () => {
    expect(await api.getMyTrades()).toMatchObject(successResponseList(''));
  });

  it('getBalances()', async () => {
    expect(await api.getBalances()).toMatchObject({
      result: {
        balances: expect.any(Array),
      },
      ret_code: 0,
      ret_msg: '',
    });
  });
});
