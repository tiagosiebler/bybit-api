import { AccountAssetClient } from '../../src';
import { successResponseObject } from '../response.util';

describe('Public Account Asset REST API Endpoints', () => {
  const useLivenet = true;
  const API_KEY = undefined;
  const API_SECRET = undefined;

  const api = new AccountAssetClient(API_KEY, API_SECRET, useLivenet);

  it('getSupportedDepositList()', async () => {
    expect(await api.getSupportedDepositList()).toMatchObject(
      successResponseObject()
    );
  });

  it('getServerTime()', async () => {
    expect(await api.getServerTime()).toMatchObject(successResponseObject());
  });
});
