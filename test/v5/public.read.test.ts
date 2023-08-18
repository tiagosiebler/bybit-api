import { RestClientV5 } from '../../src';
import { getTestProxy } from '../proxy.util';
import { successResponseObjectV3 } from '../response.util';

describe('Public V5 REST API Endpoints', () => {
  const API_KEY = undefined;
  const API_SECRET = undefined;

  const api = new RestClientV5(
    {
      key: API_KEY,
      secret: API_SECRET,
      testnet: false,
    },
    getTestProxy(),
  );

  const linearSymbol = 'BTCUSDT';

  describe('Misc Endpoints', () => {
    it('fetchServerTime()', async () => {
      expect(await api.fetchServerTime()).toEqual(expect.any(Number));
    });

    it('getServerTime()', async () => {
      expect(await api.getServerTime()).toMatchObject(
        successResponseObjectV3(),
      );
    });
  });

  describe('Market Endpoints', () => {
    it('getKline()', async () => {
      expect(
        await api.getKline({
          category: 'linear',
          interval: '1',
          symbol: linearSymbol,
        }),
      ).toMatchObject(successResponseObjectV3());
    });

    it('getMarkPriceKline()', async () => {
      expect(
        await api.getMarkPriceKline({
          category: 'linear',
          interval: '1',
          symbol: linearSymbol,
        }),
      ).toMatchObject(successResponseObjectV3());
    });

    it('getIndexPriceKline()', async () => {
      expect(
        await api.getIndexPriceKline({
          category: 'linear',
          interval: '1',
          symbol: linearSymbol,
        }),
      ).toMatchObject(successResponseObjectV3());
    });

    it('getPremiumIndexPriceKline()', async () => {
      expect(
        await api.getPremiumIndexPriceKline({
          category: 'linear',
          interval: '1',
          symbol: linearSymbol,
        }),
      ).toMatchObject(successResponseObjectV3());
    });

    it('getInstrumentsInfo()', async () => {
      expect(
        await api.getInstrumentsInfo({
          category: 'linear',
          symbol: linearSymbol,
        }),
      ).toMatchObject(successResponseObjectV3());
    });

    it('getOrderbook()', async () => {
      expect(
        await api.getOrderbook({
          category: 'linear',
          symbol: linearSymbol,
        }),
      ).toMatchObject(successResponseObjectV3());
    });

    it('getTickers()', async () => {
      expect(
        await api.getTickers({
          category: 'linear',
          symbol: linearSymbol,
        }),
      ).toMatchObject(successResponseObjectV3());
    });

    it('getFundingRateHistory()', async () => {
      expect(
        await api.getFundingRateHistory({
          category: 'linear',
          symbol: linearSymbol,
        }),
      ).toMatchObject(successResponseObjectV3());
    });

    it('getPublicTradingHistory()', async () => {
      expect(
        await api.getPublicTradingHistory({
          category: 'linear',
          symbol: linearSymbol,
        }),
      ).toMatchObject({
        ...successResponseObjectV3(),
        retMsg: 'OK',
        retCode: 0,
      });
    });

    it('getOpenInterest()', async () => {
      expect(
        await api.getOpenInterest({
          category: 'linear',
          symbol: linearSymbol,
          intervalTime: '15min',
        }),
      ).toMatchObject(successResponseObjectV3());
    });

    it('getHistoricalVolatility()', async () => {
      expect(
        await api.getHistoricalVolatility({
          category: 'option',
        }),
      ).toMatchObject(successResponseObjectV3());
    });

    it('getInsurance()', async () => {
      expect(await api.getInsurance()).toMatchObject(successResponseObjectV3());
    });

    it('getRiskLimit()', async () => {
      expect(
        await api.getRiskLimit({
          category: 'linear',
          symbol: linearSymbol,
        }),
      ).toMatchObject(successResponseObjectV3());
    });

    it('getOptionDeliveryPrice()', async () => {
      expect(
        await api.getOptionDeliveryPrice({
          category: 'option',
        }),
      ).toMatchObject(successResponseObjectV3());
    });
  });
});
