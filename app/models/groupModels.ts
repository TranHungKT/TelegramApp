import { ImageSourcePropType } from 'react-native';

import { User } from './userModels';

export interface Group {
  _id: string;
  name: string;
  members: Member[];
  messages: string[]; // TODO: UPDATE TO LAST MESSAGE
  typeOfGroup: TypeOfGroup;
  lastUpdatedAt: string;
  groupAvatar: ImageSourcePropType | string;
}

export type Member = Omit<User, 'accessToken'>;

export enum TypeOfGroup {
  ALL = 'ALL',
  IMPORTANT = 'IMPORTANT',
  READ = 'READ',
  UNREAD = 'UNREAD',
}
