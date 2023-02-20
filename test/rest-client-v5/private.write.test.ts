import {
  API_ERROR_CODE,
  OrderSideV5,
  OrderTypeV5,
  RestClientV5,
} from '../../src';
import { successResponseObjectV3 } from '../response.util';

describe('Private WRITE V5 REST API Endpoints', () => {
  const API_KEY = process.env.API_KEY_COM;
  const API_SECRET = process.env.API_SECRET_COM;

  it('should have api credentials to test with', () => {
    expect(API_KEY).toStrictEqual(expect.any(String));
    expect(API_SECRET).toStrictEqual(expect.any(String));
  });

  const api = new RestClientV5({
    key: API_KEY,
    secret: API_SECRET,
    testnet: false,
  });

  const settleCoin = 'USDT';
  const linearSymbol = 'BTCUSDT';
  const orderType: OrderTypeV5 = 'Market';
  const orderSide: OrderSideV5 = 'Buy';
  const fakeOrderId = 'fakeOrderId';

  const fakeTransferId = '42c0cfb0-6bca-c242-bc76-4e6df6cbcb16';

  describe('misc endpoints', () => {
    it('fetchServerTime()', async () => {
      expect(await api.fetchServerTime()).toEqual(expect.any(Number));
    });
  });

  describe('Trade APIs', () => {
    it('submitOrder()', async () => {
      expect(
        await api.submitOrder({
          category: 'linear',
          symbol: linearSymbol,
          orderType: orderType,
          side: orderSide,
          qty: '1',
          positionIdx: 1,
        })
      ).toMatchObject({
        // ...successResponseObjectV3(),
        // retMsg: '',
        retCode: API_ERROR_CODE.V5_INSUFFICIENT_BALANCE,
      });
    });

    it('amendOrder()', async () => {
      expect(
        await api.amendOrder({
          category: 'linear',
          symbol: linearSymbol,
          qty: '2',
          orderId: fakeOrderId,
        })
      ).toMatchObject({
        // ...successResponseObjectV3(),
        // retMsg: '',
        retCode: API_ERROR_CODE.V5_ORDER_NOT_FOUND,
      });
    });

    it('cancelOrder()', async () => {
      expect(
        await api.cancelOrder({
          category: 'linear',
          symbol: linearSymbol,
          orderId: fakeOrderId,
        })
      ).toMatchObject({
        // ...successResponseObjectV3(),
        // retMsg: '',
        retCode: API_ERROR_CODE.V5_ORDER_NOT_FOUND,
      });
    });

    it('cancelAllOrders()', async () => {
      expect(
        await api.cancelAllOrders({
          category: 'linear',
          settleCoin: settleCoin,
        })
      ).toMatchObject({
        ...successResponseObjectV3(),
      });
    });

    it('batchSubmitOrders()', async () => {
      expect(
        await api.batchSubmitOrders('option', [
          {
            orderLinkId: 'customOrderId1',
            orderType: orderType,
            qty: '1',
            side: orderSide,
            symbol: linearSymbol,
          },
          {
            orderLinkId: 'customOrderId2',
            orderType: orderType,
            qty: '2',
            side: orderSide,
            symbol: linearSymbol,
          },
        ])
      ).toMatchObject({
        ...successResponseObjectV3(),
      });
    });

    it('batchAmendOrders()', async () => {
      expect(
        await api.batchAmendOrders('option', [
          {
            orderLinkId: 'customOrderId1',
            qty: '3',
            symbol: linearSymbol,
          },
          {
            orderLinkId: 'customOrderId2',
            qty: '4',
            symbol: linearSymbol,
          },
        ])
      ).toMatchObject({
        ...successResponseObjectV3(),
      });
    });

    it('batchCancelOrders()', async () => {
      expect(
        await api.batchCancelOrders('option', [
          {
            orderLinkId: 'customOrderId1',
            symbol: linearSymbol,
          },
          {
            orderLinkId: 'customOrderId2',
            symbol: linearSymbol,
          },
        ])
      ).toMatchObject({
        ...successResponseObjectV3(),
      });
    });

    it('setDisconnectCancelAllWindow()', async () => {
      expect(await api.setDisconnectCancelAllWindow('option', 5)).toMatchObject(
        {
          // ...successResponseObjectV3(),
          // retMsg: '',
          retCode: API_ERROR_CODE.V5_API_KEY_PERMISSION_DENIED,
        }
      );
    });
  });

  describe('Position APIs', () => {
    it('setLeverage()', async () => {
      expect(
        await api.setLeverage({
          category: 'linear',
          buyLeverage: '10',
          sellLeverage: '10',
          symbol: linearSymbol,
        })
      ).toMatchObject({
        // ...successResponseObjectV3(),
        // retMsg: '',
        retCode: API_ERROR_CODE.V5_LEVERAGE_NOT_CHANGED,
      });
    });

    it('switchIsolatedMargin()', async () => {
      expect(
        await api.switchIsolatedMargin({
          category: 'linear',
          buyLeverage: '10',
          sellLeverage: '10',
          symbol: linearSymbol,
          // isolated
          tradeMode: 1,
        })
      ).toMatchObject({
        // ...successResponseObjectV3(),
        // retMsg: '',
        retCode: API_ERROR_CODE.V5_CROSS_ISOLATED_MARGIN_NOT_CHANGED,
      });
    });

    it('setTPSLMode()', async () => {
      expect(
        await api.setTPSLMode({
          category: 'linear',
          symbol: linearSymbol,
          tpSlMode: 'Full',
        })
      ).toMatchObject({
        // ...successResponseObjectV3(),
        // retMsg: '',
        retCode: API_ERROR_CODE.V5_TPSL_NOT_CHANGED,
      });
    });

    it('switchPositionMode()', async () => {
      expect(
        await api.switchPositionMode({
          category: 'linear',
          // both sides
          mode: 3,
          coin: settleCoin,
        })
      ).toMatchObject({
        ...successResponseObjectV3(),
      });
    });

    it('setRiskLimit()', async () => {
      expect(
        await api.setRiskLimit({
          category: 'linear',
          positionIdx: 1,
          riskId: 1,
          symbol: linearSymbol,
        })
      ).toMatchObject({
        // ...successResponseObjectV3(),
        // retMsg: '',
        retCode: API_ERROR_CODE.V5_RISK_ID_NOT_CHANGED,
      });
    });

    it('setTradingStop()', async () => {
      expect(
        await api.setTradingStop({
          category: 'linear',
          positionIdx: 1,
          symbol: linearSymbol,
          slSize: '100',
          slTriggerBy: 'LastPrice',
          stopLoss: '25000',
        })
      ).toMatchObject({
        // ...successResponseObjectV3(),
        // retMsg: '',
        retCode: API_ERROR_CODE.V5_TPSL_ERROR_NO_POSITION,
      });
    });

    it('setAutoAddMargin()', async () => {
      expect(
        await api.setAutoAddMargin({
          category: 'linear',
          autoAddMargin: 0,
          symbol: linearSymbol,
          positionIdx: 0,
        })
      ).toMatchObject({
        // ...successResponseObjectV3(),
        // retMsg: '',
        retCode: API_ERROR_CODE.V5_AUTO_ADD_MARGIN_NOT_CHANGED,
      });
    });
  });

  describe('Account APIs', () => {
    it('setMarginMode()', async () => {
      expect(await api.setMarginMode('REGULAR_MARGIN')).toMatchObject({
        // ...successResponseObjectV3(),
        // retMsg: '',
        retCode: API_ERROR_CODE.V5_MARGIN_MODE_NOT_CHANGED,
      });
    });

    it('setMMP()', async () => {
      expect(
        await api.setMMP({
          baseCoin: settleCoin,
          deltaLimit: '1',
          frozenPeriod: '1',
          qtyLimit: '1',
          window: '1',
        })
      ).toMatchObject({
        // ...successResponseObjectV3(),
        // retMsg: '',
        retCode: API_ERROR_CODE.INSTITION_MMP_PROFILE_NOT_FOUND,
      });
    });

    it.skip('resetMMP()', async () => {
      expect(await api.resetMMP(settleCoin)).toMatchObject({
        ...successResponseObjectV3(),
        retMsg: '',
        retCode: 3500715,
        // Contacted bybit for info
        //     +   "retMsg": "Parameter window cannot be empty.",
      });
    });
  });

  describe('Asset APIs', () => {
    it('createInternalTransfer()', async () => {
      expect(
        await api.createInternalTransfer(
          fakeTransferId,
          settleCoin,
          '100',
          'SPOT',
          'CONTRACT'
        )
      ).toMatchObject({
        // ...successResponseObjectV3(),
        // retMsg: '',
        retCode: expect.any(Number),
      });
    });

    it('enableUniversalTransferForSubUIDs()', async () => {
      expect(await api.enableUniversalTransferForSubUIDs([])).toMatchObject({
        ...successResponseObjectV3(),
      });
    });

    it('createUniversalTransfer()', async () => {
      expect(
        await api.createUniversalTransfer({
          amount: '100',
          coin: settleCoin,
          fromAccountType: 'SPOT',
          fromMemberId: 1,
          toAccountType: 'CONTRACT',
          toMemberId: 2,
          transferId: fakeTransferId,
        })
      ).toMatchObject({
        // ...successResponseObjectV3(),
        // retMsg: '',
        retCode: expect.any(Number),
      });
    });

    it('submitWithdrawal()', async () => {
      expect(
        await api.submitWithdrawal({
          address: '0x000000',
          amount: '100',
          chain: 'TRC20',
          coin: settleCoin,
        })
      ).toMatchObject({
        // ...successResponseObjectV3(),
        // retMsg: '',
        retCode: API_ERROR_CODE.INCORRECT_API_KEY_PERMISSIONS,
      });
    });

    it('cancelWithdrawal()', async () => {
      expect(await api.cancelWithdrawal('fakeId')).toMatchObject({
        // ...successResponseObjectV3(),
        // retMsg: '',
        retCode: API_ERROR_CODE.INCORRECT_API_KEY_PERMISSIONS,
      });
    });
  });

  describe('User APIs', () => {
    it('createSubMember()', async () => {
      expect(
        await api.createSubMember({
          memberType: 1,
          username: 'sub1account',
          switch: 1,
          note: 'created via e2e test',
        })
      ).toMatchObject({
        // ...successResponseObjectV3(),
        // retMsg: '',
        retCode: API_ERROR_CODE.SUB_USER_ALREADY_EXISTS,
      });
    });

    it('setSubUIDFrozenState()', async () => {
      expect(await api.setSubUIDFrozenState(0, 1)).toMatchObject({
        // ...successResponseObjectV3(),
        // retMsg: '',
        retCode: API_ERROR_CODE.SUB_USER_NOT_FOUND,
      });
    });
  });

  // Not currently working. In touch with bybit.
  describe.skip('Spot Leverage Token APIs', () => {
    it('purchaseSpotLeveragedToken()', async () => {
      expect(
        await api.purchaseSpotLeveragedToken({
          ltAmount: '100',
          ltCoin: 'EOS3L',
          serialNo: 'purchase-001',
        })
      ).toMatchObject({
        // ...successResponseObjectV3(),
        retCode: 0,
        retMsg: '',
      });
    });

    it('redeemSpotLeveragedToken()', async () => {
      expect(
        await api.redeemSpotLeveragedToken({
          quantity: '100',
          ltCoin: 'EOS3L',
          serialNo: 'redeem-001',
        })
      ).toMatchObject({
        // ...successResponseObjectV3(),
        retCode: 0,
        retMsg: '',
      });
    });
  });

  describe('Spot Margin APIs', () => {
    it('toggleSpotMarginTrade()', async () => {
      expect(await api.toggleSpotMarginTrade('1')).toMatchObject({
        // ...successResponseObjectV3(),
        // retMsg: '',
        retCode: API_ERROR_CODE.SPOT_MARGIN_QUESTIONNAIRE_NOT_SUBMIT,
      });
    });

    it('setSpotMarginLeverage()', async () => {
      expect(await api.setSpotMarginLeverage('2')).toMatchObject({
        // ...successResponseObjectV3(),
        // retMsg: '',
        retCode: API_ERROR_CODE.SPOT_MARGIN_NOT_ENABLED,
      });
    });
  });
});
