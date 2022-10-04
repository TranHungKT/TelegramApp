import { IMessage } from 'react-native-gifted-chat';

export interface SocketErrorPayload {
  type: string;
  payload: unknown;
}

export interface NewMessageFromSocket {
  newMessage: IMessage;
  groupId?: string;
}
