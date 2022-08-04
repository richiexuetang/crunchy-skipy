import browser from 'webextension-polyfill';

/**
 * Relay messages between content scripts.
 *
 */
const messageHandler = (details: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    //console.log('document is:', document);
    console.log(`Woo got a request, here's the details!`, details);
  });
};

browser.webNavigation.onCompleted.addListener(messageHandler);

console.log('This is the background page.');
console.log('Put the background scripts here.');
