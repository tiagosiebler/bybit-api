import { WsKey } from '../types';

export const wsKeyInverse = 'inverse';
export const wsKeyLinearPrivate = 'linearPrivate';
export const wsKeyLinearPublic = 'linearPublic';
export const wsKeySpotPrivate = 'spotPrivate';
export const wsKeySpotPublic = 'spotPublic';

export function getLinearWsKeyForTopic(topic: string): WsKey {
  const privateLinearTopics = [
    'position',
    'execution',
    'order',
    'stop_order',
    'wallet',
  ];
  if (privateLinearTopics.includes(topic)) {
    return wsKeyLinearPrivate;
  }

  return wsKeyLinearPublic;
}

export function getSpotWsKeyForTopic(topic: string): WsKey {
  const privateLinearTopics = [
    'position',
    'execution',
    'order',
    'stop_order',
    'outboundAccountInfo',
    'executionReport',
    'ticketInfo',
  ];

  if (privateLinearTopics.includes(topic)) {
    return wsKeySpotPrivate;
  }

  return wsKeySpotPublic;
}
