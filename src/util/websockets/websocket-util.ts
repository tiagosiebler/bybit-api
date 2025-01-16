import WebSocket from 'isomorphic-ws';
import {
  APIMarket,
  CategoryV5,
  WebsocketClientOptions,
  WsKey,
} from '../../types';

import { DefaultLogger } from '../logger';
import { WSAPIRequest } from '../../types/websockets/ws-api';

export const WS_LOGGER_CATEGORY = { category: 'bybit-ws' };

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
  contractUSDTPublic: 'contractUSDTPublic',
  contractUSDTPrivate: 'contractUSDTPrivate',
  contractInversePublic: 'contractInversePublic',
  contractInversePrivate: 'contractInversePrivate',
  v5SpotPublic: 'v5SpotPublic',
  v5LinearPublic: 'v5LinearPublic',
  v5InversePublic: 'v5InversePublic',
  v5OptionPublic: 'v5OptionPublic',
  v5Private: 'v5Private',
  /**
   * The V5 Websocket API (for sending orders over WS)
   */
  v5PrivateTrade: 'v5PrivateTrade',
} as const;

export const WS_AUTH_ON_CONNECT_KEYS: WsKey[] = [
  WS_KEY_MAP.spotV3Private,
  WS_KEY_MAP.usdcOptionPrivate,
  WS_KEY_MAP.usdcPerpPrivate,
  WS_KEY_MAP.unifiedPrivate,
  WS_KEY_MAP.contractUSDTPrivate,
  WS_KEY_MAP.contractInversePrivate,
  WS_KEY_MAP.v5Private,
  WS_KEY_MAP.v5PrivateTrade,
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
  WS_KEY_MAP.contractUSDTPublic,
  WS_KEY_MAP.contractInversePublic,
  WS_KEY_MAP.v5SpotPublic,
  WS_KEY_MAP.v5LinearPublic,
  WS_KEY_MAP.v5InversePublic,
  WS_KEY_MAP.v5OptionPublic,
] as string[];

/** Used to automatically determine if a sub request should be to the public or private ws (when there's two) */
const PRIVATE_TOPICS = [
  'stop_order',
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
  // contract v3
  'user.position.contractAccount',
  'user.execution.contractAccount',
  'user.order.contractAccount',
  'user.wallet.contractAccount',
  // v5
  'position',
  'execution',
  'order',
  'wallet',
  'greeks',
];

/**
 * Normalised internal format for a request (subscribe/unsubscribe/etc) on a topic, with optional parameters.
 *
 * - Topic: the topic this event is for
 * - Payload: the parameters to include, optional. E.g. auth requires key + sign. Some topics allow configurable parameters.
 * - Category: required for bybit, since different categories have different public endpoints
 */
export interface WsTopicRequest<
  TWSTopic extends string = string,
  TWSPayload = unknown,
> {
  topic: TWSTopic;
  payload?: TWSPayload;
  category?: CategoryV5;
}

/**
 * Conveniently allow users to request a topic either as string topics or objects (containing string topic + params)
 */
export type WsTopicRequestOrStringTopic<
  TWSTopic extends string,
  TWSPayload = unknown,
> = WsTopicRequest<TWSTopic, TWSPayload> | string;

interface NetworkMapV3 {
  livenet: string;
  livenet2?: string;
  testnet: string;
  testnet2?: string;
}

type PublicPrivateNetwork = 'public' | 'private';

/**
 * The following WS keys are logical.
 *
 * They're not directly used as a market. They usually have one private endpoint but many public ones,
 * so they need a bit of extra handling for seamless messaging between endpoints.
 *
 * For the unified keys, the "split" happens using the symbol. Symbols suffixed with USDT are obviously USDT topics.
 * For the v5 endpoints, the subscribe/unsubscribe call must specify the category the subscription should route to.
 */
type PublicOnlyWsKeys =
  | 'unifiedPerpUSDT'
  | 'unifiedPerpUSDC'
  | 'v5SpotPublic'
  | 'v5LinearPublic'
  | 'v5InversePublic'
  | 'v5OptionPublic';

export const WS_BASE_URL_MAP: Record<
  APIMarket,
  Record<PublicPrivateNetwork, NetworkMapV3>
