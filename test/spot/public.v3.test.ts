import { SpotClientV3 } from '../../src';
import {
  notAuthenticatedError,
  successResponseObjectV3,
} from '../response.util';

describe('Public Spot REST API Endpoints', () => {
  const api = new SpotClientV3();

  const symbol = 'BTCUSDT';
  const interval = '15m';
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
    expect(await api.getSymbols()).toMatchObject(successResponseObjectV3());
  });

  it('getOrderBook()', async () => {
    expect(await api.getOrderBook(symbol)).toMatchObject(
      successResponseObjectV3()
    );
  });

  it('getMergedOrderBook()', async () => {
    expect(await api.getMergedOrderBook(symbol)).toMatchObject(
      successResponseObjectV3()
    );
  });

  it('getTrades()', async () => {
    expect(await api.getTrades(symbol)).toMatchObject(
      successResponseObjectV3()
    );
  });

  it('getCandles()', async () => {
    expect(await api.getCandles(symbol, interval)).toMatchObject(
      successResponseObjectV3()
    );
  });

  it('get24hrTicker()', async () => {
    expect(await api.get24hrTicker()).toMatchObject(successResponseObjectV3());
  });

  it('getLastTradedPrice()', async () => {
    expect(await api.getLastTradedPrice()).toMatchObject(
      successResponseObjectV3()
    );
  });

  it('getBestBidAskPrice()', async () => {
    expect(await api.getBestBidAskPrice()).toMatchObject(
      successResponseObjectV3()
    );
  });

  it('fetchServertime() returns number', async () => {
    expect(await api.fetchServerTime()).toStrictEqual(expect.any(Number));
  });
});
