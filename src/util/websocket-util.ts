import { WsKey } from '../types';

interface NetworkMapV3 {
  livenet: string;
  livenet2?: string;
  testnet: string;
  testnet2?: string;
}

type PublicPrivateNetwork = 'public' | 'private';

export const WS_BASE_URL_MAP: Record<
  string,
  Record<PublicPrivateNetwork, NetworkMapV3>
> = {
  inverse: {
    private: {
      livenet: 'wss://stream.bybit.com/realtime',
      testnet: 'wss://stream-testnet.bybit.com/realtime',
    },
    public: {
      livenet: 'wss://stream.bybit.com/realtime',
      testnet: 'wss://stream-testnet.bybit.com/realtime',
    },
  },
  linear: {
    private: {
      livenet: 'wss://stream.bybit.com/realtime_private',
      livenet2: 'wss://stream.bytick.com/realtime_private',
      testnet: 'wss://stream-testnet.bybit.com/realtime_private',
    },
    public: {
      livenet: 'wss://stream.bybit.com/realtime_public',
      livenet2: 'wss://stream.bytick.com/realtime_public',
      testnet: 'wss://stream-testnet.bybit.com/realtime_public',
    },
  },
  spot: {
    private: {
      livenet: 'wss://stream.bybit.com/spot/ws',
      testnet: 'wss://stream-testnet.bybit.com/spot/ws',
    },
    public: {
      livenet: 'wss://stream.bybit.com/spot/quote/ws/v1',
      livenet2: 'wss://stream.bybit.com/spot/quote/ws/v2',
      testnet: 'wss://stream-testnet.bybit.com/spot/quote/ws/v1',
      testnet2: 'wss://stream-testnet.bybit.com/spot/quote/ws/v2',
    },
  },
};

export const WS_KEY_MAP = {
  inverse: 'inverse',
  linearPrivate: 'linearPrivate',
  linearPublic: 'linearPublic',
  spotPrivate: 'spotPrivate',
  spotPublic: 'spotPublic',
} as const;

export const PUBLIC_WS_KEYS = [
  WS_KEY_MAP.linearPublic,
  WS_KEY_MAP.spotPublic,
] as string[];

export function getLinearWsKeyForTopic(topic: string): WsKey {
  const privateTopics = [
    'position',
    'execution',
    'order',
    'stop_order',
    'wallet',
  ];
  if (privateTopics.includes(topic)) {
    return WS_KEY_MAP.linearPrivate;
  }

  return WS_KEY_MAP.linearPublic;
}

export function getSpotWsKeyForTopic(topic: string): WsKey {
  const privateTopics = [
    'position',
    'execution',
    'order',
    'stop_order',
    'outboundAccountInfo',
    'executionReport',
    'ticketInfo',
  ];

  if (privateTopics.includes(topic)) {
    return WS_KEY_MAP.spotPrivate;
  }
  return WS_KEY_MAP.spotPublic;
}
