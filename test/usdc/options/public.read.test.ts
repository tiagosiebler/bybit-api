import { USDCOptionsClient } from '../../../src';
import {
  successResponseObject,
  successUSDCResponseObject,
} from '../../response.util';

describe('Public USDC Options REST API Endpoints', () => {
  const useLivenet = true;
  const API_KEY = undefined;
  const API_SECRET = undefined;

  const api = new USDCOptionsClient(API_KEY, API_SECRET, useLivenet);
  const symbol = 'BTC-30SEP22-400000-C';

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

  it('getDeliveryPrice()', async () => {
    expect(await api.getDeliveryPrice()).toMatchObject(
      successUSDCResponseObject()
    );
  });

  it('getLastTrades()', async () => {
    expect(await api.getLastTrades({ category: 'OPTION' })).toMatchObject(
      successUSDCResponseObject()
    );
  });

  it('getHistoricalVolatility()', async () => {
    expect(await api.getHistoricalVolatility()).toMatchObject(
      successUSDCResponseObject()
    );
  });

  it('getServerTime()', async () => {
    expect(await api.getServerTime()).toMatchObject(successResponseObject());
  });
});
