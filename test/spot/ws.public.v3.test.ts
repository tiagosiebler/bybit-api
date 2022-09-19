import {
  WebsocketClient,
  WSClientConfigurableOptions,
  WS_KEY_MAP,
} from '../../src';
import {
  logAllEvents,
  getSilentLogger,
  fullLogger,
  waitForSocketEvent,
  WS_OPEN_EVENT_PARTIAL,
} from '../ws.util';

describe('Public Spot V3 Websocket Client', () => {
  let wsClient: WebsocketClient;

  const wsClientOptions: WSClientConfigurableOptions = {
    market: 'spotv3',
  };

  beforeAll(() => {
    wsClient = new WebsocketClient(
      wsClientOptions,
      getSilentLogger('expectSuccess')
    );
    wsClient.connectPublic();
    // logAllEvents(wsClient);
  });

  afterAll(() => {
    wsClient.closeAll();
  });

  it('should open a public ws connection', async () => {
    const wsOpenPromise = waitForSocketEvent(wsClient, 'open');

    try {
      expect(await wsOpenPromise).toMatchObject({
        event: WS_OPEN_EVENT_PARTIAL,
        wsKey: WS_KEY_MAP.spotV3Public,
      });
    } catch (e) {
      expect(e).toBeFalsy();
    }
  });

  it('should subscribe to public orderbook events', async () => {
    const wsResponsePromise = waitForSocketEvent(wsClient, 'response');
    const wsUpdatePromise = waitForSocketEvent(wsClient, 'update');

    const symbol = 'BTCUSDT';
    const wsTopic = `orderbook.40.${symbol}`;

    expect(wsResponsePromise).resolves.toMatchObject({
      op: 'subscribe',
      success: true,
      ret_msg: 'subscribe',
      req_id: wsTopic,
    });

    expect(wsUpdatePromise).resolves.toMatchObject({
      data: {
        a: expect.any(Array),
        b: expect.any(Array),
        s: symbol,
        t: expect.any(Number),
      },
      topic: wsTopic,
      ts: expect.any(Number),
      type: 'delta',
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
