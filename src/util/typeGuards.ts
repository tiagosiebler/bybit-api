/**
 * Use type guards to narrow down types with minimal efforts.
 */

import { WebsocketSucceededTopicSubscriptionConfirmationEvent } from '../types';
import { WSAPIResponse, WS_API_Operations } from '../types/websockets/ws-api';
import {
  WSAccountOrderEventV5,
  WSExecutionEventV5,
  WSOrderbookEventV5,
  WSPositionEventV5,
} from '../types/websockets/ws-events';
import { isTopicSubscriptionConfirmation } from './requestUtils';

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

export function neverGuard(x: never, msg: string): Error {
  return new Error(`Unhandled value exception "${x}", ${msg}`);
}

export function isWSAPIResponse(
  msg: unknown,
): msg is Omit<WSAPIResponse, 'wsKey'> {
  if (typeof msg !== 'object' || !msg) {
    return false;
  }

  if (typeof msg['op'] !== 'string') {
    return false;
  }

  return (WS_API_Operations as string[]).includes(msg['op']);
}

export function isTopicSubscriptionSuccess(
  msg: unknown,
): msg is WebsocketSucceededTopicSubscriptionConfirmationEvent {
  if (!isTopicSubscriptionConfirmation(msg)) return false;
  return msg.success === true;
}
