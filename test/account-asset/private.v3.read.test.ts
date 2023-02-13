import { AccountAssetClientV3 } from '../../src';
import { successResponseObjectV3 } from '../response.util';

// Only some minimal coverage for v3 apis, since v5 apis are already available
describe('Private Account Asset V3 REST API Endpoints', () => {
  const API_KEY = process.env.API_KEY_COM;
  const API_SECRET = process.env.API_SECRET_COM;

  it('should have api credentials to test with', () => {
    expect(API_KEY).toStrictEqual(expect.any(String));
    expect(API_SECRET).toStrictEqual(expect.any(String));
  });

  const api = new AccountAssetClientV3({
    key: API_KEY,
    secret: API_SECRET,
    testnet: false,
  });

  const coin = 'USDT';

  it('fetchServerTime()', async () => {
    expect(await api.fetchServerTime()).toEqual(expect.any(Number));
  });

  it('getInternalTransfers()', async () => {
    expect(
      await api.getInternalTransfers({
        coin: coin,
      })
    ).toMatchObject(successResponseObjectV3());
  });

  it('getSubAccountTransfers()', async () => {
    expect(await api.getSubAccountTransfers()).toMatchObject(
      successResponseObjectV3()
    );
  });

  it('getSubAccounts()', async () => {
    expect(await api.getSubAccounts()).toMatchObject(successResponseObjectV3());
  });

  it('getUniversalTransfers()', async () => {
    expect(await api.getUniversalTransfers({ coin: coin })).toMatchObject(
      successResponseObjectV3()
    );
  });

  it('getTransferableCoinList()', async () => {
    expect(
      await api.getTransferableCoinList({
        fromAccountType: 'SPOT',
        toAccountType: 'CONTRACT',
      })
    ).toMatchObject(successResponseObjectV3());
  });
});
