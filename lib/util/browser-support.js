"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signMessage = signMessage;
function signMessage(message, secret) {
    return __awaiter(this, void 0, void 0, function* () {
        const encoder = new TextEncoder();
        // eslint-disable-next-line no-undef
        const key = yield window.crypto.subtle.importKey('raw', encoder.encode(secret), { name: 'HMAC', hash: { name: 'SHA-256' } }, false, ['sign']);
        // eslint-disable-next-line no-undef
        const signature = yield window.crypto.subtle.sign('HMAC', key, encoder.encode(message));
        return Array.prototype.map
            .call(new Uint8Array(signature), (x) => ('00' + x.toString(16)).slice(-2))
            .join('');
    });
}
//# sourceMappingURL=browser-support.js.map