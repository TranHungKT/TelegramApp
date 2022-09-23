export interface NewMessage {
  _id: string;
  createdAt: Date;
  text: string;
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    avatarUrl: string;
  };
}
