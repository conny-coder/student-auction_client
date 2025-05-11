export interface IUser {
  _id: string;
  email: string;
  userName: string;
  isAdmin: boolean;
  name: string
}

export interface IUserState extends IUser {
  rating: number;
  balance: number;
  avatar: string;
}

export interface IProfile extends IUser {
  bidsCount: number;
  winnerCount: number;
  soldCount: number;
  rating: number;
  balance: number;
  avatar: string;
}
