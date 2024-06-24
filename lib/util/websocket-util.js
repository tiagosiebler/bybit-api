"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WS_ERROR_ENUM = exports.PUBLIC_WS_KEYS = exports.WS_AUTH_ON_CONNECT_KEYS = exports.WS_KEY_MAP = exports.WS_BASE_URL_MAP = void 0;
exports.isPrivateWsTopic = isPrivateWsTopic;
exports.getWsKeyForTopic = getWsKeyForTopic;
exports.getWsUrl = getWsUrl;
exports.getMaxTopicsPerSubscribeEvent = getMaxTopicsPerSubscribeEvent;
exports.getUsdcWsKeyForTopic = getUsdcWsKeyForTopic;
exports.neverGuard = neverGuard;
exports.safeTerminateWs = safeTerminateWs;
exports.WS_BASE_URL_MAP = {
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
            livenet: 'wss://stream.zoomex.com/realtime_public',
            livenet2: 'wss://stream.bytick.com/realtime_public',
            testnet: 'wss://stream-testnet.zoomex.com/realtime_public',
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
    v5SpotPublic: {
        public: {
            livenet: 'wss://stream.bybit.com/v5/public/spot',
            testnet: 'wss://stream-testnet.bybit.com/v5/public/spot',
        },
    },
    v5LinearPublic: {
        public: {
            livenet: 'wss://stream.zoomex.com/v3/public/linear',
            testnet: 'wss://stream-testnet.zoomex.com/v3/public/linear',
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
};
exports.WS_KEY_MAP = {
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
};
exports.WS_AUTH_ON_CONNECT_KEYS = [
    exports.WS_KEY_MAP.spotV3Private,
    exports.WS_KEY_MAP.usdcOptionPrivate,
    exports.WS_KEY_MAP.usdcPerpPrivate,
    exports.WS_KEY_MAP.unifiedPrivate,
    exports.WS_KEY_MAP.contractUSDTPrivate,
    exports.WS_KEY_MAP.contractInversePrivate,
    exports.WS_KEY_MAP.v5Private,
];
exports.PUBLIC_WS_KEYS = [
    exports.WS_KEY_MAP.linearPublic,
    exports.WS_KEY_MAP.spotPublic,
    exports.WS_KEY_MAP.spotV3Public,
    exports.WS_KEY_MAP.usdcOptionPublic,
    exports.WS_KEY_MAP.usdcPerpPublic,
    exports.WS_KEY_MAP.unifiedOptionPublic,
    exports.WS_KEY_MAP.unifiedPerpUSDTPublic,
    exports.WS_KEY_MAP.unifiedPerpUSDCPublic,
    exports.WS_KEY_MAP.contractUSDTPublic,
    exports.WS_KEY_MAP.contractInversePublic,
    exports.WS_KEY_MAP.v5SpotPublic,
    exports.WS_KEY_MAP.v5LinearPublic,
    exports.WS_KEY_MAP.v5InversePublic,
    exports.WS_KEY_MAP.v5OptionPublic,
];
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
function isPrivateWsTopic(topic) {
    return PRIVATE_TOPICS.includes(topic);
}
function getWsKeyForTopic(market, topic, isPrivate, category) {
    const isPrivateTopic = isPrivate === true || PRIVATE_TOPICS.includes(topic);
    switch (market) {
        case 'inverse': {
            return exports.WS_KEY_MAP.inverse;
        }
        case 'linear': {
            return isPrivateTopic
                ? exports.WS_KEY_MAP.linearPrivate
                : exports.WS_KEY_MAP.linearPublic;
        }
        case 'spot': {
            return isPrivateTopic ? exports.WS_KEY_MAP.spotPrivate : exports.WS_KEY_MAP.spotPublic;
        }
        case 'spotv3': {
            return isPrivateTopic
                ? exports.WS_KEY_MAP.spotV3Private
                : exports.WS_KEY_MAP.spotV3Public;
        }
        case 'usdcOption': {
            return isPrivateTopic
                ? exports.WS_KEY_MAP.usdcOptionPrivate
                : exports.WS_KEY_MAP.usdcOptionPublic;
        }
        case 'usdcPerp': {
            return isPrivateTopic
                ? exports.WS_KEY_MAP.usdcPerpPrivate
                : exports.WS_KEY_MAP.usdcPerpPublic;
        }
        case 'unifiedOption': {
            return isPrivateTopic
                ? exports.WS_KEY_MAP.unifiedPrivate
                : exports.WS_KEY_MAP.unifiedOptionPublic;
        }
        case 'unifiedPerp': {
            if (isPrivateTopic) {
                return exports.WS_KEY_MAP.unifiedPrivate;
            }
            const upperTopic = topic.toUpperCase();
            if (upperTopic.indexOf('USDT') !== -1) {
                return exports.WS_KEY_MAP.unifiedPerpUSDTPublic;
            }
            if (upperTopic.indexOf('USDC') !== -1 ||
                upperTopic.indexOf('PERP') !== -1) {
                return exports.WS_KEY_MAP.unifiedPerpUSDCPublic;
            }
            throw new Error(`Failed to determine wskey for unified perps topic: "${topic}"`);
        }
        case 'contractInverse': {
            return isPrivateTopic
                ? exports.WS_KEY_MAP.contractInversePrivate
                : exports.WS_KEY_MAP.contractInversePublic;
        }
        case 'contractUSDT': {
            return isPrivateTopic
                ? exports.WS_KEY_MAP.contractUSDTPrivate
                : exports.WS_KEY_MAP.contractUSDTPublic;
        }
        case 'v5': {
            if (isPrivateTopic) {
                return exports.WS_KEY_MAP.v5Private;
            }
            switch (category) {
                case 'spot': {
                    return exports.WS_KEY_MAP.v5SpotPublic;
                }
                case 'linear': {
                    return exports.WS_KEY_MAP.v5LinearPublic;
                }
                case 'inverse': {
                    return exports.WS_KEY_MAP.v5InversePublic;
                }
                case 'option': {
                    return exports.WS_KEY_MAP.v5OptionPublic;
                }
                case undefined: {
                    throw new Error('Category cannot be undefined');
                }
                default: {
                    throw neverGuard(category, 'getWsKeyForTopic(v5): Unhandled v5 category');
                }
            }
        }
        default: {
            throw neverGuard(market, 'getWsKeyForTopic(): Unhandled market');
        }
    }
}
function getWsUrl(wsKey, wsClientOptions, logger) {
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
        case exports.WS_KEY_MAP.linearPublic: {
            return exports.WS_BASE_URL_MAP.linear.public[networkKey];
        }
        case exports.WS_KEY_MAP.linearPrivate: {
            return exports.WS_BASE_URL_MAP.linear.private[networkKey];
        }
        case exports.WS_KEY_MAP.spotPublic: {
            return exports.WS_BASE_URL_MAP.spot.public[networkKey];
        }
        case exports.WS_KEY_MAP.spotPrivate: {
            return exports.WS_BASE_URL_MAP.spot.private[networkKey];
        }
        case exports.WS_KEY_MAP.spotV3Public: {
            return exports.WS_BASE_URL_MAP.spotv3.public[networkKey];
        }
        case exports.WS_KEY_MAP.spotV3Private: {
            return exports.WS_BASE_URL_MAP.spotv3.private[networkKey];
        }
        case exports.WS_KEY_MAP.inverse: {
            // private and public are on the same WS connection
            return exports.WS_BASE_URL_MAP.inverse.public[networkKey];
        }
        case exports.WS_KEY_MAP.usdcOptionPublic: {
            return exports.WS_BASE_URL_MAP.usdcOption.public[networkKey];
        }
        case exports.WS_KEY_MAP.usdcOptionPrivate: {
            return exports.WS_BASE_URL_MAP.usdcOption.private[networkKey];
        }
        case exports.WS_KEY_MAP.usdcPerpPublic: {
            return exports.WS_BASE_URL_MAP.usdcPerp.public[networkKey];
        }
        case exports.WS_KEY_MAP.usdcPerpPrivate: {
            return exports.WS_BASE_URL_MAP.usdcPerp.private[networkKey];
        }
        case exports.WS_KEY_MAP.unifiedOptionPublic: {
            return exports.WS_BASE_URL_MAP.unifiedOption.public[networkKey];
        }
        case exports.WS_KEY_MAP.unifiedPerpUSDTPublic: {
            return exports.WS_BASE_URL_MAP.unifiedPerpUSDT.public[networkKey];
        }
        case exports.WS_KEY_MAP.unifiedPerpUSDCPublic: {
            return exports.WS_BASE_URL_MAP.unifiedPerpUSDC.public[networkKey];
        }
        case exports.WS_KEY_MAP.unifiedPrivate: {
            return exports.WS_BASE_URL_MAP.unifiedPerp.private[networkKey];
        }
        case exports.WS_KEY_MAP.contractInversePrivate: {
            return exports.WS_BASE_URL_MAP.contractInverse.private[networkKey];
        }
        case exports.WS_KEY_MAP.contractInversePublic: {
            return exports.WS_BASE_URL_MAP.contractInverse.public[networkKey];
        }
        case exports.WS_KEY_MAP.contractUSDTPrivate: {
            return exports.WS_BASE_URL_MAP.contractUSDT.private[networkKey];
        }
        case exports.WS_KEY_MAP.contractUSDTPublic: {
            return exports.WS_BASE_URL_MAP.contractUSDT.public[networkKey];
        }
        case exports.WS_KEY_MAP.v5Private: {
            return exports.WS_BASE_URL_MAP.v5.private[networkKey];
        }
        case exports.WS_KEY_MAP.v5SpotPublic: {
            return exports.WS_BASE_URL_MAP.v5SpotPublic.public[networkKey];
        }
        case exports.WS_KEY_MAP.v5LinearPublic: {
            return exports.WS_BASE_URL_MAP.v5LinearPublic.public[networkKey];
        }
        case exports.WS_KEY_MAP.v5InversePublic: {
            return exports.WS_BASE_URL_MAP.v5InversePublic.public[networkKey];
        }
        case exports.WS_KEY_MAP.v5OptionPublic: {
            return exports.WS_BASE_URL_MAP.v5OptionPublic.public[networkKey];
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
function getMaxTopicsPerSubscribeEvent(market, wsKey) {
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
            if (wsKey === exports.WS_KEY_MAP.v5SpotPublic) {
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
function getUsdcWsKeyForTopic(topic, subGroup) {
    const isPrivateTopic = PRIVATE_TOPICS.includes(topic);
    if (subGroup === 'option') {
        return isPrivateTopic
            ? exports.WS_KEY_MAP.usdcOptionPrivate
            : exports.WS_KEY_MAP.usdcOptionPublic;
    }
    return isPrivateTopic
        ? exports.WS_KEY_MAP.usdcOptionPrivate
        : exports.WS_KEY_MAP.usdcOptionPublic;
    // return isPrivateTopic
    //   ? WS_KEY_MAP.usdcPerpPrivate
    //   : WS_KEY_MAP.usdcPerpPublic;
}
exports.WS_ERROR_ENUM = {
    NOT_AUTHENTICATED_SPOT_V3: '-1004',
    API_ERROR_GENERIC: '10001',
    API_SIGN_AUTH_FAILED: '10003',
    USDC_OPTION_AUTH_FAILED: '3303006',
};
function neverGuard(x, msg) {
    return new Error(`Unhandled value exception "x", ${msg}`);
}
/**
 * #305: ws.terminate() is undefined in browsers.
 * This only works in node.js, not in browsers.
 * Does nothing if `ws` is undefined.
 */
function safeTerminateWs(ws) {
    // #305: ws.terminate() undefined in browsers
    if (ws && typeof ws['terminate'] === 'function') {
        ws.terminate();
    }
}
//# sourceMappingURL=websocket-util.js.map