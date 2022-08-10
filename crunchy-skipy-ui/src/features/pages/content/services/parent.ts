import { error, loadedLog, log } from '../../../../common/utils/log';
import setupParent from '../../../../common/utils/setupParent';
import { waitUntil } from '../../../../common/utils/time';
import { getService } from './util';
import { postTokenInformation } from '../../../../service/authenticationApiService';
import { TokenResponseDto } from '../../../../api/contracts';


const tokenSuccess = (response: TokenResponseDto) => {
  log('postToken request succuessful with response', response);

  chrome.storage.local.set({'Authorization': `Bearer ${response.access_token}`});
  log('Chrome local storage is updated', chrome.storage.local.get('Authorization'));
}

const tokenFailure = () => {
  error('postToken request failed');
};

/**
   * Returns episode information.
   *
   * @param identifier Crunchyroll episode identifier.
   */
const authenticateWithToken = async (): Promise<any> => {
  // call token endpoint to get access token 
  postTokenInformation('', tokenSuccess, tokenFailure);
};

export const getEpisodeInfo = async () => {
  const pageHasLoaded = () =>
    Promise.resolve(
      document.querySelector('.erc-current-media-info') != null ||
            document.querySelector('#showmedia_about_media') != null
    );
  log('Waiting for page to load');
  await waitUntil(pageHasLoaded, 10 * 1000, 1, 200);
  log('Page has loaded!!!!');

  authenticateWithToken();
  
  const showElement = document.querySelector('.erc-current-media-info .show-title-link');
  if (showElement != null) {
    const show = showElement?.textContent;
    const episodeAndNumber =
            document.querySelector('.erc-current-media-info .title')?.textContent ?? '';
    const groups = /(\d+)\s*-\s*(.+)$/.exec(episodeAndNumber);

    const episode = groups?.[2];
    const number = groups?.[1];

    let season: string | undefined;
    try {
      const int = Array.from(document.querySelectorAll('script[type=\'application/ld+json\']'))
        .map(node => {
          try {
            return JSON.parse(node.textContent ?? '');
          } catch (_) {
            return undefined;
          }
        })
        .find(json => json?.['@type'] === 'TVEpisode')?.partOfSeason?.seasonNumber;
      if (int != null) season = String(int);
    } catch (err) {
      error('Cannot get episode information', err);
    }

    log('Episode info from getEpisodeInfo(): ', '\nshow:', show, '\nepisode:', episode, '\nepisodeNumber:', number, '\nseason:', season);
    return {
      show: show?.trim() || undefined,
      name: episode?.trim() || undefined,
      number: number?.trim() || undefined,
      season: season?.trim() || undefined,
    };
  }


  return {};
}

export const initCrunchyParent = () => {
  loadedLog('content-scripts/services/crunchyroll/parent.ts');
  setupParent(getService(), { getEpisodeInfo });
}