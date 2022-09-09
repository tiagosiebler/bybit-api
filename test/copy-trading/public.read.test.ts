import { CopyTradingClient } from '../../src';
import { successResponseObject } from '../response.util';

describe('Public Copy Trading REST API Endpoints', () => {
  const useLivenet = true;
  const API_KEY = undefined;
  const API_SECRET = undefined;

  const api = new CopyTradingClient(API_KEY, API_SECRET, useLivenet);

  it('getSymbolList()', async () => {
    expect(await api.getSymbolList()).toMatchObject({
      result: {
        list: expect.any(Array),
      },
    });
  });

  it('getServerTime()', async () => {
    expect(await api.getServerTime()).toMatchObject(successResponseObject());
  });

  it('getAnnouncements()', async () => {
    expect(await api.getAnnouncements()).toMatchObject(successResponseObject());
  });
});
