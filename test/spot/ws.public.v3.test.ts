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

describe('Public Spot V3 Websocket Client', () => {
  let wsClient: WebsocketClient;

  const wsClientOptions: WSClientConfigurableOptions = {
    market: 'spotv3',
  };

  beforeAll(() => {
    wsClient = new WebsocketClient(
      wsClientOptions,
      getSilentLogger('expectSuccess')
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
        wsKey: WS_KEY_MAP.spotV3Public,
      });
    } catch (e) {
      expect(e).toBeFalsy();
    }
  });

  it('should subscribe to public orderbook events', async () => {
    const wsResponsePromise = waitForSocketEvent(wsClient, 'response');
    const wsUpdatePromise = waitForSocketEvent(wsClient, 'update');

    const symbol = 'BTCUSDT';
    const wsTopic = `orderbook.40.${symbol}`;

    expect(wsResponsePromise).resolves.toMatchObject({
      op: 'subscribe',
      success: true,
      ret_msg: 'subscribe',
      req_id: wsTopic,
    });

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
      expect(await wsUpdatePromise).toMatchObject({
        data: {
          a: expect.any(Array),
          b: expect.any(Array),
          s: symbol,
          t: expect.any(Number),
        },
        topic: wsTopic,
        ts: expect.any(Number),
        type: 'snapshot',
      });
    } catch (e) {
      console.error(`Wait for "${wsTopic}" event exception: `, e);
      expect(e).toBeFalsy();
    }
  });
});
