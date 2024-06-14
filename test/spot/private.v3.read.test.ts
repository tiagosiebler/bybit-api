import { API_ERROR_CODE, SpotClientV3 } from '../../src';
import { getTestProxy } from '../proxy.util';
import {
  successEmptyResponseObjectV3,
  successResponseListV3,
  successResponseObjectV3,
} from '../response.util';

describe('Private Spot REST API GET Endpoints', () => {
  const API_KEY = process.env.API_KEY_COM;
  const API_SECRET = process.env.API_SECRET_COM;

  it('should have api credentials to test with', () => {
    expect(API_KEY).toStrictEqual(expect.any(String));
    expect(API_SECRET).toStrictEqual(expect.any(String));
  });

  const api = new SpotClientV3(
    {
      key: API_KEY,
      secret: API_SECRET,
      testnet: false,
    },
    getTestProxy(),
  );

  const symbol = 'BTCUSDT';
  // const interval = '15m';
  const ltCode = 'BTC3S';

  it('getOrder()', async () => {
    // No auth error == test pass
    expect(await api.getOrder({ orderId: '123123' })).toMatchObject({
      retCode: API_ERROR_CODE.ORDER_NOT_FOUND_SPOT_V3,
    });
  });

  it('getOpenOrders()', async () => {
    expect(await api.getOpenOrders()).toMatchObject(successResponseListV3());
  });

  it('getOpenOrders() with symbol', async () => {
    expect(await api.getOpenOrders(symbol)).toMatchObject(
      successResponseListV3(),
    );
  });

  it('getOpenOrders() with order category', async () => {
    const orderId = undefined;
    const ordersPerPage = undefined;

    // all these should succeed
    expect(
      await api.getOpenOrders(symbol, orderId, ordersPerPage),
    ).toMatchObject(successResponseListV3());
    expect(
      await api.getOpenOrders(symbol, orderId, ordersPerPage, 0),
    ).toMatchObject(successResponseListV3());
    expect(
      await api.getOpenOrders(symbol, orderId, ordersPerPage, 1),
    ).toMatchObject(successResponseListV3());
  });

  it('getPastOrders()', async () => {
    expect(await api.getPastOrders()).toMatchObject(successResponseListV3());
  });

  it('getMyTrades()', async () => {
    expect(await api.getMyTrades()).toMatchObject(successResponseListV3());
  });

  it('getBalances()', async () => {
    expect(await api.getBalances()).toMatchObject({
      result: {
        balances: expect.any(Array),
      },
      ...successEmptyResponseObjectV3(),
    });
  });

  it('getLeveragedTokenMarketInfo()', async () => {
    expect(await api.getLeveragedTokenMarketInfo(ltCode)).toMatchObject(
      successResponseObjectV3(),
    );
  });

  it('getCrossMarginBorrowingInfo()', async () => {
    expect(await api.getCrossMarginBorrowingInfo()).toMatchObject(
      successResponseObjectV3(),
    );
  });

  it('getCrossMarginAccountInfo()', async () => {
    expect(await api.getCrossMarginAccountInfo()).toMatchObject({
      retCode: API_ERROR_CODE.CROSS_MARGIN_NOT_ENABLED,
    });
  });

  it('getCrossMarginInterestQuota()', async () => {
    expect(await api.getCrossMarginInterestQuota('USDT')).toMatchObject(
      successResponseObjectV3(),
    );
  });

  it('getCrossMarginRepaymentHistory()', async () => {
    expect(await api.getCrossMarginRepaymentHistory()).toMatchObject(
      successResponseObjectV3(),
    );
  });
});
