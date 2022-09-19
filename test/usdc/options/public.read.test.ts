import { USDCOptionClient } from '../../../src';
import {
  successResponseObject,
  successResponseObjectV3,
} from '../../response.util';

describe('Public USDC Options REST API Endpoints', () => {
  const API_KEY = undefined;
  const API_SECRET = undefined;

  const api = new USDCOptionClient({
    key: API_KEY,
    secret: API_SECRET,
    testnet: false,
  });
  const symbol = 'BTC-30SEP22-400000-C';

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

  it('getDeliveryPrice()', async () => {
    expect(await api.getDeliveryPrice()).toMatchObject(
      successResponseObjectV3()
    );
  });

  it('getLast500Trades()', async () => {
    expect(await api.getLast500Trades({ category: 'OPTION' })).toMatchObject(
      successResponseObjectV3()
    );
  });

  it('getHistoricalVolatility()', async () => {
    expect(await api.getHistoricalVolatility()).toMatchObject(
      successResponseObjectV3()
    );
  });

  it('getServerTime()', async () => {
    expect(await api.getServerTime()).toMatchObject(successResponseObject());
  });
});
