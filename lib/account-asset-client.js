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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountAssetClient = void 0;
const util_1 = require("./util");
const BaseRestClient_1 = __importDefault(require("./util/BaseRestClient"));
/**
 * REST API client for Account Asset APIs
 *
 * @deprecated WARNING: V1/V2 private endpoints (Rest API & Websocket Stream) for mainnet
 * will be switched off gradually from 30 Oct 2023 UTC, so they are not promised a stability.
 * Please note that you are at your own risk of using old endpoints going forward, and please move to V5 ASAP.
 */
class AccountAssetClient extends BaseRestClient_1.default {
    getClientType() {
        return util_1.REST_CLIENT_TYPE_ENUM.accountAsset;
    }
    fetchServerTime() {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.getServerTime();
            return Number(res.time_now);
        });
    }
    /**
     *
     * Transfer Data Endpoints
     *
     */
    createInternalTransfer(params) {
        return this.postPrivate('/asset/v1/private/transfer', params);
    }
    createSubAccountTransfer(params) {
        return this.postPrivate('/asset/v1/private/sub-member/transfer', params);
    }
    getInternalTransfers(params) {
        return this.getPrivate('/asset/v1/private/transfer/list', params);
    }
    getSubAccountTransfers(params) {
        return this.getPrivate('/asset/v1/private/sub-member/transfer/list', params);
    }
    getSubAccounts() {
        return this.getPrivate('/asset/v1/private/sub-member/member-ids');
    }
    enableUniversalTransfer(params) {
        return this.postPrivate('/asset/v1/private/transferable-subs/save', params);
    }
    createUniversalTransfer(params) {
        return this.postPrivate('/asset/v1/private/universal/transfer', params);
    }
    getUniversalTransfers(params) {
        return this.getPrivate('/asset/v1/private/universal/transfer/list', params);
    }
    /**
     *
     * Wallet & Deposit Endpoints
     *
     */
    getSupportedDepositList(params) {
        return this.get('/asset/v1/public/deposit/allowed-deposit-list', params);
    }
    getDepositRecords(params) {
        return this.getPrivate('/asset/v1/private/deposit/record/query', params);
    }
    getWithdrawRecords(params) {
        return this.getPrivate('/asset/v1/private/withdraw/record/query', params);
    }
    getCoinInformation(coin) {
        return this.getPrivate('/asset/v1/private/coin-info/query', { coin });
    }
    getAssetInformation(params) {
        return this.getPrivate('/asset/v1/private/asset-info/query', params);
    }
    submitWithdrawal(params) {
        return this.postPrivate('/asset/v1/private/withdraw', params);
    }
    cancelWithdrawal(withdrawalId) {
        return this.postPrivate('/asset/v1/private/withdraw/cancel', {
            id: withdrawalId,
        });
    }
    getDepositAddress(coin) {
        return this.getPrivate('/asset/v1/private/deposit/address', { coin });
    }
    /**
     *
     * API Data Endpoints
     *
     */
    getServerTime() {
        return this.get('/v2/public/time');
    }
    getApiAnnouncements() {
        return this.get('/v2/public/announcement');
    }
}
exports.AccountAssetClient = AccountAssetClient;
//# sourceMappingURL=account-asset-client.js.map