import {
  WebsocketClient,
  WSClientConfigurableOptions,
  WS_KEY_MAP,
} from '../../src';
import {
  logAllEvents,
  getSilentLogger,
  waitForSocketEvent,
  WS_OPEN_EVENT_PARTIAL,
  fullLogger,
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
    wsClient.closeAll();
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

  it('should subscribe to public trade events through USDT topic', async () => {
    const wsResponsePromise = waitForSocketEvent(wsClient, 'response');
    const wsUpdatePromise = waitForSocketEvent(wsClient, 'update');

    wsClient.subscribe('orderbook.25.BTCUSDT');

    try {
      expect(await wsResponsePromise).toMatchObject({
        op: 'subscribe',
        req_id: 'orderbook.25.BTCUSDT',
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
        topic: 'orderbook.25.BTCUSDT',
        ts: expect.any(Number),
        type: 'snapshot',
        wsKey: WS_KEY_MAP.unifiedPerpUSDTPublic,
      });
    } catch (e) {
      // no data
      expect(e).toBeFalsy();
    }
  });
});
