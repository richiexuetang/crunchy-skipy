import { APP_CONFIG_DATA_PROPERTY } from '../../constants';
import tokenApiService from '../../service/tokenApiService';

const getProperty = (property: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');

    script.src = chrome.runtime.getURL('window.bundle.js');
    script.dataset.property = property;

    (document.head || document.documentElement).appendChild(script);

    new MutationObserver((_mutations, observer) => {
      const { value } = script.dataset;
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

const tokenSuccess = () => {
    console.log('v nice');
}

const tokenError = () => {
    console.log('duma content token fail');
}

// Function called when a new message is received
const messagesHandler = (message: any): any => {
  (async (): Promise<void> => {
      const result = await getProperty(APP_CONFIG_DATA_PROPERTY);
      console.log('message parameter from content messageHandler', message);
      console.log('result', result);

      window.localStorage.setItem('Authorization', `Basic ${btoa(`${result.accountAuthClientId}:`)}`);
      tokenApiService.postTokenInformation('grant_type=etp_rt_cookie', tokenSuccess, tokenError);
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
