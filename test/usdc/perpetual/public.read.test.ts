import { USDCKlineRequest, USDCPerpetualClient } from '../../../src';
import {
  successResponseObject,
  successResponseObjectV3,
} from '../../response.util';

describe('Public USDC Perp REST API Endpoints', () => {
  const API_KEY = undefined;
  const API_SECRET = undefined;

  const api = new USDCPerpetualClient({
    key: API_KEY,
    secret: API_SECRET,
    testnet: false,
  });

  const symbol = 'BTCPERP';
  const category = 'PERPETUAL';
  const startTime = Number((Date.now() / 1000).toFixed(0));

  const candleRequest: USDCKlineRequest = { symbol, period: '1m', startTime };

  it('getOrderBook()', async () => {
    expect(await api.getOrderBook(symbol)).toMatchObject(
      successResponseObjectV3()
    );
  });

  it('getContractInfo()', async () => {
    expect(await api.getContractInfo()).toMatchObject(
      successResponseObjectV3()
    );
  });

  it('getSymbolTicker()', async () => {
    expect(await api.getSymbolTicker(symbol)).toMatchObject(
      successResponseObjectV3()
    );
  });

  it('getCandles()', async () => {
    expect(await api.getCandles(candleRequest)).toMatchObject(
      successResponseObjectV3()
    );
  });

  it('getMarkPrice()', async () => {
    expect(await api.getMarkPrice(candleRequest)).toMatchObject(
      successResponseObjectV3()
    );
  });

  it('getIndexPrice()', async () => {
    expect(await api.getIndexPrice(candleRequest)).toMatchObject(
      successResponseObjectV3()
    );
  });

  it('getIndexPremium()', async () => {
    expect(await api.getIndexPremium(candleRequest)).toMatchObject(
      successResponseObjectV3()
    );
  });

  it('getOpenInterest()', async () => {
    expect(await api.getOpenInterest({ symbol, period: '1m' })).toMatchObject(
      successResponseObjectV3()
    );
  });

  it('getLargeOrders()', async () => {
    expect(await api.getLargeOrders({ symbol })).toMatchObject(
      successResponseObjectV3()
    );
  });

  it('getLongShortRatio()', async () => {
    expect(await api.getLongShortRatio({ symbol, period: '1m' })).toMatchObject(
      successResponseObjectV3()
    );
  });

  it('getLast500Trades()', async () => {
    expect(await api.getLast500Trades({ category })).toMatchObject(
      successResponseObjectV3()
    );
  });

  it('getLastFundingRate()', async () => {
    expect(await api.getLastFundingRate(symbol)).toMatchObject(
      successResponseObjectV3()
    );
  });

  it('getServerTime()', async () => {
    expect(await api.getServerTime()).toMatchObject(successResponseObject());
  });
});
