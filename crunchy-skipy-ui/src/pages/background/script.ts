import { Message } from '../../contracts/Message.interface';

/**
 * Relay messages between content scripts.
 *
 */
const messageHandler = (
    message: Message,
    sender: chrome.runtime.MessageSender
): any => {
    switch (message.type) {
        case 'get_auth_data': {
            break;
        }
        default: {
            console.log('nothing to see here');
        }
    }
};
chrome.runtime.onMessage.addListener(messageHandler);
