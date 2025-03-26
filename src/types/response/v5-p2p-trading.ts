import { P2PTradingPreferenceSetV5 } from '../request/v5-p2p-trading';

export interface P2PCoinBalanceV5 {
  coin: string;
  transferBalance: string;
  walletBalance: string;
  bonus: string;
}

export interface P2PAccountCoinsBalanceV5 {
  memberId: string;
  accountType: string;
  balance: P2PCoinBalanceV5[];
}

export interface P2POnlineAdV5 {
  id: string;
  nickName: string;
  tokenId: string;
  currencyId: string;
  side: string;
  price: string;
  lastQuantity: string;
  minAmount: string;
  maxAmount: string;
  payments: string[];
  recentOrderNum: number;
  recentExecuteRate: number;
  isOnline: boolean;
  authTag: string[];
  paymentPeriod: number;
  accountId: number;
  userId: number;
  priceType: number;
  premium: string;
  quantity: string;
  frozenQuantity: string;
  executedQuantity: string;
  remark: string;
  status: number;
  createDate: string;
  orderNum: string;
  finishNum: string;
  fee: string;
  lastLogoutTime: string;
  blocked: string;
  makerContact: boolean;
  symbolInfo: {
    id: string;
    exchangeId: string;
    orgId: string;
    tokenId: string;
    currencyId: string;
    status: string;
    lowerLimitAlarm: number;
    upperLimitAlarm: number;
    itemDownRange: string;
    itemUpRange: string;
    currencyMinQuote: string;
    currencyMaxQuote: string;
    currencyLowerMaxQuote: string;
    tokenMinQuote: string;
    tokenMaxQuote: string;
    kycCurrencyLimit: string;
    itemSideLimit: string;
    buyFeeRate: string;
    sellFeeRate: string;
    orderAutoCancelMinute: number;
    orderFinishMinute: number;
    tradeSide: number;
    currency: {
      id: string;
      exchangeId: string;
      orgId: string;
      currencyId: string;
      scale: number;
    };
    token: {
      id: string;
      exchangeId: string;
      orgId: string;
      tokenId: string;
      scale: number;
      sequence: number;
    };
    buyAd: number;
    sellAd: number;
  };
  tradingPreferenceSet: {
    hasUnPostAd: number;
    isKyc: number;
    isEmail: number;
    isMobile: number;
    hasRegisterTime: number;
    registerTimeThreshold: number;
    orderFinishNumberDay30: number;
    completeRateDay30: number;
    nationalLimit: number;
    hasOrderFinishNumberDay30: number;
    hasCompleteRateDay30: number;
    hasNationalLimit: number;
  };
  version: number;
  authStatus: number;
  recommend: boolean;
  recommendTag: string;
  userType: string;
  itemType: string;
}

export interface P2POnlineAdsResponseV5 {
  count: number;
  items: P2POnlineAdV5[];
}

export interface P2PCreateAdResponseV5 {
  itemId: string;
  securityRiskToken: string;
  riskTokenType: string;
  riskVersion: string;
  needSecurityRisk: boolean;
}

export interface P2PPaymentTermV5 {
  id: string;
  realName: string;
  paymentType: number;
  bankName: string;
  branchName: string;
  accountNo: string;
  qrcode: string;
  visible: number;
  payMessage: string;
  firstName: string;
  lastName: string;
  secondLastName: string;
  clabe: string;
  debitCardNumber: string;
  mobile: string;
  businessName: string;
  concept: string;
  paymentExt1: string;
  paymentExt2: string;
  paymentExt3: string;
  paymentExt4: string;
  paymentExt5: string;
  paymentExt6: string;
  paymentTemplateVersion: number;
  paymentConfig: {
    paymentType: number;
    paymentName: string;
    paymentDialect: string;
  };
  realNameVerified: boolean;
}

export interface P2PAdDetailV5 {
  id: string;
  accountId: string;
  userId: string;
  nickName: string;
  tokenId: string;
  tokenName: string;
  currencyId: string;
  side: number;
  priceType: number;
  price: string;
  premium: string;
  lastQuantity: string;
  quantity: string;
  frozenQuantity: string;
  executedQuantity: string;
  minAmount: string;
  maxAmount: string;
  remark: string;
  status: number;
  createDate: string;
  payments: string[];
  orderNum: number;
  finishNum: number;
  recentOrderNum: number;
  recentExecuteRate: number;
  fee: string;
  isOnline: boolean;
  lastLogoutTime: string;
  symbolInfo: {
    id: string;
    exchangeId: string;
    orgId: string;
    tokenId: string;
    currencyId: string;
    status: number;
    lowerLimitAlarm: number;
    upperLimitAlarm: number;
    itemDownRange: string;
    itemUpRange: string;
    currencyMinQuote: string;
    currencyMaxQuote: string;
    currencyLowerMaxQuote: string;
    tokenMinQuote: string;
    tokenMaxQuote: string;
    kycCurrencyLimit: string;
    itemSideLimit: number;
    buyFeeRate: string;
    sellFeeRate: string;
    orderAutoCancelMinute: number;
    orderFinishMinute: number;
    tradeSide: number;
    currency: {
      id: string;
      exchangeId: string;
      orgId: string;
      currencyId: string;
      scale: number;
    };
    token: {
      id: string;
      exchangeId: string;
      orgId: string;
      tokenId: string;
      scale: number;
      sequence: number;
    };
    buyAd: {
      paymentPeriods: number[];
    };
    sellAd: {
      paymentPeriods: number[];
    };
  };
  tradingPreferenceSet: P2PTradingPreferenceSetV5;
  paymentTerms: P2PPaymentTermV5[];
  version: number;
  updateDate: string;
  feeRate: string;
  paymentPeriod: number;
  itemType: string;
}

