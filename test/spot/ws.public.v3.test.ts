import {
  WebsocketClient,
  WSClientConfigurableOptions,
  WS_KEY_MAP,
} from '../../src';
import {
  logAllEvents,
  silentLogger,
  waitForSocketEvent,
  WS_OPEN_EVENT_PARTIAL,
} from '../ws.util';

describe('Public Spot V3 Websocket Client', () => {
  let wsClient: WebsocketClient;

  const wsClientOptions: WSClientConfigurableOptions = {
    market: 'spotV3',
  };

  beforeAll(() => {
    wsClient = new WebsocketClient(wsClientOptions, silentLogger);
    wsClient.connectPublic();
    // logAllEvents(wsClient);
  });

  afterAll(() => {
    wsClient.closeAll();
  });

  it('should open a public ws connection', async () => {
    const wsOpenPromise = waitForSocketEvent(wsClient, 'open');

    expect(wsOpenPromise).resolves.toMatchObject({
      event: WS_OPEN_EVENT_PARTIAL,
      wsKey: WS_KEY_MAP.spotV3Public,
    });

    await Promise.all([wsOpenPromise]);
  });

  it('should subscribe to public orderbook events', async () => {
    const wsResponsePromise = waitForSocketEvent(wsClient, 'response');
    const wsUpdatePromise = waitForSocketEvent(wsClient, 'update');

    const wsTopic = 'orderbook.40.BTCUSDT';
    expect(wsResponsePromise).resolves.toMatchObject({
      request: {
        args: [wsTopic],
        op: 'subscribe',
      },
      success: true,
    });
    expect(wsUpdatePromise).resolves.toStrictEqual('');

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
