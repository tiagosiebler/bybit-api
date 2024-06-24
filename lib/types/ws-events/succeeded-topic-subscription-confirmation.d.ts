import { WebsocketTopicSubscriptionConfirmationEvent } from './topic-subscription-confirmation';
export interface WebsocketSucceededTopicSubscriptionConfirmationEvent extends WebsocketTopicSubscriptionConfirmationEvent {
    success: true;
}
