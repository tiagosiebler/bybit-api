import { RestClientV5 } from '../src/index';

// or
// import { RestClientV5 } from 'bybit-api';

/**
 * The first parameter of the REST client allows you to pass any configuration parameters supported by the SDK.
 *
 * These include API keys, if you wish to use private endpoints, but also expose other features such as
 * setting a custom base URL (e.g. for Turkish users).
 *
 * Refer to the API documentation for a complete list of domains: https://bybit-exchange.github.io/docs/v5/guide#authentication
 */
const client = new RestClientV5({
  /**
   * You can pass a completely custom base URL,
   * e.g. if you're trying to use a domain that hasn't been added yet (please let us know)
   */
  // baseUrl: 'https://api5.bybit.com',
  //
  //
  /**
   *
   * There are also predefined API regions, which you can easily use with the "apiRegion" property:
   *
   */
  //
  //
  // default: routes to api.bybit.com
  // apiRegion: 'default',
  //
  //
  // bytick: routes to api.bytick.com
  // apiRegion: 'bytick',
  //
  //
  // NL: routes to api.bybit.nl (for Netherland users)
  // apiRegion: 'NL',
  //
  //
  // HK: routes to api.byhkbit.com (for Hong Kong users)
  // apiRegion: 'HK',
  //
  //
  // TK: routes to api.bybit-tr.com (for Turkey users)
  // apiRegion: 'TK',
});

(async () => {
  try {
    const time1 = await client.getServerTime();

    console.log('time res: ', { time1 });
  } catch (e) {
    console.error('request failed: ', e);
  }
})();
