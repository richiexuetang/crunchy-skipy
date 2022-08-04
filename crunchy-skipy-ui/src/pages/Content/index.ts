import { DOMMessage, DOMMessageResponse } from './types';

// Function called when a new message is received
const messagesFromReactAppListener = (
  msg: DOMMessage,
  sender: chrome.runtime.MessageSender,
  sendResponse: (response: DOMMessageResponse) => any
) => {

  const response: DOMMessageResponse = {
    title: document.title,
  };

  sendResponse(response);
};

/**
 * Fired when a message is sent from either an extension process or a content script.
 */
chrome.runtime.onMessage.addListener(messagesFromReactAppListener);

console.log('Content script works!');
console.log('Must reload extension for modifications to take effect.');