> &
  Record<PublicOnlyWsKeys, Record<'public', NetworkMapV3>> &
  Record<
    typeof WS_KEY_MAP.v5PrivateTrade,
    Record<PublicPrivateNetwork, NetworkMapV3>
  > = {
  v5: {
    public: {
      livenet: 'public topics are routed internally via the public wskeys',
      testnet: 'public topics are routed internally via the public wskeys',
    },
    private: {
      livenet: 'wss://stream.bybit.com/v5/private',
      testnet: 'wss://stream-testnet.bybit.com/v5/private',
    },
  },
  v5PrivateTrade: {
    public: {
      livenet: 'public topics are routed internally via the public wskeys',
      testnet: 'public topics are routed internally via the public wskeys',
    },
    private: {
      livenet: 'wss://stream.bybit.com/v5/trade',
      testnet: 'wss://stream-testnet.bybit.com/v5/trade',
    },
  },
  v5SpotPublic: {
    public: {
      livenet: 'wss://stream.bybit.com/v5/public/spot',
      testnet: 'wss://stream-testnet.bybit.com/v5/public/spot',
    },
  },
  v5LinearPublic: {
    public: {
      livenet: 'wss://stream.bybit.com/v5/public/linear',
      testnet: 'wss://stream-testnet.bybit.com/v5/public/linear',
    },
  },
  v5InversePublic: {
    public: {
      livenet: 'wss://stream.bybit.com/v5/public/inverse',
      testnet: 'wss://stream-testnet.bybit.com/v5/public/inverse',
    },
  },
  v5OptionPublic: {
    public: {
      livenet: 'wss://stream.bybit.com/v5/public/option',
      testnet: 'wss://stream-testnet.bybit.com/v5/public/option',
    },
  },
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
  },
  unifiedPerpUSDC: {
    public: {
      livenet: 'wss://stream.bybit.com/contract/usdc/public/v3',
      testnet: 'wss://stream-testnet.bybit.com/contract/usdc/public/v3',
    },
  },
  contractUSDT: {
    public: {
      livenet: 'wss://stream.bybit.com/contract/usdt/public/v3',
      testnet: 'wss://stream-testnet.bybit.com/contract/usdt/public/v3',
    },
    private: {
      livenet: 'wss://stream.bybit.com/contract/private/v3',
      testnet: 'wss://stream-testnet.bybit.com/contract/private/v3',
    },
  },
  contractInverse: {
    public: {
      livenet: 'wss://stream.bybit.com/contract/inverse/public/v3',
      testnet: 'wss://stream-testnet.bybit.com/contract/inverse/public/v3',
    },
    private: {
      livenet: 'wss://stream.bybit.com/contract/private/v3',
      testnet: 'wss://stream-testnet.bybit.com/contract/private/v3',
    },
  },
};

export function isPrivateWsTopic(topic: string): boolean {
  return PRIVATE_TOPICS.includes(topic);
}

export function getWsKeyForTopic(
  market: APIMarket,
  topic: string,
  isPrivate?: boolean,
  category?: CategoryV5,
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

      if (
        upperTopic.indexOf('USDC') !== -1 ||
        upperTopic.indexOf('PERP') !== -1
      ) {
        return WS_KEY_MAP.unifiedPerpUSDCPublic;
      }

      throw new Error(
        `Failed to determine wskey for unified perps topic: "${topic}"`,
      );
    }
    case 'contractInverse': {
      return isPrivateTopic
        ? WS_KEY_MAP.contractInversePrivate
        : WS_KEY_MAP.contractInversePublic;
    }
    case 'contractUSDT': {
      return isPrivateTopic
        ? WS_KEY_MAP.contractUSDTPrivate
        : WS_KEY_MAP.contractUSDTPublic;
    }
    case 'v5': {
      if (isPrivateTopic) {
        return WS_KEY_MAP.v5Private;
      }

      switch (category) {
        case 'spot': {
          return WS_KEY_MAP.v5SpotPublic;
        }
        case 'linear': {
          return WS_KEY_MAP.v5LinearPublic;
        }
        case 'inverse': {
          return WS_KEY_MAP.v5InversePublic;
        }
        case 'option': {
          return WS_KEY_MAP.v5OptionPublic;
        }
        case undefined: {
          throw new Error('Category cannot be undefined');
        }
        default: {
          throw neverGuard(
            category,
            'getWsKeyForTopic(v5): Unhandled v5 category',
          );
        }
      }
    }
    default: {
      throw neverGuard(market, 'getWsKeyForTopic(): Unhandled market');
    }
  }
}

