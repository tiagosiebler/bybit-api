export interface RestClientOptions {
  /** Override the max size of the request window (in ms) */
  recv_window?: number;

  /** @deprecated Time sync is now disabled by default. To re-enable it, use enable_time_sync instead. */
  disable_time_sync?: boolean;

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

export function serializeParams(
  params: object = {},
  strict_validation = false
): string {
  return Object.keys(params)
    .sort()
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
  useLivenet: boolean,
  restInverseOptions: RestClientOptions
): string {
  const exchangeBaseUrls = {
    livenet: 'https://api.bybit.com',
    testnet: 'https://api-testnet.bybit.com',
  };

  if (restInverseOptions.baseUrl) {
    return restInverseOptions.baseUrl;
  }

  if (useLivenet === true) {
    return exchangeBaseUrls.livenet;
  }
  return exchangeBaseUrls.testnet;
}

export function isWsPong(response: any) {
  if (response.pong || response.ping) {
    return true;
  }
  return (
    response.request &&
    response.request.op === 'ping' &&
    response.ret_msg === 'pong' &&
    response.success === true
  );
}

export const agentSource = 'bybitapinode';

/**
 * Used to switch how authentication/requests work under the hood (primarily for SPOT since it's different there)
 */
export const REST_CLIENT_TYPE_ENUM = {
  accountAsset: 'accountAsset',
  inverse: 'inverse',
  inverseFutures: 'inverseFutures',
  linear: 'linear',
  spot: 'spot',
  usdc: 'usdc',
} as const;

export type RestClientType =
  typeof REST_CLIENT_TYPE_ENUM[keyof typeof REST_CLIENT_TYPE_ENUM];
