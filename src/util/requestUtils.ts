export interface RestClientOptions {
  /** Your API key */
  key?: string;

  /** Your API secret */
  secret?: string;

  /** Set to `true` to connect to testnet. Uses the live environment by default. */
  testnet?: boolean;

  /** Override the max size of the request window (in ms) */
  recv_window?: number;

  /** Disabled by default. This can help on machines with consistent latency problems. */
  enable_time_sync?: boolean;

  /** How often to sync time drift with bybit servers */
  sync_interval_ms?: number | string;

  /** Default: false. If true, we'll throw errors if any params are undefined */
  strict_param_validation?: boolean;

  /**
   * Optionally override API protocol + domain
   * e.g baseUrl: 'https://api.bytick.com'
   **/
  baseUrl?: string;

  /** Default: true. whether to try and post-process request exceptions. */
  parse_exceptions?: boolean;
}

/**
 * Serialise a (flat) object into a query string
 * @param params the object to serialise
 * @param strict_validation throw if any properties are undefined
 * @param sortProperties sort properties alphabetically before building a query string
 * @returns the params object as a serialised string key1=value1&key2=value2&etc
 */
export function serializeParams(
  params: object = {},
  strict_validation = false,
  sortProperties = true
): string {
  const properties = sortProperties
    ? Object.keys(params).sort()
    : Object.keys(params);

  return properties
    .map((key) => {
      const value = params[key];
      if (strict_validation === true && typeof value === 'undefined') {
        throw new Error(
          'Failed to sign API request due to undefined parameter'
        );
      }
      return `${key}=${value}`;
    })
    .join('&');
}

export function getRestBaseUrl(
  useTestnet: boolean,
  restInverseOptions: RestClientOptions
): string {
  const exchangeBaseUrls = {
    livenet: 'https://api.bybit.com',
    testnet: 'https://api-testnet.bybit.com',
  };

  if (restInverseOptions.baseUrl) {
    return restInverseOptions.baseUrl;
  }

  if (useTestnet) {
    return exchangeBaseUrls.testnet;
  }

  return exchangeBaseUrls.livenet;
}

export function isWsPong(msg: any): boolean {
  if (!msg) {
    return false;
  }
  if (msg.pong || msg.ping) {
    return true;
  }

  if (msg['op'] === 'pong') {
    return true;
  }

  if (msg['ret_msg'] === 'pong') {
    return true;
  }

  return (
    msg.request &&
    msg.request.op === 'ping' &&
    msg.ret_msg === 'pong' &&
    msg.success === true
  );
}

export const APIID = 'bybitapinode';

/**
 * Used to switch how authentication/requests work under the hood (primarily for SPOT since it's different there)
 */
export const REST_CLIENT_TYPE_ENUM = {
  accountAsset: 'accountAsset',
  inverse: 'inverse',
  inverseFutures: 'inverseFutures',
  linear: 'linear',
  spot: 'spot',
  v3: 'v3',
} as const;

export type RestClientType =
  typeof REST_CLIENT_TYPE_ENUM[keyof typeof REST_CLIENT_TYPE_ENUM];