export interface P2PPersonalAdsResponseV5 {
  count: number;
  items: P2PAdDetailV5[];
  hiddenFlag: boolean;
}

export interface P2POrderExtensionV5 {
  isDelayWithdraw: boolean;
  delayTime: string;
  startTime: string;
}

export interface P2POrderV5 {
  id: string;
  side: number;
  tokenId: string;
  orderType: string;
  amount: string;
  currencyId: string;
  price: string;
  notifyTokenQuantity?: string;
  notifyTokenId?: string;
  fee: string;
  targetNickName: string;
  targetUserId: string;
  status: number;
  selfUnreadMsgCount: string;
  createDate: string;
  transferLastSeconds: string;
  appealLastSeconds: string;
  userId: string;
  sellerRealName: string;
  buyerRealName: string;
  judgeInfo: {
    autoJudgeUnlockTime: string;
    dissentResult: string;
    preDissent: string;
    postDissent: string;
  };
  unreadMsgCount: string;
  extension: P2POrderExtensionV5;
  bulkOrderFlag: boolean;
}

export interface P2POrdersResponseV5 {
  count: number;
  items: P2POrderV5[];
}

export interface P2PPaymentConfigItemV5 {
  view: boolean;
  name: string;
  label: string;
  placeholder: string;
  type: string;
  maxLength: string;
  required: boolean;
}

export interface P2PPaymentConfigV5 {
  paymentType: string;
  checkType: number;
  sort: number;
  paymentName: string;
  addTips: string;
  itemTips: string;
  online: number;
  items: P2PPaymentConfigItemV5[];
}

export interface P2PPaymentTermDetailV5 {
  id: string;
  realName: string;
  paymentType: number;
  bankName: string;
  branchName: string;
  accountNo: string;
  qrcode: string;
  visible: number;
  payMessage: string;
  firstName: string;
  lastName: string;
  secondLastName: string;
  clabe: string;
  debitCardNumber: string;
  mobile: string;
  businessName: string;
  concept: string;
  online: string;
  paymentExt1: string;
  paymentExt2: string;
  paymentExt3: string;
  paymentExt4: string;
  paymentExt5: string;
  paymentExt6: string;
  paymentTemplateVersion: number;
  paymentConfigVo: P2PPaymentConfigV5;
  ruPaymentPrompt: boolean;
}

export interface P2PAppraiseInfoV5 {
  anonymous: string;
  appraiseContent: string;
  appraiseId: string;
  appraiseType: string;
  modifyFlag: string;
  updateDate: string;
}

export interface P2PJudgeInfoV5 {
  autoJudgeUnlockTime: string;
  dissentResult: string;
  preDissent: string;
  postDissent: string;
}

export interface P2POrderDetailV5 {
  id: string;
  side: number;
  itemId: string;
  accountId: string;
  userId: string;
  nickName: string;
  makerUserId: string;
  targetAccountId: string;
  targetUserId: string;
  targetNickName: string;
  targetFirstName: string;
  targetSecondName: string;
  targetUserAuthStatus: number;
  targetConnectInformation: string;
  payerRealName: string;
  sellerRealName: string;
  buyerRealName: string;
  tokenId: string;
  tokenName: string;
  currencyId: string;
  price: string;
  quantity: string;
  amount: string;
  payCode: string;
  paymentType: number;
  transferDate: string;
  status: number;
  createDate: string;
  paymentTermList: P2PPaymentTermDetailV5[];
  remark: string;
  transferLastSeconds: string;
  recentOrderNum: number;
  recentExecuteRate: number;
  appealLastSeconds: string;
  appealContent: string;
  appealType: number;
  appealNickName: string;
  canAppeal: string;
  totalAppealTimes: string;
  appealedTimes: string;
  paymentTermResult: P2PPaymentTermDetailV5;
  orderFinishMinute: number;
  confirmedPayTerm: P2PPaymentTermDetailV5;
  makerFee: string;
  takerFee: string;
  fee: string;
  showContact: boolean;
  tokenBalance: string;
  fiatBalance: string;
  unreadMsgCount: string;
  updateDate: string;
  extension: P2POrderExtensionV5;
  selfUnreadMsgCount: string;
  judgeType: string;
  canReport: boolean;
  canReportDisagree: boolean;
  canReportType: string[];
  canReportDisagreeType: string[];
  appraiseStatus: string;
  appraiseInfo: P2PAppraiseInfoV5;
  canReportDisagreeTypes: string[];
  canReportTypes: string[];
  orderType: string;
  middleToken: string;
  beforePrice: string;
  beforeQuantity: string;
  beforeToken: string;
  alternative: string;
  appealUserId: string;
  notifyTokenId: string;
  notifyTokenQuantity: string;
  cancelResponsible: string;
  chainType: string;
  chainAddress: string;
  tradeHashCode: string;
  estimatedGasFee: string;
  gasFeeTokenId: string;
  tradingFeeTokenId: string;
  onChainInfo: string;
  transactionId: string;
  displayRefund: string;
  chainWithdrawLastSeconds: string;
  chainTransferLastSeconds: string;
  orderSource: string;
  cancelReason: string;
  sellerCancelExamineRemainTime: string;
  needSellerExamineCancel: boolean;
  couponCurrencyAmount: string;
  totalCurrencyAmount: string;
  usedCoupon: boolean;
  couponTokenId: string;
  couponQuantity: string;
  completedOrderAppealCount: number;
  totalCompletedOrderAppealCount: number;
  realOrderStatus: number;
  appealVersion: number;
  judgeInfo: P2PJudgeInfoV5;
  helpType: string;
  appealFlowStatus: string;
  appealSubStatus: string;
  bulkOrderFlag: boolean;
  targetUserType: string;
  targetUserDisplays: string[];
  appealProcessChangeFlag: boolean;
  appealNegotiationNode: number;
}

