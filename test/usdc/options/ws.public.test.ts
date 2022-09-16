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

describe('Public USDC Option Websocket Client', () => {
  let wsClient: WebsocketClient;

  const wsClientOptions: WSClientConfigurableOptions = {
    market: 'usdcOption',
  };

  beforeAll(() => {
    wsClient = new WebsocketClient(
      wsClientOptions,
      getSilentLogger('expectSuccessNoAuth')
    );
    wsClient.connectPublic();
  });

  afterAll(() => {
    wsClient.closeAll();
  });

  it('should open a public ws connection', async () => {
    const wsOpenPromise = waitForSocketEvent(wsClient, 'open');
    try {
      expect(await wsOpenPromise).toMatchObject({
        event: WS_OPEN_EVENT_PARTIAL,
        wsKey: WS_KEY_MAP.usdcOptionPublic,
      });
    } catch (e) {
      expect(e).toBeFalsy();
    }
  });

  it('should subscribe to public trade events', async () => {
    const wsResponsePromise = waitForSocketEvent(wsClient, 'response');
    // const wsUpdatePromise = waitForSocketEvent(wsClient, 'update');

    wsClient.subscribe([
      'recenttrades.BTC',
      'recenttrades.ETH',
      'recenttrades.SOL',
    ]);

    try {
      expect(await wsResponsePromise).toMatchObject({
        success: true,
        data: {
          failTopics: [],
          successTopics: expect.any(Array),
        },
        type: 'COMMAND_RESP',
      });
    } catch (e) {
      // sub failed
      expect(e).toBeFalsy();
    }

    // Takes a while to get an event from USDC options - testing this manually for now
    // try {
    //   expect(await wsUpdatePromise).toStrictEqual('asdfasdf');
    // } catch (e) {
    //   // no data
    //   expect(e).toBeFalsy();
    // }
  });
});
