import { API_ERROR_CODE, UnifiedMarginClient } from '../../src';
import { successResponseObjectV3 } from '../response.util';

describe('Private Unified Margin REST API GET Endpoints', () => {
  const API_KEY = process.env.API_KEY_COM;
  const API_SECRET = process.env.API_SECRET_COM;

  it('should have api credentials to test with', () => {
    expect(API_KEY).toStrictEqual(expect.any(String));
    expect(API_SECRET).toStrictEqual(expect.any(String));
  });

  const api = new UnifiedMarginClient({
    key: API_KEY,
    secret: API_SECRET,
    testnet: false,
  });

  const symbol = 'BTCUSDT';
  const category = 'linear';

  it('getActiveOrders()', async () => {
    expect(await api.getActiveOrders({ category })).toMatchObject({
      retCode: API_ERROR_CODE.ACCOUNT_NOT_UNIFIED,
    });
  });

  it('getHistoricOrders()', async () => {
    expect(await api.getHistoricOrders({ category })).toMatchObject({
      retCode: API_ERROR_CODE.ACCOUNT_NOT_UNIFIED,
    });
  });

  it('getPositions()', async () => {
    expect(await api.getPositions({ category })).toMatchObject({
      retCode: API_ERROR_CODE.ACCOUNT_NOT_UNIFIED,
    });
  });

  it('get7DayTradingHistory()', async () => {
    expect(await api.get7DayTradingHistory({ category, symbol })).toMatchObject(
      {
        retCode: API_ERROR_CODE.ACCOUNT_NOT_UNIFIED,
      }
    );
  });

  it('getOptionsSettlementHistory()', async () => {
    expect(await api.getOptionsSettlementHistory({ category })).toMatchObject({
      retCode: API_ERROR_CODE.ACCOUNT_NOT_UNIFIED,
    });
  });

  it('getUSDCPerpetualSettlementHistory()', async () => {
    expect(
      await api.getUSDCPerpetualSettlementHistory({ category })
    ).toMatchObject({
      retCode: API_ERROR_CODE.ACCOUNT_NOT_UNIFIED,
    });
  });

  it('getBalances()', async () => {
    expect(await api.getBalances()).toMatchObject({
      retCode: API_ERROR_CODE.ACCOUNT_NOT_UNIFIED,
    });
  });

  it('getTransactionLog()', async () => {
    expect(
      await api.getTransactionLog({ category, currency: 'USDT' })
    ).toMatchObject({
      retCode: API_ERROR_CODE.ACCOUNT_NOT_UNIFIED,
    });
  });

  it('getCoinExchangeHistory()', async () => {
    expect(await api.getCoinExchangeHistory()).toMatchObject(
      successResponseObjectV3()
    );
  });

  it('getBorrowHistory()', async () => {
    expect(await api.getBorrowHistory()).toMatchObject({
      retCode: API_ERROR_CODE.ACCOUNT_NOT_UNIFIED,
    });
  });

  it('getBorrowRate()', async () => {
    expect(await api.getBorrowRate()).toMatchObject({
      retCode: API_ERROR_CODE.ACCOUNT_NOT_UNIFIED,
    });
  });
});
