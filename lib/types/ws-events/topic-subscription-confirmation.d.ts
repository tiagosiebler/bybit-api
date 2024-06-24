export interface WebsocketTopicSubscriptionConfirmationEvent {
    op: 'subscribe';
    req_id: string;
    conn_id: string;
    ret_msg: string;
    success: boolean;
}
