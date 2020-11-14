import { createHmac } from 'crypto';
export function signMessage(message, secret) {
    return createHmac('sha256', secret)
        .update(message)
        .digest('hex');
}
;
export function serializeParams(params = {}, strict_validation = false) {
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
;
//# sourceMappingURL=requestUtils.js.map