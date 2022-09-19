import {
  WebsocketClient,
  WSClientConfigurableOptions,
  WS_ERROR_ENUM,
  WS_KEY_MAP,
} from '../../src';
import {
  getSilentLogger,
  waitForSocketEvent,
  WS_OPEN_EVENT_PARTIAL,
} from '../ws.util';

describe('Private Spot V3 Websocket Client', () => {
  const API_KEY = process.env.API_KEY_COM;
  const API_SECRET = process.env.API_SECRET_COM;

  const wsClientOptions: WSClientConfigurableOptions = {
    market: 'spotv3',
    key: API_KEY,
    secret: API_SECRET,
  };
  const wsTopic = `outboundAccountInfo`;

  describe('with invalid credentials', () => {
    it('should reject private subscribe if keys/signature are incorrect', async () => {
      const badClient = new WebsocketClient(
        {
          ...wsClientOptions,
          key: 'bad',
          secret: 'bad',
        },
        getSilentLogger('expect401')
      );

      // const wsOpenPromise = waitForSocketEvent(badClient, 'open');
      const wsResponsePromise = waitForSocketEvent(badClient, 'response');
      // const wsUpdatePromise = waitForSocketEvent(wsClient, 'update');

      badClient.connectPrivate();
      badClient.subscribe(wsTopic);

      expect(wsResponsePromise).rejects.toMatchObject({
        ret_code: WS_ERROR_ENUM.API_SIGN_AUTH_FAILED,
        ret_msg: expect.any(String),
        type: 'error',
      });

      try {
        await Promise.all([wsResponsePromise]);
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
      wsClient = new WebsocketClient(
        wsClientOptions,
        getSilentLogger('expectSuccess')
      );
      wsClient.connectPrivate();
      // logAllEvents(wsClient);
    });

    afterAll(() => {
      wsClient.closeAll();
    });

    it('should open a private ws connection', async () => {
      const wsOpenPromise = waitForSocketEvent(wsClient, 'open');
      const wsResponsePromise = waitForSocketEvent(wsClient, 'response');

      try {
        expect(await wsOpenPromise).toMatchObject({
          event: WS_OPEN_EVENT_PARTIAL,
          wsKey: WS_KEY_MAP.spotV3Private,
        });
      } catch (e) {
        expect(e).toBeFalsy();
      }

      expect(await wsResponsePromise).toMatchObject({
        op: 'auth',
        success: true,
        req_id: `${WS_KEY_MAP.spotV3Private}-auth`,
      });
    });

    it('should subscribe to private outboundAccountInfo events', async () => {
      const wsResponsePromise = waitForSocketEvent(wsClient, 'response');

      // expect(wsUpdatePromise).resolves.toStrictEqual('');
      wsClient.subscribe(wsTopic);

      expect(await wsResponsePromise).toMatchObject({
        op: 'subscribe',
        success: true,
        ret_msg: '',
        req_id: wsTopic,
      });
    });
  });
});
