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

describe('Private Unified Margin Websocket Client', () => {
  let wsClient: WebsocketClient;

  const wsClientOptions: WSClientConfigurableOptions = {
    market: 'unifiedPerp',
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
    wsClient.closeAll();
  });

  it('should open a public ws connection', async () => {
    const wsOpenPromise = waitForSocketEvent(wsClient, 'open');
    try {
      expect(await wsOpenPromise).toMatchObject({
        event: WS_OPEN_EVENT_PARTIAL,
        wsKey: WS_KEY_MAP.unifiedPrivate,
      });
    } catch (e) {
      expect(e).toBeFalsy();
    }
  });

  // Should work, but don't have unified margin activated - needs extra testing
  // {"conn_id": "064443fffef10442-0000798d-0000a9f6-ba32aeee49712540-1752c4f4", "ret_msg": "3303001", "success": false, "type": "COMMAND_RESP", "wsKey": "unifiedPrivate"}

  it.skip('should subscribe to public private unified account events', async () => {
    const wsResponsePromise = waitForSocketEvent(wsClient, 'response');
    const wsUpdatePromise = waitForSocketEvent(wsClient, 'update');

    // USDT should be detected and automatically routed through the USDT connection
    const topic = 'user.position.unifiedAccount';
    wsClient.subscribe(topic);

    try {
      expect(await wsResponsePromise).toMatchObject({
        op: 'subscribe',
        req_id: topic,
        success: true,
        wsKey: WS_KEY_MAP.unifiedPrivate,
      });
    } catch (e) {
      // sub failed
      expect(e).toBeFalsy();
    }

    try {
      expect(await wsUpdatePromise).toStrictEqual('');
    } catch (e) {
      // no data
      expect(e).toBeFalsy();
    }
  });
});
