import { backOff } from 'exponential-backoff';
import { SECOND } from '../constants';
import { IPlayerConfig } from '../contracts/PlayerConfig.interface';
import { debug, log, warn } from './log';

/**
 * Configures the default player config for a player injected by the web extension
 */
export function setupPlayerConfig(
  service: Service,
  customConfig: Pick<
    IPlayerConfig,
    | 'serviceDisplayName'
    | 'onPlayDebounceMs'
    | 'getRootQuery'
    | 'getVideoQuery'
    | 'transformServiceUrl'
    | 'getPlaybackOptions'
    | 'doNotReplacePlayer'
  >
): IPlayerConfig {
  const {
    serviceDisplayName,
    onPlayDebounceMs,
    getRootQuery,
    getVideoQuery,
    transformServiceUrl,
    getPlaybackOptions,
  } = customConfig;
  return {
    service,
    serviceDisplayName,
    onPlayDebounceMs,
    getRootQuery,
    getVideoQuery,
    transformServiceUrl,
    async getPlaybackOptions() {
      try {
        const optionGroups = await getPlaybackOptions?.();
        log(`${service}.getPlaybackOptions`, optionGroups);
        if (optionGroups && optionGroups.length > 0) return optionGroups;
        return undefined;
      } catch (err) {
        warn('Failed to get player options, falling back to undefined');
        return undefined;
      }
    },
    async inferEpisodeInfo() {
      debug(`${service}.get-episode-information`);
      return await backOff(
        async () => {
          const res = await chrome.runtime.sendMessage({
            type: 'get-episode-information',
          });
          if (res == null) throw Error('Undefined response');
          return res;
        },
        { timeMultiple: 1, startingDelay: SECOND, numOfAttempts: 20 }
      );
    },
    ...initVideoChangeWatcher(getVideoQuery)
  };
}

function initVideoChangeWatcher(
  getVideoQuery: IPlayerConfig['getVideoQuery']
): Pick<IPlayerConfig, 'getVideo' | 'onVideoChanged'> {
  const videoCallbacks: ((video: HTMLVideoElement) => void)[] = [];

  function onVideoChanged(callback: (video: HTMLVideoElement) => void): void {
    videoCallbacks.push(callback);
  }

  function getVideo(): HTMLVideoElement {
    return document.querySelector(getVideoQuery()) as HTMLVideoElement;
  }

  // Listen for video changes

  let oldVideoSrc: string | undefined;
  const CHECK_IF_CHANGED_INTERVAL = SECOND;
  setInterval(function checkVideoChanged(): void {
    const newVideo = getVideo();
    if (newVideo?.src !== oldVideoSrc) {
      debug('Video changed, calling callbacks:', {
        oldVideo: oldVideoSrc,
        newVideo: newVideo.src,
        videoCallbacks,
      });
      videoCallbacks.forEach(callback => {
        try {
          callback(newVideo);
        } catch (err) {
          warn('onVideoChangedCallback failed', err);
        }
      });
      oldVideoSrc = newVideo.src;
    }
  }, CHECK_IF_CHANGED_INTERVAL);

  return {
    getVideo,
    onVideoChanged,
  };
}
