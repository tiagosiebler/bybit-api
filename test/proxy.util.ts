import { AxiosRequestConfig } from 'axios';

import { WSClientConfigurableOptions } from '../src';

export function getTestProxy(): AxiosRequestConfig {
  if (process.env.PROXY_ENABLED !== 'true') {
    return {};
  }
  const host = process.env.PROXY_HOST;
  const port = process.env.PROXY_PORT;
  const user = process.env.PROXY_USER;
  const pass = process.env.PROXY_PASS;
  if (!host || !port || !user || !pass) {
    throw new Error('One or more env vars missing for proxy support');
  }

  return {
    proxy: {
      host,
      port: Number(port),
      auth: {
        username: user,
        password: pass,
      },
      protocol: 'http',
    },
  };
}

/** Returns a WS proxy configuration used by end-to-end tests in Github Actions */
export function getWSTestProxy(): Partial<WSClientConfigurableOptions> {
  if (process.env.PROXY_ENABLED !== 'true') {
    return {};
  }
  const host = process.env.PROXY_HOST;
  const port = process.env.PROXY_PORT;
  const user = process.env.PROXY_USER;
  const pass = process.env.PROXY_PASS;
  if (!host || !port || !user || !pass) {
    throw new Error('One or more env vars missing for proxy support');
  }

  console.log('WS Test proxy enabled...');

  return {
    wsOptions: {
      agent: getHttpsProxyAgent(host, port, user, pass),
    },
  };
}

/**
 * Returns an axios & websocket compatible proxy config using brightdata credentials
 */
export function getHttpsProxyAgent(
  host: string,
  port: string | number,
  user: string,
  pass: string,
): AxiosRequestConfig | undefined {
  try {
    // Optional dependency that might be missing
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { HttpsProxyAgent } = require('https-proxy-agent');

    const url = `https://${user}:${pass}@${host}:${port}`;
    return new HttpsProxyAgent(url);
  } catch (e) {
    const msg =
      'Failed to prepare https proxy config - proxy agent dependency not installed';
    console.error(new Date(), msg, e);
    throw new Error(msg);
  }
}
