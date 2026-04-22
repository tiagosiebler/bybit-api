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

export interface WithdrawalAddressV5 {
  coin: string;
  chain: string;
  address: string;
  tag: string;
  remark: string;
  status: number;
  addressType: number;
  verified: number;
  createdAt: string;
}

export interface WithdrawableAccountSliceV5 {
  coin: string;
  withdrawableAmount: string;
  availableBalance: string;
}

/**
 * GET /v5/asset/withdraw/withdrawable-amount. Only keys with data are returned
 * (e.g. UTA, FUND, EARN; EARN when the coin can be withdrawn from Earn; SPOT if present).
 */
export interface WithdrawableAmountV5 {
  limitAmountUsd: string;
  withdrawableAmount: {
    SPOT?: WithdrawableAccountSliceV5;
    FUND?: WithdrawableAccountSliceV5;
    UTA?: WithdrawableAccountSliceV5;
    EARN?: WithdrawableAccountSliceV5;
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

export interface SmallBalanceCoinV5 {
  fromCoin: string; // Source currency
  supportConvert: 1 | 2; // 1: support, 2: not supported
  availableBalance: string; // Available balance
  baseValue: string; // USDT equivalent value
  toAmount: string; // Reserved field
  exchangeRate: string; // Reserved field
  feeInfo: null; // Reserved field
  taxFeeInfo: null; // Reserved field
}

export interface SmallBalanceListV5 {
  smallAssetCoins: SmallBalanceCoinV5[]; // Small balance info
  supportToCoins: string[]; // Supported target coins (e.g., ["MNT","USDT","USDC"])
}

export interface FiatCoinInfoV5 {
  coin: string; // Fiat coin code
  fullName: string; // Fiat full coin name
  icon: string; // Coin icon url
  iconNight: string; // Coin icon url (dark mode)
  precision: number; // Fiat precision
  disable: boolean; // true: the coin is disabled, false: the coin is allowed
  singleFromMinLimit: string; // For buy side, minimum amount of fiatCoin per transaction
  singleFromMaxLimit: string; // For buy side, maximum amount of fiatCoin per transaction
}

export interface CryptoCoinInfoV5 {
  coin: string; // Crypto coin code
  fullName: string; // Crypto full coin name
  icon: string; // Coin icon url
  iconNight: string; // Coin icon url (dark mode)
  precision: number; // Crypto precision
  disable: boolean; // true: the coin is disabled, false: the coin is allowed
  singleFromMinLimit: string; // For sell side, minimum amount of cryptoCoin per transaction
  singleFromMaxLimit: string; // For sell side, maximum amount of cryptoCoin per transaction
}

export interface FiatTradingPairListV5 {
  fiats: FiatCoinInfoV5[]; // Fiat coin list
  cryptos: CryptoCoinInfoV5[]; // Crypto coin list
}

export interface FundingAccountTransactionRecordV5 {
  memberId: string;
  currency: string;
  ioDirection: string;
  txnAmt: string;
  afterAmt: string;
  createTime: string;
  showBusiType: string;
  showBusiTypeEn: string;
  description: string;
  descriptionEn: string;
}

/** When accountType=Alpha and category is farm, under `coinDetail` in sub-categories. */
export interface AssetOverviewCoinExtMapV5 {
  priceUpper?: string;
  priceLower?: string;
  equityUnit?: string;
}

export interface AssetOverviewCoinDetailV5 {
  coin: string;
  equity: string;
  extMap?: AssetOverviewCoinExtMapV5;
}

export interface AssetOverviewCategoryV5 {
  category: string;
  equity: string;
  coinDetail: AssetOverviewCoinDetailV5[];
}

export interface AssetOverviewAccountItemV5 {
  accountType: string;
  totalEquity: string;
  valuationCurrency: string;
  snapshotTime: string;
  coinDetail?: AssetOverviewCoinDetailV5[];
  categories?: AssetOverviewCategoryV5[];
}

export interface AssetOverviewResultV5 {
  totalEquity: string;
  list: AssetOverviewAccountItemV5[];
}

// --- GET /v5/asset/portfolio-margin (portfolio margin P&L ranges) ---

export interface PortfolioMarginWalletV5 {
  equity: string;
  cashBalance: string;
  marginBalance: string;
  availableBalance: string;
  accountIM: string;
  accountMM: string;
  accountMMRate: string;
  accountIMRate: string;
}

export interface PortfolioMarginPnlRangePointV5 {
  priceScale: string;
  pnls: string[];
}

export interface PortfolioMarginContractBucketPnlV5 {
  pnlRanges: PortfolioMarginPnlRangePointV5[];
}

export interface PortfolioMarginTotalPnlRangesV5 {
  ALL?: PortfolioMarginContractBucketPnlV5;
  PERPETUAL?: PortfolioMarginContractBucketPnlV5;
  OPTION?: PortfolioMarginContractBucketPnlV5;
}

export interface PortfolioMarginPerpPositionPnlV5 {
  symbolName: string;
  position: string;
  pnlRanges: PortfolioMarginPnlRangePointV5[];
  sessionAvgPrice: string;
  markPrice: string;
  orderSize: string;
  contractType: number;
  settleCoin: string;
  symbolAlias?: string;
}

export interface PortfolioMarginOptionPositionPnlV5 {
  symbolName: string;
  position: string;
  pnlRanges: PortfolioMarginPnlRangePointV5[];
  sessionAvgPrice: string;
  markPrice: string;
  orderSize: string;
  contractType: number;
  settleCoin: string;
}

export interface PortfolioMarginOptionExpiryPnlV5 {
  expiryDateRepresentation: string;
  pnlRanges: PortfolioMarginPnlRangePointV5[];
  optionPositionPnlRanges: PortfolioMarginOptionPositionPnlV5[];
}

export interface PortfolioMarginContingencyV5 {
  optionContingency: string;
  futureDeltaContingency: string;
  optionVegaContingency: string;
  contingencyComponents: string;
  usdtUsdcContingency: string;
  futureContingency: string;
}

export interface PortfolioMarginAssetBlockV5 {
  coin: string;
  assetIM: string;
  assetMM: string;
}

export interface PortfolioMarginSpotHedgeInfoV5 {
  hedgeSpotSize: string;
  walletBalance: string;
  usdIndexPrice: string;
  pnlRanges: PortfolioMarginPnlRangePointV5[];
}

export interface PortfolioMarginByBaseCoinV5 {
  baseCoin: string;
  totalPnlRanges: PortfolioMarginTotalPnlRangesV5;
  perpPositionPnlRanges: PortfolioMarginPerpPositionPnlV5[];
  optionExpiryDatePnlRanges: PortfolioMarginOptionExpiryPnlV5[];
  contingency: PortfolioMarginContingencyV5;
  asset: PortfolioMarginAssetBlockV5;
  maxLossPriceMove: string;
  maxLossIvShock: string;
  totalClosePzFee: string;
  spotHedgeInfo: PortfolioMarginSpotHedgeInfoV5;
  maxLossIvShockList: string[];
}

export interface PortfolioMarginInfoResultV5 {
  wallet: PortfolioMarginWalletV5;
  assetPnlRange: PortfolioMarginByBaseCoinV5[];
}

// --- GET /v5/asset/total-members-assets ---

export interface TotalMembersAccountBreakdownItemV5 {
  type: string;
  origb: string;
  quoteb: string;
  stat: number;
}

export interface TotalMembersMemberEntryV5 {
  uid: number;
  isM?: boolean;
  type?: number;
  stat: number;
  origb: string;
  quoteb?: string;
  items: TotalMembersAccountBreakdownItemV5[];
}

export interface TotalMembersAssetsResultV5 {
  total: string;
  quoteTotal: string;
  stat: number;
  list: TotalMembersMemberEntryV5[];
}
