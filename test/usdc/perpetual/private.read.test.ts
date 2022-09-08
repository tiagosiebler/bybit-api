import { USDCPerpetualClient } from '../../../src';
import { successUSDCResponseObject } from '../../response.util';

describe('Private Account Asset REST API Endpoints', () => {
  const useLivenet = true;
  const API_KEY = process.env.API_KEY_COM;
  const API_SECRET = process.env.API_SECRET_COM;

  it('should have api credentials to test with', () => {
    expect(API_KEY).toStrictEqual(expect.any(String));
    expect(API_SECRET).toStrictEqual(expect.any(String));
  });

  const api = new USDCPerpetualClient(API_KEY, API_SECRET, useLivenet);

  const symbol = 'BTCPERP';
  const category = 'PERPETUAL';

  it('getActiveOrders()', async () => {
    expect(await api.getActiveOrders({ category })).toMatchObject(
      successUSDCResponseObject()
    );
  });

  it('getHistoricOrders()', async () => {
    expect(await api.getHistoricOrders({ category })).toMatchObject(
      successUSDCResponseObject()
    );
  });

  it('getOrderExecutionHistory()', async () => {
    expect(await api.getOrderExecutionHistory({ category })).toMatchObject(
      successUSDCResponseObject()
    );
  });

  it('getTransactionLog()', async () => {
    expect(await api.getTransactionLog({ type: 'TRADE' })).toMatchObject(
      successUSDCResponseObject()
    );
  });

  it('getBalance()', async () => {
    expect(await api.getBalance()).toMatchObject(successUSDCResponseObject());
  });

  it('getAssetInfo()', async () => {
    expect(await api.getAssetInfo()).toMatchObject(successUSDCResponseObject());
  });

  it('getMarginMode()', async () => {
    expect(await api.getMarginMode()).toMatchObject(
      successUSDCResponseObject()
    );
  });

  it('getPositions()', async () => {
    expect(await api.getPositions({ category })).toMatchObject(
      successUSDCResponseObject()
    );
  });

  it('getSettlementHistory()', async () => {
    expect(await api.getSettlementHistory({ symbol })).toMatchObject(
      successUSDCResponseObject()
    );
  });

  it('getPredictedFundingRate()', async () => {
    expect(await api.getPredictedFundingRate(symbol)).toMatchObject(
      successUSDCResponseObject()
    );
  });
});
