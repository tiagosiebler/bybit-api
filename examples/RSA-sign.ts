/**
 * Example demonstrating RSA authentication support in Bybit API client
 *
 * The client now automatically detects the key type and uses the appropriate
 * signing algorithm:
 * - HMAC keys (string): HMAC-SHA256 with hex encoding
 * - RSA keys (PEM format): RSA-SHA256 with base64 encoding
 */

import { RestClientV5 } from '../src/index';

// or
// import { RestClientV5 } from 'bybit-api';

// Received after creating a new API key with a self-generated RSA public key on bybit
const api_key = 'your-api-key-here';

// The self-generated RSA private key, this is never directly given to bybit, but used to generate a signature
// Note: this MUST include the "BEGIN PRIVATE KEY" header so the SDK understands this is RSA auth
const rsaPrivateKey = `-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDEV3l9bqvoZU63
2kclUF4GNTKhvolN9ddW+aL9Fc4fU0H/gmCOULGp1kMFh/w7wWcEUVIu5d+IRxJ+
5g9pKlq+DDBuglJc/KGG3IlUXgcJs2JVXFI6MGgPEvdrUsvfc1D9QlmIfhJkgaXz
VPhO+I1NyxfU/MpFXF4Ol6e3NQRbDsDlS/5Ox4tyNSSHgf8hLZRnaZVUPAvhlx7e
hFPNDk9G1b5BotoN2Bii14kBMwG+R/rX1AAgl6WdoPNPT88MsoW+01qI93j9HGps
MTAfolLDtBDHwUWlwzMoK4k+JPvmUcog3EiJyVuOtak9DDvf9lmS156K6okQlDQl
HNmyTNo9AgMBAAECggEAMIVMhvinX4hPpoQ5Aknk3oRdhZasYFmBdKM/CevOUzP0
UqQh3/GloirKx85mAU9neavuExxoPAmSUs1gYBUhNSeWfWzT1VpyQX11K6YL97P+
uEkXIf2t7ZG6lqlwrAEXseqobSB4w6E9hU+JiJyIcQHgWxh4lSEBNnp4bkBaGfUx
RquXlkZ/XM07+uiDTjMrPDnxAwZFRo/xl0edAhsAHqZiDCO4NUTM26bvxYMLPtNW
ttsCmrNdQXys85CALMgvslqGXAV6AtYChm4ZA+fnSeVx5X3SwieQmQUqNcQ3Z8E9
KI3eUhQrIubIBKiVhD3wjLW53o43IfRuW4+CGmb5CQKBgQD4XphiZMxjv84VGyRL
KS7v0IKcRNkShWAvCViLGhkbMOLSDg7UaZm21KIDogebmfrUzaMi5dKA6LuNpz1V
WR2n/45CUogsYmLk9zwgCF4f4DIL5gnBEJKTZZMo4zk5EpsyDYvwFDNG2scsy9Cq
4eketMN6IT3VeosweNOS2N0qpQKBgQDKX69fbJX6i2TvCowBTqCRIheuYNp4pkr0
GNHzT2tizsaP7hSIQHfeY9qB+F7DMYa2MnBaIlJbPumiXa7busqg+FcTP6YOien9
lIdv2u8Pr8PjdanPQvBl1eAJNuEKm/gM9O/jPQCwa65L9NtRLw+PjpY4tkGe3Wev
5ORQOFuVuQKBgCiv1mbH/HOayDfM6nUlmfrPPZY78ROHpeoOreKbs+EwcPfYNbW2
VugMjT3rHTPwVZbm2QKug316or7h1rpUjvcmdjeHLaeXtnurxL26oTC3mXs5g/+M
p3Zd/W2FS6p90c6xSWta48uHq3k7KkPUHkxZcGxhZa/DE2otYPt9az3BAoGAYXug
DbZPtIWLFD6fXE3UuLSUdbI/6tgnyNdf4vVBxDHYoiJMD6oGU8ED05GhjCMCQief
yTs5MqzmfAjmnv+mdc3KnAIP6nbymO0AJJhwibzf/mSCbM1Q4a0ZozalRqgE37Dp
ESwkddcY+Yu0TbH+q+dCY4UfrPf351m5xQ6wxzkCgYEAmVdilDWFYhY6b4S+IKLZ
9OmY7i7/Rpq0U7IZmE6q/vwaEz0hKc/iAgci/s5Furyd/d/4ChPa3zr6mbjWGjTk
77tJ39eN1eSascL06gvAK5lVym4hJD61HQXpyXEAm5D1liRtvNA8CDynXYU19C9j
Dj5BEbMNzhbwWKTxLDpqUso=
-----END PRIVATE KEY-----`;

const client = new RestClientV5({
  key: api_key,
  secret: rsaPrivateKey,
  testnet: true,
});

(async () => {
  try {
    console.log('private api call result: ', await client.getAccountInfo());
  } catch (e) {
    console.error('request failed: ', e);
  }
})();
