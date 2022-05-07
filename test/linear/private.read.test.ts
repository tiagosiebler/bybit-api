import { LinearClient } from '../../src/linear-client';
import {
  notAuthenticatedError,
  successResponseList,
  successResponseObject,
} from '../response.util';

describe('Public Linear REST API Endpoints', () => {
  const useLivenet = true;
  const API_KEY = process.env.API_KEY_COM;
  const API_SECRET = process.env.API_SECRET_COM;

  it('should have api credentials to test with', () => {
    expect(API_KEY).toStrictEqual(expect.any(String));
    expect(API_SECRET).toStrictEqual(expect.any(String));
  });

  const api = new LinearClient(API_KEY, API_SECRET, useLivenet, {
    disable_time_sync: true,
  });

  const symbol = 'BTCUSDT';
  const interval = '15';
  const timestampOneHourAgo = new Date().getTime() / 1000 - 1000 * 60 * 60;
  const from = Number(timestampOneHourAgo.toFixed(0));

  describe('Linear only private GET endpoints', () => {
    it('getApiKeyInfo()', async () => {
      expect(await api.getApiKeyInfo()).toMatchObject(successResponseObject());
    });

    it('getWalletBalance()', async () => {
      expect(await api.getWalletBalance()).toMatchObject(
        successResponseObject()
      );
    });

    it('getWalletFundRecords()', async () => {
      expect(await api.getWalletFundRecords()).toMatchObject(
        successResponseObject()
      );
    });

    it('getWithdrawRecords()', async () => {
      expect(await api.getWithdrawRecords()).toMatchObject(
        successResponseObject()
      );
    });

    it('getAssetExchangeRecords()', async () => {
      expect(await api.getAssetExchangeRecords()).toMatchObject(
        successResponseList()
      );
    });

    it('getActiveOrderList()', async () => {
      expect(await api.getActiveOrderList({ symbol: symbol })).toMatchObject(
        successResponseObject()
      );
    });

    it('queryActiveOrder()', async () => {
      expect(await api.queryActiveOrder({ symbol: symbol })).toMatchObject(
        successResponseObject()
      );
    });

    it('getConditionalOrder()', async () => {
      expect(await api.getConditionalOrder({ symbol: symbol })).toMatchObject(
        successResponseObject()
      );
    });

    it('queryConditionalOrder()', async () => {
      expect(await api.queryConditionalOrder({ symbol: symbol })).toMatchObject(
        successResponseObject()
      );
    });

    it('getPosition()', async () => {
      expect(await api.getPosition()).toMatchObject(successResponseObject());
    });

    it('getTradeRecords()', async () => {
      expect(await api.getTradeRecords({ symbol: symbol })).toMatchObject(
        successResponseObject()
      );
    });

    it('getClosedPnl()', async () => {
      expect(await api.getClosedPnl({ symbol: symbol })).toMatchObject(
        successResponseObject()
      );
    });

    it('getRiskLimitList()', async () => {
      expect(await api.getRiskLimitList({ symbol: symbol })).toMatchObject(
        successResponseList()
      );
    });

    it('getPredictedFundingFee()', async () => {
      expect(
        await api.getPredictedFundingFee({ symbol: symbol })
      ).toMatchObject(successResponseObject());
    });

    it('getLastFundingFee()', async () => {
      expect(await api.getLastFundingFee({ symbol: symbol })).toMatchObject(
        successResponseObject()
      );
    });
  });
});
