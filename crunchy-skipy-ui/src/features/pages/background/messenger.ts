import { loadedLog, log } from '../../../common/utils/log';
import Messenger from '../../../common/utils/Messenger';


export function initMessenger() {
  loadedLog('background/messenger.ts');

  new Messenger(
    'background-messenger',
    {
      'open-all-settings': async () => {
        await chrome.runtime.openOptionsPage();
      },
      'open-login': async () => {
        await chrome.tabs.create({ url: 'popup/index.html?closeAfterLogin=true' });
      },
      'get-url': async (_: any, sender:any) => {
        return sender.tab?.url;
      },
    },
    ['get-episode-information']
  );
  log('Messenger from background messenger is: ', Messenger);
}
