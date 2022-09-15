import { ImageSourcePropType } from 'react-native';

import { UserStatus } from './userModels';

export interface Group {
  _id: string;
  name: string;
  members: Member[];
  chats: Chat[];
  typeOfGroup: TypeOfGroup;
  lastUpdatedAt: string;
  groupAvatar: ImageSourcePropType | string;
}

export interface Member {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatarUrl: string;
  status: UserStatus;
}

export interface Chat {
  _id: string;
  content: string;
  contentType: string; // TODO: CHECK TYPE OF FILE, URL?
  sentTime: string;
  sentBy: string;
  readBy: string[];
}

export enum TypeOfGroup {
  ALL = 'ALL',
  IMPORTANT = 'IMPORTANT',
  READ = 'READ',
  UNREAD = 'UNREAD',
}
