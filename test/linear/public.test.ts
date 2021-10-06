import { LinearClient } from "../../src/linear-client";
import { notAuthenticatedError, successResponseList, successResponseObject } from "../response.util";

describe('Public Linear REST API Endpoints', () => {
  const useLivenet = true;
  const api = new LinearClient(undefined, undefined, useLivenet, { disable_time_sync: true });

  const symbol = 'BTCUSDT';
  const interval = '15';
  const timestampOneHourAgo = (new Date().getTime() / 1000) - (1000 * 60 * 60);
  const from = Number(timestampOneHourAgo.toFixed(0));

  describe('Linear only endpoints', () => {
    it('should throw for unauthenticated private calls', async () => {
      expect(() => api.getPosition()).rejects.toMatchObject(notAuthenticatedError());
    });

    it('getKline()', async () => {
      expect(
        await api.getKline({ symbol, interval, from })
      ).toMatchObject(successResponseList());
    });

    it('getTrades()', async () => {
      expect(await api.getTrades({ symbol })).toMatchObject(successResponseList());
    });

    it('getIndexPriceKline()', async () => {
      expect(await api.getIndexPriceKline({ symbol, interval, from })).toMatchObject(successResponseList());
    });

    it('getPremiumIndexKline()', async () => {
      expect(await api.getPremiumIndexKline({ symbol, interval, from })).toMatchObject(successResponseList());
    });

    it('getLastFundingRate()', async () => {
      expect(await api.getLastFundingRate({ symbol })).toMatchObject(successResponseObject());
    });
  });

  describe('Shared endpoints', () => {
    it('should throw for unauthenticated private calls', async () => {
      expect(() => api.getApiKeyInfo()).rejects.toMatchObject(notAuthenticatedError());
    });

    it('getOrderBook()', async () => {
      expect(await api.getOrderBook({ symbol })).toMatchObject(successResponseList());
    });

    it('getTickers()', async () => {
      expect(await api.getTickers()).toMatchObject(successResponseList());
    });

    it('getSymbols()', async () => {
      expect(await api.getSymbols()).toMatchObject(successResponseList());
    });

    it('getServerTime()', async () => {
      expect(await api.getServerTime()).toMatchObject(successResponseObject());
    });

    it('getApiAnnouncements()', async () => {
      expect(await api.getApiAnnouncements()).toMatchObject(successResponseList());
    });
  });
});
