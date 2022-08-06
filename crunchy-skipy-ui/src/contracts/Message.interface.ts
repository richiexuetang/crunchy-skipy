type MessageType = 'get_auth_data' | 'get_dom';

export interface Message {
    type: MessageType;
    payload?: any;
    uuid?: string;
}