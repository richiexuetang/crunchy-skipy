export type MessageType = 'get_document';

export type Message = {
  type: MessageType;
  authClientId?: string;
};
