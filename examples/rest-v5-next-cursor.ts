import { RestClientV5, UniversalTransferRecordV5 } from '../src/index';

// or
// import { RestClientV5 } from 'bybit-api';

const client = new RestClientV5({
  testnet: false,
  key: 'insert_api_key',
  secret: 'insert_api_secret',
});

async function getAllUniversalTransfers() {
  const allTransfers: UniversalTransferRecordV5[] = [];
  let nextCursor = '';
  let pages = 0;

  do {
    pages++;
    console.log(`Fetching data from page ${pages}`);
    const response = await client.getUniversalTransferRecords({
      limit: 50, // Maximum page size per request
      cursor: nextCursor || undefined, // Only send cursor if we have one
    });

    if (response.result.list && response.result.list.length > 0) {
      allTransfers.push(...response.result.list);
    }

    nextCursor = response.result.nextPageCursor;

    // Optional: Add a small delay to avoid rate limits
    await new Promise((resolve) => setTimeout(resolve, 100));
  } while (nextCursor);

  console.log('Total transfers fetched:', allTransfers.length);
  console.log('All transfers:', allTransfers);
}

getAllUniversalTransfers().catch(console.error);
