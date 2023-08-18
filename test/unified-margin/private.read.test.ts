import { UnifiedMarginClient } from '../../src';
import { getTestProxy } from '../proxy.util';
import { successResponseObjectV3 } from '../response.util';

describe('Private Unified Margin REST API GET Endpoints', () => {
  const API_KEY = process.env.API_KEY_COM;
  const API_SECRET = process.env.API_SECRET_COM;

  it('should have api credentials to test with', () => {
    expect(API_KEY).toStrictEqual(expect.any(String));
    expect(API_SECRET).toStrictEqual(expect.any(String));
  });

  const api = new UnifiedMarginClient(
    {
      key: API_KEY,
      secret: API_SECRET,
      testnet: false,
    },
    getTestProxy(),
  );

  const symbol = 'BTCUSDT';
  const category = 'linear';

  it('getActiveOrders()', async () => {
    expect(await api.getActiveOrders({ category })).toMatchObject({
      retCode: expect.any(Number),
    });
  });

  it('getHistoricOrders()', async () => {
    expect(await api.getHistoricOrders({ category })).toMatchObject({
      retCode: expect.any(Number),
    });
  });

  it('getHistoricOrders() with cursor', async () => {
    const cursor =
      'fb56c285-02ac-424e-a6b1-d10413b65fab%3A1668178953132%2Cfb56c285-02ac-424e-a6b1-d10413b65fab%3A1668178953132';
    expect(await api.getHistoricOrders({ category, cursor })).toMatchObject({
      retCode: expect.any(Number),
      // retMsg: expect.stringMatching(/not.*unified margin/gim),
    });
  });

  it('getPositions()', async () => {
    expect(await api.getPositions({ category })).toMatchObject({
      retCode: expect.any(Number),
    });
  });

  it('get7DayTradingHistory()', async () => {
    expect(await api.get7DayTradingHistory({ category, symbol })).toMatchObject(
      {
        retCode: expect.any(Number),
      },
    );
  });

  it('getOptionsSettlementHistory()', async () => {
    expect(await api.getOptionsSettlementHistory({ category })).toMatchObject({
      retCode: expect.any(Number),
    });
  });

  it('getUSDCPerpetualSettlementHistory()', async () => {
    expect(
      await api.getUSDCPerpetualSettlementHistory({ category }),
    ).toMatchObject({
      retCode: expect.any(Number),
    });
  });

  it('getBalances()', async () => {
    expect(await api.getBalances()).toMatchObject({
      retCode: expect.any(Number),
    });
  });

  it('getTransactionLog()', async () => {
    expect(
      await api.getTransactionLog({ category, currency: 'USDT' }),
    ).toMatchObject({
      retCode: expect.any(Number),
    });
  });

  it('getCoinExchangeHistory()', async () => {
    expect(await api.getCoinExchangeHistory()).toMatchObject(
      successResponseObjectV3(),
    );
  });

  it('getBorrowHistory()', async () => {
    expect(await api.getBorrowHistory()).toMatchObject({
      retCode: expect.any(Number),
    });
  });

  it('getBorrowRate()', async () => {
    expect(await api.getBorrowRate()).toMatchObject({
      retCode: expect.any(Number),
    });
  });
});
