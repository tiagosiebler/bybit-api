import {
  WebsocketClient,
  WSClientConfigurableOptions,
  WS_KEY_MAP,
} from '../../src';
import {
  silentLogger,
  waitForSocketEvent,
  WS_OPEN_EVENT_PARTIAL,
} from '../ws.util';

describe('Private Inverse Perps Websocket Client', () => {
  const API_KEY = process.env.API_KEY_COM;
  const API_SECRET = process.env.API_SECRET_COM;

  const wsClientOptions: WSClientConfigurableOptions = {
    market: 'inverse',
    key: API_KEY,
    secret: API_SECRET,
  };

  describe('with invalid credentials', () => {
    it('should fail to open a connection if keys/signature are incorrect', async () => {
      const badClient = new WebsocketClient(
        {
          ...wsClientOptions,
          key: 'bad',
          secret: 'bad',
        },
        silentLogger
      );

      const wsOpenPromise = waitForSocketEvent(badClient, 'open', 2500);

      badClient.connectPrivate();

      expect(wsOpenPromise).rejects.toMatch('Failed to receive');

      try {
        await Promise.all([wsOpenPromise]);
      } catch (e) {
        // console.error()
      }
      badClient.closeAll();
    });
  });

  describe('with valid API credentails', () => {
    let wsClient: WebsocketClient;

    it('should have api credentials to test with', () => {
      expect(API_KEY).toStrictEqual(expect.any(String));
      expect(API_SECRET).toStrictEqual(expect.any(String));
    });

    beforeAll(() => {
      wsClient = new WebsocketClient(wsClientOptions, silentLogger);
      wsClient.connectPrivate();
    });

    afterAll(() => {
      // await promiseSleep(2000);
      wsClient.closeAll();
    });

    it('should open a ws connection', async () => {
      const wsOpenPromise = waitForSocketEvent(wsClient, 'open');

      expect(wsOpenPromise).resolves.toMatchObject({
        event: WS_OPEN_EVENT_PARTIAL,
        wsKey: WS_KEY_MAP.inverse,
      });

      await Promise.all([wsOpenPromise]);
    });

    it('should subscribe to private wallet events', async () => {
      const wsResponsePromise = waitForSocketEvent(wsClient, 'response');
      // const wsUpdatePromise = waitForSocketEvent(wsClient, 'update');

      const wsTopic = 'wallet';
      expect(wsResponsePromise).resolves.toMatchObject({
        request: {
          args: [wsTopic],
          op: 'subscribe',
        },
        success: true,
      });

      // No easy way to trigger a private event (other than executing trades)
      // expect(wsUpdatePromise).resolves.toMatchObject({
      //   topic: wsTopic,
      //   data: expect.any(Array),
      // });

      wsClient.subscribe(wsTopic);

      await Promise.all([wsResponsePromise]);
    });
  });
});
