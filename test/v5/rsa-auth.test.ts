/**
 * Unit tests for RSA authentication functionality
 */

import { getSignKeyType, signMessage } from '../../src/util/webCryptoAPI';

describe('RSA Authentication', () => {
  // Test RSA private key (same as in the example)
  const rsaPrivateKey = `-----BEGIN PRIVATE KEY-----
MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDlQAhUqvonQoZj
89xpbvVaCUIRUEcRLse1LUrWFTOF1moprOPeeftVxcHt3++J/ToOyP3qsRhcK3d1
uOQw6bb+7PEfv2gU7p23JsbBlNJw9jlEmKp3V+6a+nT4gyP3GfCPEXcc7/vhMu9O
GVHS3A+5sQfTtY5tnfltK978JpSKPEUbcqcsqvT+UduW7+xHbvP0M+kmkgLs3EEX
PaqptbzUxJKNvUNt53OuEofMm5RmoFTsHv8pvmXbwKOsz61yeIla35MWlD8QZ3lj
t2DCz/81x7v+rUeOJNkxig/R/4yHWQ8rck475gnIRXolD9uOJQuoiAj/xOSUxoWr
H8aenyN/AgMBAAECggEAG6JoXqxtkyX1xT60JxF1CfFrwWKH7o5RDIn1J3FO0KdU
DMoGfd7+aQx5oA8KdPvNb9LSqOPIJ/QlZk9vUmYZ5Qjy1/zeswdAg79s3hDufSdx
J8+vXMuAu7XNO9ezEipSUSytyxMyrabSKfvrXRuh2aR5aQ/Np3EPjBVpv8N2zGLV
FSGWe5eiDtlkrjcRRgJFtvxmyR7QidlO6kfGSGOQvTxBm3TnLoTJgEQSz4ik/qRV
hpKopjtfkYGGziQetvc4d8eSXoO/129VMdPl2JUYX2M5lDiidUGvT6mJxplsBw1v
PzmOOjmzXQYkPO5CI2cgC8mi29QDd3Hblh4p718GgQKBgQD4iTAJYeBvhzWZ6af4
7v+3/DKUEhSlBK/TlBdqx7WQSGHuV1gprRymun5xcvagucE3wX9szyZDaeY6TFcl
dDiwJsP/ZZlNsOSTU4SWsAJozTsd7TDRiKHSikKAxJDXN4wWIOc5GMb8VH8qq881
MRmyibfQ5Uqu0PnnW10GpWMS0QKBgQDsIpIWCqAVAQtKoiRSUnyYFobp1bOfu4Y6
2BfX7A0Zd9+A1eBIscHbLPL/zxkTEQZiKO6qTgU3aiuLN+88UxaEmAss1blHVnb0
Bk/VuUURA3ViVNElViGIfUFKWWp5q8ie7wmsq50fHzamepjzkDQRFjQzQpELyRIg
Ukvi69pFTwKBgCjDb4KKcCI6vfrhjPBSWtTVY4JPuN0b+K6uIm0cFlZ02MMbxlUH
lKRwAB8haPwRm3RGo1y4WSFDdERpkv2Mo2OY6BqykkNg2Qyk7SE9+xcvWhvddF1Z
mJkMnj26f7sc3Dgg62u8+Z4XScg458JkrD9RQTnc8bPciLB+lrJpW+eRAoGBAN3P
J3yO5Ip2XZ3wqr+tfh364yYZuE3t/4uc2uDXegKXaJoDzVdbqmZwVZ5Xcg1H68Af
BPlyqlHAaECw/QekYL2SeMTXyd+p57kXiLyQ+MCfiA8i7wbsXjlwtvjY/zxlUeGB
Vowc9E18q4A8HxqDNXVrbwNLnyX77QvxYhk5ROHfAoGBAL7ZGwKeEW0IXcuijLHh
xMfEfoft6cknljKlSQ+mrvhGzzondwLIEstoccdz8HUF9tBxVYqD+NGNVO6T96fw
seYmhbpaniMEyokzfqNSO85a/OsVRoOaXF+JO7dN17scJ8705UVSbU5J5Nb+exkH
FXxgalnjSrMYYeKBAlQaBuMD
-----END PRIVATE KEY-----`;

  // Test HMAC secret (simple string)
  const hmacSecret = 'test-hmac-secret-key';

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

    test('should detect RSA key with different PEM format', () => {
      const rsaKeyDifferentFormat = `-----BEGIN RSA PRIVATE KEY-----
MIIEowIBAAKCAQEA4f5wg5l2hKsTeNem/V41fGnJm6gOdrj8ym3rFkEjWT2btYI=
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
