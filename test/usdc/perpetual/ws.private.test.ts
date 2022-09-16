import {
  WebsocketClient,
  WSClientConfigurableOptions,
  WS_ERROR_ENUM,
  WS_KEY_MAP,
} from '../../../src';
import {
  fullLogger,
  getSilentLogger,
  logAllEvents,
  waitForSocketEvent,
  WS_OPEN_EVENT_PARTIAL,
} from '../../ws.util';

describe('Private USDC Perp Websocket Client', () => {
  const API_KEY = process.env.API_KEY_COM;
  const API_SECRET = process.env.API_SECRET_COM;

  const wsClientOptions: WSClientConfigurableOptions = {
    market: 'usdcPerp',
    key: API_KEY,
    secret: API_SECRET,
  };

  const wsTopic = `user.openapi.perp.position`;

  describe('with invalid credentials', () => {
    it('should reject private subscribe if keys/signature are incorrect', async () => {
      const badClient = new WebsocketClient(
        {
          ...wsClientOptions,
          key: 'bad',
          secret: 'bad',
          reconnectTimeout: 10000,
        },
        // fullLogger
        getSilentLogger('expect401')
      );
      // logAllEvents(badClient);

      // const wsOpenPromise = waitForSocketEvent(badClient, 'open');
      const wsResponsePromise = waitForSocketEvent(badClient, 'response');
      // const wsUpdatePromise = waitForSocketEvent(wsClient, 'update');

      badClient.connectPrivate();

      const responsePartial = {
        ret_msg: WS_ERROR_ENUM.USDC_OPTION_AUTH_FAILED,
        success: false,
        type: 'AUTH_RESP',
      };
      expect(wsResponsePromise).rejects.toMatchObject(responsePartial);

      try {
        await Promise.all([wsResponsePromise]);
      } catch (e) {
        // console.error()
        expect(e).toMatchObject(responsePartial);
      }

      // badClient.subscribe(wsTopic);
      badClient.removeAllListeners();
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
          wsKey: WS_KEY_MAP.usdcPerpPrivate,
        });
      } catch (e) {
        expect(e).toBeFalsy();
      }

      try {
        expect(await wsResponsePromise).toMatchObject({
          ret_msg: '0',
          success: true,
          type: 'AUTH_RESP',
        });
      } catch (e) {
        console.error(`Wait for "${wsTopic}" event exception: `, e);
        expect(e).toBeFalsy();
      }
    });

    it(`should subscribe to private "${wsTopic}" events`, async () => {
      const wsResponsePromise = waitForSocketEvent(wsClient, 'response');
      const wsUpdatePromise = waitForSocketEvent(wsClient, 'update');

      // expect(wsUpdatePromise).resolves.toStrictEqual('');
      wsClient.subscribe(wsTopic);

      try {
        expect(await wsResponsePromise).toMatchObject({
          data: {
            failTopics: [],
            successTopics: [wsTopic],
          },
          success: true,
          type: 'COMMAND_RESP',
        });
      } catch (e) {
        console.error(
          `Wait for "${wsTopic}" subscription response exception: `,
          e
        );
        expect(e).toBeFalsy();
      }
      expect(await wsUpdatePromise).toMatchObject({
        creationTime: expect.any(Number),
        data: {
          baseLine: expect.any(Number),
          dataType: expect.any(String),
          result: expect.any(Array),
          version: expect.any(Number),
        },
        topic: wsTopic,
      });
    });
  });
});
