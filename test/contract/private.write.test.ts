import { API_ERROR_CODE, ContractClient } from '../../src';
import { getTestProxy } from '../proxy.util';
import { successResponseObjectV3 } from '../response.util';

describe('Private Contract REST API POST Endpoints', () => {
  const API_KEY = process.env.API_KEY_COM;
  const API_SECRET = process.env.API_SECRET_COM;

  it('should have api credentials to test with', () => {
    expect(API_KEY).toStrictEqual(expect.any(String));
    expect(API_SECRET).toStrictEqual(expect.any(String));
  });

  const api = new ContractClient(
    {
      key: API_KEY,
      secret: API_SECRET,
      testnet: false,
    },
    getTestProxy(),
  );

  const symbol = 'BTCUSDT';

  /**
   * While it may seem silly, these tests simply validate the request is processed at all.
   * Something very wrong would be a sign error or complaints about the endpoint/request method/server error.
   */

  it('submitOrder()', async () => {
    expect(
      await api.submitOrder({
        symbol,
        side: 'Sell',
        orderType: 'Limit',
        qty: '1',
        price: '20000',
        orderLinkId: Date.now().toString(),
        timeInForce: 'GoodTillCancel',
        positionIdx: '2',
      }),
    ).toMatchObject({
      // retMsg: '',
      retCode: API_ERROR_CODE.CONTRACT_INSUFFICIENT_BALANCE,
    });
  });

  it('cancelOrder()', async () => {
    expect(
      await api.cancelOrder({
        symbol,
        orderId: 'somethingFake1',
      }),
    ).toMatchObject({
      retCode: API_ERROR_CODE.CONTRACT_ORDER_NOT_EXISTS,
    });
  });

  it('cancelAllOrders()', async () => {
    expect(await api.cancelAllOrders(symbol)).toMatchObject(
      successResponseObjectV3(),
    );
  });

  it('modifyOrder()', async () => {
    expect(
      await api.modifyOrder({
        symbol,
        orderId: 'somethingFake',
        price: '20000',
      }),
    ).toMatchObject({
      retCode: API_ERROR_CODE.CONTRACT_ORDER_NOT_EXISTS,
    });
  });

  it('setAutoAddMargin()', async () => {
    expect(
      await api.setAutoAddMargin({
        autoAddMargin: 1,
        side: 'Buy',
        symbol,
        positionIdx: 1,
      }),
    ).toMatchObject({
      retMsg: expect.stringMatching(/not modified/gim),
      retCode: API_ERROR_CODE.PARAMS_MISSING_OR_WRONG,
    });
  });

  it('setMarginSwitch()', async () => {
    expect(
      await api.setMarginSwitch({
        symbol,
        tradeMode: 1,
        buyLeverage: '5',
        sellLeverage: '5',
      }),
    ).toMatchObject({
      retCode: API_ERROR_CODE.CONTRACT_MARGIN_MODE_NOT_MODIFIED,
    });
  });

  it('setPositionMode()', async () => {
    expect(
      await api.setPositionMode({
        symbol,
        mode: 3,
      }),
    ).toMatchObject({
      retCode: API_ERROR_CODE.CONTRACT_POSITION_MODE_NOT_MODIFIED,
    });
  });

  it('setTPSLMode()', async () => {
    expect(await api.setTPSLMode(symbol, 'Full')).toMatchObject({
      retCode: API_ERROR_CODE.PARAMS_MISSING_OR_WRONG,
      retMsg: expect.stringMatching(/same/gim),
    });
  });

  it('setLeverage()', async () => {
    expect(await api.setLeverage(symbol, '5', '5')).toMatchObject({
      retCode: API_ERROR_CODE.CONTRACT_SET_LEVERAGE_NOT_MODIFIED,
    });
  });

  it('setTPSL()', async () => {
    expect(
      await api.setTPSL({ symbol, positionIdx: 1, stopLoss: '100' }),
    ).toMatchObject({
      retMsg: expect.stringMatching(/zero position/gim),
      retCode: API_ERROR_CODE.PARAMS_MISSING_OR_WRONG,
    });
  });

  it('setRiskLimit()', async () => {
    expect(await api.setRiskLimit(symbol, 43, 2)).toMatchObject({
      // retMsg: '',
      retCode: API_ERROR_CODE.CONTRACT_RISK_LIMIT_INFO_NOT_EXISTS,
    });
  });
});
