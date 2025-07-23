/**
 * Unit tests for RSA authentication functionality
 */

import { getSignKeyType, signMessage } from '../../src/util/webCryptoAPI';

describe('RSA Authentication', () => {
  // Test RSA private key (same as in the example)
  const rsaPrivateKey = process.env.API_SECRET_COM_RSA;

  // Test HMAC secret (simple string)
  const hmacSecret = process.env.API_SECRET_COM;

  // Test message used across multiple test suites
  const testMessage = 'test-message-to-sign';

  describe('Key Type Detection', () => {
    test('should detect RSA key type correctly', () => {
      const keyType = getSignKeyType(rsaPrivateKey);
      expect(keyType).toBe('RSASSA-PKCS1-v1_5');
    });

    test('should detect HMAC key type correctly', () => {
      const keyType = getSignKeyType(hmacSecret);
      expect(keyType).toBe('HMAC');
    });

    // dummy key for testing
    test('should detect RSA key with different PEM format', () => {
      const rsaKeyDifferentFormat = `-----BEGIN RSA PRIVATE KEY-----
MIIEowIBCCKCAQEA4f5wg5l2hKsXeNem/V41fGnJm6gOdrj8ym3rFkEjWT2btYI=
-----END RSA PRIVATE KEY-----`;
      const keyType = getSignKeyType(rsaKeyDifferentFormat);
      expect(keyType).toBe('RSASSA-PKCS1-v1_5');
    });
  });

  describe('Signature Generation', () => {
    test('should generate RSA signature with base64 encoding by default', async () => {
      const signature = await signMessage(testMessage, rsaPrivateKey);

      // RSA signatures are base64 encoded
      expect(signature).toMatch(/^[A-Za-z0-9+/=]+$/);
      expect(signature.length).toBeGreaterThan(100); // RSA signatures are typically longer
    });

    test('should generate HMAC signature with hex encoding by default', async () => {
      const signature = await signMessage(testMessage, hmacSecret);

      // HMAC signatures are hex encoded
      expect(signature).toMatch(/^[a-f0-9]+$/);
      expect(signature.length).toBe(64); // SHA-256 hex is 64 characters
    });

    test('should allow manual encoding override for RSA', async () => {
      const signature = await signMessage(testMessage, rsaPrivateKey, 'hex');

      // Should be hex encoded even for RSA when explicitly specified
      expect(signature).toMatch(/^[a-f0-9]+$/);
    });

    test('should allow manual encoding override for HMAC', async () => {
      const signature = await signMessage(testMessage, hmacSecret, 'base64');

      // Should be base64 encoded even for HMAC when explicitly specified
      expect(signature).toMatch(/^[A-Za-z0-9+/=]+$/);
    });

    test('should use SHA-256 by default', async () => {
      const signature1 = await signMessage(testMessage, hmacSecret);
      const signature2 = await signMessage(
        testMessage,
        hmacSecret,
        undefined,
        'SHA-256',
      );

      expect(signature1).toBe(signature2);
    });

    test('should support SHA-512 algorithm', async () => {
      const signature256 = await signMessage(
        testMessage,
        hmacSecret,
        undefined,
        'SHA-256',
      );
      const signature512 = await signMessage(
        testMessage,
        hmacSecret,
        undefined,
        'SHA-512',
      );

      expect(signature256).not.toBe(signature512);
      expect(signature512.length).toBe(128); // SHA-512 hex is 128 characters
    });
  });

  describe('Backwards Compatibility', () => {
    test('should maintain backwards compatibility with explicit parameters', async () => {
      // Old style call with all parameters
      const signature = await signMessage(
        testMessage,
        hmacSecret,
        'hex',
        'SHA-256',
      );

      expect(signature).toMatch(/^[a-f0-9]+$/);
      expect(signature.length).toBe(64);
    });
  });

  describe('Error Handling', () => {
    test('should throw error for invalid RSA key format', async () => {
      const invalidRsaKey =
        '-----BEGIN PRIVATE KEY-----\ninvalid-key-content\n-----END PRIVATE KEY-----';

      await expect(signMessage(testMessage, invalidRsaKey)).rejects.toThrow();
    });
  });
});
