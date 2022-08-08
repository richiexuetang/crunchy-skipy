import Messenger from "../../common/utils/Messenger";
import { loadedLog, log } from "../../utils/log";


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
        ['get-episode-infomation']
    );
    log("Messenger from background messenger is: ", Messenger);
}
