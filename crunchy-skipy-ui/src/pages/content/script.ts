const getProperty = (property: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');

    script.src = chrome.runtime.getURL('window.bundle.js');
    script.dataset.property = property;

    (document.head || document.documentElement).appendChild(script);

    new MutationObserver((_mutations, observer) => {
      const { value } = script.dataset;
      console.log('value from getProperty is:', value);
      if (!value) {
        return;
      }

      observer.disconnect();

      try {
        resolve(JSON.parse(value));
      } catch (error: any) {
        reject(error);
      }

      script.remove();
    }).observe(script, { attributes: true });
  });
};

// Function called when a new message is received
const messagesHandler = (message: any): any => {
  (async (): Promise<void> => {
    const result = await getProperty('__APP_CONFIG__.cxApiParams');
    console.log(result);

    chrome.runtime.sendMessage({
      type: 'get_auth_data',
      payload: result,
      uuid: message.uuid,
    });
    return;
  })();
};

/**
 * Fired when a message is sent from either an extension process or a content script.
 */
chrome.runtime.onMessage.addListener(messagesHandler);

console.log('Content script works!');
console.log('Must reload extension for modifications to take effect.');
