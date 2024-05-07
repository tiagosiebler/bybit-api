// @ts-ignore
import { HttpsProxyAgent } from 'https-proxy-agent';

import { RestClientV5 } from '../src/index';

// or
// import { RestClientV5 } from 'bybit-api';

const key = process.env.API_KEY_COM;
const secret = process.env.API_SECRET_COM;

/**
 * Some proxy services don't work with the proxy configuration that axios supports.
 *
 * For these, you can try using HttpsProxyAgent or SocksProxyAgent (depending on your proxy type, HTTP or SOCKS).
 *
 * The following example uses the HttpsProxyAgent (via the npm module https-proxy-agent).
 */

const proxyDetails = {
  user: 'yourProxyUser',
  pass: 'yourProxyPassword',
  host: '127.0.0.1',
  port: 31413,
};

const proxyURL = `http://${proxyDetails.user}:${proxyDetails.pass}@${proxyDetails.host}:${proxyDetails.port}`;
const proxyAgent = new HttpsProxyAgent(proxyURL);

const client = new RestClientV5(
  {
    key: key,
    secret: secret,
    parseAPIRateLimits: true,
    testnet: true,
    // Sometimes using a proxy introduces recv timestamp errors (due to the extra latency)
    // If that happens, you can try increasing the recv window (which is 5000ms by default)
    // recv_window: 10000,
  },
  {
    httpAgent: proxyAgent,
    httpsAgent: proxyAgent,
  },
);

(async () => {
  try {
    const res = await client.getWalletBalance({ accountType: 'UNIFIED' });

    console.log('response: ', JSON.stringify(res, null, 2));
  } catch (e) {
    console.error('request failed: ', e);
  }
})();
