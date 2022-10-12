import { APIMarket, WsKey } from '../types';

interface NetworkMapV3 {
  livenet: string;
  livenet2?: string;
  testnet: string;
  testnet2?: string;
}

type PublicPrivateNetwork = 'public' | 'private';

export const WS_BASE_URL_MAP: Record<
  APIMarket | 'unifiedPerpUSDT' | 'unifiedPerpUSDC',
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
  usdcOption: {
    public: {
      livenet: 'wss://stream.bybit.com/trade/option/usdc/public/v1',
      livenet2: 'wss://stream.bytick.com/trade/option/usdc/public/v1',
      testnet: 'wss://stream-testnet.bybit.com/trade/option/usdc/public/v1',
    },
    private: {
      livenet: 'wss://stream.bybit.com/trade/option/usdc/private/v1',
      livenet2: 'wss://stream.bytick.com/trade/option/usdc/private/v1',
      testnet: 'wss://stream-testnet.bybit.com/trade/option/usdc/private/v1',
    },
  },
  usdcPerp: {
    public: {
      livenet: 'wss://stream.bybit.com/perpetual/ws/v1/realtime_public',
      livenet2: 'wss://stream.bytick.com/perpetual/ws/v1/realtime_public',
      testnet: 'wss://stream-testnet.bybit.com/perpetual/ws/v1/realtime_public',
    },
    private: {
      livenet: 'wss://stream.bybit.com/trade/option/usdc/private/v1',
      livenet2: 'wss://stream.bytick.com/trade/option/usdc/private/v1',
      testnet: 'wss://stream-testnet.bybit.com/trade/option/usdc/private/v1',
    },
  },
  unifiedOption: {
    public: {
      livenet: 'wss://stream.bybit.com/option/usdc/public/v3',
      testnet: 'wss://stream-testnet.bybit.com/option/usdc/public/v3',
    },
    private: {
      livenet: 'wss://stream.bybit.com/unified/private/v3',
      testnet: 'wss://stream-testnet.bybit.com/unified/private/v3',
    },
  },
  unifiedPerp: {
    public: {
      livenet: 'useBaseSpecificEndpoint',
      testnet: 'useBaseSpecificEndpoint',
    },
    private: {
      livenet: 'wss://stream.bybit.com/unified/private/v3',
      testnet: 'wss://stream-testnet.bybit.com/unified/private/v3',
    },
  },
  unifiedPerpUSDT: {
    public: {
      livenet: 'wss://stream.bybit.com/contract/usdt/public/v3',
      testnet: 'wss://stream-testnet.bybit.com/contract/usdt/public/v3',
    },
    private: {
      livenet: 'useUnifiedEndpoint',
      testnet: 'useUnifiedEndpoint',
    },
  },
  unifiedPerpUSDC: {
    public: {
      livenet: 'wss://stream.bybit.com/contract/usdc/public/v3',
      testnet: 'wss://stream-testnet.bybit.com/contract/usdc/public/v3',
    },
    private: {
      livenet: 'useUnifiedEndpoint',
      testnet: 'useUnifiedEndpoint',
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
  usdcOptionPrivate: 'usdcOptionPrivate',
  usdcOptionPublic: 'usdcOptionPublic',
  usdcPerpPrivate: 'usdcPerpPrivate',
  usdcPerpPublic: 'usdcPerpPublic',
  unifiedPrivate: 'unifiedPrivate',
  unifiedOptionPublic: 'unifiedOptionPublic',
  unifiedPerpUSDTPublic: 'unifiedPerpUSDTPublic',
  unifiedPerpUSDCPublic: 'unifiedPerpUSDCPublic',
} as const;

export const WS_AUTH_ON_CONNECT_KEYS: WsKey[] = [
  WS_KEY_MAP.spotV3Private,
  WS_KEY_MAP.usdcOptionPrivate,
  WS_KEY_MAP.usdcPerpPrivate,
  WS_KEY_MAP.unifiedPrivate,
];

export const PUBLIC_WS_KEYS = [
  WS_KEY_MAP.linearPublic,
  WS_KEY_MAP.spotPublic,
  WS_KEY_MAP.spotV3Public,
  WS_KEY_MAP.usdcOptionPublic,
  WS_KEY_MAP.usdcPerpPublic,
  WS_KEY_MAP.unifiedOptionPublic,
  WS_KEY_MAP.unifiedPerpUSDTPublic,
  WS_KEY_MAP.unifiedPerpUSDCPublic,
] as string[];

/** Used to automatically determine if a sub request should be to the public or private ws (when there's two) */
const PRIVATE_TOPICS = [
  'position',
  'execution',
  'order',
  'stop_order',
  'wallet',
  'outboundAccountInfo',
  'executionReport',
  'ticketInfo',
  // copy trading apis
  'copyTradePosition',
  'copyTradeOrder',
  'copyTradeExecution',
  'copyTradeWallet',
  // usdc options
  'user.openapi.option.position',
  'user.openapi.option.trade',
  'user.order',
  'user.openapi.option.order',
  'user.service',
  'user.openapi.greeks',
  'user.mmp.event',
  // usdc perps
  'user.openapi.perp.position',
  'user.openapi.perp.trade',
  'user.openapi.perp.order',
  'user.service',
  // unified margin
  'user.position.unifiedAccount',
  'user.execution.unifiedAccount',
  'user.order.unifiedAccount',
  'user.wallet.unifiedAccount',
  'user.greeks.unifiedAccount',
];

export function getWsKeyForTopic(
  market: APIMarket,
  topic: string,
  isPrivate?: boolean
): WsKey {
  const isPrivateTopic = isPrivate === true || PRIVATE_TOPICS.includes(topic);
  switch (market) {
    case 'inverse': {
      return WS_KEY_MAP.inverse;
    }
    case 'linear': {
      return isPrivateTopic
        ? WS_KEY_MAP.linearPrivate
        : WS_KEY_MAP.linearPublic;
    }
    case 'spot': {
      return isPrivateTopic ? WS_KEY_MAP.spotPrivate : WS_KEY_MAP.spotPublic;
    }
    case 'spotv3': {
      return isPrivateTopic
        ? WS_KEY_MAP.spotV3Private
        : WS_KEY_MAP.spotV3Public;
    }
    case 'usdcOption': {
      return isPrivateTopic
        ? WS_KEY_MAP.usdcOptionPrivate
        : WS_KEY_MAP.usdcOptionPublic;
    }
    case 'usdcPerp': {
      return isPrivateTopic
        ? WS_KEY_MAP.usdcPerpPrivate
        : WS_KEY_MAP.usdcPerpPublic;
    }
    case 'unifiedOption': {
      return isPrivateTopic
        ? WS_KEY_MAP.unifiedPrivate
        : WS_KEY_MAP.unifiedOptionPublic;
    }
    case 'unifiedPerp': {
      if (isPrivateTopic) {
        return WS_KEY_MAP.unifiedPrivate;
      }

      const upperTopic = topic.toUpperCase();
      if (upperTopic.indexOf('USDT') !== -1) {
        return WS_KEY_MAP.unifiedPerpUSDTPublic;
      }

      if (upperTopic.indexOf('USDC') !== -1) {
        return WS_KEY_MAP.unifiedPerpUSDCPublic;
      }

      throw new Error(
        `Failed to determine wskey for unified perps topic: "${topic}`
      );
    }
    default: {
      throw neverGuard(market, `getWsKeyForTopic(): Unhandled market`);
    }
  }
}

export function getMaxTopicsPerSubscribeEvent(
  market: APIMarket
): number | null {
  switch (market) {
    case 'inverse':
    case 'linear':
    case 'usdcOption':
    case 'usdcPerp':
    case 'unifiedOption':
    case 'unifiedPerp':
    case 'spot': {
      return null;
    }
    case 'spotv3': {
      return 10;
    }
    default: {
      throw neverGuard(market, `getWsKeyForTopic(): Unhandled market`);
    }
  }
}

export function getUsdcWsKeyForTopic(
  topic: string,
  subGroup: 'option' | 'perp'
): WsKey {
  const isPrivateTopic = PRIVATE_TOPICS.includes(topic);
  if (subGroup === 'option') {
    return isPrivateTopic
      ? WS_KEY_MAP.usdcOptionPrivate
      : WS_KEY_MAP.usdcOptionPublic;
  }
  return isPrivateTopic
    ? WS_KEY_MAP.usdcOptionPrivate
    : WS_KEY_MAP.usdcOptionPublic;
  // return isPrivateTopic
  //   ? WS_KEY_MAP.usdcPerpPrivate
  //   : WS_KEY_MAP.usdcPerpPublic;
}

export const WS_ERROR_ENUM = {
  NOT_AUTHENTICATED_SPOT_V3: '-1004',
  API_ERROR_GENERIC: '10001',
  API_SIGN_AUTH_FAILED: '10003',
  USDC_OPTION_AUTH_FAILED: '3303006',
};

export function neverGuard(x: never, msg: string): Error {
  return new Error(`Unhandled value exception "x", ${msg}`);
}
