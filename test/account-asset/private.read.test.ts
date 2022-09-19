import { AccountAssetClient } from '../../src/';
import { successResponseObject } from '../response.util';

describe('Private Account Asset REST API GET Endpoints', () => {
  const API_KEY = process.env.API_KEY_COM;
  const API_SECRET = process.env.API_SECRET_COM;

  it('should have api credentials to test with', () => {
    expect(API_KEY).toStrictEqual(expect.any(String));
    expect(API_SECRET).toStrictEqual(expect.any(String));
  });

  const api = new AccountAssetClient({
    key: API_KEY,
    secret: API_SECRET,
    testnet: false,
  });

  it('getInternalTransfers()', async () => {
    expect(await api.getInternalTransfers()).toMatchObject(
      successResponseObject()
    );
  });

  it('getSubAccountTransfers()', async () => {
    expect(await api.getSubAccountTransfers()).toMatchObject(
      successResponseObject()
    );
  });

  it('getSubAccounts()', async () => {
    expect(await api.getSubAccounts()).toMatchObject(successResponseObject());
  });

  it('getUniversalTransfers()', async () => {
    expect(await api.getInternalTransfers()).toMatchObject(
      successResponseObject()
    );
  });

  it('getDepositRecords()', async () => {
    expect(await api.getDepositRecords()).toMatchObject(
      successResponseObject()
    );
  });

  it('getWithdrawRecords()', async () => {
    expect(await api.getWithdrawRecords()).toMatchObject(
      successResponseObject()
    );
  });

  it('getCoinInformation()', async () => {
    expect(await api.getCoinInformation()).toMatchObject(
      successResponseObject()
    );
  });

  it('getAssetInformation()', async () => {
    expect(await api.getAssetInformation()).toMatchObject(
      successResponseObject()
    );
  });

  it('getDepositAddress()', async () => {
    expect(await api.getDepositAddress('BTC')).toMatchObject(
      successResponseObject()
    );
  });
});
