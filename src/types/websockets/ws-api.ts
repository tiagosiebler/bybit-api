import { APIID, WS_KEY_MAP } from '../../util';
import {
  AmendOrderParamsV5,
  CancelOrderParamsV5,
  OrderParamsV5,
} from '../request';
import { WsKey } from './ws-general';

export type WSAPIOperation = 'order.create' | 'order.amend' | 'order.cancel';

export type WsOperation =
  | 'subscribe'
  | 'unsubscribe'
  | 'auth'
  | 'ping'
  | 'pong';

export const WS_API_Operations: WSAPIOperation[] = [
  'order.create',
  'order.amend',
  'order.cancel',
];

export interface WsRequestOperationBybit<
  TWSTopic extends string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  // TWSPayload = any,
> {
  req_id: string;
  op: WsOperation;
  args?: (TWSTopic | string | number)[];
  // payload?: TWSPayload;
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

export interface WsAPIWsKeyTopicMap {
  [WS_KEY_MAP.v5PrivateTrade]: WSAPIOperation;
}

export interface WsAPITopicRequestParamMap {
  'order.create': OrderParamsV5;
  'order.amend': AmendOrderParamsV5;
  'order.cancel': CancelOrderParamsV5;
  // ping: undefined;
}

export type WsAPITopicRequestParams =
  WsAPITopicRequestParamMap[keyof WsAPITopicRequestParamMap];

export interface WSAPIResponse<
  TResponseData extends object = object,
  TOperation extends WSAPIOperation = WSAPIOperation,
> {
  wsKey: WsKey;
  /** Auto-generated */
  reqId: string;
  retCode: 0 | number;
  retMsg: 'OK' | string;
  op: TOperation;
  data: [TResponseData];
  header?: {
    'X-Bapi-Limit': string;
    'X-Bapi-Limit-Status': string;
    'X-Bapi-Limit-Reset-Timestamp': string;
    Traceid: string;
    Timenow: string;
  };
  connId: string;
}

// export interface WsAPIResponseMap<TChannel extends WSAPITopic = WSAPITopic> {
//   'spot.login': WSAPIResponse<WSAPILoginResponse, TChannel>;
//   'futures.login': WSAPIResponse<WSAPILoginResponse, TChannel>;
//   string: object;
// }

export interface WsAPIOperationResponseMap<
  TResponseType extends object = object,
> {
  'order.create': WSAPIResponse<TResponseType, 'order.cancel'>;
  'order.amend': WSAPIResponse<TResponseType, 'order.amend'>;
  'order.cancel': WSAPIResponse<TResponseType, 'order.cancel'>;
  ping: {
    retCode: 0 | number;
    retMsg: 'OK' | string;
    op: 'pong';
    data: [string];
    connId: string;
  };

  // 'spot.login': WSAPIResponse<WSAPILoginResponse, 'spot.login'>;
  // 'futures.login': WSAPIResponse<WSAPILoginResponse, 'futures.login'>;

  // 'spot.order_place': WSAPIResponse<TResponseType, 'spot.order_place'>;
  // 'spot.order_cancel': WSAPIResponse<TResponseType, 'spot.order_cancel'>;
  // 'spot.order_cancel_ids': WSAPIResponse<
  //   TResponseType,
  //   'spot.order_cancel_ids'
  // >;
  // 'spot.order_cancel_cp': WSAPIResponse<TResponseType, 'spot.order_cancel_cp'>;
  // 'spot.order_amend': WSAPIResponse<TResponseType, 'spot.order_amend'>;
  // 'spot.order_status': WSAPIResponse<
  //   WSAPIOrderStatusResponse,
  //   'spot.order_status'
  // >;
  // 'futures.order_place': WSAPIResponse<TResponseType[], 'futures.order_place'>;
  // 'futures.order_batch_place': WSAPIResponse<
  //   TResponseType[],
  //   'futures.order_batch_place'
  // >;
  // 'futures.order_cancel': WSAPIResponse<TResponseType, 'futures.order_cancel'>;
  // 'futures.order_cancel_cp': WSAPIResponse<
  //   TResponseType,
  //   'futures.order_cancel_cp'
  // >;
  // 'futures.order_amend': WSAPIResponse<TResponseType, 'futures.order_amend'>;
  // 'futures.order_list': WSAPIResponse<TResponseType[], 'futures.order_list'>;
  // 'futures.order_status': WSAPIResponse<
  //   WSAPIOrderStatusResponse,
  //   'futures.order_status'
  // >;
}
