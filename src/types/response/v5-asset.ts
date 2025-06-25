import { AccountTypeV5, OrderSideV5, WithdrawalTypeV5 } from '../shared-v5';

export interface CoinExchangeRecordV5 {
  fromCoin: string;
  fromAmount: string;
  toCoin: string;
  toAmount: string;
  exchangeRate: string;
  createdTime: string;
  exchangeTxId: string;
}

export interface DeliveryRecordV5 {
  deliveryTime: number;
  symbol: string;
  side: OrderSideV5;
  position: string;
  deliveryPrice: string;
  strike: string;
  fee: string;
  deliveryRpl: string;
  entryPrice: string;
}

export interface SettlementRecordV5 {
  symbol: string;
  side: string;
  size: number;
  sessionAvgPrice: string;
  markPrice: string;
  realisedPnl: string;
  createdTime: string;
}

export interface AssetInfoAssetV5 {
  coin: string;
  frozen: string;
  free: string;
  withdraw: string;
}

export interface AssetInfoV5 {
  status: 'ACCOUNT_STATUS_NORMAL' | 'ACCOUNT_STATUS_UNSPECIFIED';
  assets: AssetInfoAssetV5[];
}

export interface CoinBalanceV5 {
  coin: string;
  walletBalance: string;
  transferBalance: string;
  bonus?: string;
}

export interface AllCoinsBalanceV5 {
  accountType: AccountTypeV5;
  memberId?: string;
  balance: CoinBalanceV5[];
}

export interface AccountCoinBalanceV5 {
  accountType: AccountTypeV5;
  bizType: number;
  accountId: string;
  memberId: string;
  balance: {
    coin: string;
    walletBalance: string;
    transferBalance: string;
    bonus: string;
    transferSafeAmount: string;
    ltvTransferSafeAmount: string;
  };
}

export interface InternalTransferRecordV5 {
  transferId: string;
  coin: string;
  amount: string;
  fromAccountType: AccountTypeV5;
  toAccountType: AccountTypeV5;
  timestamp: string;
  status: string;
}

export interface UniversalTransferRecordV5 {
  transferId: string;
  coin: string;
  amount: string;
  fromMemberId: string;
  toMemberId: string;
  fromAccountType: AccountTypeV5;
  toAccountType: AccountTypeV5;
  timestamp: string;
  status: string;
}

export interface AllowedDepositCoinInfoV5 {
  coin: string;
  chain: string;
  coinShowName: string;
  chainType: string;
  blockConfirmNumber: number;
  minDepositAmount: string;
}

export interface DepositRecordV5 {
  id: string;
  coin: string;
  chain: string;
  amount: string;
  txID: string;
  status: number;
  toAddress: string;
  tag: string;
  depositFee: string;
  successAt: string;
  confirmations: string;
  txIndex: string;
  blockHash: string;
  batchReleaseLimit: string;
  depositType: string;
  fromAddress: string;
}

export interface InternalDepositRecordV5 {
  id: string;
  type: 1;
  coin: string;
  amount: string;
  status: 1 | 2 | 3;
  address: string;
  createdTime: string;
  txID: string;
}

export interface DepositAddressChainV5 {
  chainType: string;
  addressDeposit: string;
  tagDeposit: string;
  chain: string;
  batchReleaseLimit: string;
  contractAddress: string;
}

export interface DepositAddressResultV5 {
  coin: string;
  chains: DepositAddressChainV5[];
}

export interface CoinInfoV5 {
  name: string;
  coin: string;
  remainAmount: string;
  chains: {
    chain: string;
    chainType: string;
    confirmation: string;
    withdrawFee: string;
    depositMin: string;
    withdrawMin: string;
    minAccuracy: string;
    chainDeposit: string;
    chainWithdraw: string;
    withdrawPercentageFee: string;
    contractAddress: string;
    safeConfirmNumber: string;
  }[];
}

export interface WithdrawalRecordV5 {
  withdrawId: string;
  txID: string;
  withdrawType: WithdrawalTypeV5;
  coin: string;
  chain: string;
  amount: string;
  withdrawFee: string;
  status: string;
  toAddress: string;
  tag: string;
  createTime: string;
  updateTime: string;
}

export interface WithdrawableAmountV5 {
  limitAmountUsd: string;
  withdrawableAmount: {
    SPOT: {
      coin: string;
      withdrawableAmount: string;
      availableBalance: string;
    };
    FUND: {
      coin: string;
      withdrawableAmount: string;
      availableBalance: string;
    };
  };
}

export interface VaspEntityV5 {
  vaspEntityId: string;
  vaspName: string;
}

export interface ConvertCoinSpecV5 {
  coin: string;
  fullName: string;
  icon: string;
  iconNight: string;
  accuracyLength: number;
  coinType: string;
  balance: string;
  uBalance: string;
  singleFromMinLimit: string;
  singleFromMaxLimit: string;
  disableFrom: boolean;
  disableTo: boolean;
  timePeriod: number;
  singleToMinLimit: string;
  singleToMaxLimit: string;
  dailyFromMinLimit: string;
  dailyFromMaxLimit: string;
  dailyToMinLimit: string;
  dailyToMaxLimit: string;
}

export interface ConvertQuoteV5 {
  quoteTxId: string;
  exchangeRate: string;
  fromCoin: string;
  fromCoinType: string;
  toCoin: string;
  toCoinType: string;
  fromAmount: string;
  toAmount: string;
  expiredTime: string;
  requestId: string;
  extTaxAndFee: string[];
}

export interface ConvertStatusV5 {
  accountType: string;
  exchangeTxId: string;
  userId: string;
  fromCoin: string;
  fromCoinType: string;
  toCoin: string;
  toCoinType: string;
  fromAmount: string;
  toAmount: string;
  exchangeStatus: 'init' | 'processing' | 'success' | 'failure';
  extInfo: { paramType: string; paramValue: string };
  convertRate: string;
  createdAt: string;
}

export interface ConvertHistoryRecordV5 {
  accountType: string;
  exchangeTxId: string;
  userId: string;
  fromCoin: string;
  fromCoinType: string;
  toCoin: string;
  toCoinType: string;
  fromAmount: string;
  toAmount: string;
  exchangeStatus: 'init' | 'processing' | 'success' | 'failure';
  extInfo: { paramType: string; paramValue: string };
  convertRate: string;
  createdAt: string;
}
