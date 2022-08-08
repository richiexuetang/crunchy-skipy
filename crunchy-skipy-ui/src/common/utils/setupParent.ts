import { error, log } from './log';
import Messenger from './Messenger';
import { sleep } from './time';

export interface InferredEpisodeInfo {
    name?: string;
    number?: string;
    absoluteNumber?: string;
    season?: string;
    show?: string;
}

export default function setupParent(
  service: Service,
  options: {
        getEpisodeInfo(): any;
    }
): void {
  // Sites using HTML5 History mode don't update immediately, so we track the url to know if we
  // should be expecting a different episode
  let previousUrl: string | undefined;
  let previousEpisodeName: string | undefined;
  log('Service in setup Parent is:', service);
  new Messenger<
        ParentMessageTypes,
        ParentMessageListenerMap,
        ParentMessagePayloadMap,
        ParentMessageResponseMap
    >(`${service} parent`, {
      'get-episode-information': async () => {
        const currentUrl: string = window.location.href;
        let episode: InferredEpisodeInfo;

        try {
          if (previousUrl != null && currentUrl !== previousUrl) {
            // Wait for a little bit, then loop until the episode name is different
            await sleep(400);
            do {
              await sleep(100);
              episode = await options.getEpisodeInfo();
            } while (episode.name === previousEpisodeName);
          } else {
            episode = await options.getEpisodeInfo();
          }

          previousUrl = currentUrl;
          previousEpisodeName = episode.name;
        } catch (err) {
          episode = {};
          error('Failed to infer episode info', err, { previousUrl, currentUrl, episode });
        }
        log('Episode from get-episode-information');
        return episode;
      },
    });
}
