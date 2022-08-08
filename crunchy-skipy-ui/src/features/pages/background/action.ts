import { loadedLog, log } from '../../../common/utils/log';

export function initAction() {
  loadedLog('background/action.ts');

  async function onTabChanged(tab: chrome.tabs.Tab) {
    if (!tab.active || !tab.url) return;
  }

  // #region Tab actions
  async function updateActiveTabUrl(tab: chrome.tabs.Tab) {
    chrome.storage.local.set({ 'supported-website-check-url': tab.url || null });
    log('Updated current tab in storage to:', tab.url || null);
  }

  chrome.tabs.onActivated.addListener(async activeInfo => {
    const tab = await chrome.tabs.get(activeInfo.tabId);
    await onTabChanged(tab);
    if (tab.active && tab.url?.includes('beta.crunchyroll.com')) await updateActiveTabUrl(tab);
  });

  chrome.tabs.onUpdated.addListener(async tabId => {
    const tab = await chrome.tabs.get(tabId);
    await onTabChanged(tab);
    if (tab.active && tab.url?.includes('beta.crunchyroll.com')) await updateActiveTabUrl(tab);
  });
  // #endregion

  // #region Storage actions
    chrome.storage.onChanged.addListener(async (changes: chrome.storage.StorageChange, area: string): Promise<void> => {

    });
  // #endregion

}