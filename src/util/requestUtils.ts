export interface RestClientOptions {
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

export function getRestBaseUrl(useLivenet: boolean, restInverseOptions: RestClientOptions) {
  const baseUrlsInverse = {
    livenet: 'https://api.bybit.com',
    testnet: 'https://api-testnet.bybit.com'
  };

  if (restInverseOptions.baseUrl) {
    return restInverseOptions.baseUrl;
  }

  if (useLivenet === true) {
    return baseUrlsInverse.livenet;
  }
  return baseUrlsInverse.testnet;
}

export function isPublicEndpoint (endpoint: string): boolean {
  if (endpoint.startsWith('v2/public')) {
    return true;
  }
  if (endpoint.startsWith('public/linear')) {
    return true;
  }
  return false;
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
