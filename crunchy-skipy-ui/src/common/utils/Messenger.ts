import { debug } from './log';
import { sleep } from './time';


export const getErrorMessage = (err: unknown): string => {
  if (err == null) return '';
  if (err instanceof Error) return err.message;
  if (typeof err === 'string') return err;
  if (typeof err === 'object') return err.toString();
  return JSON.stringify(err);
}


export default class Messenger<
    K extends MessageTypes = MessageTypes,
    L extends MessageListenerMap<K> = MessageListenerMap<K>,
    P extends MessagePayloadMap<K> = MessagePayloadMap<K>,
    R extends MessageResponseMap<K> = MessageResponseMap<K>
    > {
  public listeners?: L;
  public forwardTypes?: string[];
  public source: string;

  public constructor(source: string, listeners?: L, forwardTypes?: string[]) {
    this.listeners = listeners;
    this.source = source;
    this.forwardTypes = forwardTypes;

    if (listeners != null || forwardTypes != null) {
      chrome.runtime.onMessage.addListener(this.onReceiveMessage);
      debug(`Started ${source} messenger`);
    }
  }

  public send = async <T extends AllMessageTypes>(
    type: T,
    payload: AllMessagePayloads[T],
    tabId?: number
  ): Promise<AllMessageResponses[T]> => {
    debug(`${this.source} sending message: ${type}`, { payload, tabId });
    let response: any;
    if (tabId != null) {
      response = await chrome.tabs.sendMessage(tabId, {
        type,
        payload,
      });
    } else {
      response = await chrome.runtime.sendMessage({
        type,
        payload,
      });
    }
    if (response?.errorMessage) {
      throw new Error();
    }
    debug(this.source + ' got response', { type, payload, response });
    return response;
  };

  private onReceiveMessage = async (
    { type, payload }: { type: K; payload: P[K] },
    sender: chrome.runtime.MessageSender
  ): Promise<R[K] | void> => {
    debug('Received Message on ' + this.source, { type, payload }, { listeners: this.listeners });
    if (!this.listeners) return;

    const callback = this.listeners[type] as unknown as MessageListener<K>;
    if (callback) {
      let response;
      try {
        response = await callback(payload, sender);
      } catch (error) {
        response = { errorMessage: getErrorMessage(error) };
      }
      debug('Sending response', { response });
      return response;
    } else if (sender.tab?.id != null && this.forwardTypes?.includes(type)) {
      return this.send(type, payload, sender.tab.id);
    }

    // Wait for a different messenger to handle the message
    await sleep(1000);
    return;
  };
}