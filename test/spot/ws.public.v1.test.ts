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

describe.skip('Public Spot V1 Websocket Client', () => {
  let wsClient: WebsocketClient;

  const wsClientOptions: WSClientConfigurableOptions = {
    market: 'spot',
  };

  beforeAll(() => {
    wsClient = new WebsocketClient(
      wsClientOptions,
      getSilentLogger('expectSuccess'),
    );
    wsClient.connectPublic();
    // logAllEvents(wsClient);
  });

  afterAll(() => {
    wsClient.closeAll(true);
  });

  it('should open a public ws connection', async () => {
    const wsOpenPromise = waitForSocketEvent(wsClient, 'open');

    try {
      expect(await wsOpenPromise).toMatchObject({
        event: WS_OPEN_EVENT_PARTIAL,
        wsKey: WS_KEY_MAP.spotPublic,
      });
    } catch (e) {
      expect(e).toBeFalsy();
    }
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
      console.error('Wait for spot v1 orderbook event exception: ', e);
    }
  });
});
