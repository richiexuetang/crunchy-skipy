import GeneralUtils from '../../../../common/utils/GeneralUtils';
import { loadedLog } from '../../../../common/utils/log';
import { setupPlayerConfig } from '../../../../common/utils/setupPlayerConfig';
import { getService } from './util';

export function initCrunchyrollPlayer() {
  loadedLog('content-scripts/services/crunchyroll/player.ts');

  return setupPlayerConfig(getService(), {
    serviceDisplayName: 'Crunchyroll',
    onPlayDebounceMs: 100,
    getRootQuery: () => 'body',
    getVideoQuery: () => 'video',
    transformServiceUrl(inputUrl) {
      // Strip and remove -XXXXXX from end of url
      return GeneralUtils.stripUrl(inputUrl).replace(/-\d+$/, '');
    },
    doNotReplacePlayer() {
      // Crunchyroll has two iframes, one for preloading and one for the actual video. This skips
      // the preloading one
      return document.body.getBoundingClientRect().width === 0;
    },
  });
}