export interface P2POrderMessageV5 {
  id: string;
  message: string;
  userId: string;
  msgType: number;
  msgCode: number;
  createDate: string;
  contentType: string;
  orderId: string;
  msgUuid: string;
  nickName: string;
  fileName: string;
  accountId: string;
  isRead: number;
  read: number;
  roleType: string;
  onlyForCustomer: number;
}

export interface P2PUserInfoV5 {
  nickName: string;
  defaultNickName: boolean;
  isOnline: boolean;
  kycLevel: string;
  email: string;
  mobile: string;
  lastLogoutTime: string;
  recentRate: string;
  totalFinishCount: number;
  totalFinishSellCount: number;
  totalFinishBuyCount: number;
  recentFinishCount: number;
  averageReleaseTime: string;
  averageTransferTime: string;
  accountCreateDays: number;
  firstTradeDays: number;
  realName: string;
  recentTradeAmount: string;
  totalTradeAmount: string;
  registerTime: string;
  authStatus: number;
  kycCountryCode: string;
  blocked: string;
  goodAppraiseRate: string;
  goodAppraiseCount: number;
  badAppraiseCount: number;
  accountId: number;
  paymentCount: number;
  contactCount: number;
  vipLevel: number;
  userCancelCountLimit: number;
  paymentRealNameUneditable: boolean;
  userId: string;
  realNameEn: string;
}

export interface P2PCounterpartyUserInfoV5 {
  nickName: string;
  defaultNickName: boolean;
  whiteFlag: number;
  contactConfig: boolean;
  isOnline: boolean;
  email: string;
  mobile: string;
  kycLevel: number;
  lastLogoutTime: string;
  recentRate: number;
  totalFinishCount: number;
  totalFinishSellCount: number;
  totalFinishBuyCount: number;
  recentFinishCount: number;
  averageReleaseTime: string;
  averageTransferTime: string;
  accountCreateDays: number;
  firstTradeDays: number;
  realName: string;
  recentTradeAmount: string;
  totalTradeAmount: string;
  executeNum: number;
  orderNum: number;
  hasUnPostAd: number;
  registerTime: string;
  authStatus: number;
  kycCountryCode: string;
  blocked: string;
  goodAppraiseRate: string;
  goodAppraiseCount: number;
  badAppraiseCount: number;
  accountId: string;
  paymentCount: number;
  contactCount: number;
  realNameMask: string;
  vipLevel: number;
  vipProfit: [];
  userTag: [];
  userCancelCountLimit: number;
  paymentRealNameUneditable: boolean;
  lostRoleAffected: boolean;
  userCurPrivilege: string[];
  userType: string;
  userId: string;
  realNameEn: string;
  canSubOnline: boolean;
  curPrivilegeInfo: [];
  openApiSwitch: number;
}

export interface P2PUserPaymentV5 {
  id: string;
  realName: string;
  paymentType: string;
  bankName: string;
  branchName: string;
  accountNo: string;
  qrcode: string;
  visible: number;
  payMessage: string;
  firstName: string;
  lastName: string;
  secondLastName: string;
  clabe: string;
  debitCardNumber: string;
  mobile: string;
  businessName: string;
  concept: string;
  online: string;
  countNo: string;
  paymentExt1: string;
  paymentExt2: string;
  paymentExt3: string;
  paymentExt4: string;
  paymentExt5: string;
  paymentExt6: string;
  paymentTemplateVersion: number;
  hasPaymentTemplateChanged: boolean;
  paymentConfigVo: P2PPaymentConfigV5;
  realNameVerified: boolean;
  channel: string;
  currencyBalance: string[];
}
