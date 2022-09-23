import { NewMessage } from 'models';
import { IMessage } from 'react-native-gifted-chat';

export const normalizeMessageFromSocket = (payload: NewMessage): IMessage => ({
  _id: payload._id,
  createdAt: payload.createdAt,
  user: {
    _id: payload.user._id,
    avatar: payload.user.avatarUrl,
    name: `${payload.user.firstName} ${payload.user.lastName}`,
  },
  text: payload.text,
});
