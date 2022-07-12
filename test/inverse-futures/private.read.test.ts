import { InverseFuturesClient } from '../../src/inverse-futures-client';
import { successResponseList, successResponseObject } from '../response.util';

describe('Public Inverse-Futures REST API GET Endpoints', () => {
  const useLivenet = true;
  const API_KEY = process.env.API_KEY_COM;
  const API_SECRET = process.env.API_SECRET_COM;

  const api = new InverseFuturesClient(API_KEY, API_SECRET, useLivenet);

  // Warning: if some of these start to fail with 10001 params error, it's probably that this future expired and a newer one exists with a different symbol!
  const symbol = 'BTCUSDU22';

  it('getApiKeyInfo()', async () => {
    expect(await api.getApiKeyInfo()).toMatchObject(successResponseObject());
  });

  it('getWalletBalance()', async () => {
    expect(await api.getWalletBalance()).toMatchObject(successResponseObject());
  });

  it('getWalletFundRecords()', async () => {
    expect(await api.getWalletFundRecords()).toMatchObject(
      successResponseObject()
    );
  });

  it('getWithdrawRecords()', async () => {
    expect(await api.getWithdrawRecords()).toMatchObject(
      successResponseObject()
    );
  });

  it('getAssetExchangeRecords()', async () => {
    expect(await api.getAssetExchangeRecords()).toMatchObject(
      successResponseList()
    );
  });

  it('getActiveOrderList()', async () => {
    expect(await api.getActiveOrderList({ symbol: symbol })).toMatchObject(
      successResponseObject()
    );
  });

  it('queryActiveOrder()', async () => {
    expect(await api.queryActiveOrder({ symbol: symbol })).toMatchObject(
      successResponseObject()
    );
  });

  it('getConditionalOrder()', async () => {
    expect(await api.getConditionalOrder({ symbol: symbol })).toMatchObject(
      successResponseObject()
    );
  });

  it('queryConditionalOrder()', async () => {
    expect(await api.queryConditionalOrder({ symbol: symbol })).toMatchObject(
      successResponseObject()
    );
  });

  it('getPosition()', async () => {
    expect(await api.getPosition()).toMatchObject(successResponseObject());
  });

  it('getTradeRecords()', async () => {
    expect(await api.getTradeRecords({ symbol: symbol })).toMatchObject(
      successResponseObject()
    );
  });

  it('getClosedPnl()', async () => {
    expect(await api.getClosedPnl({ symbol: symbol })).toMatchObject(
      successResponseObject()
    );
  });

  it('getMyLastFundingFee()', async () => {
    expect(await api.getMyLastFundingFee({ symbol: symbol })).toMatchObject(
      successResponseObject()
    );
  });

  it('getPredictedFunding()', async () => {
    expect(await api.getPredictedFunding({ symbol: 'BTCUSD' })).toMatchObject(
      successResponseObject()
    );
  });

  it('getLcpInfo()', async () => {
    expect(await api.getLcpInfo({ symbol: symbol })).toMatchObject(
      successResponseObject()
    );
  });
});
