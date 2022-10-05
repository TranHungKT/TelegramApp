import { IMessage } from 'react-native-gifted-chat';

import { Member } from './groupModels';

export interface SocketErrorPayload {
  type: string;
  payload: unknown;
}

export interface NewMessageFromSocket {
  newMessage: IMessage;
  groupId?: string;
}

export interface TypingEventPayload {
  user: Member;
  groupId: string;
}
