import { WebsocketClient } from '../../src';

describe('Public V5 Websocket client', () => {
  const api = new WebsocketClient({
    market: 'v5',
  });

  const linearSymbol = 'BTCUSDT';
  const linearCategory = 'linear';

  describe('Topics subscription confirmation', () => {
    it('can subscribeV5 to LINEAR with valid topic', async () => {
      await expect(
        api.subscribeV5(`publicTrade.${linearSymbol}`, linearCategory),
      ).resolves.toBeUndefined();
    });

    it('cannot subscribeV5 to LINEAR with valid topic', async () => {
      try {
        await api.subscribeV5(`publicTrade.${linearSymbol}X`, linearCategory);
      } catch (e) {
        expect(e).toBeDefined();
        expect(e).toMatch('(publicTrade.BTCUSDT) failed to subscribe');
      }
    });
  });
});
