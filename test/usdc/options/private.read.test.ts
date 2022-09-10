import { USDCOptionClient } from '../../../src';
import {
  successResponseObject,
  successUSDCResponseObject,
} from '../../response.util';

describe('Private Account Asset REST API Endpoints', () => {
  const useLivenet = true;
  const API_KEY = process.env.API_KEY_COM;
  const API_SECRET = process.env.API_SECRET_COM;
  const symbol = 'BTC-30SEP22-400000-C';

  it('should have api credentials to test with', () => {
    expect(API_KEY).toStrictEqual(expect.any(String));
    expect(API_SECRET).toStrictEqual(expect.any(String));
  });

  const api = new USDCOptionClient(API_KEY, API_SECRET, useLivenet);
  const category = 'OPTION';

  it('getActiveRealtimeOrders()', async () => {
    expect(await api.getActiveRealtimeOrders()).toMatchObject(
      successUSDCResponseObject()
    );
  });

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

  it('getBalances()', async () => {
    expect(await api.getBalances()).toMatchObject(successUSDCResponseObject());
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

  it('getDeliveryHistory()', async () => {
    expect(await api.getDeliveryHistory({ symbol })).toMatchObject(
      successUSDCResponseObject()
    );
  });

  it('getPositionsInfoUponExpiry()', async () => {
    expect(await api.getPositionsInfoUponExpiry()).toMatchObject(
      successUSDCResponseObject()
    );
  });
});
