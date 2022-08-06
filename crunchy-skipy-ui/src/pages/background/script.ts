type MessageType = 'get_auth_data';

type Message = {
  type: MessageType;
  payload?: any;
  uuid?: string;
};

/**
 * Relay messages between content scripts.
 *
 */
const messageHandler = (message: Message, sender: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    (async () => {
      return (async (): Promise<any> => {
        try {
          console.log('returned message is:', message);
        } catch (err: any) {
          console.log('message handler error');
          return err;
        }
      })();
    })();
  });
};
chrome.runtime.onMessage.addListener(messageHandler);

console.log('This is the background page.');
console.log('Put the background scripts here.');
