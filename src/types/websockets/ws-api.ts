import { APIID, WS_KEY_MAP } from '../../util';
import {
  AmendOrderParamsV5,
  BatchAmendOrderParamsV5,
  BatchCancelOrderParamsV5,
  BatchOrderParamsV5,
  CancelOrderParamsV5,
  OrderParamsV5,
} from '../request';
import {
  BatchAmendOrderResultV5,
  BatchCancelOrderResultV5,
  BatchCreateOrderResultV5,
  BatchOrdersRetExtInfoV5,
  OrderResultV5,
} from '../response';
import { WsKey } from './ws-general';

// When new WS API operations are added, make sure to also update WS_API_Operations[] below
export type WSAPIOperation =
  | 'order.create'
  | 'order.amend'
  | 'order.cancel'
  | 'order.create-batch'
  | 'order.amend-batch'
  | 'order.cancel-batch';

export const WS_API_Operations: WSAPIOperation[] = [
  'order.create',
  'order.amend',
  'order.cancel',
  'order.create-batch',
  'order.amend-batch',
  'order.cancel-batch',
];

export type WsOperation =
  | 'subscribe'
  | 'unsubscribe'
  | 'auth'
  | 'ping'
  | 'pong';

export interface WsRequestOperationBybit<TWSTopic extends string> {
  req_id: string;
  op: WsOperation;
  args?: (TWSTopic | string | number)[];
}

export interface WSAPIRequest<
  TRequestParams = undefined,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TWSOperation extends WSAPIOperation = any,
> {
  reqId: string;
  op: TWSOperation;
  header: {
    'X-BAPI-TIMESTAMP': string;
    'X-BAPI-RECV-WINDOW': string;
    Referer: typeof APIID;
  };
  args: [TRequestParams];
}

export interface WSAPIResponse<
  TResponseData extends object = object,
  TOperation extends WSAPIOperation = WSAPIOperation,
  TResponseExtInfo = {}, // added as optional for batch calls
> {
  wsKey: WsKey;
  /** Auto-generated */
  reqId: string;
  retCode: 0 | number;
  retMsg: 'OK' | string;
  op: TOperation;
  data: TResponseData;
  retExtInfo: TResponseExtInfo;
  header?: {
    'X-Bapi-Limit': string;
    'X-Bapi-Limit-Status': string;
    'X-Bapi-Limit-Reset-Timestamp': string;
    Traceid: string;
    Timenow: string;
  };
  connId: string;
}

export type Exact<T> = {
  // This part says: if there's any key that's not in T, it's an error
  [K: string]: never;
} & {
  [K in keyof T]: T[K];
};

/**
 * List of operations supported for this WsKey (connection)
 */
export interface WsAPIWsKeyTopicMap {
  [WS_KEY_MAP.v5PrivateTrade]: WSAPIOperation;
}

/**
 * Request parameters expected per operation
 */
export interface WsAPITopicRequestParamMap {
  'order.create': OrderParamsV5;
  'order.amend': AmendOrderParamsV5;
  'order.cancel': CancelOrderParamsV5;

  'order.create-batch': {
    category: 'option' | 'linear';
    request: BatchOrderParamsV5[];
  };
  'order.amend-batch': {
    category: 'option' | 'linear';
    request: BatchAmendOrderParamsV5[];
  };
  'order.cancel-batch': {
    category: 'option' | 'linear';
    request: BatchCancelOrderParamsV5[];
  };
}

/**
 * Response structure expected for each operation
 */
export interface WsAPIOperationResponseMap {
  'order.create': WSAPIResponse<OrderResultV5, 'order.create'>;
  'order.amend': WSAPIResponse<OrderResultV5, 'order.amend'>;
  'order.cancel': WSAPIResponse<OrderResultV5, 'order.cancel'>;

  'order.create-batch': WSAPIResponse<
    { list: BatchCreateOrderResultV5[] },
    'order.create-batch'
  > & {
    retExtInfo: BatchOrdersRetExtInfoV5;
  };
  'order.amend-batch': WSAPIResponse<
    { list: BatchAmendOrderResultV5[] },
    'order.amend-batch'
  > & {
    retExtInfo: BatchOrdersRetExtInfoV5;
  };
  'order.cancel-batch': WSAPIResponse<
    { list: BatchCancelOrderResultV5[] },
    'order.cancel-batch'
  > & {
    retExtInfo: BatchOrdersRetExtInfoV5;
  };

  ping: {
    retCode: 0 | number;
    retMsg: 'OK' | string;
    op: 'pong';
    data: [string];
    connId: string;
  };
}
