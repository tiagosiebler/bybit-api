import { InverseClient } from '../../src/inverse-client';
import {
  notAuthenticatedError,
  successResponseList,
  successResponseObject,
} from '../response.util';

describe.skip('Private Inverse REST API Endpoints', () => {
  const useLivenet = true;
  const API_KEY = process.env.API_KEY_COM;
  const API_SECRET = process.env.API_SECRET_COM;

  it('should have api credentials to test with', () => {
    expect(API_KEY).toStrictEqual(expect.any(String));
    expect(API_SECRET).toStrictEqual(expect.any(String));
  });

  const api = new InverseClient(API_KEY, API_SECRET, useLivenet, {
    disable_time_sync: true,
  });

  const symbol = 'BTCUSD';
  const interval = '15';
  const timestampOneHourAgo = new Date().getTime() / 1000 - 1000 * 60 * 60;
  const from = Number(timestampOneHourAgo.toFixed(0));

  describe('Inverse only endpoints', () => {
    it('getOrderBook()', async () => {
      expect(await api.getOrderBook({ symbol })).toMatchObject(
        successResponseList()
      );
    });

    it('getKline()', async () => {
      expect(await api.getKline({ symbol, interval, from })).toMatchObject(
        successResponseList()
      );
    });
  });
});
