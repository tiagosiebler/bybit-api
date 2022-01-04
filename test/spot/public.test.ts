import { SpotClient } from "../../src/spot-client";
import {
  notAuthenticatedError,
  successResponseList,
  successResponseObject,
  successResponseListSpot, successResponseObjectSpot
} from "../response.util";
import "axios-debug-log"

describe('Public Spot REST API Endpoints', () => {
  const useLivenet = true;
  const api = new SpotClient(undefined, undefined, useLivenet, { disable_time_sync: true });

  const symbol = 'BTCUSDT';
  const interval = '15';
  const timestampOneHourAgo = (new Date().getTime() / 1000) - (1000 * 60 * 60);
  const from = Number(timestampOneHourAgo.toFixed(0));

  describe('Spot only endpoints', () => {

    it('getServerTime()', async () => {
      expect(await api.getServerTime()).toMatchObject(successResponseObjectSpot());
    });

    it('getSymbols()', async () => {
      expect(await api.getSymbols()).toMatchObject(successResponseListSpot());
    });


  });

});
