import { loadedLog, log } from "../../utils/log";


export function initAction() {
    loadedLog('background/action.ts');

    async function onTabChanged(tab: chrome.tabs.Tab) {
        if (!tab.active || !tab.url) return;
    }

    async function updateActiveTabUrl(tab: chrome.tabs.Tab) {
        chrome.storage.local.set({ 'supported-website-check-url': tab.url || null });
        log('Updated current tab in storage to:', tab.url || null);
    }

    chrome.tabs.onActivated.addListener(async activeInfo => {
        const tab = await chrome.tabs.get(activeInfo.tabId);
        await onTabChanged(tab);
        if (tab.active) await updateActiveTabUrl(tab);
    });
    chrome.tabs.onUpdated.addListener(async tabId => {
        const tab = await chrome.tabs.get(tabId);
        await onTabChanged(tab);
        if (tab.active) await updateActiveTabUrl(tab);
    });
}