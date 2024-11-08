export async function signMessage(
  message: string,
  secret: string,
): Promise<string> {
  const encoder = new TextEncoder();
  // eslint-disable-next-line no-undef
  const key = await window.crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: { name: 'SHA-256' } },
    false,
    ['sign'],
  );

  // eslint-disable-next-line no-undef
  const signature = await window.crypto.subtle.sign(
    'HMAC',
    key,
    encoder.encode(message),
  );

  return Array.prototype.map
    .call(
      new Uint8Array(signature),
      (x: { toString: (arg0: number) => string }) =>
        ('00' + x.toString(16)).slice(-2),
    )
    .join('');
}
