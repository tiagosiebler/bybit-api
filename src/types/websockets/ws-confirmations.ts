export interface WebsocketTopicSubscriptionConfirmationEvent {
  op: 'subscribe';
  req_id: string;
  conn_id: string;
  ret_msg: string;
  success: boolean;
}

export interface WebsocketSucceededTopicSubscriptionConfirmationEvent
  extends WebsocketTopicSubscriptionConfirmationEvent {
  success: true;
}

export interface WebsocketFailedTopicSubscriptionConfirmationEvent
  extends WebsocketTopicSubscriptionConfirmationEvent {
  success: false;
}
