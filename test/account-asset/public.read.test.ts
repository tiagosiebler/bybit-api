import { AccountAssetClient } from '../../src';
import { successResponseObject } from '../response.util';

describe('Public Account Asset REST API Endpoints', () => {
  const API_KEY = undefined;
  const API_SECRET = undefined;

  const api = new AccountAssetClient({
    key: API_KEY,
    secret: API_SECRET,
    testnet: false,
  });

  it('getSupportedDepositList()', async () => {
    expect(await api.getSupportedDepositList()).toMatchObject(
      successResponseObject()
    );
  });

  it('getServerTime()', async () => {
    expect(await api.getServerTime()).toMatchObject(successResponseObject());
  });
});
