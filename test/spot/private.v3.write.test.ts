import { API_ERROR_CODE, SpotClientV3 } from '../../src';
import { successResponseObjectV3 } from '../response.util';

describe('Private Spot REST API POST Endpoints', () => {
  const API_KEY = process.env.API_KEY_COM;
  const API_SECRET = process.env.API_SECRET_COM;

  it('should have api credentials to test with', () => {
    expect(API_KEY).toStrictEqual(expect.any(String));
    expect(API_SECRET).toStrictEqual(expect.any(String));
  });

  const api = new SpotClientV3({
    key: API_KEY,
    secret: API_SECRET,
    testnet: false,
  });

  const symbol = 'BTCUSDT';
  const ltCode = 'BTC3S';

  // These tests are primarily check auth is working by expecting balance or order not found style errors

  it('submitOrder()', async () => {
    expect(
      await api.submitOrder({
        side: 'Buy',
        symbol,
        orderQty: '10000',
        orderType: 'MARKET',
      })
    ).toMatchObject({
      retCode: API_ERROR_CODE.BALANCE_INSUFFICIENT_SPOT_V3,
    });
  });

  it('cancelOrder()', async () => {
    expect(
      await api.cancelOrder({
        orderId: '1231231',
      })
    ).toMatchObject({
      retCode: API_ERROR_CODE.ORDER_NOT_FOUND_SPOT_V3,
    });
  });

  it('cancelOrderBatch()', async () => {
    expect(
      await api.cancelOrderBatch({
        symbol,
        orderTypes: ['LIMIT', 'LIMIT_MAKER'],
      })
    ).toMatchObject(successResponseObjectV3());
  });

  it('purchaseLeveragedToken()', async () => {
    expect(await api.purchaseLeveragedToken(ltCode, '1')).toMatchObject({
      retCode: API_ERROR_CODE.EXCEEDED_UPPER_LIMIT_LEVERAGED_TOKEN,
    });
  });

  it('redeemLeveragedToken()', async () => {
    expect(await api.redeemLeveragedToken(ltCode, '1')).toMatchObject({
      retCode: 12426, // unknown error code, not listed in docs yet
    });
  });

  it('borrowCrossMarginLoan()', async () => {
    expect(await api.borrowCrossMarginLoan('USDT', '1')).toMatchObject({
      retCode: API_ERROR_CODE.CROSS_MARGIN_USER_NOT_FOUND,
    });
  });

  it('repayCrossMarginLoan()', async () => {
    expect(await api.repayCrossMarginLoan('USDT', '1')).toMatchObject({
      retCode: API_ERROR_CODE.UNKNOWN_ERROR,
      // previously:
      // retCode: API_ERROR_CODE.CROSS_MARGIN_REPAYMENT_NOT_REQUIRED,
    });
  });
});
