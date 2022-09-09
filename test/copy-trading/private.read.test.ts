import { API_ERROR_CODE, CopyTradingClient } from '../../src';
import { successResponseObject } from '../response.util';

describe('Private Copy Trading REST API Endpoints', () => {
  const useLivenet = true;
  const API_KEY = process.env.API_KEY_COM;
  const API_SECRET = process.env.API_SECRET_COM;

  it('should have api credentials to test with', () => {
    expect(API_KEY).toStrictEqual(expect.any(String));
    expect(API_SECRET).toStrictEqual(expect.any(String));
  });

  const api = new CopyTradingClient(API_KEY, API_SECRET, useLivenet);

  // Don't have copy trading properly enabled on the test account, so testing is very light
  // (just make sure auth works and endpoint doesn't throw)

  it('getActiveOrders()', async () => {
    expect(await api.getActiveOrders()).toMatchObject({
      retCode: API_ERROR_CODE.INCORRECT_API_KEY_PERMISSIONS,
    });
  });

  it('getPositions()', async () => {
    expect(await api.getPositions()).toMatchObject({
      retCode: API_ERROR_CODE.INCORRECT_API_KEY_PERMISSIONS,
    });
  });

  it('getBalance()', async () => {
    expect(await api.getBalance()).toMatchObject({
      retCode: API_ERROR_CODE.INCORRECT_API_KEY_PERMISSIONS,
    });
  });
});
