import { USDCKlineRequest, USDCPerpetualClient } from '../../../src';
import {
  successResponseObject,
  successUSDCResponseObject,
} from '../../response.util';

describe('Public USDC Options REST API Endpoints', () => {
  const useLivenet = true;
  const API_KEY = undefined;
  const API_SECRET = undefined;

  const api = new USDCPerpetualClient(API_KEY, API_SECRET, useLivenet);

  const symbol = 'BTCPERP';
  const category = 'PERPETUAL';
  const startTime = Number((Date.now() / 1000).toFixed(0));

  const candleRequest: USDCKlineRequest = { symbol, period: '1m', startTime };

  it('getOrderBook()', async () => {
    expect(await api.getOrderBook(symbol)).toMatchObject(
      successUSDCResponseObject()
    );
  });

  it('getContractInfo()', async () => {
    expect(await api.getContractInfo()).toMatchObject(
      successUSDCResponseObject()
    );
  });

  it('getSymbolTicker()', async () => {
    expect(await api.getSymbolTicker(symbol)).toMatchObject(
      successUSDCResponseObject()
    );
  });

  it('getKline()', async () => {
    expect(await api.getKline(candleRequest)).toMatchObject(
      successUSDCResponseObject()
    );
  });

  it('getMarkPrice()', async () => {
    expect(await api.getMarkPrice(candleRequest)).toMatchObject(
      successUSDCResponseObject()
    );
  });

  it('getIndexPrice()', async () => {
    expect(await api.getIndexPrice(candleRequest)).toMatchObject(
      successUSDCResponseObject()
    );
  });

  it('getIndexPremium()', async () => {
    expect(await api.getIndexPremium(candleRequest)).toMatchObject(
      successUSDCResponseObject()
    );
  });

  it('getOpenInterest()', async () => {
    expect(await api.getOpenInterest({ symbol, period: '1m' })).toMatchObject(
      successUSDCResponseObject()
    );
  });

  it('getLargeOrders()', async () => {
    expect(await api.getLargeOrders({ symbol })).toMatchObject(
      successUSDCResponseObject()
    );
  });

  it('getLongShortRatio()', async () => {
    expect(await api.getLongShortRatio({ symbol, period: '1m' })).toMatchObject(
      successUSDCResponseObject()
    );
  });

  it('getLast500Trades()', async () => {
    expect(await api.getLast500Trades({ category })).toMatchObject(
      successUSDCResponseObject()
    );
  });

  it('getLastFundingRate()', async () => {
    expect(await api.getLastFundingRate(symbol)).toMatchObject(
      successUSDCResponseObject()
    );
  });

  it('getServerTime()', async () => {
    expect(await api.getServerTime()).toMatchObject(successResponseObject());
  });
});
