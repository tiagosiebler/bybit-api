import { WebsocketTopicSubscriptionConfirmationEvent } from './topic-subscription-confirmation';
export interface WebsocketFailedTopicSubscriptionConfirmationEvent extends WebsocketTopicSubscriptionConfirmationEvent {
    success: false;
}
