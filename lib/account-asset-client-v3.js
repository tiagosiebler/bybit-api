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
exports.AccountAssetClientV3 = void 0;
const util_1 = require("./util");
const BaseRestClient_1 = __importDefault(require("./util/BaseRestClient"));
/**
 * REST API client for Account Asset V3 APIs
 */
class AccountAssetClientV3 extends BaseRestClient_1.default {
    getClientType() {
        return util_1.REST_CLIENT_TYPE_ENUM.v3;
    }
    fetchServerTime() {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.getServerTime();
            return Number(res.time);
        });
    }
    getServerTime() {
        return this.get('/v3/public/time');
    }
    /**
     *
     * Transfer Data Endpoints
     *
     */
    createInternalTransfer(params) {
        return this.postPrivate('/asset/v3/private/transfer/inter-transfer', params);
    }
    getInternalTransfers(params) {
        return this.getPrivate('/asset/v3/private/transfer/inter-transfer/list/query', params);
    }
    createSubAccountTransfer(params) {
        return this.postPrivate('/asset/v3/private/transfer/sub-member-transfer', params);
    }
    getSubAccountTransfers(params) {
        return this.getPrivate('/asset/v3/private/transfer/sub-member-transfer/list/query', params);
    }
    getSubAccounts() {
        return this.getPrivate('/asset/v3/private/transfer/sub-member/list/query');
    }
    enableUniversalTransfer(params) {
        return this.postPrivate('/asset/v3/private/transfer/transfer-sub-member-save', params);
    }
    createUniversalTransfer(params) {
        return this.postPrivate('/asset/v3/private/transfer/universal-transfer', params);
    }
    getUniversalTransfers(params) {
        return this.getPrivate('/asset/v3/private/transfer/universal-transfer/list/query', params);
    }
    getTransferableCoinList(params) {
        return this.getPrivate('/asset/v3/private/transfer/transfer-coin/list/query', params);
    }
    getAccountCoinBalance(params) {
        return this.getPrivate('/asset/v3/private/transfer/account-coin/balance/query', params);
    }
    getAccountCoinBalances(params) {
        return this.getPrivate('/asset/v3/private/transfer/account-coins/balance/query', params);
    }
    getAssetInfo(params) {
        return this.getPrivate('/asset/v3/private/transfer/asset-info/query', params);
    }
    /**
     *
     * Wallet & Deposit Endpoints
     *
     */
    /** Get Deposit Spec */
    getSupportedDepositList(params) {
        return this.get('/asset/v3/public/deposit/allowed-deposit-list/query', params);
    }
    getDepositRecords(params) {
        return this.getPrivate('/asset/v3/private/deposit/record/query', params);
    }
    getSubDepositRecords(params) {
        return this.getPrivate('/asset/v3/private/deposit/sub-member-record/query', params);
    }
    getWithdrawRecords(params) {
        return this.getPrivate('/asset/v3/private/withdraw/record/query', params);
    }
    getCoinInformation(coin) {
        return this.getPrivate('/asset/v3/private/coin-info/query', { coin });
    }
    submitWithdrawal(params) {
        return this.postPrivate('/asset/v3/private/withdraw/create', params);
    }
    cancelWithdrawal(withdrawalId) {
        return this.postPrivate('/asset/v3/private/withdraw/create', {
            withdrawalId,
        });
    }
    getMasterAccountDepositAddress(params) {
        return this.getPrivate('/asset/v3/private/deposit/address/query', params);
    }
    getSubAccountDepositAddress(params) {
        return this.getPrivate('/asset/v3/private/deposit/sub-member-address/query', params);
    }
    createSubMember(params) {
        return this.postPrivate('/user/v3/private/create-sub-member', params);
    }
    createSubAPIKey(params) {
        return this.postPrivate('/user/v3/private/create-sub-api', params);
    }
    /**
     * Get Sub UID List
     */
    getSubMembers() {
        return this.getPrivate('/user/v3/private/query-sub-members');
    }
    /**
     * Froze Sub UID
     */
    freezeSubMember(subuid, frozenStatus) {
        return this.postPrivate('/user/v3/private/frozen-sub-member', {
            subuid,
            frozen: frozenStatus,
        });
    }
    getAPIKeyInformation() {
        return this.getPrivate('/user/v3/private/query-api');
    }
    modifyMasterAPIKey(params) {
        return this.postPrivate('/user/v3/private/update-api', params);
    }
    modifySubAPIKey(params) {
        return this.postPrivate('/user/v3/private/update-sub-api', params);
    }
    /** WARNING: BE CAREFUL! The API key used to call this interface will be invalid immediately. */
    deleteMasterAPIKey() {
        return this.postPrivate('/user/v3/private/delete-api');
    }
    /** WARNING: BE CAREFUL! The API key used to call this interface will be invalid immediately. */
    deleteSubAPIKey() {
        return this.postPrivate('/user/v3/private/delete-sub-api');
    }
}
exports.AccountAssetClientV3 = AccountAssetClientV3;
//# sourceMappingURL=account-asset-client-v3.js.map