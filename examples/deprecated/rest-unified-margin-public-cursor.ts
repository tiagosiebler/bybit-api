import { UnifiedMarginClient } from '../../src/index';

// or
// import { UnifiedMarginClient } from 'bybit-api';

const client = new UnifiedMarginClient({
  strict_param_validation: true,
});

(async () => {
  try {
    // page 1
    const historicOrders1 = await client.getInstrumentInfo({
      category: 'linear',
      limit: '2',
    });
    console.log('page 1:', JSON.stringify(historicOrders1, null, 2));

    // page 2
    const historicOrders2 = await client.getInstrumentInfo({
      category: 'linear',
      limit: '2',
      cursor: historicOrders1.result.nextPageCursor,
    });
    console.log('page 2:', JSON.stringify(historicOrders2, null, 2));

    // page 1 & 2 in one request (for comparison)
    const historicOrdersBoth = await client.getInstrumentInfo({
      category: 'linear',
      limit: '4',
    });
    console.log('both pages', JSON.stringify(historicOrdersBoth, null, 2));
  } catch (e) {
    console.error('request failed: ', e);
  }
})();
