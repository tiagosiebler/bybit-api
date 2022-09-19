import { API_ERROR_CODE, CopyTradingClient } from '../../src';

describe('Private Copy Trading REST API GET Endpoints', () => {
  const API_KEY = process.env.API_KEY_COM;
  const API_SECRET = process.env.API_SECRET_COM;

  it('should have api credentials to test with', () => {
    expect(API_KEY).toStrictEqual(expect.any(String));
    expect(API_SECRET).toStrictEqual(expect.any(String));
  });

  const api = new CopyTradingClient({
    key: API_KEY,
    secret: API_SECRET,
    testnet: false,
  });

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

  it('getBalances()', async () => {
    expect(await api.getBalances()).toMatchObject({
      retCode: API_ERROR_CODE.INCORRECT_API_KEY_PERMISSIONS,
    });
  });
});
