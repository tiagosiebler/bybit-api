import { InverseClient } from '../../src/';
import { successResponseList, successResponseObject } from '../response.util';

describe('Private Inverse REST API GET Endpoints', () => {
  const API_KEY = process.env.API_KEY_COM;
  const API_SECRET = process.env.API_SECRET_COM;

  it('should have api credentials to test with', () => {
    expect(API_KEY).toStrictEqual(expect.any(String));
    expect(API_SECRET).toStrictEqual(expect.any(String));
  });

  const api = new InverseClient({
    key: API_KEY,
    secret: API_SECRET,
    testnet: false,
  });

  const symbol = 'BTCUSD';

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

  it('getLcpInfo()', async () => {
    expect(await api.getLcpInfo({ symbol: symbol })).toMatchObject(
      successResponseObject()
    );
  });
});
