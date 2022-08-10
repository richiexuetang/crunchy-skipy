import { error, log } from '../../../common/utils/log';
import { initCrunchyParent } from './services/parent';
import { initCrunchyrollPlayer } from './services/player';

chrome.runtime.sendMessage('crunchyroll-beta get-episode-information');

try {
  initCrunchyParent();
  initCrunchyrollPlayer();
  log('init crunchy parent successful');
} catch (err) {
  error('error init crunchy parent', err);
}