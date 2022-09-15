import {
  WebsocketClient,
  WSClientConfigurableOptions,
  WS_KEY_MAP,
} from '../../src';
import {
  logAllEvents,
  promiseSleep,
  silentLogger,
  waitForSocketEvent,
  WS_OPEN_EVENT_PARTIAL,
} from '../ws.util';

describe('Private Spot V1 Websocket Client', () => {
  let wsClient: WebsocketClient;
  const API_KEY = process.env.API_KEY_COM;
  const API_SECRET = process.env.API_SECRET_COM;

  it('should have api credentials to test with', () => {
    expect(API_KEY).toStrictEqual(expect.any(String));
    expect(API_SECRET).toStrictEqual(expect.any(String));
  });

  const wsClientOptions: WSClientConfigurableOptions = {
    market: 'spot',
    key: API_KEY,
    secret: API_SECRET,
  };

  beforeAll(() => {
    wsClient = new WebsocketClient(wsClientOptions, silentLogger);
    logAllEvents(wsClient);
  });

  afterAll(() => {
    wsClient.closeAll();
  });

  // TODO: how to detect if auth failed for the v1 spot ws
  it('should open a private ws connection', async () => {
    const wsOpenPromise = waitForSocketEvent(wsClient, 'open');
    // const wsUpdatePromise = waitForSocketEvent(wsClient, 'update');

    wsClient.connectPrivate();

    expect(wsOpenPromise).resolves.toMatchObject({
      event: WS_OPEN_EVENT_PARTIAL,
      wsKey: WS_KEY_MAP.spotPrivate,
    });
    // expect(wsUpdatePromise).resolves.toMatchObject({
    //   topic: 'wsTopic',
    //   data: expect.any(Array),
    // });
    await Promise.all([wsOpenPromise]);
    // await Promise.all([wsUpdatePromise]);
    // await promiseSleep(4000);
  });
});
