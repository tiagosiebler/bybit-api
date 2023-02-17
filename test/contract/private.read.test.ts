import { API_ERROR_CODE, ContractClient } from '../../src';
import { successResponseObjectV3 } from '../response.util';

describe('Private Contract REST API GET Endpoints', () => {
  const API_KEY = process.env.API_KEY_COM;
  const API_SECRET = process.env.API_SECRET_COM;

  it('should have api credentials to test with', () => {
    expect(API_KEY).toStrictEqual(expect.any(String));
    expect(API_SECRET).toStrictEqual(expect.any(String));
  });

  const api = new ContractClient({
    key: API_KEY,
    secret: API_SECRET,
    testnet: false,
  });

  const symbol = 'BTCUSDT';
  it('getHistoricOrders()', async () => {
    expect(await api.getHistoricOrders({ symbol })).toMatchObject(
      successResponseObjectV3()
    );
  });

  it('getHistoricOrders() with hardcoded cursor', async () => {
    const cursor =
      'eyJza2lwX2xvY2FsX3N5bWJvbCI6ZmFsc2UsInBhZ2VfdG9rZW4iOiJleUpOSWpwN0luQnJJanA3SWtJaU9pSktSRmt6VG1wcmVFMXFaM2xNVkUwMFQwUlpkRTVFUlRKTmFURm9UakpPYWt4WFVUSk9lbFY1VDBSU2FrMVhXVEJOZHowOUluMHNJbDl6YTE4aU9uc2lRaUk2SWtaNFltMWFZMDV6TUROek1rNTZXVFZOVkVrMFRXa3dlazlFWnpKTVZGRjRUbXBKZEZsVVpHcFplVEZyVG1wak1VMXFaekJaZWtadFRrUk5QU0o5TENKZmRYTmZJanA3SWtJaU9pSkJLMmt2WkZGRlJ5SjlmWDA9In0=';

    expect(
      await api.getHistoricOrders({ symbol, cursor, limit: 1 })
    ).toMatchObject({
      // retCode: API_ERROR_CODE.DB_ERROR_WRONG_CURSOR,
      ...successResponseObjectV3(),
      retMsg: 'OK',
    });
  });

  it('getHistoricOrders() with dynamic cursor', async () => {
    const orders = await api.getHistoricOrders({ symbol, limit: 1 });

    const cursor = orders.result.nextPageCursor;

    expect(
      await api.getHistoricOrders({ symbol, cursor, limit: 1 })
    ).toMatchObject({
      ...successResponseObjectV3(),
      retMsg: 'OK',
    });
  });

  it('getActiveOrders()', async () => {
    expect(await api.getActiveOrders({ symbol })).toMatchObject(
      successResponseObjectV3()
    );
  });

  it('getPositions()', async () => {
    expect(await api.getPositions({ symbol })).toMatchObject(
      successResponseObjectV3()
    );
  });

  it('getUserExecutionHistory()', async () => {
    expect(await api.getUserExecutionHistory({ symbol })).toMatchObject(
      successResponseObjectV3()
    );
  });

  it('getClosedProfitAndLoss()', async () => {
    expect(await api.getClosedProfitAndLoss({ symbol })).toMatchObject(
      successResponseObjectV3()
    );
  });

  // Doesn't work on e2e test account. This endpoint throws this error if the account never opened a position before.
  it('getOpenInterestLimitInfo()', async () => {
    expect(await api.getOpenInterestLimitInfo('ETHUSDT')).toMatchObject({
      retCode: API_ERROR_CODE.PARAMS_MISSING_OR_WRONG,
      retMsg: expect.stringMatching(/OI group don't exist/gim),
    });
  });

  it('getBalances()', async () => {
    expect(await api.getBalances()).toMatchObject(successResponseObjectV3());
  });

  it('getTradingFeeRate()', async () => {
    expect(await api.getTradingFeeRate()).toMatchObject(
      successResponseObjectV3()
    );
  });

  it('getWalletFundRecords()', async () => {
    expect(await api.getWalletFundRecords()).toMatchObject(
      successResponseObjectV3()
    );
  });
});
