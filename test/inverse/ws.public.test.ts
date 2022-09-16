import {
  LinearClient,
  WebsocketClient,
  WSClientConfigurableOptions,
  WS_KEY_MAP,
} from '../../src';
import {
  promiseSleep,
  getSilentLogger,
  waitForSocketEvent,
  WS_OPEN_EVENT_PARTIAL,
} from '../ws.util';

describe('Public Inverse Perps Websocket Client', () => {
  let wsClient: WebsocketClient;

  const wsClientOptions: WSClientConfigurableOptions = {
    market: 'inverse',
  };

  beforeAll(() => {
    wsClient = new WebsocketClient(wsClientOptions, getSilentLogger('public'));
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
        wsKey: WS_KEY_MAP.inverse,
      });
    } catch (e) {
      expect(e).toBeFalsy();
    }
  });

  it('should subscribe to public orderBookL2_25 events', async () => {
    const wsResponsePromise = waitForSocketEvent(wsClient, 'response');
    const wsUpdatePromise = waitForSocketEvent(wsClient, 'update');

    const wsTopic = 'orderBookL2_25.BTCUSD';
    expect(wsResponsePromise).resolves.toMatchObject({
      request: {
        args: [wsTopic],
        op: 'subscribe',
      },
      success: true,
    });
    expect(wsUpdatePromise).resolves.toMatchObject({
      topic: wsTopic,
      data: expect.any(Array),
    });

    wsClient.subscribe(wsTopic);

    try {
      await wsResponsePromise;
    } catch (e) {
      console.error(
        `Wait for "${wsTopic}" subscription response exception: `,
        e
      );
    }

    try {
      await wsUpdatePromise;
    } catch (e) {
      console.error(`Wait for "${wsTopic}" event exception: `, e);
    }
  });
});
