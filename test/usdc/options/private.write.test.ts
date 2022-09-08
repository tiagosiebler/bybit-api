import { API_ERROR_CODE, USDCOptionsClient } from '../../../src';
import {
  successResponseObject,
  successUSDCResponseObject,
} from '../../response.util';

describe('Private Account Asset REST API Endpoints', () => {
  const useLivenet = true;
  const API_KEY = process.env.API_KEY_COM;
  const API_SECRET = process.env.API_SECRET_COM;

  it('should have api credentials to test with', () => {
    expect(API_KEY).toStrictEqual(expect.any(String));
    expect(API_SECRET).toStrictEqual(expect.any(String));
  });

  const api = new USDCOptionsClient(API_KEY, API_SECRET, useLivenet);

  const category = 'OPTION';
  const currency = 'USDC';
  const symbol = 'BTC-30SEP22-400000-C';

  it('submitOrder()', async () => {
    expect(
      await api.submitOrder({
        symbol,
        orderType: 'Limit',
        side: 'Sell',
        orderQty: '1000',
        orderPrice: '40',
        orderLinkId: Date.now().toString(),
        timeInForce: 'GoodTillCancel',
      })
    ).toMatchObject({
      retCode: API_ERROR_CODE.ACCOUNT_NOT_EXIST,
    });
  });

  it('batchSubmitOrders()', async () => {
    expect(
      await api.batchSubmitOrders([
        {
          symbol,
          orderType: 'Limit',
          side: 'Sell',
          orderQty: '1000',
          orderPrice: '40',
          orderLinkId: Date.now().toString(),
          timeInForce: 'GoodTillCancel',
        },
        {
          symbol,
          orderType: 'Limit',
          side: 'Sell',
          orderQty: '1000',
          orderPrice: '40',
          orderLinkId: Date.now().toString(),
          timeInForce: 'GoodTillCancel',
        },
      ])
    ).toMatchObject({
      result: [
        { errorCode: API_ERROR_CODE.ACCOUNT_NOT_EXIST },
        { errorCode: API_ERROR_CODE.ACCOUNT_NOT_EXIST },
      ],
    });
  });

  it('modifyOrder()', async () => {
    expect(
      await api.modifyOrder({
        symbol,
        orderId: 'somethingFake',
      })
    ).toMatchObject({
      retCode: API_ERROR_CODE.ORDER_NOT_EXIST,
    });
  });

  it('batchModifyOrders()', async () => {
    expect(
      await api.batchModifyOrders([
        {
          symbol,
          orderId: 'somethingFake1',
        },
        {
          symbol,
          orderId: 'somethingFake2',
        },
      ])
    ).toMatchObject({
      result: [
        { errorCode: API_ERROR_CODE.ORDER_NOT_EXIST },
        { errorCode: API_ERROR_CODE.ORDER_NOT_EXIST },
      ],
    });
  });

  it('cancelOrder()', async () => {
    expect(
      await api.cancelOrder({
        symbol,
        orderId: 'somethingFake1',
      })
    ).toMatchObject({
      retCode: API_ERROR_CODE.ORDER_NOT_EXIST,
    });
  });

  it('batchCancelOrders()', async () => {
    expect(
      await api.batchCancelOrders([
        {
          symbol,
          orderId: 'somethingFake1',
        },
        {
          symbol,
          orderId: 'somethingFake2',
        },
      ])
    ).toMatchObject({
      result: [
        { errorCode: API_ERROR_CODE.ORDER_NOT_EXIST },
        { errorCode: API_ERROR_CODE.ORDER_NOT_EXIST },
      ],
    });
  });

  it('cancelActiveOrders()', async () => {
    expect(await api.cancelActiveOrders()).toMatchObject({
      retCode: API_ERROR_CODE.NO_ACTIVE_ORDER,
    });
  });

  it('setMarginMode()', async () => {
    expect(await api.setMarginMode('REGULAR_MARGIN')).toMatchObject(
      successUSDCResponseObject()
    );
  });

  it('modifyMMP()', async () => {
    expect(
      await api.modifyMMP({
        currency,
        windowMs: 0,
        frozenPeriodMs: 100,
        qtyLimit: '100',
        deltaLimit: '1',
      })
    ).toMatchObject({
      retCode: API_ERROR_CODE.INCORRECT_MMP_PARAMETERS,
    });
  });

  it('resetMMP()', async () => {
    expect(await api.resetMMP(currency)).toMatchObject({
      retCode: API_ERROR_CODE.INSTITION_MMP_PROFILE_NOT_FOUND,
    });
  });

  /**

  it('asdfasfasdfasdf()', async () => {
    expect(await api.asadfasdfasdfasf()).toStrictEqual('');
  });
   */
});
