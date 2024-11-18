import { createHmac } from 'crypto';

/** This is async because the browser version uses a promise (browser-support) */
export async function signMessage(
  message: string,
  secret: string,
): Promise<string> {
  return createHmac('sha256', secret).update(message).digest('hex');
}
