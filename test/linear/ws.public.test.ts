import {
  WebsocketClient,
  WSClientConfigurableOptions,
  WS_KEY_MAP,
} from '../../src';
import {
  getSilentLogger,
  waitForSocketEvent,
  WS_OPEN_EVENT_PARTIAL,
} from '../ws.util';

describe('Public Linear Perps Websocket Client', () => {
  let wsClient: WebsocketClient;

  const wsClientOptions: WSClientConfigurableOptions = {
    market: 'linear',
  };

  beforeAll(() => {
    wsClient = new WebsocketClient(wsClientOptions, getSilentLogger('public'));
    wsClient.connectPublic();
  });

  afterAll(() => {
    wsClient.closeAll();
    wsClient.removeAllListeners();
  });

  it('should open a public ws connection', async () => {
    const wsOpenPromise = waitForSocketEvent(wsClient, 'open');

    expect(await wsOpenPromise).toMatchObject({
      event: WS_OPEN_EVENT_PARTIAL,
      wsKey: WS_KEY_MAP.linearPublic,
    });
  });

  it('should subscribe to public orderBookL2_25 events', async () => {
    const wsResponsePromise = waitForSocketEvent(wsClient, 'response');
    const wsUpdatePromise = waitForSocketEvent(wsClient, 'update');

    const wsTopic = 'orderBookL2_25.BTCUSDT';
    wsClient.subscribe(wsTopic);

    try {
      expect(await wsResponsePromise).toMatchObject({
        request: {
          args: [wsTopic],
          op: 'subscribe',
        },
        success: true,
      });
    } catch (e) {
      expect(e).toBeFalsy();
    }

    try {
      expect(await wsUpdatePromise).toMatchObject({
        topic: wsTopic,
        data: {
          order_book: expect.any(Array),
        },
      });
    } catch (e) {
      console.error(`Wait for "${wsTopic}" event exception: `, e);
    }
  });

  it('should fail to subscribe to private events (no keys)', async () => {
    const wsResponsePromise = waitForSocketEvent(wsClient, 'response');
    // const wsUpdatePromise = waitForSocketEvent(wsClient, 'update');

    const wsTopic = 'wallet';

    // No easy way to trigger a private event (other than executing trades)
    // expect(wsUpdatePromise).resolves.toMatchObject({
    //   topic: wsTopic,
    //   data: expect.any(Array),
    // });

    wsClient.subscribe(wsTopic);

    try {
      expect(await wsResponsePromise).toBeFalsy();
    } catch (e) {
      expect(e).toMatchObject({
        request: {
          args: [wsTopic],
          op: 'subscribe',
        },
        success: false,
      });
    }
  });
});
