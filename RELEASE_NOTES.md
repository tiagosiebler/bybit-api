# Release Notes

### New Endpoints

#### Broker – Exchange Broker Rate Limit (2026-02-10)
- **`setBrokerRateLimit()`** – `POST /v5/broker/apilimit/set`  
  Set API rate limit for exchange broker sub accounts. Exchange broker only. 1 req/sec.
- **`getBrokerRateLimitCap()`** – `GET /v5/broker/apilimit/query-cap`  
  Query entity-level rate limit usage and cap. Main UIDs only. 5 req/sec.
- **`getAllBrokerRateLimits()`** – `GET /v5/broker/apilimit/query-all`  
  Query all UID-level rate limits. Master account. 1 req/sec.

#### User (2026-03-03, 2026-03-05)
- **`getFriendReferrals()`** – `GET /v5/user/invitation/referrals`  
  Query friend invitee data. Params: `status`, `size`, `cursor`.
- **`signAgreement()`** – `POST /v5/user/agreement`  
  Sign metals commodity contracts agreement (e.g. XAUUSDT, XAGUSDT Perpetuals). Required before trading these contracts. Master account only; once signed, all subaccounts are eligible. Params: `category: 2`, `agree: true`. Trading without signing returns `code=110123, msg=You must agree to the Trading Terms`.

#### Asset (2026-03-06)
- **`getAssetOverview()`** – `GET /v5/asset/asset-overview`  
  Query master or sub account total assets and detailed holdings across accounts and product categories. Param: `memberId` (required when querying sub account via master key).
- **`getFundingAccountTransactionHistory()`** – `GET /v5/asset/fundinghistory`  
  Transaction log in Funding Account. Params: `createTimeFrom`, `createTimeTo`, `limit`, `cursor`. Time range max 7 days.

### Changes

#### Modify Master API Key (2026-02-10)
- **Breaking:** Removed `ips` from `UpdateApiKeyParamsV5`. Modifying, adding, or deleting IP addresses via API is no longer supported by Bybit.

#### Affiliate (2026-02-04)
- **`AffiliateUserInfoV5`:** Added `tradfiTradeVol30Day`, `tradfiTradeVol365Day`, `commissions30Day`, `commissions365Day`.
- **`AffiliateUserListItemV5`:** Added `tradfiTradeVol`, `tradfiTradeVol30Day`, `tradfiTradeVol365Day`, `commissionsVol`, `commissions30Day`, `commissions365Day`.

### New Examples
- `Broker/set-rate-limit.js`
- `Broker/get-rate-limit-cap.js`
- `Broker/get-all-rate-limits.js`
- `User/get-friend-referrals.js`
- `User/sign-agreement.js`
- `Asset/asset-overview.js`
- `Asset/funding-account-transaction-history.js`
