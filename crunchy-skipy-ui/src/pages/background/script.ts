import { Message } from '../../contracts/Message.interface';
import tokenApiService from '../../service/tokenApiService';
import "regenerator-runtime/runtime.js";

const tokenSuccess = () => {
    console.log('v nice');
}

const tokenError = () => {
    console.log('duma token fail');
}

/**
 * Relay messages between content scripts.
 *
 */
const messageHandler = (
    message: Message,
    sender: chrome.runtime.MessageSender
): any => {
    const tabId = sender.tab?.id;

    if (!tabId) {
        return Promise.reject(new Error('Tab id not found'));
    }

    switch (message.type) {
        case 'get_auth_data': {
            tokenApiService.postTokenInformation('grant_type=etp_rt_cookie', tokenSuccess, tokenError);
            break;
        }
        default: {
            console.log('nothing to see here');
        }
    }
};
chrome.runtime.onMessage.addListener(messageHandler);
