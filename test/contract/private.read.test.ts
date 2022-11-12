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

  it('getOpenInterestLimitInfo()', async () => {
    expect(await api.getOpenInterestLimitInfo(symbol)).toMatchObject(
      successResponseObjectV3()
    );
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
