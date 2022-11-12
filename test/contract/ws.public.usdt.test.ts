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
} from '../ws.util';

describe('Public Contract USDT Websocket Client', () => {
  let wsClient: WebsocketClient;

  const wsClientOptions: WSClientConfigurableOptions = {
    market: 'contractUSDT',
  };

  beforeAll(() => {
    wsClient = new WebsocketClient(
      wsClientOptions,
      getSilentLogger('expectSuccessNoAuth')
    );
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
        wsKey: WS_KEY_MAP.contractUSDTPublic,
      });
    } catch (e) {
      console.error('open: ', e);
      expect(e).toBeFalsy();
    }
  });

  it('should subscribe to public orderbook events', async () => {
    const wsResponsePromise = waitForSocketEvent(wsClient, 'response');
    const wsUpdatePromise = waitForSocketEvent(wsClient, 'update');

    const wsTopic = 'orderbook.25.BTCUSDT';
    wsClient.subscribe(wsTopic);

    try {
      expect(await wsResponsePromise).toMatchObject({
        success: true,
        op: 'subscribe',
      });
    } catch (e) {
      console.error('response: ', e);
      // sub failed (or jest expect threw)
      expect(e).toBeFalsy();
    }

    try {
      expect(await wsUpdatePromise).toMatchObject({
        topic: wsTopic,
        data: {
          a: expect.any(Array),
        },
      });
    } catch (e) {
      console.error(`Wait for "${wsTopic}" event exception: `, e);
    }
  });
});
