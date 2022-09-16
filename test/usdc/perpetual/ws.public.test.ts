import {
  WebsocketClient,
  WSClientConfigurableOptions,
  WS_KEY_MAP,
} from '../../../src';
import {
  logAllEvents,
  getSilentLogger,
  waitForSocketEvent,
  WS_OPEN_EVENT_PARTIAL,
} from '../../ws.util';

describe('Public USDC Perp Websocket Client', () => {
  let wsClient: WebsocketClient;

  const wsClientOptions: WSClientConfigurableOptions = {
    market: 'usdcPerp',
  };

  beforeAll(() => {
    wsClient = new WebsocketClient(
      wsClientOptions,
      getSilentLogger('expectSuccessNoAuth')
    );
    wsClient.connectPublic();
    // logAllEvents(wsClient);
  });

  afterAll(() => {
    wsClient.closeAll();
  });

  it('should open a public ws connection', async () => {
    const wsOpenPromise = waitForSocketEvent(wsClient, 'open');

    expect(await wsOpenPromise).toMatchObject({
      event: WS_OPEN_EVENT_PARTIAL,
      wsKey: WS_KEY_MAP.usdcPerpPublic,
    });
  });

  it('should subscribe to public trade events', async () => {
    const wsResponsePromise = waitForSocketEvent(wsClient, 'response');
    const wsUpdatePromise = waitForSocketEvent(wsClient, 'update');

    const topic = 'orderBook_200.100ms.BTCPERP';
    wsClient.subscribe(topic);

    try {
      expect(await wsResponsePromise).toMatchObject({
        success: true,
        ret_msg: '',
        request: {
          op: 'subscribe',
          args: [topic],
        },
      });
    } catch (e) {
      // sub failed
      expect(e).toBeFalsy();
    }

    try {
      expect(await wsUpdatePromise).toMatchObject({
        crossSeq: expect.any(String),
        data: { orderBook: expect.any(Array) },
        timestampE6: expect.any(String),
        topic: topic,
        type: 'snapshot',
      });
    } catch (e) {
      // no data
      expect(e).toBeFalsy();
    }
  });
});
