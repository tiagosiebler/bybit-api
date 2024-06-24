import WebSocket from 'isomorphic-ws';
import { APIMarket, CategoryV5, WebsocketClientOptions, WsKey } from '../types';
import { DefaultLogger } from './logger';
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
type PublicOnlyWsKeys = 'unifiedPerpUSDT' | 'unifiedPerpUSDC' | 'v5SpotPublic' | 'v5LinearPublic' | 'v5InversePublic' | 'v5OptionPublic';
export declare const WS_BASE_URL_MAP: Record<APIMarket, Record<PublicPrivateNetwork, NetworkMapV3>> & Record<PublicOnlyWsKeys, Record<'public', NetworkMapV3>>;
export declare const WS_KEY_MAP: {
    readonly inverse: "inverse";
    readonly linearPrivate: "linearPrivate";
    readonly linearPublic: "linearPublic";
    readonly spotPrivate: "spotPrivate";
    readonly spotPublic: "spotPublic";
    readonly spotV3Private: "spotV3Private";
    readonly spotV3Public: "spotV3Public";
    readonly usdcOptionPrivate: "usdcOptionPrivate";
    readonly usdcOptionPublic: "usdcOptionPublic";
    readonly usdcPerpPrivate: "usdcPerpPrivate";
    readonly usdcPerpPublic: "usdcPerpPublic";
    readonly unifiedPrivate: "unifiedPrivate";
    readonly unifiedOptionPublic: "unifiedOptionPublic";
    readonly unifiedPerpUSDTPublic: "unifiedPerpUSDTPublic";
    readonly unifiedPerpUSDCPublic: "unifiedPerpUSDCPublic";
    readonly contractUSDTPublic: "contractUSDTPublic";
    readonly contractUSDTPrivate: "contractUSDTPrivate";
    readonly contractInversePublic: "contractInversePublic";
    readonly contractInversePrivate: "contractInversePrivate";
    readonly v5SpotPublic: "v5SpotPublic";
    readonly v5LinearPublic: "v5LinearPublic";
    readonly v5InversePublic: "v5InversePublic";
    readonly v5OptionPublic: "v5OptionPublic";
    readonly v5Private: "v5Private";
};
export declare const WS_AUTH_ON_CONNECT_KEYS: WsKey[];
export declare const PUBLIC_WS_KEYS: string[];
export declare function isPrivateWsTopic(topic: string): boolean;
export declare function getWsKeyForTopic(market: APIMarket, topic: string, isPrivate?: boolean, category?: CategoryV5): WsKey;
export declare function getWsUrl(wsKey: WsKey, wsClientOptions: WebsocketClientOptions, logger: typeof DefaultLogger): string;
export declare function getMaxTopicsPerSubscribeEvent(market: APIMarket, wsKey: WsKey): number | null;
export declare function getUsdcWsKeyForTopic(topic: string, subGroup: 'option' | 'perp'): WsKey;
export declare const WS_ERROR_ENUM: {
    NOT_AUTHENTICATED_SPOT_V3: string;
    API_ERROR_GENERIC: string;
    API_SIGN_AUTH_FAILED: string;
    USDC_OPTION_AUTH_FAILED: string;
};
export declare function neverGuard(x: never, msg: string): Error;
/**
 * #305: ws.terminate() is undefined in browsers.
 * This only works in node.js, not in browsers.
 * Does nothing if `ws` is undefined.
 */
export declare function safeTerminateWs(ws?: WebSocket | unknown): void;
export {};
