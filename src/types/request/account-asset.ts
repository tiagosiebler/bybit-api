export type TransferAccountType =
  | 'CONTRACT'
  | 'SPOT'
  | 'INVESTMENT'
  | 'OPTION'
  | 'UNIFIED';

export type TransferType = 'IN' | 'OUT';

export type TransferStatus = 'SUCCESS' | 'PENDING' | 'FAILED';

export type PageDirection = 'Prev' | 'Next';

export interface InternalTransferRequest {
  transfer_id: string;
  coin: string;
  amount: string;
  from_account_type: TransferAccountType;
  to_account_type: TransferAccountType;
}

export interface SubAccountTransferRequest {
  transfer_id: string;
  coin: string;
  amount: string;
  sub_user_id: string;
  type: TransferType;
}

export interface TransferQueryRequest {
  transfer_id?: string;
  coin?: string;
  status?: TransferStatus;
  start_time?: number;
  end_time?: number;
  direction?: PageDirection;
  limit?: number;
  cursor?: string;
}

export interface EnableUniversalTransferRequest {
  /** A comma-separated list of subaccount UIDs, for example "123,45,14,26,46" */
  transferable_sub_ids?: string;
}

export interface UniversalTransferRequest {
  transfer_id: string;
  coin: string;
  amount: string;
  from_member_id: string;
  to_member_id: string;
  from_account_type: TransferAccountType;
  to_account_type: TransferAccountType;
}

export interface SupportedDepositListRequest {
  coin?: string;
  chain?: string;
  page_index?: number;
  page_size?: number;
}

export interface DepositRecordsRequest {
  start_time?: number;
  end_time?: number;
  coin?: string;
  cursor?: string;
  direction?: PageDirection;
  limit?: number;
}

export interface WithdrawalRecordsRequest {
  withdraw_id?: number;
  start_time?: number;
  end_time?: number;
  coin?: string;
  cursor?: string;
  direction?: PageDirection;
  limit?: number;
}

export interface AccountAssetInformationRequest {
  /** Account type. Default value: ACCOUNT_TYPE_SPOT */
  account_type?: string;
  coin?: string;
}

export interface WithdrawalRequest {
  address: string;
  amount: string;
  coin: string;
  chain: string;
  tag?: string;
}
