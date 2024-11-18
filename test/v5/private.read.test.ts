import { API_ERROR_CODE, RestClientV5 } from '../../src';
import { getTestProxy } from '../proxy.util';
import { successResponseObjectV3 } from '../response.util';

describe('Private READ V5 REST API Endpoints', () => {
  const API_KEY = process.env.API_KEY_COM;
  const API_SECRET = process.env.API_SECRET_COM;

  it('should have api credentials to test with', () => {
    expect(API_KEY).toStrictEqual(expect.any(String));
    expect(API_SECRET).toStrictEqual(expect.any(String));
  });

  const api = new RestClientV5(
    {
      key: API_KEY,
      secret: API_SECRET,
      testnet: false,
    },
    getTestProxy(),
  );

  const settleCoin = 'USDT';
  const linearSymbol = 'BTCUSDT';
  const accountType = 'UNIFIED';

  describe('misc endpoints', () => {
    it('fetchServerTime()', async () => {
      expect(await api.fetchServerTime()).toEqual(expect.any(Number));
    });
  });

  describe('Trade APIs', () => {
    it('getActiveOrders()', async () => {
      expect(
        await api.getActiveOrders({ category: 'linear', settleCoin }),
      ).toMatchObject({
        ...successResponseObjectV3(),
      });
    });

    it('getHistoricOrders()', async () => {
      expect(await api.getHistoricOrders({ category: 'linear' })).toMatchObject(
        { ...successResponseObjectV3() },
      );
    });

    // 10016 system errors if the account is not UTA upgraded
    it.skip('getSpotBorrowCheck()', async () => {
      expect(await api.getSpotBorrowCheck(linearSymbol, 'Buy')).toMatchObject({
        ...successResponseObjectV3(),
      });
    });
  });

  describe('Position APIs', () => {
    it('getPositionInfo()', async () => {
      expect(
        await api.getPositionInfo({ category: 'linear', settleCoin }),
      ).toMatchObject({
        ...successResponseObjectV3(),
      });
    });

    it('getExecutionList()', async () => {
      expect(
        await api.getExecutionList({
          category: 'linear',
          symbol: linearSymbol,
        }),
      ).toMatchObject({
        ...successResponseObjectV3(),
      });
    });

    it('getClosedPnL()', async () => {
      expect(
        await api.getClosedPnL({ category: 'linear', symbol: linearSymbol }),
      ).toMatchObject({
        ...successResponseObjectV3(),
      });
    });
  });

  describe('Account APIs', () => {
    it('getWalletBalance()', async () => {
      expect(
        await api.getWalletBalance({ accountType: accountType }),
      ).toMatchObject({ ...successResponseObjectV3() });
    });

    it('getBorrowHistory()', async () => {
      expect(await api.getBorrowHistory()).toMatchObject({
        ...successResponseObjectV3(),
      });
    });

    it('getCollateralInfo()', async () => {
      expect(await api.getCollateralInfo()).toMatchObject({
        ...successResponseObjectV3(),
      });
    });

    // Not available on this test account
    it.skip('getCoinGreeks()', async () => {
      expect(await api.getCoinGreeks()).toMatchObject({
        ...successResponseObjectV3(),
        retMsg: '',
      });
    });

    it('getFeeRate()', async () => {
      expect(await api.getFeeRate({ category: 'linear' })).toMatchObject({
        ...successResponseObjectV3(),
      });
    });

    // Fails on this test account, since it's not upgraded
    it.skip('getAccountInfo()', async () => {
      expect(await api.getAccountInfo()).toMatchObject({
        ...successResponseObjectV3(),
        retMsg: '',
      });
    });

    it('getTransactionLog()', async () => {
      expect(await api.getTransactionLog()).toMatchObject({
        ...successResponseObjectV3(),
        // retMsg: '',
      });
    });

    // Not available on this test account
    it.skip('getMMPState()', async () => {
      expect(await api.getMMPState(settleCoin)).toMatchObject({
        ...successResponseObjectV3(),
        retMsg: '',
      });
    });
  });

  describe('Asset APIs', () => {
    it('getCoinExchangeRecords()', async () => {
      expect(await api.getCoinExchangeRecords()).toMatchObject({
        ...successResponseObjectV3(),
      });
    });

    it('getDeliveryRecord()', async () => {
      expect(await api.getDeliveryRecord({ category: 'option' })).toMatchObject(
        {
          ...successResponseObjectV3(),
          // retCode: API_ERROR_CODE.INCORRECT_API_KEY_PERMISSIONS,
        },
      );
    });

    it('getSettlementRecords()', async () => {
      expect(
        await api.getSettlementRecords({ category: 'linear' }),
      ).toMatchObject({
        ...successResponseObjectV3(),
        // retCode: API_ERROR_CODE.INCORRECT_API_KEY_PERMISSIONS,
      });
    });

    it('getAssetInfo()', async () => {
      expect(await api.getAssetInfo({ accountType: 'SPOT' })).toMatchObject({
        ...successResponseObjectV3(),
      });
    });

    it('getAllCoinsBalance()', async () => {
      expect(
        await api.getAllCoinsBalance({ accountType: accountType }),
      ).toMatchObject({
        ...successResponseObjectV3(),
        // retMsg: '',
      });
    });

    it('getCoinBalance()', async () => {
      expect(
        await api.getCoinBalance({
          accountType: accountType,
          coin: settleCoin,
        }),
      ).toMatchObject({ ...successResponseObjectV3() });
    });

    it('getTransferableCoinList()', async () => {
      expect(
        await api.getTransferableCoinList('SPOT', 'CONTRACT'),
      ).toMatchObject({ ...successResponseObjectV3() });
    });

    it('getInternalTransferRecords()', async () => {
      expect(await api.getInternalTransferRecords()).toMatchObject({
        ...successResponseObjectV3(),
      });
    });

    it('getSubUID()', async () => {
      expect(await api.getSubUID()).toMatchObject({
        ...successResponseObjectV3(),
        retCode: API_ERROR_CODE.INCORRECT_API_KEY_PERMISSIONS,
      });
    });

    it('getUniversalTransferRecords()', async () => {
      expect(await api.getUniversalTransferRecords()).toMatchObject({
        ...successResponseObjectV3(),
        retCode: API_ERROR_CODE.INCORRECT_API_KEY_PERMISSIONS,
      });
    });

    it('getAllowedDepositCoinInfo()', async () => {
      expect(await api.getAllowedDepositCoinInfo()).toMatchObject({
        ...successResponseObjectV3(),
      });
    });

    it('getDepositRecords()', async () => {
      expect(await api.getDepositRecords()).toMatchObject({
        ...successResponseObjectV3(),
      });
    });

    it('getSubAccountDepositRecords()', async () => {
      expect(
        await api.getSubAccountDepositRecords({ subMemberId: 'fakeid' }),
      ).toMatchObject({
        // ...successResponseObjectV3(),
        // Expected, since sub account ID is fake
        retCode: API_ERROR_CODE.PARAMS_MISSING_OR_WRONG,
      });
    });

    // Not available for sub accounts
    it.skip('getMasterDepositAddress()', async () => {
      expect(await api.getMasterDepositAddress(settleCoin)).toMatchObject({
        ...successResponseObjectV3(),
      });
    });

    it('querySubMemberAddress()', async () => {
      expect(
        await api.querySubMemberAddress(settleCoin, 'TRC20', 'fakeid'),
      ).toMatchObject({
        // ...successResponseObjectV3(),
        // Expected, since sub account ID is fake
        retCode: API_ERROR_CODE.PARAMS_MISSING_OR_WRONG,
      });
    });

    it('getCoinInfo()', async () => {
      expect(await api.getCoinInfo()).toMatchObject({
        ...successResponseObjectV3(),
      });
    });

    it('getWithdrawalRecords()', async () => {
      expect(await api.getWithdrawalRecords()).toMatchObject({
        ...successResponseObjectV3(),
      });
    });
  });

  describe('User APIs', () => {
    it('getSubUIDList()', async () => {
      expect(await api.getSubUIDList()).toMatchObject({
        ...successResponseObjectV3(),
      });
    });

    it('getQueryApiKey()', async () => {
      expect(await api.getQueryApiKey()).toMatchObject({
        ...successResponseObjectV3(),
      });
    });

    it('getSubAccountAllApiKeys()', async () => {
      expect(
        await api.getSubAccountAllApiKeys({ subMemberId: 'fakeid' }),
      ).toMatchObject({
        // ...successResponseObjectV3(),
        // Expected, since sub account ID is fake
        retCode: API_ERROR_CODE.PARAMS_MISSING_OR_WRONG,
      });
    });
  });
});
