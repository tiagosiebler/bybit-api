import { API_ERROR_CODE, UnifiedMarginClient } from '../../src';

describe('Private Unified Margin REST API POST Endpoints', () => {
  const API_KEY = process.env.API_KEY_COM;
  const API_SECRET = process.env.API_SECRET_COM;

  it('should have api credentials to test with', () => {
    expect(API_KEY).toStrictEqual(expect.any(String));
    expect(API_SECRET).toStrictEqual(expect.any(String));
  });

  const api = new UnifiedMarginClient({
    key: API_KEY,
    secret: API_SECRET,
    testnet: false,
  });

  const symbol = 'BTCUSDT';
  const category = 'linear';

  /**
   * While it may seem silly, these tests simply validate the request is processed at all.
   * Something very wrong would be a sign error or complaints about the endpoint/request method/server error.
   */

  it('submitOrder()', async () => {
    expect(
      await api.submitOrder({
        symbol,
        category,
        side: 'Sell',
        orderType: 'Limit',
        qty: '1',
        price: '20000',
        orderLinkId: Date.now().toString(),
        timeInForce: 'GoodTillCancel',
      })
    ).toMatchObject({
      retCode: API_ERROR_CODE.ACCOUNT_NOT_UNIFIED,
    });
  });

  it('modifyOrder()', async () => {
    expect(
      await api.modifyOrder({
        symbol,
        category,
        orderId: 'somethingFake',
        price: '20000',
      })
    ).toMatchObject({
      retCode: API_ERROR_CODE.ACCOUNT_NOT_UNIFIED,
    });
  });

  it('cancelOrder()', async () => {
    expect(
      await api.cancelOrder({
        symbol,
        category,
        orderId: 'somethingFake1',
        orderFilter: 'Order',
      })
    ).toMatchObject({
      retCode: API_ERROR_CODE.ACCOUNT_NOT_UNIFIED,
    });
  });

  it('batchSubmitOrders()', async () => {
    expect(
      await api.batchSubmitOrders(category, [
        {
          symbol,
          side: 'Buy',
          orderType: 'Limit',
          qty: '1',
          price: '10000',
          timeInForce: 'FillOrKill',
        },
        {
          symbol,
          side: 'Buy',
          orderType: 'Limit',
          qty: '1',
          price: '10001',
          timeInForce: 'FillOrKill',
        },
        {
          symbol,
          side: 'Buy',
          orderType: 'Limit',
          qty: '1',
          price: '10002',
          timeInForce: 'FillOrKill',
        },
      ])
    ).toMatchObject({
      retCode: API_ERROR_CODE.ACCOUNT_NOT_UNIFIED,
    });
  });

  it('batchReplaceOrders()', async () => {
    expect(
      await api.batchReplaceOrders(category, [
        {
          symbol,
          orderLinkId: 'somethingFake1',
          qty: '4',
        },
        {
          symbol,
          orderLinkId: 'somethingFake2',
          qty: '5',
        },
        {
          symbol,
          orderLinkId: 'somethingFake3',
          qty: '6',
        },
      ])
    ).toMatchObject({
      retCode: API_ERROR_CODE.ACCOUNT_NOT_UNIFIED,
    });
  });

  it('batchCancelOrders()', async () => {
    expect(
      await api.batchCancelOrders(category, [
        {
          symbol,
          orderLinkId: 'somethingFake1',
        },
        {
          symbol,
          orderLinkId: 'somethingFake2',
        },
        {
          symbol,
          orderLinkId: 'somethingFake3',
        },
      ])
    ).toMatchObject({
      retCode: API_ERROR_CODE.ACCOUNT_NOT_UNIFIED,
    });
  });

  it('cancelAllOrders()', async () => {
    expect(await api.cancelAllOrders({ category })).toMatchObject({
      retCode: API_ERROR_CODE.ACCOUNT_NOT_UNIFIED,
    });
  });

  it('setLeverage()', async () => {
    expect(await api.setLeverage(category, symbol, 5, 5)).toMatchObject({
      retCode: API_ERROR_CODE.ACCOUNT_NOT_UNIFIED,
    });
  });

  it('setTPSLMode()', async () => {
    expect(await api.setTPSLMode(category, symbol, 1)).toMatchObject({
      retCode: API_ERROR_CODE.ACCOUNT_NOT_UNIFIED,
    });
  });

  it('setRiskLimit()', async () => {
    expect(await api.setRiskLimit(category, symbol, 1, 0)).toMatchObject({
      retCode: API_ERROR_CODE.ACCOUNT_NOT_UNIFIED,
    });
  });

  it('setTPSL()', async () => {
    expect(await api.setTPSL({ category, symbol })).toMatchObject({
      retCode: API_ERROR_CODE.ACCOUNT_NOT_UNIFIED,
    });
  });

  it('transferFunds()', async () => {
    expect(
      await api.transferFunds({
        amount: '1',
        coin: 'USDT',
        from_account_type: 'SPOT',
        to_account_type: 'CONTRACT',
        transfer_id: 'testtransfer',
      })
    ).toMatchObject({
      ret_code: API_ERROR_CODE.INVALID_API_KEY_OR_PERMISSIONS,
    });
  });
});
