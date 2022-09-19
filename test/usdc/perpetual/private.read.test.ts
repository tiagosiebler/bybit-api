import { USDCPerpetualClient } from '../../../src';
import { successResponseObjectV3 } from '../../response.util';

describe('Private USDC Perp REST API GET Endpoints', () => {
  const API_KEY = process.env.API_KEY_COM;
  const API_SECRET = process.env.API_SECRET_COM;

  it('should have api credentials to test with', () => {
    expect(API_KEY).toStrictEqual(expect.any(String));
    expect(API_SECRET).toStrictEqual(expect.any(String));
  });

  const api = new USDCPerpetualClient({
    key: API_KEY,
    secret: API_SECRET,
    testnet: false,
  });

  const symbol = 'BTCPERP';
  const category = 'PERPETUAL';

  it('getActiveOrders()', async () => {
    expect(await api.getActiveOrders({ category })).toMatchObject(
      successResponseObjectV3()
    );
  });

  it('getHistoricOrders()', async () => {
    expect(await api.getHistoricOrders({ category })).toMatchObject(
      successResponseObjectV3()
    );
  });

  it('getOrderExecutionHistory()', async () => {
    expect(await api.getOrderExecutionHistory({ category })).toMatchObject(
      successResponseObjectV3()
    );
  });

  it('getTransactionLog()', async () => {
    expect(await api.getTransactionLog({ type: 'TRADE' })).toMatchObject(
      successResponseObjectV3()
    );
  });

  it('getBalances()', async () => {
    expect(await api.getBalances()).toMatchObject(successResponseObjectV3());
  });

  it('getAssetInfo()', async () => {
    expect(await api.getAssetInfo()).toMatchObject(successResponseObjectV3());
  });

  it('getMarginMode()', async () => {
    expect(await api.getMarginMode()).toMatchObject(successResponseObjectV3());
  });

  it('getPositions()', async () => {
    expect(await api.getPositions({ category })).toMatchObject(
      successResponseObjectV3()
    );
  });

  it('getSettlementHistory()', async () => {
    expect(await api.getSettlementHistory({ symbol })).toMatchObject(
      successResponseObjectV3()
    );
  });

  it('getPredictedFundingRate()', async () => {
    expect(await api.getPredictedFundingRate(symbol)).toMatchObject(
      successResponseObjectV3()
    );
  });
});
