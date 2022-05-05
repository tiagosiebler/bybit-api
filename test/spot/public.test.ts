import { SpotClient } from '../../src';
import {
  notAuthenticatedError,
  successResponseList,
  successResponseObject,
} from '../response.util';

describe('Public Spot REST API Endpoints', () => {
  const useLivenet = true;
  const api = new SpotClient(undefined, undefined, useLivenet, {
    disable_time_sync: true,
  });

  const symbol = 'BTCUSDT';
  const interval = '15';
  const timestampOneHourAgo = new Date().getTime() / 1000 - 1000 * 60 * 60;
  const from = Number(timestampOneHourAgo.toFixed(0));

  it('should throw for unauthenticated private calls', async () => {
    expect(() => api.getOpenOrders()).rejects.toMatchObject(
      notAuthenticatedError()
    );
    expect(() => api.getBalances()).rejects.toMatchObject(
      notAuthenticatedError()
    );
  });

  it('getSymbols()', async () => {
    expect(await api.getSymbols()).toMatchObject(successResponseList(''));
  });

  it('getOrderBook()', async () => {
    expect(await api.getOrderBook(symbol)).toMatchObject(
      successResponseObject(null)
    );
  });
});
