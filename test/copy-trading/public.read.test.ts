import { CopyTradingClient } from '../../src';
import { getTestProxy } from '../proxy.util';
import { successResponseObject } from '../response.util';

describe('Public Copy Trading REST API Endpoints', () => {
  const API_KEY = undefined;
  const API_SECRET = undefined;

  const api = new CopyTradingClient(
    {
      key: API_KEY,
      secret: API_SECRET,
      testnet: false,
    },
    getTestProxy(),
  );

  it('getSymbols()', async () => {
    expect(await api.getSymbols()).toMatchObject({
      result: {
        list: expect.any(Array),
      },
    });
  });

  it('getServerTime()', async () => {
    expect(await api.getServerTime()).toMatchObject(successResponseObject());
  });
});