export function getWsUrl(
  wsKey: WsKey,
  wsClientOptions: WebsocketClientOptions,
  logger: typeof DefaultLogger,
): string {
  const wsUrl = wsClientOptions.wsUrl;
  if (wsUrl) {
    return wsUrl;
  }

  // https://bybit-exchange.github.io/docs/v5/demo
  const isDemoTrading = wsClientOptions.demoTrading;
  if (isDemoTrading) {
    return 'wss://stream-demo.bybit.com/v5/private';
  }

  const isTestnet = wsClientOptions.testnet;
  const networkKey = isTestnet ? 'testnet' : 'livenet';

  switch (wsKey) {
    case WS_KEY_MAP.v5Private: {
      return WS_BASE_URL_MAP.v5.private[networkKey];
    }
    case WS_KEY_MAP.v5PrivateTrade: {
      return WS_BASE_URL_MAP[wsKey].private[networkKey];
    }
    case WS_KEY_MAP.v5SpotPublic: {
      return WS_BASE_URL_MAP.v5SpotPublic.public[networkKey];
    }
    case WS_KEY_MAP.v5LinearPublic: {
      return WS_BASE_URL_MAP.v5LinearPublic.public[networkKey];
    }
    case WS_KEY_MAP.v5InversePublic: {
      return WS_BASE_URL_MAP.v5InversePublic.public[networkKey];
    }
    case WS_KEY_MAP.v5OptionPublic: {
      return WS_BASE_URL_MAP.v5OptionPublic.public[networkKey];
    }
    case WS_KEY_MAP.linearPublic: {
      return WS_BASE_URL_MAP.linear.public[networkKey];
    }
    case WS_KEY_MAP.linearPrivate: {
      return WS_BASE_URL_MAP.linear.private[networkKey];
    }
    case WS_KEY_MAP.spotPublic: {
      return WS_BASE_URL_MAP.spot.public[networkKey];
    }
    case WS_KEY_MAP.spotPrivate: {
      return WS_BASE_URL_MAP.spot.private[networkKey];
    }
    case WS_KEY_MAP.spotV3Public: {
      return WS_BASE_URL_MAP.spotv3.public[networkKey];
    }
    case WS_KEY_MAP.spotV3Private: {
      return WS_BASE_URL_MAP.spotv3.private[networkKey];
    }
    case WS_KEY_MAP.inverse: {
      // private and public are on the same WS connection
      return WS_BASE_URL_MAP.inverse.public[networkKey];
    }
    case WS_KEY_MAP.usdcOptionPublic: {
      return WS_BASE_URL_MAP.usdcOption.public[networkKey];
    }
    case WS_KEY_MAP.usdcOptionPrivate: {
      return WS_BASE_URL_MAP.usdcOption.private[networkKey];
    }
    case WS_KEY_MAP.usdcPerpPublic: {
      return WS_BASE_URL_MAP.usdcPerp.public[networkKey];
    }
    case WS_KEY_MAP.usdcPerpPrivate: {
      return WS_BASE_URL_MAP.usdcPerp.private[networkKey];
    }
    case WS_KEY_MAP.unifiedOptionPublic: {
      return WS_BASE_URL_MAP.unifiedOption.public[networkKey];
    }
    case WS_KEY_MAP.unifiedPerpUSDTPublic: {
      return WS_BASE_URL_MAP.unifiedPerpUSDT.public[networkKey];
    }
    case WS_KEY_MAP.unifiedPerpUSDCPublic: {
      return WS_BASE_URL_MAP.unifiedPerpUSDC.public[networkKey];
    }
    case WS_KEY_MAP.unifiedPrivate: {
      return WS_BASE_URL_MAP.unifiedPerp.private[networkKey];
    }
    case WS_KEY_MAP.contractInversePrivate: {
      return WS_BASE_URL_MAP.contractInverse.private[networkKey];
    }
    case WS_KEY_MAP.contractInversePublic: {
      return WS_BASE_URL_MAP.contractInverse.public[networkKey];
    }
    case WS_KEY_MAP.contractUSDTPrivate: {
      return WS_BASE_URL_MAP.contractUSDT.private[networkKey];
    }
    case WS_KEY_MAP.contractUSDTPublic: {
      return WS_BASE_URL_MAP.contractUSDT.public[networkKey];
    }
    default: {
      logger.error('getWsUrl(): Unhandled wsKey: ', {
        category: 'bybit-ws',
        wsKey,
      });
      throw neverGuard(wsKey, 'getWsUrl(): Unhandled wsKey');
    }
  }
}

export function getMaxTopicsPerSubscribeEvent(
  market: APIMarket,
  wsKey: WsKey,
): number | null {
  const topicsPerEventSpot = 10;
  switch (market) {
    case 'inverse':
    case 'linear':
    case 'usdcOption':
    case 'usdcPerp':
    case 'unifiedOption':
    case 'unifiedPerp':
    case 'spot':
    case 'contractInverse':
    case 'contractUSDT':
    case 'v5': {
      if (wsKey === WS_KEY_MAP.v5SpotPublic) {
        return topicsPerEventSpot;
      }
      return null;
    }
    case 'spotv3': {
      return topicsPerEventSpot;
    }
    default: {
      throw neverGuard(market, 'getWsKeyForTopic(): Unhandled market');
    }
  }
}

export function getUsdcWsKeyForTopic(
  topic: string,
  subGroup: 'option' | 'perp',
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

/**
 * #305: ws.terminate() is undefined in browsers.
 * This only works in node.js, not in browsers.
 * Does nothing if `ws` is undefined.
 */
export function safeTerminateWs(ws?: WebSocket | unknown) {
  // #305: ws.terminate() undefined in browsers
  if (ws && typeof ws['terminate'] === 'function') {
    ws.terminate();
  }
}
/**
 * WS API promises are stored using a primary key. This key is constructed using
 * properties found in every request & reply.
 */
export function getPromiseRefForWSAPIRequest(
  requestEvent: WSAPIRequest<unknown>,
): string {
  const promiseRef = [requestEvent.op, requestEvent.reqId].join('_');
  return promiseRef;
}
