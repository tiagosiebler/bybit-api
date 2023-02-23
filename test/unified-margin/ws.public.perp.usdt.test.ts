/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  WSClientConfigurableOptions,
  WS_KEY_MAP,
  WebsocketClient,
} from '../../src';
import {
  WS_OPEN_EVENT_PARTIAL,
  fullLogger,
  getSilentLogger,
  logAllEvents,
  waitForSocketEvent,
} from '../ws.util';

describe('Public Unified Margin Websocket Client (Perps - USDT)', () => {
  let wsClient: WebsocketClient;

  const wsClientOptions: WSClientConfigurableOptions = {
    market: 'unifiedPerp',
  };

  beforeAll(() => {
    wsClient = new WebsocketClient(
      wsClientOptions,
      getSilentLogger('expectSuccessNoAuth')
      // fullLogger
    );
    // logAllEvents(wsClient);
    wsClient.connectPublic();
  });

  afterAll(() => {
    wsClient.closeAll(true);
  });

  it('should open a public ws connection', async () => {
    const wsOpenPromise = waitForSocketEvent(wsClient, 'open');
    try {
      expect(await wsOpenPromise).toMatchObject({
        event: WS_OPEN_EVENT_PARTIAL,
        wsKey: expect.stringContaining('unifiedPerpUSD'),
      });
    } catch (e) {
      expect(e).toBeFalsy();
    }
  });

  it('should subscribe to public orderbook events through USDT connection', async () => {
    const wsResponsePromise = waitForSocketEvent(wsClient, 'response');
    const wsUpdatePromise = waitForSocketEvent(wsClient, 'update');

    // USDT should be detected and automatically routed through the USDT connection
    const topic = 'orderbook.1.BTCUSDT';
    wsClient.subscribe(topic);

    try {
      expect(await wsResponsePromise).toMatchObject({
        op: 'subscribe',
        req_id: topic,
        success: true,
        wsKey: WS_KEY_MAP.unifiedPerpUSDTPublic,
      });
    } catch (e) {
      // sub failed
      expect(e).toBeFalsy();
    }

    try {
      expect(await wsUpdatePromise).toMatchObject({
        data: {
          a: expect.any(Array),
          b: expect.any(Array),
          s: 'BTCUSDT',
          u: expect.any(Number),
        },
        topic: topic,
        ts: expect.any(Number),
        wsKey: WS_KEY_MAP.unifiedPerpUSDTPublic,
        type: 'snapshot',
      });
    } catch (e) {
      console.error('unified margin perp usdt orderbook test fail', e);
      // no data
      expect(e).toBeFalsy();
    }
  });
});
