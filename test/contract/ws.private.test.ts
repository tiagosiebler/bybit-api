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
  fullLogger,
} from '../ws.util';

describe('Private Contract Websocket Client', () => {
  const API_KEY = process.env.API_KEY_COM;
  const API_SECRET = process.env.API_SECRET_COM;

  let wsClient: WebsocketClient;

  const wsClientOptions: WSClientConfigurableOptions = {
    market: 'contractUSDT',
    key: API_KEY,
    secret: API_SECRET,
  };

  beforeAll(() => {
    wsClient = new WebsocketClient(
      wsClientOptions,
      getSilentLogger('expectSuccessNoAuth')
      // fullLogger
    );
    // logAllEvents(wsClient);
    wsClient.connectPrivate();
  });

  afterAll(() => {
    wsClient.closeAll(true);
  });

  it('should open a private ws connection', async () => {
    const wsOpenPromise = waitForSocketEvent(wsClient, 'open');
    try {
      expect(await wsOpenPromise).toMatchObject({
        event: WS_OPEN_EVENT_PARTIAL,
        wsKey: WS_KEY_MAP.contractUSDTPrivate,
      });
    } catch (e) {
      expect(e).toBeFalsy();
    }
  });
  it('should authenticate successfully', async () => {
    const wsResponsePromise = waitForSocketEvent(wsClient, 'response');
    // const wsUpdatePromise = waitForSocketEvent(wsClient, 'update');

    try {
      expect(await wsResponsePromise).toMatchObject({
        op: 'auth',
        req_id: 'contractUSDTPrivate-auth',
        success: true,
        wsKey: WS_KEY_MAP.contractUSDTPrivate,
      });
    } catch (e) {
      // sub failed
      expect(e).toBeFalsy();
    }

    // try {
    //   expect(await wsUpdatePromise).toStrictEqual('');
    // } catch (e) {
    //   // no data
    //   expect(e).toBeFalsy();
    // }
  });
});
