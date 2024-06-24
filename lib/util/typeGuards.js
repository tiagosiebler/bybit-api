"use strict";
/**
 * Use type guards to narrow down types with minimal efforts.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.isWsOrderbookEventV5 = isWsOrderbookEventV5;
exports.isWsPositionEventV5 = isWsPositionEventV5;
exports.isWsAccountOrderEventV5 = isWsAccountOrderEventV5;
exports.isWsExecutionEventV5 = isWsExecutionEventV5;
/**
 * Type guard to detect a V5 orderbook event (delta & snapshots)
 *
 * @param event
 * @returns
 */
function isWsOrderbookEventV5(event) {
    if (typeof event !== 'object' ||
        !event ||
        typeof event['topic'] !== 'string' ||
        typeof event['type'] !== 'string') {
        return false;
    }
    return (['delta', 'snapshot'].includes(event['type']) &&
        event['topic'].startsWith('orderbook'));
}
/**
 * Type guard to detect a V5 position event.
 *
 * @param event
 * @returns
 */
function isWsPositionEventV5(event) {
    if (typeof event !== 'object' ||
        !event ||
        typeof event['topic'] !== 'string') {
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
function isWsAccountOrderEventV5(event) {
    if (typeof event !== 'object' ||
        !event ||
        typeof event['topic'] !== 'string') {
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
function isWsExecutionEventV5(event) {
    if (typeof event !== 'object' ||
        !event ||
        typeof event['topic'] !== 'string') {
        return false;
    }
    return event['topic'] === 'execution';
}
//# sourceMappingURL=typeGuards.js.map