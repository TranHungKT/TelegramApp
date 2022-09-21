export interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  accessToken: string;
  avatarUrl: string;
}

export enum UserStatus {
  OFFLINE = 'OFFLINE',
  ONLINE = 'ONLINE',
}
