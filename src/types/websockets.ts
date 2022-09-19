import { RestClientOptions, WS_KEY_MAP } from '../util';

/** For spot markets, spotV3 is recommended */
export type APIMarket =
  | 'inverse'
  | 'linear'
  | 'spot'
  | 'spotv3'
  | 'usdcOption'
  | 'usdcPerp'
  | 'unifiedPerp'
  | 'unifiedOption';

// Same as inverse futures
export type WsPublicInverseTopic =
  | 'orderBookL2_25'
  | 'orderBookL2_200'
  | 'trade'
  | 'insurance'
  | 'instrument_info'
  | 'klineV2';

export type WsPublicUSDTPerpTopic =
  | 'orderBookL2_25'
  | 'orderBookL2_200'
  | 'trade'
  | 'insurance'
  | 'instrument_info'
  | 'kline';

export type WsPublicSpotV1Topic =
  | 'trade'
  | 'realtimes'
  | 'kline'
  | 'depth'
  | 'mergedDepth'
  | 'diffDepth';

export type WsPublicSpotV2Topic =
  | 'depth'
  | 'kline'
  | 'trade'
  | 'bookTicker'
  | 'realtimes';

export type WsPublicTopics =
  | WsPublicInverseTopic
  | WsPublicUSDTPerpTopic
  | WsPublicSpotV1Topic
  | WsPublicSpotV2Topic
  | string;

// Same as inverse futures
export type WsPrivateInverseTopic =
  | 'position'
  | 'execution'
  | 'order'
  | 'stop_order';

export type WsPrivateUSDTPerpTopic =
  | 'position'
  | 'execution'
  | 'order'
  | 'stop_order'
  | 'wallet';

export type WsPrivateSpotTopic =
  | 'outboundAccountInfo'
  | 'executionReport'
  | 'ticketInfo';

export type WsPrivateTopic =
  | WsPrivateInverseTopic
  | WsPrivateUSDTPerpTopic
  | WsPrivateSpotTopic
  | string;

export type WsTopic = WsPublicTopics | WsPrivateTopic;

/** This is used to differentiate between each of the available websocket streams (as bybit has multiple websockets) */
export type WsKey = typeof WS_KEY_MAP[keyof typeof WS_KEY_MAP];

export interface WSClientConfigurableOptions {
  key?: string;
  secret?: string;
  testnet?: boolean;

  /**
   * The API group this client should connect to.
   *
   * For the V3 APIs use `v3` as the market (spot/unified margin/usdc/account asset/copy trading)
   */
  market: APIMarket;

  pongTimeout?: number;
  pingInterval?: number;
  reconnectTimeout?: number;
  restOptions?: RestClientOptions;
  requestOptions?: any;
  wsUrl?: string;
  /** If true, fetch server time before trying to authenticate (disabled by default) */
  fetchTimeOffsetBeforeAuth?: boolean;
}

export interface WebsocketClientOptions extends WSClientConfigurableOptions {
  testnet?: boolean;
  market: APIMarket;
  pongTimeout: number;
  pingInterval: number;
  reconnectTimeout: number;
}
