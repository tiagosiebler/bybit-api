/**
 * Example demonstrating RSA authentication support in Bybit API client
 *
 * The client now automatically detects the key type and uses the appropriate
 * signing algorithm:
 * - HMAC keys (string): HMAC-SHA256 with hex encoding
 * - RSA keys (PEM format): RSA-SHA256 with base64 encoding
 */

import { RestClientV5 } from '../src/rest-client-v5';

// Example HMAC key (traditional API key)
const hmacKey = process.env.API_KEY_COM;
const hmacSecret = process.env.API_SECRET_COM;

// Example RSA key (self-generated API key)
// https://www.bybit.com/en/help-center/article/How-to-Create-an-RSA-Key-on-Bybit
const rsaKey = process.env.API_KEY_COM_RSA;
const rsaPrivateKey = process.env.API_SECRET_COM_RSA;

async function demonstrateAuthentication() {
  console.log('=== Bybit RSA Authentication Demo ===\n');

  // Example 1: Using HMAC (traditional API key)
  console.log('1. HMAC Authentication:');
  const hmacClient = new RestClientV5({
    key: hmacKey,
    secret: hmacSecret,
    testnet: true,
  });

  try {
    // This will automatically use HMAC-SHA256 with hex encoding
    const accountInfo = await hmacClient.getAccountInfo();
    console.log('✓ HMAC authentication successful');
    console.log('Account info:', JSON.stringify(accountInfo, null, 2));
  } catch (error) {
    console.log('✗ HMAC authentication failed:', error);
  }

  console.log('\n2. RSA Authentication:');
  // Example 2: Using RSA (self-generated API key)
  const rsaClient = new RestClientV5({
    key: rsaKey,
    secret: rsaPrivateKey, // PEM format private key
    testnet: true,
  });

  try {
    // This will automatically use RSA-SHA256 with base64 encoding
    const accountInfo = await rsaClient.getAccountInfo();
    console.log('✓ RSA authentication successful');
    console.log('Account info:', JSON.stringify(accountInfo, null, 2));
  } catch (error) {
    console.log('✗ RSA authentication failed:', error);
  }

  console.log('\n=== Key Type Detection ===');

  // Demonstrate automatic key type detection
  const { getSignKeyType } = await import('../src/util/webCryptoAPI');

  console.log('HMAC key type:', getSignKeyType(hmacSecret)); // Should be 'HMAC'
  console.log('RSA key type:', getSignKeyType(rsaPrivateKey)); // Should be 'RSASSA-PKCS1-v1_5'
}

// Only run if this file is executed directly
if (require.main === module) {
  demonstrateAuthentication().catch(console.error);
}

export { demonstrateAuthentication };
