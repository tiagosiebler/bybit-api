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
export declare function isWsOrderbookEventV5(event: unknown): event is WSOrderbookEventV5;
/**
 * Type guard to detect a V5 position event.
 *
 * @param event
 * @returns
 */
export declare function isWsPositionEventV5(event: unknown): event is WSPositionEventV5;
/**
 * Type guard to detect a V5 order event.
 *
 * @param event
 * @returns
 */
export declare function isWsAccountOrderEventV5(event: unknown): event is WSAccountOrderEventV5;
/**
 * Type guard to detect a V5 execution event.
 *
 * @param event
 * @returns
 */
export declare function isWsExecutionEventV5(event: unknown): event is WSExecutionEventV5;
