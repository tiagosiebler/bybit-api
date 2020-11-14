export interface RestClientInverseOptions {
    recv_window?: number;
    sync_interval_ms?: number | string;
    strict_param_validation?: boolean;
    baseUrl?: string;
}
export declare type GenericAPIResponse = Promise<any>;
export declare function signMessage(message: string, secret: string): string;
export declare function serializeParams(params?: object, strict_validation?: boolean): string;
