import { neverGuard } from './typeGuards';

function bufferToB64(buffer: ArrayBuffer): string {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return globalThis.btoa(binary);
}

export type SignEncodeMethod = 'hex' | 'base64';
export type SignAlgorithm = 'SHA-256' | 'SHA-512';

type KeyType = 'HMAC' | 'RSASSA-PKCS1-v1_5';

/**
 * Determine the key type based on the secret format
 * RSA keys contain "-----BEGIN PRIVATE KEY-----" or "-----BEGIN RSA PRIVATE KEY-----"
 * HMAC keys are plain strings
 */
export function getSignKeyType(secret: string): KeyType {
  if (secret.includes('PRIVATE KEY')) {
    return 'RSASSA-PKCS1-v1_5';
  }
  return 'HMAC';
}

/**
 * Import a key for signing based on its type
 */
async function importKey(
  secret: string,
  type: KeyType,
  algorithm: SignAlgorithm,
  encoder: TextEncoder,
): Promise<CryptoKey> {
  switch (type) {
    case 'RSASSA-PKCS1-v1_5': {
      // Remove PEM headers/footers and whitespace to get base64 content
      const base64Key = secret.replace(
        /(?:-----BEGIN RSA PRIVATE KEY-----|-----BEGIN PRIVATE KEY-----|-----END RSA PRIVATE KEY-----|-----END PRIVATE KEY-----|\s+)/g,
        '',
      );

      const binaryKey = Uint8Array.from(atob(base64Key), (c) =>
        c.charCodeAt(0),
      );

      return crypto.subtle.importKey(
        'pkcs8',
        binaryKey.buffer,
        { name: type, hash: { name: algorithm } },
        false,
        ['sign'],
      );
    }
    case 'HMAC': {
      return globalThis.crypto.subtle.importKey(
        'raw',
        encoder.encode(secret),
        { name: type, hash: algorithm },
        false,
        ['sign'],
      );
    }
    default: {
      throw neverGuard(type, `Unhandled key type: "${type}"`);
    }
  }
}

/**
 * Similar to node crypto's `createHash()` function
 */
export async function hashMessage(
  message: string,
  method: SignEncodeMethod,
  algorithm: SignAlgorithm,
): Promise<string> {
  const encoder = new TextEncoder();

  const buffer = await globalThis.crypto.subtle.digest(
    algorithm,
    encoder.encode(message),
  );

  switch (method) {
    case 'hex': {
      return Array.from(new Uint8Array(buffer))
        .map((byte) => byte.toString(16).padStart(2, '0'))
        .join('');
    }
    case 'base64': {
      return bufferToB64(buffer);
    }
    default: {
      throw neverGuard(method, `Unhandled sign method: "${method}"`);
    }
  }
}

/**
 * Sign a message, with a secret, using the Web Crypto API
 * Automatically detects key type (HMAC vs RSA) and uses appropriate signing method
 * RSA keys use base64 encoding, HMAC keys use hex encoding (for backwards compatibility)
 */
export async function signMessage(
  message: string,
  secret: string,
  method?: SignEncodeMethod,
  algorithm: SignAlgorithm = 'SHA-256',
): Promise<string> {
  const encoder = new TextEncoder();

  const signKeyType = getSignKeyType(secret);

  // Automatically determine encoding method based on key type if not specified
  const encodeMethod =
    method || (signKeyType === 'RSASSA-PKCS1-v1_5' ? 'base64' : 'hex');

  const key = await importKey(secret, signKeyType, algorithm, encoder);

  const buffer = await globalThis.crypto.subtle.sign(
    { name: signKeyType },
    key,
    encoder.encode(message),
  );

  switch (encodeMethod) {
    case 'hex': {
      return Array.from(new Uint8Array(buffer))
        .map((byte) => byte.toString(16).padStart(2, '0'))
        .join('');
    }
    case 'base64': {
      return bufferToB64(buffer);
    }
    default: {
      throw neverGuard(
        encodeMethod,
        `Unhandled sign method: "${encodeMethod}"`,
      );
    }
  }
}

/**
 * Sign binary data (Buffer/Uint8Array) with a secret, using the Web Crypto API
 * Automatically detects key type (HMAC vs RSA) and uses appropriate signing method
 * RSA keys use base64 encoding, HMAC keys use hex encoding (for backwards compatibility)
 *
 * Note: This function works in both Node.js and browser environments.
 * In Node.js, you can pass a Buffer. In browsers, pass Uint8Array.
 */
export async function signBinaryData(
  data: Buffer | Uint8Array,
  secret: string,
  method?: SignEncodeMethod,
  algorithm: SignAlgorithm = 'SHA-256',
): Promise<string> {
  const encoder = new TextEncoder();

  const signKeyType = getSignKeyType(secret);

  // Automatically determine encoding method based on key type if not specified
  const encodeMethod =
    method || (signKeyType === 'RSASSA-PKCS1-v1_5' ? 'base64' : 'hex');

  const key = await importKey(secret, signKeyType, algorithm, encoder);

  // Convert to Uint8Array for Web Crypto API compatibility
  // Buffer is a subclass of Uint8Array in Node.js, but we need a proper Uint8Array
  // with ArrayBuffer (not ArrayBufferLike) to satisfy the BufferSource type constraint
  const dataArray = Uint8Array.from(data);

  const buffer = await globalThis.crypto.subtle.sign(
    { name: signKeyType },
    key,
    dataArray,
  );

  switch (encodeMethod) {
    case 'hex': {
      return Array.from(new Uint8Array(buffer))
        .map((byte) => byte.toString(16).padStart(2, '0'))
        .join('');
    }
    case 'base64': {
      return bufferToB64(buffer);
    }
    default: {
      throw neverGuard(
        encodeMethod,
        `Unhandled sign method: "${encodeMethod}"`,
      );
    }
  }
}

export function checkWebCryptoAPISupported() {
  if (typeof globalThis.crypto === 'undefined') {
    throw new Error(
      `Web Crypto API unavailable. Authentication will not work.

Are you using an old Node.js release? Refer to the current Node.js LTS version. Node.js v18 reached end of life in April 2025! You should be using Node LTS or newer (v22 or above)!

If you prefer to continue using an outdated Node.js version, check github for an example on using the node:crypto module for sign instead:
https://github.com/tiagosiebler/bybit-api/blob/master/examples/fasterHmacSign.ts
`,
    );
  }
}
