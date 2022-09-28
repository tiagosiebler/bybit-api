import { API_ERROR_CODE, LinearClient } from '../../src';
import { successResponseObject } from '../response.util';

describe('Private Linear REST API POST Endpoints', () => {
  const API_KEY = process.env.API_KEY_COM;
  const API_SECRET = process.env.API_SECRET_COM;

  it('should have api credentials to test with', () => {
    expect(API_KEY).toStrictEqual(expect.any(String));
    expect(API_SECRET).toStrictEqual(expect.any(String));
  });

  const api = new LinearClient({
    key: API_KEY,
    secret: API_SECRET,
    testnet: false,
  });

  // Warning: if some of these start to fail with 10001 params error, it's probably that this future expired and a newer one exists with a different symbol!
  const symbol = 'BTCUSDT';

  // These tests are primarily check auth is working by expecting balance or order not found style errors

  it('placeActiveOrder()', async () => {
    expect(
      await api.placeActiveOrder({
        side: 'Buy',
        symbol,
        order_type: 'Limit',
        price: 20000,
        qty: 1,
        time_in_force: 'GoodTillCancel',
        reduce_only: false,
        close_on_trigger: false,
      })
    ).toMatchObject({
      ret_code: API_ERROR_CODE.ORDER_COST_NOT_AVAILABLE,
    });
  });

  it('cancelActiveOrder()', async () => {
    expect(
      await api.cancelActiveOrder({
        symbol,
      })
    ).toMatchObject({
      ret_code: API_ERROR_CODE.ORDER_NOT_FOUND_OR_TOO_LATE,
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
        p_r_qty: 1,
        p_r_price: 30000,
      })
    ).toMatchObject({
      ret_code: API_ERROR_CODE.ORDER_NOT_FOUND_OR_TOO_LATE,
    });
  });

  it('placeConditionalOrder()', async () => {
    expect(
      await api.placeConditionalOrder({
        order_type: 'Limit',
        side: 'Buy',
        symbol,
        qty: 1,
        price: 8100,
        base_price: 8300,
        stop_px: 8150,
        time_in_force: 'GoodTillCancel',
        order_link_id: 'cus_order_id_1',
        reduce_only: false,
        trigger_by: 'LastPrice',
      })
    ).toMatchObject({
      ret_code: API_ERROR_CODE.INSUFFICIENT_BALANCE_FOR_ORDER_COST_LINEAR,
    });
  });

  it('cancelConditionalOrder()', async () => {
    expect(
      await api.cancelConditionalOrder({
        symbol,
        order_link_id: 'lkasmdflasd',
      })
    ).toMatchObject({
      ret_code: API_ERROR_CODE.ORDER_NOT_FOUND_OR_TOO_LATE_LINEAR,
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
        p_r_price: 50000,
        p_r_qty: 1,
        order_link_id: 'someorderid',
      })
    ).toMatchObject({
      ret_code: API_ERROR_CODE.ORDER_NOT_FOUND_OR_TOO_LATE_LINEAR,
    });
  });

  it('setAutoAddMargin()', async () => {
    expect(
      await api.setAutoAddMargin({
        symbol,
        side: 'Buy',
        auto_add_margin: true,
      })
    ).toMatchObject({
      ret_code: API_ERROR_CODE.AUTO_ADD_MARGIN_NOT_MODIFIED,
    });
  });

  it('setMarginSwitch()', async () => {
    expect(
      await api.setMarginSwitch({
        symbol,
        is_isolated: true,
        buy_leverage: 5,
        sell_leverage: 5,
      })
    ).toMatchObject({
      ret_code: API_ERROR_CODE.ISOLATED_NOT_MODIFIED_LINEAR,
    });
  });

  it('setPositionMode()', async () => {
    expect(
      await api.setPositionMode({
        symbol,
        mode: 'BothSide',
      })
    ).toMatchObject({
      ret_code: API_ERROR_CODE.POSITION_MODE_NOT_MODIFIED,
    });
  });

  it('setPositionTpSlMode()', async () => {
    expect(
      await api.setPositionTpSlMode({
        symbol,
        tp_sl_mode: 'Full',
      })
    ).toMatchObject({
      ret_code: API_ERROR_CODE.SAME_SLTP_MODE_LINEAR,
    });
  });

  it('setAddReduceMargin()', async () => {
    expect(
      await api.setAddReduceMargin({
        symbol,
        side: 'Buy',
        margin: 5,
      })
    ).toMatchObject({
      ret_code: API_ERROR_CODE.POSITION_SIZE_IS_ZERO,
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
    });
  });

  it('setTradingStop()', async () => {
    expect(
      await api.setTradingStop({
        symbol,
        side: 'Buy',
        take_profit: 555,
      })
    ).toMatchObject({
      ret_code: API_ERROR_CODE.CANNOT_SET_LINEAR_TRADING_STOP_FOR_ZERO_POS,
    });
  });

  it('setRiskLimit()', async () => {
    expect(
      await api.setRiskLimit({
        symbol,
        side: 'Buy',
        risk_id: 2,
      })
    ).toMatchObject({
      ret_code: API_ERROR_CODE.RISK_ID_NOT_MODIFIED,
    });
  });
});
