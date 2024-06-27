import { UMCandlesRequest, UnifiedMarginClient } from '../../src';
import { getTestProxy } from '../proxy.util';
import {
  successResponseObject,
  successResponseObjectV3,
} from '../response.util';

describe('Public Unified Margin REST API Endpoints', () => {
  const API_KEY = undefined;
  const API_SECRET = undefined;

  const api = new UnifiedMarginClient(
    {
      key: API_KEY,
      secret: API_SECRET,
      testnet: false,
    },
    getTestProxy(),
  );

  const symbol = 'BTCUSDT';
  const category = 'linear';
  const start = Number((Date.now() / 1000).toFixed(0));
  const end = start + 1000 * 60 * 60 * 24;
  const interval = '1';

  const candleRequest: UMCandlesRequest = {
    category,
    symbol,
    interval,
    start,
    end,
  };

  it('getOrderBook()', async () => {
    expect(await api.getOrderBook(symbol, category)).toMatchObject(
      successResponseObjectV3(),
    );
  });

  it('getCandles()', async () => {
    expect(await api.getCandles(candleRequest)).toMatchObject(
      successResponseObjectV3(),
    );
  });

  it('getSymbolTicker()', async () => {
    expect(await api.getSymbolTicker(category)).toMatchObject(
      successResponseObjectV3(),
    );
  });

  it('getInstrumentInfo()', async () => {
    expect(await api.getInstrumentInfo({ category })).toMatchObject(
      successResponseObjectV3(),
    );
  });

  it('getMarkPrice()', async () => {
    expect(await api.getMarkPriceCandles(candleRequest)).toMatchObject(
      successResponseObjectV3(),
    );
  });

  it('getIndexPrice()', async () => {
    expect(await api.getIndexPriceCandles(candleRequest)).toMatchObject(
      successResponseObjectV3(),
    );
  });

  it('getLastFundingRate()', async () => {
    expect(
      await api.getFundingRateHistory({
        category,
        symbol,
      }),
    ).toMatchObject(successResponseObjectV3());
  });

  it('getRiskLimit()', async () => {
    expect(await api.getRiskLimit(category, symbol)).toMatchObject(
      successResponseObjectV3(),
    );
  });

  it('getOptionDeliveryPrice()', async () => {
    expect(await api.getOptionDeliveryPrice({ category })).toMatchObject(
      successResponseObjectV3(),
    );
  });

  it('getTrades()', async () => {
    expect(await api.getTrades({ category, symbol })).toMatchObject(
      successResponseObjectV3(),
    );
  });

  it('getOpenInterest()', async () => {
    expect(
      await api.getOpenInterest({ symbol, category, interval: '5min' }),
    ).toMatchObject(successResponseObjectV3());
  });

  it('getServerTime()', async () => {
    expect(await api.getServerTime()).toMatchObject(successResponseObject());
  });
});
