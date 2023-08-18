/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { SpotClient } from '../../src';
import {
  notAuthenticatedError,
  successResponseList,
  successResponseObject,
} from '../response.util';

describe.skip('Public Spot REST API Endpoints', () => {
  const api = new SpotClient();

  const symbol = 'BTCUSDT';
  const interval = '15m';
  const timestampOneHourAgo = new Date().getTime() / 1000 - 1000 * 60 * 60;
  const from = Number(timestampOneHourAgo.toFixed(0));

  it('should throw for unauthenticated private calls', async () => {
    expect(() => api.getOpenOrders()).rejects.toMatchObject(
      notAuthenticatedError(),
    );
    expect(() => api.getBalances()).rejects.toMatchObject(
      notAuthenticatedError(),
    );
  });

  it('getSymbols()', async () => {
    expect(await api.getSymbols()).toMatchObject(successResponseList());
  });

  it('getOrderBook()', async () => {
    expect(await api.getOrderBook(symbol)).toMatchObject(
      successResponseObject(),
    );
  });

  it('getMergedOrderBook()', async () => {
    expect(await api.getMergedOrderBook(symbol)).toMatchObject(
      successResponseObject(),
    );
  });

  it('getTrades()', async () => {
    expect(await api.getTrades(symbol)).toMatchObject(successResponseObject());
  });

  it('getCandles()', async () => {
    expect(await api.getCandles(symbol, interval)).toMatchObject(
      successResponseObject(),
    );
  });

  it('get24hrTicker()', async () => {
    expect(await api.get24hrTicker()).toMatchObject(successResponseObject());
  });

  it('getLastTradedPrice()', async () => {
    expect(await api.getLastTradedPrice()).toMatchObject(
      successResponseObject(),
    );
  });

  it('getBestBidAskPrice()', async () => {
    expect(await api.getBestBidAskPrice()).toMatchObject(
      successResponseObject(),
    );
  });

  it('getServerTime()', async () => {
    expect(await api.getServerTime()).toStrictEqual(expect.any(Number));
  });

  it('fetchServertime() returns number', async () => {
    expect(await api.fetchServerTime()).toStrictEqual(expect.any(Number));
  });
});
