import { APIMarket, WsKey } from '../types';

interface NetworkMapV3 {
  livenet: string;
  livenet2?: string;
  testnet: string;
  testnet2?: string;
}

type PublicPrivateNetwork = 'public' | 'private';

export const WS_BASE_URL_MAP: Record<
  APIMarket,
  Record<PublicPrivateNetwork, NetworkMapV3>
> = {
  inverse: {
    public: {
      livenet: 'wss://stream.bybit.com/realtime',
      testnet: 'wss://stream-testnet.bybit.com/realtime',
    },
    private: {
      livenet: 'wss://stream.bybit.com/realtime',
      testnet: 'wss://stream-testnet.bybit.com/realtime',
    },
  },
  linear: {
    public: {
      livenet: 'wss://stream.bybit.com/realtime_public',
      livenet2: 'wss://stream.bytick.com/realtime_public',
      testnet: 'wss://stream-testnet.bybit.com/realtime_public',
    },
    private: {
      livenet: 'wss://stream.bybit.com/realtime_private',
      livenet2: 'wss://stream.bytick.com/realtime_private',
      testnet: 'wss://stream-testnet.bybit.com/realtime_private',
    },
  },
  spot: {
    public: {
      livenet: 'wss://stream.bybit.com/spot/quote/ws/v1',
      livenet2: 'wss://stream.bybit.com/spot/quote/ws/v2',
      testnet: 'wss://stream-testnet.bybit.com/spot/quote/ws/v1',
      testnet2: 'wss://stream-testnet.bybit.com/spot/quote/ws/v2',
    },
    private: {
      livenet: 'wss://stream.bybit.com/spot/ws',
      testnet: 'wss://stream-testnet.bybit.com/spot/ws',
    },
  },
  spotv3: {
    public: {
      livenet: 'wss://stream.bybit.com/spot/public/v3',
      testnet: 'wss://stream-testnet.bybit.com/spot/public/v3',
    },
    private: {
      livenet: 'wss://stream.bybit.com/spot/private/v3',
      testnet: 'wss://stream-testnet.bybit.com/spot/private/v3',
    },
  },
};

export const WS_KEY_MAP = {
  inverse: 'inverse',
  linearPrivate: 'linearPrivate',
  linearPublic: 'linearPublic',
  spotPrivate: 'spotPrivate',
  spotPublic: 'spotPublic',
  spotV3Private: 'spotV3Private',
  spotV3Public: 'spotV3Public',
} as const;

export const WS_AUTH_ON_CONNECT_KEYS: WsKey[] = [WS_KEY_MAP.spotV3Private];

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

export function getSpotWsKeyForTopic(
  topic: string,
  apiVersion: 'v1' | 'v3'
): WsKey {
  const privateTopics = [
    'position',
    'execution',
    'order',
    'stop_order',
    'outboundAccountInfo',
    'executionReport',
    'ticketInfo',
  ];

  if (apiVersion === 'v3') {
    if (privateTopics.includes(topic)) {
      return WS_KEY_MAP.spotV3Private;
    }
    return WS_KEY_MAP.spotV3Public;
  }

  if (privateTopics.includes(topic)) {
    return WS_KEY_MAP.spotPrivate;
  }
  return WS_KEY_MAP.spotPublic;
}

export const WS_ERROR_ENUM = {
  NOT_AUTHENTICATED_SPOT_V3: '-1004',
  BAD_API_KEY_SPOT_V3: '10003',
};
