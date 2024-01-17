/**
 * Use type guards to narrow down types with minimal efforts.
 */

import { WSOrderbookEventV5 } from '../types/websocket.events';

/**
 * Type guard to detect a V5 orderbook event (delta & snapshots)
 *
 * @param event
 * @returns
 */
export function isWsOrderbookEventV5(
  event: unknown,
): event is WSOrderbookEventV5 {
  if (
    typeof event !== 'object' ||
    !event ||
    typeof event['topic'] !== 'string' ||
    typeof event['type'] !== 'string'
  ) {
    return false;
  }

  return (
    ['delta', 'snapshot'].includes(event['type']) &&
    event['topic'].startsWith('orderbook')
  );
}
