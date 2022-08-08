type MessageType = 'get_auth_data' | 'get_dom' | 'fetch' | 'new' | 'get-episode-information';

export interface Message {
    type: MessageType;
    payload?: any;
    uuid?: string;
}