import { DefaultLogger, Logger } from '../logger';

export enum WsConnectionState {
  READY_STATE_INITIAL,
  READY_STATE_CONNECTING,
  READY_STATE_CONNECTED,
  READY_STATE_CLOSING,
  READY_STATE_RECONNECTING
};

export default class WsStore {
  private connections: {
    [key: string]: WebSocket
  };
  private connectionState: {
    [key: string]: WsConnectionState
  }
  private logger: Logger;

  constructor(logger: Logger) {
    this.connections = {}
    this.connectionState = {};
    this.logger = logger || DefaultLogger;
  }

  getConnection(key: string) {
    return this.connections[key];
  }

  setConnection(key: string, wsConnection: WebSocket) {
    const existingConnection = this.getConnection(key);
    if (existingConnection) {
      this.logger.info('WsStore setConnection() overwriting existing connection: ', existingConnection);
    }
    this.connections[key] = wsConnection;
  }

  clearConnection(key: string) {
    const existingConnection = this.getConnection(key);
    if (existingConnection) {
      delete this.connections[key];
    }
  }

  getConnectionState(key: string) {
    return this.connectionState[key];
  }

  setConnectionState(key: string, state: WsConnectionState) {
    this.connectionState[key] = state;
  }

  isConnectionState(key: string, state: WsConnectionState) {
    const a = this.getConnectionState(key) === state;
    const b = this.getConnectionState(key) == state;
    if (a != b) {
      console.error('connection state doesnt match: ', { state, storedState: this.getConnectionState(key) });
    } else {
      console.log('isConnectionState matches');
    }
    return this.getConnectionState(key) === state;
  }
}