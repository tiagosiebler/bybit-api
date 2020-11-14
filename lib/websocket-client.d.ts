/// <reference types="node" />
import { EventEmitter } from 'events';
import { DefaultLogger } from './logger';
export interface WebsocketClientOptions {
    key?: string;
    secret?: string;
    livenet?: boolean;
    pongTimeout?: number;
    pingInterval?: number;
    reconnectTimeout?: number;
    restOptions?: any;
    requestOptions?: any;
    wsUrl?: string;
}
declare type Logger = typeof DefaultLogger;
export declare class WebsocketClient extends EventEmitter {
    private logger;
    private readyState;
    private pingInterval?;
    private pongTimeout?;
    private client;
    private _subscriptions;
    private ws;
    private options;
    constructor(options: WebsocketClientOptions, logger?: Logger);
    subscribe(topics: any): void;
    unsubscribe(topics: any): void;
    close(): void;
    _getWsUrl(): string;
    _connect(): Promise<void>;
    _authenticate(): Promise<string>;
    _reconnect(timeout: any): void;
    _ping(): void;
    _teardown(): void;
    _wsOpenHandler(): void;
    _wsMessageHandler(message: any): void;
    _wsOnErrorHandler(err: any): void;
    _wsCloseHandler(): void;
    _handleResponse(response: any): void;
    _handleUpdate(message: any): void;
    _subscribe(topics: any): void;
    _unsubscribe(topics: any): void;
}
export {};
