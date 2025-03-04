import { WebsocketClient } from '../../src';

describe.skip('Public V5 Websocket client', () => {
  const api = new WebsocketClient({});

  const linearSymbol = 'BTCUSDT';
  const linearCategory = 'linear';

  describe('Topics subscription confirmation', () => {
    it('can subscribeV5 to LINEAR with valid topic', async () => {
      await expect(
        Promise.allSettled(
          api.subscribeV5(`publicTrade.${linearSymbol}`, linearCategory),
        ),
      ).resolves.toStrictEqual([]);
    });

    it('cannot subscribeV5 to LINEAR with valid topic', async () => {
      try {
        await Promise.allSettled(
          api.subscribeV5(`publicTrade.${linearSymbol}X`, linearCategory),
        );
      } catch (e) {
        expect(e).toBeDefined();
        expect(e).toMatch(`(publicTrade.${linearSymbol}X) failed to subscribe`);
      }
    });
  });
});
