export type LogParams = null | any;
export declare const DefaultLogger: {
    /** Ping/pong events and other raw messages that might be noisy */
    silly: (...params: LogParams) => void;
    debug: (...params: LogParams) => void;
    notice: (...params: LogParams) => void;
    info: (...params: LogParams) => void;
    warning: (...params: LogParams) => void;
    error: (...params: LogParams) => void;
};
