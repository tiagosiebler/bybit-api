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
const crypto_1 = require("crypto");
/** This is async because the browser version uses a promise (browser-support) */
function signMessage(message, secret) {
    return __awaiter(this, void 0, void 0, function* () {
        return (0, crypto_1.createHmac)('sha256', secret).update(message).digest('hex');
    });
}
//# sourceMappingURL=node-support.js.map