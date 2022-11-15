import { UnifiedMarginClient } from '../src/index';

// or
// import { UnifiedMarginClient } from 'bybit-api';

const key = process.env.API_KEY_COM;
const secret = process.env.API_SECRET_COM;

const client = new UnifiedMarginClient({
  key,
  secret,
  strict_param_validation: true,
});

(async () => {
  try {
    // page 1
    const historicOrders1 = await client.getHistoricOrders({
      category: 'linear',
      limit: 1,
      // cursor,
    });
    console.log('page 1:', JSON.stringify(historicOrders1, null, 2));

    // page 2
    const historicOrders2 = await client.getHistoricOrders({
      category: 'linear',
      limit: 1,
      cursor: historicOrders1.result.nextPageCursor,
    });
    console.log('page 2:', JSON.stringify(historicOrders2, null, 2));

    const historicOrdersBoth = await client.getHistoricOrders({
      category: 'linear',
      limit: 2,
    });
    console.log(
      'both to compare:',
      JSON.stringify(historicOrdersBoth, null, 2)
    );
  } catch (e) {
    console.error('request failed: ', e);
  }
})();
