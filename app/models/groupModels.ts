import { ImageSourcePropType } from 'react-native';

import { User } from './userModels';

export interface Group {
  _id: string;
  name: string;
  members: Member[];
  messages: Message[];
  typeOfGroup: TypeOfGroup;
  lastUpdatedAt: string;
  groupAvatar: ImageSourcePropType | string;
}

export type Member = Omit<User, 'accessToken'>;

export interface Message {
  _id: string;
  text: string;
  createdAt: string;
  user: Member;
  sent: boolean;
  received: boolean;
  pending: boolean;
}

export enum TypeOfGroup {
  ALL = 'ALL',
  IMPORTANT = 'IMPORTANT',
  READ = 'READ',
  UNREAD = 'UNREAD',
}
