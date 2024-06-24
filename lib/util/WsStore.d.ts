import WebSocket from 'isomorphic-ws';
import { WsKey } from '../types';
import { DefaultLogger } from './logger';
export declare enum WsConnectionStateEnum {
    INITIAL = 0,
    CONNECTING = 1,
    CONNECTED = 2,
    CLOSING = 3,
    RECONNECTING = 4
}
/** A "topic" is always a string */
type WsTopic = string;
/**
 * A "Set" is used to ensure we only subscribe to a topic once (tracking a list of unique topics we're expected to be connected to)
 * Note: Accurate duplicate tracking only works for plaintext topics.
 * E.g. JSON objects may not be seen as duplicates if keys are in different orders. If that's needed, check the FTX implementation.
 */
type WsTopicList = Set<WsTopic>;
interface WsStoredState {
    /** The currently active websocket connection */
    ws?: WebSocket;
    /** The current lifecycle state of the connection (enum) */
    connectionState?: WsConnectionStateEnum;
    /** A timer that will send an upstream heartbeat (ping) when it expires */
    activePingTimer?: ReturnType<typeof setTimeout> | undefined;
    /** A timer tracking that an upstream heartbeat was sent, expecting a reply before it expires */
    activePongTimer?: ReturnType<typeof setTimeout> | undefined;
    /** If a reconnection is in progress, this will have the timer for the delayed reconnect */
    activeReconnectTimer?: ReturnType<typeof setTimeout> | undefined;
    /**
     * All the topics we are expected to be subscribed to (and we automatically resubscribe to if the connection drops)
     */
    subscribedTopics: WsTopicList;
}
export default class WsStore {
    private wsState;
    private logger;
    constructor(logger: typeof DefaultLogger);
    /** Get WS stored state for key, optionally create if missing */
    get(key: WsKey, createIfMissing?: true): WsStoredState;
    get(key: WsKey, createIfMissing?: false): WsStoredState | undefined;
    getKeys(): WsKey[];
    create(key: WsKey): WsStoredState | undefined;
    delete(key: WsKey): void;
    hasExistingActiveConnection(key: WsKey): boolean;
    getWs(key: WsKey): WebSocket | undefined;
    setWs(key: WsKey, wsConnection: WebSocket): WebSocket;
    isWsOpen(key: WsKey): boolean;
    getConnectionState(key: WsKey): WsConnectionStateEnum;
    setConnectionState(key: WsKey, state: WsConnectionStateEnum): void;
    isConnectionState(key: WsKey, state: WsConnectionStateEnum): boolean;
    getTopics(key: WsKey): WsTopicList;
    getTopicsByKey(): Record<string, WsTopicList>;
    addTopic(key: WsKey, topic: WsTopic): WsTopicList;
    deleteTopic(key: WsKey, topic: WsTopic): boolean;
}
export {};
