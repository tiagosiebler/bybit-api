export interface RestClientInverseOptions {
  recv_window?: number;

  // how often to sync time drift with bybit servers
  sync_interval_ms?: number | string;

  // if true, we'll throw errors if any params are undefined
  strict_param_validation?: boolean;

  // Optionally override API protocol + domain
  // e.g 'https://api.bytick.com'
  baseUrl?: string;
}

type GenericAPIResponse = Promise<any>;
