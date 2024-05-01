/**
 * Use type guards to narrow down types with minimal efforts.
 */

import { WSAccountOrderEventV5, WSExecutionEventV5, WSOrderbookEventV5, WSPositionEventV5 } from '../types/websocket.events';

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

/**
 * Type guard to detect a V5 position event.
 * 
 * @param event
 * @returns
 */
export function isWsPositionEventV5(
  event: unknown,
): event is WSPositionEventV5 {
  if (
    typeof event !== 'object' ||
    !event ||
    typeof event['topic'] !== 'string'
  ) {
    return false;
  }

  return event['topic'] === 'position';
}

/**
 * Type guard to detect a V5 order event.
 *
 * @param event
 * @returns
 */
export function isWsAccountOrderEventV5(
  event: unknown,
): event is WSAccountOrderEventV5 {
  if (
    typeof event !== 'object' ||
    !event ||
    typeof event['topic'] !== 'string'
  ) {
    return false;
  }

  return event['topic'] === 'order';
}

/**
 * Type guard to detect a V5 execution event.
 *
 * @param event
 * @returns
 */
export function isWsExecutionEventV5(
  event: unknown,
): event is WSExecutionEventV5 {
  if (
    typeof event !== 'object' ||
    !event ||
    typeof event['topic'] !== 'string'
  ) {
    return false;
  }

  return event['topic'] === 'execution';
}