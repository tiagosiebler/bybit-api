"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeParams = exports.signMessage = void 0;
const crypto_1 = require("crypto");
function signMessage(message, secret) {
    return crypto_1.createHmac('sha256', secret)
        .update(message)
        .digest('hex');
}
exports.signMessage = signMessage;
;
function serializeParams(params = {}, strict_validation = false) {
    return Object.keys(params)
        .sort()
        .map(key => {
        const value = params[key];
        if (strict_validation === true && typeof value === 'undefined') {
            throw new Error('Failed to sign API request due to undefined parameter');
        }
        return `${key}=${value}`;
    })
        .join('&');
}
exports.serializeParams = serializeParams;
;
//# sourceMappingURL=requestUtils.js.map