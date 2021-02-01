import { WsConnectionState } from '../websocket-client';
import { DefaultLogger, Logger } from '../logger';

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

  getWs(key: string): WebSocket | undefined {
    return this.connections[key];
  }

  setWs(key: string, wsConnection: WebSocket): WebSocket {
    const existingConnection = this.getWs(key);
    if (existingConnection && existingConnection.readyState === existingConnection.OPEN) {
      this.logger.warning('WsStore setConnection() overwriting existing open connection: ', existingConnection);
    }
    this.connections[key] = wsConnection;
    return wsConnection;
  }

  clearWs(key: string) {
    const existingConnection = this.getWs(key);
    if (existingConnection) {
      existingConnection.close();
      delete this.connections[key];
    }
  }

  getConnectionState(key: string): WsConnectionState {
    return this.connectionState[key];
  }

  setConnectionState(key: string, state: WsConnectionState) {
    this.connectionState[key] = state;
  }

  isConnectionState(key: string, state: WsConnectionState): boolean {
    return this.getConnectionState(key) === state;
  }
}