import { API_ERROR_CODE, InverseFuturesClient } from '../../src';
import { successResponseObject } from '../response.util';

describe('Private Inverse-Futures REST API POST Endpoints', () => {
  const API_KEY = process.env.API_KEY_COM;
  const API_SECRET = process.env.API_SECRET_COM;

  it('should have api credentials to test with', () => {
    expect(API_KEY).toStrictEqual(expect.any(String));
    expect(API_SECRET).toStrictEqual(expect.any(String));
  });

  const api = new InverseFuturesClient({
    key: API_KEY,
    secret: API_SECRET,
    testnet: false,
  });

  // Warning: if some of these start to fail with 10001 params error, it's probably that this future expired and a newer one exists with a different symbol!
  let symbol = '';

  beforeAll(async () => {
    const symbolsResponse = await api.getSymbols();

    const prefix = 'BTCUSD';

    const futuresAsset = symbolsResponse.result
      .filter((row) => row.name.startsWith(prefix))
      .find((row) => {
        const splitSymbol = row.name.split(prefix);
        return splitSymbol[1] && splitSymbol[1] !== 'T';
      });

    if (!futuresAsset?.name) {
      throw new Error('No symbol');
    }

    symbol = futuresAsset?.name;
    console.log('Symbol: ', symbol);
  });

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
        p_r_qty: '1',
        p_r_price: '30000',
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
        qty: '1',
        price: '8100',
        base_price: '8300',
        stop_px: '8150',
        time_in_force: 'GoodTillCancel',
        order_link_id: 'cus_order_id_1',
      })
    ).toMatchObject({
      ret_code: API_ERROR_CODE.POSITION_IDX_NOT_MATCH_POSITION_MODE,
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
    });
  });

  it('setTradingStop()', async () => {
    expect(
      await api.setTradingStop({
        symbol,
        take_profit: 50000,
      })
    ).toMatchObject({
      // seems to fluctuate between POSITION_STATUS_NOT_NORMAL and POSITION_IDX_NOT_MATCH_POSITION_MODE
      ret_code: /^30013|30041$/,
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

  it('setPositionMode()', async () => {
    expect(
      await api.setPositionMode({
        symbol,
        mode: 3,
      })
    ).toMatchObject({
      ret_code: API_ERROR_CODE.POSITION_MODE_NOT_MODIFIED,
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
    });
  });
});
