import { createHmac } from 'crypto';

export interface RestClientInverseOptions {
  // override the max size of the request window (in ms)
  recv_window?: number;

  // how often to sync time drift with bybit servers
  sync_interval_ms?: number | string;

  // Default: false. Disable above sync mechanism if true.
  disable_time_sync?: boolean;

  // Default: false. If true, we'll throw errors if any params are undefined
  strict_param_validation?: boolean;

  // Optionally override API protocol + domain
  // e.g 'https://api.bytick.com'
  baseUrl?: string;

  // Default: true. whether to try and post-process request exceptions.
  parse_exceptions?: boolean;
}

export type GenericAPIResponse = Promise<any>;

export function signMessage(message: string, secret: string): string {
  return createHmac('sha256', secret)
    .update(message)
    .digest('hex');
};

export function serializeParams(params: object = {}, strict_validation = false): string {
  return Object.keys(params)
    .sort()
    .map(key => {
      const value = params[key];
      if (strict_validation === true && typeof value === 'undefined') {
        throw new Error('Failed to sign API request due to undefined parameter');
      }
      return `${key}=${value}`;
    })
    .join('&');
};

export function getBaseRESTInverseUrl(useLivenet?: boolean, restInverseOptions?: RestClientInverseOptions) {
  const baseUrlsInverse = {
    livenet: 'https://api.bybit.com',
    testnet: 'https://api-testnet.bybit.com'
  };

  if (restInverseOptions?.baseUrl) {
    return restInverseOptions.baseUrl;
  }

  if (useLivenet === true) {
    return baseUrlsInverse.livenet;
  }
  return baseUrlsInverse.testnet;
}