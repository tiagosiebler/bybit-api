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

describe('Public Spot V1 Websocket Client', () => {
  let wsClient: WebsocketClient;

  const wsClientOptions: WSClientConfigurableOptions = {
    market: 'spot',
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
      wsKey: WS_KEY_MAP.spotPublic,
    });

    await Promise.all([wsOpenPromise]);
  });

  it('should subscribe to public orderbook events', async () => {
    const wsUpdatePromise = waitForSocketEvent(wsClient, 'update');

    const symbol = 'BTCUSDT';
    expect(wsUpdatePromise).resolves.toMatchObject({
      symbol: symbol,
      symbolName: symbol,
      topic: 'diffDepth',
      params: {
        realtimeInterval: '24h',
        binary: 'false',
      },
      data: expect.any(Array),
    });

    wsClient.subscribePublicSpotOrderbook(symbol, 'delta');

    try {
      await wsUpdatePromise;
    } catch (e) {
      console.error(`Wait for spot v1 orderbook event exception: `, e);
    }
  });
});
