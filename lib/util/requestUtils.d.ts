import { AxiosResponse } from 'axios';
import { APIRateLimit } from '../types';
import { WebsocketSucceededTopicSubscriptionConfirmationEvent } from '../types/ws-events/succeeded-topic-subscription-confirmation';
import { WebsocketTopicSubscriptionConfirmationEvent } from '../types/ws-events/topic-subscription-confirmation';
export interface RestClientOptions {
    /** Your API key */
    key?: string;
    /** Your API secret */
    secret?: string;
    /** Set to `true` to connect to testnet. Uses the live environment by default. */
    testnet?: boolean;
    /**
     * Set to `true` to use Bybit's V5 demo trading: https://bybit-exchange.github.io/docs/v5/demo
     */
    demoTrading?: boolean;
    /** Override the max size of the request window (in ms) */
    recv_window?: number;
    /**
     * Disabled by default.
     * This can help on machines with consistent latency problems.
     *
     * Note: this feature is not recommended as one slow request can cause problems
     */
    enable_time_sync?: boolean;
    /** How often to sync time drift with bybit servers */
    sync_interval_ms?: number | string;
    /** Determines whether to perform time synchronization before sending private requests */
    syncTimeBeforePrivateRequests?: boolean;
    /** Default: false. If true, we'll throw errors if any params are undefined */
    strict_param_validation?: boolean;
    /**
     * Default: true.
     * If true, request parameters will be URI encoded during the signing process.
     * New behaviour introduced in v3.2.1 to fix rare parameter-driven sign errors with unified margin cursors containing "%".
     */
    encodeSerialisedValues?: boolean;
    /**
     * Optionally override API protocol + domain
     * e.g baseUrl: 'https://api.bytick.com'
     **/
    baseUrl?: string;
    /** Default: true. whether to try and post-process request exceptions. */
    parse_exceptions?: boolean;
    /** Default: false. Enable to parse/include per-API/endpoint rate limits in responses. */
    parseAPIRateLimits?: boolean;
    /** Default: false. Enable to throw error if rate limit parser fails */
    throwOnFailedRateLimitParse?: boolean;
}
/**
 * Serialise a (flat) object into a query string
 * @param params the object to serialise
 * @param strict_validation throw if any properties are undefined
 * @param sortProperties sort properties alphabetically before building a query string
 * @param encodeSerialisedValues URL encode value before serialising
 * @returns the params object as a serialised string key1=value1&key2=value2&etc
 */
export declare function serializeParams(params?: object, strict_validation?: boolean, sortProperties?: boolean, encodeSerialisedValues?: boolean): string;
export declare function getRestBaseUrl(useTestnet: boolean, restClientOptions: RestClientOptions): string;
export declare function isWsPong(msg: any): boolean;
export declare function isTopicSubscriptionConfirmation(msg: unknown): msg is WebsocketTopicSubscriptionConfirmationEvent;
export declare function isTopicSubscriptionSuccess(msg: unknown): msg is WebsocketSucceededTopicSubscriptionConfirmationEvent;
export declare const APIID = "bybitapinode";
/**
 * Used to switch how authentication/requests work under the hood (primarily for SPOT since it's different there)
 */
export declare const REST_CLIENT_TYPE_ENUM: {
    readonly accountAsset: "accountAsset";
    readonly inverse: "inverse";
    readonly inverseFutures: "inverseFutures";
    readonly linear: "linear";
    readonly spot: "spot";
    readonly v3: "v3";
};
export type RestClientType = (typeof REST_CLIENT_TYPE_ENUM)[keyof typeof REST_CLIENT_TYPE_ENUM];
/** Parse V5 rate limit response headers, if enabled */
export declare function parseRateLimitHeaders(headers: AxiosResponse['headers'] | undefined, throwOnFailedRateLimitParse: boolean): APIRateLimit | undefined;
