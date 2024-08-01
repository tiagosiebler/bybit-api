import { AccountTypeV5, CategoryV5 } from '../v5-shared';

export interface GetCoinExchangeRecordParamsV5 {
  fromCoin?: string;
  toCoin?: string;
  limit?: number;
  cursor?: string;
}

export interface GetDeliveryRecordParamsV5 {
  category: CategoryV5;
  symbol?: string;
  expDate?: string;
  limit?: number;
  cursor?: string;
}

export interface GetSettlementRecordParamsV5 {
  category: CategoryV5;
  symbol?: string;
  limit?: number;
  cursor?: string;
}

export interface GetAssetInfoParamsV5 {
  accountType: AccountTypeV5;
  coin?: string;
}

export interface GetAllCoinsBalanceParamsV5 {
  memberId?: string;
  accountType: AccountTypeV5;
  coin?: string;
  withBonus?: number;
}

export interface GetAccountCoinBalanceParamsV5 {
  memberId?: string;
  accountType: AccountTypeV5;
  coin: string;
  withBonus?: number;
  withTransferSafeAmount?: 0 | 1;
}

export interface GetInternalTransferParamsV5 {
  transferId?: string;
  coin?: string;
  status?: string;
  startTime?: number;
  endTime?: number;
  limit?: number;
  cursor?: string;
}

export interface UniversalTransferParamsV5 {
  transferId: string;
  coin: string;
  amount: string;
  fromMemberId: number;
  toMemberId: number;
  fromAccountType: AccountTypeV5;
  toAccountType: AccountTypeV5;
}

export interface GetUniversalTransferRecordsParamsV5 {
  transferId?: string;
  coin?: string;
  status?: string;
  startTime?: number;
  endTime?: number;
  limit?: number;
  cursor?: string;
}

export interface GetAllowedDepositCoinInfoParamsV5 {
  coin?: string;
  chain?: string;
  limit?: number;
  cursor?: string;
}

export interface GetDepositRecordParamsV5 {
  coin?: string;
  startTime?: number;
  endTime?: number;
  limit?: number;
  cursor?: string;
}

export interface GetSubAccountDepositRecordParamsV5 {
  subMemberId: string;
  coin?: string;
  startTime?: number;
  endTime?: number;
  limit?: number;
  cursor?: string;
}

export interface GetInternalDepositRecordParamsV5 {
  startTime?: number;
  endTime?: number;
  coin?: string;
  cursor?: string;
  limit?: number;
}

export interface GetWithdrawalRecordsParamsV5 {
  withdrawID?: string;
  coin?: string;
  withdrawType?: number;
  startTime?: number;
  endTime?: number;
  limit?: number;
  cursor?: string;
}

export interface WithdrawParamsV5 {
  coin: string;
  chain: string;
  address: string;
  tag?: string;
  amount: string;
  timestamp: number;
  forceChain?: number;
  accountType?: 'SPOT' | 'FUND';
  feeType?: 0 | 1;
  requestId?: string;
  beneficiary?: {
    vaspEntityId: string;
    beneficiaryName?: string;
  };
}

export interface ConvertCoinsParamsV5 {
  coin?: string;
  side?: number;
  accountType:
    | 'eb_convert_funding'
    | 'eb_convert_uta'
    | 'eb_convert_spot'
    | 'eb_convert_contract'
    | 'eb_convert_inverse';
}

export interface RequestConvertQuoteParamsV5 {
  fromCoin: string;
  toCoin: string;
  fromCoinType?: string;
  toCoinType?: string;
  requestCoin: string;
  requestAmount: string;
  accountType:
    | 'eb_convert_funding'
    | 'eb_convert_uta'
    | 'eb_convert_spot'
    | 'eb_convert_contract'
    | 'eb_convert_inverse';
  requestId?: string;
}

export interface GetConvertHistoryParamsV5 {
  accountType?: string;
  index?: number;
  limit?: number;
}
