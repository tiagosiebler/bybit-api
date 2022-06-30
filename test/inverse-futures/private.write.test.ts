import { API_ERROR_CODE, InverseFuturesClient } from '../../src';
import { successResponseObject } from '../response.util';

describe('Private Inverse-Futures REST API POST Endpoints', () => {
  const useLivenet = true;
  const API_KEY = process.env.API_KEY_COM;
  const API_SECRET = process.env.API_SECRET_COM;

  it('should have api credentials to test with', () => {
    expect(API_KEY).toStrictEqual(expect.any(String));
    expect(API_SECRET).toStrictEqual(expect.any(String));
  });

  const api = new InverseFuturesClient(API_KEY, API_SECRET, useLivenet, {
    disable_time_sync: true,
  });

  // Warning: if some of these start to fail with 10001 params error, it's probably that this future expired and a newer one exists with a different symbol!
  const symbol = 'BTCUSDU22';

  // These tests are primarily check auth is working by expecting balance or order not found style errors

  it('placeActiveOrder()', async () => {
    expect(
      await api.placeActiveOrder({
        side: 'Buy',
        symbol,
        order_type: 'Limit',
        price: 30000,
        qty: 1,
        time_in_force: 'GoodTillCancel',
      })
    ).toMatchObject({
      ret_code: API_ERROR_CODE.POSITION_IDX_NOT_MATCH_POSITION_MODE,
      ret_msg: 'position idx not match position mode',
    });
  });

  it('cancelActiveOrder()', async () => {
    expect(
      await api.cancelActiveOrder({
        symbol,
      })
    ).toMatchObject({
      ret_code: API_ERROR_CODE.ORDER_NOT_FOUND_OR_TOO_LATE,
      ret_msg: 'order not exists or too late to cancel',
    });
  });

  it('cancelAllActiveOrders()', async () => {
    expect(
      await api.cancelAllActiveOrders({
        symbol,
      })
    ).toMatchObject(successResponseObject());
  });

  it('replaceActiveOrder()', async () => {
    expect(
      await api.replaceActiveOrder({
        symbol,
        order_id: '123123123',
        p_r_qty: '1',
        p_r_price: '30000',
      })
    ).toMatchObject({
      ret_code: API_ERROR_CODE.ORDER_NOT_FOUND_OR_TOO_LATE,
      ret_msg: 'order not exists or too late to replace',
    });
  });

  it('placeConditionalOrder()', async () => {
    expect(
      await api.placeConditionalOrder({
        order_type: 'Limit',
        side: 'Buy',
        symbol,
        qty: '1',
        price: '8100',
        base_price: '8300',
        stop_px: '8150',
        time_in_force: 'GoodTillCancel',
        order_link_id: 'cus_order_id_1',
      })
    ).toMatchObject({
      ret_code: API_ERROR_CODE.POSITION_IDX_NOT_MATCH_POSITION_MODE,
      ret_msg: 'position idx not match position mode',
    });
  });

  it('cancelConditionalOrder()', async () => {
    expect(
      await api.cancelConditionalOrder({
        symbol,
        order_link_id: 'lkasmdflasd',
      })
    ).toMatchObject({
      ret_code: API_ERROR_CODE.ORDER_NOT_FOUND_OR_TOO_LATE,
      ret_msg: 'order not exists or too late to cancel',
    });
  });

  it('cancelAllConditionalOrders()', async () => {
    expect(
      await api.cancelAllConditionalOrders({
        symbol,
      })
    ).toMatchObject(successResponseObject());
  });

  it('replaceConditionalOrder()', async () => {
    expect(
      await api.replaceConditionalOrder({
        symbol,
        p_r_price: '50000',
        p_r_qty: 1,
      })
    ).toMatchObject({
      ret_code: API_ERROR_CODE.ORDER_NOT_FOUND_OR_TOO_LATE,
      ret_msg: 'order not exists or too late to replace',
    });
  });

  it('changePositionMargin()', async () => {
    expect(
      await api.changePositionMargin({
        symbol,
        margin: '10',
      })
    ).toMatchObject({
      ret_code: API_ERROR_CODE.POSITION_IDX_NOT_MATCH_POSITION_MODE,
      ret_msg: 'position idx not match position mode',
    });
  });

  it('setTradingStop()', async () => {
    expect(
      await api.setTradingStop({
        symbol,
        take_profit: 50000,
      })
    ).toMatchObject({
      ret_code: API_ERROR_CODE.POSITION_STATUS_NOT_NORMAL,
      ret_msg: 'position status is not normal',
    });
  });

  it('setUserLeverage()', async () => {
    expect(
      await api.setUserLeverage({
        symbol,
        buy_leverage: 5,
        sell_leverage: 5,
      })
    ).toMatchObject({
      ret_code: API_ERROR_CODE.LEVERAGE_NOT_MODIFIED,
      ret_msg: 'leverage not modified',
    });
  });

  it('setPositionMode()', async () => {
    expect(
      await api.setPositionMode({
        symbol,
        mode: 3,
      })
    ).toMatchObject({
      ret_code: API_ERROR_CODE.POSITION_MODE_NOT_MODIFIED,
      ret_msg: 'position mode not modified',
    });
  });

  it('setMarginType()', async () => {
    expect(
      await api.setMarginType({
        symbol,
        is_isolated: false,
        buy_leverage: 5,
        sell_leverage: 5,
      })
    ).toMatchObject({
      ret_code: API_ERROR_CODE.ISOLATED_NOT_MODIFIED,
      ret_msg: 'Isolated not modified',
    });
  });
});
