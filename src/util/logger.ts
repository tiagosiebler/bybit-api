/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type LogParams = null | any;

export const DefaultLogger = {
  /** Ping/pong events and other raw messages that might be noisy */
  silly: (...params: LogParams): void => {
    // console.log(params);
  },
  debug: (...params: LogParams): void => {
    console.log(params);
  },
  notice: (...params: LogParams): void => {
    console.log(params);
  },
  info: (...params: LogParams): void => {
    console.info(params);
  },
  warning: (...params: LogParams): void => {
    console.error(params);
  },
  error: (...params: LogParams): void => {
    console.error(params);
  },
};
