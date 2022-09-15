import { WebsocketClient, WsClientEvent } from '../src';

export const silentLogger = {
  silly: () => {},
  debug: () => {},
  notice: () => {},
  info: () => {},
  warning: () => {},
  error: () => {},
};

export const WS_OPEN_EVENT_PARTIAL = {
  type: 'open',
};

/** Resolves a promise if an event is seen before a timeout (defaults to 2.5 seconds) */
export function waitForSocketEvent(
  wsClient: WebsocketClient,
  event: WsClientEvent,
  timeoutMs: number = 4.5 * 1000
) {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      reject(
        `Failed to receive "${event}" event before timeout. Check that these are correct: topic, api keys (if private), signature process (if private)`
      );
    }, timeoutMs);

    let resolvedOnce = false;

    wsClient.on(event, (event) => {
      clearTimeout(timeout);
      resolve(event);
      resolvedOnce = true;
    });

    wsClient.on('error', (event) => {
      clearTimeout(timeout);
      if (!resolvedOnce) {
        reject(event);
      }
    });

    // if (event !== 'close') {
    //   wsClient.on('close', (event) => {
    //     clearTimeout(timeout);

    //     if (!resolvedOnce) {
    //       reject(event);
    //     }
    //   });
    // }
  });
}

export function logAllEvents(wsClient: WebsocketClient) {
  wsClient.on('update', (data) => {
    console.log('wsUpdate: ', JSON.stringify(data, null, 2));
  });

  wsClient.on('open', (data) => {
    console.log('wsOpen: ', data.wsKey);
  });
  wsClient.on('response', (data) => {
    console.log('wsResponse ', JSON.stringify(data, null, 2));
  });
  wsClient.on('reconnect', ({ wsKey }) => {
    console.log('wsReconnecting ', wsKey);
  });
  wsClient.on('reconnected', (data) => {
    console.log('wsReconnected ', data?.wsKey);
  });
  wsClient.on('close', (data) => {
    // console.log('wsClose: ', data);
  });
}

export function promiseSleep(ms: number) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });
}
